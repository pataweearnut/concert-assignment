import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { AuthUser, UserRole } from './auth.types';

@Injectable()
export class AuthService {
  getUserFromRequest(req: Request): AuthUser {
    const userId = req.headers['x-user-id'] as string;
    const role = req.headers['x-role'] as UserRole;

    if (!userId || !role) {
      throw new UnauthorizedException('Missing authentication headers');
    }

    if (role !== 'ADMIN' && role !== 'USER') {
      throw new UnauthorizedException('Invalid role');
    }

    return { userId, role };
  }
}
