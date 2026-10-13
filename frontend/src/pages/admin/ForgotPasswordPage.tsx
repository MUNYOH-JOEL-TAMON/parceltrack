import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Package, Mail, CheckCircle2 } from 'lucide-react';
import { Button, Input } from '@/components/ui';
import { authService } from '@/services/api';
import { useToast } from '@/components/ui';

export const ForgotPasswordPage: React.FC = () => {
  const { showToast } = useToast();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.trim()) {
      setError('Email is required');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email');
      return;
    }

    setIsLoading(true);
    try {
      await authService.forgotPassword(email);
      setIsSuccess(true);
      showToast('Password reset instructions sent to your email', 'success');
    } catch (err: any) {
      const message = err.response?.data?.message || 'Failed to send reset email';
      setError(message);
      showToast(message, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-background-main flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-lg shadow-sm border border-border p-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-status-success-bg rounded-full mb-4">
              <CheckCircle2 className="h-8 w-8 text-status-success" />
            </div>
            <h2 className="text-2xl font-bold text-text-primary mb-2">
              Check Your Email
            </h2>
            <p className="text-text-secondary mb-6">
              We've sent password reset instructions to <strong>{email}</strong>
            </p>
            <p className="text-sm text-text-secondary mb-6">
              Didn't receive the email? Check your spam folder or try again.
            </p>
            <Link to="/admin/login">
              <Button variant="outline" className="w-full">
                Back to Login
              </Button>
            </Link>
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
          <h1 className="text-3xl font-bold text-primary-navy mb-2">
            Forgot Password
          </h1>
          <p className="text-text-secondary">
            Enter your email and we'll send you instructions to reset your password
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-lg shadow-sm border border-border p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Email Address"
              type="email"
              placeholder="admin@parceltrack.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (error) setError('');
              }}
              error={error}
              autoComplete="email"
            />

            <Button
              type="submit"
              className="w-full"
              size="lg"
              isLoading={isLoading}
            >
              <Mail className="h-5 w-5 mr-2" />
              Send Reset Instructions
            </Button>
          </form>
        </div>

        {/* Back to Login */}
        <div className="text-center mt-6">
          <Link
            to="/admin/login"
            className="text-sm text-text-secondary hover:text-text-primary"
          >
            ← Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};
