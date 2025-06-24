import { model, Schema, Document, models, Model } from 'mongoose';
import { RequestsEntity, statusEnum } from '@/types/requests';

const RequestsSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    certification: {
      type: Boolean,
      requires: true,
    },
    status: {
      type: String,
      enum: statusEnum,
      required: true,
    },
    timesRequested: {
      type: Number,
      required: true,
    },
    requestingUser: {
      type: String,
      required: false,
    },
  },
  {
    versionKey: false,
    tracking: true,
  }
);

export interface RequestsDocument
  extends Omit<RequestsEntity, '_id'>,
    Document {}
export default (models.Requests as Model<RequestsDocument>) ||
  model<RequestsDocument>('Requests', RequestsSchema);
