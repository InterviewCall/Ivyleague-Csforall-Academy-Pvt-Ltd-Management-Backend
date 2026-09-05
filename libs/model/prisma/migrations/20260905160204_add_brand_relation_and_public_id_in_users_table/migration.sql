/*
  Warnings:

  - A unique constraint covering the columns `[public_id]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - The required column `public_id` was added to the `users` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE `users` ADD COLUMN `brand_id` INTEGER NULL,
    ADD COLUMN `public_id` CHAR(36) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `users_public_id_key` ON `users`(`public_id`);

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_brand_id_fkey` FOREIGN KEY (`brand_id`) REFERENCES `brands`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
