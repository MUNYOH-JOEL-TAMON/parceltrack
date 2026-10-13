import mongoose, { Document, Schema } from 'mongoose';

export interface ICourier extends Document {
  name: string;
  slug: string;
  logo?: string;
  isActive: boolean;
  integrationStatus: 'connected' | 'needs_config' | 'degraded' | 'unavailable';
  lastSync?: Date;
  shipmentCount: number;
  providerSlug?: string;
  createdAt: Date;
  updatedAt: Date;
}

const courierSchema = new Schema<ICourier>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    logo: String,
    isActive: {
      type: Boolean,
      default: true,
    },
    integrationStatus: {
      type: String,
      enum: ['connected', 'needs_config', 'degraded', 'unavailable'],
      default: 'connected',
    },
    lastSync: Date,
    shipmentCount: {
      type: Number,
      default: 0,
    },
    providerSlug: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<ICourier>('Courier', courierSchema);
