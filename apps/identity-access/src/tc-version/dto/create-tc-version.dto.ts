import { TcDocument } from '@app/model/generated/prisma/enums.js';
import { z } from 'zod';

/** Any HTML tag: <script>, <img …>, </b>. */
const HTML_TAG = /<\s*\/?[a-zA-Z][^>]*>/;

/** javascript:, data: and vbscript: targets in a markdown link. */
const DANGEROUS_URL = /\]\(\s*(?:javascript|data|vbscript):/i;

/** <https://…> and <mailto:…> are markdown autolinks, not HTML. */
const AUTOLINK = /<[a-zA-Z][a-zA-Z0-9+.-]*:[^>\s]*>/g;

const containsHtml = (value: string): boolean =>
    HTML_TAG.test(value.replace(AUTOLINK, ''));

const containsDangerousUrl = (value: string): boolean =>
    DANGEROUS_URL.test(value);

export const createTcVersionSchema = z.object({
    document: z.enum(TcDocument, {
        error: 'document must be PAYMENT_TERMS or PROGRAMME_TERMS',
    }),

    /** Omitted = these terms apply to every brand. */
    brandCode: z
        .string()
        .trim()
        .min(2, 'brandCode must be at least 2 characters')
        .max(50, 'brandCode must be at most 50 characters')
        .transform((code) => code.toUpperCase())
        .optional(),

    // Markdown. One source renders both the acceptance screen and the PDF, so
    // what the learner reads and what they are emailed cannot diverge.
    // Rejected, not stripped. This text is the evidence an acceptance is
    // recorded against and what contentHash is computed over — silently
    // rewriting an admin's wording would mean the stored terms are not the
    // terms they published. Escaping HTML at render time is a separate job;
    // marked does not do it (its `sanitize` option was removed and is now
    // ignored without error), so the renderer needs sanitize-html or DOMPurify.
    content: z
        .string({ error: 'content is required' })
        .min(200, 'content is too short to be a terms document')
        .max(50_000, 'content must be at most 50,000 characters')
        .refine(
            (value) => !containsHtml(value),
            'content must be plain markdown — remove HTML tags',
        )
        .refine(
            (value) => !containsDangerousUrl(value),
            'content must not contain javascript:, data: or vbscript: links',
        ),
});

export class CreateTcVersionDto
    implements z.infer<typeof createTcVersionSchema>
{
    document: TcDocument;
    brandCode?: string;
    content: string;
}
