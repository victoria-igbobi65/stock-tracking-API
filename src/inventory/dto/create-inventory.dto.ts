import {
    IsDefined,
    IsNotEmpty,
    IsNumber,
    IsPositive,
    IsString,
} from 'class-validator';

import { ToLowerCase } from 'src/common/decorators/to-lower-case.decorator';
import { IsSellingPriceGreaterThanCostPrice } from 'src/common/decorators/compare-price.decorator';

export class CreateInventoryDto {
    @IsString()
    @IsDefined()
    @IsNotEmpty()
    @ToLowerCase()
    name: string;

    @IsString()
    @IsDefined()
    @IsNotEmpty()
    @ToLowerCase()
    category: string;

    @IsDefined()
    @IsNotEmpty()
    @IsPositive()
    @IsNumber()
    quantityInStock: number;

    @IsString()
    @IsDefined()
    @IsNotEmpty()
    @ToLowerCase()
    description: string;

    @IsDefined()
    @IsNotEmpty()
    @IsPositive()
    @IsNumber()
    costPrice: number;

    @IsDefined()
    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    @IsSellingPriceGreaterThanCostPrice()
    sellingPrice: number;
}
