import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { META_ROLES } from '../decorators/role-protected.decorator';
import { User } from '../schemas/user.schema';

@Injectable()
export class UserRoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const validatRoles: string[] = this.reflector.get(
      META_ROLES,
      context.getHandler(),
    );

    if (!validatRoles) return true;
    if (validatRoles.length === 0) return true;

    const req = context.switchToHttp().getRequest();
    const user = req.user as User;

    if (!user) {
      throw new BadRequestException('User not found');
    }
    for (const role of user.roles) {
      if (validatRoles.includes(role)) {
        return true;
      }
    }
    console.log({ userRoles: user.roles });
    throw new ForbiddenException(`user ${user.email} needs a valid role`);
  }
}
