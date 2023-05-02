import { ConflictException, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import { E_CATEGORY_EXISTS } from 'src/common/exception';

@Injectable()
export class CategoriesService {
    constructor(
        @InjectRepository(Category)
        private categoryRepository: Repository<Category>,
    ) {}

    async create(dto: CreateCategoryDto) {
        const existingCategory = await this.categoryRepository.findOne({
            where: { name: dto.name },
        });
        if (existingCategory) throw new ConflictException(E_CATEGORY_EXISTS);

        return { data: await this.categoryRepository.save(dto) };
    }

    async findAll(): Promise<{ data: Category[]; count: number }> {
        const [data, count] = await this.categoryRepository.findAndCount();
        return { count, data };
    }

    findOne(id: number) {
        return `This action returns a #${id} category`;
    }

    update(id: number, updateCategoryDto: UpdateCategoryDto) {
        return `This action updates a #${id} category`;
    }

    remove(id: number) {
        return `This action removes a #${id} category`;
    }
}
