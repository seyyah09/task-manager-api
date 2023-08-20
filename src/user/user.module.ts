import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TaskService } from 'src/task/task.service';

@Module({
  controllers: [UserController],
  providers: [UserService, TaskService]
})
export class UserModule {}
