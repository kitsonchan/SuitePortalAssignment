import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest()

    //imitating the authorization checking with bearer token based on user role

    if (req.headers.authorization) {
      return req.headers.authorization.replace('Bearer ', '') === 'admin' ? true : false
    }

    return false;
  }
}
