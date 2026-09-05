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

    findByPublicId(publicId: string): Promise<User | null> {
        return this.prisma.user.findUnique({ where: { publicId } });
    }

    findByEmail(email: string): Promise<User | null> {
        return this.prisma.user.findUnique({
            where: { email },
        });
    }

    updateStatus(id: number, status: UserStatus): Promise<User> {
        return this.prisma.user.update({ where: { id }, data: { status } });
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
