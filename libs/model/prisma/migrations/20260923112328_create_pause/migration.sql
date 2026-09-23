-- CreateTable
CREATE TABLE `pauses` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `learner_id` INTEGER NOT NULL,
    `reason` TEXT NOT NULL,
    `requested_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `expected_return_date` DATETIME(3) NOT NULL,
    `auto_review_at` DATETIME(3) NOT NULL,
    `resumed_at` DATETIME(3) NULL,

    INDEX `pauses_learner_id_idx`(`learner_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `pauses` ADD CONSTRAINT `pauses_learner_id_fkey` FOREIGN KEY (`learner_id`) REFERENCES `learner_lifecycles`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
