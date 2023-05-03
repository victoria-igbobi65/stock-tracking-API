import { Column, Entity, OneToMany } from 'typeorm';

import { BaseEntity } from 'src/common/entities/base.entity';
import { Inventory } from 'src/inventory/entities/inventory.entity';

@Entity('categories')
export class Category extends BaseEntity {
    @Column({ type: 'varchar', unique: true })
    name: string;

    @OneToMany(() => Inventory, (inventory) => inventory.category)
    inventories: Inventory[];
}
