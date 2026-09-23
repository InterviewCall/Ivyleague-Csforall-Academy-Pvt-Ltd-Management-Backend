-- CreateTable
CREATE TABLE `dsa_reviews` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `learner_id` INTEGER NOT NULL,
    `final_marks` INTEGER NOT NULL,
    `passed` BOOLEAN NOT NULL,
    `reason` TEXT NOT NULL,
    `reviewed_by_user_id` INTEGER NOT NULL,
    `reviewed_at` DATETIME(3) NOT NULL,

    INDEX `dsa_reviews_learner_id_idx`(`learner_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `dsa_reviews` ADD CONSTRAINT `dsa_reviews_learner_id_fkey` FOREIGN KEY (`learner_id`) REFERENCES `learner_lifecycles`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
