import {
    BadRequestException,
    Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { HashService } from '../hash/hash.service.js';
import { UserRepository } from '../user/user.repsitory.js';
import { SignInDto } from './dto/sign-in.dto.js';
import { User } from '@app/model/generated/prisma/client.js';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly hashService: HashService,
        private readonly userRepository: UserRepository,
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

        const token: string = await this.jwtService.signAsync({
            userId: existingUser.id,
            role: existingUser.userType,
        });

        return token;
    }
}
