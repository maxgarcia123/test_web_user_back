import { HttpModule, Module } from '@nestjs/common';
import { JwtStrategy } from '../../config/auth/jwt-strategy';
import { userProviders } from './users.provider';
import { PassportModule } from '@nestjs/passport';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersAddressesService } from '../users-addresses/users-addresses.service';

@Module({
  imports: [PassportModule, HttpModule],
  providers: [UsersService, ...userProviders, JwtStrategy, UsersAddressesService],
  controllers: [UsersController],
})
export class UsersModule {}
