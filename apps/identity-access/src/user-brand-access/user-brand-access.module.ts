import { Module } from '@nestjs/common';

import { UserBrandAccessRepository } from './user-brand-access.repository.js';

@Module({
    providers: [UserBrandAccessRepository],
    exports: [UserBrandAccessRepository],
})
export class UserBrandAccessModule {}
