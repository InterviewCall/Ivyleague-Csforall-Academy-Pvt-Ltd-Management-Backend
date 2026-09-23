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

    createToken(
        userId: number,
        tokenHash: string,
        purpose: TokenPurpose,
        expiresAt: Date,
    ): Promise<AccessToken> {
        return this.prisma.accessToken.create({
            data: {
                tokenHash,
                purpose,
                expiresAt,
                user: {
                    connect: {
                        id: userId,
                    },
                },
            },
        });
    }

    findByTokenHash(tokenHash: string): Promise<AccessToken | null> {
        return this.prisma.accessToken.findUnique({
            where: { tokenHash },
        });
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
