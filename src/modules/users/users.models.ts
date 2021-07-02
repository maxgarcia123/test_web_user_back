import {
  Column,
  Model,
  Table,
  DataType,
  CreatedAt,
  UpdatedAt,
  HasMany,
  AllowNull,
} from 'sequelize-typescript';
import { UsersAddressesModel } from '../users-addresses/users-addresses.models';

@Table({ tableName: 'users', timestamps: true })
export class UsersModel extends Model<UsersModel> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.BIGINT,
  })
  id: number;

  @Column
  name: string;

  @Column
  email: string;

  @Column
  cpf: string;

  @AllowNull(true)
  @Column
  pis: string;

  @Column
  password: string;

  @HasMany(() => UsersAddressesModel)
  address: UsersAddressesModel;

  @Column({ defaultValue: true })
  status: boolean;

  @CreatedAt
  created_at: Date;

  @UpdatedAt
  updated_at: Date;
}
