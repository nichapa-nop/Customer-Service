import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Relation } from 'typeorm';
import { GroupMenuEntity } from './group-menu.entity';
import { MenuEntity } from 'src/model/menu/entities/menu.entity';

export enum MenuPermission {
    READ = 'read',
    CREATE = 'create',
    UPDATE = 'update',
    DELETE = 'delete',
}

@Entity('group-menu-binding')
export class GroupMenuBindingEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => GroupMenuEntity, (groupMenu) => groupMenu.bindings, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'groupMenuId' })
    groupMenu: Relation<GroupMenuEntity>;

    @ManyToOne(() => MenuEntity, (menu) => menu.bindings, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'menuId' })
    menu: Relation<MenuEntity>;

    @Column({
        type: 'enum',
        enum: MenuPermission,
        array: true,
    })
    permissions: MenuPermission[];
}
