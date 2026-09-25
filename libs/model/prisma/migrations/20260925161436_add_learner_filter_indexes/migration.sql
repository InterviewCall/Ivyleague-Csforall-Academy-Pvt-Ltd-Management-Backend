-- CreateIndex
CREATE INDEX `users_userType_status_idx` ON `users`(`userType`, `status`);

-- CreateIndex
CREATE INDEX `users_userType_created_at_idx` ON `users`(`userType`, `created_at`);

-- CreateIndex
CREATE INDEX `users_userType_full_name_idx` ON `users`(`userType`, `full_name`);

-- CreateIndex
CREATE INDEX `users_userType_phone_idx` ON `users`(`userType`, `phone`);

-- CreateIndex
CREATE INDEX `users_userType_email_idx` ON `users`(`userType`, `email`);
