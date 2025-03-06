import { model, Schema, Document, models, Model } from 'mongoose';
import { CertEntity, certTypeEnum } from '@/types/certification';

const CertSchema = new Schema(
  {
    certName: {
      type: String,
      required: true,
    },
    certPicture: {
      type: String,
      required: false,
    },
    certDescription: {
      type: String,
      required: true,
    },
    certType: {
      type: String,
      required: true,
      enum: certTypeEnum,
    },
  },
  {
    versionKey: false,
    tracking: true,
  }
);

export interface CertDocument extends Omit<CertEntity, '_id'>, Document {}

export default (models.Cert as Model<CertDocument>) ||
  model<CertDocument>('Cert', CertSchema);
