import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Package, 
  LayoutDashboard, 
  Truck, 
  Search,
  AlertCircle,
  Activity,
  Settings,
  HelpCircle,
  LogOut
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/utils/cn';

interface NavItem {
  label: string;
  path: string;
  icon: React.ElementType;
}

const navItems: NavItem[] = [
  { label: 'Overview', path: '/admin/dashboard', icon: LayoutDashboard },
  { label: 'Shipments', path: '/admin/shipments', icon: Package },
  { label: 'Track Shipment', path: '/admin/track', icon: Search },
  { label: 'Carriers', path: '/admin/carriers', icon: Truck },
  { label: 'Tracking Events', path: '/admin/events', icon: Activity },
  { label: 'Exceptions', path: '/admin/exceptions', icon: AlertCircle },
  { label: 'Sync Logs', path: '/admin/sync-logs', icon: Activity },
  { label: 'Settings', path: '/admin/settings', icon: Settings },
  { label: 'Help', path: '/admin/help', icon: HelpCircle },
];

interface AdminSidebarProps {
  isMobileOpen: boolean;
  onClose: () => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ isMobileOpen, onClose }) => {
  const location = useLocation();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed top-0 left-0 h-full w-64 bg-primary-navy text-white z-50 transition-transform duration-300',
          'lg:translate-x-0',
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Logo */}
        <div className="h-16 flex items-center gap-2 px-6 border-b border-white/10">
          <div className="bg-primary-blue rounded-lg p-2">
            <Package className="h-6 w-6 text-white" />
          </div>
          <span className="text-xl font-bold">ParcelTrack</span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-6">
          <ul className="space-y-1 px-3">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    onClick={onClose}
                    className={cn(
                      'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors',
                      isActive
                        ? 'bg-primary-blue text-white'
                        : 'text-gray-300 hover:bg-white/10 hover:text-white'
                    )}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Logout */}
        <div className="p-3 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-300 hover:bg-white/10 hover:text-white transition-colors"
          >
            <LogOut className="h-5 w-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};
