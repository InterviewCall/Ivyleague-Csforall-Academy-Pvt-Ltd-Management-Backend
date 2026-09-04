import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';

import { TransformInterceptor } from './interceptors/transform.interceptor.js';

@Module({
    providers: [{ provide: APP_INTERCEPTOR, useClass: TransformInterceptor }],
})
export class CommonModule {}
