import { DatabaseModule, LoggerModule } from '@app/common';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { BlogsModule } from './blogs/blogs.module';
import { AwsModule } from './aws/aws.module';
import { UsersModule } from './users/users.module';
import * as Joi from 'joi';

@Module({
  imports: [
    // Import database and logger modules from common library
    DatabaseModule,
    LoggerModule,

    // Configure global application settings using ConfigModule
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        MONGODB_URI: Joi.string().required(),
        PORT: Joi.number().required(),
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRATION: Joi.string().required(),
        // Define additional environment variables here if needed
      }),
    }),

    // Import and configure other feature modules
    AuthModule,
    BlogsModule,
    AwsModule,
    UsersModule,
  ],
  controllers: [], // Controllers will be added to this array
  providers: [],   // Providers (services) will be added to this array
})
export class AppModule {}
