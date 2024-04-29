import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('account')
export class AccountEntity {
    @PrimaryGeneratedColumn('uuid')
    uuid: string;

    @Column({
        type: 'varchar',
    })
    firstName: string;

    @Column({
        type: 'varchar',
    })
    lastName: string;

    @Column({
        type: 'varchar',
    })
    email: string;

    @Column({
        type: 'varchar',
    })
    password: string;

    public create(params: CreateAccountParams) {
        this.firstName = params.firstName;
        this.lastName = params.lastName;
        this.email = params.email;
        this.password = params.password;
    }
}

export interface CreateAccountParams {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}
