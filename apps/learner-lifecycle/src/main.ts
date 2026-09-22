import 'dotenv/config';

import { NestFactory } from '@nestjs/core';
import { VersioningType } from '@nestjs/common';

import { LearnerLifecycleModule } from './learner-lifecycle.module.js';

async function bootstrap() {
    const app = await NestFactory.create(LearnerLifecycleModule);

    app.setGlobalPrefix('api');

    app.enableVersioning({
        type: VersioningType.URI,
        defaultVersion: '1',
    });

    await app.listen(
        Number(process.env.LEARNER_LIFECYCLE_PORT ?? 3003),
    );
}

await bootstrap();