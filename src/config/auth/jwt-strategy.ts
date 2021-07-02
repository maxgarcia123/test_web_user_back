import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt, VerifiedCallback } from 'passport-jwt';
import { JwtPayload } from './jwt-payload.model';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { UsersService } from '../../modules/users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey:
        '316D96A1D5436DD77E9184EE3E3789DC76585AAF479B3025385BB3D7E63176B7',
    });
  }

  async validate(payload: JwtPayload, done: VerifiedCallback) {
    const user = this.userService.getUserByEmail(payload.email);
    if (!user) {
      return done(ForbiddenException, false);
    }
    return done(null, user, payload.iat);
  }
}
