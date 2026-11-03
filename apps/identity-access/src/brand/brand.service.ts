import { Injectable,NotFoundException } from '@nestjs/common';

import { CreateBrandDto } from './dto/create-brand.dto.js';
import { UpdateBrandDto } from './dto/update-brand.dto.js';
import { BrandRepository } from './brand.repository.js';
import { Brand, Prisma} from '@app/model/generated/prisma/client.js';

@Injectable()
export class BrandService {
    constructor(private readonly brandRepository: BrandRepository) {}

    createBrand(payload: CreateBrandDto): Promise<Brand> {
        return this.brandRepository.create(payload);
    }

    findAll() {
        return `This action returns all brand`;
    }

    findOne(id: number) {
        return `This action returns a #${id} brand`;
    }

    async update(id: number,updateBrandDto: UpdateBrandDto,): Promise<Brand> {
        try {
            return await this.brandRepository.update(id, updateBrandDto);
        } catch (error) {
            if (
                error instanceof Prisma.PrismaClientKnownRequestError &&
                error.code === 'P2025'
            ) {
                throw new NotFoundException(`Brand with ID ${id} not found`);
            }

            throw error;
        }
    }

    remove(id: number) {
        return `This action removes a #${id} brand`;
    }
}
