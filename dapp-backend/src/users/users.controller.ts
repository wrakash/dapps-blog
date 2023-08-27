import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { CurrentUser, JwtAuthGuard, UserDocument } from '@app/common';
import { ReturnUserDto } from './dto/return-user.dto';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  //Retrieve user information
  @UseGuards(JwtAuthGuard) // Protect the route with JWT authentication guard
  @Get()
  async getUser(@CurrentUser() user: UserDocument): Promise<ReturnUserDto> {
    return {
      _id: user._id,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      roles: user.roles,
    };
  }

  
}
