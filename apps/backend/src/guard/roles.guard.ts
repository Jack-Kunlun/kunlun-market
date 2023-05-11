import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { ADMIN_ROLE_KEY, AdminRole } from "src/const";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const adminRole = this.reflector.getAllAndOverride<AdminRole>(ADMIN_ROLE_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!adminRole) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (user.roleId > adminRole) {
      throw new ForbiddenException("对不起，您无权操作");
    }

    return true;
  }
}
