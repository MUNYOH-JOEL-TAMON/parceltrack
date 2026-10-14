import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { TrackingSearch } from '@/components/TrackingSearch';
import { Package, Truck, CheckCircle, MapPin, ShieldCheck, Clock } from 'lucide-react';

export const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="flex-1 bg-green-50/30 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="max-w-xl">
              <h1 className="text-5xl sm:text-6xl font-bold text-dark-900 mb-4 leading-tight">
                Every Package.
              </h1>
              <h1 className="text-5xl sm:text-6xl font-bold text-primary-600 mb-6 leading-tight">
                One Place.
              </h1>
              <p className="text-lg text-dark-600 mb-8">
                Track your packages from multiple couriers with real-time updates and shipment history.
              </p>

              {/* Tracking Search */}
              <div className="bg-white rounded-2xl shadow-medium p-6 mb-8">
                <TrackingSearch size="large" />
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-white rounded-full mb-2 shadow-sm border border-gray-100">
                    <MapPin className="h-5 w-5 text-primary-600" />
                  </div>
                  <p className="text-xs font-medium text-dark-700">Multiple locations</p>
                </div>
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-white rounded-full mb-2 shadow-sm border border-gray-100">
                    <Truck className="h-5 w-5 text-primary-600" />
                  </div>
                  <p className="text-xs font-medium text-dark-700">Real-time updates</p>
                </div>
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-white rounded-full mb-2 shadow-sm border border-gray-100">
                    <Clock className="h-5 w-5 text-primary-600" />
                  </div>
                  <p className="text-xs font-medium text-dark-700">Complete history</p>
                </div>
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-white rounded-full mb-2 shadow-sm border border-gray-100">
                    <ShieldCheck className="h-5 w-5 text-primary-600" />
                  </div>
                  <p className="text-xs font-medium text-dark-700">No install needed</p>
                </div>
              </div>
            </div>

            {/* Right Image/Illustration */}
            <div className="hidden lg:flex items-center justify-center">
              <div className="relative w-full max-w-md float-animation">
                {/* Package illustration */}
                <svg viewBox="0 0 500 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto drop-shadow-lg">
                  {/* Delivery truck/van in background */}
                  <rect x="280" y="200" width="120" height="80" rx="8" fill="#dcfce7"/>
                  <rect x="300" y="210" width="80" height="50" rx="4" fill="#22c55e"/>
                  <circle cx="310" cy="280" r="15" fill="#15803d"/>
                  <circle cx="370" cy="280" r="15" fill="#15803d"/>
                  
                  {/* Main package box */}
                  <rect x="100" y="150" width="140" height="140" rx="12" fill="#f59e0b"/>
                  <rect x="100" y="150" width="140" height="140" rx="12" fill="#fbbf24" opacity="0.3"/>
                  
                  {/* Box tape lines */}
                  <rect x="100" y="210" width="140" height="16" fill="#d97706" opacity="0.5"/>
                  <rect x="160" y="150" width="16" height="140" fill="#d97706" opacity="0.5"/>
                  
                  {/* Location pin above package */}
                  <g transform="translate(145, 70)">
                    <ellipse cx="25" cy="85" rx="35" ry="8" fill="#000000" opacity="0.1"/>
                    <path d="M25 0C16.72 0 10 6.72 10 15c0 10.5 15 27 15 27s15-16.5 15-27c0-8.28-6.72-15-15-15z" fill="#16a34a"/>
                    <circle cx="25" cy="15" r="7" fill="white"/>
                    <path d="M25 30 L25 80" stroke="#16a34a" strokeWidth="3" strokeDasharray="5,3"/>
                  </g>
                  
                  {/* Small location pin 2 */}
                  <g transform="translate(320, 120)">
                    <path d="M15 0C10 0 6 4 6 9c0 6.5 9 17 9 17s9-10.5 9-17c0-5-4-9-9-9z" fill="#16a34a"/>
                    <circle cx="15" cy="9" r="4" fill="white"/>
                  </g>
                  
                  {/* Tracking line */}
                  <path d="M 50 350 Q 170 320, 250 350 T 450 350" stroke="#16a34a" strokeWidth="4" strokeDasharray="8,6" strokeLinecap="round" opacity="0.5"/>
                  
                  {/* Progress dots */}
                  <circle cx="50" cy="350" r="10" fill="#16a34a"/>
                  <circle cx="170" cy="330" r="10" fill="#16a34a"/>
                  <circle cx="250" cy="350" r="10" fill="#16a34a"/>
                  <circle cx="350" cy="340" r="8" fill="#22c55e" opacity="0.6"/>
                  <circle cx="450" cy="350" r="8" fill="#22c55e" opacity="0.3"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-dark-900 mb-3">How It Works</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-14 h-14 bg-primary-600 text-white rounded-2xl flex items-center justify-center text-2xl font-bold mb-4 mx-auto">
                1
              </div>
              <h3 className="text-lg font-semibold text-dark-900 mb-2">Enter your tracking number</h3>
              <p className="text-sm text-dark-600">Simply paste the tracking number from the courier's website</p>
            </div>

            <div className="text-center">
              <div className="w-14 h-14 bg-primary-600 text-white rounded-2xl flex items-center justify-center text-2xl font-bold mb-4 mx-auto">
                2
              </div>
              <h3 className="text-lg font-semibold text-dark-900 mb-2">We fetch information</h3>
              <p className="text-sm text-dark-600">Get real-time updates from the courier</p>
            </div>

            <div className="text-center">
              <div className="w-14 h-14 bg-primary-600 text-white rounded-2xl flex items-center justify-center text-2xl font-bold mb-4 mx-auto">
                3
              </div>
              <h3 className="text-lg font-semibold text-dark-900 mb-2">View the delivery progress</h3>
              <p className="text-sm text-dark-600">See complete tracking history</p>
            </div>
          </div>
        </div>
      </section>

      {/* Supported Couriers */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-dark-900 mb-3">Supported Couriers</h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 max-w-4xl mx-auto">
            {[
              { name: 'DHL', color: 'bg-yellow-400' },
              { name: 'FedEx', color: 'bg-purple-600' },
              { name: 'UPS', color: 'bg-amber-600' },
              { name: 'USPS', color: 'bg-blue-600' },
              { name: 'Aramex', color: 'bg-red-600' },
            ].map((courier) => (
              <div
                key={courier.name}
                className="bg-white rounded-xl p-6 text-center hover:shadow-md transition-shadow border border-gray-100"
              >
                <div className={`w-14 h-14 ${courier.color} rounded-lg mx-auto mb-3 flex items-center justify-center shadow-sm`}>
                  <span className="text-white font-bold text-lg">{courier.name.charAt(0)}</span>
                </div>
                <h3 className="font-semibold text-dark-900 text-sm mb-1">{courier.name}</h3>
                <span className="inline-block px-2 py-1 bg-green-50 text-green-700 text-xs font-medium rounded">
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
