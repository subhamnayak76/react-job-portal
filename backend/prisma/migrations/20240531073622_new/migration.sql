/*
  Warnings:

  - Added the required column `email` to the `Job` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Job` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `Job` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Job" ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "phone" TEXT NOT NULL;
