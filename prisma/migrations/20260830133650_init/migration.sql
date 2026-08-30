/*
  Warnings:

  - You are about to drop the column `description` on the `College` table. All the data in the column will be lost.
  - You are about to drop the column `state` on the `College` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `College` table. All the data in the column will be lost.
  - You are about to drop the column `website` on the `College` table. All the data in the column will be lost.
  - The `courses` column on the `College` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `averagePackage` to the `College` table without a default value. This is not possible if the table is not empty.
  - Added the required column `highestPackage` to the `College` table without a default value. This is not possible if the table is not empty.
  - Added the required column `overview` to the `College` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `fees` on the `College` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Made the column `rating` on table `College` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "College" DROP COLUMN "description",
DROP COLUMN "state",
DROP COLUMN "type",
DROP COLUMN "website",
ADD COLUMN     "averagePackage" INTEGER NOT NULL,
ADD COLUMN     "highestPackage" INTEGER NOT NULL,
ADD COLUMN     "overview" TEXT NOT NULL,
DROP COLUMN "courses",
ADD COLUMN     "courses" TEXT[],
DROP COLUMN "fees",
ADD COLUMN     "fees" INTEGER NOT NULL,
ALTER COLUMN "rating" SET NOT NULL;
