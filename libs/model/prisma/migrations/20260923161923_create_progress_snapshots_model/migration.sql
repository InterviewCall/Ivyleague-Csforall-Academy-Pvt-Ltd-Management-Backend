-- CreateTable
CREATE TABLE `learner_lifecycles` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `brand_id` INTEGER NOT NULL,
    `current_status` ENUM('PENDING_PAYMENT', 'ENROLLED', 'ONBOARDING', 'ASSESSMENT', 'ACTIVE_DSA', 'DSA_REVIEW', 'ACTIVE_SYSTEM_DESIGN', 'READY_FOR_PLACEMENT', 'PLACEMENT_ACTIVE', 'COMPLETED', 'PAUSED', 'OFFBOARDED', 'REFUNDED', 'LAPSED') NOT NULL DEFAULT 'PENDING_PAYMENT',
    `status_updated_at` DATETIME(3) NOT NULL,
    `status_update_reason` TEXT NULL,
    `status_updated_by_user_id` INTEGER NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ta_assessments` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `learner_id` INTEGER NOT NULL,
    `session_number` INTEGER NOT NULL,
    `problems_given` INTEGER NOT NULL,
    `solved_count` INTEGER NOT NULL,
    `time_taken_minutes` INTEGER NOT NULL,
    `recommended_level` VARCHAR(50) NOT NULL,
    `learner_facing_summary` TEXT NOT NULL,
    `internal_note` TEXT NULL,
    `ta_user_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `ta_assessments_learner_id_session_number_key`(`learner_id`, `session_number`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

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

-- CreateTable
CREATE TABLE `progress_snapshots` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `learner_id` INTEGER NOT NULL,
    `phase` VARCHAR(50) NOT NULL,
    `attendance_pct` DOUBLE NOT NULL,
    `assignment_pct` DOUBLE NOT NULL,
    `mock_score_pct` DOUBLE NOT NULL,
    `synced_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `progress_snapshots_learner_id_phase_idx`(`learner_id`, `phase`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ta_assessments` ADD CONSTRAINT `ta_assessments_learner_id_fkey` FOREIGN KEY (`learner_id`) REFERENCES `learner_lifecycles`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `batch_placements` ADD CONSTRAINT `batch_placements_learner_id_fkey` FOREIGN KEY (`learner_id`) REFERENCES `learner_lifecycles`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `risk_flags` ADD CONSTRAINT `risk_flags_learner_id_fkey` FOREIGN KEY (`learner_id`) REFERENCES `learner_lifecycles`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `dsa_reviews` ADD CONSTRAINT `dsa_reviews_learner_id_fkey` FOREIGN KEY (`learner_id`) REFERENCES `learner_lifecycles`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `offboardings` ADD CONSTRAINT `offboardings_learner_id_fkey` FOREIGN KEY (`learner_id`) REFERENCES `learner_lifecycles`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
