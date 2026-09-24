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
