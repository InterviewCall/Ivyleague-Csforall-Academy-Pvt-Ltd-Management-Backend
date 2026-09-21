import { TcDocument } from '@app/model/generated/prisma/enums.js';

/**
 * Deliberately excludes `content`: the admin who published it already has the
 * text, and echoing 50KB back on every create is noise. `contentHash` is
 * returned so the caller can verify what was stored.
 */
export type PublishedTcVersion = {
    id: number;
    document: TcDocument;
    version: number;
    brandCode: string | null;
    contentHash: string;
    publishedAt: Date;
};
