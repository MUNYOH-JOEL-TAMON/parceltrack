import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { TrackingSearch } from '@/components/TrackingSearch';
import { 
  Package, 
  Truck, 
  CheckCircle, 
  MapPin, 
  ArrowRight,
  Shield,
  Clock,
  Search
} from 'lucide-react';

export const NewHomePage: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Floating Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/80 backdrop-blur-md shadow-sm border-b border-dark-200' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center transition-transform group-hover:scale-105">
                <Package className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold">
                <span className="text-dark-900">Package</span>
                <span className="text-primary-600">Go</span>
              </span>
            </Link>

            {/* Center Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-dark-900 hover:text-primary-600 transition-colors font-medium relative group">
                Features
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-600 transition-all group-hover:w-full"></span>
              </a>
              <a href="#how-it-works" className="text-dark-900 hover:text-primary-600 transition-colors font-medium relative group">
                How It Works
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-600 transition-all group-hover:w-full"></span>
              </a>
              <a href="#couriers" className="text-dark-900 hover:text-primary-600 transition-colors font-medium relative group">
                Supported Couriers
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-600 transition-all group-hover:w-full"></span>
              </a>
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-4">
              <Link to="/help" className="hidden sm:block text-dark-500 hover:text-dark-900 transition-colors font-medium">
                Help Center
              </Link>
              <Link to="/admin/login" className="hidden sm:block text-dark-900 hover:text-primary-600 transition-colors font-medium">
                Admin Login
              </Link>
              <Link 
                to="/track" 
                className="bg-primary-600 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-primary-700 transition-all hover:-translate-y-0.5 hover:shadow-lg inline-flex items-center gap-2"
              >
                Track Package
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-20 right-10 w-96 h-96 bg-primary-50 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-primary-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        
        <div className="max-w-7xl mx-auto relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="animate-slide-up">
              <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-semibold mb-6 animate-fade-in">
                <span className="w-2 h-2 bg-primary-600 rounded-full animate-pulse"></span>
                MULTI-CARRIER TRACKING, SIMPLIFIED
              </div>
              
              <h1 className="text-5xl md:text-6xl lg:text-hero-mobile xl:text-hero font-bold text-dark-900 mb-6 leading-none">
                Every Package.<br />
                <span className="text-primary-600 relative inline-block">
                  One Place.
                  <svg className="absolute -bottom-2 left-0 w-full" height="8" viewBox="0 0 300 8" fill="none">
                    <path d="M0 4C50 4 100 4 150 4C200 4 250 4 300 4" stroke="#15803D" strokeWidth="3" strokeLinecap="round" className="animate-draw-line" style={{ strokeDasharray: 300, strokeDashoffset: 300 }}/>
                  </svg>
                </span>
              </h1>
              
              <p className="text-xl text-dark-500 mb-10 leading-relaxed max-w-xl">
                Track every shipment across multiple courier services. Get clearer delivery updates, follow your package's journey, and keep everything in one place.
              </p>

              {/* Tracking Form */}
              <div className="bg-white rounded-2xl shadow-floating border border-dark-200 p-6 mb-8 transition-all hover:shadow-large">
                <TrackingSearch size="large" />
                <p className="text-sm text-dark-500 mt-3 text-center">
                  No account required. Just enter your tracking number.
                </p>
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-4 gap-4">
                {[
                  { icon: MapPin, label: 'Multi-carrier', sub: '50+ couriers' },
                  { icon: Clock, label: 'Real-time', sub: 'Live updates' },
                  { icon: Shield, label: 'No signup', sub: 'Free to use' },
                  { icon: Search, label: 'Simple', sub: 'One search' },
                ].map((item, idx) => (
                  <div key={idx} className="text-center transition-transform hover:scale-105" style={{ animationDelay: `${idx * 100}ms` }}>
                    <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center mb-2 mx-auto transition-colors hover:bg-primary-100">
                      <item.icon className="h-5 w-5 text-primary-600" />
                    </div>
                    <p className="text-xs font-semibold text-dark-900">{item.label}</p>
                    <p className="text-xs text-dark-500">{item.sub}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right - Animated Package Journey */}
            <div className="hidden lg:block relative">
              <svg viewBox="0 0 600 600" fill="none" className="w-full h-auto">
                {/* Route Path */}
                <path 
                  d="M 100 500 Q 200 350, 300 300 T 500 100" 
                  stroke="#15803D" 
                  strokeWidth="3" 
                  strokeDasharray="8 4"
                  className="opacity-30"
                />
                
                {/* Location Markers */}
                <g className="animate-scale-in" style={{ animationDelay: '600ms' }}>
                  <circle cx="100" cy="500" r="12" fill="#15803D" />
                  <circle cx="100" cy="500" r="20" fill="#15803D" opacity="0.2" className="animate-pulse" />
                </g>
                
                <g className="animate-scale-in" style={{ animationDelay: '800ms' }}>
                  <circle cx="300" cy="300" r="10" fill="#15803D" opacity="0.6" />
                </g>
                
                <g className="animate-scale-in" style={{ animationDelay: '1000ms' }}>
                  <circle cx="500" cy="100" r="14" fill="#15803D" />
                  <circle cx="500" cy="100" r="24" fill="#15803D" opacity="0.3" className="animate-pulse" />
                </g>

                {/* Package Box - Floating */}
                <g className="animate-float" transform="translate(250, 250)">
                  <rect x="-40" y="-40" width="80" height="80" rx="8" fill="#F59E0B" />
                  <rect x="-40" y="-40" width="80" height="80" rx="8" fill="#FBBF24" opacity="0.3" />
                  <rect x="-40" y="-5" width="80" height="10" fill="#D97706" opacity="0.5" />
                  <rect x="-5" y="-40" width="10" height="80" fill="#D97706" opacity="0.5" />
                </g>

                {/* Delivery Truck */}
                <g className="animate-scale-in" style={{ animationDelay: '1200ms' }} transform="translate(450, 120)">
                  <rect x="0" y="10" width="60" height="35" rx="4" fill="#DCFCE7" />
                  <rect x="10" y="15" width="40" height="25" rx="2" fill="#15803D" opacity="0.3" />
                  <circle cx="15" cy="45" r="8" fill="#166534" />
                  <circle cx="50" cy="45" r="8" fill="#166534" />
                </g>

                {/* Status Cards */}
                <g className="animate-slide-up" style={{ animationDelay: '1400ms' }} transform="translate(80, 400)">
                  <rect width="140" height="60" rx="12" fill="white" filter="url(#shadow)" />
                  <text x="15" y="25" fill="#64748B" fontSize="12" fontWeight="600">In Transit</text>
                  <text x="15" y="45" fill="#111827" fontSize="14" fontWeight="700">Memphis, TN</text>
                </g>

                {/* Shadow Filter */}
                <defs>
                  <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur in="SourceAlpha" stdDeviation="4"/>
                    <feOffset dx="0" dy="4" result="offsetblur"/>
                    <feComponentTransfer>
                      <feFuncA type="linear" slope="0.1"/>
                    </feComponentTransfer>
                    <feMerge>
                      <feMergeNode/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Bento Grid Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-dark-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Bento A: Multi-Carrier - Large */}
            <div className="lg:col-span-2 bg-white rounded-2xl p-8 border border-dark-200 hover:shadow-large transition-all group">
              <h3 className="text-2xl font-bold text-dark-900 mb-6">One search. Multiple couriers.</h3>
              <div className="flex flex-wrap items-center justify-center gap-8 py-8">
                {['DHL', 'FedEx', 'UPS', 'USPS', 'Aramex'].map((courier, idx) => (
                  <div 
                    key={courier} 
                    className="w-20 h-20 bg-dark-50 rounded-xl flex items-center justify-center font-bold text-lg text-dark-900 transition-all hover:bg-primary-50 hover:text-primary-600 hover:scale-110"
                    style={{ animationDelay: `${idx * 100}ms` }}
                  >
                    {courier.charAt(0)}
                  </div>
                ))}
              </div>
              <div className="h-1 bg-gradient-to-r from-transparent via-primary-600 to-transparent rounded-full"></div>
            </div>

            {/* Bento B: No Account - Small */}
            <div className="bg-white rounded-2xl p-8 border border-dark-200 hover:shadow-large transition-all flex flex-col justify-center items-center text-center">
              <div className="w-16 h-16 bg-primary-50 rounded-xl flex items-center justify-center mb-4">
                <Shield className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-bold text-dark-900 mb-2">No account needed.</h3>
              <p className="text-dark-500 text-sm">Track packages instantly without signing up.</p>
            </div>

            {/* Bento C: Shipment Progress - Medium */}
            <div className="lg:col-span-2 bg-white rounded-2xl p-8 border border-dark-200 hover:shadow-large transition-all">
              <h3 className="text-2xl font-bold text-dark-900 mb-8">Know where things stand.</h3>
              
              {/* Timeline */}
              <div className="relative">
                <div className="absolute top-6 left-0 right-0 h-1 bg-dark-200 rounded-full"></div>
                <div className="absolute top-6 left-0 w-3/5 h-1 bg-primary-600 rounded-full transition-all duration-1000"></div>
                
                <div className="relative flex justify-between">
                  {[
                    { label: 'Registered', active: true },
                    { label: 'Picked Up', active: true },
                    { label: 'In Transit', active: true },
                    { label: 'Out for Delivery', active: false },
                    { label: 'Delivered', active: false },
                  ].map((step, idx) => (
                    <div key={idx} className="flex flex-col items-center">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                        step.active ? 'bg-primary-600 text-white scale-110' : 'bg-dark-200 text-dark-500'
                      }`}>
                        {step.active && <CheckCircle className="h-6 w-6" />}
                      </div>
                      <p className={`text-xs mt-3 font-medium ${step.active ? 'text-dark-900' : 'text-dark-500'}`}>
                        {step.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bento D: Delivery Overview - Small */}
            <div className="bg-gradient-to-br from-primary-600 to-primary-700 rounded-2xl p-8 text-white hover:shadow-large transition-all">
              <div className="flex items-center gap-2 mb-4">
                <Truck className="h-5 w-5" />
                <span className="text-sm font-semibold opacity-90">In Transit</span>
              </div>
              <h3 className="text-2xl font-bold mb-4">Your delivery, at a glance.</h3>
              <div className="space-y-2 text-sm opacity-90">
                <p>• Estimated: Tomorrow</p>
                <p>• From: Los Angeles</p>
                <p>• To: New York</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};
