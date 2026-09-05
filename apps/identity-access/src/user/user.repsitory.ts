import { Injectable } from '@nestjs/common';
import { ModelService } from '@app/model';
import { Prisma, User } from '@app/model/generated/prisma/client.js';

@Injectable()
export class UserRepository {
    constructor(private readonly prisma: ModelService) {}

    create(data: Prisma.UserCreateInput, tx: Prisma.TransactionClient) {
        return tx.user.create({ data });
    }

    findByEmail(email: string): Promise<User | null> {
        return this.prisma.user.findUnique({
            where: { email }
        });
    }
}