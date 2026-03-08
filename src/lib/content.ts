// Content Management System for CarveEast
// Manages works, artists, stories, and collections

import { supabaseClient, supabaseServer } from './supabase';

export interface ContentWork {
  id: string;
  slug: string;
  title: string;
  titleCn?: string;
  artistId: string;
  artistName: string;
  year: number;
  medium: string;
  dimensions?: string;
  price?: number;
  currency?: string;
  availability: 'available' | 'sold' | 'reserved' | 'in_auction';
  description?: string;
  images: string[];
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ContentArtist {
  id: string;
  slug: string;
  name: string;
  nameCn?: string;
  discipline: string[];
  location: string;
  yearStarted: number;
  bio?: string;
  statement?: string;
  avatar?: string;
  coverImage?: string;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ContentStory {
  id: string;
  slug: string;
  title: string;
  excerpt?: string;
  content: string;
  author: string;
  category: string;
  coverImage?: string;
  readTime?: number;
  isPublished: boolean;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}

// List all works with filters
export async function listWorks(options: {
  status?: string;
  artistId?: string;
  isPublished?: boolean;
  limit?: number;
  offset?: number;
} = {}): Promise<{ works: ContentWork[]; total: number }> {
  try {
    let query = supabaseClient
      .from('works')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false });

    if (options.status) {
      query = query.eq('availability', options.status);
    }

    if (options.artistId) {
      query = query.eq('artist_id', options.artistId);
    }

    if (options.isPublished !== undefined) {
      query = query.eq('is_published', options.isPublished);
    }

    const { data, error, count } = await query
      .range(options.offset || 0, (options.offset || 0) + (options.limit || 20) - 1);

    if (error) throw error;

    return {
      works: (data || []).map((w: any) => ({
        id: w.id,
        slug: w.slug,
        title: w.title,
        titleCn: w.title_cn,
        artistId: w.artist_id,
        artistName: w.artist_name,
        year: w.year,
        medium: w.medium,
        dimensions: w.dimensions,
        price: w.price,
        currency: w.currency,
        availability: w.availability,
        description: w.description,
        images: w.images || [],
        isPublished: w.is_published,
        createdAt: w.created_at,
        updatedAt: w.updated_at,
      })),
      total: count || 0,
    };
  } catch (error) {
    console.error('Error listing works:', error);
    return { works: [], total: 0 };
  }
}

// Create new work
export async function createWork(
  work: Omit<ContentWork, 'id' | 'createdAt' | 'updatedAt'>
): Promise<ContentWork | null> {
  try {
    const { data, error } = await supabaseServer
      .from('works')
      .insert({
        slug: work.slug,
        title: work.title,
        title_cn: work.titleCn,
        artist_id: work.artistId,
        artist_name: work.artistName,
        year: work.year,
        medium: work.medium,
        dimensions: work.dimensions,
        price: work.price,
        currency: work.currency,
        availability: work.availability,
        description: work.description,
        images: work.images,
        is_published: work.isPublished,
      })
      .select()
      .single();

    if (error) throw error;

    return {
      id: data.id,
      slug: data.slug,
      title: data.title,
      titleCn: data.title_cn,
      artistId: data.artist_id,
      artistName: data.artist_name,
      year: data.year,
      medium: data.medium,
      dimensions: data.dimensions,
      price: data.price,
      currency: data.currency,
      availability: data.availability,
      description: data.description,
      images: data.images || [],
      isPublished: data.is_published,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
    };
  } catch (error) {
    console.error('Error creating work:', error);
    return null;
  }
}

// Update work
export async function updateWork(
  id: string,
  updates: Partial<ContentWork>
): Promise<ContentWork | null> {
  try {
    const { data, error } = await supabaseServer
      .from('works')
      .update({
        slug: updates.slug,
        title: updates.title,
        title_cn: updates.titleCn,
        artist_id: updates.artistId,
        artist_name: updates.artistName,
        year: updates.year,
        medium: updates.medium,
        dimensions: updates.dimensions,
        price: updates.price,
        currency: updates.currency,
        availability: updates.availability,
        description: updates.description,
        images: updates.images,
        is_published: updates.isPublished,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    return {
      id: data.id,
      slug: data.slug,
      title: data.title,
      titleCn: data.title_cn,
      artistId: data.artist_id,
      artistName: data.artist_name,
      year: data.year,
      medium: data.medium,
      dimensions: data.dimensions,
      price: data.price,
      currency: data.currency,
      availability: data.availability,
      description: data.description,
      images: data.images || [],
      isPublished: data.is_published,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
    };
  } catch (error) {
    console.error('Error updating work:', error);
    return null;
  }
}

// Delete work
export async function deleteWork(id: string): Promise<boolean> {
  try {
    const { error } = await supabaseServer.from('works').delete().eq('id', id);
    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error deleting work:', error);
    return false;
  }
}

// List all artists
export async function listArtists(options: {
  isPublished?: boolean;
  limit?: number;
  offset?: number;
} = {}): Promise<{ artists: ContentArtist[]; total: number }> {
  try {
    let query = supabaseClient
      .from('artists')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false });

    if (options.isPublished !== undefined) {
      query = query.eq('is_published', options.isPublished);
    }

    const { data, error, count } = await query
      .range(options.offset || 0, (options.offset || 0) + (options.limit || 20) - 1);

    if (error) throw error;

    return {
      artists: (data || []).map((a: any) => ({
        id: a.id,
        slug: a.slug,
        name: a.name,
        nameCn: a.name_cn,
        discipline: a.discipline || [],
        location: a.location,
        yearStarted: a.year_started,
        bio: a.bio,
        statement: a.statement,
        avatar: a.avatar,
        coverImage: a.cover_image,
        isPublished: a.is_published,
        createdAt: a.created_at,
        updatedAt: a.updated_at,
      })),
      total: count || 0,
    };
  } catch (error) {
    console.error('Error listing artists:', error);
    return { artists: [], total: 0 };
  }
}

// Create artist
export async function createArtist(
  artist: Omit<ContentArtist, 'id' | 'createdAt' | 'updatedAt'>
): Promise<ContentArtist | null> {
  try {
    const { data, error } = await supabaseServer
      .from('artists')
      .insert({
        slug: artist.slug,
        name: artist.name,
        name_cn: artist.nameCn,
        discipline: artist.discipline,
        location: artist.location,
        year_started: artist.yearStarted,
        bio: artist.bio,
        statement: artist.statement,
        avatar: artist.avatar,
        cover_image: artist.coverImage,
        is_published: artist.isPublished,
      })
      .select()
      .single();

    if (error) throw error;

    return {
      id: data.id,
      slug: data.slug,
      name: data.name,
      nameCn: data.name_cn,
      discipline: data.discipline || [],
      location: data.location,
      yearStarted: data.year_started,
      bio: data.bio,
      statement: data.statement,
      avatar: data.avatar,
      coverImage: data.cover_image,
      isPublished: data.is_published,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
    };
  } catch (error) {
    console.error('Error creating artist:', error);
    return null;
  }
}

// Update artist
export async function updateArtist(
  id: string,
  updates: Partial<ContentArtist>
): Promise<ContentArtist | null> {
  try {
    const { data, error } = await supabaseServer
      .from('artists')
      .update({
        slug: updates.slug,
        name: updates.name,
        name_cn: updates.nameCn,
        discipline: updates.discipline,
        location: updates.location,
        year_started: updates.yearStarted,
        bio: updates.bio,
        statement: updates.statement,
        avatar: updates.avatar,
        cover_image: updates.coverImage,
        is_published: updates.isPublished,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    return {
      id: data.id,
      slug: data.slug,
      name: data.name,
      nameCn: data.name_cn,
      discipline: data.discipline || [],
      location: data.location,
      yearStarted: data.year_started,
      bio: data.bio,
      statement: data.statement,
      avatar: data.avatar,
      coverImage: data.cover_image,
      isPublished: data.is_published,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
    };
  } catch (error) {
    console.error('Error updating artist:', error);
    return null;
  }
}

// Delete artist
export async function deleteArtist(id: string): Promise<boolean> {
  try {
    const { error } = await supabaseServer.from('artists').delete().eq('id', id);
    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error deleting artist:', error);
    return false;
  }
}

// List stories
export async function listStories(options: {
  category?: string;
  isPublished?: boolean;
  limit?: number;
  offset?: number;
} = {}): Promise<{ stories: ContentStory[]; total: number }> {
  try {
    let query = supabaseClient
      .from('stories')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false });

    if (options.category) {
      query = query.eq('category', options.category);
    }

    if (options.isPublished !== undefined) {
      query = query.eq('is_published', options.isPublished);
    }

    const { data, error, count } = await query
      .range(options.offset || 0, (options.offset || 0) + (options.limit || 20) - 1);

    if (error) throw error;

    return {
      stories: (data || []).map((s: any) => ({
        id: s.id,
        slug: s.slug,
        title: s.title,
        excerpt: s.excerpt,
        content: s.content,
        author: s.author,
        category: s.category,
        coverImage: s.cover_image,
        readTime: s.read_time,
        isPublished: s.is_published,
        publishedAt: s.published_at,
        createdAt: s.created_at,
        updatedAt: s.updated_at,
      })),
      total: count || 0,
    };
  } catch (error) {
    console.error('Error listing stories:', error);
    return { stories: [], total: 0 };
  }
}

// Create story
export async function createStory(
  story: Omit<ContentStory, 'id' | 'createdAt' | 'updatedAt'>
): Promise<ContentStory | null> {
  try {
    const { data, error } = await supabaseServer
      .from('stories')
      .insert({
        slug: story.slug,
        title: story.title,
        excerpt: story.excerpt,
        content: story.content,
        author: story.author,
        category: story.category,
        cover_image: story.coverImage,
        read_time: story.readTime,
        is_published: story.isPublished,
        published_at: story.publishedAt,
      })
      .select()
      .single();

    if (error) throw error;

    return {
      id: data.id,
      slug: data.slug,
      title: data.title,
      excerpt: data.excerpt,
      content: data.content,
      author: data.author,
      category: data.category,
      coverImage: data.cover_image,
      readTime: data.read_time,
      isPublished: data.is_published,
      publishedAt: data.published_at,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
    };
  } catch (error) {
    console.error('Error creating story:', error);
    return null;
  }
}

// Update story
export async function updateStory(
  id: string,
  updates: Partial<ContentStory>
): Promise<ContentStory | null> {
  try {
    const { data, error } = await supabaseServer
      .from('stories')
      .update({
        slug: updates.slug,
        title: updates.title,
        excerpt: updates.excerpt,
        content: updates.content,
        author: updates.author,
        category: updates.category,
        cover_image: updates.coverImage,
        read_time: updates.readTime,
        is_published: updates.isPublished,
        published_at: updates.publishedAt,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    return {
      id: data.id,
      slug: data.slug,
      title: data.title,
      excerpt: data.excerpt,
      content: data.content,
      author: data.author,
      category: data.category,
      coverImage: data.cover_image,
      readTime: data.read_time,
      isPublished: data.is_published,
      publishedAt: data.published_at,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
    };
  } catch (error) {
    console.error('Error updating story:', error);
    return null;
  }
}

// Delete story
export async function deleteStory(id: string): Promise<boolean> {
  try {
    const { error } = await supabaseServer.from('stories').delete().eq('id', id);
    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error deleting story:', error);
    return false;
  }
}

// Get content statistics
export async function getContentStats(): Promise<{
  totalWorks: number;
  publishedWorks: number;
  totalArtists: number;
  publishedArtists: number;
  totalStories: number;
  publishedStories: number;
}> {
  try {
    const [{ count: totalWorks }, { count: publishedWorks },
           { count: totalArtists }, { count: publishedArtists },
           { count: totalStories }, { count: publishedStories }] = await Promise.all([
      supabaseClient.from('works').select('*', { count: 'exact', head: true }),
      supabaseClient.from('works').select('*', { count: 'exact', head: true }).eq('is_published', true),
      supabaseClient.from('artists').select('*', { count: 'exact', head: true }),
      supabaseClient.from('artists').select('*', { count: 'exact', head: true }).eq('is_published', true),
      supabaseClient.from('stories').select('*', { count: 'exact', head: true }),
      supabaseClient.from('stories').select('*', { count: 'exact', head: true }).eq('is_published', true),
    ]);

    return {
      totalWorks: totalWorks || 0,
      publishedWorks: publishedWorks || 0,
      totalArtists: totalArtists || 0,
      publishedArtists: publishedArtists || 0,
      totalStories: totalStories || 0,
      publishedStories: publishedStories || 0,
    };
  } catch (error) {
    console.error('Error getting content stats:', error);
    return {
      totalWorks: 0,
      publishedWorks: 0,
      totalArtists: 0,
      publishedArtists: 0,
      totalStories: 0,
      publishedStories: 0,
    };
  }
}
