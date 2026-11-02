import { ModelService } from '@app/model';
import {
    Prisma,
    User,
    UserStatus,
    UserType,
} from '@app/model/generated/prisma/client.js';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository {
    constructor(private readonly prisma: ModelService) {}

    create(
        data: Prisma.UserCreateInput,
        client: Prisma.TransactionClient,
    ): Promise<User> {
        return client.user.create({ data });
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

    async findLearnerPage(filters: {
        search: string;
        status: UserStatus | 'all';
        page: number;
        pageSize: number;
    }) {
        const where: Prisma.UserWhereInput = {
            userType: UserType.LEARNER,
            ...(filters.status !== 'all' && { status: filters.status }),
            ...(filters.search.length >= 2 && {
                OR: [
                    { fullName: { contains: filters.search } },
                    { email: { contains: filters.search } },
                    { phone: { contains: filters.search } },
                ],
            }),
        };

        const [rows, count] = await Promise.all([
            this.prisma.user.findMany({
                where,
                select: {
                    publicId: true,
                    fullName: true,
                    email: true,
                    phone: true,
                    status: true,
                    createdAt: true,
                },
                orderBy: [{ createdAt: 'desc' }, { id: 'desc' }],
                skip: (filters.page - 1) * filters.pageSize,
                take: filters.pageSize,
            }),
            this.prisma.user.count({ where }),
        ]);

        return { rows, count };
    }
}
