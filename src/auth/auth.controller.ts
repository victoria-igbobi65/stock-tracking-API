import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    Post,
    UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { Connection } from './interface/connection.interface';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    createUser(@Body() authRegisterDto: CreateUserDto): Promise<Connection> {
        return this.authService.register(authRegisterDto);
    }
}
