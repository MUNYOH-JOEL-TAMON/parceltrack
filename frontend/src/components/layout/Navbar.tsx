import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Package, Menu, X, Search, ShieldCheck } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [quickTrackInput, setQuickTrackInput] = useState('');
  const navigate = useNavigate();

  const handleQuickTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (quickTrackInput.trim()) {
      navigate(`/track?number=${encodeURIComponent(quickTrackInput.trim())}`);
      setQuickTrackInput('');
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 flex-shrink-0">
            <div className="bg-green-600 rounded-xl p-2 text-white shadow-sm">
              <Package className="h-5 w-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-gray-900 tracking-tight leading-none">
                ParcelGo
              </span>
              <span className="text-[10px] text-gray-500 font-medium hidden sm:block">
                Universal Tracking
              </span>
            </div>
          </Link>

          {/* Quick Track Search in Navbar (Visible on Large screens & above to prevent tablet cramming) */}
          <form
            onSubmit={handleQuickTrack}
            className="hidden lg:flex items-center bg-gray-50 hover:bg-gray-100/80 border border-gray-200 focus-within:border-green-600 focus-within:bg-white focus-within:ring-2 focus-within:ring-green-100 rounded-lg px-3 py-1.5 transition-all w-48 xl:w-64"
          >
            <Search size={14} className="text-gray-400 mr-2 flex-shrink-0" />
            <input
              type="text"
              placeholder="Quick track #..."
              value={quickTrackInput}
              onChange={(e) => setQuickTrackInput(e.target.value)}
              className="bg-transparent border-none outline-none text-xs text-gray-900 placeholder-gray-400 w-full min-w-0"
            />
            {quickTrackInput.trim() && (
              <button
                type="submit"
                className="ml-1 text-[11px] font-semibold text-green-600 hover:text-green-700 whitespace-nowrap"
              >
                Go
              </button>
            )}
          </form>

          {/* Desktop & Tablet Navigation Links & Status */}
          <div className="hidden md:flex items-center gap-3 lg:gap-6 flex-shrink-0">
            <Link
              to="/"
              className="text-gray-600 hover:text-gray-900 transition-colors font-medium text-xs lg:text-sm whitespace-nowrap"
            >
              Track Package
            </Link>

            <a
              href="/#carriers"
              className="text-gray-600 hover:text-gray-900 transition-colors font-medium text-xs lg:text-sm flex items-center gap-1.5 whitespace-nowrap"
            >
              <span>Carriers</span>
              <span className="bg-green-50 text-green-700 text-[10px] px-1.5 py-0.5 rounded-full border border-green-200 font-semibold">
                1,000+
              </span>
            </a>

            <Link
              to="/help"
              className="text-gray-600 hover:text-gray-900 transition-colors font-medium text-xs lg:text-sm whitespace-nowrap"
            >
              Help Center
            </Link>

            {/* Live Status Pill (hidden on tablet, visible on xl) */}
            <div className="hidden xl:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-50 border border-green-200 text-green-700 text-xs font-medium whitespace-nowrap">
              <span className="w-1.5 h-1.5 rounded-full bg-green-600 animate-pulse" />
              <span>99.9% Uptime</span>
            </div>

            <Link to="/admin/login" className="flex-shrink-0">
              <button className="bg-green-600 hover:bg-green-700 text-white font-medium text-xs lg:text-sm px-3 sm:px-4 py-2 rounded-xl transition-all duration-200 shadow-sm flex items-center gap-1.5 whitespace-nowrap">
                <ShieldCheck size={15} />
                <span>Admin Login</span>
              </button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white px-4 py-4 space-y-3">
          {/* Quick Track on Mobile */}
          <form onSubmit={handleQuickTrack} className="flex items-center bg-gray-50 border border-gray-200 rounded-lg px-3 py-2">
            <Search size={16} className="text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Enter tracking number..."
              value={quickTrackInput}
              onChange={(e) => setQuickTrackInput(e.target.value)}
              className="bg-transparent border-none outline-none text-sm text-gray-900 placeholder-gray-400 w-full"
            />
            {quickTrackInput.trim() && (
              <button
                type="submit"
                className="ml-2 text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded"
              >
                Track
              </button>
            )}
          </form>

          <div className="space-y-1 pt-1">
            <Link
              to="/"
              className="block text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-colors py-2.5 px-3 rounded-lg font-medium text-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Track Package
            </Link>
            <a
              href="/#carriers"
              className="flex items-center justify-between text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-colors py-2.5 px-3 rounded-lg font-medium text-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span>Supported Carriers</span>
              <span className="bg-green-50 text-green-700 text-[10px] px-2 py-0.5 rounded-full border border-green-200 font-semibold">
                1,000+
              </span>
            </a>
            <Link
              to="/help"
              className="block text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-colors py-2.5 px-3 rounded-lg font-medium text-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Help Center
            </Link>
          </div>

          <div className="pt-2 border-t border-gray-100">
            <Link to="/admin/login" onClick={() => setIsMobileMenuOpen(false)} className="block">
              <button className="w-full bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-2.5 rounded-xl transition-all duration-200 shadow-sm flex items-center justify-center gap-2 text-sm">
                <ShieldCheck size={16} />
                <span>Admin Login</span>
              </button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};
