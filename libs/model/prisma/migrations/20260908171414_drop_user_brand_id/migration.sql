/*
  Warnings:

  - You are about to drop the column `brand_id` on the `users` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `users` DROP FOREIGN KEY `users_brand_id_fkey`;

-- DropIndex
DROP INDEX `users_brand_id_fkey` ON `users`;

-- AlterTable
ALTER TABLE `users` DROP COLUMN `brand_id`;
