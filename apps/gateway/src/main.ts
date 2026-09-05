import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import {
    FastifyAdapter,
    NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { fastifyCookie } from '@fastify/cookie';
import fastifyProxy from '@fastify/http-proxy';
import { JwtService } from '@nestjs/jwt';

import { registerJwtAuthHook } from './auth/jwt-auth.hook.js';
import { GatewayModule } from './gateway.module.js';
import { serviceRoutes } from './routes/service-routes.js';

async function bootstrap() {
    const app = await NestFactory.create<NestFastifyApplication>(
        GatewayModule,
        new FastifyAdapter(),
    );

    await app.register(fastifyCookie);

    // Registered on the root Fastify instance, so it runs for every request —
    // the gateway's own routes and every proxied one — before the proxy handler.
    registerJwtAuthHook(app.getHttpAdapter().getInstance(), app.get(JwtService));

    for (const route of serviceRoutes) {
        await app.register(fastifyProxy, {
            upstream: route.upstream,
            prefix: route.prefix,
            rewritePrefix: route.prefix,
        });
    }

    await app.listen(Number(process.env.GATEWAY_PORT));
}
await bootstrap();
