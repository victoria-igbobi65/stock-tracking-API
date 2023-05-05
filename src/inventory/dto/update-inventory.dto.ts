import {
    IsDefined,
    IsNotEmpty,
    IsString,
    IsPositive,
    IsNumber,
} from 'class-validator';
import { PartialType } from '@nestjs/swagger';
import { CreateInventoryDto } from './create-inventory.dto';

export class UpdateInventoryDto extends PartialType(CreateInventoryDto) {
    @IsString()
    @IsDefined()
    @IsNotEmpty()
    readonly category?: string;

    @IsString()
    @IsDefined()
    @IsNotEmpty()
    readonly description?: string;

    @IsDefined()
    @IsNotEmpty()
    @IsPositive()
    @IsNumber()
    readonly costPrice?: number;

    @IsDefined()
    @IsNotEmpty()
    @IsPositive()
    @IsNumber()
    readonly quantityInStock?: number;

    @IsDefined()
    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    readonly sellingPrice?: number;
}
