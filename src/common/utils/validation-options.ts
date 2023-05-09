import { ValidationPipeOptions } from '@nestjs/common';

const validationOptions: ValidationPipeOptions = {
    whitelist: true,
    transform: true,
    transformOptions: {
        enableImplicitConversion: true,
    },
};
export default validationOptions;
