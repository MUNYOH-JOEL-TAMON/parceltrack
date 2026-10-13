import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { TrackingSearch } from '@/components/TrackingSearch';
import { Package, Search, CheckCircle2, Truck, MapPin, Shield } from 'lucide-react';

export const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-background-light to-white py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary-navy mb-6 text-balance">
              Every Shipment. One Tracking Experience.
            </h1>
            <p className="text-lg sm:text-xl text-text-secondary max-w-3xl mx-auto mb-8">
              Track your packages across multiple courier services in one place. 
              Get clear delivery updates and follow every step of your shipment's journey.
            </p>
          </div>

          {/* Tracking Search */}
          <div className="flex justify-center mb-12">
            <TrackingSearch size="large" />
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-blue/10 rounded-full mb-3">
                <Truck className="h-6 w-6 text-primary-blue" />
              </div>
              <p className="text-sm font-medium text-text-primary">Multiple Couriers</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-blue/10 rounded-full mb-3">
                <MapPin className="h-6 w-6 text-primary-blue" />
              </div>
              <p className="text-sm font-medium text-text-primary">Real-time Updates</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-blue/10 rounded-full mb-3">
                <Search className="h-6 w-6 text-primary-blue" />
              </div>
              <p className="text-sm font-medium text-text-primary">Centralized Tracking</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-blue/10 rounded-full mb-3">
                <Shield className="h-6 w-6 text-primary-blue" />
              </div>
              <p className="text-sm font-medium text-text-primary">No Account Required</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-primary-navy mb-4">
              How It Works
            </h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              Track your packages in three simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {/* Step 1 */}
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-navy text-white rounded-full text-2xl font-bold mb-6">
                1
              </div>
              <div className="mb-4">
                <Package className="h-12 w-12 text-primary-blue mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-text-primary mb-3">
                Enter Tracking Number
              </h3>
              <p className="text-text-secondary">
                Enter your tracking number from your shipping confirmation or receipt
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-navy text-white rounded-full text-2xl font-bold mb-6">
                2
              </div>
              <div className="mb-4">
                <Search className="h-12 w-12 text-primary-blue mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-text-primary mb-3">
                Retrieve Information
              </h3>
              <p className="text-text-secondary">
                We'll automatically fetch the latest status from the courier
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-navy text-white rounded-full text-2xl font-bold mb-6">
                3
              </div>
              <div className="mb-4">
                <CheckCircle2 className="h-12 w-12 text-primary-blue mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-text-primary mb-3">
                Follow Progress
              </h3>
              <p className="text-text-secondary">
                View detailed tracking history and delivery progress in real-time
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Supported Couriers Section */}
      <section className="py-16 bg-background-main">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-primary-navy mb-4">
              Supported Couriers
            </h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              Track packages from major courier services worldwide
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
            {[
              { name: 'DHL', status: 'Connected' },
              { name: 'FedEx', status: 'Connected' },
              { name: 'UPS', status: 'Connected' },
              { name: 'USPS', status: 'Connected' },
              { name: 'Aramex', status: 'Connected' },
            ].map((courier) => (
              <div
                key={courier.name}
                className="bg-white rounded-lg border border-border p-6 text-center hover:shadow-md transition-shadow"
              >
                <div className="h-12 flex items-center justify-center mb-3">
                  <span className="text-2xl font-bold text-primary-navy">{courier.name}</span>
                </div>
                <span className="inline-block px-2.5 py-0.5 bg-status-success-bg text-status-success text-xs font-medium rounded-full">
                  {courier.status}
                </span>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              to="/couriers"
              className="text-primary-blue hover:text-blue-700 font-medium inline-flex items-center"
            >
              View all supported couriers
              <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-navy text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Ready to track your package?
          </h2>
          <p className="text-lg text-gray-300 mb-8">
            Get started now - no account or registration required
          </p>
          <Link to="/">
            <button className="bg-primary-blue hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors">
              Start Tracking
            </button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};
