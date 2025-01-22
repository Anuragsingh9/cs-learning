import { IsEmail, isNotEmpty, IsNotEmpty } from 'class-validator';

export class SignInDto {
    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;
}
