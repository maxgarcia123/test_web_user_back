import { UsersModel } from './users.models';
import { USER_ADDRESS_REPOSITORY, USER_REPOSITORY } from '../../utils/constants';
import { UsersAddressesModel } from '../users-addresses/users-addresses.models';

export const userProviders = [
  {
    provide: USER_REPOSITORY,
    useValue: UsersModel,
  },
  {
    provide: USER_ADDRESS_REPOSITORY,
    useValue: UsersAddressesModel,
  },
];
