import { createParamDecorator, ExecutionContext } from '@nestjs/common'

export const CurrentUser = createParamDecorator(
  //ExecutionContext is an object that holds the current execution context. Could be a http request, a gRPC request, a graphql request, etc.
  (data: never, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest()
    return request.currentUser
  },
)
