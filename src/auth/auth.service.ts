import { Injectable } from '@nestjs/common';
import { UserService } from '../../src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../src/entities/user.entity';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService, private jwtService: JwtService){}
    
    async validateUser(username: string, password: string) {
        const user = await this.userService.findOneWithUserName(username);
        if (user && (await bcrypt.compare(password, user.password))) {
            delete user.password;
            return user;
        }
        return {
            message: "username or password doesnt exist!"
        };
    }

    async login(user:User) {
        const payload = {
            username: user.email,
            sub: {
                name: user.name,
            },
        };
        
        return {
            ...user,
            accessToken: await this.jwtService.sign(payload),
        };
    }
}

