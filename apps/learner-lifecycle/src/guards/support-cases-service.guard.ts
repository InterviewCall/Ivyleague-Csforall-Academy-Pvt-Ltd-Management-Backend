import { timingSafeEqual } from 'node:crypto';
import {
    CanActivate,
    ExecutionContext,
    Injectable,
    InternalServerErrorException,
    UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class SupportCasesServiceGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        // Read the shared secret configured for Support Cases Service.
        const expectedToken = process.env.SUPPORT_CASES_SERVICE_TOKEN;

        // The service must have a properly configured secret to authenticate requests.
        if (!expectedToken || Buffer.byteLength(expectedToken) < 32) {
            throw new InternalServerErrorException(
                'Support Cases service token is not configured correctly',
            );
        }

        const request = context.switchToHttp().getRequest<{
            headers: Record<string, string | string[] | undefined>;
        }>();

        // Get the API key sent by the calling service.
        const providedToken = request.headers['x-internal-api-key'];

        if (typeof providedToken !== 'string') {
            throw new UnauthorizedException('Unauthorized internal service request');
        }

        const expectedBuffer = Buffer.from(expectedToken);
        const providedBuffer = Buffer.from(providedToken);

        // Check the length first because timingSafeEqual requires equal-length buffers.
        if (expectedBuffer.length !== providedBuffer.length) {
            throw new UnauthorizedException('Unauthorized internal service request');
        }

        // Compare both secrets safely to reduce timing-based information leakage.
        if (!timingSafeEqual(expectedBuffer, providedBuffer)) {
            throw new UnauthorizedException('Unauthorized internal service request');
        }

        // Allow the request only when the shared API key is valid.
        return true;
    }
}