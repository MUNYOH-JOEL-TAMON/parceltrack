import React, { useState } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { Package, Eye, EyeOff, CheckCircle2 } from 'lucide-react';
import { Button, Input } from '@/components/ui';
import { authService } from '@/services/api';
import { useToast } from '@/components/ui';

export const ResetPasswordPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const token = searchParams.get('token');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<{ password?: string; confirmPassword?: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!token) {
    return (
      <div className="min-h-screen bg-background-main flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <h2 className="text-2xl font-bold text-text-primary mb-2">Invalid Reset Link</h2>
          <p className="text-text-secondary mb-6">This password reset link is invalid or has expired.</p>
          <Link to="/admin/forgot-password">
            <Button>Request New Reset Link</Button>
          </Link>
        </div>
      </div>
    );
  }

  const validateForm = () => {
    const newErrors: { password?: string; confirmPassword?: string } = {};

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
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
      await authService.resetPassword(token, password);
      setIsSuccess(true);
      showToast('Password reset successful', 'success');
      setTimeout(() => {
        navigate('/admin/login');
      }, 2000);
    } catch (err: any) {
      const message = err.response?.data?.message || 'Failed to reset password';
      showToast(message, 'error');
      setErrors({ password: message });
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-background-main flex items-center justify-center px-4">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-lg shadow-sm border border-border p-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-status-success-bg rounded-full mb-4">
              <CheckCircle2 className="h-8 w-8 text-status-success" />
            </div>
            <h2 className="text-2xl font-bold text-text-primary mb-2">Password Reset Complete</h2>
            <p className="text-text-secondary mb-6">
              Your password has been successfully reset. Redirecting to login...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background-main flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-primary-navy rounded-lg p-3">
              <Package className="h-10 w-10 text-primary-blue" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-primary-navy mb-2">Reset Password</h1>
          <p className="text-text-secondary">Enter your new password below</p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-lg shadow-sm border border-border p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <Input
                label="New Password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter new password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password) setErrors({ ...errors, password: undefined });
                }}
                error={errors.password}
                helperText="Must be at least 8 characters"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-[38px] text-text-secondary hover:text-text-primary"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>

            <div className="relative">
              <Input
                label="Confirm Password"
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  if (errors.confirmPassword) setErrors({ ...errors, confirmPassword: undefined });
                }}
                error={errors.confirmPassword}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-[38px] text-text-secondary hover:text-text-primary"
              >
                {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>

            <Button type="submit" className="w-full" size="lg" isLoading={isLoading}>
              Reset Password
            </Button>
          </form>
        </div>

        {/* Back to Login */}
        <div className="text-center mt-6">
          <Link to="/admin/login" className="text-sm text-text-secondary hover:text-text-primary">
            ← Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};
