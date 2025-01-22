
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Roles } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  private allRoles = ['admin', 'platform-user', 'visitor'];
  constructor(private reflector: Reflector) { }

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get(Roles, context.getHandler());
    console.log('roless', roles);
    if (!roles) {
      return true;
    }
    const hasAccess = roles.some(role => this.allRoles.includes(role));
    // const request = context.switchToHttp().getRequest();
    // const user = request.user;
    return hasAccess;
    


  }
}
