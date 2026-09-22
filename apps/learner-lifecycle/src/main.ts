import 'dotenv/config';

import {
    StandardSchemaValidationPipe,
    VersioningType,
} from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { LearnerLifecycleModule } from './learner-lifecycle.module.js';

async function bootstrap() {
    const app = await NestFactory.create(LearnerLifecycleModule);

    app.setGlobalPrefix('api');

    app.enableVersioning({
        type: VersioningType.URI,
        defaultVersion: '1',
    });

    app.useGlobalPipes(new StandardSchemaValidationPipe());

    await app.listen(
        Number(process.env.LEARNER_LIFECYCLE_PORT ?? 3003),
    );
}

await bootstrap();