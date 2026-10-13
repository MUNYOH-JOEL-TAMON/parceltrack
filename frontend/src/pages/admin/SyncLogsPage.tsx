import React, { useEffect, useState } from 'react';
import { AdminLayout } from '@/components/layout/AdminLayout';
import {
  Card,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  Button,
  Select,
  Badge,
  Pagination,
  TableSkeleton,
  EmptyState
} from '@/components/ui';
import { SyncLog } from '@/types';
import { syncLogService } from '@/services/api';
import { useToast } from '@/components/ui';
import { formatDateTime } from '@/utils/formatDate';
import { Activity, RefreshCw } from 'lucide-react';

export const SyncLogsPage: React.FC = () => {
  const { showToast } = useToast();
  const [logs, setLogs] = useState<SyncLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    fetchLogs();
  }, [currentPage, statusFilter]);

  const fetchLogs = async () => {
    setIsLoading(true);
    try {
      const params: any = { page: currentPage, limit: 20 };
      if (statusFilter !== 'all') params.status = statusFilter;

      const response = await syncLogService.getSyncLogs(params);
      setLogs(response.data.data.logs);
      setTotalPages(response.data.data.totalPages || 1);
    } catch (error: any) {
      showToast('Failed to load sync logs', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRetry = async (logId: string) => {
    try {
      await syncLogService.retrySyncLog(logId);
      showToast('Retry initiated successfully', 'success');
      fetchLogs();
    } catch (error: any) {
      showToast('Failed to retry sync', 'error');
    }
  };

  const statusOptions = [
    { value: 'all', label: 'All Statuses' },
    { value: 'success', label: 'Success' },
    { value: 'failure', label: 'Failure' },
  ];

  return (
    <AdminLayout title="Synchronization Logs">
      <div className="space-y-6">
        {/* Filters */}
        <Card padding="sm">
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-text-secondary">Filter:</span>
            <Select
              options={statusOptions}
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
        </Card>

        {/* Logs Table */}
        <Card padding="none">
          {isLoading ? (
            <div className="p-6">
              <TableSkeleton rows={10} />
            </div>
          ) : logs.length === 0 ? (
            <EmptyState
              icon={Activity}
              title="No Sync Logs Found"
              description="No synchronization logs match your current filters."
            />
          ) : (
            <>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Tracking Number</TableHead>
                      <TableHead>Courier</TableHead>
                      <TableHead>Operation</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Timestamp</TableHead>
                      <TableHead>Attempts</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {logs.map((log) => (
                      <TableRow key={log._id}>
                        <TableCell className="font-mono">
                          {log.trackingNumber}
                        </TableCell>
                        <TableCell>{log.courier}</TableCell>
                        <TableCell className="capitalize">
                          {log.operation.replace('_', ' ')}
                        </TableCell>
                        <TableCell>
                          <Badge variant={log.status === 'success' ? 'success' : 'error'}>
                            {log.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm">
                          {formatDateTime(log.timestamp)}
                        </TableCell>
                        <TableCell>{log.attempts}</TableCell>
                        <TableCell>
                          {log.status === 'failure' && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleRetry(log._id)}
                            >
                              <RefreshCw className="h-3 w-3 mr-1" />
                              Retry
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {totalPages > 1 && (
                <div className="p-4 border-t border-border">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                  />
                </div>
              )}
            </>
          )}
        </Card>
      </div>
    </AdminLayout>
  );
};
