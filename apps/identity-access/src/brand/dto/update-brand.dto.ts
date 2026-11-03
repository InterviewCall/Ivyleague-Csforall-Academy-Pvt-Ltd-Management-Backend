import { PartialType } from '@nestjs/mapped-types';
import { z } from 'zod';
import { CreateBrandDto, createBrandSchema } from './create-brand.dto.js';

export const updateBrandSchema = createBrandSchema
    .pick({
        baseFee: true,
        gstInclusive: true,
        gstRate: true,
        placementPackageCeiling: true,
    })
    .partial()
    .refine((payload) => Object.keys(payload).length > 0, {
        message: 'At least one field must be provided',
    });

export class UpdateBrandDto extends PartialType(CreateBrandDto) {}