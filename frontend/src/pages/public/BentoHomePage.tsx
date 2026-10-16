import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Package, 
  TrendingUp, 
  Shield, 
  Clock, 
  MapPin, 
  ChevronRight,
  CheckCircle,
  Truck,
  Box,
  Home
} from 'lucide-react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import Button from '../../components/ui/Button';

const BentoHomePage: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll-triggered animation helper
  const getRevealClass = (threshold: number) => {
    return scrollY > threshold ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8';
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Floating Navigation */}
      <Navbar />

      {/* Hero Section - Full Viewport */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-white via-green-50/30 to-white">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div 
            className="absolute top-20 right-20 w-96 h-96 bg-green-100/30 rounded-full blur-3xl animate-float"
            style={{ animationDelay: '0s', animationDuration: '8s' }}
          />
          <div 
            className="absolute bottom-20 left-20 w-96 h-96 bg-green-200/20 rounded-full blur-3xl animate-float"
            style={{ animationDelay: '2s', animationDuration: '10s' }}
          />
          
          {/* Floating Package Icons */}
          <Package 
            className="absolute top-40 left-1/4 text-green-600/20 animate-float" 
            size={64}
            style={{ animationDelay: '1s' }}
          />
          <Truck 
            className="absolute top-1/3 right-1/4 text-green-600/20 animate-float" 
            size={56}
            style={{ animationDelay: '3s' }}
          />
          <Box 
            className="absolute bottom-1/3 left-1/3 text-green-600/20 animate-float" 
            size={48}
            style={{ animationDelay: '2s' }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <div 
            className={`transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
          >
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-200 rounded-full mb-6 animate-fade-in">
              <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse" />
              <span className="text-sm font-medium text-green-900">Trusted by 50,000+ businesses</span>
            </div>

            {/* Hero Headline - Editorial Typography */}
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-gray-900 mb-6 leading-[0.95] tracking-tight">
              Track every package,
              <br />
              <span className="text-green-600">everywhere</span>
            </h1>

            {/* Subheadline */}
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Multi-carrier tracking made simple. Monitor shipments from 
              <span className="font-semibold text-gray-900"> 1000+ carriers</span> in one powerful dashboard.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Link to="/track">
                <Button size="lg" className="group px-8 py-4 text-lg hover:scale-105 transition-all duration-300">
                  Start Tracking Free
                  <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                </Button>
              </Link>
              <Link to="/pricing">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="px-8 py-4 text-lg border-2 hover:border-green-600 hover:text-green-600 transition-all duration-300"
                >
                  View Pricing
                </Button>
              </Link>
            </div>

            {/* Social Proof Stats */}
            <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <CheckCircle className="text-green-600" size={16} />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="text-green-600" size={16} />
                <span>Free forever plan</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="text-green-600" size={16} />
                <span>Cancel anytime</span>
              </div>
            </div>
          </div>

          {/* Hero Visual - Animated Package Journey */}
          <div 
            className={`mt-16 transition-all duration-1000 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
          >
            <div className="relative max-w-4xl mx-auto">
              {/* SVG Package Journey Animation */}
              <svg viewBox="0 0 800 400" className="w-full h-auto">
                {/* Animated Route Line */}
                <path
                  d="M 50 200 Q 200 100, 400 200 T 750 200"
                  fill="none"
                  stroke="#15803D"
                  strokeWidth="3"
                  strokeDasharray="10,5"
                  className="animate-draw-line"
                  opacity="0.3"
                />
                
                {/* Location Points */}
                <g className="animate-fade-in" style={{ animationDelay: '0.5s' }}>
                  <circle cx="50" cy="200" r="12" fill="#15803D" />
                  <text x="50" y="240" textAnchor="middle" className="text-xs fill-gray-600">Pickup</text>
                </g>
                
                <g className="animate-fade-in" style={{ animationDelay: '1s' }}>
                  <circle cx="400" cy="200" r="12" fill="#15803D" />
                  <text x="400" y="240" textAnchor="middle" className="text-xs fill-gray-600">In Transit</text>
                </g>
                
                <g className="animate-fade-in" style={{ animationDelay: '1.5s' }}>
                  <circle cx="750" cy="200" r="12" fill="#15803D" />
                  <text x="750" y="240" textAnchor="middle" className="text-xs fill-gray-600">Delivered</text>
                </g>

                {/* Animated Package Icon */}
                <g className="animate-float" style={{ animationDuration: '3s' }}>
                  <rect x="360" y="160" width="80" height="80" rx="8" fill="#15803D" opacity="0.9" />
                  <rect x="370" y="170" width="60" height="60" rx="4" fill="white" opacity="0.3" />
                  <text x="400" y="210" textAnchor="middle" className="text-2xl fill-white">📦</text>
                </g>
              </svg>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-gray-300 rounded-full flex items-start justify-center p-2">
            <div className="w-1.5 h-3 bg-green-600 rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      {/* Bento Grid Section */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className={`text-center mb-16 transition-all duration-1000 ${getRevealClass(100)}`}>
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
              Everything you need to
              <br />
              <span className="text-green-600">track smarter</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Powerful features designed for modern logistics teams
            </p>
          </div>

          {/* Asymmetric Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Large Tile 1: Multi-Carrier Tracking */}
            <div 
              className={`lg:col-span-2 lg:row-span-2 bg-gradient-to-br from-green-600 to-green-700 rounded-3xl p-8 text-white relative overflow-hidden group hover:shadow-2xl transition-all duration-500 ${getRevealClass(200)}`}
            >
              <div className="relative z-10">
                <Package className="mb-4" size={48} />
                <h3 className="text-4xl font-bold mb-4">1000+ Carriers, One Platform</h3>
                <p className="text-green-50 text-lg mb-6 max-w-xl">
                  Track shipments from UPS, FedEx, DHL, USPS, and 1000+ more carriers in a unified dashboard. Real-time updates, every time.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-white/20 rounded-full text-sm backdrop-blur-sm">UPS</span>
                  <span className="px-3 py-1 bg-white/20 rounded-full text-sm backdrop-blur-sm">FedEx</span>
                  <span className="px-3 py-1 bg-white/20 rounded-full text-sm backdrop-blur-sm">DHL</span>
                  <span className="px-3 py-1 bg-white/20 rounded-full text-sm backdrop-blur-sm">USPS</span>
                  <span className="px-3 py-1 bg-white/20 rounded-full text-sm backdrop-blur-sm">+996 more</span>
                </div>
              </div>
              
              {/* Decorative Background */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2 group-hover:scale-110 transition-transform duration-700" />
            </div>

            {/* Small Tile 1: No Account Needed */}
            <div 
              className={`bg-white rounded-3xl p-8 border-2 border-gray-200 hover:border-green-600 hover:shadow-xl transition-all duration-500 group ${getRevealClass(300)}`}
            >
              <Shield className="mb-4 text-green-600 group-hover:scale-110 transition-transform" size={40} />
              <h3 className="text-2xl font-bold text-gray-900 mb-3">No Account Required</h3>
              <p className="text-gray-600">
                Track packages instantly without signing up. Just paste your tracking number and go.
              </p>
            </div>

            {/* Small Tile 2: Real-Time Updates */}
            <div 
              className={`bg-white rounded-3xl p-8 border-2 border-gray-200 hover:border-green-600 hover:shadow-xl transition-all duration-500 group ${getRevealClass(350)}`}
            >
              <Clock className="mb-4 text-green-600 group-hover:scale-110 transition-transform" size={40} />
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Live Updates</h3>
              <p className="text-gray-600">
                Get real-time notifications as your packages move through the delivery network.
              </p>
            </div>

            {/* Wide Tile: Shipment Timeline */}
            <div 
              className={`lg:col-span-2 bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl p-8 text-white relative overflow-hidden hover:shadow-2xl transition-all duration-500 ${getRevealClass(400)}`}
            >
              <h3 className="text-3xl font-bold mb-6">Complete Shipment History</h3>
              
              {/* Timeline Visualization */}
              <div className="space-y-4">
                <div className="flex items-start gap-4 animate-fade-in" style={{ animationDelay: '0.1s' }}>
                  <div className="w-3 h-3 bg-green-500 rounded-full mt-1.5 animate-pulse" />
                  <div>
                    <p className="font-semibold">Out for Delivery</p>
                    <p className="text-gray-400 text-sm">Today, 9:30 AM - New York, NY</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                  <div className="w-3 h-3 bg-green-600 rounded-full mt-1.5" />
                  <div>
                    <p className="font-semibold">Arrived at Facility</p>
                    <p className="text-gray-400 text-sm">Yesterday, 11:45 PM - Newark, NJ</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 animate-fade-in" style={{ animationDelay: '0.3s' }}>
                  <div className="w-3 h-3 bg-gray-600 rounded-full mt-1.5" />
                  <div>
                    <p className="font-semibold">In Transit</p>
                    <p className="text-gray-400 text-sm">Yesterday, 2:15 PM - Philadelphia, PA</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Small Tile 3: Global Coverage */}
            <div 
              className={`bg-gradient-to-br from-green-500 to-green-600 rounded-3xl p-8 text-white hover:shadow-xl transition-all duration-500 group ${getRevealClass(450)}`}
            >
              <MapPin className="mb-4 group-hover:scale-110 transition-transform" size={40} />
              <h3 className="text-2xl font-bold mb-3">Global Coverage</h3>
              <p className="text-green-50">
                Track shipments worldwide with support for international carriers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className={`text-center mb-16 transition-all duration-1000 ${getRevealClass(600)}`}>
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
              How it works
            </h2>
            <p className="text-xl text-gray-600">
              Three simple steps to track any package
            </p>
          </div>

          {/* Steps with Connecting Line */}
          <div className="relative max-w-5xl mx-auto">
            {/* Connecting Line */}
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-green-100 -translate-y-1/2 hidden lg:block">
              <div 
                className="h-full bg-green-600 transition-all duration-1000"
                style={{ 
                  width: scrollY > 800 ? '100%' : '0%',
                  transition: 'width 2s ease-out'
                }}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
              {/* Step 1 */}
              <div className={`text-center transition-all duration-700 ${getRevealClass(700)}`}>
                <div className="w-20 h-20 bg-green-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6 hover:scale-110 transition-transform">
                  1
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Enter Tracking Number</h3>
                <p className="text-gray-600">
                  Paste your tracking number from any carrier
                </p>
              </div>

              {/* Step 2 */}
              <div className={`text-center transition-all duration-700 ${getRevealClass(800)}`}>
                <div className="w-20 h-20 bg-green-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6 hover:scale-110 transition-transform">
                  2
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Get Real-Time Updates</h3>
                <p className="text-gray-600">
                  See live status updates and location history
                </p>
              </div>

              {/* Step 3 */}
              <div className={`text-center transition-all duration-700 ${getRevealClass(900)}`}>
                <div className="w-20 h-20 bg-green-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6 hover:scale-110 transition-transform">
                  3
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Receive Your Package</h3>
                <p className="text-gray-600">
                  Get notified when your package arrives
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* From Pickup to Doorstep - Storytelling Section */}
      <section className="py-24 px-6 bg-gradient-to-br from-green-600 to-green-700 text-white relative overflow-hidden">
        {/* Background Animation */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl animate-float" style={{ animationDuration: '12s' }} />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white rounded-full blur-3xl animate-float" style={{ animationDuration: '10s', animationDelay: '2s' }} />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className={`text-center mb-16 transition-all duration-1000 ${getRevealClass(1000)}`}>
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              From pickup to doorstep,
              <br />
              we've got you covered
            </h2>
            <p className="text-xl text-green-50 max-w-2xl mx-auto">
              Track every mile of your shipment's journey with precision and confidence
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className={`text-center transition-all duration-700 ${getRevealClass(1100)}`}>
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4 hover:scale-110 transition-transform">
                <Box className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-3">Pickup</h3>
              <p className="text-green-50">
                Shipment collected and scanned into the network
              </p>
            </div>

            <div className={`text-center transition-all duration-700 ${getRevealClass(1200)}`}>
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4 hover:scale-110 transition-transform">
                <Truck className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-3">In Transit</h3>
              <p className="text-green-50">
                Real-time tracking through sorting facilities and delivery routes
              </p>
            </div>

            <div className={`text-center transition-all duration-700 ${getRevealClass(1300)}`}>
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4 hover:scale-110 transition-transform">
                <Home className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-3">Delivered</h3>
              <p className="text-green-50">
                Package safely delivered to your doorstep with proof
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 px-6 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className={`transition-all duration-1000 ${getRevealClass(1400)}`}>
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              Ready to start tracking?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of businesses using ParcelGo
            </p>
            <Link to="/track">
              <Button size="lg" className="px-8 py-4 text-lg hover:scale-105 transition-all duration-300">
                Get Started Free
                <ChevronRight className="ml-2" size={20} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default BentoHomePage;
