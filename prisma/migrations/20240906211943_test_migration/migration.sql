/*
  Warnings:

  - The primary key for the `project` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `ownerId` on the `project` table. All the data in the column will be lost.
  - You are about to alter the column `id` on the `project` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to drop the column `email` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `family` on the `user` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `category_id` to the `project` table without a default value. This is not possible if the table is not empty.
  - Made the column `name` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX `user_email_key` ON `user`;

-- AlterTable
ALTER TABLE `project` DROP PRIMARY KEY,
    DROP COLUMN `ownerId`,
    ADD COLUMN `category_id` INTEGER NOT NULL,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `user` DROP COLUMN `email`,
    DROP COLUMN `family`,
    MODIFY `name` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `category` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `category_name_key`(`name`),
    UNIQUE INDEX `category_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `image` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `url` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `project_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `user_name_key` ON `user`(`name`);

-- AddForeignKey
ALTER TABLE `image` ADD CONSTRAINT `image_project_id_fkey` FOREIGN KEY (`project_id`) REFERENCES `project`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `project` ADD CONSTRAINT `project_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
