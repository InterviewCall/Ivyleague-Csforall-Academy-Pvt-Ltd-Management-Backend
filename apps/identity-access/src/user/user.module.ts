import { Module } from '@nestjs/common';
import { UserService } from './user.service.js';
import { UserController } from './user.controller.js';
import { UserRepository } from './user.repsitory.js';
import { UserStaffModule } from '../user-staff/user-staff.module.js';
import { HashModule } from '../hash/hash.module.js';
import { InviteTokenModule } from '../invite-token/invite-token.module.js';

@Module({
  imports: [UserStaffModule, HashModule, InviteTokenModule],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserRepository]
})
export class UserModule {}
