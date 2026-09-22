import { NestFactory } from '@nestjs/core';
import { LearnerLifecycleModule } from './learner-lifecycle.module.js';

async function bootstrap() {
  const app = await NestFactory.create(LearnerLifecycleModule);
  await app.listen(process.env.port ?? 3000);
}
await bootstrap();
