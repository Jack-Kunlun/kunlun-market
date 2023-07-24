import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { ROLE_KEY, RoleType } from "src/const";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const role = this.reflector.getAllAndOverride<RoleType>(ROLE_KEY, [context.getHandler(), context.getClass()]);

    if (!role) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (user.serviceType !== role[0]) {
      throw new ForbiddenException("对不起，您无权操作");
    }

    // TODO: 细分权限待补充
    // if (user.roleId > adminRole) {
    //   throw new ForbiddenException("对不起，您无权操作");
    // }

    return true;
  }
}
