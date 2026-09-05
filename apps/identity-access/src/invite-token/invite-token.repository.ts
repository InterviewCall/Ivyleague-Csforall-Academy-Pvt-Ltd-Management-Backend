import { Injectable } from '@nestjs/common';

import { ModelService } from '@app/model';
import { InviteToken, Prisma } from '@app/model/generated/prisma/client.js';

@Injectable()
export class InviteTokenRepository {
    constructor(private readonly prisma: ModelService) {}

    create(
        data: Prisma.InviteTokenCreateInput,
        tx: Prisma.TransactionClient,
    ): Promise<InviteToken> {
        return tx.inviteToken.create({ data });
    }

    findByTokenHash(tokenHash: string): Promise<InviteToken | null> {
        return this.prisma.inviteToken.findUnique({ where: { tokenHash } });
    }

    markUsed(id: number, tx: Prisma.TransactionClient): Promise<InviteToken> {
        return tx.inviteToken.update({
            where: { id },
            data: { usedAt: new Date() },
        });
    }
}
