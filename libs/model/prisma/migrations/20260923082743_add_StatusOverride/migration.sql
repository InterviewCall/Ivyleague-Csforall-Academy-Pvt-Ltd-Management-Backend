-- AlterTable
ALTER TABLE `learner_lifecycles` ADD COLUMN `status_update_reason` TEXT NULL,
    ADD COLUMN `status_updated_by_user_id` INTEGER NULL;
