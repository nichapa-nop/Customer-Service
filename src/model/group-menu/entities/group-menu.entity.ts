import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Relation } from 'typeorm';
import { RoleEntity } from 'src/model/role/entities/role.entity';
import { GroupMenuBindingEntity } from './group-menu.binding.entity';

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
}
