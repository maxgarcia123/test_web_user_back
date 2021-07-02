import {
  Body,
  Controller,
  Delete,
  HttpCode,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { UsersAddressesService } from './users-addresses.service';
import { JwtAuthGuard } from '../../config/auth/jwt-auth.guard';
import { CreateUserAddressDto } from './dto/user-address.dto';

@ApiTags('Users-addresses')
@Controller('users/address')
export class UsersAddressesController {
  constructor(private userAddressService: UsersAddressesService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOkResponse({ type: CreateUserAddressDto })
  createUserAddress(@Body() address: CreateUserAddressDto) {
    return this.userAddressService.createAddress(address);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Delete(':id')
  @HttpCode(200)
  @ApiParam({
    name: 'id',
    type: Number,
  })
  delete(@Param('user_id') user_id) {
    return this.userAddressService.delete(user_id);
  }
}
