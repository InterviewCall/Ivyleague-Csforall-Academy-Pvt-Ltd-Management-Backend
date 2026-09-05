import type { JwtService } from '@nestjs/jwt';
import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';

import { isPublicPath } from './public-paths.js';

/** Headers the gateway sets itself. Never trusted from the client. */
const FORWARDED_IDENTITY_HEADERS = ['x-user-id', 'x-user-role'] as const;

export interface AccessTokenPayload {
    userId: string;
    role: string;
}

/**
 * Gateway-wide authentication (NFR-1): one local signature check per request,
 * no network round-trip and no per-endpoint wiring.
 *
 * Registered as an `onRequest` hook so it runs before @fastify/http-proxy's
 * handler. A Nest guard cannot be used here — proxied requests never enter
 * Nest's pipeline, so a guard would silently never execute.
 */
export function registerJwtAuthHook(
    instance: FastifyInstance,
    jwtService: JwtService,
): void {
    if (!process.env.JWT_SECRET) {
        throw new Error(
            'JWT_SECRET is not set — the gateway cannot verify tokens.',
        );
    }

    instance.addHook(
        'onRequest',
        async (request: FastifyRequest, reply: FastifyReply) => {
            // Stripped on every request, public ones included, so a client can
            // never present itself as a user the gateway did not authenticate.
            for (const header of FORWARDED_IDENTITY_HEADERS) {
                delete request.headers[header];
            }

            if (isPublicPath(request.url.split('?')[0])) {
                return;
            }

            const token = request.cookies?.accessToken;

            if (!token) {
                return reply.code(401).send({
                    success: false,
                    statusCode: 401,
                    message: 'Authentication required',
                });
            }

            try {
                const payload =
                    await jwtService.verifyAsync<AccessTokenPayload>(token);

                request.headers['x-user-id'] = String(payload.userId);
                request.headers['x-user-role'] = String(payload.role);
            } catch {
                return reply.code(401).send({
                    success: false,
                    statusCode: 401,
                    message: 'Invalid or expired token',
                });
            }
        },
    );
}
