import { AuthGuard } from '@nestjs/passport';

// Custom authentication guard for JWT-based authentication
export class JwtAuthGuard extends AuthGuard('jwt') {}
