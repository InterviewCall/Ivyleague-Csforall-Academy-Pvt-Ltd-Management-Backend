import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Query,
} from '@nestjs/common';
import { BrandService } from './brand.service.js';
import { CreateBrandDto, createBrandSchema } from './dto/create-brand.dto.js';
import { GetBrandsQueryDto, getBrandsQuerySchema } from './dto/get-brands-query.dto.js';
import { UpdateBrandDto } from './dto/update-brand.dto.js';
import { AccessRole, Roles } from '@app/rbac';

@Controller('brands')
export class BrandController {
    constructor(private readonly brandService: BrandService) {}

    @Post()
    create(@Body({ schema: createBrandSchema }) payload: CreateBrandDto) {
        return this.brandService.createBrand(payload);
    }

    @Roles(
        AccessRole.SALES,
        AccessRole.PSA,
        AccessRole.ACADEMIC_HEAD,
        AccessRole.FINANCE,
        AccessRole.TA,
        AccessRole.PLACEMENT_COORDINATOR,
    )
    @Get()
    findAll(
        @Query({ schema: getBrandsQuerySchema })
        query: GetBrandsQueryDto,
    ) {
        return this.brandService.findAll(query);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.brandService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateBrandDto: UpdateBrandDto) {
        return this.brandService.update(+id, updateBrandDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.brandService.remove(+id);
    }
}
