import 'dotenv/config';

import { NestFactory } from '@nestjs/core';
import {
    StandardSchemaValidationPipe,
    VersioningType,
} from '@nestjs/common';

import {
    NestFastifyApplication,
    FastifyAdapter,
} from '@nestjs/platform-fastify';

import { NotificationModule } from './notification.module.js';

async function bootstrap() {
    const app = await NestFactory.create<NestFastifyApplication>(
        NotificationModule,
        new FastifyAdapter(),
    );

    app.setGlobalPrefix('/api');

    app.enableVersioning({
        type: VersioningType.URI,
        defaultVersion: '1',
    });

    app.useGlobalPipes(new StandardSchemaValidationPipe());

    await app.listen(
        Number(process.env.NOTIFICATION_PORT ?? 3004),
    );
}

await bootstrap();