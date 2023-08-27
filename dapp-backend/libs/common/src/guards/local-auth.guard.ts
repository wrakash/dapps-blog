import { AuthGuard } from '@nestjs/passport';

// Custom authentication guard for local (username and password) authentication
export class LocalAuthGuard extends AuthGuard('local') {}
