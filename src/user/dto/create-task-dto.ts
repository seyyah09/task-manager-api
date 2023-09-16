import { PartialType } from "@nestjs/mapped-types";
import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateTaskDto {
    
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    description?: string;

    @IsString()
    notes: string;

    @IsString()
    status: string;

    @IsDate()
    @IsNotEmpty()
    duedate: Date;

    @IsNumber()
    userId: number;
}

export class UpdateTaskDto extends PartialType(CreateTaskDto){}