/*
  Warnings:

  - A unique constraint covering the columns `[learner_id,session_number]` on the table `ta_assessments` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `ta_assessments_learner_id_session_number_key` ON `ta_assessments`(`learner_id`, `session_number`);
