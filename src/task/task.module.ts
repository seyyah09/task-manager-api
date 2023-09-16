import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { UserService } from '../../src/user/user.service';
import { Repository } from 'typeorm';
import { User } from '../../src/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from 'src/entities/task.entity';

@Module({
  imports: [TaskModule, TypeOrmModule.forFeature([User, Task])],
  providers: [TaskService, UserService, Repository],
  exports: [TaskService],
  controllers: [TaskController]
})
export class TaskModule {}
