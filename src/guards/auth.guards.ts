import { CanActivate, ExecutionContext } from '@nestjs/common'

// CanActivate is an interface that forces us to implement a canActivate method.
// canActivate method returns a boolean or a Promise that resolves to a boolean.
// ExecutionContext is an object that holds the current execution context. Could be a http request, a gRPC request, a graphql request, etc.
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest()
    return request.session.userId
  }
}
