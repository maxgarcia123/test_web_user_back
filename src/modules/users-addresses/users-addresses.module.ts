import { HttpModule, Module } from '@nestjs/common';
import { UsersAddressesService } from './users-addresses.service';
import { UsersAddressesController } from './users-addresses.controller';
import { userAddressProviders } from './users-addresses.provider';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [PassportModule, HttpModule],
  providers: [UsersAddressesService, ...userAddressProviders ],
  controllers: [UsersAddressesController]
})
export class UsersAddressesModule {}
