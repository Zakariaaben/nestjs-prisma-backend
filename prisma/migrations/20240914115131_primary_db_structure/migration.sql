/*
  Warnings:

  - A unique constraint covering the columns `[url]` on the table `image` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `project` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `project` table without a default value. This is not possible if the table is not empty.
  - Made the column `description` on table `project` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `updatedAt` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `image` DROP FOREIGN KEY `image_project_id_fkey`;

-- DropForeignKey
ALTER TABLE `project` DROP FOREIGN KEY `project_category_id_fkey`;

-- AlterTable
ALTER TABLE `category` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `image` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `project_id` INTEGER NULL;

-- AlterTable
ALTER TABLE `project` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `published` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL,
    MODIFY `description` VARCHAR(191) NOT NULL,
    MODIFY `category_id` INTEGER NULL;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `email` VARCHAR(191) NULL DEFAULT '',
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `image_url_key` ON `image`(`url`);

-- CreateIndex
CREATE UNIQUE INDEX `project_name_key` ON `project`(`name`);

-- CreateIndex
CREATE UNIQUE INDEX `user_email_key` ON `user`(`email`);

-- AddForeignKey
ALTER TABLE `image` ADD CONSTRAINT `image_project_id_fkey` FOREIGN KEY (`project_id`) REFERENCES `project`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `project` ADD CONSTRAINT `project_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `category`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
