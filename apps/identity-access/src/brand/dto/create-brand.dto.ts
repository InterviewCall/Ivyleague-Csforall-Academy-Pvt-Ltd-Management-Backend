import { z } from 'zod';

/**
 * Upper bound of MySQL DECIMAL(12,2). Values above this are rejected by the
 * column itself, so they are caught here to return a 400 rather than a 500.
 */
const MAX_DECIMAL_12_2 = 9_999_999_999.99;

/** DECIMAL(x,2) stores two decimal places; more would be silently rounded. */
const hasAtMostTwoDecimals = (value: number): boolean => {
    const [, fraction = ''] = value.toString().split('.');
    return fraction.length <= 2;
};

const money = (label: string) =>
    z
        .number({ error: `${label} must be a number` })
        .positive(`${label} must be greater than 0`)
        .max(MAX_DECIMAL_12_2, `${label} is larger than the column can store`)
        .refine(
            hasAtMostTwoDecimals,
            `${label} may have at most 2 decimal places`,
        );

export const createBrandSchema = z.object({
    code: z
        .string({ error: 'code is required' })
        .trim()
        .min(2, 'code must be at least 2 characters')
        .max(50, 'code must be at most 50 characters')
        .regex(
            /^[A-Za-z0-9_-]+$/,
            'code may only contain letters, numbers, hyphens and underscores',
        )
        .transform((value) => value.toUpperCase()),

    name: z
        .string({ error: 'name is required' })
        .trim()
        .min(2, 'name must be at least 2 characters')
        .max(100, 'name must be at most 100 characters'),

    baseFee: money('baseFee'),

    gstInclusive: z.boolean({ error: 'gstInclusive is required' }),

    gstRate: z
        .number({ error: 'gstRate must be a number' })
        .min(0, 'gstRate cannot be negative')
        .max(100, 'gstRate cannot exceed 100')
        .refine(
            hasAtMostTwoDecimals,
            'gstRate may have at most 2 decimal places',
        )
        .default(18).optional(),

    placementPackageCeiling: money('placementPackageCeiling'),
});

export class CreateBrandDto implements z.infer<typeof createBrandSchema> {
    code: string;
    name: string;
    baseFee: number;
    gstInclusive: boolean;
    gstRate: number;
    placementPackageCeiling: number;
}
