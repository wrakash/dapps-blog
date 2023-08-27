
import { AwsService } from './aws.service';
import {
  Controller,
  FileTypeValidator,
  Inject,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { S3Response } from './interfaces/s3response.interface'; // Assuming S3Response is correctly defined
import { JwtAuthGuard, RoleGuard, Roles } from '@app/common';

@Controller('aws')
export class AwsController {
  constructor(@Inject(AwsService) private readonly awsService: AwsService) {}

  @Roles('Admin')
  @UseGuards(JwtAuthGuard, RoleGuard) // Require JWT authentication
  @Post('upload')
  @UseInterceptors(FileInterceptor('file')) // Intercepts file upload from 'file' field
  async uploadFile(
    // Apply custom ParseFilePipe with validators to the uploaded file
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024 }), // 5MB maximum file size allowed
          new FileTypeValidator({ fileType: /(jpg|jpeg|png)$/ }), // Only allow JPG, JPEG, and PNG files
        ],
      }),
    )
    file: Express.Multer.File,
  ): Promise<S3Response> {
    // Delegate file upload to AwsService and return the S3Response
    return await this.awsService.uploadFile(file);
  }
}
