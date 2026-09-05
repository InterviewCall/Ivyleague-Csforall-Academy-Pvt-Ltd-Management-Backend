import { z } from 'zod';

export const grantBrandAccessSchema = z.object({
    // Brands are referenced by code, not by database id — the same reason users
    // are addressed by publicId. Uppercased to match how Brand.code is stored.
    brandCodes: z
        .array(
            z
                .string()
                .trim()
                .min(2, 'brand code must be at least 2 characters')
                .max(50, 'brand code must be at most 50 characters')
                .transform((code) => code.toUpperCase()),
            { error: 'brandCodes is required' },
        )
        .min(1, 'at least one brand code is required')
        .transform((codes) => [...new Set(codes)]),
});

export class GrantBrandAccessDto
    implements z.infer<typeof grantBrandAccessSchema>
{
    brandCodes: string[];
}
