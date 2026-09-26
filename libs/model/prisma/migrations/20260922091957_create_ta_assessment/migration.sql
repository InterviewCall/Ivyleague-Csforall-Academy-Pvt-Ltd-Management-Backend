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

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ta_assessments` ADD CONSTRAINT `ta_assessments_learner_id_fkey` FOREIGN KEY (`learner_id`) REFERENCES `learner_lifecycles`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
