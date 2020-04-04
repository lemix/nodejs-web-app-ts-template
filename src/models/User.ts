import { Table, Column, Model, DataType, AllowNull, Unique } from 'sequelize-typescript';

@Table
export class User extends Model<User> {
    @AllowNull(false)
    @Column(DataType.STRING(32))
    firstName!: string;

    @AllowNull(false)
    @Column(DataType.STRING(32))
    lastName!: string;

    @AllowNull(false)
    @Unique
    @Column(DataType.STRING(50))
    email!: string;
}