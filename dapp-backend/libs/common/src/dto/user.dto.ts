// Represents user data structure used for data transfer
export interface UserDto {
  _id: string; // User's unique identifier
  email: string; // User's email address
  password: string; // User's password (Note: Storing passwords directly in plain text is not secure)
  roles?: string[]; // Optional: User's roles or permissions
}
