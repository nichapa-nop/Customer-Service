import { AccountEntity } from 'src/model/account/entities/account.entity';
import { RoleResponse } from 'src/utils/utils.response.dto';
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    OneToMany,
    OneToOne,
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
    // account: Relation<AccountEntity>;

    public create(params: CreateRoleParams) {
        this.roleName = params.roleName;
        this.priority = params.priority;
        this.createdBy = params.createdBy;
    }

    public update(params: UpdateRoleParams) {
        this.roleName = params.roleName;
        this.priority = params.priority;
        this.updatedBy = params.updatedBy;
    }

    public toResponse(): RoleResponse {
        return {
            id: this.id,
            roleName: this.roleName,
            priority: this.priority,
            createdBy: this.createdBy,
            updatedBy: this.updatedBy,
        };
    }
}

export interface CreateRoleParams {
    roleName: string;
    priority: number;
    createdBy: string;
}

export interface UpdateRoleParams {
    roleName: string;
    priority: number;
    updatedBy: string;
}
