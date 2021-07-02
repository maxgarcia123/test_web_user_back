import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { USER_REPOSITORY } from '../../utils/constants';
import { UsersModel } from './users.models';
import {
  CreateUserDto,
  LoginUserDto,
  ShowUserDto,
  UpdateUserDto,
} from './dto/users.dto';
import { compare, genSalt, hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { JwtPayload } from '../../config/auth/jwt-payload.model';
import { UsersAddressesService } from '../users-addresses/users-addresses.service';
import { checkCpf } from '../../utils/check-cpf';
import { checkPis } from '../../utils/check-pis';

@Injectable()
export class UsersService {
  private readonly jwtPrivateKey: string;

  constructor(
    @Inject(USER_REPOSITORY)
    private userRepository: typeof UsersModel,
    private usersAddressesService: UsersAddressesService,
  ) {
    this.jwtPrivateKey =
      '316D96A1D5436DD77E9184EE3E3789DC76585AAF479B3025385BB3D7E63176B7';
  }

  async signToken(email: string) {
    const payload: JwtPayload = {
      email: email,
    };
    return sign(payload, this.jwtPrivateKey);
  }

  async login(userLogin: string, password: string) {
    const userEmail = await this.checkIsEmail(userLogin);
    let user;
    if (userEmail) {
      user = await this.getUserByEmail(userLogin);
    } else if (checkCpf(userLogin)) {
      user = await this.getUserByCpf(userLogin);
    } else if (checkPis(userLogin)) {
      user = await this.getUserByPis(userLogin);
    }

    if (!user || user.status === false) {
      throw new NotFoundException();
    }
    const isMatch = await compare(password, user.password);
    if (!isMatch) {
      throw new BadRequestException();
    }
    const token = await this.signToken(user.email);

    return new LoginUserDto(user, token);
  }

  async checkIsEmail(email: string) {
    const check = /\S+@\S+\.\S+/;
    return check.test(email);
  }

  async getUserById(id: number) {
    return await this.userRepository.findOne({ where: { id, status: true } });
  }

  async getUserByEmail(email: string) {
    return await this.userRepository.findOne({
      where: { email, status: true },
    });
  }

  async getUserByCpf(cpf: string) {
    return await this.userRepository.findOne({ where: { cpf, status: true } });
  }

  async getUserByPis(pis: string) {
    return await this.userRepository.findOne({ where: { pis, status: true } });
  }

  async getUser(id: number) {
    const user = await this.userRepository.findOne({
      where: { id, status: true },
    });

    if (!user) {
      console.log('usuario n encontrado ');
      throw new NotFoundException();
    }
    const token = await this.signToken(user.email);

    user.address = await this.usersAddressesService.getUserAddress(user.id);

    return new ShowUserDto(user, token);
  }

  async createUser(createUser: CreateUserDto) {
    const emailExist = await this.getUserByEmail(createUser.email);

    if (emailExist?.email) {
      throw new BadRequestException({ error: 'email já cadastrado!!' });
    }
    const newUser = createUser;
    const salt = await genSalt(5);
    newUser.password = await hash(createUser.password, salt);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const newUserCreated = await this.userRepository.create(newUser);
    const token = await this.signToken(newUserCreated.email);

    if (newUser) {
      const createUserAddress = newUser.address;
      createUserAddress.user_id = newUserCreated.id;
      const address = await this.usersAddressesService.createAddress(
        createUserAddress,
      );
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return new ShowUserDto(newUserCreated, token, address);
    }

    return new ShowUserDto(newUserCreated, token);
  }

  async updateUser(updateUser: UpdateUserDto) {
    const user = await this.getUserById(updateUser.id);
    if (!user) {
      throw new NotFoundException();
    }
    const userAddress = await this.usersAddressesService.getUserAddress(
      user.id,
    );

    user.name = updateUser.name || user.name;
    user.email = updateUser.email || user.email;
    user.cpf = updateUser.cpf || user.cpf;
    user.pis = updateUser.pis || user.pis;

    if (updateUser.password.length > 0) {
      const salt = await genSalt(5);
      user.password = await hash(updateUser.password, salt);
    }

    if (!userAddress) {
      await this.usersAddressesService.createAddress(updateUser.address);

      try {
        await user.save();
        return await this.getUser(user.id);
      } catch (err) {
        console.log(err);
        throw new Error();
      }
    }
    userAddress.country = updateUser.address.country || userAddress.country;
    userAddress.state = updateUser.address.state || userAddress.state;
    userAddress.city = updateUser.address.city || userAddress.city;
    userAddress.postal_code =
      updateUser.address.postal_code || userAddress.postal_code;
    userAddress.street = updateUser.address.street || userAddress.street;
    userAddress.number = updateUser.address.number || userAddress.number;
    userAddress.observation =
      updateUser.address.observation || userAddress.observation;
    try {
      await user.save();
      await userAddress.save();
      return await this.getUser(user.id);
    } catch (err) {
      console.log('error updateUser', err);
      throw new Error(err);
    }
  }

  async delete(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });
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
