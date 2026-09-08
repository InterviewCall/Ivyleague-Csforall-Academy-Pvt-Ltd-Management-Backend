import { Body, Controller, Param, Patch, Post } from '@nestjs/common';

import { AccessRole, CurrentUser, Roles } from '@app/rbac';
import type { Principal } from '@app/rbac';

import {
    CreateLearnerDto,
    createLearnerSchema,
} from './dto/create-learner.dto.js';
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

    @Roles(AccessRole.SALES, AccessRole.ACADEMIC_HEAD)
    @Post('learners')
    createLearner(
        @Body({ schema: createLearnerSchema }) payload: CreateLearnerDto,
    ) {
        return this.userService.createLearner(payload);
    }

    @Roles(AccessRole.ADMIN)
    @Post('staff')
    createStaff(@Body({ schema: createStaffSchema }) payload: CreateStaffDto) {
        return this.userService.createStaff(payload);
    }

    @Roles(AccessRole.ADMIN)
    @Post(':publicId/brand-access')
    grantBrandAccess(
        @Param('publicId') publicId: string,
        @Body({ schema: grantBrandAccessSchema }) payload: GrantBrandAccessDto,
    ) {
        return this.userService.grantBrandAccessToStaff(publicId, payload);
    }

    @Roles(AccessRole.ADMIN)
    @Patch(':publicId/status')
    updateStatus(
        @Param('publicId') publicId: string,
        @Body({ schema: updateUserStatusSchema }) payload: UpdateUserStatusDto,
        @CurrentUser() actor?: Principal,
    ) {
        return this.userService.updateUserStatus(
            publicId,
            payload,
            actor?.userId,
        );
    }

    @Roles(AccessRole.ADMIN)
    @Post(':publicId/roles')
    grantRoles(
        @Param('publicId') publicId: string,
        @Body({ schema: grantStaffRolesSchema }) payload: GrantStaffRolesDto,
    ) {
        return this.userService.grantRolesToStaff(publicId, payload);
    }
}
