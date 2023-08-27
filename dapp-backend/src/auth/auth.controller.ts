import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Response, Request } from 'express';
import { AuthService } from './auth.service';
import {
  CreateUserDto,
  CurrentUser,
  JwtAuthGuard,
  LocalAuthGuard,
  UserDocument,
} from '@app/common';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Endpoint for user registration (signup)
  @Post('signup')
  async signup(
    @Body() createUserDto: CreateUserDto,
    @Res() response: Response,
  ) {
    const jwt = await this.authService.signup(createUserDto, response);
    response.send(jwt); // Respond with the generated JWT token
  }

  // Endpoint for user login (signin)
  @UseGuards(LocalAuthGuard) // Use the local authentication guard for this route
  @Post('signin')
  async signin(
    @CurrentUser() user: UserDocument,
    @Res({ passthrough: true }) response: Response,
  ) {
    const jwt = await this.authService.signin(user, response);
    response.send(jwt); // Respond with the generated JWT token
  }

  // Endpoint for user logout (signout)
  @UseGuards(JwtAuthGuard) // Use the JWT authentication guard for this route
  @Post('signout')
  async signout(@Req() request: Request, @Res() response: Response) {
    await this.authService.signout(request, response); // Perform user signout
    return response.status(200).send({ message: 'Logged out successfully' }); // Respond with a success message
  }
}
