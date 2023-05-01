import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) {}

    getAccessToken(user: User): string {
        return this.jwtService.sign({ id: user.id, email: user.email });
    }

    async register(createUserDto: CreateUserDto) {
        const user = await this.usersService.create(createUserDto);
        return { data: user, accessToken: this.getAccessToken(user) };
    }

    // async login(authLoginDto: AuthDto): Promise<object> {
    //     const user = await this.validateUser(authLoginDto);

    //     const payload = {
    //         email: user.email,
    //         id: user.id,
    //     };

    //     const access_token = this.jwtService.sign(payload);
    //     return { access_token: access_token };
    // }

    // async findByEmail(email: string) {
    //     return await User.findOne({
    //         where: {
    //             email: email,
    //         },
    //     });
    // }

    // async validateUser(authLoginDto: AuthDto): Promise<User> {
    //     const { email, password } = authLoginDto;

    //     const user = await this.findByEmail(email);
    //     if (!(await user?.validatePassword(password))) {
    //         throw new UnauthorizedException(CommonErrors.Unauthorized);
    //     }
    //     return user;
    // }
}
