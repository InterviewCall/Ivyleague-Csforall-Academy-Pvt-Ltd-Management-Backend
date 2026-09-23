-- CreateTable
CREATE TABLE `checkins` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `learner_id` INTEGER NOT NULL,
    `scheduled_date` DATETIME(3) NOT NULL,
    `completed_date` DATETIME(3) NULL,
    `status_update` TEXT NOT NULL,
    `query_raised` BOOLEAN NOT NULL DEFAULT false,
    `query_resolution` TEXT NULL,
    `psa_user_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `checkins_learner_id_idx`(`learner_id`),
    INDEX `checkins_scheduled_date_idx`(`scheduled_date`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `checkins` ADD CONSTRAINT `checkins_learner_id_fkey` FOREIGN KEY (`learner_id`) REFERENCES `learner_lifecycles`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
