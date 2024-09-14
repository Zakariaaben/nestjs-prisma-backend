/*
  Warnings:

  - You are about to drop the column `createdAt` on the `category` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `category` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `image` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `project` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `project` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `category` DROP COLUMN `createdAt`,
    DROP COLUMN `updatedAt`,
    ADD COLUMN `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updated_at` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `image` DROP COLUMN `createdAt`,
    ADD COLUMN `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `project` DROP COLUMN `createdAt`,
    DROP COLUMN `updatedAt`,
    ADD COLUMN `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updated_at` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `createdAt`,
    DROP COLUMN `updatedAt`,
    ADD COLUMN `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updated_at` DATETIME(3) NULL;
