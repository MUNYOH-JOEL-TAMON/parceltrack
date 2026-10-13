// Shipment Status Types
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

// Tracking Event
export interface TrackingEvent {
  _id: string;
  description: string;
  location?: string;
  timestamp: string;
  status: ShipmentStatus;
  courierStatus?: string;
}

// Shipment
export interface Shipment {
  _id: string;
  trackingNumber: string;
  courier: Courier;
  status: ShipmentStatus;
  currentLocation?: string;
  origin?: string;
  destination?: string;
  estimatedDelivery?: string;
  lastUpdated: string;
  events: TrackingEvent[];
  internalReference?: string;
  createdAt: string;
  updatedAt: string;
}

// Courier
export interface Courier {
  _id: string;
  name: string;
  slug: string;
  logo?: string;
  isActive: boolean;
  integrationStatus: 'connected' | 'needs_config' | 'degraded' | 'unavailable';
  lastSync?: string;
  shipmentCount?: number;
}

// User
export interface User {
  _id: string;
  email: string;
  name: string;
  role: 'admin' | 'operator';
  createdAt: string;
}

// Auth Context
export interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// Sync Log
export interface SyncLog {
  _id: string;
  shipmentId: string;
  trackingNumber: string;
  courier: string;
  operation: 'fetch' | 'webhook' | 'manual_refresh';
  status: 'success' | 'failure';
  timestamp: string;
  error?: string;
  attempts: number;
}

// Dashboard Stats
export interface DashboardStats {
  totalShipments: number;
  inTransit: number;
  outForDelivery: number;
  delivered: number;
  exceptions: number;
  statusBreakdown: {
    status: ShipmentStatus;
    count: number;
  }[];
}

// API Response
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// Tracking Query
export interface TrackingQuery {
  trackingNumber: string;
  courier?: string;
}
