import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';
import {
  DatabaseModule,
  JwtConfigService,
  UserDocument,
  UserSchema,
} from '@app/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    // Import the DatabaseModule and associate it with the UserSchema
    DatabaseModule.forFeature([
      { name: UserDocument.name, schema: UserSchema },
    ])
  ],
  controllers: [UsersController], // Declare the controller within the module
  providers: [UsersService, UsersRepository], // Declare providers (services and repositories)
  exports: [UsersService], // Export the UsersService for use in other modules
})
export class UsersModule {}
