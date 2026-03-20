import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import WorkDetailClient from '@/components/works/WorkDetailClient';
import { type ArtworkImage } from '@/lib/artwork-data';

interface WorkPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: WorkPageProps) {
  const { slug } = await params;
  const work = await prisma.work.findUnique({
    where: { slug },
  });

  if (!work) {
    return { title: 'Work Not Found | CarveEast' };
  }

  const titleCn = work.titleCn || work.title;
  return {
    title: `${titleCn} | CarveEast`,
    description: work.description?.slice(0, 160) || work.descriptionCn?.slice(0, 160),
  };
}

export default async function WorkPage({ params }: WorkPageProps) {
  const { slug } = await params;

  // Fetch work from database
  const work = await prisma.work.findUnique({
    where: { slug },
    include: { artist: true },
  });

  if (!work || !work.isPublished) {
    notFound();
  }

  // Parse JSON fields
  const images: ArtworkImage[] = JSON.parse(work.images || '[]');
  const tags: string[] = work.tags ? JSON.parse(work.tags) : [];

  // Fetch related works from same artist
  const relatedWorks = await prisma.work.findMany({
    where: {
      artistId: work.artistId,
      isPublished: true,
      id: { not: work.id },
    },
    take: 4,
  });

  // Transform data for client component
  const workData = {
    slug: work.slug,
    title: work.title,
    titleCn: work.titleCn || undefined,
    artistName: work.artistName,
    artistSlug: work.artist?.slug,
    year: work.year,
    medium: work.medium,
    stoneColor: (work as any).stoneColor,
    dimensions: work.dimensions || 'N/A',
    weight: (work as any).weight,
    carvingStyle: (work as any).carvingStyle,
    sealStyle: (work as any).sealStyle,
    scriptType: (work as any).scriptType,
    characterCount: (work as any).characterCount,
    layout: (work as any).layout,
    price: work.price || undefined,
    currency: work.currency,
    availability: work.availability,
    certification: (work as any).certification,
    provenance: (work as any).provenance,
    images,
    description: work.description || undefined,
    descriptionCn: (work as any).descriptionCn,
    tags,
  };

  const relatedWorksData = relatedWorks.map(r => ({
    slug: r.slug,
    title: r.title,
    titleCn: r.titleCn || undefined,
    artistName: r.artistName,
    price: r.price || undefined,
    currency: r.currency,
    availability: r.availability,
    images: JSON.parse(r.images || '[]') as ArtworkImage[],
  }));

  return (
    <>
      <Header />
      <WorkDetailClient work={workData} relatedWorks={relatedWorksData} />
      <Footer />
    </>
  );
}
