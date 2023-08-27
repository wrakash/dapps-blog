import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { CurrentUser, JwtAuthGuard, RoleGuard, Roles, UserDocument } from '@app/common'; // Assuming these are custom guards
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';

@Controller('blogs')
export class BlogsController {
  constructor(private readonly blogsService: BlogsService) {}

  //create a new blog
  @Roles('Admin')
  @UseGuards(JwtAuthGuard, RoleGuard) // Require JWT authentication
  @Post()
  async create(@Body() createBlogDto: CreateBlogDto, @CurrentUser() user:UserDocument) {
    return this.blogsService.create(createBlogDto, user._id.toString());
  }

  // Retrieve all blog posts with optional keyword filtering\
  @Get()
  async findAll(@Query('keywords') keywords: string[]) {
    return this.blogsService.findAll(keywords);
  }


  // Retrieve a specific blog post by its ID
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.blogsService.findOne(id);
  }

  // Update a specific blog post by its ID
  @Roles('Admin')
  @UseGuards(JwtAuthGuard, RoleGuard) // Require JWT authentication
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateBlogDto: UpdateBlogDto) {
    return this.blogsService.update(id, updateBlogDto);
  }

  // Delete a specific blog post by its ID (only accessible to users with 'Admin' role)
  @Roles('Admin')
  @UseGuards(JwtAuthGuard, RoleGuard) // Require JWT authentication
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.blogsService.remove(id);
  }
}
