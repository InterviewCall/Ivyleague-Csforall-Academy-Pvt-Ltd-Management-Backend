import { randomBytes } from 'crypto';
import { ConflictException, Injectable } from '@nestjs/common';

import { ModelService } from '@app/model';
import {
    Prisma,
    User,
    UserStatus,
    UserType,
} from '@app/model/generated/prisma/client.js';

import { HashService } from '../hash/hash.service.js';
import { InviteTokenRepository } from '../invite-token/invite-token.repository.js';
import { InviteTokenService } from '../invite-token/invite-token.service.js';
import { UserStaffRepository } from '../user-staff/user-staff.repository.js';
import { CreateStaffDto } from './dto/create-staff.dto.js';
import { UserRepository } from './user.repsitory.js';
import { StaffAccount } from './types/staff-account.type.js';
import { IssuedInviteToken } from '../invite-token/types/issues-invite-token.type.js';

@Injectable()
export class UserService {
    constructor(
        private readonly prisma: ModelService,
        private readonly userRepository: UserRepository,
        private readonly userStaffRepository: UserStaffRepository,
        private readonly hashService: HashService,
        private readonly inviteTokenRepository: InviteTokenRepository,
        private readonly inviteTokenService: InviteTokenService,
    ) {}

    async createStaff(payload: CreateStaffDto): Promise<StaffAccount> {
        const existing: User | null = await this.userRepository.findByEmail(
            payload.email,
        );

        if (existing) {
            throw new ConflictException(
                'An account with this email already exists',
            );
        }

        const passwordHash = await this.hashService.hash(
            randomBytes(32).toString('hex'),
        );

        const invite: IssuedInviteToken = this.inviteTokenService.issue();

        try {
            return await this.prisma.$transaction(async (tx) => {
                const user = await this.userRepository.create(
                    {
                        fullName: payload.fullName,
                        email: payload.email,
                        phone: payload.phone,
                        passwordHash,
                        userType: UserType.STAFF,
                        status: UserStatus.UNACTIVATED,
                    },
                    tx,
                );

                for (const role of payload.roles) {
                    await this.userStaffRepository.create(
                        { role, user: { connect: { id: user.id } } },
                        tx,
                    );
                }

                await this.inviteTokenRepository.create(
                    {
                        tokenHash: invite.tokenHash,
                        expiresAt: invite.expiresAt,
                        user: { connect: { id: user.id } },
                    },
                    tx,
                );

                return {
                    publicId: user.publicId,
                    fullName: user.fullName,
                    email: user.email,
                    phone: user.phone,
                    status: user.status,
                    roles: payload.roles,
                    activationUrl: this.inviteTokenService.buildActivationUrl(
                        invite.token,
                    ),
                    activationExpiresAt: invite.expiresAt,
                };
            });
        } catch (error) {
            if (
                error instanceof Prisma.PrismaClientKnownRequestError &&
                error.code === 'P2002'
            ) {
                throw new ConflictException(
                    'An account with this email already exists',
                );
            }

            throw error;
        }
    }
}
