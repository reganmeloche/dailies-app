-- CreateTable
CREATE TABLE "Entry" (
    "id" UUID NOT NULL,
    "datetime" TIMESTAMP(3) NOT NULL,
    "day" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "content" JSONB NOT NULL,

    CONSTRAINT "Entry_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Entry_day_idx" ON "Entry"("day");

-- CreateIndex
CREATE INDEX "Entry_category_idx" ON "Entry"("category");
