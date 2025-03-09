import { model, Schema, Document, models, Model } from 'mongoose';
import {
  newEventNotifsEnum,
  referralSourceEnum,
  reminderNotifsEnum,
  UserEntity,
  userTypeEnum,
  pronounEnum,
  certProgressEnum,
  certProfEnum,
} from '@/types/user';
import { eventTypeEnum } from '@/types/event';
import { certTypeEnum } from '@/types/certification';

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
      type: [
        {
          name: {
            type: String,
            required: true,
          },
          mobile_phone: {
            type: String,
            required: true,
          },
          work_phone: {
            type: String,
            required: false,
          },
          home_phone: {
            type: String,
            required: false,
          },
          email: {
            type: String,
            required: false,
          },
          address: {
            type: String,
            required: false,
          },
          relation: {
            type: String,
            required: false,
          },
          _id: false,
        },
      ],
      required: false,
    },
    pronouns: {
      type: String,
      required: true,
      enum: pronounEnum,
    },
    certifications: {
      type: [
        {
          certification: {
            type: Schema.Types.ObjectId,
            ref: 'Cert',
            required: true,
          },
          certType: {
            type: String,
            required: true,
            enum: certTypeEnum,
          },
          certProgress: {
            type: String,
            required: true,
            enum: certProgressEnum,
          },
          certProf: {
            type: String,
            required: true,
            enum: certProfEnum,
          },
          dateReceived: {
            type: Date,
            required: true,
          },
          dateExpiration: {
            type: Date,
            required: false,
          },
          _id: false,
        },
      ],
      required: false,
    },
    events: {
      type: [Schema.Types.ObjectId],
      ref: 'Event',
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
  },
  {
    versionKey: false,
    tracking: true,
  }
);

export interface UserDocument extends Omit<UserEntity, '_id'>, Document {}
export default (models.User as Model<UserDocument>) ||
  model<UserDocument>('User', UserSchema);
