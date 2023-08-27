import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtOptionsFactory, JwtModuleOptions } from '@nestjs/jwt';

@Injectable()
export class JwtConfigService implements JwtOptionsFactory {
  @Inject(ConfigService) private readonly configService: ConfigService;

  public createJwtOptions(): JwtModuleOptions {
    return {
      secret: this.configService.get<string>('JWT_SECRET'), // Get JWT_SECRET from configuration.
      signOptions: {
        expiresIn: `${this.configService.get('JWT_EXPIRATION')}s`, // Get JWT_EXPIRATION from configuration.
      },
    };
  }
}
