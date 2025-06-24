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
    requestingUser: {
      type: [
        {
          userId: {
            type: String,
            required: true,
          },
          status: {
            type: String,
            enum: statusEnum,
            required: true,
          },
          _id: false,
        },
      ],
      required: true,
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
