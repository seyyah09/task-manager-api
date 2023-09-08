import { PartialType } from "@nestjs/mapped-types";
import { IsEmail, IsEmpty, IsNumberString, IsString } from "class-validator";

export class CreateUserDto {
    @IsString()
    name:string;

    @IsEmail()
    email:string;
    
    @IsNumberString()
    password:string;
}

export class UpdateUserDto extends PartialType(CreateUserDto){}