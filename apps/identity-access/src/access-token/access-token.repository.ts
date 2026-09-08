import { ModelService } from '@app/model';
import {
    AccessToken,
    Prisma,
    TokenPurpose,
} from '@app/model/generated/prisma/client.js';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AccessTokenRepository {
    constructor(private readonly prisma: ModelService) {}

    create(
        data: Prisma.AccessTokenCreateInput,
        tx: Prisma.TransactionClient,
    ): Promise<AccessToken> {
        return tx.accessToken.create({ data });
    }

    findByTokenHashAndPurpose(
        tokenHash: string,
        purpose: TokenPurpose,
    ): Promise<AccessToken | null> {
        return this.prisma.accessToken.findFirst({
            where: { tokenHash, purpose },
        });
    }

    markUsed(id: number, tx: Prisma.TransactionClient): Promise<AccessToken> {
        return tx.accessToken.update({
            where: { id },
            data: { usedAt: new Date() },
        });
    }
}
