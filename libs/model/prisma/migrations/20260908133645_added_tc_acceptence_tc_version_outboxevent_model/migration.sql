-- CreateTable
CREATE TABLE `tc_versions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `document` ENUM('PAYMENT_TERMS', 'PROGRAMME_TERMS') NOT NULL,
    `version` VARCHAR(20) NOT NULL,
    `brand_id` INTEGER NULL,
    `content` TEXT NOT NULL,
    `content_hash` CHAR(64) NOT NULL,
    `published_at` DATETIME(3) NOT NULL,
    `created_by_user_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `tc_versions_document_published_at_idx`(`document`, `published_at`),
    UNIQUE INDEX `tc_versions_brand_id_document_version_key`(`brand_id`, `document`, `version`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tc_acceptances` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `tc_version_id` INTEGER NOT NULL,
    `accepted_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `ip_address` VARCHAR(45) NOT NULL,
    `user_agent` VARCHAR(512) NULL,
    `pdf_storage_key` VARCHAR(512) NULL,
    `pdf_hash` CHAR(64) NULL,
    `pdf_generated_at` DATETIME(3) NULL,

    INDEX `tc_acceptances_user_id_accepted_at_idx`(`user_id`, `accepted_at`),
    UNIQUE INDEX `tc_acceptances_user_id_tc_version_id_key`(`user_id`, `tc_version_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `outbox_events` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `event_type` VARCHAR(100) NOT NULL,
    `aggregate_type` VARCHAR(50) NOT NULL,
    `aggregate_id` INTEGER NOT NULL,
    `payload` JSON NOT NULL,
    `status` ENUM('PENDING', 'PUBLISHED', 'FAILED') NOT NULL DEFAULT 'PENDING',
    `attempts` INTEGER NOT NULL DEFAULT 0,
    `last_error` TEXT NULL,
    `available_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `published_at` DATETIME(3) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `outbox_events_status_available_at_idx`(`status`, `available_at`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `tc_acceptances` ADD CONSTRAINT `tc_acceptances_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tc_acceptances` ADD CONSTRAINT `tc_acceptances_tc_version_id_fkey` FOREIGN KEY (`tc_version_id`) REFERENCES `tc_versions`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
