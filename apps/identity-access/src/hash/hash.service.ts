import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HashService {
    private readonly saltRounds = Number(process.env.SALT_ROUNDS) || 10;

    hash(plainText: string): Promise<string> {
        return bcrypt.hash(plainText, this.saltRounds);
    }

    compare(plainText: string, hash: string): Promise<boolean> {
        return bcrypt.compare(plainText, hash);
    }
}
