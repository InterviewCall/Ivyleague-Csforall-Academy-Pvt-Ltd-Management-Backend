import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import {
    FastifyAdapter,
    NestFastifyApplication,
} from '@nestjs/platform-fastify';
import fastifyProxy from '@fastify/http-proxy';

import { GatewayModule } from './gateway.module.js';
import { serviceRoutes } from './routes/service-routes.js';

async function bootstrap() {
    const app = await NestFactory.create<NestFastifyApplication>(
        GatewayModule,
        new FastifyAdapter(),
    );

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
