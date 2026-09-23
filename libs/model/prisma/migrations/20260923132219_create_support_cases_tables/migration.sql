-- CreateTable
CREATE TABLE `Ticket` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `learnerId` INTEGER NOT NULL,
    `category` VARCHAR(191) NOT NULL,
    `description` TEXT NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `ownerUserId` INTEGER NULL,
    `resolution` TEXT NULL,
    `learnerAccepted` BOOLEAN NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `resolvedAt` DATETIME(3) NULL,

    INDEX `Ticket_learnerId_idx`(`learnerId`),
    INDEX `Ticket_status_idx`(`status`),
    INDEX `Ticket_ownerUserId_idx`(`ownerUserId`),
    INDEX `Ticket_createdAt_idx`(`createdAt`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EscalationCase` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `learnerId` INTEGER NOT NULL,
    `caseType` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `decision` TEXT NULL,
    `decidedByUserId` INTEGER NULL,
    `decidedAt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `EscalationCase_learnerId_idx`(`learnerId`),
    INDEX `EscalationCase_caseType_idx`(`caseType`),
    INDEX `EscalationCase_status_idx`(`status`),
    INDEX `EscalationCase_decidedByUserId_idx`(`decidedByUserId`),
    INDEX `EscalationCase_createdAt_idx`(`createdAt`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
