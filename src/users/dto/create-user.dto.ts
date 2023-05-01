import { IsString, IsDefined, IsNotEmpty, IsEmail } from 'class-validator';

export class CreateUserDto {
    @IsEmail()
    @IsDefined()
    @IsNotEmpty()
    readonly email: string;

    @IsString()
    @IsDefined()
    @IsNotEmpty()
    readonly password: string;
}
