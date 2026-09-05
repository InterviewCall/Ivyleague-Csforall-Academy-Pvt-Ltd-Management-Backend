import { Module } from '@nestjs/common';

import { UserStaffRepository } from './user-staff.repository.js';

@Module({
  providers: [UserStaffRepository],
  exports: [UserStaffRepository]
})
export class UserStaffModule {}
