import { z } from 'zod';

const MAX_PAGE_SIZE = 100;
const MAX_DECIMAL_12_2 = 9_999_999_999.99;

const optionalRangeValue = (max: number) =>
    z.preprocess(
        (value) => (value === '' ? undefined : value),
        z.coerce.number().min(0).max(max).optional(),
    );

export const getBrandsQuerySchema = z
    .object({
        search: z.string().trim().max(100).default(''),

        gstInclusive: z
            .enum(['true', 'false'])
            .transform((value) => value === 'true')
            .optional(),

        baseFeeMin: optionalRangeValue(MAX_DECIMAL_12_2),
        baseFeeMax: optionalRangeValue(MAX_DECIMAL_12_2),

        gstRateMin: optionalRangeValue(100),
        gstRateMax: optionalRangeValue(100),

        placementPackageCeilingMin: optionalRangeValue(MAX_DECIMAL_12_2),
        placementPackageCeilingMax: optionalRangeValue(MAX_DECIMAL_12_2),

        page: z.coerce.number().int().min(1).default(1),

        pageSize: z.coerce
            .number()
            .int()
            .min(1)
            .max(MAX_PAGE_SIZE)
            .default(10),
    })
    .superRefine((query, ctx) => {
        const ranges = [
            ['baseFeeMin', 'baseFeeMax'],
            ['gstRateMin', 'gstRateMax'],
            ['placementPackageCeilingMin', 'placementPackageCeilingMax'],
        ] as const;

        for (const [minKey, maxKey] of ranges) {
            const min = query[minKey];
            const max = query[maxKey];

            if (min !== undefined && max !== undefined && min > max) {
                ctx.addIssue({
                    code: 'custom',
                    path: [maxKey],
                    message: `${maxKey} must be greater than or equal to ${minKey}`,
                });
            }
        }
    });

export class GetBrandsQueryDto implements z.infer<typeof getBrandsQuerySchema> {
    search: string;
    gstInclusive?: boolean;

    baseFeeMin?: number;
    baseFeeMax?: number;

    gstRateMin?: number;
    gstRateMax?: number;

    placementPackageCeilingMin?: number;
    placementPackageCeilingMax?: number;

    page: number;
    pageSize: number;
}