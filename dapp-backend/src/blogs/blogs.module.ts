import { Module } from '@nestjs/common';
import { BlogsController } from './blogs.controller';
import { BlogsService } from './blogs.service';
import { DatabaseModule, JwtConfigService, LoggerModule } from '@app/common';
import { BlogsRepository } from './blogs.repository';
import { BlogDocument, BlogSchema } from './models/blog.schema';


@Module({
  imports: [
    // Import necessary modules for the feature
    DatabaseModule.forFeature([
      { name: BlogDocument.name, schema: BlogSchema }, // Connect to the BlogSchema
    ]),
    LoggerModule, // Import a logging module if required
  ],
  controllers: [BlogsController], // Declare controllers within the module
  providers: [BlogsService, BlogsRepository], // Declare providers (services and repositories)
})
export class BlogsModule {}
