import {
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Injectable,
} from '@nestjs/common'
import { UsersService } from '../users.service'

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
  constructor(private usersService: UsersService) {}
  async intercept(context: ExecutionContext, handler: CallHandler) {
    const request = context.switchToHttp().getRequest()
    const { userId } = request.session || {}
    if (userId) {
      const user = await this.usersService.findOne(parseInt(userId))
      //request is mutable. We can add properties to it.
      request.currentUser = user
    }
    return handler.handle()
  }
}
