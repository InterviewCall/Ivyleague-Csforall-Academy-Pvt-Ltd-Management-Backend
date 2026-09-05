import { Injectable } from '@nestjs/common';

import { CreateBrandDto } from './dto/create-brand.dto.js';
import { UpdateBrandDto } from './dto/update-brand.dto.js';
import { BrandRepository } from './brand.repository.js';
import { Brand } from '@app/model/generated/prisma/client.js';

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

    update(id: number, updateBrandDto: UpdateBrandDto) {
        return `This action updates a #${id} brand`;
    }

    remove(id: number) {
        return `This action removes a #${id} brand`;
    }
}
