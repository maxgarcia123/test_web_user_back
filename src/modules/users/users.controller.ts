import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Query,
  UseGuards,
  Put,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { JwtAuthGuard } from '../../config/auth/jwt-auth.guard';
import {
  CreateUserDto,
  LoginUserDto,
  ShowUserDto,
  UpdateUserDto,
} from './dto/users.dto';

@ApiTags('Users')
@Controller('user')
export class UsersController {
  constructor(private userService: UsersService) {}
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get()
  @HttpCode(200)
  @ApiOkResponse({ type: ShowUserDto })
  getUser(@Query('id') id: number) {
    return this.userService.getUser(id);
  }

  @Get('login/')
  @HttpCode(200)
  @ApiOkResponse({ type: LoginUserDto })
  login(@Query('user') user: string, @Query('password') password: string) {
    return this.userService.login(user, password);
  }

  @Post()
  @HttpCode(200)
  @ApiOkResponse({ type: ShowUserDto })
  @ApiModelProperty({ type: CreateUserDto })
  create(@Body() newUser: CreateUserDto) {
    return this.userService.createUser(newUser);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Put()
  @HttpCode(200)
  @ApiOkResponse({ type: UpdateUserDto })
  @ApiModelProperty({ type: UpdateUserDto })
  update(@Body() updateUser: UpdateUserDto) {
    return this.userService.updateUser(updateUser);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Delete(':id')
  @HttpCode(200)
  @ApiParam({
    name: 'id',
    type: Number,
  })
  delete(@Param('id') id) {
    return this.userService.delete(id);
  }
}
