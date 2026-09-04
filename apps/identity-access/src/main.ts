import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import {
    RequestMethod,
    StandardSchemaValidationPipe,
    VersioningType,
} from '@nestjs/common';
import {
    NestFastifyApplication,
    FastifyAdapter,
} from '@nestjs/platform-fastify';
import { fastifyCookie } from '@fastify/cookie';

import { AppModule } from './app.module.js';

async function bootstrap() {
    const app = await NestFactory.create<NestFastifyApplication>(
        AppModule,
        new FastifyAdapter(),
    );

    await app.register(fastifyCookie);

    app.setGlobalPrefix('/api', {
        exclude: [{ path: 'health', method: RequestMethod.GET }],
    });

    app.enableVersioning({
        type: VersioningType.URI,
        defaultVersion: '1',
    });

    app.useGlobalPipes(new StandardSchemaValidationPipe());

    await app.listen(process.env.PORT ?? 3000);
}
await bootstrap();
