import { Module } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { InventoryController } from './inventory.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from 'src/categories/entities/category.entity';
import { Inventory } from './entities/inventory.entity';
import { CategoriesModule } from 'src/categories/categories.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Category, Inventory]),
        CategoriesModule,
    ],
    controllers: [InventoryController],
    providers: [InventoryService],
})
export class InventoryModule {}
