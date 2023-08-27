import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserDocument } from '../models/user.schema';

// This function extracts the current user from the given ExecutionContext
const getCurrentUserByContext = (context: ExecutionContext): UserDocument => {
  if (context.getType() === 'http') {
    // If the context is HTTP-based, return the user directly from the request object

  return context.switchToHttp().getRequest().user;
  }

  // Return null if user information is not found in the context
  return null;
};

// Custom decorator to retrieve the current user using the getCurrentUserByContext function
export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext) =>
    getCurrentUserByContext(context),
);
