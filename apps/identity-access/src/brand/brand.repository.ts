import { ModelService } from '@app/model';
import { Brand, Prisma } from '@app/model/generated/prisma/client.js';
import { Injectable } from '@nestjs/common';
import { GetBrandsQueryDto } from './dto/get-brands-query.dto.js';

@Injectable()
export class BrandRepository {
    constructor(private readonly prisma: ModelService) {}

    create(data: Prisma.BrandCreateInput): Promise<Brand> {
        return this.prisma.brand.create({ data });
    }

    findManyByCodes(codes: string[]): Promise<Brand[]> {
        return this.prisma.brand.findMany({
            where: {
                code: {
                    in: codes,
                },
            },
        });
    }

    async findBrandPage(
        filters: GetBrandsQueryDto,
    ): Promise<{ rows: Brand[]; count: number }> {
        const where: Prisma.BrandWhereInput = {
            ...(filters.search.length >= 2 && {
                OR: [
                    { name: { contains: filters.search } },
                    { code: { contains: filters.search } },
                ],
            }),
            ...(filters.gstInclusive !== undefined && {
                gstInclusive: filters.gstInclusive,
            }),
            ...(filters.baseFeeMin !== undefined || filters.baseFeeMax !== undefined
                ? {
                    baseFee: {
                        ...(filters.baseFeeMin !== undefined && {
                            gte: filters.baseFeeMin,
                        }),
                        ...(filters.baseFeeMax !== undefined && {
                            lte: filters.baseFeeMax,
                        }),
                    },
                }
                : {}),
            ...(filters.gstRateMin !== undefined || filters.gstRateMax !== undefined
                ? {
                    gstRate: {
                        ...(filters.gstRateMin !== undefined && {
                            gte: filters.gstRateMin,
                        }),
                        ...(filters.gstRateMax !== undefined && {
                            lte: filters.gstRateMax,
                        }),
                    },
                }
                : {}),
            ...(filters.placementPackageCeilingMin !== undefined ||
            filters.placementPackageCeilingMax !== undefined
                ? {
                    placementPackageCeiling: {
                        ...(filters.placementPackageCeilingMin !== undefined && {
                            gte: filters.placementPackageCeilingMin,
                        }),
                        ...(filters.placementPackageCeilingMax !== undefined && {
                            lte: filters.placementPackageCeilingMax,
                        }),
                    },
                }
                : {}),
        };

        const [rows, count] = await Promise.all([
            this.prisma.brand.findMany({
                where,
                orderBy: [{ name: 'asc' }, { id: 'asc' }],
                skip: (filters.page - 1) * filters.pageSize,
                take: filters.pageSize,
            }),
            this.prisma.brand.count({ where }),
        ]);

        return { rows, count };
    }
}
