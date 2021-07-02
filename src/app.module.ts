import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './modules/users/users.module';
import { DatabaseModule } from './config/database/database.module';
import { UsersAddressesModule } from './modules/users-addresses/users-addresses.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UsersModule,
    DatabaseModule,
    UsersAddressesModule,
  ],
})
export class AppModule {}
