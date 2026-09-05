import { Body, Controller, Post } from '@nestjs/common';

import { CreateStaffDto, createStaffSchema } from './dto/create-staff.dto.js';
import { UserService } from './user.service.js';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('staff')
    createStaff(@Body({ schema: createStaffSchema }) payload: CreateStaffDto) {
        return this.userService.createStaff(payload);
    }
}
