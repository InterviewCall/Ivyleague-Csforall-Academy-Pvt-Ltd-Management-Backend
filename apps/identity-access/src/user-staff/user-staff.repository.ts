import { Injectable } from '@nestjs/common';

import { ModelService } from '@app/model';
import {
    Prisma,
    StaffRole,
} from '@app/model/generated/prisma/client.js';

@Injectable()
export class UserStaffRepository {
    constructor(private readonly prisma: ModelService) {}

    createMany(
        data: Prisma.UserStaffRoleCreateManyInput[],
        client: Prisma.TransactionClient,
    ): Promise<Prisma.BatchPayload> {
        return client.userStaffRole.createMany({ data, skipDuplicates: true });
    }

    async findRolesByUserId(userId: number): Promise<StaffRole[]> {
        const rows = await this.prisma.userStaffRole.findMany({
            where: { userId },
            select: { role: true },
            orderBy: { role: 'asc' },
        });

        return rows.map((row) => row.role);
    }
}
