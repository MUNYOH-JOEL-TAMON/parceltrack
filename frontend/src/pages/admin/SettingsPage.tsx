import React, { useState } from 'react';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { Card, Button, Input } from '@/components/ui';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui';
import { User, Mail, Key } from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const { user } = useAuth();
  const { showToast } = useToast();

  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    // Implementation would connect to API
    showToast('Profile updated successfully', 'success');
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      showToast('Passwords do not match', 'error');
      return;
    }

    if (newPassword.length < 8) {
      showToast('Password must be at least 8 characters', 'error');
      return;
    }

    // Implementation would connect to API
    showToast('Password changed successfully', 'success');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  return (
    <AdminLayout title="Settings">
      <div className="max-w-2xl space-y-6">
        {/* Profile Settings */}
        <Card>
          <div className="flex items-center gap-2 mb-6">
            <User className="h-5 w-5 text-primary-blue" />
            <h2 className="text-lg font-semibold text-text-primary">
              Profile Information
            </h2>
          </div>

          <form onSubmit={handleUpdateProfile} className="space-y-4">
            <Input
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
            />

            <Input
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your.email@example.com"
            />

            <div className="pt-2">
              <Button type="submit">Save Changes</Button>
            </div>
          </form>
        </Card>

        {/* Password Change */}
        <Card>
          <div className="flex items-center gap-2 mb-6">
            <Key className="h-5 w-5 text-primary-blue" />
            <h2 className="text-lg font-semibold text-text-primary">
              Change Password
            </h2>
          </div>

          <form onSubmit={handleChangePassword} className="space-y-4">
            <Input
              label="Current Password"
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Enter current password"
            />

            <Input
              label="New Password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
              helperText="Must be at least 8 characters"
            />

            <Input
              label="Confirm New Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
            />

            <div className="pt-2">
              <Button type="submit">Change Password</Button>
            </div>
          </form>
        </Card>

        {/* Account Info */}
        <Card>
          <h2 className="text-lg font-semibold text-text-primary mb-4">
            Account Information
          </h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-text-secondary">Role</span>
              <span className="font-medium text-text-primary capitalize">{user?.role}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Account Created</span>
              <span className="font-medium text-text-primary">
                {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : '—'}
              </span>
            </div>
          </div>
        </Card>
      </div>
    </AdminLayout>
  );
};
