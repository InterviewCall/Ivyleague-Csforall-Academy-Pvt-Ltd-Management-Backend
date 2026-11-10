-- AddForeignKey
ALTER TABLE `checkins` ADD CONSTRAINT `checkins_learner_id_fkey` FOREIGN KEY (`learner_id`) REFERENCES `learner_lifecycles`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
