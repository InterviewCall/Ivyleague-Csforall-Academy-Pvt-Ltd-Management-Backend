import {
    Body,
    Controller,
    Headers,
    Param,
    Patch,
    Post,
} from '@nestjs/common';

import { CreateStaffDto, createStaffSchema } from './dto/create-staff.dto.js';
import {
    GrantBrandAccessDto,
    grantBrandAccessSchema,
} from './dto/grant-brand-access.dto.js';
import {
    UpdateUserStatusDto,
    updateUserStatusSchema,
} from './dto/update-user-status.dto.js';
import {
    GrantStaffRolesDto,
    grantStaffRolesSchema,
} from './dto/grant-staff-roles.dto.js';
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
        return this.userService.grantBrandAccessToStaff(publicId, payload);
    }

    @Patch(':publicId/status')
    updateStatus(
        @Param('publicId') publicId: string,
        @Body({ schema: updateUserStatusSchema }) payload: UpdateUserStatusDto,
        @Headers('x-user-id') actorUserId?: string,
    ) {
        return this.userService.updateUserStatus(publicId, payload, actorUserId);
    }

    @Post(':publicId/roles')
    grantRoles(
        @Param('publicId') publicId: string,
        @Body({ schema: grantStaffRolesSchema }) payload: GrantStaffRolesDto,
    ) {
        return this.userService.grantRolesToStaff(publicId, payload);
    }
}
