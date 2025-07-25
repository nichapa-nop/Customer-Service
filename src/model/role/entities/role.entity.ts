import { AccountEntity } from 'src/model/account/entities/account.entity';
import { GroupMenuBindingEntity } from 'src/model/group-menu/entities/group-menu.binding.entity';
import { GroupMenuEntity } from 'src/model/group-menu/entities/group-menu.entity';
import { MenuEntity } from 'src/model/menu/entities/menu.entity';
import { RoleResponse } from 'src/utils/utils.response.dto';
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    Relation,
    UpdateDateColumn,
} from 'typeorm';

@Entity('role')
export class RoleEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar',
    })
    roleName: string;

    @Column({
        type: 'integer',
        nullable: true,
    })
    priority: number;

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

    @OneToMany(() => AccountEntity, (account) => account.role, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'accountRole' })
    account: AccountEntity[];

    @ManyToOne(() => GroupMenuEntity, (groupMenu) => groupMenu.roles, {
        // nullable: true,
        onDelete: 'SET NULL',
    })
    @JoinColumn({ name: 'groupMenuId' })
    groupMenu: Relation<GroupMenuEntity>;

    public create(params: CreateRoleParams) {
        this.roleName = params.roleName;
        this.groupMenu = params.groupMenu;
        // this.priority = params.priority;
        this.createdBy = params.createdBy;
    }

    public update(params: UpdateRoleParams) {
        this.roleName = params.roleName;
        this.groupMenu = params.groupMenu;
        // this.priority = params.priority;
        this.updatedBy = params.updatedBy;
    }

    public toResponse(): RoleResponse {
        return {
            id: this.id,
            roleName: this.roleName,
            // priority: this.priority,
            groupMenu: this.groupMenu?.toResponse(),
            createdBy: this.createdBy,
            updatedBy: this.updatedBy,
        };
    }
}

export interface CreateRoleParams {
    roleName: string;
    groupMenu: GroupMenuEntity;
    // priority: number;
    createdBy: string;
}

export interface UpdateRoleParams {
    roleName: string;
    groupMenu: GroupMenuEntity;
    // priority: number;
    updatedBy: string;
}
