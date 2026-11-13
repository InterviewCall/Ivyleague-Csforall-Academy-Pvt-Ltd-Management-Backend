/*
  Warnings:

  - A unique constraint covering the columns `[user_id]` on the table `learner_lifecycles` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `learner_lifecycles_user_id_key` ON `learner_lifecycles`(`user_id`);
