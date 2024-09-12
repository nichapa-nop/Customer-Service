import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Relation } from 'typeorm';
import { RoleEntity } from 'src/model/role/entities/role.entity';
import { GroupMenuBindingEntity } from './group-menu.binding.entity';
import { GroupMenuResponse } from 'src/utils/utils.response.dto';

@Entity('group-menu')
export class GroupMenuEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar',
    })
    name: string;

    @OneToMany(() => RoleEntity, (role) => role.groupMenu, { cascade: true })
    roles: Relation<RoleEntity[]>;

    @OneToMany(() => GroupMenuBindingEntity, (binding) => binding.groupMenu, { cascade: true })
    bindings: Relation<GroupMenuBindingEntity[]>;

    public toResponse(): GroupMenuResponse {
        return {
            id: this.id,
            name: this.name,
        };
    }

    public create(params: CreateGroupMenuParams) {
        this.name = params.name;
    }
}

export interface CreateGroupMenuParams {
    name: string;
}
