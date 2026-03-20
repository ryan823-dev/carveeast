'use client';

import { useState, useEffect, useRef } from 'react';

interface VideoPreviewProps {
  src: string;
  poster?: string;
  className?: string;
  autoPlayOnHover?: boolean;
}

export default function VideoPreview({
  src,
  poster,
  className = '',
  autoPlayOnHover = true,
}: VideoPreviewProps) {
  const [isHovering, setIsHovering] = useState(false);
  const [isGif, setIsGif] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // 检测是否为 GIF
    setIsGif(src.toLowerCase().endsWith('.gif'));
  }, [src]);

  useEffect(() => {
    if (!autoPlayOnHover || isGif) return;

    const video = videoRef.current;
    if (!video) return;

    if (isHovering) {
      video.play().catch(() => {});
    } else {
      video.pause();
      video.currentTime = 0;
    }
  }, [isHovering, autoPlayOnHover, isGif]);

  if (isGif) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <img
          src={src}
          alt="Preview"
          className="w-full h-full object-cover"
        />
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Poster (static image) */}
      <img
        src={poster || src.replace('.mp4', '/thumb.jpg')}
        alt="Preview"
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isHovering ? 'opacity-0' : 'opacity-100'
        }`}
      />

      {/* Video (plays on hover) */}
      {!isGif && (
        <video
          ref={videoRef}
          src={src}
          loop
          muted
          playsInline
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
            isHovering ? 'opacity-100' : 'opacity-0'
          }`}
        />
      )}

      {/* Play indicator */}
      <div
        className={`absolute inset-0 flex items-center justify-center bg-black/20 transition-opacity duration-300 ${
          isHovering ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <div className="w-12 h-12 bg-white/80 rounded-full flex items-center justify-center">
          <svg className="w-5 h-5 text-stone-800 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>
    </div>
  );
}
