import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from 'nestjs-pino'; // Assuming you have configured pino logger
import * as cookieParser from 'cookie-parser';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  // Create the NestJS application instance using the AppModule
  const app = await NestFactory.create(AppModule);

  //enable cors for all port for development
  app.enableCors()

  // Apply a global validation pipe to enforce validation rules on incoming data
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  // Attach the logger instance to the application for logging purposes
  app.useLogger(app.get(Logger));

  // Enable parsing of cookies from incoming requests
  app.use(cookieParser());

  // Retrieve the ConfigService instance to access configuration variables
  const configService = app.get(ConfigService);

  // Start the application server and listen on the configured port
  await app.listen(configService.getOrThrow('PORT'));
}

bootstrap(); // Call the bootstrap function to start the application
