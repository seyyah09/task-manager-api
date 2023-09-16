import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from '../../src/entities/task.entity';
import { CreateTaskDto, UpdateTaskDto } from '../../src/user/dto/create-task-dto';
import { Repository } from 'typeorm';

@Injectable()
export class TaskService {
    constructor(
        @InjectRepository(Task) private readonly taskRepo: Repository<Task>
    ) {}

    async findTask(id: number) {
        return await this.taskRepo.findOne({
            where: {
                id: id
            }
        });
    }
    
    async create(createTaskDto: CreateTaskDto) {
        const task = await this.taskRepo.create(createTaskDto);

        await this.taskRepo.save(task);

        const newTaskId: number = task.id;
        
        return await this.findTask(newTaskId);
    }

    async findTasksForUser(id: number){
        return  {
            message: `here are the tasks of the user with id: \'${id}\'`,
            result: await this.taskRepo.findBy(
                {userId: id}
            )
        }
    }

    async update(id: number, updateTaskDto: UpdateTaskDto) {
        return await this.taskRepo.update(id, updateTaskDto);
    }

    async delete(id: number) {
        return await this.taskRepo.delete(id);
    }
}
