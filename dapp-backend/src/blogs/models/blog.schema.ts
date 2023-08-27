import { AbstractDocument } from '@app/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';


// Define the sub-document schema for paragraphs
@Schema({ _id: true, versionKey: false })
class Paragraph {
  @Prop({ required: false })
  title: string;

  @Prop({ required: false })
  description: string;
}

// Define the sub-document schema for paragraphs
@Schema({ _id: true, versionKey: false })
class Faq {
  @Prop({ required: false })
  question: string;

  @Prop({ required: false })
  answer: string;
}

// Define the Mongoose schema for the blog post
@Schema({ versionKey: false })
export class BlogDocument extends AbstractDocument {
  // URL of the blog post
  @Prop({ required: true })
  url: string;

  // URL of the blog post
  @Prop({ required: true })
  userId: string;

  // Title of the blog post
  @Prop({ required: true, unique: true })
  title: string;

  // Description of the blog post
  @Prop({ required: true })
  description: string;

  // Keywords associated with the blog post
  @Prop([{ type: String, required: false }])
  keywords: string[];

  // Image URL for the blog post
  @Prop({ required: false })
  image: string;

  // Author details for the blog post
  @Prop({
    required: true,
    _id: false,
    type: {
      name: String,
      designation: String,
      updatedAt: String,
      description: String,
      imageUrl: String,
      linkedinUrl: String,
      twitterUrl: String,
    },
  })
  author: {
    name: string;
    designation: string;
    updatedAt: string;
    description: string;
    imageUrl: string;
    linkedinUrl: string;
    twitterUrl?: string;
  };

  // Frequently Asked Questions for the blog post
  @Prop([{ type: Faq }])
  faq?: Faq[];

  // Paragraphs of content in the blog post
  @Prop([{ type: Paragraph }])
  paragraphs?: Paragraph[];

  // Indexing information for the blog post
  @Prop([{ type: String, required: false }])
  indexing: string[];

}

// Create the Mongoose schema from the BlogDocument class
export const BlogSchema = SchemaFactory.createForClass(BlogDocument);
