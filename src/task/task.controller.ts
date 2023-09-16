import { Body, Controller, Delete, Get, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
import { TaskService } from './task.service';
import { UpdateTaskDto } from 'src/user/dto/create-task-dto';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';
import { UserService } from 'src/user/user.service';

@Controller('task')
export class TaskController {
        constructor(
        private readonly taskService: TaskService,
        private readonly userService: UserService
    ) {}

    @UseGuards(JwtGuard)    
    @Post('create')
    createTask(@Request() req, @Body() dto) {
        dto.userId = req.user.user.userId;
        return this.taskService.create(dto);
    };
    
    @Put(':id')
    async update(@Param('id') id: number, @Body() updateTaskDto: UpdateTaskDto) {
        return {
            message: `task updated as follows successfully`,
            result: await this.taskService.update(id, updateTaskDto)
        }
    }

    @UseGuards(JwtGuard)
    @Get('usertasks')
    getTasksForUser(@Request() req) {
        const user_id: number = req.user.userId;
        return this.taskService.findTasksForUser(user_id);
    };

    @UseGuards(JwtGuard)
    @Delete(':id')
    async delete(@Request() req, @Param('id') id: number) {
        const tokenId: number = req.user.user.userId;
        const userIdOfSelectedTask = (await this.taskService.findTask(id)).userId;
        if(!this.userService.matchIds(tokenId, userIdOfSelectedTask)) {
            return {
                alert: `it seems like you are not authorized to delete this task!`
            }
        };

        const title: string = (await this.taskService.findTask(id)).title;
        return {
            message: `the task '${title}' deleted!`,
            result: await this.taskService.delete(id)
        }
    }
}
