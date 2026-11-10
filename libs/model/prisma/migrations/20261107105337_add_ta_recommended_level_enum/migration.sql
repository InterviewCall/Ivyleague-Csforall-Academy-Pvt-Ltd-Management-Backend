/*
  Warnings:

  - You are about to alter the column `recommended_level` on the `ta_assessments` table. The data in that column could be lost. The data in that column will be cast from `VarChar(50)` to `Enum(EnumId(7))`.

*/
-- AlterTable
ALTER TABLE `ta_assessments` MODIFY `recommended_level` ENUM('beginner', 'intermediate', 'advance') NOT NULL;
