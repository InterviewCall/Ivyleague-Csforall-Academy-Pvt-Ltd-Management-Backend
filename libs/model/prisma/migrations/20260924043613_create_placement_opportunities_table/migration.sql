-- CreateTable
CREATE TABLE `placement_opportunities` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `learner_id` INTEGER NOT NULL,
    `company` VARCHAR(255) NOT NULL,
    `role` VARCHAR(255) NOT NULL,
    `package_offered` VARCHAR(100) NOT NULL,
    `shared_at` DATETIME(3) NOT NULL,
    `response_deadline` DATETIME(3) NOT NULL,
    `learner_response` ENUM('PENDING', 'INTERESTED', 'NOT_INTERESTED') NULL,
    `outcome` ENUM('PENDING', 'SELECTED', 'REJECTED', 'WITHDRAWN', 'EXPIRED') NULL,
    `coordinator_user_id` INTEGER NOT NULL,

    INDEX `placement_opportunities_learner_id_idx`(`learner_id`),
    INDEX `placement_opportunities_response_deadline_idx`(`response_deadline`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
