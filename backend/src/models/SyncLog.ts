import mongoose, { Document, Schema } from 'mongoose';

export interface ISyncLog extends Document {
  shipmentId: mongoose.Types.ObjectId;
  trackingNumber: string;
  courier: string;
  operation: 'fetch' | 'webhook' | 'manual_refresh';
  status: 'success' | 'failure';
  timestamp: Date;
  error?: string;
  attempts: number;
  createdAt: Date;
}

const syncLogSchema = new Schema<ISyncLog>(
  {
    shipmentId: {
      type: Schema.Types.ObjectId,
      ref: 'Shipment',
      required: true,
    },
    trackingNumber: {
      type: String,
      required: true,
    },
    courier: {
      type: String,
      required: true,
    },
    operation: {
      type: String,
      enum: ['fetch', 'webhook', 'manual_refresh'],
      required: true,
    },
    status: {
      type: String,
      enum: ['success', 'failure'],
      required: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
    error: String,
    attempts: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,
  }
);

syncLogSchema.index({ shipmentId: 1, timestamp: -1 });

export default mongoose.model<ISyncLog>('SyncLog', syncLogSchema);
