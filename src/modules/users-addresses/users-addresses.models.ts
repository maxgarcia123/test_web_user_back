import {
  Column,
  Model,
  Table,
  DataType,
  CreatedAt,
  UpdatedAt,
  AllowNull,
  ForeignKey,
} from 'sequelize-typescript';
import { UsersModel } from '../users/users.models';

@Table({ tableName: 'users_addresses' })
export class UsersAddressesModel extends Model<UsersAddressesModel> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.BIGINT,
  })
  id: number;

  @AllowNull(false)
  @ForeignKey(() => UsersModel)
  @Column(DataType.BIGINT)
  user_id: number;

  @Column
  country: string;

  @Column
  state: string;

  @Column
  city: string;

  @AllowNull(true)
  @Column
  postal_code: string;

  @Column
  street: string;

  @Column
  number: string;

  @AllowNull(true)
  @Column
  observation: string;

  @Column({ defaultValue: true })
  status: boolean;

  @CreatedAt
  created_at: Date;

  @UpdatedAt
  updated_at: Date;
}
