import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
} from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { UserAuthGuards } from 'src/auth/user-auth.guard';

@UseGuards(UserAuthGuards)
@Controller('inventory')
export class InventoryController {
    constructor(private readonly inventoryService: InventoryService) {}

    @Post()
    create(@Body() dto: CreateInventoryDto) {
        return this.inventoryService.create(dto);
    }

    @Get()
    findAll() {
        return this.inventoryService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.inventoryService.findOne(id);
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateInventoryDto: UpdateInventoryDto,
    ) {
        return this.inventoryService.update(+id, updateInventoryDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.inventoryService.remove(id);
    }
}
