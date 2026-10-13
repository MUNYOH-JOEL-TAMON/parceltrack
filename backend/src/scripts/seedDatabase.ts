import dotenv from 'dotenv';
import mongoose from 'mongoose';
import User from '../models/User.js';
import Courier from '../models/Courier.js';
import { hashPassword } from '../utils/password.js';

dotenv.config();

const seedDatabase = async () => {
  try {
    // Connect to database
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Courier.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // Create admin user
    const adminUser = await User.create({
      email: 'admin@parceltrack.com',
      password: await hashPassword('Admin123!'),
      name: 'Admin User',
      role: 'admin',
    });
    console.log('👤 Created admin user');

    // Create couriers
    const couriers = [
      {
        name: 'DHL',
        slug: 'dhl',
        providerSlug: 'dhl',
        isActive: true,
        integrationStatus: 'connected',
      },
      {
        name: 'FedEx',
        slug: 'fedex',
        providerSlug: 'fedex',
        isActive: true,
        integrationStatus: 'connected',
      },
      {
        name: 'UPS',
        slug: 'ups',
        providerSlug: 'ups',
        isActive: true,
        integrationStatus: 'connected',
      },
      {
        name: 'USPS',
        slug: 'usps',
        providerSlug: 'usps',
        isActive: true,
        integrationStatus: 'connected',
      },
      {
        name: 'Aramex',
        slug: 'aramex',
        providerSlug: 'aramex',
        isActive: true,
        integrationStatus: 'connected',
      },
    ];

    await Courier.insertMany(couriers);
    console.log('🚚 Created couriers');

    console.log('\n✨ Database seeded successfully!');
    console.log('\n📧 Admin credentials:');
    console.log('   Email: admin@parceltrack.com');
    console.log('   Password: Admin123!');
    console.log('\n⚠️  Please change the admin password after first login!\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
