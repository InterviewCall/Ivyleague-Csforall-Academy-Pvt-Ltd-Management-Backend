import { Injectable } from '@nestjs/common';
import { marked } from 'marked';
import sanitizeHtml from 'sanitize-html';

/**
 * Markdown is stored exactly as authored and rendered on the way out, never on
 * the way in — so the stored text stays byte-for-byte what was published and
 * its hash keeps meaning something.
 *
 * Sanitising happens on every render rather than once at write. `marked` does
 * not sanitise (its `sanitize` option was removed and is now ignored silently),
 * so without this step a script tag in the source reaches the browser intact.
 */
@Injectable()
export class MarkdownService {
    private static readonly OPTIONS: sanitizeHtml.IOptions = {
        // Exactly what markdown itself produces — no more.
        allowedTags: [
            'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
            'p', 'br', 'hr',
            'strong', 'em', 'del',
            'ul', 'ol', 'li',
            'blockquote',
            'code', 'pre',
            'a',
            'table', 'thead', 'tbody', 'tr', 'th', 'td',
        ],
        allowedAttributes: {
            // rel and target must be listed here as well as set by
            // transformTags below — sanitize-html strips any attribute not
            // allowed, including ones its own transform just added.
            a: ['href', 'title', 'rel', 'target'],
            th: ['colspan', 'rowspan'],
            td: ['colspan', 'rowspan'],
        },
        // Blocks javascript:, data: and vbscript: hrefs outright.
        allowedSchemes: ['http', 'https', 'mailto'],
        // A link out of a terms document should not be able to reach back into
        // the page that opened it.
        transformTags: {
            a: sanitizeHtml.simpleTransform('a', {
                rel: 'noopener noreferrer',
                target: '_blank',
            }),
        },
    };

    render(markdown: string): string {
        return sanitizeHtml(
            marked.parse(markdown, { async: false }),
            MarkdownService.OPTIONS,
        );
    }
}
