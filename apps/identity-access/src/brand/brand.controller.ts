import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from '@nestjs/common';
import { BrandService } from './brand.service.js';
import { CreateBrandDto, createBrandSchema } from './dto/create-brand.dto.js';
import { UpdateBrandDto , updateBrandSchema } from './dto/update-brand.dto.js';
import { AccessRole, Roles } from '@app/rbac';

@Controller('brands')
export class BrandController {
    constructor(private readonly brandService: BrandService) {}

    @Post()
    create(@Body({ schema: createBrandSchema }) payload: CreateBrandDto) {
        return this.brandService.createBrand(payload);
    }

    @Get()
    findAll() {
        return this.brandService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.brandService.findOne(+id);
    }

    @Roles(AccessRole.ADMIN)
    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body({ schema: updateBrandSchema }) updateBrandDto: UpdateBrandDto,
    ) {
        return this.brandService.update(+id, updateBrandDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.brandService.remove(+id);
    }
}
