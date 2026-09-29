import 'dotenv/config';

import {
    RequestMethod,
    StandardSchemaValidationPipe,
    VersioningType,
} from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
    FastifyAdapter,
    NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { fastifyCookie } from '@fastify/cookie';
import { SupportCasesModule } from './support-cases.module.js';

async function bootstrap() {
    const app = await NestFactory.create<NestFastifyApplication>(
        SupportCasesModule,
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

        await app.listen(Number(process.env.SUPPORT_CASES_PORT));
}

await bootstrap();