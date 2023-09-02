import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto/createUser-dto';
import { UserService } from './user.service';
import { TaskService } from 'src/task/task.service';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService,
        private readonly taskService: TaskService) {}

    @Get(':id')
    findOne(@Param("id") id:number) {
        return this.userService.findOne(id);
    };

    @Get(':id/mytasks')
    getTasksForUser(@Param("id") id:string) {
        return this.taskService.findTasksForUser(id);
    };

    @Post()
    async ascreateUser(@Body() dto: CreateUserDto) {
        return  {
            message: "thanks for joining us! the user created as follows:",
            user: await this.userService.create(dto)
        }
    }
    

    @Patch()
    somePatchFunction(){}

    @Put(':id')
    async update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
        return {
            message: `Wooww! user info updated for the user with id:${id} successfully`,
            result: await this.userService.update(id, updateUserDto)
        }
    }
    
//TODO QUESTION: 25 ve 37'deki mesajları service içinde mi vermek lazım?
//TODO QUESTION: 25 ve 37'deki mesajlar olmasaydı 26 ve 38'deki async-await'e gerek olmuyordu, neden?

    somePutFunction(){}

    @Delete()

    someDeleteFunction(){}
}
