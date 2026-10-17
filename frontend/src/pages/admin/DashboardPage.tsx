import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AdminLayout } from '@/components/layout/AdminLayout';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Skeleton,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  StatusBadge,
  Button,
} from '@/components/ui';
import { FadeIn, ScaleIn } from '@/components/PageTransition';
import { DashboardStats, Shipment } from '@/types';
import { statsService, shipmentService } from '@/services/api';
import { useToast } from '@/components/ui';
import { formatDateTime } from '@/utils/formatDate';
import {
  Package,
  Truck,
  MapPin,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentShipments, setRecentShipments] = useState<Shipment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [statsRes, shipmentsRes] = await Promise.all([
        statsService.getDashboardStats(),
        shipmentService.getAllShipments({ page: 1, limit: 6 }),
      ]);
      setStats(statsRes.data.data);
      setRecentShipments(shipmentsRes.data.data.shipments || []);
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
          <Skeleton className="h-64" />
        </div>
      </AdminLayout>
    );
  }

  const kpiCards = [
    {
      title: 'Total Shipments',
      value: stats?.totalShipments || 0,
      icon: Package,
      color: 'text-primary-600',
      bgColor: 'bg-primary-50',
      link: '/admin/shipments',
    },
    {
      title: 'In Transit',
      value: stats?.inTransit || 0,
      icon: Truck,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      link: '/admin/shipments?status=in_transit',
    },
    {
      title: 'Out for Delivery',
      value: stats?.outForDelivery || 0,
      icon: MapPin,
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
      link: '/admin/shipments?status=out_for_delivery',
    },
    {
      title: 'Delivered',
      value: stats?.delivered || 0,
      icon: CheckCircle2,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      link: '/admin/shipments?status=delivered',
    },
    {
      title: 'Exceptions',
      value: stats?.exceptions || 0,
      icon: AlertCircle,
      color: 'text-rose-600',
      bgColor: 'bg-rose-50',
      link: '/admin/exceptions',
    },
  ];

  return (
    <AdminLayout title="Dashboard Overview">
      <div className="space-y-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {kpiCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <ScaleIn key={card.title} delay={idx * 80}>
                <Card
                  padding="md"
                  className="hover-lift cursor-pointer transition-all hover:border-primary-500/30"
                  onClick={() => navigate(card.link)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-text-secondary mb-1">
                        {card.title}
                      </p>
                      <p className="text-3xl font-extrabold text-text-primary smooth-transition">
                        {card.value}
                      </p>
                    </div>
                    <div
                      className={`w-12 h-12 rounded-xl ${card.bgColor} flex items-center justify-center smooth-transition hover-scale`}
                    >
                      <Icon className={`h-6 w-6 ${card.color}`} />
                    </div>
                  </div>
                </Card>
              </ScaleIn>
            );
          })}
        </div>

        {/* Status Breakdown Chart */}
        {stats?.statusBreakdown && stats.statusBreakdown.length > 0 && (
          <FadeIn delay={400}>
            <Card className="hover-lift">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div>
                  <CardTitle>Shipment Status Distribution</CardTitle>
                  <p className="text-xs text-text-secondary mt-0.5">
                    Real-time parcel volume aggregated across all connected carrier feeds
                  </p>
                </div>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={stats.statusBreakdown}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis
                      dataKey="status"
                      tickFormatter={(value) =>
                        value.replace(/_/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())
                      }
                      tick={{ fill: '#64748b', fontSize: 12 }}
                    />
                    <YAxis tick={{ fill: '#64748b', fontSize: 12 }} allowDecimals={false} />
                    <Tooltip
                      labelFormatter={(value) =>
                        value.replace(/_/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())
                      }
                      contentStyle={{
                        borderRadius: '12px',
                        border: '1px solid #E2E8F0',
                        boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
                      }}
                    />
                    <Legend />
                    <Bar
                      dataKey="count"
                      name="Active Packages"
                      fill="#15803D"
                      radius={[6, 6, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </FadeIn>
        )}

        {/* Recent Shipments Live Table */}
        <FadeIn delay={500}>
          <Card className="hover-lift" padding="none">
            <div className="p-6 border-b border-dark-100 flex items-center justify-between">
              <div>
                <CardTitle>Recent Shipments</CardTitle>
                <p className="text-xs text-text-secondary mt-0.5">
                  Latest registered packages across your active logistics carriers
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('/admin/shipments')}
                className="gap-1.5 text-xs"
              >
                <span>View All ({stats?.totalShipments || 0})</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </div>

            {recentShipments.length === 0 ? (
              <div className="py-12 text-center text-text-secondary">
                No recent shipments registered.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Tracking Number</TableHead>
                      <TableHead>Carrier</TableHead>
                      <TableHead>Route (Origin &rarr; Destination)</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last Activity</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentShipments.map((shipment) => (
                      <TableRow key={shipment._id}>
                        <TableCell>
                          <div className="flex flex-col">
                            <span className="font-mono text-sm font-semibold text-text-primary">
                              {shipment.trackingNumber}
                            </span>
                            {shipment.internalReference && (
                              <span className="text-xs text-text-secondary">
                                Ref: {shipment.internalReference}
                              </span>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-dark-100 text-dark-800">
                            {shipment.courier?.name || 'Carrier'}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="text-xs text-text-secondary">
                            <span className="font-medium text-text-primary">
                              {shipment.origin || '—'}
                            </span>
                            {' \u2192 '}
                            <span className="font-medium text-text-primary">
                              {shipment.destination || '—'}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <StatusBadge status={shipment.status} />
                        </TableCell>
                        <TableCell className="text-xs text-text-secondary whitespace-nowrap">
                          {formatDateTime(shipment.lastUpdated || shipment.updatedAt)}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => navigate(`/admin/shipments/${shipment._id}`)}
                            className="text-xs gap-1 hover:text-primary-600"
                          >
                            <ExternalLink className="h-3 w-3" />
                            <span>Details</span>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </Card>
        </FadeIn>
      </div>
    </AdminLayout>
  );
};
