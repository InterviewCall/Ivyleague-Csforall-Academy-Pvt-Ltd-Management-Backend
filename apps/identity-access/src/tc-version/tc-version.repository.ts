import { Injectable } from '@nestjs/common';

import { ModelService } from '@app/model';

import {
    Prisma,
    TcDocument,
    TcVersion,
} from '@app/model/generated/prisma/client.js';

@Injectable()
export class TcVersionRepository {
    constructor(private readonly prisma: ModelService) {}

    async findLatestVersion(
        document: TcDocument,
        brandId: number | null,
    ): Promise<number> {
        const latest = await this.prisma.tcVersion.findFirst({
            where: { document, brandId },
            orderBy: { version: 'desc' },
            select: { version: true },
        });

        return latest?.version ?? 0;
    }

    create(data: Prisma.TcVersionCreateInput): Promise<TcVersion> {
        return this.prisma.tcVersion.create({ data });
    }

    async findCurrent(
        document: TcDocument,
        brandId: number | null,
    ): Promise<TcVersion | null> {
        const now = new Date();

        if (brandId !== null) {
            const branded = await this.prisma.tcVersion.findFirst({
                where: { document, brandId, publishedAt: { lte: now } },
                orderBy: { publishedAt: 'desc' },
            });

            if (branded) {
                return branded;
            }
        }

        return this.prisma.tcVersion.findFirst({
            where: { document, brandId: null, publishedAt: { lte: now } },
            orderBy: { publishedAt: 'desc' },
        });
    }
}
