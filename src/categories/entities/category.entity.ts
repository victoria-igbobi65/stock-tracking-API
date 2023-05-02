import { Column, Entity } from 'typeorm';

import { BaseEntity } from 'src/common/entities/base.entity';

@Entity('categories')
export class Category extends BaseEntity {
    @Column({ type: 'varchar', unique: true })
    name: string;
}
