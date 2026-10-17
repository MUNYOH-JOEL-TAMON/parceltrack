import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, Search, Bell, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface AdminTopbarProps {
  onMenuClick: () => void;
  title?: string;
}

export const AdminTopbar: React.FC<AdminTopbarProps> = ({ onMenuClick, title }) => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/admin/shipments?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="h-16 bg-white border-b border-border flex items-center justify-between px-4 lg:px-6">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="lg:hidden text-text-primary hover:text-primary-blue transition-colors"
        >
          <Menu className="h-6 w-6" />
        </button>
        {title && (
          <h1 className="text-xl font-semibold text-text-primary hidden sm:block">
            {title}
          </h1>
        )}
      </div>

      {/* Center Section - Search */}
      <form onSubmit={handleSearch} className="hidden md:block flex-1 max-w-md mx-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-text-secondary" />
          <input
            type="text"
            placeholder="Search tracking number..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-10 pl-10 pr-4 rounded-lg border border-border bg-background-main text-sm focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent"
          />
        </div>
      </form>

      {/* Right Section */}
      <div className="flex items-center gap-3">
        {/* Notifications */}
        <button className="relative p-2 text-text-secondary hover:text-text-primary hover:bg-background-light rounded-lg transition-colors">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-status-error rounded-full"></span>
        </button>

        {/* User Menu */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2 p-2 hover:bg-background-light rounded-lg transition-colors"
          >
            <div className="w-8 h-8 bg-primary-blue rounded-full flex items-center justify-center">
              <User className="h-5 w-5 text-white" />
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-sm font-medium text-text-primary">{user?.name}</p>
              <p className="text-xs text-text-secondary capitalize">{user?.role}</p>
            </div>
          </button>

          {/* Dropdown Menu */}
          {showUserMenu && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setShowUserMenu(false)}
              />
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-border z-20">
                <div className="p-3 border-b border-border">
                  <p className="text-sm font-medium text-text-primary">{user?.name}</p>
                  <p className="text-xs text-text-secondary">{user?.email}</p>
                </div>
                <div className="py-2">
                  <button
                    onClick={() => {
                      navigate('/admin/settings');
                      setShowUserMenu(false);
                    }}
                    className="w-full px-4 py-2 text-left text-sm text-text-primary hover:bg-background-light transition-colors"
                  >
                    Settings
                  </button>
                  <button
                    onClick={() => {
                      logout();
                      setShowUserMenu(false);
                    }}
                    className="w-full px-4 py-2 text-left text-sm text-status-error hover:bg-background-light transition-colors"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
