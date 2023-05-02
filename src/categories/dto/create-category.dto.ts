import { IsDefined, IsNotEmpty, IsString } from 'class-validator';
import { ToLowerCase } from '../../common/decorators/to-lower-case.decorator';

export class CreateCategoryDto {
    @IsString()
    @IsDefined()
    @IsNotEmpty()
    @ToLowerCase()
    name: string;
}
