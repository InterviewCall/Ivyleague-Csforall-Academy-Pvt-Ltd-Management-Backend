import { ConflictException, Injectable } from '@nestjs/common';

import { CreateBrandDto } from './dto/create-brand.dto.js';
import { UpdateBrandDto } from './dto/update-brand.dto.js';
import { GetBrandsQueryDto } from './dto/get-brands-query.dto.js';
import { BrandRepository } from './brand.repository.js';
import { Brand, Prisma} from '@app/model/generated/prisma/client.js';

@Injectable()
export class BrandService {
    constructor(private readonly brandRepository: BrandRepository) {}

    async createBrand(payload: CreateBrandDto): Promise<Brand> {
        try {
            return await this.brandRepository.create(payload);
        } catch (error) {
            if (
                error instanceof Prisma.PrismaClientKnownRequestError &&
                error.code === 'P2002'
            ) {
                throw new ConflictException(
                    'A brand with this code already exists',
                );
            }

            throw error;
        }
    }

    async findAll(query: GetBrandsQueryDto): Promise<{
        items: Brand[];
        page: number;
        pageSize: number;
        totalItems: number;
    }> {
        const page = await this.brandRepository.findBrandPage(query);

        return {
            items: page.rows,
            page: query.page,
            pageSize: query.pageSize,
            totalItems: page.count,
        };
    }

    findOne(id: number) {
        return `This action returns a #${id} brand`;
    }

    update(id: number, updateBrandDto: UpdateBrandDto) {
        return `This action updates a #${id} brand`;
    }

    remove(id: number) {
        return `This action removes a #${id} brand`;
    }
}
