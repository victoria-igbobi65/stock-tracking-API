import { Injectable, HttpException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { E_USER_EMAIL_EXISTS } from 'src/common/exception';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}

    async create(dto: CreateUserDto) {
        const existingUser = await this.userRepository.findOne({
            where: { email: dto.email },
        });
        if (existingUser) throw new HttpException(E_USER_EMAIL_EXISTS, 409);
        const user = this.userRepository.create(dto);
        return this.userRepository.save(user);
    }

    findAll() {
        return `This action returns all users`;
    }

    findOne(id: number) {
        return `This action returns a #${id} user`;
    }

    async findoneByField(
        fieldValue: number | string,
        fieldName = 'id',
    ): Promise<User> {
        return await this.userRepository.findOne({
            where: { [fieldName]: fieldValue },
        });
    }

    update(id: number, updateUserDto: UpdateUserDto) {
        return `This action updates a #${id} user`;
    }

    remove(id: number) {
        return `This action removes a #${id} user`;
    }
}
