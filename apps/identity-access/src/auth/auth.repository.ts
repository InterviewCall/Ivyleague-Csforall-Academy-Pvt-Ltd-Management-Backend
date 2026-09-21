import { ModelService } from '@app/model';
import { Prisma, TokenPurpose, User , UserStatus} from '@app/model/generated/prisma/client.js';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthRepository {
    constructor(private readonly prisma: ModelService) {}

    findUserByEmail(email: string): Promise<User | null> {
        return this.prisma.user.findUnique({ where: { email } });
    }

    createPasswordResetToken(userId: number, tokenHash: string, expiresAt: Date) {
        return this.prisma.accessToken.create({
            data: {
                user: { connect: { id: userId } },
                tokenHash,
                purpose: TokenPurpose.PASSWORD_RESET,
                expiresAt,
            },
        });
    }

    updatePassword(userId: number, passwordHash: string, tx: Prisma.TransactionClient): Promise<User> {
    return tx.user.update({
        where: { id: userId },
        data: {
            passwordHash,
            status: UserStatus.ACTIVE,
        },
    });
}
}