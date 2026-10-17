import dotenv from 'dotenv';
import mongoose from 'mongoose';
import User from '../models/User.js';
import Courier from '../models/Courier.js';
import Shipment, { ShipmentStatus, ITrackingEvent } from '../models/Shipment.js';
import SyncLog from '../models/SyncLog.js';
import { hashPassword } from '../utils/password.js';

dotenv.config();

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Courier.deleteMany({});
    await Shipment.deleteMany({});
    await SyncLog.deleteMany({});
    console.log('🗑️  Cleared existing collections');

    // Create Admin User
    await User.create({
      email: 'admin@parceltrack.com',
      password: await hashPassword('Admin123!'),
      name: 'Joel Tamon (Admin)',
      role: 'admin',
    });

    // Create Operator User
    await User.create({
      email: 'operator@parceltrack.com',
      password: await hashPassword('Operator123!'),
      name: 'Sarah Connor (Dispatch)',
      role: 'operator',
    });
    console.log('👤 Created users (Admin & Operator)');

    // Create Couriers
    const now = new Date();
    const couriersData = [
      {
        name: 'DHL Express',
        slug: 'dhl',
        providerSlug: 'dhl',
        isActive: true,
        integrationStatus: 'connected' as const,
        lastSync: new Date(now.getTime() - 15 * 60 * 1000), // 15 mins ago
        shipmentCount: 0,
      },
      {
        name: 'FedEx',
        slug: 'fedex',
        providerSlug: 'fedex',
        isActive: true,
        integrationStatus: 'connected' as const,
        lastSync: new Date(now.getTime() - 6 * 60 * 1000), // 6 mins ago
        shipmentCount: 0,
      },
      {
        name: 'UPS',
        slug: 'ups',
        providerSlug: 'ups',
        isActive: true,
        integrationStatus: 'connected' as const,
        lastSync: new Date(now.getTime() - 25 * 60 * 1000), // 25 mins ago
        shipmentCount: 0,
      },
      {
        name: 'USPS',
        slug: 'usps',
        providerSlug: 'usps',
        isActive: true,
        integrationStatus: 'degraded' as const,
        lastSync: new Date(now.getTime() - 110 * 60 * 1000), // ~2 hours ago
        shipmentCount: 0,
      },
      {
        name: 'Aramex',
        slug: 'aramex',
        providerSlug: 'aramex',
        isActive: true,
        integrationStatus: 'connected' as const,
        lastSync: new Date(now.getTime() - 40 * 60 * 1000), // 40 mins ago
        shipmentCount: 0,
      },
    ];

    const couriers = await Courier.insertMany(couriersData);
    console.log('🚚 Created couriers');

    const dhl = couriers.find((c) => c.slug === 'dhl')!;
    const fedex = couriers.find((c) => c.slug === 'fedex')!;
    const ups = couriers.find((c) => c.slug === 'ups')!;
    const usps = couriers.find((c) => c.slug === 'usps')!;
    const aramex = couriers.find((c) => c.slug === 'aramex')!;

    const hoursAgo = (h: number) => new Date(now.getTime() - h * 60 * 60 * 1000);
    const daysAgo = (d: number) => new Date(now.getTime() - d * 24 * 60 * 60 * 1000);
    const inDays = (d: number) => new Date(now.getTime() + d * 24 * 60 * 60 * 1000);

    // Realistic Shipment Definitions
    const shipmentsData: Array<{
      trackingNumber: string;
      courier: mongoose.Types.ObjectId;
      status: ShipmentStatus;
      currentLocation: string;
      origin: string;
      destination: string;
      estimatedDelivery?: Date;
      internalReference: string;
      providerTrackingId: string;
      events: ITrackingEvent[];
    }> = [
      // 1. DHL - Delivered
      {
        trackingNumber: 'JD01460000854921',
        courier: dhl._id,
        status: 'delivered',
        currentLocation: 'New York, NY 10001, USA',
        origin: 'Berlin, Germany',
        destination: 'New York, NY, USA',
        estimatedDelivery: hoursAgo(4),
        internalReference: 'ORD-98214-DE',
        providerTrackingId: 'trk_dhl_001',
        events: [
          {
            description: 'Delivered - Signed by J. Reynolds (Front Desk)',
            location: 'New York, NY 10001, USA',
            timestamp: hoursAgo(4),
            status: 'delivered',
          },
          {
            description: 'Out for delivery on DHL courier van',
            location: 'New York, NY 10001, USA',
            timestamp: hoursAgo(8),
            status: 'out_for_delivery',
          },
          {
            description: 'Customs clearance status updated: Cleared import customs',
            location: 'JFK Airport, NY, USA',
            timestamp: hoursAgo(20),
            status: 'customs_clearance',
          },
          {
            description: 'Processed at Leipzig Central Hub',
            location: 'Leipzig, Germany',
            timestamp: daysAgo(2),
            status: 'in_transit',
          },
          {
            description: 'Shipment picked up from merchant warehouse',
            location: 'Berlin, Germany',
            timestamp: daysAgo(3),
            status: 'picked_up',
          },
        ],
      },

      // 2. FedEx - In Transit
      {
        trackingNumber: '781234567890',
        courier: fedex._id,
        status: 'in_transit',
        currentLocation: 'Memphis SuperHub, TN, USA',
        origin: 'San Francisco, CA, USA',
        destination: 'Boston, MA, USA',
        estimatedDelivery: inDays(1),
        internalReference: 'AMZ-55102-US',
        providerTrackingId: 'trk_fdx_002',
        events: [
          {
            description: 'Arrived at FedEx sorting facility',
            location: 'Memphis, TN, USA',
            timestamp: hoursAgo(3),
            status: 'in_transit',
          },
          {
            description: 'Departed FedEx origin facility',
            location: 'Oakland, CA, USA',
            timestamp: hoursAgo(18),
            status: 'in_transit',
          },
          {
            description: 'Picked up by FedEx Ground',
            location: 'San Francisco, CA, USA',
            timestamp: daysAgo(1),
            status: 'picked_up',
          },
        ],
      },

      // 3. UPS - Out For Delivery
      {
        trackingNumber: '1Z9999999999999999',
        courier: ups._id,
        status: 'out_for_delivery',
        currentLocation: 'Chicago, IL 60601, USA',
        origin: 'Atlanta, GA, USA',
        destination: 'Chicago, IL, USA',
        estimatedDelivery: inDays(0),
        internalReference: 'B2B-PO-88192',
        providerTrackingId: 'trk_ups_003',
        events: [
          {
            description: 'Out for Delivery - Loaded on local delivery vehicle',
            location: 'Chicago, IL 60601, USA',
            timestamp: hoursAgo(2),
            status: 'out_for_delivery',
          },
          {
            description: 'Processing at UPS Local Customer Center',
            location: 'Chicago, IL, USA',
            timestamp: hoursAgo(6),
            status: 'in_transit',
          },
          {
            description: 'Departed UPS Worldport Hub',
            location: 'Louisville, KY, USA',
            timestamp: hoursAgo(16),
            status: 'in_transit',
          },
          {
            description: 'Origin Scan',
            location: 'Atlanta, GA, USA',
            timestamp: daysAgo(1),
            status: 'picked_up',
          },
        ],
      },

      // 4. FedEx - Exception (Severe Weather)
      {
        trackingNumber: '794512398741',
        courier: fedex._id,
        status: 'exception',
        currentLocation: 'Denver Regional Hub, CO, USA',
        origin: 'Seattle, WA, USA',
        destination: 'Miami, FL, USA',
        estimatedDelivery: inDays(3),
        internalReference: 'SHOPIFY-77182',
        providerTrackingId: 'trk_fdx_004',
        events: [
          {
            description: 'Delivery exception: Severe winter weather delay - travel roads closed',
            location: 'Denver, CO, USA',
            timestamp: hoursAgo(5),
            status: 'exception',
          },
          {
            description: 'In transit to FedEx destination sort facility',
            location: 'Denver, CO, USA',
            timestamp: hoursAgo(22),
            status: 'in_transit',
          },
          {
            description: 'Departed Seattle facility',
            location: 'Seattle, WA, USA',
            timestamp: daysAgo(2),
            status: 'in_transit',
          },
        ],
      },

      // 5. USPS - Delayed (Customs Inspection)
      {
        trackingNumber: '9400100000000000000001',
        courier: usps._id,
        status: 'delayed',
        currentLocation: 'ISC Chicago IL (USPS), USA',
        origin: 'Toronto, Canada',
        destination: 'Austin, TX, USA',
        estimatedDelivery: inDays(4),
        internalReference: 'CAN-US-20491',
        providerTrackingId: 'trk_usps_005',
        events: [
          {
            description: 'Held in Customs - Inbound into customs inspection facility',
            location: 'Chicago, IL, USA',
            timestamp: hoursAgo(7),
            status: 'delayed',
          },
          {
            description: 'Processed through USPS facility',
            location: 'Chicago, IL, USA',
            timestamp: daysAgo(1),
            status: 'in_transit',
          },
          {
            description: 'Accepted by USPS International Carrier',
            location: 'Toronto, Canada',
            timestamp: daysAgo(3),
            status: 'picked_up',
          },
        ],
      },

      // 6. Aramex - Delivered
      {
        trackingNumber: '3182947192',
        courier: aramex._id,
        status: 'delivered',
        currentLocation: 'Dubai Marina, Dubai, UAE',
        origin: 'London, UK',
        destination: 'Dubai, UAE',
        estimatedDelivery: hoursAgo(6),
        internalReference: 'DXB-EXP-4401',
        providerTrackingId: 'trk_arx_006',
        events: [
          {
            description: 'Delivered - Received by security reception desk',
            location: 'Dubai Marina, Dubai, UAE',
            timestamp: hoursAgo(6),
            status: 'delivered',
          },
          {
            description: 'Out for delivery with Aramex courier',
            location: 'Dubai, UAE',
            timestamp: hoursAgo(10),
            status: 'out_for_delivery',
          },
          {
            description: 'Customs cleared at Dubai Cargo Gateway',
            location: 'DXB Cargo Hub, UAE',
            timestamp: hoursAgo(24),
            status: 'customs_clearance',
          },
          {
            description: 'Departed London Heathrow Airport',
            location: 'London, UK',
            timestamp: daysAgo(2),
            status: 'in_transit',
          },
        ],
      },

      // 7. DHL - Out For Delivery
      {
        trackingNumber: 'JD01460000982314',
        courier: dhl._id,
        status: 'out_for_delivery',
        currentLocation: 'Munich 80331, Germany',
        origin: 'Milan, Italy',
        destination: 'Munich, Germany',
        estimatedDelivery: inDays(0),
        internalReference: 'EUR-LOG-5521',
        providerTrackingId: 'trk_dhl_007',
        events: [
          {
            description: 'Shipment with courier for final delivery',
            location: 'Munich, Germany',
            timestamp: hoursAgo(1),
            status: 'out_for_delivery',
          },
          {
            description: 'Arrived at delivery facility in Munich',
            location: 'Munich, Germany',
            timestamp: hoursAgo(5),
            status: 'in_transit',
          },
          {
            description: 'Departed Milan international hub',
            location: 'Milan, Italy',
            timestamp: daysAgo(1),
            status: 'in_transit',
          },
        ],
      },

      // 8. UPS - Exception (Incorrect Address)
      {
        trackingNumber: '1Z8726350491827364',
        courier: ups._id,
        status: 'exception',
        currentLocation: 'Brooklyn, NY, USA',
        origin: 'Dallas, TX, USA',
        destination: 'Brooklyn, NY, USA',
        estimatedDelivery: inDays(2),
        internalReference: 'ECOMM-1192',
        providerTrackingId: 'trk_ups_008',
        events: [
          {
            description: 'Address exception: The apartment or suite number is missing/incorrect',
            location: 'Brooklyn, NY, USA',
            timestamp: hoursAgo(3),
            status: 'exception',
          },
          {
            description: 'Out for delivery on local UPS vehicle',
            location: 'Brooklyn, NY, USA',
            timestamp: hoursAgo(9),
            status: 'out_for_delivery',
          },
          {
            description: 'Arrived at UPS Meadowlands Facility',
            location: 'Secaucus, NJ, USA',
            timestamp: daysAgo(1),
            status: 'in_transit',
          },
        ],
      },

      // 9. FedEx - Delivered
      {
        trackingNumber: '882194012934',
        courier: fedex._id,
        status: 'delivered',
        currentLocation: 'Los Angeles, CA 90012, USA',
        origin: 'New York, NY, USA',
        destination: 'Los Angeles, CA, USA',
        estimatedDelivery: hoursAgo(12),
        internalReference: 'AMZ-LA-9021',
        providerTrackingId: 'trk_fdx_009',
        events: [
          {
            description: 'Delivered - Left at front door / porch',
            location: 'Los Angeles, CA 90012, USA',
            timestamp: hoursAgo(12),
            status: 'delivered',
          },
          {
            description: 'On FedEx vehicle for delivery',
            location: 'Los Angeles, CA, USA',
            timestamp: hoursAgo(16),
            status: 'out_for_delivery',
          },
          {
            description: 'Arrived at FedEx LAX sort facility',
            location: 'Los Angeles, CA, USA',
            timestamp: daysAgo(1),
            status: 'in_transit',
          },
          {
            description: 'Departed Newark Airport facility',
            location: 'Newark, NJ, USA',
            timestamp: daysAgo(2),
            status: 'in_transit',
          },
        ],
      },

      // 10. USPS - In Transit
      {
        trackingNumber: '9205500000000000000010',
        courier: usps._id,
        status: 'in_transit',
        currentLocation: 'Dallas TX Distribution Center, USA',
        origin: 'Phoenix, AZ, USA',
        destination: 'Atlanta, GA, USA',
        estimatedDelivery: inDays(2),
        internalReference: 'USPS-PRIORITY-882',
        providerTrackingId: 'trk_usps_010',
        events: [
          {
            description: 'Departed USPS Regional Facility',
            location: 'Dallas, TX, USA',
            timestamp: hoursAgo(4),
            status: 'in_transit',
          },
          {
            description: 'Arrived at USPS Regional Destination Facility',
            location: 'Dallas, TX, USA',
            timestamp: hoursAgo(14),
            status: 'in_transit',
          },
          {
            description: 'USPS in possession of item',
            location: 'Phoenix, AZ, USA',
            timestamp: daysAgo(1),
            status: 'picked_up',
          },
        ],
      },

      // 11. Aramex - In Transit
      {
        trackingNumber: '3981029384',
        courier: aramex._id,
        status: 'in_transit',
        currentLocation: 'Riyadh Sorting Facility, Saudi Arabia',
        origin: 'Cairo, Egypt',
        destination: 'Riyadh, Saudi Arabia',
        estimatedDelivery: inDays(1),
        internalReference: 'ARX-ME-3019',
        providerTrackingId: 'trk_arx_011',
        events: [
          {
            description: 'Shipment received at Aramex sorting hub',
            location: 'Riyadh, Saudi Arabia',
            timestamp: hoursAgo(5),
            status: 'in_transit',
          },
          {
            description: 'Cleared customs at King Khalid International Airport',
            location: 'Riyadh, Saudi Arabia',
            timestamp: hoursAgo(15),
            status: 'customs_clearance',
          },
          {
            description: 'Forwarded to Aramex overseas destination facility',
            location: 'Cairo, Egypt',
            timestamp: daysAgo(2),
            status: 'in_transit',
          },
        ],
      },

      // 12. DHL - Delivery Attempted
      {
        trackingNumber: 'JD01460000771299',
        courier: dhl._id,
        status: 'delivery_attempted',
        currentLocation: 'Paris 75008, France',
        origin: 'Amsterdam, Netherlands',
        destination: 'Paris, France',
        estimatedDelivery: inDays(1),
        internalReference: 'NL-FR-8891',
        providerTrackingId: 'trk_dhl_012',
        events: [
          {
            description: 'Delivery attempted: Recipient not home / Business closed for weekend',
            location: 'Paris, France',
            timestamp: hoursAgo(2),
            status: 'delivery_attempted',
          },
          {
            description: 'With delivery courier',
            location: 'Paris, France',
            timestamp: hoursAgo(7),
            status: 'out_for_delivery',
          },
          {
            description: 'Arrived at DHL Paris Hub',
            location: 'Paris, France',
            timestamp: daysAgo(1),
            status: 'in_transit',
          },
        ],
      },

      // 13. UPS - Delivered
      {
        trackingNumber: '1Z4829104829104829',
        courier: ups._id,
        status: 'delivered',
        currentLocation: 'Seattle, WA 98101, USA',
        origin: 'Salt Lake City, UT, USA',
        destination: 'Seattle, WA, USA',
        estimatedDelivery: hoursAgo(18),
        internalReference: 'TECH-SUPPLY-441',
        providerTrackingId: 'trk_ups_013',
        events: [
          {
            description: 'Delivered - Dock receiving signed by M. Vance',
            location: 'Seattle, WA 98101, USA',
            timestamp: hoursAgo(18),
            status: 'delivered',
          },
          {
            description: 'Loaded on delivery truck',
            location: 'Seattle, WA, USA',
            timestamp: hoursAgo(26),
            status: 'out_for_delivery',
          },
          {
            description: 'Departed UPS hub',
            location: 'Salt Lake City, UT, USA',
            timestamp: daysAgo(2),
            status: 'in_transit',
          },
        ],
      },

      // 14. FedEx - Out For Delivery
      {
        trackingNumber: '792019284712',
        courier: fedex._id,
        status: 'out_for_delivery',
        currentLocation: 'Miami, FL 33101, USA',
        origin: 'Charlotte, NC, USA',
        destination: 'Miami, FL, USA',
        estimatedDelivery: inDays(0),
        internalReference: 'MIA-RETAIL-009',
        providerTrackingId: 'trk_fdx_014',
        events: [
          {
            description: 'On FedEx delivery vehicle',
            location: 'Miami, FL 33101, USA',
            timestamp: hoursAgo(2),
            status: 'out_for_delivery',
          },
          {
            description: 'Arrived at FedEx Destination Facility',
            location: 'Miami, FL, USA',
            timestamp: hoursAgo(8),
            status: 'in_transit',
          },
          {
            description: 'Departed Atlanta sorting hub',
            location: 'Atlanta, GA, USA',
            timestamp: daysAgo(1),
            status: 'in_transit',
          },
        ],
      },

      // 15. USPS - Exception (Damaged Packaging)
      {
        trackingNumber: '9405500000000000000015',
        courier: usps._id,
        status: 'exception',
        currentLocation: 'Philadelphia PA Network Hub, USA',
        origin: 'Pittsburgh, PA, USA',
        destination: 'Washington, DC, USA',
        estimatedDelivery: inDays(3),
        internalReference: 'DOC-CRITICAL-11',
        providerTrackingId: 'trk_usps_015',
        events: [
          {
            description: 'Packaging damaged in transit - Item held for repacking and safety check',
            location: 'Philadelphia, PA, USA',
            timestamp: hoursAgo(6),
            status: 'exception',
          },
          {
            description: 'Processed through USPS Network Distribution Center',
            location: 'Philadelphia, PA, USA',
            timestamp: hoursAgo(18),
            status: 'in_transit',
          },
        ],
      },

      // 16. DHL - In Transit
      {
        trackingNumber: 'JD01460000662910',
        courier: dhl._id,
        status: 'in_transit',
        currentLocation: 'Tokyo Narita Gateway, Japan',
        origin: 'Frankfurt, Germany',
        destination: 'Tokyo, Japan',
        estimatedDelivery: inDays(2),
        internalReference: 'GLOBAL-AP-992',
        providerTrackingId: 'trk_dhl_016',
        events: [
          {
            description: 'Arrived at DHL inbound gateway facility',
            location: 'Tokyo Narita, Japan',
            timestamp: hoursAgo(3),
            status: 'in_transit',
          },
          {
            description: 'Departed Frankfurt Central Hub',
            location: 'Frankfurt, Germany',
            timestamp: daysAgo(1),
            status: 'in_transit',
          },
          {
            description: 'Shipment collected from shipper',
            location: 'Frankfurt, Germany',
            timestamp: daysAgo(2),
            status: 'picked_up',
          },
        ],
      },

      // 17. UPS - In Transit
      {
        trackingNumber: '1Z3391029482710293',
        courier: ups._id,
        status: 'in_transit',
        currentLocation: 'Louisville Worldport, KY, USA',
        origin: 'Houston, TX, USA',
        destination: 'Detroit, MI, USA',
        estimatedDelivery: inDays(1),
        internalReference: 'AUTO-PARTS-7721',
        providerTrackingId: 'trk_ups_017',
        events: [
          {
            description: 'Air operations sort scan',
            location: 'Louisville, KY, USA',
            timestamp: hoursAgo(5),
            status: 'in_transit',
          },
          {
            description: 'Departed Houston Airport',
            location: 'Houston, TX, USA',
            timestamp: hoursAgo(14),
            status: 'in_transit',
          },
        ],
      },

      // 18. Aramex - Delayed (Customs Documentation)
      {
        trackingNumber: '3819204819',
        courier: aramex._id,
        status: 'delayed',
        currentLocation: 'Amman Queen Alia Airport, Jordan',
        origin: 'Beirut, Lebanon',
        destination: 'Amman, Jordan',
        estimatedDelivery: inDays(2),
        internalReference: 'MED-EXP-1102',
        providerTrackingId: 'trk_arx_018',
        events: [
          {
            description: 'Clearance processing delayed - Additional importer tax identification required',
            location: 'Amman, Jordan',
            timestamp: hoursAgo(8),
            status: 'delayed',
          },
          {
            description: 'Customs inspection initiated',
            location: 'Amman, Jordan',
            timestamp: daysAgo(1),
            status: 'customs_clearance',
          },
        ],
      },

      // 19. FedEx - Delivered
      {
        trackingNumber: '790182746192',
        courier: fedex._id,
        status: 'delivered',
        currentLocation: 'San Jose, CA 95112, USA',
        origin: 'Portland, OR, USA',
        destination: 'San Jose, CA, USA',
        estimatedDelivery: hoursAgo(20),
        internalReference: 'SILICON-CHIP-08',
        providerTrackingId: 'trk_fdx_019',
        events: [
          {
            description: 'Delivered - Package handed directly to resident',
            location: 'San Jose, CA 95112, USA',
            timestamp: hoursAgo(20),
            status: 'delivered',
          },
          {
            description: 'Vehicle dispatch scan',
            location: 'San Jose, CA, USA',
            timestamp: hoursAgo(28),
            status: 'out_for_delivery',
          },
          {
            description: 'Departed FedEx sorting hub',
            location: 'Portland, OR, USA',
            timestamp: daysAgo(2),
            status: 'in_transit',
          },
        ],
      },

      // 20. USPS - Delivered
      {
        trackingNumber: '9400111222333444555666',
        courier: usps._id,
        status: 'delivered',
        currentLocation: 'Denver, CO 80202, USA',
        origin: 'Las Vegas, NV, USA',
        destination: 'Denver, CO, USA',
        estimatedDelivery: hoursAgo(22),
        internalReference: 'BOOK-STORE-891',
        providerTrackingId: 'trk_usps_020',
        events: [
          {
            description: 'Delivered, In/At Mailbox',
            location: 'Denver, CO 80202, USA',
            timestamp: hoursAgo(22),
            status: 'delivered',
          },
          {
            description: 'Out for Delivery',
            location: 'Denver, CO, USA',
            timestamp: hoursAgo(29),
            status: 'out_for_delivery',
          },
          {
            description: 'Arrived at USPS Post Office facility',
            location: 'Denver, CO, USA',
            timestamp: daysAgo(1),
            status: 'in_transit',
          },
        ],
      },

      // 21. DHL - Delivered
      {
        trackingNumber: 'JD01460000551029',
        courier: dhl._id,
        status: 'delivered',
        currentLocation: 'Zurich 8001, Switzerland',
        origin: 'Vienna, Austria',
        destination: 'Zurich, Switzerland',
        estimatedDelivery: hoursAgo(26),
        internalReference: 'CH-AT-4412',
        providerTrackingId: 'trk_dhl_021',
        events: [
          {
            description: 'Delivered - Signed by K. Weber',
            location: 'Zurich 8001, Switzerland',
            timestamp: hoursAgo(26),
            status: 'delivered',
          },
          {
            description: 'Out for delivery with DHL courier',
            location: 'Zurich, Switzerland',
            timestamp: hoursAgo(32),
            status: 'out_for_delivery',
          },
        ],
      },

      // 22. UPS - Picked Up
      {
        trackingNumber: '1Z1182947192847102',
        courier: ups._id,
        status: 'picked_up',
        currentLocation: 'Indianapolis, IN, USA',
        origin: 'Indianapolis, IN, USA',
        destination: 'Minneapolis, MN, USA',
        estimatedDelivery: inDays(3),
        internalReference: 'INDY-WH-001',
        providerTrackingId: 'trk_ups_022',
        events: [
          {
            description: 'Package picked up by UPS driver from shipper location',
            location: 'Indianapolis, IN, USA',
            timestamp: hoursAgo(2),
            status: 'picked_up',
          },
        ],
      },

      // 23. FedEx - In Transit
      {
        trackingNumber: '791102938475',
        courier: fedex._id,
        status: 'in_transit',
        currentLocation: 'Indianapolis Airport Facility, IN, USA',
        origin: 'Columbus, OH, USA',
        destination: 'Kansas City, MO, USA',
        estimatedDelivery: inDays(1),
        internalReference: 'MIDWEST-EXP-55',
        providerTrackingId: 'trk_fdx_023',
        events: [
          {
            description: 'Departed FedEx sorting facility',
            location: 'Indianapolis, IN, USA',
            timestamp: hoursAgo(4),
            status: 'in_transit',
          },
          {
            description: 'Picked up from merchant',
            location: 'Columbus, OH, USA',
            timestamp: hoursAgo(19),
            status: 'picked_up',
          },
        ],
      },

      // 24. Aramex - Out For Delivery
      {
        trackingNumber: '3719284710',
        courier: aramex._id,
        status: 'out_for_delivery',
        currentLocation: 'Doha West Bay, Qatar',
        origin: 'Abu Dhabi, UAE',
        destination: 'Doha, Qatar',
        estimatedDelivery: inDays(0),
        internalReference: 'QTR-VIP-101',
        providerTrackingId: 'trk_arx_024',
        events: [
          {
            description: 'Out for delivery on Aramex courier van',
            location: 'Doha West Bay, Qatar',
            timestamp: hoursAgo(1),
            status: 'out_for_delivery',
          },
          {
            description: 'Arrived at Doha Operations Facility',
            location: 'Doha, Qatar',
            timestamp: hoursAgo(6),
            status: 'in_transit',
          },
        ],
      },

      // 25. DHL - In Transit
      {
        trackingNumber: 'JD01460000441920',
        courier: dhl._id,
        status: 'in_transit',
        currentLocation: 'Hong Kong International Gateway, HK',
        origin: 'Shenzhen, China',
        destination: 'London, UK',
        estimatedDelivery: inDays(3),
        internalReference: 'ASIA-EU-8820',
        providerTrackingId: 'trk_dhl_025',
        events: [
          {
            description: 'Processed at DHL Hong Kong Hub',
            location: 'Hong Kong, HK',
            timestamp: hoursAgo(5),
            status: 'in_transit',
          },
          {
            description: 'Clearance processing complete',
            location: 'Hong Kong, HK',
            timestamp: hoursAgo(12),
            status: 'customs_clearance',
          },
          {
            description: 'Shipment picked up in Shenzhen',
            location: 'Shenzhen, China',
            timestamp: daysAgo(1),
            status: 'picked_up',
          },
        ],
      },
    ];

    const shipments = await Shipment.insertMany(shipmentsData);
    console.log(`📦 Created ${shipments.length} realistic shipments`);

    // Update Courier shipment counts
    for (const courier of couriers) {
      const count = await Shipment.countDocuments({ courier: courier._id });
      await Courier.findByIdAndUpdate(courier._id, { shipmentCount: count });
    }
    console.log('🔄 Updated courier shipment metrics');

    // Create Sync Logs (Success & Failure logs)
    const syncLogsData = [
      {
        shipmentId: shipments[0]._id,
        trackingNumber: shipments[0].trackingNumber,
        courier: 'dhl',
        operation: 'manual_refresh' as const,
        status: 'success' as const,
        timestamp: hoursAgo(1),
        attempts: 1,
      },
      {
        shipmentId: shipments[1]._id,
        trackingNumber: shipments[1].trackingNumber,
        courier: 'fedex',
        operation: 'fetch' as const,
        status: 'success' as const,
        timestamp: hoursAgo(2),
        attempts: 1,
      },
      {
        shipmentId: shipments[2]._id,
        trackingNumber: shipments[2].trackingNumber,
        courier: 'ups',
        operation: 'webhook' as const,
        status: 'success' as const,
        timestamp: hoursAgo(2),
        attempts: 1,
      },
      {
        shipmentId: shipments[3]._id,
        trackingNumber: shipments[3].trackingNumber,
        courier: 'fedex',
        operation: 'webhook' as const,
        status: 'success' as const,
        timestamp: hoursAgo(5),
        attempts: 1,
      },
      {
        shipmentId: shipments[4]._id,
        trackingNumber: shipments[4].trackingNumber,
        courier: 'usps',
        operation: 'fetch' as const,
        status: 'failure' as const,
        error: 'USPS Web Service 503: Service Temporarily Unavailable due to routine gateway maintenance',
        timestamp: hoursAgo(6),
        attempts: 3,
      },
      {
        shipmentId: shipments[5]._id,
        trackingNumber: shipments[5].trackingNumber,
        courier: 'aramex',
        operation: 'fetch' as const,
        status: 'success' as const,
        timestamp: hoursAgo(6),
        attempts: 1,
      },
      {
        shipmentId: shipments[6]._id,
        trackingNumber: shipments[6].trackingNumber,
        courier: 'dhl',
        operation: 'webhook' as const,
        status: 'success' as const,
        timestamp: hoursAgo(7),
        attempts: 1,
      },
      {
        shipmentId: shipments[7]._id,
        trackingNumber: shipments[7].trackingNumber,
        courier: 'ups',
        operation: 'fetch' as const,
        status: 'success' as const,
        timestamp: hoursAgo(8),
        attempts: 1,
      },
      {
        shipmentId: shipments[8]._id,
        trackingNumber: shipments[8].trackingNumber,
        courier: 'fedex',
        operation: 'manual_refresh' as const,
        status: 'success' as const,
        timestamp: hoursAgo(10),
        attempts: 1,
      },
      {
        shipmentId: shipments[9]._id,
        trackingNumber: shipments[9].trackingNumber,
        courier: 'usps',
        operation: 'fetch' as const,
        status: 'failure' as const,
        error: 'Carrier API rate limit reached (HTTP 429 Too Many Requests)',
        timestamp: hoursAgo(11),
        attempts: 2,
      },
      {
        shipmentId: shipments[10]._id,
        trackingNumber: shipments[10].trackingNumber,
        courier: 'aramex',
        operation: 'fetch' as const,
        status: 'success' as const,
        timestamp: hoursAgo(12),
        attempts: 1,
      },
      {
        shipmentId: shipments[11]._id,
        trackingNumber: shipments[11].trackingNumber,
        courier: 'dhl',
        operation: 'webhook' as const,
        status: 'success' as const,
        timestamp: hoursAgo(13),
        attempts: 1,
      },
      {
        shipmentId: shipments[12]._id,
        trackingNumber: shipments[12].trackingNumber,
        courier: 'ups',
        operation: 'fetch' as const,
        status: 'success' as const,
        timestamp: hoursAgo(14),
        attempts: 1,
      },
      {
        shipmentId: shipments[13]._id,
        trackingNumber: shipments[13].trackingNumber,
        courier: 'fedex',
        operation: 'webhook' as const,
        status: 'success' as const,
        timestamp: hoursAgo(16),
        attempts: 1,
      },
      {
        shipmentId: shipments[14]._id,
        trackingNumber: shipments[14].trackingNumber,
        courier: 'usps',
        operation: 'manual_refresh' as const,
        status: 'failure' as const,
        error: 'Timeout waiting for USPS tracking API endpoint response (15000ms exceeded)',
        timestamp: hoursAgo(17),
        attempts: 3,
      },
      {
        shipmentId: shipments[15]._id,
        trackingNumber: shipments[15].trackingNumber,
        courier: 'dhl',
        operation: 'fetch' as const,
        status: 'success' as const,
        timestamp: hoursAgo(18),
        attempts: 1,
      },
      {
        shipmentId: shipments[16]._id,
        trackingNumber: shipments[16].trackingNumber,
        courier: 'ups',
        operation: 'webhook' as const,
        status: 'success' as const,
        timestamp: hoursAgo(20),
        attempts: 1,
      },
      {
        shipmentId: shipments[17]._id,
        trackingNumber: shipments[17].trackingNumber,
        courier: 'aramex',
        operation: 'fetch' as const,
        status: 'failure' as const,
        error: 'Checkpoint schema verification warning: missing mandatory substatus code',
        timestamp: hoursAgo(22),
        attempts: 1,
      },
      {
        shipmentId: shipments[18]._id,
        trackingNumber: shipments[18].trackingNumber,
        courier: 'fedex',
        operation: 'fetch' as const,
        status: 'success' as const,
        timestamp: hoursAgo(24),
        attempts: 1,
      },
      {
        shipmentId: shipments[19]._id,
        trackingNumber: shipments[19].trackingNumber,
        courier: 'usps',
        operation: 'webhook' as const,
        status: 'success' as const,
        timestamp: hoursAgo(26),
        attempts: 1,
      },
      {
        shipmentId: shipments[20]._id,
        trackingNumber: shipments[20].trackingNumber,
        courier: 'dhl',
        operation: 'manual_refresh' as const,
        status: 'success' as const,
        timestamp: hoursAgo(28),
        attempts: 1,
      },
      {
        shipmentId: shipments[21]._id,
        trackingNumber: shipments[21].trackingNumber,
        courier: 'ups',
        operation: 'fetch' as const,
        status: 'success' as const,
        timestamp: hoursAgo(30),
        attempts: 1,
      },
      {
        shipmentId: shipments[22]._id,
        trackingNumber: shipments[22].trackingNumber,
        courier: 'fedex',
        operation: 'fetch' as const,
        status: 'success' as const,
        timestamp: hoursAgo(32),
        attempts: 1,
      },
      {
        shipmentId: shipments[23]._id,
        trackingNumber: shipments[23].trackingNumber,
        courier: 'aramex',
        operation: 'webhook' as const,
        status: 'success' as const,
        timestamp: hoursAgo(34),
        attempts: 1,
      },
      {
        shipmentId: shipments[24]._id,
        trackingNumber: shipments[24].trackingNumber,
        courier: 'dhl',
        operation: 'fetch' as const,
        status: 'success' as const,
        timestamp: hoursAgo(36),
        attempts: 1,
      },
    ];

    await SyncLog.insertMany(syncLogsData);
    console.log(`📋 Created ${syncLogsData.length} sync logs`);

    console.log('\n✨ Database successfully populated with rich dummy data!');
    console.log('----------------------------------------------------');
    console.log('👤 Admin Email: admin@parceltrack.com');
    console.log('🔑 Admin Password: Admin123!');
    console.log('👤 Operator Email: operator@parceltrack.com');
    console.log('🔑 Operator Password: Operator123!');
    console.log('----------------------------------------------------');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
