import { HttpException, Injectable } from '@nestjs/common';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Inventory } from './entities/inventory.entity';
import { Repository } from 'typeorm';
import { CategoriesService } from 'src/categories/categories.service';
import { E_INVENTORY_EXISTS, E_INVENTORY_NOTFOUND } from 'src/common/exception';
import { Category } from 'src/categories/entities/category.entity';

@Injectable()
export class InventoryService {
    constructor(
        @InjectRepository(Inventory)
        private inventoryRepository: Repository<Inventory>,
        private categoryService: CategoriesService,
    ) {}

    async create(dto: CreateInventoryDto): Promise<{ data: Inventory }> {
        const category = await this.categoryService.findOneById(dto.category);

        const inventoryExists = await this.findDuplicateInventory(
            dto,
            category,
        );
        if (inventoryExists) throw new HttpException(E_INVENTORY_EXISTS, 409);
        const newInventory = this.inventoryRepository.create({
            ...dto,
            category,
        });
        const data = await this.inventoryRepository.save(newInventory);
        return { data };
    }

    async findAll(): Promise<{ data: Inventory[]; count: number }> {
        const [data, count] = await this.inventoryRepository.findAndCount();
        return { count, data };
    }

    async findOne(id: string): Promise<{ data: Inventory }> {
        const data = await this.findOneById(id);
        return { data };
    }

    update(id: number, updateInventoryDto: UpdateInventoryDto) {
        return `This action updates a #${id} inventory`;
    }

    async remove(id: string) {
        await this.findOneById(id);
        return await this.inventoryRepository.delete(id);
    }

    async findDuplicateInventory(dto: CreateInventoryDto, category: Category) {
        const { name, costPrice, sellingPrice } = dto;

        const existingInventory = await this.inventoryRepository.findOne({
            where: { name, costPrice, sellingPrice, category },
        });
        return existingInventory;
    }

    async findOneById(id: string) {
        const inventory = await this.inventoryRepository.findOne({
            where: { id: id },
        });
        if (!inventory) throw new HttpException(E_INVENTORY_NOTFOUND, 404);
        return inventory;
    }
}
