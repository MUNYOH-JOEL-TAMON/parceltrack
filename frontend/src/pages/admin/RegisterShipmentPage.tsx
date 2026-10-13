import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { Card, Button, Input, Select } from '@/components/ui';
import { shipmentService } from '@/services/api';
import { useToast } from '@/components/ui';
import { ArrowLeft } from 'lucide-react';

export const RegisterShipmentPage: React.FC = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    trackingNumber: '',
    courier: 'auto',
    origin: '',
    destination: '',
    internalReference: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const courierOptions = [
    { value: 'auto', label: 'Auto-detect Courier' },
    { value: 'dhl', label: 'DHL' },
    { value: 'fedex', label: 'FedEx' },
    { value: 'ups', label: 'UPS' },
    { value: 'usps', label: 'USPS' },
    { value: 'aramex', label: 'Aramex' },
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.trackingNumber.trim()) {
      newErrors.trackingNumber = 'Tracking number is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      const data: any = {
        trackingNumber: formData.trackingNumber.trim(),
      };

      if (formData.courier !== 'auto') data.courier = formData.courier;
      if (formData.origin.trim()) data.origin = formData.origin.trim();
      if (formData.destination.trim()) data.destination = formData.destination.trim();
      if (formData.internalReference.trim()) data.internalReference = formData.internalReference.trim();

      const response = await shipmentService.registerShipment(data);
      showToast('Shipment registered successfully', 'success');
      navigate(`/admin/shipments/${response.data.data._id}`);
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to register shipment';
      showToast(message, 'error');
      if (error.response?.data?.field) {
        setErrors({ [error.response.data.field]: message });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  return (
    <AdminLayout title="Register New Shipment">
      <div className="max-w-2xl">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate('/admin/shipments')}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Shipments
        </Button>

        <Card>
          <h2 className="text-xl font-semibold text-text-primary mb-6">
            Shipment Information
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Tracking Number"
              placeholder="Enter tracking number"
              value={formData.trackingNumber}
              onChange={(e) => handleChange('trackingNumber', e.target.value)}
              error={errors.trackingNumber}
              helperText="Required field"
            />

            <Select
              label="Courier"
              options={courierOptions}
              value={formData.courier}
              onChange={(e) => handleChange('courier', e.target.value)}
            />

            <Input
              label="Origin (Optional)"
              placeholder="e.g., New York, USA"
              value={formData.origin}
              onChange={(e) => handleChange('origin', e.target.value)}
              error={errors.origin}
            />

            <Input
              label="Destination (Optional)"
              placeholder="e.g., Los Angeles, USA"
              value={formData.destination}
              onChange={(e) => handleChange('destination', e.target.value)}
              error={errors.destination}
            />

            <Input
              label="Internal Reference (Optional)"
              placeholder="Order ID, invoice number, etc."
              value={formData.internalReference}
              onChange={(e) => handleChange('internalReference', e.target.value)}
              error={errors.internalReference}
            />

            <div className="flex gap-3 pt-4">
              <Button type="submit" isLoading={isLoading}>
                Register Shipment
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/admin/shipments')}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </AdminLayout>
  );
};
