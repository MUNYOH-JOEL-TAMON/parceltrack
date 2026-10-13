import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { TrackingSearch } from '@/components/TrackingSearch';
import { Package, Truck, CheckCircle, MapPin, ShieldCheck, Clock } from 'lucide-react';

export const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 via-white to-blue-50 py-16 sm:py-24 relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute bottom-20 left-10 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <h1 className="text-5xl sm:text-6xl font-bold text-dark-900 mb-6 leading-tight">
                Every Package.<br />
                <span className="text-primary-600">One Place.</span>
              </h1>
              <p className="text-xl text-dark-600 mb-8 leading-relaxed">
                Track your packages from multiple couriers with real-time updates and shipment history.
              </p>

              {/* Tracking Search */}
              <div className="bg-white rounded-2xl shadow-large p-6 mb-8">
                <TrackingSearch size="large" />
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-50 rounded-xl mb-2">
                    <MapPin className="h-6 w-6 text-primary-600" />
                  </div>
                  <p className="text-xs font-medium text-dark-600">Multiple locations</p>
                </div>
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-50 rounded-xl mb-2">
                    <Truck className="h-6 w-6 text-primary-600" />
                  </div>
                  <p className="text-xs font-medium text-dark-600">Fast delivery tracking</p>
                </div>
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-50 rounded-xl mb-2">
                    <ShieldCheck className="h-6 w-6 text-primary-600" />
                  </div>
                  <p className="text-xs font-medium text-dark-600">Trusted by thousands</p>
                </div>
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-50 rounded-xl mb-2">
                    <Clock className="h-6 w-6 text-primary-600" />
                  </div>
                  <p className="text-xs font-medium text-dark-600">No install needed</p>
                </div>
              </div>
            </div>

            {/* Right Image/Illustration */}
            <div className="hidden lg:flex items-center justify-center relative">
              <div className="relative w-full max-w-md">
                <img
                  src="https://illustrations.popsy.co/amber/delivery-man.svg"
                  alt="Package Tracking"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-dark-900 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-dark-600 max-w-2xl mx-auto">
              Track your packages in three simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="relative">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-primary-600 text-white rounded-2xl flex items-center justify-center text-2xl font-bold mb-6 shadow-lg">
                  1
                </div>
                <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center mb-4">
                  <Package className="h-6 w-6 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-dark-900 mb-3">
                  Enter tracking number
                </h3>
                <p className="text-dark-600">
                  Simply paste your tracking number from any supported courier
                </p>
              </div>
              {/* Connector Line */}
              <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-primary-600 to-transparent -ml-8"></div>
            </div>

            {/* Step 2 */}
            <div className="relative">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-primary-600 text-white rounded-2xl flex items-center justify-center text-2xl font-bold mb-6 shadow-lg">
                  2
                </div>
                <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center mb-4">
                  <Truck className="h-6 w-6 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-dark-900 mb-3">
                  We fetch information
                </h3>
                <p className="text-dark-600">
                  Get real-time updates from the courier's tracking system
                </p>
              </div>
              <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-primary-600 to-transparent -ml-8"></div>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-primary-600 text-white rounded-2xl flex items-center justify-center text-2xl font-bold mb-6 shadow-lg">
                3
              </div>
              <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center mb-4">
                <CheckCircle className="h-6 w-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-dark-900 mb-3">
                View the delivery progress
              </h3>
              <p className="text-dark-600">
                See complete tracking history and estimated delivery time
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Supported Couriers Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-dark-900 mb-4">
              Supported Couriers
            </h2>
            <p className="text-lg text-dark-600">
              Track packages from major courier services worldwide
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
            {[
              { name: 'DHL', color: 'bg-yellow-500' },
              { name: 'FedEx', color: 'bg-purple-600' },
              { name: 'UPS', color: 'bg-yellow-600' },
              { name: 'USPS', color: 'bg-blue-600' },
              { name: 'Aramex', color: 'bg-red-600' },
            ].map((courier) => (
              <div
                key={courier.name}
                className="bg-white rounded-2xl p-6 text-center hover:shadow-medium transition-all duration-200 border border-dark-100"
              >
                <div className={`w-16 h-16 ${courier.color} rounded-xl mx-auto mb-4 flex items-center justify-center`}>
                  <span className="text-white font-bold text-xl">{courier.name.charAt(0)}</span>
                </div>
                <h3 className="font-semibold text-dark-900 mb-2">{courier.name}</h3>
                <span className="inline-block px-3 py-1 bg-primary-50 text-primary-700 text-xs font-medium rounded-full">
                  Connected
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};
