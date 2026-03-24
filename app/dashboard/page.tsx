'use client';

import { useAuth } from '@/lib/auth-context';
import { MainLayout } from '@/components/layout/main-layout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  MessageCircle,
  FileText,
  Users,
  TrendingUp,
  CheckCircle,
  Clock,
} from 'lucide-react';
import Link from 'next/link';

const stats = [
  {
    label: 'Documents Generated',
    value: '24',
    icon: FileText,
    color: 'text-primary',
  },
  {
    label: 'Queries Solved',
    value: '156',
    icon: CheckCircle,
    color: 'text-accent',
  },
  {
    label: 'Hours Saved',
    value: '42',
    icon: Clock,
    color: 'text-secondary',
  },
];

const quickAccess = [
  {
    title: 'Ask AI Assistant',
    description: 'Get immediate legal guidance for common issues',
    href: '/assistant',
    icon: MessageCircle,
    color: 'bg-primary/10 text-primary',
  },
  {
    title: 'Generate Documents',
    description: 'Create legal documents with guided forms',
    href: '/documents',
    icon: FileText,
    color: 'bg-accent/10 text-accent',
  },
  {
    title: 'Find Legal Expert',
    description: 'Connect with qualified lawyers near you',
    href: '/lawyers',
    icon: Users,
    color: 'bg-secondary/10 text-secondary',
  },
];

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Welcome back, {user?.name}
            </h1>
            <p className="text-muted-foreground mt-2">
              Here's what's happening with your legal journey today
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="p-6 bg-card border-border">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {stat.label}
                    </p>
                    <p className="text-3xl font-bold text-foreground mt-2">
                      {stat.value}
                    </p>
                  </div>
                  <div className={`p-3 rounded-lg ${stat.color} bg-opacity-10`}>
                    <Icon size={24} className={stat.color} />
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Quick Access */}
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-4">Quick Access</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {quickAccess.map((item, index) => {
              const Icon = item.icon;
              return (
                <Link key={index} href={item.href}>
                  <Card className="p-6 bg-card border-border hover:border-accent/50 transition-colors cursor-pointer h-full">
                    <div className={`w-12 h-12 rounded-lg ${item.color} flex items-center justify-center mb-4`}>
                      <Icon size={24} />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Recent Activity */}
        <Card className="p-6 bg-card border-border">
          <h2 className="text-lg font-semibold text-foreground mb-4">
            Recent Activity
          </h2>
          <div className="space-y-4">
            {[
              {
                action: 'Generated',
                item: 'Complaint Letter',
                time: '2 hours ago',
              },
              {
                action: 'Consulted',
                item: 'Consumer Rights Guide',
                time: '1 day ago',
              },
              {
                action: 'Viewed',
                item: 'Top Lawyers in Mumbai',
                time: '3 days ago',
              },
            ].map((activity, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-2 border-b border-border last:border-0"
              >
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {activity.action}: <span className="text-accent">{activity.item}</span>
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {activity.time}
                  </p>
                </div>
                <TrendingUp size={16} className="text-muted-foreground" />
              </div>
            ))}
          </div>
        </Card>
      </div>
    </MainLayout>
  );
}
