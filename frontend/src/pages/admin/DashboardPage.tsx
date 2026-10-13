import React, { useEffect, useState } from 'react';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { Card, CardHeader, CardTitle, CardContent, StatusBadge, Skeleton } from '@/components/ui';
import { DashboardStats } from '@/types';
import { statsService } from '@/services/api';
import { useToast } from '@/components/ui';
import { Package, Truck, MapPin, CheckCircle2, AlertCircle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export const DashboardPage: React.FC = () => {
  const { showToast } = useToast();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await statsService.getDashboardStats();
      setStats(response.data.data);
    } catch (error: any) {
      showToast('Failed to load dashboard statistics', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <AdminLayout title="Dashboard Overview">
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-32" />
            ))}
          </div>
          <Skeleton className="h-96" />
        </div>
      </AdminLayout>
    );
  }

  const kpiCards = [
    {
      title: 'Total Shipments',
      value: stats?.totalShipments || 0,
      icon: Package,
      color: 'text-primary-blue',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'In Transit',
      value: stats?.inTransit || 0,
      icon: Truck,
      color: 'text-primary-blue',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Out for Delivery',
      value: stats?.outForDelivery || 0,
      icon: MapPin,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
    },
    {
      title: 'Delivered',
      value: stats?.delivered || 0,
      icon: CheckCircle2,
      color: 'text-status-success',
      bgColor: 'bg-status-success-bg',
    },
    {
      title: 'Exceptions',
      value: stats?.exceptions || 0,
      icon: AlertCircle,
      color: 'text-status-error',
      bgColor: 'bg-status-error-bg',
    },
  ];

  return (
    <AdminLayout title="Dashboard Overview">
      <div className="space-y-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {kpiCards.map((card) => {
            const Icon = card.icon;
            return (
              <Card key={card.title} padding="md">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-text-secondary mb-1">{card.title}</p>
                    <p className="text-3xl font-bold text-text-primary">{card.value}</p>
                  </div>
                  <div className={`w-12 h-12 rounded-lg ${card.bgColor} flex items-center justify-center`}>
                    <Icon className={`h-6 w-6 ${card.color}`} />
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Status Breakdown Chart */}
        {stats?.statusBreakdown && stats.statusBreakdown.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Shipment Status Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={stats.statusBreakdown}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="status" 
                    tickFormatter={(value) => value.replace(/_/g, ' ')}
                  />
                  <YAxis />
                  <Tooltip 
                    labelFormatter={(value) => value.replace(/_/g, ' ')}
                    contentStyle={{ borderRadius: '8px', border: '1px solid #E2E8F0' }}
                  />
                  <Legend />
                  <Bar dataKey="count" fill="#2563EB" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        )}

        {/* Recent Shipments Placeholder */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Shipments</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-text-secondary text-center py-8">
              Recent shipments will be displayed here
            </p>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};
