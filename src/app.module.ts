import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UsersModule } from './users/users.module'
import { ReportsModule } from './reports/reports.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from './users/entities/user.entity'
import { Report } from './reports/entities/report.entity'

@Module({
  imports: [
    UsersModule,
    ReportsModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [User, Report], // acá van las entidades creadas
      synchronize: true, // sincroniza la base de datos con las entidades
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
