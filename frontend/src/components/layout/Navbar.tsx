import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Package, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui';

export const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-border sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-primary-navy rounded-lg p-2">
              <Package className="h-6 w-6 text-primary-blue" />
            </div>
            <span className="text-xl font-bold text-primary-navy">ParcelTrack</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-text-primary hover:text-primary-blue transition-colors">
              Track a Package
            </Link>
            <Link to="/couriers" className="text-text-primary hover:text-primary-blue transition-colors">
              Supported Couriers
            </Link>
            <Link to="/how-it-works" className="text-text-primary hover:text-primary-blue transition-colors">
              How It Works
            </Link>
            <Link to="/help" className="text-text-primary hover:text-primary-blue transition-colors">
              Help Center
            </Link>
            <Link to="/admin/login">
              <Button variant="ghost" size="sm">
                Admin Login
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-text-primary"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-border">
          <div className="px-4 py-4 space-y-3">
            <Link
              to="/"
              className="block text-text-primary hover:text-primary-blue transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Track a Package
            </Link>
            <Link
              to="/couriers"
              className="block text-text-primary hover:text-primary-blue transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Supported Couriers
            </Link>
            <Link
              to="/how-it-works"
              className="block text-text-primary hover:text-primary-blue transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              How It Works
            </Link>
            <Link
              to="/help"
              className="block text-text-primary hover:text-primary-blue transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Help Center
            </Link>
            <Link to="/admin/login" onClick={() => setIsMobileMenuOpen(false)}>
              <Button variant="ghost" size="sm" className="w-full">
                Admin Login
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};
