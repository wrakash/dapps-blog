import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { BlogsRepository } from './blogs.repository';
import { DuplicateKeyException } from '@app/common'; // Assuming this handles duplicate key error
import { CreateBlogDto } from './dto/create-blog.dto';
import { BlogDocument } from './models/blog.schema';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class BlogsService {
  constructor(
    @Inject(BlogsRepository) private readonly blogRepository: BlogsRepository,
  ) {}

  // Create a new blog post
  async create(createBlogDto: CreateBlogDto, userId: string) {
    try {
      const indexing = await this.indexCreation(createBlogDto?.paragraphs);

      // Create a new blog post document with indexing
      const data: BlogDocument = await this.blogRepository.create({
        ...createBlogDto,
        userId,
        indexing,
      });

      return {
        status: 'success',
        data: data,
      };
    } catch (error) {
      if (error.code === 11000) {
        // MongoDB's duplicate key error code (assuming handled by DuplicateKeyException)
        throw new DuplicateKeyException();
      }
      throw new InternalServerErrorException(error.message);
    }
  }

  // Find all blog posts with optional keyword filtering
  async findAll(keywords = []) {
    try {
      if (typeof keywords === 'string') {
        keywords = [keywords]; // Convert a single keyword string to an array
      } else if (!Array.isArray(keywords)) {
        throw new Error('Keywords should be an array or a string');
      }
  
      let query = {};
  
      if (keywords.length > 0) {
        const keywordRegexes = keywords.map(keyword => new RegExp(keyword, 'i'));
  
        query = {
          keywords: {
            $all: keywordRegexes,
          },
        };
      }
  
      // Find and return all matching blog posts
      const data: BlogDocument[] = await this.blogRepository.find(query);
      return {
        status: 'success',
        data: data,
      };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
  

  // Find a specific blog post by its ID
  async findOne(_id: string) {
    try {
      // Find and return a specific blog post by ID
      let data: BlogDocument = await this.blogRepository.findOne({ _id });

      return {
        status: 'success',
        data: data,
      };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // Update a specific blog post by its ID
  async update(_id: string, updateReservationDto: UpdateBlogDto) {
    try {
      // Update a specific blog post by ID and return the updated data
      let data: BlogDocument = await this.blogRepository.findOneAndUpdate(
        { _id },
        { $set: updateReservationDto },
      );

      return {
        status: 'success',
        data: data,
      };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // Remove a specific blog post by its ID
  async remove(_id: string) {
    try {
      // Remove a specific blog post by ID and return the removed data
      let data: BlogDocument = await this.blogRepository.findOneAndDelete({
        _id,
      });
      return {
        status: 'success',
        data: data,
      };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // Create indexing from paragraphs
  private async indexCreation(paragraphs) {
    const indices = paragraphs.map((paragraph) => paragraph.title);
    return indices;
  }
}
