import { model, Schema, Document, models, Model } from 'mongoose';
import { EventEntity, eventTypeEnum } from '@/types/event';

const EventSchema = new Schema(
  {
    eventName: {
      type: String,
      required: true,
    },
    eventStart: {
      type: Date,
      required: true,
    },
    eventEnd: {
      type: Date,
      required: true,
    },
    eventDescription: {
      type: String,
      required: true,
    },
    eventType: {
      type: String,
      required: true,
      enum: eventTypeEnum,
    },
    eventRequirements: {
      type: [Schema.Types.ObjectId],
      ref: 'Cert',
      required: false,
    },
  },
  {
    versionKey: false,
    tracking: true,
  }
);

export interface EventDocument extends Omit<EventEntity, '_id'>, Document {}

export default (models.Event as Model<EventDocument>) ||
  model<EventDocument>('Event', EventSchema);
