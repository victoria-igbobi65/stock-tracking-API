import {
    registerDecorator,
    ValidationOptions,
    ValidationArguments,
} from 'class-validator';
import { E_COMPARE_PRICE } from '../exception';

export function IsSellingPriceGreaterThanCostPrice(
    validationOptions?: ValidationOptions,
) {
    return function (object: object, propertyName: string) {
        registerDecorator({
            name: 'isSellingPriceGreaterThanCostPrice',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate(value: any, args: ValidationArguments) {
                    const costPrice = args.object['costPrice'];
                    return (
                        typeof costPrice === 'number' &&
                        typeof value === 'number' &&
                        value > costPrice
                    );
                },
                defaultMessage(args: ValidationArguments) {
                    return `${E_COMPARE_PRICE}`;
                },
            },
        });
    };
}
