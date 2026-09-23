-- CreateTable
CREATE TABLE `risk_flags` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `learner_id` INTEGER NOT NULL,
    `reason` TEXT NOT NULL,
    `flagged_at` DATETIME(3) NOT NULL,
    `resolved_at` DATETIME(3) NULL,
    `resolved_by_user_id` INTEGER NULL,

    INDEX `risk_flags_learner_id_resolved_at_idx`(`learner_id`, `resolved_at`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `risk_flags` ADD CONSTRAINT `risk_flags_learner_id_fkey` FOREIGN KEY (`learner_id`) REFERENCES `learner_lifecycles`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
