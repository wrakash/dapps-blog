import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class LocalStategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService) {
    super({ usernameField: 'email' }); // Specify the field used for username (email)
  }

  async validate(email: string, password: string) {
    try {
      const user = await this.usersService.verifyUser(email, password); // Verify user using email and password
      return user; // Return the user if validation succeeds
    } catch (err) {
      throw new UnauthorizedException(err); // Throw UnauthorizedException if validation fails
    }
  }
}
