'use client';

import { useState } from 'react';
import { MainLayout } from '@/components/layout/main-layout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Briefcase, FileText, Users, TrendingUp, Search } from 'lucide-react';

interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  activeCases: number;
  lastContact: string;
}

interface ClientCase {
  id: string;
  caseNumber: string;
  client: string;
  type: string;
  status: 'Active' | 'Concluded' | 'On Hold';
  nextDate: string;
}

export default function CourtAgentDashboard() {
  const [clients, setClients] = useState<Client[]>([
    {
      id: '1',
      name: 'Ramesh Kumar',
      email: 'ramesh.kumar@email.com',
      phone: '+91 9876543210',
      activeCases: 2,
      lastContact: '2024-04-03',
    },
    {
      id: '2',
      name: 'Priya Sharma',
      email: 'priya.sharma@email.com',
      phone: '+91 9876543211',
      activeCases: 1,
      lastContact: '2024-04-02',
    },
    {
      id: '3',
      name: 'Amit Patel',
      email: 'amit.patel@email.com',
      phone: '+91 9876543212',
      activeCases: 3,
      lastContact: '2024-04-01',
    },
  ]);

  const [cases, setCases] = useState<ClientCase[]>([
    {
      id: '1',
      caseNumber: 'CC-2024-001',
      client: 'Ramesh Kumar',
      type: 'Consumer Complaint',
      status: 'Active',
      nextDate: '2024-04-15',
    },
    {
      id: '2',
      caseNumber: 'CD-2023-045',
      client: 'Priya Sharma',
      type: 'Property Dispute',
      status: 'Active',
      nextDate: '2024-04-20',
    },
    {
      id: '3',
      caseNumber: 'LD-2024-008',
      client: 'Amit Patel',
      type: 'Labor Dispute',
      status: 'Active',
      nextDate: '2024-04-10',
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  const stats = [
    { label: 'Total Clients', value: clients.length, icon: Users, color: 'text-blue-600' },
    { label: 'Active Cases', value: cases.filter(c => c.status === 'Active').length, icon: Briefcase, color: 'text-green-600' },
    { label: 'Documents Created', value: '156', icon: FileText, color: 'text-purple-600' },
    { label: 'Success Rate', value: '87%', icon: TrendingUp, color: 'text-amber-600' },
  ];

  const filteredClients = clients.filter(c =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredCases = cases.filter(c =>
    c.caseNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.client.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const statusColors: Record<string, string> = {
    'Active': 'bg-green-100 text-green-800',
    'Concluded': 'bg-blue-100 text-blue-800',
    'On Hold': 'bg-amber-100 text-amber-800',
  };

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-start justify-between flex-col md:flex-row gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Court Agent Dashboard</h1>
            <p className="text-muted-foreground mt-2">
              Manage your clients and cases efficiently
            </p>
          </div>
          <Button size="lg">
            <Plus className="mr-2" size={18} />
            Add New Client
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="p-6 bg-card border-border">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                    <p className="text-3xl font-bold text-foreground mt-2">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-lg bg-opacity-10 ${stat.color}`}>
                    <Icon size={24} className={stat.color} />
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Tabs */}
        <Tabs defaultValue="clients" className="w-full">
          <TabsList className="bg-secondary/10">
            <TabsTrigger value="clients">Clients</TabsTrigger>
            <TabsTrigger value="cases">Cases</TabsTrigger>
          </TabsList>

          {/* Clients Tab */}
          <TabsContent value="clients" className="space-y-6">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-3 text-muted-foreground" size={20} />
              <Input
                placeholder="Search clients by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-input border-border"
              />
            </div>

            {/* Clients Table */}
            <Card className="bg-card border-border overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-secondary/5 border-b border-border">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Client Name</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Email</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Phone</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Active Cases</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Last Contact</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {filteredClients.map((client) => (
                      <tr key={client.id} className="hover:bg-secondary/5 transition-colors">
                        <td className="px-6 py-4 text-sm text-foreground font-medium">{client.name}</td>
                        <td className="px-6 py-4 text-sm text-muted-foreground">{client.email}</td>
                        <td className="px-6 py-4 text-sm text-muted-foreground">{client.phone}</td>
                        <td className="px-6 py-4">
                          <Badge variant="secondary">{client.activeCases} active</Badge>
                        </td>
                        <td className="px-6 py-4 text-sm text-muted-foreground">
                          {new Date(client.lastContact).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4">
                          <Button variant="outline" size="sm">View</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </TabsContent>

          {/* Cases Tab */}
          <TabsContent value="cases" className="space-y-6">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-3 text-muted-foreground" size={20} />
              <Input
                placeholder="Search cases by number or client..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-input border-border"
              />
            </div>

            {/* Cases Table */}
            <Card className="bg-card border-border overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-secondary/5 border-b border-border">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Case Number</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Client</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Type</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Status</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Next Date</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {filteredCases.map((caseItem) => (
                      <tr key={caseItem.id} className="hover:bg-secondary/5 transition-colors">
                        <td className="px-6 py-4 text-sm font-semibold text-foreground">{caseItem.caseNumber}</td>
                        <td className="px-6 py-4 text-sm text-foreground">{caseItem.client}</td>
                        <td className="px-6 py-4 text-sm text-muted-foreground">{caseItem.type}</td>
                        <td className="px-6 py-4">
                          <Badge className={statusColors[caseItem.status]}>
                            {caseItem.status}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 text-sm text-muted-foreground">
                          {new Date(caseItem.nextDate).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4">
                          <Button variant="outline" size="sm">Edit</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Quick Actions */}
        <Card className="p-8 bg-gradient-to-br from-accent/10 to-primary/10 border-accent/30">
          <h3 className="text-xl font-semibold text-foreground mb-6">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Button variant="outline" className="justify-start">
              <FileText className="mr-2" size={18} />
              Generate Bulk Documents
            </Button>
            <Button variant="outline" className="justify-start">
              <Users className="mr-2" size={18} />
              Schedule Client Meeting
            </Button>
            <Button variant="outline" className="justify-start">
              <Briefcase className="mr-2" size={18} />
              File New Case
            </Button>
            <Button variant="outline" className="justify-start">
              <TrendingUp className="mr-2" size={18} />
              View Analytics
            </Button>
          </div>
        </Card>
      </div>
    </MainLayout>
  );
}
