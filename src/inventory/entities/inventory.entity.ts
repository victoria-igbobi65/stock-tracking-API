import { Category } from 'src/categories/entities/category.entity';
import { BaseEntity } from 'src/common/entities/base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity('inventories')
export class Inventory extends BaseEntity {
    @Column({ type: 'varchar' })
    name: string;

    @ManyToOne(() => Category, (category) => category.inventories)
    category: Category;

    @Column({ name: 'quantity_in_stock' })
    quantityInStock: number;

    @Column()
    description: string;

    @Column({ name: 'cost_price' })
    costPrice: number;

    @Column({ name: 'selling_price' })
    sellingPrice: number;
}
