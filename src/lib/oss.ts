/**
 * Alibaba Cloud OSS (Object Storage Service) Integration for CarveEast
 * Documentation: https://help.aliyun.com/document_detail/32067.html
 */

import CryptoJS from 'crypto-js';

// OSS Configuration
export const ossConfig = {
  region: process.env.OSS_REGION || 'oss-cn-hangzhou',
  accessKeyId: process.env.OSS_ACCESS_KEY_ID || '',
  accessKeySecret: process.env.OSS_ACCESS_KEY_SECRET || '',
  bucket: process.env.OSS_BUCKET || 'vertax',
  endpoint: process.env.OSS_ENDPOINT || `https://${process.env.OSS_REGION || 'oss-cn-hangzhou'}.aliyuncs.com`,
};

// Check if OSS is configured
export function isOSSConfigured(): boolean {
  return !!(ossConfig.accessKeyId && ossConfig.accessKeySecret && ossConfig.bucket);
}

// Generate OSS URL for a file
export function getOSSUrl(key: string): string {
  return `https://${ossConfig.bucket}.${ossConfig.region}.aliyuncs.com/${key}`;
}

// Video paths configuration
export const videoPaths = {
  courses: 'courses/videos',
  thumbnails: 'courses/thumbnails',
  gifs: 'courses/gifs',
  previews: 'courses/previews',
} as const;

// Course video keys
export const courseVideoKeys = {
  'beginner-essentials': `${videoPaths.courses}/beginner-essentials`,
  'side-inscription-mastery': `${videoPaths.courses}/side-inscription-mastery`,
  'knife-techniques-advanced': `${videoPaths.courses}/knife-techniques-advanced`,
  'live-highlights': `${videoPaths.courses}/live-highlights`,
} as const;

/**
 * Generate signature for OSS upload (for client-side direct upload)
 * Reference: https://help.aliyun.com/document_detail/31926.html
 */
export function generateOSSSignature({
  dir = '',
  expire = 3600,
}: {
  dir?: string;
  expire?: number;
}): {
  expire: number;
  signature: string;
  policy: string;
  accessKeyId: string;
  host: string;
  dir: string;
} {
  const expiration = new Date(Date.now() + expire * 1000);
  const policy = JSON.stringify({
    expiration: expiration.toISOString(),
    conditions: [
      ['content-length-range', 0, 104857600], // Max 100MB
      { bucket: ossConfig.bucket },
      { key: '' },
      { dir: dir || '*' },
    ],
  });

  const policyBase64 = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(policy));

  // Create signature using HMAC-SHA1
  const signature = CryptoJS.HmacSHA1(policyBase64, ossConfig.accessKeySecret);
  const signatureBase64 = CryptoJS.enc.Base64.stringify(signature);

  return {
    expire: Math.floor(expiration.getTime() / 1000),
    signature: signatureBase64,
    policy: policyBase64,
    accessKeyId: ossConfig.accessKeyId,
    host: `https://${ossConfig.bucket}.${ossConfig.region}.aliyuncs.com`,
    dir: dir || '',
  };
}

// OSS upload configuration for client
export function getOSSUploadConfig(courseSlug: string, fileType: 'video' | 'thumbnail' | 'gif') {
  const dirMap = {
    video: videoPaths.courses,
    thumbnail: videoPaths.thumbnails,
    gif: videoPaths.gifs,
  };

  return generateOSSSignature({
    dir: `${dirMap[fileType]}/${courseSlug}/`,
    expire: 3600,
  });
}

// Video URL generator
export function getVideoUrl(courseSlug: string, videoName: string): string {
  return getOSSUrl(`${videoPaths.courses}/${courseSlug}/${videoName}`);
}

// Thumbnail URL generator
export function getThumbnailUrl(courseSlug: string, thumbnailName: string): string {
  return getOSSUrl(`${videoPaths.thumbnails}/${courseSlug}/${thumbnailName}`);
}

// GIF URL generator
export function getGifUrl(courseSlug: string, gifName: string): string {
  return getOSSUrl(`${videoPaths.gifs}/${courseSlug}/${gifName}`);
}

// Delete file from OSS (server-side)
export async function deleteOSSFile(key: string): Promise<boolean> {
  if (!isOSSConfigured()) {
    throw new Error('OSS is not configured');
  }

  const response = await fetch(`${ossConfig.endpoint}/${key}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `OSS ${ossConfig.accessKeyId}:generateSignature()`,
      'x-oss-date': new Date().toUTCString(),
    },
  });

  return response.ok;
}

// List files in OSS directory (server-side)
export async function listOSSFiles(prefix: string): Promise<string[]> {
  if (!isOSSConfigured()) {
    throw new Error('OSS is not configured');
  }

  const response = await fetch(
    `${ossConfig.endpoint}/?list-type=2&prefix=${encodeURIComponent(prefix)}`,
    {
      method: 'GET',
      headers: {
        'Authorization': `OSS ${ossConfig.accessKeyId}:generateSignature()`,
        'x-oss-date': new Date().toUTCString(),
      },
    }
  );

  if (!response.ok) {
    throw new Error('Failed to list OSS files');
  }

  const text = await response.text();
  const parser = new DOMParser();
  const xml = parser.parseFromString(text, 'text/xml');
  const contents = xml.querySelectorAll('Contents > Key');

  return Array.from(contents).map(el => el.textContent || '');
}
