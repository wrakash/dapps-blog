import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3Response } from './interfaces/s3response.interface';

import { Upload } from '@aws-sdk/lib-storage';
import { S3Client } from '@aws-sdk/client-s3';

@Injectable()
export class AwsService {
  constructor(private readonly configService: ConfigService) {}

  // Retrieve configuration values from the environment using the ConfigService
  private bucketName = this.configService.getOrThrow('S3_BUCKET_NAME');

  private s3 = new S3Client({
    region: this.configService.getOrThrow('AWS_S3_REGION'),
    credentials: {
      accessKeyId: this.configService.getOrThrow('AWS_ACCESS_KEY_ID'),
      secretAccessKey: this.configService.getOrThrow('AWS_ACCESS_KEY_SECRET'),
    },
    useAccelerateEndpoint: true,
  });

  // Upload a file to AWS S3
  async uploadFile(file): Promise<S3Response> {
    const { originalname } = file;

    const params = {
      Bucket: this.bucketName,
      Key: `${Date.now().toString()}_${file.originalname}`,
      Body: file.buffer,
    };

    try {
      // upload file to s3 parallelly in chunks
      // it supports min 5MB of file size
      const uploadParallel = new Upload({
        client: this.s3,
        queueSize: 4, // optional concurrency configuration
        partSize: 5542880, // optional size of each part
        leavePartsOnError: false, // optional manually handle dropped parts
        params,
      });

      // checking progress of upload
      uploadParallel.on('httpUploadProgress', (progress) => {
        console.log(progress);
      });

      // after completion of upload
      const data: any = await uploadParallel.done();
      return { status: 'success', data: data.Location };
    } catch (error) {
      return {
        status: 'upload failed',
        message: error.message,
      };
    }
  }
}
