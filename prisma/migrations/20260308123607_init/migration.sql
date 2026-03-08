-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "avatar" TEXT,
    "role" TEXT NOT NULL DEFAULT 'COLLECTOR',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "lastLoginAt" DATETIME
);

-- CreateTable
CREATE TABLE "artists" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "nameEn" TEXT NOT NULL,
    "nameCn" TEXT,
    "bioEn" TEXT NOT NULL,
    "bioCn" TEXT,
    "statementEn" TEXT,
    "statementCn" TEXT,
    "location" TEXT NOT NULL,
    "yearStarted" INTEGER NOT NULL,
    "avatar" TEXT,
    "coverImage" TEXT,
    "website" TEXT,
    "instagram" TEXT,
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "isPublished" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "publishedAt" DATETIME
);

-- CreateTable
CREATE TABLE "artist_disciplines" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "artistId" TEXT NOT NULL,
    "discipline" TEXT NOT NULL,
    CONSTRAINT "artist_disciplines_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "artists" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "works" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "titleEn" TEXT NOT NULL,
    "titleCn" TEXT,
    "discipline" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "mediumEn" TEXT NOT NULL,
    "mediumCn" TEXT,
    "descriptionEn" TEXT,
    "descriptionCn" TEXT,
    "culturalContextEn" TEXT,
    "culturalContextCn" TEXT,
    "inscriptionEn" TEXT,
    "inscriptionCn" TEXT,
    "inscriptionTranslationEn" TEXT,
    "availability" TEXT NOT NULL DEFAULT 'AVAILABLE',
    "price" REAL,
    "isPriceNegotiable" BOOLEAN NOT NULL DEFAULT false,
    "currency" TEXT NOT NULL DEFAULT 'USD',
    "lotNumber" TEXT,
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "isPublished" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "publishedAt" DATETIME
);

-- CreateTable
CREATE TABLE "work_authors" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "workId" TEXT NOT NULL,
    "artistId" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'PRIMARY',
    "isPrimary" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "work_authors_workId_fkey" FOREIGN KEY ("workId") REFERENCES "works" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "work_authors_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "artists" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "work_images" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "workId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "altEn" TEXT NOT NULL,
    "altCn" TEXT,
    "isPrimary" BOOLEAN NOT NULL DEFAULT false,
    "order" INTEGER NOT NULL DEFAULT 0,
    "width" INTEGER,
    "height" INTEGER,
    CONSTRAINT "work_images_workId_fkey" FOREIGN KEY ("workId") REFERENCES "works" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "work_dimensions" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "workId" TEXT NOT NULL,
    "height" REAL,
    "width" REAL,
    "depth" REAL,
    "diameter" REAL,
    "unit" TEXT NOT NULL DEFAULT 'cm',
    CONSTRAINT "work_dimensions_workId_fkey" FOREIGN KEY ("workId") REFERENCES "works" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "provenance_items" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "workId" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "eventEn" TEXT NOT NULL,
    "eventCn" TEXT,
    "description" TEXT,
    "order" INTEGER NOT NULL,
    CONSTRAINT "provenance_items_workId_fkey" FOREIGN KEY ("workId") REFERENCES "works" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "auctions" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "titleEn" TEXT NOT NULL,
    "titleCn" TEXT,
    "descriptionEn" TEXT,
    "descriptionCn" TEXT,
    "status" TEXT NOT NULL DEFAULT 'UPCOMING',
    "startDate" DATETIME NOT NULL,
    "endDate" DATETIME NOT NULL,
    "coverImage" TEXT,
    "isPublished" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "auction_lots" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "auctionId" TEXT NOT NULL,
    "workId" TEXT NOT NULL,
    "lotNumber" TEXT NOT NULL,
    "estimateMin" REAL NOT NULL,
    "estimateMax" REAL NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'USD',
    "startingBid" REAL NOT NULL,
    "currentBid" REAL,
    "bidCount" INTEGER NOT NULL DEFAULT 0,
    "reserveMet" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "auction_lots_auctionId_fkey" FOREIGN KEY ("auctionId") REFERENCES "auctions" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "auction_lots_workId_fkey" FOREIGN KEY ("workId") REFERENCES "works" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "bids" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "lotId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "amount" REAL NOT NULL,
    "isAutoBid" BOOLEAN NOT NULL DEFAULT false,
    "maxAutoBid" REAL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "bids_lotId_fkey" FOREIGN KEY ("lotId") REFERENCES "auction_lots" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "bids_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "stories" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "titleEn" TEXT NOT NULL,
    "titleCn" TEXT,
    "subtitleEn" TEXT,
    "subtitleCn" TEXT,
    "excerptEn" TEXT NOT NULL,
    "excerptCn" TEXT,
    "category" TEXT NOT NULL,
    "coverImage" TEXT,
    "readTime" INTEGER NOT NULL,
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "isPublished" BOOLEAN NOT NULL DEFAULT true,
    "publishedAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "story_content_blocks" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "storyId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "contentEn" TEXT,
    "contentCn" TEXT,
    "order" INTEGER NOT NULL,
    CONSTRAINT "story_content_blocks_storyId_fkey" FOREIGN KEY ("storyId") REFERENCES "stories" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "story_content_images" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "blockId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "altEn" TEXT NOT NULL,
    "altCn" TEXT,
    "captionEn" TEXT,
    "captionCn" TEXT,
    CONSTRAINT "story_content_images_blockId_fkey" FOREIGN KEY ("blockId") REFERENCES "story_content_blocks" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "story_artists" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "storyId" TEXT NOT NULL,
    "artistId" TEXT NOT NULL,
    CONSTRAINT "story_artists_storyId_fkey" FOREIGN KEY ("storyId") REFERENCES "stories" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "story_artists_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "artists" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "story_authors" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "storyId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "avatar" TEXT,
    "bio" TEXT,
    CONSTRAINT "story_authors_storyId_fkey" FOREIGN KEY ("storyId") REFERENCES "stories" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "collections" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "titleEn" TEXT NOT NULL,
    "titleCn" TEXT,
    "subtitleEn" TEXT,
    "subtitleCn" TEXT,
    "descriptionEn" TEXT,
    "descriptionCn" TEXT,
    "type" TEXT NOT NULL,
    "coverImage" TEXT,
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "isPublished" BOOLEAN NOT NULL DEFAULT true,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "collection_works" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "collectionId" TEXT NOT NULL,
    "workId" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "noteEn" TEXT,
    "noteCn" TEXT,
    CONSTRAINT "collection_works_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "collections" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "collection_works_workId_fkey" FOREIGN KEY ("workId") REFERENCES "works" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "favorites" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "workId" TEXT NOT NULL,
    "notes" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "favorites_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "favorites_workId_fkey" FOREIGN KEY ("workId") REFERENCES "works" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "follows" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "artistId" TEXT NOT NULL,
    "notifyWorks" BOOLEAN NOT NULL DEFAULT true,
    "notifyAuctions" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "follows_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "follows_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "artists" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "inquiries" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "workId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "message" TEXT,
    "proposedPrice" REAL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "inquiries_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "inquiries_workId_fkey" FOREIGN KEY ("workId") REFERENCES "works" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "notifications" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "data" TEXT,
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "notifications_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "site_settings" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "page_views" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "path" TEXT NOT NULL,
    "referrer" TEXT,
    "userAgent" TEXT,
    "ip" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "artists_slug_key" ON "artists"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "artist_disciplines_artistId_discipline_key" ON "artist_disciplines"("artistId", "discipline");

-- CreateIndex
CREATE UNIQUE INDEX "works_slug_key" ON "works"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "work_authors_workId_artistId_role_key" ON "work_authors"("workId", "artistId", "role");

-- CreateIndex
CREATE UNIQUE INDEX "work_dimensions_workId_key" ON "work_dimensions"("workId");

-- CreateIndex
CREATE UNIQUE INDEX "auctions_slug_key" ON "auctions"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "auction_lots_auctionId_lotNumber_key" ON "auction_lots"("auctionId", "lotNumber");

-- CreateIndex
CREATE UNIQUE INDEX "stories_slug_key" ON "stories"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "story_content_images_blockId_key" ON "story_content_images"("blockId");

-- CreateIndex
CREATE UNIQUE INDEX "story_artists_storyId_artistId_key" ON "story_artists"("storyId", "artistId");

-- CreateIndex
CREATE UNIQUE INDEX "story_authors_storyId_key" ON "story_authors"("storyId");

-- CreateIndex
CREATE UNIQUE INDEX "collections_slug_key" ON "collections"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "collection_works_collectionId_workId_key" ON "collection_works"("collectionId", "workId");

-- CreateIndex
CREATE UNIQUE INDEX "favorites_userId_workId_key" ON "favorites"("userId", "workId");

-- CreateIndex
CREATE UNIQUE INDEX "follows_userId_artistId_key" ON "follows"("userId", "artistId");

-- CreateIndex
CREATE UNIQUE INDEX "site_settings_key_key" ON "site_settings"("key");

-- CreateIndex
CREATE INDEX "page_views_path_createdAt_idx" ON "page_views"("path", "createdAt");
