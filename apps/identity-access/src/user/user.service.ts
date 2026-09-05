import { randomBytes } from 'crypto';
import {
    BadRequestException,
    ConflictException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';

import { ModelService } from '@app/model';
import {
    Brand,
    Prisma,
    User,
    UserStatus,
    UserType,
} from '@app/model/generated/prisma/client.js';

import { HashService } from '../hash/hash.service.js';
import { InviteTokenRepository } from '../invite-token/invite-token.repository.js';
import { InviteTokenService } from '../invite-token/invite-token.service.js';
import { BrandRepository } from '../brand/brand.repository.js';
import { UserBrandAccessRepository } from '../user-brand-access/user-brand-access.repository.js';
import { GrantBrandAccessDto } from './dto/grant-brand-access.dto.js';
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
        private readonly brandRepository: BrandRepository,
        private readonly userBrandAccessRepository: UserBrandAccessRepository,
    ) {}

    /**
     * Grants a staff member access to one or more brands (doc §3,
     * POST /users/:id/brand-access, Admin).
     *
     * Idempotent: re-granting a brand they already have changes nothing and
     * still returns their full brand list.
     */
    async grantBrandAccess(
        userPublicId: string,
        payload: GrantBrandAccessDto,
    ): Promise<{ publicId: string; brands: string[] }> {
        const user: User | null =
            await this.userRepository.findByPublicId(userPublicId);

        if (!user) {
            throw new NotFoundException('User not found');
        }

        if (user.userType !== UserType.STAFF) {
            throw new BadRequestException(
                'Brand access applies to staff accounts only',
            );
        }

        const brands: Brand[] = await this.brandRepository.findManyByCodes(
            payload.brandCodes,
        );

        const resolved: Set<string> = new Set(
            brands.map((brand) => brand.code),
        );

        const unknown: string[] = payload.brandCodes.filter(
            (code) => !resolved.has(code),
        );

        if (unknown.length > 0) {
            throw new NotFoundException(
                `Unknown brand code(s): ${unknown.join(', ')}`,
            );
        }

        await this.userBrandAccessRepository.createMany(
            brands.map((brand) => ({ userId: user.id, brandId: brand.id })),
            this.prisma,
        );

        return {
            publicId: user.publicId,
            brands: await this.userBrandAccessRepository.findBrandCodesByUserId(
                user.id,
            ),
        };
    }

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
                const user: User = await this.userRepository.create(
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
