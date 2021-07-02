import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsNotEmpty, IsOptional } from 'class-validator';
import { UsersAddressesModel } from '../users-addresses.models';

export class ShowUserAddressDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  readonly user_id: number;

  @IsNotEmpty()
  @ApiProperty()
  readonly country: string;

  @IsNotEmpty()
  @ApiProperty()
  readonly state: string;

  @IsNotEmpty()
  @ApiProperty()
  readonly city: string;

  @IsNotEmpty()
  @ApiProperty()
  readonly street: string;

  @IsNotEmpty()
  @ApiProperty()
  readonly number: string;

  @IsOptional()
  @ApiProperty()
  readonly postal_code: string;

  @IsOptional()
  @ApiProperty()
  observation: string;

  constructor(address: UsersAddressesModel) {
    this.street = address.street;
    this.number = address.number;
    this.postal_code = address.postal_code;
    this.city = address.city;
    this.state = address.state;
    this.country = address.country;
  }
}
export class CreateUserAddressDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  user_id: number;

  @IsNotEmpty()
  @ApiProperty()
  readonly country: string;

  @IsNotEmpty()
  @ApiProperty()
  readonly state: string;

  @IsNotEmpty()
  @ApiProperty()
  readonly city: string;

  @IsNotEmpty()
  @ApiProperty()
  readonly street: string;

  @IsNotEmpty()
  @ApiProperty()
  readonly number: string;

  @IsOptional()
  @ApiProperty()
  readonly postal_code: string;

  @IsOptional()
  @ApiProperty()
  observation: string;
}
