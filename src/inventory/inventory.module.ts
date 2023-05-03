import { Module } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { InventoryController } from './inventory.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from 'src/categories/entities/category.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Category])],
    controllers: [InventoryController],
    providers: [InventoryService],
})
export class InventoryModule {}
