import { Injectable , NotFoundException } from '@nestjs/common';
import { createHash, randomBytes } from 'crypto';

import { IssuedAccessToken } from './types/issues-access-token.type.js';
import { DEFAULT_TTL_HOURS } from './constants/index.js';
import { ModelService } from '@app/model';
import { Prisma } from '@app/model/generated/prisma/client.js';

import { AccessTokenRepository } from './access-token.repository.js';
import { CreateAccessTokenDto } from './dto/create-access-token.dto.js';

@Injectable()
export class AccessTokenService {
    constructor(
        private readonly modelService: ModelService,
        private readonly accessTokenRepository: AccessTokenRepository,
    ) {}

    hash(token: string): string {
        return createHash('sha256').update(token).digest('hex');
    }

    issue(): IssuedAccessToken {
        const token = randomBytes(32).toString('base64url');
        const ttlHours =
            Number(process.env.INVITE_TOKEN_TTL_HOURS) || DEFAULT_TTL_HOURS;

        return {
            token,
            tokenHash: this.hash(token),
            expiresAt: new Date(Date.now() + ttlHours * 60 * 60 * 1000),
        };
    }

    buildActivationUrl(token: string): string {
        const base =
            process.env.ACTIVATION_URL_BASE ?? 'http://localhost:4000/activate';

        return `${base}/${token}`;
    }

    async createAccessToken(payload: CreateAccessTokenDto) {
        try {
            const issuedToken = this.issue();

            const accessToken = await this.modelService.$transaction((tx) =>
                this.accessTokenRepository.create(
                    {
                        tokenHash: issuedToken.tokenHash,
                        purpose: payload.purpose,
                        expiresAt: issuedToken.expiresAt,
                        user: {
                            connect: {
                                id: payload.userId,
                            },
                        },
                    },
                    tx,
                ),
            );

            return {
                token: issuedToken.token,
                purpose: accessToken.purpose,
                userId: accessToken.userId,
                expiresAt: accessToken.expiresAt,
            };
        } catch (error) {
            if (
                error instanceof Prisma.PrismaClientKnownRequestError &&
                error.code === 'P2025'
            ) {
                throw new NotFoundException('User not found');
            }

            throw error;
        }
    }

    async validateAccessToken(token: string) {
        const tokenHash = this.hash(token);

        const accessToken =
            await this.accessTokenRepository.findByTokenHash(tokenHash);

        if (
            !accessToken ||
            accessToken.usedAt !== null ||
            accessToken.expiresAt.getTime() <= Date.now()
        ) {
            return {
                valid: false,
            };
        }

        return {
            valid: true,
            userId: accessToken.userId,
            purpose: accessToken.purpose,
            expiresAt: accessToken.expiresAt,
        };
    }
}
