import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';

import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import 'dotenv/config';
import { GlobalExceptionFilter } from './common/filters/global-exception.filter';
import { LoggingInterceptor } from './interceptor/logger.interceptor';
import logger from './utils/logger';
import { environment, isProdEnv } from './app.environment';

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
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            transform: true,
            transformOptions: {
                enableImplicitConversion: true,
            },
        }),
    );
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
