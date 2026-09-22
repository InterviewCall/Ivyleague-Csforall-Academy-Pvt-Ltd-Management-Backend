-- CreateTable
CREATE TABLE `notification_logs` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `template_id` INTEGER NOT NULL,
    `recipient_user_id` INTEGER NOT NULL,
    `channel` VARCHAR(50) NOT NULL,
    `status` VARCHAR(50) NOT NULL,
    `sent_at` DATETIME(3) NULL,

    INDEX `notification_logs_recipient_user_id_idx`(`recipient_user_id`),
    INDEX `notification_logs_status_idx`(`status`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `notification_templates_brand_id_template_key_channel_idx` ON `notification_templates`(`brand_id`, `template_key`, `channel`);

-- AddForeignKey
ALTER TABLE `notification_logs` ADD CONSTRAINT `notification_logs_template_id_fkey` FOREIGN KEY (`template_id`) REFERENCES `notification_templates`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
