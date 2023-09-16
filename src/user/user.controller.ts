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

    @Get('getallusers')
    getUsers() {
        return this.userService.getUsers();
    };

    @Get(':id')
    findOne(@Param("id") id:number) {
        return this.userService.findOne(id);
    };

    @Post()
    async createUser(@Body() dto: CreateUserDto) {
        return  {
            message: "thanks for joining us! the user created as follows:",
            user: await this.userService.create(dto)
        }
    }
    
    @Put(':id')
    async update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
        return {
            message: `Wooww! user info updated for the user with id:${id} successfully`,
            result: await this.userService.update(id, updateUserDto)
        }
    }
//TODO: Later, add admin check!
    @Delete(':id')
    async delete(@Param('id') id: number) {
        if(!await this.userService.userIdCheck(id)) {
            return `no such user with id: ${id} or deleted before!`
        }

        const username: string = (await this.userService.findOne(id)).email
        return {
            message: `the user ${username} with id:${id} deleted!`,
            result: await this.userService.delete(id)
        }
    }

    // @Patch()
    // somePatchFunction(){}

}
