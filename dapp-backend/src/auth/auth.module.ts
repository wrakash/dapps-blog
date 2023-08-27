import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { LocalStategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtConfigService, LoggerModule } from '@app/common';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    UsersModule, // Import the UsersModule, assuming it's defined correctly.
    LoggerModule, // Import the LoggerModule from '@app/common'.
    JwtModule.registerAsync({
      useClass: JwtConfigService,
    })
  ],
  controllers: [AuthController], // Define controllers for this module.
  providers: [AuthService, LocalStategy, JwtStrategy], // Define providers for this module.
})
export class AuthModule {}
