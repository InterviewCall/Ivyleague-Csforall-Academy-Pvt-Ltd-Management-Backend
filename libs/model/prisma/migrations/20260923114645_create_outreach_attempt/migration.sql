-- CreateTable
CREATE TABLE `outreach_attempts` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `risk_flag_id` INTEGER NOT NULL,
    `attempt_number` INTEGER NOT NULL,
    `channel` VARCHAR(20) NOT NULL,
    `attempted_at` DATETIME(3) NOT NULL,
    `outcome` TEXT NOT NULL,
    `learner_reason` TEXT NOT NULL,

    INDEX `outreach_attempts_risk_flag_id_idx`(`risk_flag_id`),
    UNIQUE INDEX `outreach_attempts_risk_flag_id_attempt_number_key`(`risk_flag_id`, `attempt_number`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `outreach_attempts` ADD CONSTRAINT `outreach_attempts_risk_flag_id_fkey` FOREIGN KEY (`risk_flag_id`) REFERENCES `risk_flags`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
