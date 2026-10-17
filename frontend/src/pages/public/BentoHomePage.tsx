import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Package, 
  Shield, 
  Clock, 
  MapPin, 
  Search,
  TrendingUp,
  Zap,
  Globe,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';
import { Button } from '../../components/ui/Button';

export const BentoHomePage: React.FC = () => {
  const [trackingNumber, setTrackingNumber] = useState('');

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section - Clean and Direct */}
      <section className="relative bg-gradient-to-b from-green-50 to-white pt-20 pb-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            {/* Trust Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-green-200 rounded-full mb-6 shadow-sm">
              <CheckCircle2 className="text-green-600" size={16} />
              <span className="text-sm font-medium text-gray-700">Trusted by 50,000+ businesses worldwide</span>
            </div>

            {/* Headline */}
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Multi-carrier package tracking made simple
            </h1>

            {/* Subheadline */}
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Track shipments from 1000+ carriers in one unified platform. 
              Real-time updates, global coverage, zero complexity.
            </p>

            {/* Inline Tracking Search */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-3 mb-6 max-w-2xl">
              <div className="flex gap-3">
                <div className="flex-1 flex items-center gap-3 px-4 py-2 bg-gray-50 rounded-lg">
                  <Search className="text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Enter tracking number (e.g., 1Z999AA10123456784)"
                    value={trackingNumber}
                    onChange={(e) => setTrackingNumber(e.target.value)}
                    className="flex-1 bg-transparent border-none outline-none text-gray-900 placeholder-gray-500"
                  />
                </div>
                <Link to={`/track?number=${trackingNumber}`}>
                  <Button size="lg" className="px-8 whitespace-nowrap">
                    Track Now
                  </Button>
                </Link>
              </div>
            </div>

            {/* Quick Features */}
            <div className="flex flex-wrap gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="text-green-600" size={16} />
                <span>No account required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="text-green-600" size={16} />
                <span>Instant results</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="text-green-600" size={16} />
                <span>1000+ carriers</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Supported Carriers Section */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Track shipments from 1000+ carriers worldwide
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Seamlessly integrate with major carriers and regional providers
            </p>
          </div>

          {/* Carrier Logo Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-12">
            {/* UPS */}
            <div className="bg-white rounded-xl p-6 flex items-center justify-center hover:shadow-lg transition-shadow border border-gray-200">
              <img 
                src="https://cdn.brandfetch.io/ups.com/w/400/h/400/theme/dark/icon.jpeg?t=1736881242863" 
                alt="UPS" 
                className="h-12 w-auto object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.parentElement!.innerHTML = '<span class="text-2xl font-bold text-yellow-800">UPS</span>';
                }}
              />
            </div>

            {/* FedEx */}
            <div className="bg-white rounded-xl p-6 flex items-center justify-center hover:shadow-lg transition-shadow border border-gray-200">
              <img 
                src="https://cdn.brandfetch.io/fedex.com/w/400/h/400/theme/dark/symbol.png?t=1736881242863" 
                alt="FedEx" 
                className="h-12 w-auto object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.parentElement!.innerHTML = '<span class="text-2xl font-bold text-purple-600">FedEx</span>';
                }}
              />
            </div>

            {/* DHL */}
            <div className="bg-white rounded-xl p-6 flex items-center justify-center hover:shadow-lg transition-shadow border border-gray-200">
              <img 
                src="https://cdn.brandfetch.io/dhl.com/w/400/h/400/theme/dark/symbol.png?t=1736881242863" 
                alt="DHL" 
                className="h-12 w-auto object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.parentElement!.innerHTML = '<span class="text-2xl font-bold text-red-600">DHL</span>';
                }}
              />
            </div>

            {/* USPS */}
            <div className="bg-white rounded-xl p-6 flex items-center justify-center hover:shadow-lg transition-shadow border border-gray-200">
              <img 
                src="https://cdn.brandfetch.io/usps.com/w/400/h/400/theme/dark/symbol.png?t=1736881242863" 
                alt="USPS" 
                className="h-12 w-auto object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.parentElement!.innerHTML = '<span class="text-2xl font-bold text-blue-700">USPS</span>';
                }}
              />
            </div>

            {/* Amazon Logistics */}
            <div className="bg-white rounded-xl p-6 flex items-center justify-center hover:shadow-lg transition-shadow border border-gray-200">
              <img 
                src="https://cdn.brandfetch.io/amazon.com/w/400/h/400/theme/dark/symbol.png?t=1736881242863" 
                alt="Amazon" 
                className="h-12 w-auto object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.parentElement!.innerHTML = '<span class="text-2xl font-bold text-orange-500">Amazon</span>';
                }}
              />
            </div>

            {/* China Post */}
            <div className="bg-white rounded-xl p-6 flex items-center justify-center hover:shadow-lg transition-shadow border border-gray-200">
              <img 
                src="https://www.chinapost.com.cn/res/pc/img/logo.png" 
                alt="China Post" 
                className="h-12 w-auto object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.parentElement!.innerHTML = '<span class="text-lg font-bold text-green-700">China Post</span>';
                }}
              />
            </div>

            {/* Royal Mail */}
            <div className="bg-white rounded-xl p-6 flex items-center justify-center hover:shadow-lg transition-shadow border border-gray-200">
              <img 
                src="https://cdn.brandfetch.io/royalmail.com/w/400/h/400/theme/dark/symbol.png?t=1736881242863" 
                alt="Royal Mail" 
                className="h-12 w-auto object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.parentElement!.innerHTML = '<span class="text-lg font-bold text-red-600">Royal Mail</span>';
                }}
              />
            </div>

            {/* Canada Post */}
            <div className="bg-white rounded-xl p-6 flex items-center justify-center hover:shadow-lg transition-shadow border border-gray-200">
              <img 
                src="https://cdn.brandfetch.io/canadapost.ca/w/400/h/400/theme/dark/icon.png?t=1736881242863" 
                alt="Canada Post" 
                className="h-12 w-auto object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.parentElement!.innerHTML = '<span class="text-lg font-bold text-red-600">Canada Post</span>';
                }}
              />
            </div>

            {/* Australia Post */}
            <div className="bg-white rounded-xl p-6 flex items-center justify-center hover:shadow-lg transition-shadow border border-gray-200">
              <img 
                src="https://cdn.brandfetch.io/auspost.com.au/w/400/h/400/theme/dark/symbol.png?t=1736881242863" 
                alt="Australia Post" 
                className="h-12 w-auto object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.parentElement!.innerHTML = '<span class="text-lg font-bold text-red-600">AusPost</span>';
                }}
              />
            </div>

            {/* La Poste */}
            <div className="bg-white rounded-xl p-6 flex items-center justify-center hover:shadow-lg transition-shadow border border-gray-200">
              <img 
                src="https://cdn.brandfetch.io/laposte.fr/w/400/h/400/theme/dark/symbol.png?t=1736881242863" 
                alt="La Poste" 
                className="h-12 w-auto object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.parentElement!.innerHTML = '<span class="text-lg font-bold text-yellow-500">La Poste</span>';
                }}
              />
            </div>

            {/* Deutsche Post DHL */}
            <div className="bg-white rounded-xl p-6 flex items-center justify-center hover:shadow-lg transition-shadow border border-gray-200">
              <img 
                src="https://cdn.brandfetch.io/deutschepost.de/w/400/h/400/theme/dark/icon.png?t=1736881242863" 
                alt="Deutsche Post" 
                className="h-12 w-auto object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.parentElement!.innerHTML = '<span class="text-lg font-bold text-yellow-400">Deutsche Post</span>';
                }}
              />
            </div>

            {/* +989 More */}
            <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-xl p-6 flex items-center justify-center border border-green-500">
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">+989</div>
                <div className="text-xs text-green-100 font-medium">more carriers</div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <Link to="/track">
              <Button size="lg" className="px-8">
                Start Tracking Now
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Feature Grid - Professional Bento Layout */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything you need to track smarter
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Built for operations teams who need reliability, speed, and comprehensive tracking
            </p>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

            {/* Quick Feature - No Account */}
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 hover:border-green-600 hover:shadow-lg transition-all">
              <Shield className="text-green-600 mb-4" size={32} />
              <h3 className="text-xl font-bold text-gray-900 mb-2">No Account Required</h3>
              <p className="text-gray-600 leading-relaxed">
                Track packages instantly. Just paste your tracking number and get results in seconds.
              </p>
            </div>

            {/* Quick Feature - Real-Time */}
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 hover:border-green-600 hover:shadow-lg transition-all">
              <Zap className="text-green-600 mb-4" size={32} />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Real-Time Updates</h3>
              <p className="text-gray-600 leading-relaxed">
                Live tracking with automatic status updates. Never miss a delivery milestone.
              </p>
            </div>

            {/* Medium Feature - Timeline */}
            <div className="lg:col-span-2 bg-gray-900 rounded-2xl p-8 text-white">
              <div className="flex items-center gap-3 mb-6">
                <Clock className="text-green-500" size={32} />
                <h3 className="text-2xl font-bold">Complete Shipment History</h3>
              </div>
              
              {/* Timeline */}
              <div className="space-y-4">
                <div className="flex items-start gap-4 pb-4 border-b border-gray-800">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-semibold">Out for Delivery</p>
                      <span className="text-xs text-gray-400">2 hours ago</span>
                    </div>
                    <p className="text-sm text-gray-400">New York, NY 10001</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 pb-4 border-b border-gray-800">
                  <div className="w-2 h-2 bg-gray-600 rounded-full mt-2 flex-shrink-0" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-semibold text-gray-300">Arrived at Facility</p>
                      <span className="text-xs text-gray-400">Yesterday</span>
                    </div>
                    <p className="text-sm text-gray-400">Newark, NJ 07102</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 bg-gray-700 rounded-full mt-2 flex-shrink-0" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-semibold text-gray-400">In Transit</p>
                      <span className="text-xs text-gray-400">2 days ago</span>
                    </div>
                    <p className="text-sm text-gray-400">Philadelphia, PA 19019</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Feature - Global */}
            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white">
              <Globe className="mb-4" size={32} />
              <h3 className="text-xl font-bold mb-2">Global Coverage</h3>
              <p className="text-green-50 leading-relaxed">
                Track international shipments with support for carriers in 200+ countries.
              </p>
            </div>

            {/* Quick Feature - API */}
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 hover:border-green-600 hover:shadow-lg transition-all">
              <TrendingUp className="text-green-600 mb-4" size={32} />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Developer API</h3>
              <p className="text-gray-600 leading-relaxed">
                RESTful API for integration with your systems. Webhooks, batch tracking, and more.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section - Credibility */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-gray-900 mb-2">50K+</div>
              <p className="text-gray-600">Daily Shipments Tracked</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-gray-900 mb-2">1000+</div>
              <p className="text-gray-600">Supported Carriers</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-gray-900 mb-2">200+</div>
              <p className="text-gray-600">Countries Covered</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-gray-900 mb-2">99.9%</div>
              <p className="text-gray-600">Uptime SLA</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works - Simple & Clear */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How it works</h2>
            <p className="text-xl text-gray-600">Three simple steps to track any package</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Step 1 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                1
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Enter Tracking Number</h3>
              <p className="text-gray-600 leading-relaxed">
                Paste your tracking number from any carrier. We automatically detect the carrier.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                2
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">View Real-Time Status</h3>
              <p className="text-gray-600 leading-relaxed">
                Get instant access to current location, delivery estimates, and full shipment history.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                3
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Stay Informed</h3>
              <p className="text-gray-600 leading-relaxed">
                Receive automatic updates on status changes and delivery exceptions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to streamline your shipping operations?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Start tracking packages across 1000+ carriers today. No credit card required.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/track">
              <Button size="lg" className="px-8 py-4 text-lg">
                Get Started Free
              </Button>
            </Link>
            <Link to="/help">
              <Button variant="outline" size="lg" className="px-8 py-4 text-lg bg-white text-gray-900 hover:bg-gray-100">
                View Documentation
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};
