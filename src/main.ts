import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import 'dotenv/config';

import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { GlobalExceptionFilter } from './filters/global-exception.filter';
import { LoggingInterceptor } from './interceptor/logger.interceptor';
import logger from './common/utils/logger';
import { environment, isProdEnv } from './app.environment';
import validationOptions from './common/utils/validation-options';

async function bootstrap() {
    const app = await NestFactory.create(
        AppModule,
        isProdEnv ? { logger: false } : {},
    );

    app.use(helmet());
    app.enableCors({
        origin: '*',
    });
    app.setGlobalPrefix('api/v1');
    app.useGlobalPipes(new ValidationPipe(validationOptions));
    app.useGlobalFilters(new GlobalExceptionFilter()); /*Global error handler*/
    app.useGlobalInterceptors(new LoggingInterceptor());
    return await app.listen(
        process.env.PORT ? parseInt(process.env.PORT) : 5000,
    );
}
bootstrap().then(() => {
    logger.info(
        `Server is running on Port ${
            process.env.PORT ? parseInt(process.env.PORT) : 5000
        }, env: ${environment}`,
    );
});
