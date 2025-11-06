import { IsNotEmpty, isNotEmpty, Length } from "class-validator";

export class CreateUserDTO {
    @IsNotEmpty({
        message: "Nome é obrigatório"
    })
    @Length(3, 100)
    name: string;

    @IsNotEmpty()
    email: string

    @IsNotEmpty()
    passwordHash: string;
}