import { HttpException, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import { E_CATEGORY_EXISTS, E_CATEGORY_NOT_FOUND } from 'src/common/exception';

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
        if (existingCategory) throw new HttpException(E_CATEGORY_EXISTS, 409);

        return { data: await this.categoryRepository.save(dto) };
    }

    async findAll(): Promise<{ data: Category[]; count: number }> {
        const [data, count] = await this.categoryRepository.findAndCount();
        return { count, data };
    }

    async findOne(id: string): Promise<{ data: Category }> {
        const data = await this.findOneById(id);
        return { data };
    }

    async remove(id: string) {
        await this.findOneById(id);
        return await this.categoryRepository.delete(id);
    }

    async findOneById(id: string) {
        const category = await this.categoryRepository.findOne({
            where: { id: id },
        });
        if (!category) throw new HttpException(E_CATEGORY_NOT_FOUND, 404);
        return category;
    }
}
