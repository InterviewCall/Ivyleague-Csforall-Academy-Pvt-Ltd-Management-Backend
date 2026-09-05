import { ModelService } from '@app/model';
import { Prisma } from '@app/model/generated/prisma/client.js';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserBrandAccessRepository {
    constructor(private readonly prisma: ModelService) {}

    /**
     * `skipDuplicates` makes granting idempotent: re-granting a brand the staff
     * member already has is a no-op rather than a unique-constraint failure that
     * would abort the whole grant.
     *
     * Takes a client rather than a transaction specifically, so callers already
     * inside a transaction (staff creation) can pass `tx` and callers that are
     * not can pass the plain client — createMany is atomic on its own.
     */
    createMany(
        data: Prisma.UserBrandAccessCreateManyInput[],
        tx: Prisma.TransactionClient,
    ): Promise<Prisma.BatchPayload> {
        return tx.userBrandAccess.createMany({ data, skipDuplicates: true });
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
