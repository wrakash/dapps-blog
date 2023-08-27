export class ReturnUserDto {
  // Unique identifier for the user
  readonly _id: object;

  // User's email address
  readonly email: string;

  // Date when the user was created
  readonly createdAt: Date;

  // Date when the user was last updated
  readonly updatedAt: Date;

  // Array of roles associated with the user
  readonly roles: string[];
}
