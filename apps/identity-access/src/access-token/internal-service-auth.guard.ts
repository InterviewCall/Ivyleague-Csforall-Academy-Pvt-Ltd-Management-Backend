import {
    CanActivate,
    ExecutionContext,
    Injectable,
    InternalServerErrorException,
    UnauthorizedException,
} from '@nestjs/common';
import { createHash, timingSafeEqual } from 'crypto';

@Injectable()
export class InternalServiceAuthGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const expectedToken = process.env.INTERNAL_SERVICE_TOKEN;

        if (!expectedToken) {
            throw new InternalServerErrorException(
                'Internal service authentication is not configured',
            );
        }

        const request = context.switchToHttp().getRequest<{
            headers: Record<string, string | string[] | undefined>;
        }>();

        const providedToken = request.headers['x-service-token'];

        if (typeof providedToken !== 'string' || !providedToken) {
            throw new UnauthorizedException('Invalid service credentials');
        }

        const expectedHash = createHash('sha256')
            .update(expectedToken)
            .digest();

        const providedHash = createHash('sha256')
            .update(providedToken)
            .digest();

        if (!timingSafeEqual(expectedHash, providedHash)) {
            throw new UnauthorizedException('Invalid service credentials');
        }

        return true;
    }
}