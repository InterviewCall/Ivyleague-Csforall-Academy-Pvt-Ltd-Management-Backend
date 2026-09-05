import { Injectable } from '@nestjs/common';

import { ModelService } from '@app/model';
import { Prisma, UserStaffRole } from '@app/model/generated/prisma/client.js';

@Injectable()
export class UserStaffRepository {
    constructor(private readonly prisma: ModelService) {}

    create(
        data: Prisma.UserStaffRoleCreateInput,
        tx: Prisma.TransactionClient,
    ): Promise<UserStaffRole> {
        return tx.userStaffRole.create({
            data,
        });
    }
}
