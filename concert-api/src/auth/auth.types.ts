export type UserRole = 'ADMIN' | 'USER';

export interface AuthUser {
  userId: string;
  role: UserRole;
}
