import { Column, Entity, BeforeInsert } from 'typeorm';
import { Exclude } from 'class-transformer';
import * as bcrypt from 'bcryptjs';

import { BaseEntity } from 'src/common/entities/base.entity';
import { Roles } from '../enums/user-roles';

@Entity('users')
export class User extends BaseEntity {
    @Column({ unique: true })
    email: string;

    @Column()
    @Exclude({ toPlainOnly: true })
    password: string;

    @Column({ type: 'enum', enum: Roles, default: Roles.ADMIN })
    user_type: Roles;

    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);
    }

    async validatePassword(password: string): Promise<boolean> {
        return await bcrypt.compare(password, this.password);
    }

    constructor(partial: Partial<User>) {
        super();
        Object.assign(this, partial);
    }
}
