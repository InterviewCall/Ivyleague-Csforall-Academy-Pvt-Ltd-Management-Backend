import { Injectable } from '@nestjs/common';
import { createHash, randomBytes } from 'crypto';

import { IssuedInviteToken } from './types/issues-invite-token.type.js';
import { DEFAULT_TTL_HOURS } from './constants/index.js';

@Injectable()
export class InviteTokenService {
    hash(token: string): string {
        return createHash('sha256').update(token).digest('hex');
    }

    issue(): IssuedInviteToken {
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
            process.env.ACTIVATION_URL_BASE ??
            'http://localhost:4000/activate';

        return `${base}/${token}`;
    }
}
