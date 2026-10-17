import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  Shield, 
  Clock, 
  Search,
  TrendingUp,
  Zap,
  Globe,
  CheckCircle2,
  Truck
} from 'lucide-react';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';
import { Button } from '../../components/ui/Button';

type JourneyStage = 'in_transit' | 'out_for_delivery' | 'delivered';

const JOURNEY_STAGES: Record<JourneyStage, {
  label: string;
  statusText: string;
  eta: string;
  progressPercent: number;
  events: Array<{ title: string; time: string; location: string; isLatest: boolean }>;
}> = {
  in_transit: {
    label: 'In Transit',
    statusText: 'Departed Regional Distribution Hub',
    eta: 'Tomorrow by 7:00 PM',
    progressPercent: 60,
    events: [
      { title: 'Departed sorting facility', time: 'Today, 04:12 AM', location: 'Memphis, TN', isLatest: true },
      { title: 'Processed at hub', time: 'Yesterday, 10:45 PM', location: 'Memphis, TN', isLatest: false },
      { title: 'Picked up from sender', time: '2 days ago, 02:30 PM', location: 'Dallas, TX', isLatest: false },
    ]
  },
  out_for_delivery: {
    label: 'Out for Delivery',
    statusText: 'On Courier Delivery Vehicle',
    eta: 'Today by 3:30 PM',
    progressPercent: 85,
    events: [
      { title: 'Out for delivery with courier', time: 'Today, 08:35 AM', location: 'New York, NY 10001', isLatest: true },
      { title: 'Arrived at local delivery station', time: 'Today, 05:20 AM', location: 'New York, NY 10001', isLatest: false },
      { title: 'Departed sorting hub', time: 'Yesterday, 11:15 PM', location: 'Newark, NJ 07102', isLatest: false },
    ]
  },
  delivered: {
    label: 'Delivered',
    statusText: 'Delivered — Left at Front Door',
    eta: 'Delivered Today at 1:45 PM',
    progressPercent: 100,
    events: [
      { title: 'Delivered, signed by recipient', time: 'Today, 01:45 PM', location: 'New York, NY 10001', isLatest: true },
      { title: 'Out for delivery with courier', time: 'Today, 08:35 AM', location: 'New York, NY 10001', isLatest: false },
      { title: 'Arrived at local delivery station', time: 'Today, 05:20 AM', location: 'New York, NY 10001', isLatest: false },
    ]
  }
};

export const BentoHomePage: React.FC = () => {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [journeyStage, setJourneyStage] = useState<JourneyStage>('out_for_delivery');

  // Real-time automatic carrier detection
  const detectedCarrier = useMemo(() => {
    const clean = trackingNumber.trim().toUpperCase();
    if (!clean || clean.length < 3) return null;

    if (/^1Z[0-9A-Z]{16}$/i.test(clean) || clean.startsWith('1Z')) {
      return { name: 'UPS', confidence: '99%' };
    }
    if (/^TBA[0-9]{10,14}$/i.test(clean) || clean.startsWith('TBA')) {
      return { name: 'Amazon Logistics', confidence: '99%' };
    }
    if (/^(94|92|93|95)[0-9]{18,22}$/.test(clean) || (/^94\d{8,}/.test(clean))) {
      return { name: 'USPS', confidence: '98%' };
    }
    if (/^[0-9]{12}$/.test(clean) || /^[0-9]{15}$/.test(clean)) {
      return { name: 'FedEx', confidence: '96%' };
    }
    if (/^[0-9]{10}$/.test(clean)) {
      return { name: 'DHL Express', confidence: '97%' };
    }
    if (/^[A-Z]{2}[0-9]{9}CN$/i.test(clean)) {
      return { name: 'China Post', confidence: '99%' };
    }
    if (/^[A-Z]{2}[0-9]{9}GB$/i.test(clean)) {
      return { name: 'Royal Mail', confidence: '99%' };
    }
    return null;
  }, [trackingNumber]);

  const activeStageData = JOURNEY_STAGES[journeyStage];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section - Minimalist Pure White with Refined Typography */}
      <section className="relative bg-white pt-16 md:pt-20 pb-16 md:pb-24 px-4 md:px-6 border-b border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mx-auto md:mx-0">
            {/* Trust Badge */}
            <div className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 bg-white border border-green-200 rounded-full mb-4 md:mb-6 shadow-sm">
              <CheckCircle2 className="text-green-600 flex-shrink-0" size={14} />
              <span className="text-xs md:text-sm font-medium text-gray-700">Trusted by 50,000+ businesses worldwide</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight tracking-tight">
              Multi-carrier package tracking made simple
            </h1>

            {/* Subheadline */}
            <p className="text-base md:text-lg lg:text-xl text-gray-600 mb-6 md:mb-8 leading-relaxed">
              Track shipments from 1000+ carriers in one unified platform. 
              Real-time updates, global coverage, zero complexity.
            </p>

            {/* Inline Tracking Search */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-2 md:p-3 mb-3 max-w-2xl focus-within:border-green-600 focus-within:ring-2 focus-within:ring-green-100 transition-all">
              <div className="flex flex-col sm:flex-row gap-2 md:gap-3">
                <div className="flex-1 flex items-center gap-2 md:gap-3 px-3 md:px-4 py-2 md:py-3 bg-gray-50 rounded-lg">
                  <Search className="text-gray-400 flex-shrink-0" size={18} />
                  <input
                    type="text"
                    placeholder="Enter tracking number (e.g. USPS, FedEx, DHL, UPS)"
                    value={trackingNumber}
                    onChange={(e) => setTrackingNumber(e.target.value)}
                    className="flex-1 bg-transparent border-none outline-none text-sm md:text-base text-gray-900 placeholder-gray-500 w-full"
                  />
                  {trackingNumber && (
                    <button
                      type="button"
                      onClick={() => setTrackingNumber('')}
                      className="text-gray-400 hover:text-gray-600 text-xs px-1"
                    >
                      Clear
                    </button>
                  )}
                </div>
                <Link to={`/track?number=${encodeURIComponent(trackingNumber.trim())}`} className="w-full sm:w-auto">
                  <Button size="lg" className="w-full sm:w-auto px-6 md:px-8 whitespace-nowrap bg-green-600 hover:bg-green-700 text-white">
                    Track Now
                  </Button>
                </Link>
              </div>
            </div>

            {/* Automatic Carrier Detection Badge */}
            {detectedCarrier ? (
              <div className="mb-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-green-50 border border-green-200 text-green-800 text-xs font-medium">
                <span className="w-2 h-2 rounded-full bg-green-600 animate-pulse" />
                <span>Auto-detected Carrier: <strong className="font-semibold text-green-900">{detectedCarrier.name}</strong></span>
                <span className="text-green-600 font-mono text-[11px]">({detectedCarrier.confidence} match)</span>
              </div>
            ) : (
              <div className="mb-4 text-xs text-gray-500 flex items-center gap-1.5">
                <Truck size={14} className="text-gray-400" />
                <span>Instant auto-detection for USPS, FedEx, DHL, UPS, Amazon & 1000+ carriers</span>
              </div>
            )}

            {/* Quick Features */}
            <div className="flex flex-wrap gap-3 md:gap-6 text-xs md:text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="text-green-600 flex-shrink-0" size={14} />
                <span>No account required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="text-green-600 flex-shrink-0" size={14} />
                <span>Instant results</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="text-green-600 flex-shrink-0" size={14} />
                <span>1000+ carriers</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Supported Carriers Section */}
      <section className="py-12 md:py-16 lg:py-20 px-4 md:px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 md:mb-4 px-4">
              Track shipments from 1000+ carriers worldwide
            </h2>
            <p className="text-base md:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto px-4">
              Seamlessly integrate with major carriers and regional providers
            </p>
          </div>

          {/* Carrier Logo Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4 lg:gap-6 mb-8 md:mb-12">
            {/* UPS */}
            <div className="bg-white rounded-lg md:rounded-xl p-4 md:p-6 flex items-center justify-center hover:shadow-lg transition-shadow border border-gray-200 min-h-[80px] md:min-h-[100px]">
              <img 
                src="https://cdn.brandfetch.io/ups.com/w/400/h/400/theme/dark/icon.jpeg?t=1736881242863" 
                alt="UPS" 
                className="h-8 md:h-10 lg:h-12 w-auto object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.parentElement!.innerHTML = '<span class="text-lg md:text-xl lg:text-2xl font-bold text-yellow-800">UPS</span>';
                }}
              />
            </div>

            {/* FedEx */}
            <div className="bg-white rounded-lg md:rounded-xl p-4 md:p-6 flex items-center justify-center hover:shadow-lg transition-shadow border border-gray-200 min-h-[80px] md:min-h-[100px]">
              <img 
                src="https://cdn.brandfetch.io/fedex.com/w/400/h/400/theme/dark/symbol.png?t=1736881242863" 
                alt="FedEx" 
                className="h-8 md:h-10 lg:h-12 w-auto object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.parentElement!.innerHTML = '<span class="text-lg md:text-xl lg:text-2xl font-bold text-purple-600">FedEx</span>';
                }}
              />
            </div>

            {/* DHL */}
            <div className="bg-white rounded-lg md:rounded-xl p-4 md:p-6 flex items-center justify-center hover:shadow-lg transition-shadow border border-gray-200 min-h-[80px] md:min-h-[100px]">
              <img 
                src="https://cdn.brandfetch.io/dhl.com/w/400/h/400/theme/dark/symbol.png?t=1736881242863" 
                alt="DHL" 
                className="h-8 md:h-10 lg:h-12 w-auto object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.parentElement!.innerHTML = '<span class="text-lg md:text-xl lg:text-2xl font-bold text-red-600">DHL</span>';
                }}
              />
            </div>

            {/* USPS */}
            <div className="bg-white rounded-lg md:rounded-xl p-4 md:p-6 flex items-center justify-center hover:shadow-lg transition-shadow border border-gray-200 min-h-[80px] md:min-h-[100px]">
              <img 
                src="https://cdn.brandfetch.io/usps.com/w/400/h/400/theme/dark/symbol.png?t=1736881242863" 
                alt="USPS" 
                className="h-8 md:h-10 lg:h-12 w-auto object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.parentElement!.innerHTML = '<span class="text-lg md:text-xl lg:text-2xl font-bold text-blue-700">USPS</span>';
                }}
              />
            </div>

            {/* Amazon Logistics */}
            <div className="bg-white rounded-lg md:rounded-xl p-4 md:p-6 flex items-center justify-center hover:shadow-lg transition-shadow border border-gray-200 min-h-[80px] md:min-h-[100px]">
              <img 
                src="https://cdn.brandfetch.io/amazon.com/w/400/h/400/theme/dark/symbol.png?t=1736881242863" 
                alt="Amazon" 
                className="h-8 md:h-10 lg:h-12 w-auto object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.parentElement!.innerHTML = '<span class="text-lg md:text-xl lg:text-2xl font-bold text-orange-500">Amazon</span>';
                }}
              />
            </div>

            {/* China Post */}
            <div className="bg-white rounded-lg md:rounded-xl p-4 md:p-6 flex items-center justify-center hover:shadow-lg transition-shadow border border-gray-200 min-h-[80px] md:min-h-[100px]">
              <img 
                src="https://www.chinapost.com.cn/res/pc/img/logo.png" 
                alt="China Post" 
                className="h-8 md:h-10 lg:h-12 w-auto object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.parentElement!.innerHTML = '<span class="text-sm md:text-base lg:text-lg font-bold text-green-700">China Post</span>';
                }}
              />
            </div>

            {/* Royal Mail */}
            <div className="bg-white rounded-lg md:rounded-xl p-4 md:p-6 flex items-center justify-center hover:shadow-lg transition-shadow border border-gray-200 min-h-[80px] md:min-h-[100px]">
              <img 
                src="https://cdn.brandfetch.io/royalmail.com/w/400/h/400/theme/dark/symbol.png?t=1736881242863" 
                alt="Royal Mail" 
                className="h-8 md:h-10 lg:h-12 w-auto object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.parentElement!.innerHTML = '<span class="text-sm md:text-base lg:text-lg font-bold text-red-600">Royal Mail</span>';
                }}
              />
            </div>

            {/* Canada Post */}
            <div className="bg-white rounded-lg md:rounded-xl p-4 md:p-6 flex items-center justify-center hover:shadow-lg transition-shadow border border-gray-200 min-h-[80px] md:min-h-[100px]">
              <img 
                src="https://cdn.brandfetch.io/canadapost.ca/w/400/h/400/theme/dark/icon.png?t=1736881242863" 
                alt="Canada Post" 
                className="h-8 md:h-10 lg:h-12 w-auto object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.parentElement!.innerHTML = '<span class="text-sm md:text-base lg:text-lg font-bold text-red-600">Canada Post</span>';
                }}
              />
            </div>

            {/* Australia Post */}
            <div className="bg-white rounded-lg md:rounded-xl p-4 md:p-6 flex items-center justify-center hover:shadow-lg transition-shadow border border-gray-200 min-h-[80px] md:min-h-[100px]">
              <img 
                src="https://cdn.brandfetch.io/auspost.com.au/w/400/h/400/theme/dark/symbol.png?t=1736881242863" 
                alt="Australia Post" 
                className="h-8 md:h-10 lg:h-12 w-auto object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.parentElement!.innerHTML = '<span class="text-sm md:text-base lg:text-lg font-bold text-red-600">AusPost</span>';
                }}
              />
            </div>

            {/* La Poste */}
            <div className="bg-white rounded-lg md:rounded-xl p-4 md:p-6 flex items-center justify-center hover:shadow-lg transition-shadow border border-gray-200 min-h-[80px] md:min-h-[100px]">
              <img 
                src="https://cdn.brandfetch.io/laposte.fr/w/400/h/400/theme/dark/symbol.png?t=1736881242863" 
                alt="La Poste" 
                className="h-8 md:h-10 lg:h-12 w-auto object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.parentElement!.innerHTML = '<span class="text-sm md:text-base lg:text-lg font-bold text-yellow-500">La Poste</span>';
                }}
              />
            </div>

            {/* Deutsche Post DHL */}
            <div className="bg-white rounded-lg md:rounded-xl p-4 md:p-6 flex items-center justify-center hover:shadow-lg transition-shadow border border-gray-200 min-h-[80px] md:min-h-[100px]">
              <img 
                src="https://cdn.brandfetch.io/deutschepost.de/w/400/h/400/theme/dark/icon.png?t=1736881242863" 
                alt="Deutsche Post" 
                className="h-8 md:h-10 lg:h-12 w-auto object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.parentElement!.innerHTML = '<span class="text-sm md:text-base lg:text-lg font-bold text-yellow-400">Deutsche Post</span>';
                }}
              />
            </div>

            {/* +989 More */}
            <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-lg md:rounded-xl p-4 md:p-6 flex items-center justify-center border border-green-500 min-h-[80px] md:min-h-[100px]">
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-white mb-0.5 md:mb-1">+989</div>
                <div className="text-[10px] md:text-xs text-green-100 font-medium">more carriers</div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center px-4">
            <Link to="/track">
              <Button size="lg" className="px-6 md:px-8 w-full sm:w-auto">
                Start Tracking Now
              </Button>
            </Link>
          </div>
        </div>
      </section>


      {/* Feature Grid - Professional Bento Layout */}
      <section className="py-12 md:py-16 lg:py-20 px-4 md:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-8 md:mb-12 lg:mb-16 px-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 md:mb-4">
              Everything you need to track smarter
            </h2>
            <p className="text-base md:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto">
              Built for operations teams who need reliability, speed, and comprehensive tracking
            </p>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">

            {/* Quick Feature - No Account */}
            <div className="bg-white border-2 border-gray-200 rounded-xl md:rounded-2xl p-5 md:p-6 hover:border-green-600 hover:shadow-lg transition-all">
              <Shield className="text-green-600 mb-3 md:mb-4" size={28} />
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">No Account Required</h3>
              <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                Track packages instantly. Just paste your tracking number and get results in seconds.
              </p>
            </div>

            {/* Quick Feature - Real-Time */}
            <div className="bg-white border-2 border-gray-200 rounded-xl md:rounded-2xl p-5 md:p-6 hover:border-green-600 hover:shadow-lg transition-all">
              <Zap className="text-green-600 mb-3 md:mb-4" size={28} />
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">Real-Time Updates</h3>
              <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                Live tracking with automatic status updates. Never miss a delivery milestone.
              </p>
            </div>

            {/* Interactive Feature - Shipment Journey Simulator */}
            <div className="lg:col-span-2 bg-gray-900 rounded-xl md:rounded-2xl p-6 md:p-8 text-white flex flex-col justify-between border border-gray-800 shadow-md">
              <div>
                {/* Simulator Header & Switcher */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-4 border-b border-gray-800 gap-3">
                  <div className="flex items-center gap-2.5">
                    <Clock className="text-green-500 flex-shrink-0" size={24} />
                    <div>
                      <h3 className="text-lg md:text-xl font-bold">Interactive Shipment Simulator</h3>
                      <p className="text-xs text-gray-400">Test live tracking milestone updates</p>
                    </div>
                  </div>

                  {/* Stage Switcher Buttons */}
                  <div className="flex items-center gap-1.5 bg-gray-800/90 p-1 rounded-lg border border-gray-700/60 self-start sm:self-auto">
                    {(['in_transit', 'out_for_delivery', 'delivered'] as const).map((stageKey) => {
                      const isSelected = journeyStage === stageKey;
                      const stageInfo = JOURNEY_STAGES[stageKey];
                      return (
                        <button
                          key={stageKey}
                          type="button"
                          onClick={() => setJourneyStage(stageKey)}
                          className={`px-2.5 py-1 rounded text-xs font-medium transition-all ${
                            isSelected
                              ? 'bg-green-600 text-white shadow-sm'
                              : 'text-gray-400 hover:text-white hover:bg-gray-700/60'
                          }`}
                        >
                          {stageInfo.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Progress Status Bar */}
                <div className="bg-gray-800/60 rounded-xl p-3.5 mb-4 border border-gray-800">
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="font-semibold text-white">{activeStageData.statusText}</span>
                    <span className="text-green-400 font-mono text-[11px]">{activeStageData.eta}</span>
                  </div>
                  <div className="w-full h-1.5 bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-green-500 rounded-full transition-all duration-500 ease-out"
                      style={{ width: `${activeStageData.progressPercent}%` }}
                    />
                  </div>
                </div>

                {/* Dynamic Milestones List */}
                <div className="space-y-3">
                  {activeStageData.events.map((evt, idx) => (
                    <div
                      key={idx}
                      className={`flex items-start gap-3.5 pb-2.5 ${
                        idx !== activeStageData.events.length - 1 ? 'border-b border-gray-800/80' : ''
                      }`}
                    >
                      <div
                        className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 transition-all ${
                          evt.isLatest ? 'bg-green-500 ring-4 ring-green-500/20' : 'bg-gray-600'
                        }`}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <p
                            className={`text-sm truncate ${
                              evt.isLatest ? 'font-semibold text-white' : 'text-gray-300'
                            }`}
                          >
                            {evt.title}
                          </p>
                          <span className="text-[11px] text-gray-400 whitespace-nowrap font-mono">{evt.time}</span>
                        </div>
                        <p className="text-xs text-gray-400 mt-0.5">{evt.location}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Micro Hint */}
              <div className="pt-3 mt-2 border-t border-gray-800/80 flex items-center justify-between text-xs text-gray-400">
                <span>FedEx Home Delivery • #794820183921</span>
                <span className="text-green-400 text-[11px]">Real-time Event Stream</span>
              </div>
            </div>

            {/* Quick Feature - Global */}
            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl md:rounded-2xl p-5 md:p-6 text-white">
              <Globe className="mb-3 md:mb-4" size={28} />
              <h3 className="text-lg md:text-xl font-bold mb-2">Global Coverage</h3>
              <p className="text-sm md:text-base text-green-50 leading-relaxed">
                Track international shipments with support for carriers in 200+ countries.
              </p>
            </div>

            {/* Quick Feature - API */}
            <div className="bg-white border-2 border-gray-200 rounded-xl md:rounded-2xl p-5 md:p-6 hover:border-green-600 hover:shadow-lg transition-all">
              <TrendingUp className="text-green-600 mb-3 md:mb-4" size={28} />
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">Developer API</h3>
              <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                RESTful API for integration with your systems. Webhooks, batch tracking, and more.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section - Credibility */}
      <section className="py-12 md:py-16 lg:py-20 px-4 md:px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">50K+</div>
              <p className="text-sm md:text-base text-gray-600">Daily Shipments Tracked</p>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">1000+</div>
              <p className="text-sm md:text-base text-gray-600">Supported Carriers</p>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">200+</div>
              <p className="text-sm md:text-base text-gray-600">Countries Covered</p>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">99.9%</div>
              <p className="text-sm md:text-base text-gray-600">Uptime SLA</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works - Simple & Clear */}
      <section className="py-12 md:py-16 lg:py-20 px-4 md:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 md:mb-16 px-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 md:mb-4">How it works</h2>
            <p className="text-base md:text-lg lg:text-xl text-gray-600">Three simple steps to track any package</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {/* Step 1 */}
            <div className="text-center">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-green-100 text-green-600 rounded-xl md:rounded-2xl flex items-center justify-center text-xl md:text-2xl font-bold mx-auto mb-4 md:mb-6">
                1
              </div>
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 md:mb-3">Enter Tracking Number</h3>
              <p className="text-sm md:text-base text-gray-600 leading-relaxed px-4">
                Paste your tracking number from any carrier. We automatically detect the carrier.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-green-100 text-green-600 rounded-xl md:rounded-2xl flex items-center justify-center text-xl md:text-2xl font-bold mx-auto mb-4 md:mb-6">
                2
              </div>
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 md:mb-3">View Real-Time Status</h3>
              <p className="text-sm md:text-base text-gray-600 leading-relaxed px-4">
                Get instant access to current location, delivery estimates, and full shipment history.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-green-100 text-green-600 rounded-xl md:rounded-2xl flex items-center justify-center text-xl md:text-2xl font-bold mx-auto mb-4 md:mb-6">
                3
              </div>
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 md:mb-3">Stay Informed</h3>
              <p className="text-sm md:text-base text-gray-600 leading-relaxed px-4">
                Receive automatic updates on status changes and delivery exceptions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 lg:py-20 px-4 md:px-6 bg-gray-900">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6">
            Ready to streamline your shipping operations?
          </h2>
          <p className="text-base md:text-lg lg:text-xl text-gray-300 mb-6 md:mb-8">
            Start tracking packages across 1000+ carriers today. No credit card required.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4">
            <Link to="/track" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto px-6 md:px-8 py-3 md:py-4 text-base md:text-lg">
                Get Started Free
              </Button>
            </Link>
            <Link to="/help" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="w-full sm:w-auto px-6 md:px-8 py-3 md:py-4 text-base md:text-lg bg-white text-gray-900 hover:bg-gray-100">
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


