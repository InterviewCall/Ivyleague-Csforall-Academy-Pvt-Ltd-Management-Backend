import { Module } from '@nestjs/common';
import { BrandService } from './brand.service.js';
import { BrandController } from './brand.controller.js';
import { BrandRepository } from './brand.repository.js';

@Module({
    controllers: [BrandController],
    providers: [BrandService, BrandRepository],
})
export class BrandModule {}
