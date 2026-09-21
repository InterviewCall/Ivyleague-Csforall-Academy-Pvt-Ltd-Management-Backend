/*
  Warnings:

  - You are about to alter the column `version` on the `tc_versions` table. The data in that column could be lost. The data in that column will be cast from `VarChar(20)` to `Int`.

*/
-- AlterTable
ALTER TABLE `tc_versions` MODIFY `version` INTEGER NOT NULL;
