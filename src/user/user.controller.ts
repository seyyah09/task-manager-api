import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Request, UseGuards } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto/createUser-dto';
import { UserService } from './user.service';
import { TaskService } from 'src/task/task.service';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';
import { JwtService } from '@nestjs/jwt';
import { ExtractJwt } from 'passport-jwt';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService,
        private readonly taskService: TaskService) {}

    @Get(':id')
    findOne(@Param("id") id:number) {
        return this.userService.findOne(id);
    };

    @UseGuards(JwtGuard)
    @Get(':id/usertasks')
    getTasksForUser(@Request() req, @Param("id") id:number) {
        const tokenId: number = req.user.user.userId;
        if(!this.userService.matchIds(tokenId, id)) {
            return `you are not allowed to see tasks of user with id: ${id}!`
        }
        return this.taskService.findTasksForUser(id);
    };

    @Post()
    async createUser(@Body() dto: CreateUserDto) {
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
