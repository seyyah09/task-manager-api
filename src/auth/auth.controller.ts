import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { CreateUserDto } from 'src/user/dto/createUser-dto';
import { UserService } from 'src/user/user.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService,
        private userService: UserService) {}
    
    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req) {
        return await this.authService.login(req.user);
    }

    @Post('register')
    async registerUser(@Body() createUserDto: CreateUserDto){
        return await this.userService.create(createUserDto);
    }
}
