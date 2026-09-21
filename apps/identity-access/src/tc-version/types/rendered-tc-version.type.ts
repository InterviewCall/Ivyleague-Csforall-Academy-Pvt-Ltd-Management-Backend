import { TcDocument } from '@app/model/generated/prisma/enums.js';

/**
 * What the acceptance screen renders. `html` is sanitised at render time, and
 * the PDF is produced from the same markdown through the same renderer — so
 * what the learner reads and what they are emailed cannot diverge.
 */
export type RenderedTcVersion = {
    id: number;
    document: TcDocument;
    version: number;
    brandCode: string | null;
    html: string;
    contentHash: string;
    publishedAt: Date;
};
