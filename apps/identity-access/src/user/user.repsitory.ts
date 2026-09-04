import { Injectable } from '@nestjs/common';
import { ModelService } from '@app/model';
import { User } from '@app/model/generated/prisma/client.js';

@Injectable()
export class UserRepository {
    constructor(private readonly prisma: ModelService) {}

    findByEmail(email: string): Promise<User | null> {
        return this.prisma.user.findUnique({
            where: { email }
        });
    }
}