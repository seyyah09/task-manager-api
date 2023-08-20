import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser-dto';

@Injectable()
export class UserService {

    findOne(id:string){
        return ({
            id: id
        })
    }

    createUser(dto: CreateUserDto) {
        return({
            message: `bravo! user ${dto.firstname} created`
        })
    }
}
