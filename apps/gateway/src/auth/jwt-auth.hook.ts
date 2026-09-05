import type { JwtService } from '@nestjs/jwt';
import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';

import { isPublicPath } from './public-paths.js';
import { findAccessRule } from './route-access.js';

/** Headers the gateway sets itself. Never trusted from the client. */
const FORWARDED_IDENTITY_HEADERS = ['x-user-id', 'x-user-role'] as const;

export interface AccessTokenPayload {
    userId: string;
    role: string;
}

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

            const pathname = request.url.split('?')[0];

            if (isPublicPath(pathname)) {
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

            let payload: AccessTokenPayload;

            try {
                payload = await jwtService.verifyAsync<AccessTokenPayload>(token);
            } catch {
                return reply.code(401).send({
                    success: false,
                    statusCode: 401,
                    message: 'Invalid or expired token',
                });
            }

            const role = String(payload.role);
            const rule = findAccessRule(request.method, pathname);

            if (rule && !rule.roles.includes(role)) {
                return reply.code(403).send({
                    success: false,
                    statusCode: 403,
                    message: 'You do not have permission to perform this action',
                });
            }

            request.headers['x-user-id'] = String(payload.userId);
            request.headers['x-user-role'] = role;
        },
    );
}
