import { ModelService } from '@app/model';
import { Prisma } from '@app/model/generated/prisma/client.js';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserBrandAccessRepository {
    constructor(private readonly prisma: ModelService) {}

    createMany(
        data: Prisma.UserBrandAccessCreateManyInput[],
        client: Prisma.TransactionClient,
    ): Promise<Prisma.BatchPayload> {
        return client.userBrandAccess.createMany({ data, skipDuplicates: true });
    }

    deleteByUserAndBrand(
        userId: number,
        brandId: number,
        client: Prisma.TransactionClient,
    ) {
        return client.userBrandAccess.deleteMany({ where: { userId, brandId } });
    }

    async findBrandCodesByUserId(userId: number): Promise<string[]> {
        const rows = await this.prisma.userBrandAccess.findMany({
            where: { userId },
            select: { brand: { select: { code: true } } },
            orderBy: { brandId: 'asc' },
        });

        return rows.map((row) => row.brand.code);
    }
}
