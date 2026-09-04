import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, map } from 'rxjs';

export interface ApiResponse<T> {
    success: boolean;
    statusCode: number;
    message: string;
    data: T;
}

/**
 * Wraps every successful handler result in a consistent response envelope.
 *
 * The response object is typed structurally rather than as `Response` (Express)
 * or `FastifyReply` (Fastify), so this library stays usable from any app in the
 * monorepo regardless of the HTTP adapter it runs on.
 */
@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, ApiResponse<T>> {
    intercept(context: ExecutionContext, next: CallHandler<T>): Observable<ApiResponse<T>> {
        const response = context.switchToHttp().getResponse<{ statusCode: number }>();

        return next.handle().pipe(
            map((data) => ({
                success: true,
                statusCode: response.statusCode,
                message: 'Request successful',
                data,
            })),
        );
    }
}
