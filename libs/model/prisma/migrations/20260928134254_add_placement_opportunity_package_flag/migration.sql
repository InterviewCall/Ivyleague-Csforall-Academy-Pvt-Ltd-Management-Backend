/*
  Warnings:

  - You are about to alter the column `package_offered` on the `placement_opportunities` table. The data in that column could be lost. The data in that column will be cast from `VarChar(100)` to `Decimal(12,2)`.

*/
-- DropIndex
DROP INDEX `users_userType_created_at_idx` ON `users`;

-- DropIndex
DROP INDEX `users_userType_email_idx` ON `users`;

-- DropIndex
DROP INDEX `users_userType_full_name_idx` ON `users`;

-- DropIndex
DROP INDEX `users_userType_phone_idx` ON `users`;

-- DropIndex
DROP INDEX `users_userType_status_idx` ON `users`;

-- AlterTable
ALTER TABLE `placement_opportunities` ADD COLUMN `flagged` BOOLEAN NOT NULL DEFAULT false,
    MODIFY `package_offered` DECIMAL(12, 2) NOT NULL;
