import { HttpException, HttpStatus } from '@nestjs/common';

// Custom exception class for duplicate key errors
export class DuplicateKeyException extends HttpException {
  constructor() {
    super('Already Exist !', HttpStatus.CONFLICT); // Passes the message and HTTP status code to the HttpException constructor
  }
}
