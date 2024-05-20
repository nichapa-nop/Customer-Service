import { AccountEntity } from 'src/model/account/entities/account.entity';
import { RoleEntity } from 'src/model/role/entities/role.entity';
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToMany,
    PrimaryGeneratedColumn,
    Relation,
    UpdateDateColumn,
} from 'typeorm';

@Entity('Menu')
export class MenuEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    menuName: string;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @Column({
        type: 'varchar',
        nullable: true,
    })
    createdBy: string;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;

    @Column({
        type: 'varchar',
        nullable: true,
    })
    updatedBy: string;

    @ManyToMany(() => RoleEntity, (role) => role.menu, { cascade: true })
    @JoinColumn({ name: 'roleMenu' })
    role: Relation<RoleEntity[]>;

    public create(param: CreateMenuParams) {
        this.menuName = param.menuName;
        this.createdBy = param.createdBy;
        this.updatedBy = param.updatedBy;
    }
}

export interface CreateMenuParams {
    menuName: string;
    createdBy: string;
    updatedBy: string;
}
