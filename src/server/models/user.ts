import { model, Schema, Document, models, Model } from 'mongoose';
import {
  newEventNotifsEnum,
  referralSourceEnum,
  reminderNotifsEnum,
  UserEntity,
  userTypeEnum,
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
      required: false,
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
          phone: {
            type: String,
            required: true,
          },
          address: {
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
      required: false,
    },
    certifications: {
      type: [
        {
          certTitle: {
            type: String,
            required: true,
          },
          certImage: {
            type: String,
            required: false,
          },
          certDescription: {
            type: String,
            required: true,
          },
          dateRecieved: {
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

UserSchema.post('find', function (docs: UserEntity[]) {
  docs.forEach((doc) => {
    doc._id = doc._id.toString();
  });
});

export interface UserDocument extends Omit<UserEntity, '_id'>, Document {}
export default (models.User as Model<UserDocument>) ||
  model<UserDocument>('User', UserSchema);
