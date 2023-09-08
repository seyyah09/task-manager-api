import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { TaskModule } from '../task/task.module';
import { TaskService } from 'src/task/task.service';

@Module({
  imports: [TaskModule, TypeOrmModule.forFeature([User])], 
  controllers: [UserController],
  providers: [UserService, TaskService]
})
export class UserModule {}
