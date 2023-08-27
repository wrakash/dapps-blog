import { IsNotEmpty, IsString } from 'class-validator';

export class GetUserDto {
  @IsString() // Property must be a string
  @IsNotEmpty() // Property must not be empty
  _id: string; // The unique identifier of the user
}
