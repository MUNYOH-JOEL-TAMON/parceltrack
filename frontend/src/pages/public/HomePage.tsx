import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { TrackingSearch } from '@/components/TrackingSearch';
import { PageTransition, FadeIn } from '@/components/PageTransition';
import { Package, Truck, CheckCircle, MapPin, ShieldCheck, Clock } from 'lucide-react';

export const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="flex-1 bg-gradient-to-b from-green-50/50 to-white py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <PageTransition>
              <div className="max-w-xl">
                <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-6 animate-fade-in">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  Real-time tracking updates
                </div>
                
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-dark-900 mb-4 leading-tight">
                  Every Package.
                </h1>
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-primary-600 mb-6 leading-tight">
                  One Place.
                </h1>
                <p className="text-xl text-dark-600 mb-10 leading-relaxed">
                  Track packages from multiple couriers with real-time updates, detailed shipment history, and instant notifications.
                </p>

                {/* Tracking Search */}
                <FadeIn delay={200}>
                  <div className="bg-white rounded-2xl shadow-large p-6 mb-8 border border-gray-100 hover-lift">
                    <TrackingSearch size="large" />
                    <p className="text-xs text-dark-500 mt-3 text-center">
                      Find your tracking number on your shipping receipt or confirmation email
                    </p>
                  </div>
                </FadeIn>

                {/* Trust Indicators */}
                <FadeIn delay={300}>
                  <div className="grid grid-cols-4 gap-4">
                    {[
                      { icon: MapPin, label: 'Multiple carriers', sublabel: '50+ supported' },
                      { icon: Truck, label: 'Live tracking', sublabel: 'Real-time data' },
                      { icon: Clock, label: 'Full history', sublabel: 'Complete timeline' },
                      { icon: ShieldCheck, label: 'Secure', sublabel: 'No signup needed' },
                    ].map((item, idx) => (
                      <div key={idx} className="text-center smooth-transition hover-scale cursor-pointer">
                        <div className="inline-flex items-center justify-center w-12 h-12 bg-white rounded-xl mb-2 shadow-sm border border-gray-100 group-hover:border-primary-200">
                          <item.icon className="h-5 w-5 text-primary-600" />
                        </div>
                        <p className="text-xs font-semibold text-dark-700 leading-tight">{item.label}</p>
                        <p className="text-xs text-dark-500 mt-0.5">{item.sublabel}</p>
                      </div>
                    ))}
                  </div>
                </FadeIn>
              </div>
            </PageTransition>

            {/* Right Image/Illustration */}
            <div className="hidden lg:flex items-center justify-center">
              <div className="relative w-full max-w-md animate-float">
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
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-dark-900 mb-4">How It Works</h2>
              <p className="text-lg text-dark-600 max-w-2xl mx-auto">
                Track your packages in three simple steps. No account required.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto relative">
            {/* Connecting lines for desktop */}
            <div className="hidden md:block absolute top-10 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-200 via-primary-400 to-primary-200 -z-10"></div>
            
            {[
              { 
                num: 1, 
                title: 'Enter tracking number', 
                desc: 'Paste your tracking number from any supported courier. We\'ll automatically detect the carrier.',
                icon: Package
              },
              { 
                num: 2, 
                title: 'We fetch the data', 
                desc: 'Get real-time updates directly from the courier\'s system with complete tracking details.',
                icon: Truck
              },
              { 
                num: 3, 
                title: 'View progress', 
                desc: 'See your package journey with a visual timeline, current status, and estimated delivery.',
                icon: CheckCircle
              },
            ].map((step, idx) => (
              <FadeIn key={idx} delay={100 * (idx + 1)}>
                <div className="relative text-center group">
                  {/* Step number badge */}
                  <div className="relative inline-flex items-center justify-center mb-6">
                    <div className="w-20 h-20 bg-primary-600 text-white rounded-2xl flex items-center justify-center text-3xl font-bold shadow-lg smooth-transition group-hover:bg-primary-700 group-hover:shadow-xl group-hover:scale-105 z-10">
                      {step.num}
                    </div>
                    <div className="absolute inset-0 bg-primary-200 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
                  </div>
                  
                  {/* Icon */}
                  <div className="inline-flex items-center justify-center w-14 h-14 bg-green-50 rounded-xl mb-4 group-hover:bg-green-100 smooth-transition">
                    <step.icon className="h-7 w-7 text-primary-600" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-dark-900 mb-3">{step.title}</h3>
                  <p className="text-dark-600 leading-relaxed">{step.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Supported Couriers */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-dark-900 mb-3">Supported Couriers</h2>
              <p className="text-dark-600">Track packages from major courier services worldwide</p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 max-w-5xl mx-auto">
            {[
              { 
                name: 'DHL', 
                logo: 'https://www.dhl.com/content/dam/dhl/global/core/images/logos/dhl-logo.svg',
                color: 'bg-white'
              },
              { 
                name: 'FedEx', 
                logo: 'https://www.fedex.com/content/dam/fedex-com/logos/logo.png',
                color: 'bg-white'
              },
              { 
                name: 'UPS', 
                logo: 'https://www.ups.com/assets/resources/webcontent/images/ups-logo.svg',
                color: 'bg-white'
              },
              { 
                name: 'USPS', 
                logo: 'https://www.usps.com/assets/images/usps-logo.svg',
                color: 'bg-white'
              },
              { 
                name: 'Aramex', 
                logo: 'https://www.aramex.com/content/dam/aramex/logos/aramex-logo.svg',
                color: 'bg-white'
              },
            ].map((courier, idx) => (
              <FadeIn key={courier.name} delay={100 * idx}>
                <div className="bg-white rounded-2xl p-6 text-center border border-gray-200 card-interactive group">
                  <div className="h-16 flex items-center justify-center mb-4">
                    <img 
                      src={courier.logo} 
                      alt={`${courier.name} logo`}
                      className="max-h-12 max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
                      onError={(e) => {
                        // Fallback to text if logo fails to load
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const fallback = document.createElement('div');
                        fallback.className = 'text-2xl font-bold text-dark-900';
                        fallback.textContent = courier.name;
                        target.parentElement?.appendChild(fallback);
                      }}
                    />
                  </div>
                  <h3 className="font-semibold text-dark-900 text-sm mb-2">{courier.name}</h3>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-50 text-green-700 text-xs font-medium rounded-full smooth-transition group-hover:bg-green-100">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                    Connected
                  </span>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Additional info */}
          <FadeIn delay={500}>
            <div className="mt-12 text-center">
              <p className="text-sm text-dark-500 mb-2">And many more carriers worldwide</p>
              <a href="/help" className="text-sm text-primary-600 hover:text-primary-700 font-medium smooth-transition hover:underline">
                View all supported carriers →
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      <Footer />
    </div>
  );
};
