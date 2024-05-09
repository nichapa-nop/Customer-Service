import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('role')
export class RoleEntity {
    @PrimaryGeneratedColumn('uuid')
    uuid: string;

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
