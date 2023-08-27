import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { TokenPayload } from '../interfaces/token-payload.interface';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  static key = 'jwt';

  constructor(
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromAuthHeaderAsBearerToken(),
        (request) =>
        request?.cookies?.Authentication ||
        request?.headers?.authentication ||
        request?.headers?.authorization,
      ]),
      secretOrKey: configService.get<string>('JWT_SECRET'), // Ensure proper typing
    });
  }

  async validate(payload: TokenPayload) {
    const user = await this.usersService.getUser({ _id: payload.userId }); // Use payload.userId
    return user;
  }
}
