import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { AuthService } from "../../auth/auth.service";

@Injectable()
export class UserGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  canActivate(ctx: ExecutionContext): boolean {
    const req = ctx.switchToHttp().getRequest();
    const user = this.authService.getUserFromRequest(req);
    return user.role === 'USER';
  }
}
