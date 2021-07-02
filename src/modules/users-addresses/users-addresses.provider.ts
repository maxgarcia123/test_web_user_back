import { UsersAddressesModel } from './users-addresses.models';
import { USER_ADDRESS_REPOSITORY} from '../../utils/constants';

export const userAddressProviders = [
  {
    provide: USER_ADDRESS_REPOSITORY,
    useValue: UsersAddressesModel,
  },
];
