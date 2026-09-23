-- CreateTable
CREATE TABLE `escalation_cases` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `learner_id` INTEGER NOT NULL,
    `case_type` VARCHAR(50) NOT NULL,
    `status` VARCHAR(50) NOT NULL,
    `decision` TEXT NULL,
    `decided_by_user_id` INTEGER NULL,
    `decided_at` DATETIME(3) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
