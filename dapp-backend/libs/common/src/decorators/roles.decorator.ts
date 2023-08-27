import { SetMetadata } from '@nestjs/common';

// Custom decorator to assign roles to routes or handlers
export const Roles = (...roles: string[]) => SetMetadata('roles', roles);
