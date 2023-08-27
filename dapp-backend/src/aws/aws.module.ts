import { Module } from '@nestjs/common';
import { AwsController } from './aws.controller';
import { AwsService } from './aws.service';
import { JwtConfigService, LoggerModule } from '@app/common'; // Importing LoggerModule from the application's common module
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    LoggerModule
    
  ], // Importing LoggerModule into this module
  controllers: [AwsController], // Declaring AwsController as a controller for this module
  providers: [AwsService], // Declaring AwsService as a provider for this module
})
export class AwsModule {}
