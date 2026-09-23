-- CreateTable
CREATE TABLE `batch_placements` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `learner_id` INTEGER NOT NULL,
    `batch_id` INTEGER NOT NULL,
    `placement_reason` TEXT NOT NULL,
    `override_justification` TEXT NULL,
    `placed_by_user_id` INTEGER NOT NULL,
    `placed_at` DATETIME(3) NOT NULL,

    INDEX `batch_placements_learner_id_idx`(`learner_id`),
    INDEX `batch_placements_batch_id_idx`(`batch_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `batch_placements` ADD CONSTRAINT `batch_placements_learner_id_fkey` FOREIGN KEY (`learner_id`) REFERENCES `learner_lifecycles`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
