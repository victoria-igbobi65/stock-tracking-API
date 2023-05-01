import {
    CreateDateColumn,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

export abstract class BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @CreateDateColumn({ type: 'varchar' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'varchar' })
    updatedAt: Date;
}
