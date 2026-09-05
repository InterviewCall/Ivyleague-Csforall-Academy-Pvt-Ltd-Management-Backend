import { ModelService } from '@app/model';
import { Brand, Prisma } from '@app/model/generated/prisma/client.js';
import { Injectable } from '@nestjs/common';


@Injectable()
export class BrandRepository {
    constructor(private readonly prisma: ModelService) {}

    create(data: Prisma.BrandCreateInput): Promise<Brand> {
        return this.prisma.brand.create({ data });
    }
}