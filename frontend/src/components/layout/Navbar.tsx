import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Package, Menu, X } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-dark-100 sticky top-0 z-50 shadow-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5">
            <div className="bg-primary-600 rounded-xl p-2">
              <Package className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-dark-900">ParcelGo</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-dark-600 hover:text-dark-900 transition-colors font-medium text-[15px]">
              Track Package
            </Link>
            <Link to="/help" className="text-dark-600 hover:text-dark-900 transition-colors font-medium text-[15px]">
              Help Center
            </Link>
            <Link to="/admin/login">
              <button className="bg-primary-600 hover:bg-primary-700 text-white font-medium px-5 py-2 rounded-xl transition-all duration-200">
                Admin Login
              </button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-dark-600"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-dark-100 bg-white">
          <div className="px-4 py-4 space-y-1">
            <Link
              to="/"
              className="block text-dark-600 hover:text-dark-900 hover:bg-gray-50 transition-colors py-3 px-3 rounded-lg font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Track Package
            </Link>
            <Link
              to="/help"
              className="block text-dark-600 hover:text-dark-900 hover:bg-gray-50 transition-colors py-3 px-3 rounded-lg font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Help Center
            </Link>
            <Link to="/admin/login" onClick={() => setIsMobileMenuOpen(false)} className="block">
              <button className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium px-5 py-2.5 rounded-xl transition-all duration-200 mt-2">
                Admin Login
              </button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};
