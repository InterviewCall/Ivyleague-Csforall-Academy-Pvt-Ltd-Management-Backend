import {
    BadRequestException,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { ModelService } from '@app/model';
import { AccessRole } from '@app/rbac';

import {
    AccessToken,
    TokenPurpose,
    User,
    UserStatus,
    UserType,
} from '@app/model/generated/prisma/client.js';

import { HashService } from '../hash/hash.service.js';
import { AccessTokenRepository } from '../access-token/access-token.repository.js';
import { AccessTokenService } from '../access-token/access-token.service.js';
import { UserStaffRepository } from '../user-staff/user-staff.repository.js';
import { UserRepository } from '../user/user.repsitory.js';
import { ActivateAccountDto } from './dto/activate-account.dto.js';
import { SignInDto } from './dto/sign-in.dto.js';

@Injectable()
export class AuthService {
    constructor(
        private readonly prisma: ModelService,
        private readonly jwtService: JwtService,
        private readonly hashService: HashService,
        private readonly userRepository: UserRepository,
        private readonly userStaffRepository: UserStaffRepository,
        private readonly accessTokenRepository: AccessTokenRepository,
        private readonly accessTokenService: AccessTokenService,
    ) {}

    async signIn(payload: SignInDto): Promise<string> {
        const existingUser: User | null = await this.userRepository.findByEmail(
            payload.email,
        );

        if (
            !existingUser ||
            !(await this.hashService.compare(
                payload.password,
                existingUser.passwordHash,
            ))
        ) {
            throw new BadRequestException('Invalid credentials');
        }

        if (existingUser.status !== UserStatus.ACTIVE) {
            throw new UnauthorizedException(
                'This account is not active. Use your activation link to set a password.',
            );
        }
        
        const staffRoles = await this.userStaffRepository.findRolesByUserId(
            existingUser.id,
        );

        const roles: string[] =
            existingUser.userType === UserType.ADMIN
                ? [AccessRole.ADMIN, ...staffRoles]
                : staffRoles;

        return this.jwtService.signAsync({
            userId: existingUser.id,
            userType: existingUser.userType,
            roles,
        });
    }

    async activateAccount(
        token: string,
        payload: ActivateAccountDto,
    ): Promise<{ activated: true }> {
        const tokenHash = this.accessTokenService.hash(token);
        const inviteToken: AccessToken | null =
            await this.accessTokenRepository.findByTokenHashAndPurpose(
                tokenHash,
                TokenPurpose.ACTIVATION,
            );

        if (
            !inviteToken ||
            inviteToken.usedAt !== null ||
            inviteToken.expiresAt.getTime() <= Date.now()
        ) {
            throw new BadRequestException(
                'This activation link is invalid or has expired',
            );
        }

        const passwordHash: string = await this.hashService.hash(
            payload.password,
        );

        await this.prisma.$transaction(async (tx) => {
            await this.accessTokenRepository.markUsed(inviteToken.id, tx);

            await this.userRepository.activate(
                inviteToken.userId,
                passwordHash,
                tx,
            );
        });

        return { activated: true };
    }
}
