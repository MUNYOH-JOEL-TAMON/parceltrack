import mongoose, { Document, Schema } from 'mongoose';

export type ShipmentStatus =
  | 'information_received'
  | 'pending_pickup'
  | 'picked_up'
  | 'in_transit'
  | 'customs_clearance'
  | 'out_for_delivery'
  | 'delivered'
  | 'delivery_attempted'
  | 'delayed'
  | 'exception'
  | 'returned_to_sender'
  | 'expired'
  | 'unknown';

export interface ITrackingEvent {
  description: string;
  location?: string;
  timestamp: Date;
  status: ShipmentStatus;
  courierStatus?: string;
}

export interface IShipment extends Document {
  trackingNumber: string;
  courier: mongoose.Types.ObjectId;
  status: ShipmentStatus;
  currentLocation?: string;
  origin?: string;
  destination?: string;
  estimatedDelivery?: Date;
  lastUpdated: Date;
  events: ITrackingEvent[];
  internalReference?: string;
  providerTrackingId?: string;
  createdAt: Date;
  updatedAt: Date;
}

const trackingEventSchema = new Schema<ITrackingEvent>(
  {
    description: {
      type: String,
      required: true,
    },
    location: String,
    timestamp: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    courierStatus: String,
  },
  { _id: true }
);

const shipmentSchema = new Schema<IShipment>(
  {
    trackingNumber: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    courier: {
      type: Schema.Types.ObjectId,
      ref: 'Courier',
      required: true,
    },
    status: {
      type: String,
      enum: [
        'information_received',
        'pending_pickup',
        'picked_up',
        'in_transit',
        'customs_clearance',
        'out_for_delivery',
        'delivered',
        'delivery_attempted',
        'delayed',
        'exception',
        'returned_to_sender',
        'expired',
        'unknown',
      ],
      default: 'information_received',
    },
    currentLocation: String,
    origin: String,
    destination: String,
    estimatedDelivery: Date,
    lastUpdated: {
      type: Date,
      default: Date.now,
    },
    events: [trackingEventSchema],
    internalReference: String,
    providerTrackingId: String,
  },
  {
    timestamps: true,
  }
);

// Compound index for tracking number and courier
shipmentSchema.index({ trackingNumber: 1, courier: 1 }, { unique: true });

export default mongoose.model<IShipment>('Shipment', shipmentSchema);
