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
    readonly name: string;

    @IsString()
    @IsDefined()
    @IsNotEmpty()
    @ToLowerCase()
    readonly category: string;

    @IsDefined()
    @IsNotEmpty()
    @IsPositive()
    @IsNumber()
    readonly quantityInStock: number;

    @IsString()
    @IsDefined()
    @IsNotEmpty()
    @ToLowerCase()
    readonly description: string;

    @IsDefined()
    @IsNotEmpty()
    @IsPositive()
    @IsNumber()
    readonly costPrice: number;

    @IsDefined()
    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    @IsSellingPriceGreaterThanCostPrice()
    readonly sellingPrice: number;
}
