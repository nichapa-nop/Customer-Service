import { GroupMenuBindingEntity } from 'src/model/group-menu/entities/group-menu.binding.entity';
import { RoleEntity } from 'src/model/role/entities/role.entity';
import { MenuResponse } from 'src/utils/utils.response.dto';
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToMany,
    OneToMany,
    PrimaryGeneratedColumn,
    Relation,
    UpdateDateColumn,
} from 'typeorm';

@Entity('menu')
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

    @OneToMany(() => GroupMenuBindingEntity, (binding) => binding.menu, { cascade: true })
    bindings: Relation<GroupMenuBindingEntity[]>;

    public toResponse(): MenuResponse {
        return {
            id: this.id,
            menuName: this.menuName,
            createdBy: this.createdBy,
            // updatedBy: this.updatedBy,
        };
    }

    public create(params: CreateMenuParams) {
        this.menuName = params.menuName;
        this.createdBy = params.createdBy;
    }

    public update(params: UpdateMenuParams) {
        this.menuName = params.menuName;
        this.updatedBy = params.updatedBy;
    }
}

export interface CreateMenuParams {
    menuName: string;
    createdBy: string;
}

export interface UpdateMenuParams {
    menuName: string;
    updatedBy: string;
}
