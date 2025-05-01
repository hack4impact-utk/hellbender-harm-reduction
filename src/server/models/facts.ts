import { model, Schema, Document, models, Model } from 'mongoose';
import { FactsEntity } from '@/types/facts';

const FactsSchema = new Schema(
  {
    fact: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
    tracking: true,
  }
);

export interface FactsDocument extends Omit<FactsEntity, '_id'>, Document {}

export default (models.Facts as Model<FactsDocument>) ||
  model<FactsDocument>('Facts', FactsSchema);
