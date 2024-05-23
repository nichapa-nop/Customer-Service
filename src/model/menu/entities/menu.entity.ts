import { RoleEntity } from 'src/model/role/entities/role.entity';
import { MenuResponse } from 'src/utils/utils.response.dto';
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

    @ManyToMany(() => RoleEntity, (role) => role.menu, { cascade: true })
    @JoinColumn({ name: 'roleMenu' })
    role: Relation<RoleEntity[]>;

    public toResponse(): MenuResponse {
        return {
            id: this.id,
            menuName: this.menuName,
            createdBy: this.createdBy,
            updatedBy: this.updatedBy,
        };
    }

    public create(params: CreateMenuParams) {
        this.menuName = params.menuName;
        this.createdBy = params.createdBy;
        this.updatedBy = params.updatedBy;
    }

    public update(params: UpdateMenuParams) {
        this.menuName = params.menuName;
        this.updatedBy = params.updatedBy;
    }
}

export interface CreateMenuParams {
    menuName: string;
    createdBy: string;
    updatedBy: string;
}

export interface UpdateMenuParams {
    menuName: string;
    updatedBy: string;
}
