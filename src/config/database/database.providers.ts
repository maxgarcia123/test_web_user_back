import { Sequelize } from 'sequelize-typescript';
import { UsersModel } from '../../modules/users/users.models';
import { UsersAddressesModel } from '../../modules/users-addresses/users-addresses.models';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        host: 'us-cdbr-east-04.cleardb.com',
        port: 3306,
        username: 'b5e4c8b95acbea',
        password: '203f28e3',
        database: 'heroku_a93f5d363796ed5',
        logging: false,
      });
      sequelize.addModels([UsersModel, UsersAddressesModel]);
      return sequelize;
    },
  },
];
