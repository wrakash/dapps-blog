import { BadRequestException, Logger, NotFoundException } from '@nestjs/common';
import mongoose, { FilterQuery, Model, Types, UpdateQuery } from 'mongoose';
import { AbstractDocument } from './abstract.schema';
import { CreateIndexesOptions } from 'mongodb';

export abstract class AbstractRepository<TDocument extends AbstractDocument> {
  protected abstract readonly logger: Logger;

  constructor(protected readonly model: Model<TDocument>) {}

  // Creates a new document
  async create(document: Omit<TDocument, '_id'>): Promise<TDocument> {
    const createdDocument = new this.model({
      ...document,
      _id: new Types.ObjectId(),
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return (await createdDocument.save()).toJSON() as unknown as TDocument;
  }

  // Finds a single document based on the filter query
  async findOne(filterQuery: FilterQuery<TDocument>): Promise<TDocument> {
    // Validate the filter query, assuming you expect an _id field
    if (filterQuery._id && !mongoose.Types.ObjectId.isValid(filterQuery._id)) {
      throw new BadRequestException('Invalid _id format.');
    }

    // find the document with the help of id.
    const document = await this.model.findOne(filterQuery, { lean: false });

    if (!document) {
      this.logger.warn('Document not found with filterQuery', filterQuery);
      throw new NotFoundException('Document not found.');
    }

    return document;
  }

  // Finds a single document, updates it, and returns the updated document
  async findOneAndUpdate(
    filterQuery: FilterQuery<TDocument>,
    update: UpdateQuery<TDocument>,
  ) {
    // Validate the filter query, assuming you expect an _id field
    if (filterQuery._id && !mongoose.Types.ObjectId.isValid(filterQuery._id)) {
      throw new BadRequestException('Invalid _id format.');
    }

    //update the time of the document
    update['$set'] = update['$set'] || {};
    update['$set'].updatedAt = new Date();

    //find and update finally
    const document = await this.model.findOneAndUpdate(filterQuery, update, {
      lean: true,
      new: true,
    });

    if (!document) {
      this.logger.warn('Document not found with filterQuery', filterQuery);
      throw new NotFoundException('Document not found.');
    }

    return document;
  }

  // Finds multiple documents based on the filter query
  async find(filterQuery: FilterQuery<TDocument>) {
    return this.model.find(filterQuery, {}, { lean: true });
  }

  // Finds a single document based on the filter query and deletes it
  async findOneAndDelete(filterQuery: FilterQuery<TDocument>) {
    return this.model.findOneAndDelete(filterQuery, { lean: true });
  }

  // Creates an index on the collection
  async createIndex(options: CreateIndexesOptions) {
    return this.model.createIndexes(options as any);
  }
}
