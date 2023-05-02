import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';

export const CurrentUser = createParamDecorator(
    (data, context: ExecutionContext): User => {
        return context.getArgByIndex(0).user;
    },
);
