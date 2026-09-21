import { Global, Module } from '@nestjs/common';

import { MarkdownService } from './markdown.service.js';

/**
 * Global: rendering markdown is needed wherever stored markdown meets a reader
 * — the terms acceptance page, the PDF worker, and notification templates.
 */
@Global()
@Module({
    providers: [MarkdownService],
    exports: [MarkdownService],
})
export class MarkdownModule {}
