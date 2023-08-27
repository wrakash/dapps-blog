import {
  IsString,
  IsDate,
  IsNumber,
  IsArray,
  ValidateNested,
  IsObject,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';

export class ParagraphDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}

export class FaqDto {
  @IsString()
  @IsNotEmpty()
  question: string;

  @IsString()
  @IsNotEmpty()
  answer: string;
}


// Data Transfer Object (DTO) for creating a blog
export class CreateBlogDto {
  @IsNotEmpty()
  @IsString()
  url: string;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsArray()
  @IsOptional()
  keywords: string[]; // Use a specific type for the array elements

  @IsOptional()
  @IsString()
  image: string;

  @IsObject()
  @IsNotEmpty()
  author: {
    name: string;
    designation: string;
    updatedAt: string;
    description: string;
    imageUrl: string;
    linkedinUrl: string;
    twitterUrl: string;
  };

  @IsArray()
  @IsOptional()
  faq?: FaqDto[] = [];

  @IsArray()
  @IsOptional()
  paragraphs?: ParagraphDto[] = [];
}
