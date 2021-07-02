import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';
import { UsersModel } from '../users.models';
import { UsersAddressesModel } from '../../users-addresses/users-addresses.models';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import {
  CreateUserAddressDto,
  ShowUserAddressDto,
} from '../../users-addresses/dto/user-address.dto';

export class LoginUserDto {
  @ApiProperty()
  readonly id: number;

  @IsNotEmpty()
  @ApiProperty()
  readonly name: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  readonly email: string;

  @ApiProperty()
  readonly cpf: string;

  @IsOptional()
  @ApiProperty()
  readonly pis: string;

  @ApiProperty()
  readonly token: string;

  constructor(userModel: UsersModel, token: string) {
    this.token = token;
    this.id = userModel.id;
    this.name = userModel.name;
    this.email = userModel.email;
    this.cpf = userModel.cpf;
    this.pis = userModel.pis;
  }
}
export class ShowUserDto {
  @IsNotEmpty()
  @ApiProperty()
  token: string;

  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  readonly email: string;

  @ApiProperty()
  readonly cpf: string;

  @IsOptional()
  @ApiProperty()
  readonly pis: string;

  @IsNotEmpty()
  @ApiProperty()
  password: string;

  @ApiModelProperty()
  readonly address: ShowUserAddressDto;

  constructor(
    userModel: UsersModel,
    token: string,
    address?: ShowUserAddressDto,
  ) {
    this.token = token;
    this.name = userModel.name;
    this.email = userModel.email;
    this.cpf = userModel.cpf;
    this.pis = userModel.pis;
    this.address = address ? address : userModel.address;
  }
}

export class CreateUserDto {
  @IsNotEmpty()
  @ApiProperty()
  readonly name: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  readonly email: string;

  @ApiProperty()
  readonly cpf: string;

  @IsOptional()
  @ApiProperty()
  readonly pis: string;

  @IsNotEmpty()
  @ApiProperty()
  password: string;

  @IsOptional()
  @ApiProperty()
  readonly address: CreateUserAddressDto;
}

export class UpdateUserDto {
  @IsNotEmpty()
  @ApiProperty()
  readonly id: number;

  @IsOptional()
  @ApiProperty()
  readonly name: string;

  @IsEmail()
  @IsOptional()
  @ApiProperty()
  readonly email: string;

  @IsOptional()
  @ApiProperty()
  readonly cpf: string;

  @IsOptional()
  @ApiProperty()
  readonly pis: string;

  @IsOptional()
  @ApiProperty()
  readonly password: string;

  @ApiModelProperty()
  readonly address: ShowUserAddressDto;
}
