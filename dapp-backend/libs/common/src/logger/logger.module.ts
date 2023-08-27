import { Module } from '@nestjs/common';
import { LoggerModule as PinoLoggerModule } from 'nestjs-pino';

@Module({
  imports: [
    // Setting up the Pino logger module for the application
    PinoLoggerModule.forRoot({
      pinoHttp: {
        transport: {
          target: 'pino-pretty', // Using the pino-pretty transport for human-readable logs
          options: {
            singleLine: true, // Configuring single-line logs for better readability
          },
        },
      },
    }),
  ],
})
export class LoggerModule {}
