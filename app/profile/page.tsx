'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MainLayout } from '@/components/layout/main-layout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/lib/auth-context';
import { Save, LogOut, User, Mail, Phone } from 'lucide-react';

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '+91-98765-43210',
    location: 'Mumbai, India',
    bio: 'Seeking legal guidance and support',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    // Save functionality - in a real app, this would update the backend
    setIsEditing(false);
  };

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <MainLayout>
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Profile</h1>
          <p className="text-muted-foreground mt-2">Manage your account settings</p>
        </div>

        {/* Profile Card */}
        <Card className="p-8 bg-card border-border">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold">
                {user?.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground">{formData.name}</h2>
                <p className="text-muted-foreground">{formData.email}</p>
              </div>
            </div>
            <Button
              variant={isEditing ? 'default' : 'outline'}
              onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
              className={
                isEditing ? 'bg-accent hover:bg-accent/90 text-accent-foreground' : ''
              }
            >
              {isEditing ? (
                <>
                  <Save size={18} className="mr-2" />
                  Save Changes
                </>
              ) : (
                'Edit Profile'
              )}
            </Button>
          </div>

          {/* Profile Form */}
          <div className="space-y-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                <User size={16} />
                Full Name
              </label>
              {isEditing ? (
                <Input
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="bg-input border-border"
                />
              ) : (
                <p className="text-foreground">{formData.name}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                <Mail size={16} />
                Email Address
              </label>
              {isEditing ? (
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="bg-input border-border"
                />
              ) : (
                <p className="text-foreground">{formData.email}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                <Phone size={16} />
                Phone Number
              </label>
              {isEditing ? (
                <Input
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="bg-input border-border"
                />
              ) : (
                <p className="text-foreground">{formData.phone}</p>
              )}
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Location
              </label>
              {isEditing ? (
                <Input
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  className="bg-input border-border"
                />
              ) : (
                <p className="text-foreground">{formData.location}</p>
              )}
            </div>

            {/* Bio */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Bio</label>
              {isEditing ? (
                <textarea
                  value={formData.bio}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground placeholder-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
                  rows={4}
                />
              ) : (
                <p className="text-foreground">{formData.bio}</p>
              )}
            </div>
          </div>
        </Card>

        {/* Account Settings */}
        <Card className="p-6 bg-card border-border">
          <h3 className="text-lg font-semibold text-foreground mb-4">Account Settings</h3>

          <div className="space-y-4">
            {/* Member Since */}
            <div className="flex items-center justify-between py-3 border-b border-border">
              <span className="text-sm font-medium text-foreground">Member Since</span>
              <span className="text-sm text-muted-foreground">
                {new Date().toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
            </div>

            {/* Email Verification */}
            <div className="flex items-center justify-between py-3 border-b border-border">
              <span className="text-sm font-medium text-foreground">Email Verification</span>
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-green-100 text-green-800">
                Verified
              </span>
            </div>

            {/* Password */}
            <div className="flex items-center justify-between py-3 border-b border-border">
              <span className="text-sm font-medium text-foreground">Password</span>
              <Button variant="outline" size="sm">
                Change Password
              </Button>
            </div>

            {/* Two-Factor Auth */}
            <div className="flex items-center justify-between py-3">
              <span className="text-sm font-medium text-foreground">Two-Factor Authentication</span>
              <Button variant="outline" size="sm">
                Enable
              </Button>
            </div>
          </div>
        </Card>

        {/* Danger Zone */}
        <Card className="p-6 bg-destructive/10 border-2 border-destructive rounded-lg">
          <h3 className="text-lg font-semibold text-destructive mb-4">Logout</h3>
          <p className="text-sm text-foreground mb-4">
            Sign out from your account on this device.
          </p>
          <Button
            onClick={handleLogout}
            className="bg-destructive hover:bg-destructive/90 text-destructive-foreground gap-2"
          >
            <LogOut size={18} />
            Logout
          </Button>
        </Card>

        {/* Privacy Notice */}
        <Card className="p-4 bg-muted border-border">
          <p className="text-xs text-muted-foreground">
            Your privacy is important to us. All your personal information is securely encrypted and
            stored. We never share your data with third parties without your consent.
          </p>
        </Card>
      </div>
    </MainLayout>
  );
}
