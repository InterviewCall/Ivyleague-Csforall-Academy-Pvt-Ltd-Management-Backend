import { ModelService } from '@app/model';
import {
    Prisma,
    User,
    UserStatus,
} from '@app/model/generated/prisma/client.js';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository {
    constructor(private readonly prisma: ModelService) {}

    create(
        data: Prisma.UserCreateInput,
        tx: Prisma.TransactionClient,
    ): Promise<User> {
        return tx.user.create({ data });
    }

    findByEmail(email: string): Promise<User | null> {
        return this.prisma.user.findUnique({
            where: { email },
        });
    }

    activate(
        id: number,
        passwordHash: string,
        tx: Prisma.TransactionClient,
    ): Promise<User> {
        return tx.user.update({
            where: { id },
            data: { passwordHash, status: UserStatus.ACTIVE },
        });
    }
}
