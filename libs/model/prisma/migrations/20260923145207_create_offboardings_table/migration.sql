-- CreateTable
CREATE TABLE `offboardings` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `learner_id` INTEGER NOT NULL,
    `reason_code` VARCHAR(191) NOT NULL,
    `offboarded_at` DATETIME(3) NOT NULL,
    `approved_by_user_id` INTEGER NOT NULL,

    INDEX `offboardings_learner_id_idx`(`learner_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `offboardings` ADD CONSTRAINT `offboardings_learner_id_fkey` FOREIGN KEY (`learner_id`) REFERENCES `learner_lifecycles`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
