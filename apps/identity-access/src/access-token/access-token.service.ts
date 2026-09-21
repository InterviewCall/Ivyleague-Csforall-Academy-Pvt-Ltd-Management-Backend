import { BadRequestException,Injectable } from '@nestjs/common';
import { createHash, randomBytes } from 'crypto';

import { AccessTokenRepository } from './access-token.repository.js';
import { DEFAULT_TTL_HOURS } from './constants/index.js';
import { CreateAccessTokenDto } from './dto/create-access-token.dto.js';
import { IssuedAccessToken } from './types/issues-access-token.type.js';

@Injectable()
export class AccessTokenService {
    constructor(private readonly accessTokenRepository: AccessTokenRepository) {}

    hash(token: string): string {
        return createHash('sha256').update(token).digest('hex');
    }

    issue(): IssuedAccessToken {
        const token = randomBytes(32).toString('base64url');
        const ttlHours = Number(process.env.INVITE_TOKEN_TTL_HOURS) || DEFAULT_TTL_HOURS;

        return {
            token,
            tokenHash: this.hash(token),
            expiresAt: new Date(Date.now() + ttlHours * 60 * 60 * 1000),
        };
    }

    async createAccessToken(payload: CreateAccessTokenDto) {
        const issuedToken = this.issue();

        await this.accessTokenRepository.createToken({
            tokenHash: issuedToken.tokenHash,
            purpose: payload.purpose,
            expiresAt: issuedToken.expiresAt,
            user: { connect: { id: payload.userId } },
        });

        return {
            token: issuedToken.token,
            purpose: payload.purpose,
            userId: payload.userId,
            expiresAt: issuedToken.expiresAt,
        };
    }
    async validateToken(token: string) {
        const tokenHash = this.hash(token);

        const accessToken =
            await this.accessTokenRepository.findByTokenHash(tokenHash);

        if (
            !accessToken ||
            accessToken.usedAt !== null ||
            accessToken.expiresAt.getTime() <= Date.now()
        ) {
            throw new BadRequestException(
                'This token is invalid, expired, or already used',
            );
        }

        return {
            purpose: accessToken.purpose,
            subject: accessToken.userId,
            expiresAt: accessToken.expiresAt,
        };
    }

    buildActivationUrl(token: string): string {
        const base = process.env.ACTIVATION_URL_BASE ?? 'http://localhost:4000/activate';

        return `${base}/${token}`;
    }
}