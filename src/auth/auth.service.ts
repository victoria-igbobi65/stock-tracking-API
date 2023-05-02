import { Injectable, NotAcceptableException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';
import { LoginDto } from './dto/login.dto';
import { E_INCORRECT_EMAIL_OR_PASSWORD } from 'src/common/exception';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) {}

    getAccessToken(user: User): string {
        return this.jwtService.sign({ userType: user.user_type, sub: user.id });
    }

    async register(createUserDto: CreateUserDto) {
        const user = await this.usersService.create(createUserDto);
        return { data: user, accessToken: this.getAccessToken(user) };
    }

    async login(dto: LoginDto) {
        const { email, password } = dto;

        const user = await this.usersService.findoneByField(email, 'email');
        if (!(await user?.validatePassword(password))) {
            throw new NotAcceptableException(E_INCORRECT_EMAIL_OR_PASSWORD);
        }
        return { data: user, accessToken: this.getAccessToken(user) };
    }
}
