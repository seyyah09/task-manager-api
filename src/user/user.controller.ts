import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser-dto';
import { UserService } from './user.service';
import { TaskService } from 'src/task/task.service';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService,
        private readonly taskService: TaskService) {}

    @Get(':id')
    findOne(@Param("id") id:string) {
        return this.userService.findOne(id);
    };

    @Get(':id/mytasks')
    getTasksForUser(@Param("id") id:string) {
        return this.taskService.findTasksForUser(id);
    };

    @Post()
    createUser(@Body() dto: CreateUserDto) {
        return this.userService.createUser(dto);
    }

    @Patch()
    somePatchFunction(){}

    @Put()
    
    somePutFunction(){}

    @Delete()

    someDeleteFunction(){}
}
