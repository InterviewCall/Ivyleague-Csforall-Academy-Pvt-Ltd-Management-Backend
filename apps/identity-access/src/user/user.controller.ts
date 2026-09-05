import { Body, Controller, Param, Post } from '@nestjs/common';

import { CreateStaffDto, createStaffSchema } from './dto/create-staff.dto.js';
import {
    GrantBrandAccessDto,
    grantBrandAccessSchema,
} from './dto/grant-brand-access.dto.js';
import { UserService } from './user.service.js';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('staff')
    createStaff(@Body({ schema: createStaffSchema }) payload: CreateStaffDto) {
        return this.userService.createStaff(payload);
    }

    @Post(':publicId/brand-access')
    grantBrandAccess(
        @Param('publicId') publicId: string,
        @Body({ schema: grantBrandAccessSchema }) payload: GrantBrandAccessDto,
    ) {
        return this.userService.grantBrandAccess(publicId, payload);
    }
}
