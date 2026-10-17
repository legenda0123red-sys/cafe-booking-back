import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateTableDto{
    @IsNumber()
    @IsNotEmpty()
    number!: number;

    @IsNumber()
    @IsNotEmpty()
    seats!: number;
}