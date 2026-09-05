import { Module } from '@nestjs/common';
import { UserService } from './user.service.js';
import { UserController } from './user.controller.js';
import { UserRepository } from './user.repsitory.js';
import { UserStaffModule } from '../user-staff/user-staff.module.js';
import { HashModule } from '../hash/hash.module.js';

@Module({
  imports: [UserStaffModule, HashModule],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserRepository]
})
export class UserModule {}
