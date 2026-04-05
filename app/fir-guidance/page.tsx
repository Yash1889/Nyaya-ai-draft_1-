'use client';

import { useState } from 'react';
import { MainLayout } from '@/components/layout/main-layout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { CheckCircle2, AlertCircle, Download, ArrowRight } from 'lucide-react';

const issueTypes = [
  'Harassment/Abuse',
  'Fraud/Scam',
  'Theft/Robbery',
  'Cyber Crime',
  'Domestic Violence',
  'Property Dispute',
  'Employment Issue',
  'Defamation',
];

export default function FIRGuidancePage() {
  const [step, setStep] = useState<'select' | 'details' | 'preview'>('select');
  const [selectedIssue, setSelectedIssue] = useState<string>('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');

  const handleNext = () => {
    if (selectedIssue) {
      setStep('details');
    }
  };

  const handleGenerate = () => {
    if (description && location) {
      setStep('preview');
    }
  };

  const generateFIRContent = () => {
    return `
FIRST INFORMATION REPORT (FIR)

Report Type: ${selectedIssue}
Date of Report: ${new Date().toLocaleDateString()}
Location: ${location}

DESCRIPTION OF INCIDENT:
${description}

STEPS TO FILE THIS FIR:
1. Visit your nearest police station
2. Request the duty officer for FIR registration
3. Provide copies of this report
4. Answer questions about the incident
5. Verify and sign the FIR
6. Request acknowledgment copy (Important!)
7. Keep the FIR number for reference

DOCUMENTS TO BRING:
- Valid ID proof (Aadhaar, Passport, Driving License)
- Address proof
- Any evidence or photographs
- Written description of incident
- Contact details of witnesses (if any)

YOUR RIGHTS:
- Right to file FIR without police permission
- Right to get copies of FIR
- Right to seek police protection
- Right to appeal if FIR not registered

NEXT STEPS AFTER FIR:
1. Investigation will begin
2. Police will contact you for details
3. Regular follow-ups are essential
4. Consult a lawyer for further action
5. Maintain all evidence carefully
    `;
  };

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">File a Complaint / FIR</h1>
          <p className="text-muted-foreground mt-2">
            Step-by-step guidance to file a formal complaint or First Information Report
          </p>
        </div>

        {/* Step Indicator */}
        <div className="flex gap-4 items-center">
          <div className={`flex items-center justify-center w-10 h-10 rounded-full font-semibold ${step === 'select' || ['details', 'preview'].includes(step) ? 'bg-accent text-primary' : 'bg-muted text-muted-foreground'}`}>
            1
          </div>
          <div className={`flex-1 h-1 ${['details', 'preview'].includes(step) ? 'bg-accent' : 'bg-muted'}`}></div>
          <div className={`flex items-center justify-center w-10 h-10 rounded-full font-semibold ${step === 'details' || step === 'preview' ? 'bg-accent text-primary' : 'bg-muted text-muted-foreground'}`}>
            2
          </div>
          <div className={`flex-1 h-1 ${step === 'preview' ? 'bg-accent' : 'bg-muted'}`}></div>
          <div className={`flex items-center justify-center w-10 h-10 rounded-full font-semibold ${step === 'preview' ? 'bg-accent text-primary' : 'bg-muted text-muted-foreground'}`}>
            3
          </div>
        </div>

        {/* Step 1: Select Issue */}
        {step === 'select' && (
          <Card className="p-8 bg-card border-border">
            <h2 className="text-2xl font-semibold text-foreground mb-6">What type of issue do you want to report?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {issueTypes.map((issue) => (
                <button
                  key={issue}
                  onClick={() => setSelectedIssue(issue)}
                  className={`p-4 rounded-lg border-2 transition-all text-left font-medium ${
                    selectedIssue === issue
                      ? 'border-accent bg-accent/10 text-primary'
                      : 'border-border bg-card hover:border-accent/50'
                  }`}
                >
                  {issue}
                </button>
              ))}
            </div>
            <Button onClick={handleNext} disabled={!selectedIssue} className="mt-8 w-full" size="lg">
              Continue <ArrowRight className="ml-2" size={18} />
            </Button>
          </Card>
        )}

        {/* Step 2: Details */}
        {step === 'details' && (
          <Card className="p-8 bg-card border-border space-y-6">
            <div>
              <h2 className="text-2xl font-semibold text-foreground mb-2">Issue Type: {selectedIssue}</h2>
              <p className="text-muted-foreground">Provide detailed information about the incident</p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Location of Incident</label>
              <Input
                placeholder="e.g., Mumbai, Maharashtra"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="bg-input border-border"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Description of Incident</label>
              <Textarea
                placeholder="Describe what happened in detail..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={6}
                className="bg-input border-border"
              />
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex gap-3">
                <AlertCircle className="text-blue-600 flex-shrink-0" size={20} />
                <div className="text-sm text-blue-800">
                  <p className="font-semibold mb-1">Be detailed and factual</p>
                  <p>Include specific dates, times, names of people involved, and what exactly happened.</p>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <Button variant="outline" onClick={() => setStep('select')} className="flex-1">
                Back
              </Button>
              <Button onClick={handleGenerate} disabled={!description || !location} className="flex-1">
                Generate FIR Draft <ArrowRight className="ml-2" size={18} />
              </Button>
            </div>
          </Card>
        )}

        {/* Step 3: Preview */}
        {step === 'preview' && (
          <Card className="p-8 bg-card border-border space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <CheckCircle2 className="text-green-600" size={28} />
              <div>
                <h2 className="text-2xl font-semibold text-foreground">FIR Draft Ready</h2>
                <p className="text-muted-foreground">Review and download your complaint</p>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg border border-border whitespace-pre-wrap text-sm font-mono text-foreground max-h-96 overflow-auto">
              {generateFIRContent()}
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <div className="flex gap-3">
                <AlertCircle className="text-amber-600 flex-shrink-0" size={20} />
                <div className="text-sm text-amber-900">
                  <p className="font-semibold mb-1">Important Notice</p>
                  <p>This is a guidance document. The actual FIR will be registered by the police officer. Provide accurate information only.</p>
                </div>
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="font-semibold text-green-900 mb-3">What happens next:</h3>
              <ol className="text-sm text-green-900 space-y-2 list-decimal pl-5">
                <li>Visit your nearest police station with this draft</li>
                <li>File the formal FIR with police officer</li>
                <li>You'll receive an FIR number (Important for future reference)</li>
                <li>Investigation will begin</li>
                <li>Keep in touch with investigating officer</li>
                <li>Consult a lawyer if needed</li>
              </ol>
            </div>

            <div className="flex gap-4">
              <Button variant="outline" onClick={() => setStep('details')} className="flex-1">
                Edit Details
              </Button>
              <Button className="flex-1">
                <Download className="mr-2" size={18} />
                Download as PDF
              </Button>
            </div>
          </Card>
        )}
      </div>
    </MainLayout>
  );
}
