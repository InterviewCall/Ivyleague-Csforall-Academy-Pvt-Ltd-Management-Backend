import { Injectable } from '@nestjs/common';

@Injectable()
export class LearnerLifecycleService {
  getHello(): string {
    return 'Hello World!';
  }
}
