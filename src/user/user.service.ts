import { Injectable } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto/createUser-dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private readonly userRepo: Repository<User>,
    ) {}

    matchIds(idFromToken: number, idFromParam: number): boolean {
        return idFromToken == idFromParam ? true : false
    }

    async findOne(id:number){
        return await this.userRepo.findOne({
            where: {
                id: id
            }
        });
    }

    async findOneWithUserName(userName: string) {
        return await this.userRepo.findOne({ where: {email: userName}})
    }

    async create(createUserDto: CreateUserDto) {
        const user = await this.userRepo.create(createUserDto);
        await this.userRepo.save(user);
        delete user.password;
        return user;
    }

    async update(id: number, updateUserDto: UpdateUserDto) {
        return await this.userRepo.update(id, updateUserDto);
    }
}
