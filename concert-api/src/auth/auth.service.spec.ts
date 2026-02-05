import { AuthService } from '../auth/auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    service = new AuthService();
  });

  it('extracts userId and role from headers', () => {
    const req: any = {
      headers: {
        'x-user-id': 'user-1',
        'x-role': 'USER',
      },
    };

    const user = service.getUserFromRequest(req);

    expect(user.userId).toBe('user-1');
    expect(user.role).toBe('USER');
  });

  it('throws error if headers are missing', () => {
    const req: any = { headers: {} };
    expect(() => service.getUserFromRequest(req)).toThrow();
  });

  it('throws error if role is invalid', () => {
    const req: any = {
      headers: {
        'x-user-id': 'user-1',
        'x-role': 'INVALID',
      },
    };

    expect(() => service.getUserFromRequest(req)).toThrow();
  });
});
