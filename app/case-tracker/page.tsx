'use client';

import { useState } from 'react';
import { MainLayout } from '@/components/layout/main-layout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { AlertCircle, Plus, Calendar, FileText, Trash2, Edit2 } from 'lucide-react';

interface Case {
  id: string;
  title: string;
  caseNumber: string;
  status: 'Filed' | 'Hearing Scheduled' | 'Pending Decision' | 'Appealed';
  nextDate: string;
  court: string;
  notes: string;
}

const statusColors: Record<string, string> = {
  'Filed': 'bg-blue-100 text-blue-800',
  'Hearing Scheduled': 'bg-amber-100 text-amber-800',
  'Pending Decision': 'bg-purple-100 text-purple-800',
  'Appealed': 'bg-red-100 text-red-800',
};

export default function CaseTrackerPage() {
  const [cases, setCases] = useState<Case[]>([
    {
      id: '1',
      title: 'Consumer Complaint - Product Defect',
      caseNumber: 'CC-2024-001',
      status: 'Hearing Scheduled',
      nextDate: '2024-04-15',
      court: 'Consumer Forum, Mumbai',
      notes: 'Evidence submitted. Waiting for hearing',
    },
    {
      id: '2',
      title: 'Property Dispute',
      caseNumber: 'CD-2023-045',
      status: 'Pending Decision',
      nextDate: '2024-05-20',
      court: 'Civil Court, District Court',
      notes: 'Final arguments completed',
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    caseNumber: '',
    status: 'Filed' as const,
    nextDate: '',
    court: '',
    notes: '',
  });

  const [editingId, setEditingId] = useState<string | null>(null);

  const handleAddCase = () => {
    if (formData.title && formData.caseNumber && formData.nextDate) {
      if (editingId) {
        setCases(cases.map(c => c.id === editingId ? { ...formData, id: editingId } : c));
        setEditingId(null);
      } else {
        setCases([...cases, { ...formData, id: Date.now().toString() }]);
      }
      setFormData({
        title: '',
        caseNumber: '',
        status: 'Filed',
        nextDate: '',
        court: '',
        notes: '',
      });
      setShowForm(false);
    }
  };

  const handleEdit = (caseItem: Case) => {
    setFormData(caseItem);
    setEditingId(caseItem.id);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    setCases(cases.filter(c => c.id !== id));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const daysUntilHearing = (dateString: string) => {
    const today = new Date();
    const hearing = new Date(dateString);
    const diff = Math.ceil((hearing.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return diff;
  };

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-start justify-between flex-col md:flex-row gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Case Tracker</h1>
            <p className="text-muted-foreground mt-2">
              Monitor your legal cases and important dates
            </p>
          </div>
          <Button onClick={() => { setShowForm(!showForm); setEditingId(null); setFormData({ title: '', caseNumber: '', status: 'Filed', nextDate: '', court: '', notes: '' }); }} size="lg">
            <Plus className="mr-2" size={18} />
            {showForm ? 'Cancel' : 'Add Case'}
          </Button>
        </div>

        {/* Form */}
        {showForm && (
          <Card className="p-8 bg-card border-border space-y-6">
            <h2 className="text-2xl font-semibold text-foreground">
              {editingId ? 'Edit Case' : 'Add New Case'}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Case Title</label>
                <Input
                  placeholder="e.g., Consumer Complaint - Product Defect"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="bg-input border-border"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Case Number</label>
                <Input
                  placeholder="e.g., CC-2024-001"
                  value={formData.caseNumber}
                  onChange={(e) => setFormData({ ...formData, caseNumber: e.target.value })}
                  className="bg-input border-border"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                  className="w-full p-2 border border-border rounded-md bg-input"
                >
                  <option value="Filed">Filed</option>
                  <option value="Hearing Scheduled">Hearing Scheduled</option>
                  <option value="Pending Decision">Pending Decision</option>
                  <option value="Appealed">Appealed</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Next Hearing Date</label>
                <Input
                  type="date"
                  value={formData.nextDate}
                  onChange={(e) => setFormData({ ...formData, nextDate: e.target.value })}
                  className="bg-input border-border"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium text-foreground">Court/Forum Name</label>
                <Input
                  placeholder="e.g., Consumer Forum, Mumbai"
                  value={formData.court}
                  onChange={(e) => setFormData({ ...formData, court: e.target.value })}
                  className="bg-input border-border"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium text-foreground">Notes</label>
                <Textarea
                  placeholder="Add any important notes about the case..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  rows={3}
                  className="bg-input border-border"
                />
              </div>
            </div>

            <Button onClick={handleAddCase} className="w-full" size="lg">
              {editingId ? 'Update Case' : 'Add Case'}
            </Button>
          </Card>
        )}

        {/* Cases List */}
        {cases.length === 0 ? (
          <Card className="p-12 bg-card border-border text-center">
            <FileText className="mx-auto text-muted-foreground mb-4" size={48} />
            <h3 className="text-xl font-semibold text-foreground mb-2">No Cases Yet</h3>
            <p className="text-muted-foreground mb-6">
              Add your first case to start tracking
            </p>
            <Button onClick={() => setShowForm(true)}>
              <Plus className="mr-2" size={18} />
              Add Your First Case
            </Button>
          </Card>
        ) : (
          <div className="space-y-4">
            {cases.map((caseItem) => {
              const daysLeft = daysUntilHearing(caseItem.nextDate);
              const isUrgent = daysLeft <= 7 && daysLeft > 0;

              return (
                <Card key={caseItem.id} className="p-6 bg-card border-border hover:border-accent/50 transition-colors">
                  <div className="flex items-start justify-between gap-4 flex-col md:flex-row">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-lg font-semibold text-foreground">
                          {caseItem.title}
                        </h3>
                        <Badge className={statusColors[caseItem.status]}>
                          {caseItem.status}
                        </Badge>
                        {isUrgent && (
                          <Badge variant="destructive">Urgent</Badge>
                        )}
                      </div>

                      <div className="space-y-2 text-sm">
                        <div className="flex gap-4 text-muted-foreground flex-wrap">
                          <span><strong>Case #:</strong> {caseItem.caseNumber}</span>
                          <span><strong>Court:</strong> {caseItem.court}</span>
                        </div>

                        <div className="flex items-center gap-2 text-foreground">
                          <Calendar size={16} className="text-accent" />
                          <strong>Next Hearing:</strong> {formatDate(caseItem.nextDate)}
                          {daysLeft >= 0 && (
                            <span className={isUrgent ? 'text-red-600 font-semibold' : 'text-muted-foreground'}>
                              ({daysLeft} days away)
                            </span>
                          )}
                        </div>

                        {caseItem.notes && (
                          <div className="mt-3 p-3 bg-secondary/10 rounded-lg border border-border">
                            <p className="text-foreground"><strong>Notes:</strong> {caseItem.notes}</p>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(caseItem)}
                      >
                        <Edit2 size={16} />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(caseItem.id)}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        )}

        {/* Tips Card */}
        {cases.length > 0 && (
          <Card className="p-6 bg-blue-50 border border-blue-200">
            <div className="flex gap-4">
              <AlertCircle className="text-blue-600 flex-shrink-0" size={24} />
              <div>
                <h4 className="font-semibold text-blue-900 mb-2">Case Tracking Tips</h4>
                <ul className="text-sm text-blue-800 space-y-1 list-disc pl-5">
                  <li>Keep all court documents and notices safely</li>
                  <li>Maintain a copy of this tracking information</li>
                  <li>Contact your lawyer before the hearing date</li>
                  <li>Arrive at least 15 minutes early for hearings</li>
                  <li>Update status after each hearing</li>
                </ul>
              </div>
            </div>
          </Card>
        )}
      </div>
    </MainLayout>
  );
}
