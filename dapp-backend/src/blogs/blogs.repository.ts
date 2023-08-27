import { Injectable, Logger } from '@nestjs/common';
import { AbstractRepository } from '@app/common'; // Assuming this provides a base repository
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BlogDocument } from './models/blog.schema';

@Injectable()
export class BlogsRepository extends AbstractRepository<BlogDocument> {
  protected readonly logger = new Logger(BlogsRepository.name);

  constructor(
    @InjectModel(BlogDocument.name)
    private readonly blogModel: Model<BlogDocument>, // Inject the Mongoose model
  ) {
    super(blogModel); // Call the constructor of the parent class with the model
  }

  
}
