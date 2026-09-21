import { Module } from '@nestjs/common';

import { BrandModule } from '../brand/brand.module.js';
import { TcVersionController } from './tc-version.controller.js';
import { TcVersionRepository } from './tc-version.repository.js';
import { TcVersionService } from './tc-version.service.js';

@Module({
    imports: [BrandModule],
    controllers: [TcVersionController],
    providers: [TcVersionService, TcVersionRepository],
    exports: [TcVersionRepository],
})
export class TcVersionModule {}
