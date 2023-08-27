import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from '../database'; // Assuming there's an AbstractDocument class defined

@Schema({ versionKey: false }) // Define schema options
export class UserDocument extends AbstractDocument {
  @Prop() // Define a property (field) in the schema
  email: string;

  @Prop()
  password: string;

  @Prop()
  roles?: string[];
}

// Create a Mongoose schema for the UserDocument class
export const UserSchema = SchemaFactory.createForClass(UserDocument);
