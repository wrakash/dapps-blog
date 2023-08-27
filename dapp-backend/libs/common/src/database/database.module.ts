import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ModelDefinition, MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    // Set up the MongoDB connection using Mongoose
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        uri: configService.get('MONGODB_URI'), // Retrieve MongoDB URI from configuration
      }),
      inject: [ConfigService], // Inject the ConfigService to access configurations
    }),
  ],
})
export class DatabaseModule {
  // This method allows registering Mongoose models for the module
  static forFeature(models: ModelDefinition[]) {
    return MongooseModule.forFeature(models);
  }
}
