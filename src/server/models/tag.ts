import { model, Schema, Document, models, Model } from 'mongoose';
import { TagEntity } from '@/types/tag';

const TagSchema = new Schema(
  {
    tagName: {
      type: String,
      required: true,
    },
    tagDescription: {
      type: String,
      required: true,
    },
    certification: {
      type: Boolean,
      required: true,
    },
  },
  {
    versionKey: false,
    tracking: true,
  }
);

export interface TagDocument extends Omit<TagEntity, '_id'>, Document {}

export default (models.Tag as Model<TagDocument>) ||
  model<TagDocument>('Tag', TagSchema);
