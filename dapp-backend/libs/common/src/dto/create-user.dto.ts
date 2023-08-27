import {
  IsArray,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
} from 'class-validator';

// Enum for roles
export enum UserRole {
  Admin = 'Admin',
  User = 'User',
}

// Data Transfer Object (DTO) for creating a new user
export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsStrongPassword()
  password: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  @IsEnum(UserRole)
  roles?: UserRole[]; // Now using the UserRole enum
}
