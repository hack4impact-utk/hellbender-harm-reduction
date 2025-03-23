import { model, Schema, Document, models, Model } from 'mongoose';
import {
  newEventNotifsEnum,
  referralSourceEnum,
  reminderNotifsEnum,
  UserEntity,
  userTypeEnum,
  pronounEnum,
  tagProfEnum,
  accommEnum,
} from '@/types/user';
import { eventTypeEnum } from '@/types/event';

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    userType: {
      type: String,
      required: true,
      enum: userTypeEnum,
    },
    emergencyContacts: {
      type: {
        name: {
          type: String,
          required: true,
        },
        phone: {
          type: String,
          required: true,
        },
        _id: false,
      },
      required: false,
    },
    pronouns: {
      type: String,
      required: true,
      enum: pronounEnum,
    },
    userTags: {
      type: [
        {
          tag: {
            type: Schema.Types.ObjectId,
            ref: 'Tag',
            required: true,
          },
          tagProf: {
            type: String,
            required: true,
            enum: tagProfEnum,
          },
          _id: false,
        },
      ],
      required: false,
    },
    events: {
      type: [
        {
          uevent: {
            type: Schema.Types.ObjectId,
            ref: 'Event',
            required: true,
          },
          appDate: {
            type: Date,
            required: true,
          },
          _id: false,
        },
      ],
      required: false,
    },
    phone: {
      type: String,
      required: true,
    },
    eventPreferences: {
      type: [String],
      enum: eventTypeEnum,
      required: true,
    },
    reminders: {
      type: [String],
      enum: reminderNotifsEnum,
      required: false,
    },
    custReminders: {
      type: [
        {
          daysPrior: {
            type: Number,
            required: true,
          },
          time: {
            type: String,
            required: true,
          },
          _id: false,
        },
      ],
      required: false,
    },
    newEvents: {
      type: String,
      required: true,
      enum: newEventNotifsEnum,
    },
    referrals: {
      type: [String],
      required: true,
      enum: referralSourceEnum,
    },
    accomm: {
      type: [String],
      required: false,
      enum: accommEnum,
    },
    otherAccomm: {
      type: String,
      required: false,
    },
  },
  {
    versionKey: false,
    tracking: true,
  }
);

export interface UserDocument extends Omit<UserEntity, '_id'>, Document {}
export default (models.User as Model<UserDocument>) ||
  model<UserDocument>('User', UserSchema);
