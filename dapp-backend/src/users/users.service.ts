import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

import { GetUserDto } from './dto/get-user.dto';
import { UsersRepository } from './users.repository';
import { CreateUserDto, UserDocument } from '@app/common';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  // Create a new user
  async create(createUserDto: CreateUserDto) {
    await this.validateCreateUserDto(createUserDto);

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    // Create the user with hashed password
    const data: UserDocument = await this.usersRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });

    return {
      status: 'success',
      data: data,
    };
  }

  // Find all users
  async findAll() {
    try {
      let data: UserDocument[] = await this.usersRepository.find({});
      return {
        status: 'success',
        data: data,
      };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // Find a specific user by ID
  async findOne(_id: string) {
    try {
      let data: UserDocument = await this.usersRepository.findOne({ _id });
      return {
        status: 'success',
        data: data,
      };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // Update a specific user by ID
  async update(_id: string, updateReservationDto: Partial<CreateUserDto>) {
    try {
      let data: UserDocument = await this.usersRepository.findOneAndUpdate(
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

  // Remove a specific user by ID
  async remove(_id: string) {
    try {
      let data: UserDocument = await this.usersRepository.findOneAndDelete({
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

  // Get user details for a microservice using GetUserDto
  async getUser(getUserDto: GetUserDto) {
    return this.usersRepository.findOne(getUserDto);
  }

  // Check if the user already exists before creating
  private async validateCreateUserDto(createUserDto: CreateUserDto) {
    try {
      await this.usersRepository.findOne({ email: createUserDto.email });
    } catch (err) {
      return;
    }
    throw new UnprocessableEntityException('Email already exists.');
  }

  // Verify user during authentication using local strategy
  async verifyUser(email: string, password: string) {
    const user = await this.usersRepository.findOne({ email });
    const passwordIsValid = await bcrypt.compare(password, user.password);

    if (!passwordIsValid) {
      throw new UnauthorizedException('Credentials are not valid.');
    }

    return user;
  }
}
