import { Module } from '@nestjs/common'
import { APP_INTERCEPTOR } from '@nestjs/core'
import { UsersController } from './users.controller'
import { UsersService } from './users.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthService } from './auth.service'
import { User } from './entities/user.entity'
import { CurrentUserInterceptor } from './interceptors/current-user.interceptor'

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [
    UsersService,
    AuthService,
    { useClass: CurrentUserInterceptor, provide: APP_INTERCEPTOR }, // This is a custom interceptor. It is used to intercept the request and add the current user to the request object globally.
  ],
})
export class UsersModule {}
