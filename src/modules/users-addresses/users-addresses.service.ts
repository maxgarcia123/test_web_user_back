import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { USER_ADDRESS_REPOSITORY } from '../../utils/constants';
import { UsersAddressesModel } from './users-addresses.models';
import { ShowUserAddressDto } from './dto/user-address.dto';

@Injectable()
export class UsersAddressesService {
  private readonly jwtPrivateKey: string;

  constructor(
    @Inject(USER_ADDRESS_REPOSITORY)
    private usersAddressesRepository: typeof UsersAddressesModel,
  ) {
    this.jwtPrivateKey =
      '316D96A1D5436DD77E9184EE3E3789DC76585AAF479B3025385BB3D7E63176B7';
  }

  async getUserAddress(user_id: number) {
    return await this.usersAddressesRepository.findOne({
      where: { user_id, status: true },
    });
  }

  async createAddress(createAddress: any) {
    const address = await this.usersAddressesRepository.create(createAddress);

    if (!address) {
      return new BadRequestException();
    }
    return new ShowUserAddressDto(address);
  }

  async delete(user_id: number) {
    const user = await this.usersAddressesRepository.findOne({
      where: { user_id },
    });
    if (!user) {
      throw new NotFoundException();
    }
    user.status = false;
    try {
      await user.save();
      return user;
    } catch (err) {
      throw new BadRequestException(err);
    }
  }
}
