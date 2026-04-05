'use client';

import { useState } from 'react';
import { MainLayout } from '@/components/layout/main-layout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertCircle, TrendingUp, Clock, Scale } from 'lucide-react';

const caseTypes = [
  'Consumer Complaint',
  'Labor Dispute',
  'Property Dispute',
  'Family Matter',
  'Cyber Crime',
  'Traffic Violation',
];

const severityLevels = ['Low', 'Medium', 'High', 'Critical'];
const evidenceStrengths = ['Weak', 'Moderate', 'Strong', 'Very Strong'];

const outcomeDatabase: Record<string, Record<string, Record<string, any>>> = {
  'Consumer Complaint': {
    'Low': {
      'Weak': { outcome: 'Case Dismissal Likely', probability: '45%', timeMonths: '4-6', path: 'Consumer Forum/Court' },
      'Moderate': { outcome: 'Partial Settlement', probability: '65%', timeMonths: '3-5', path: 'Settlement/Consumer Forum' },
      'Strong': { outcome: 'Full Relief', probability: '85%', timeMonths: '2-3', path: 'Consumer Forum' },
      'Very Strong': { outcome: 'Full Relief with Compensation', probability: '95%', timeMonths: '1-2', path: 'Consumer Forum' },
    },
    'Medium': {
      'Weak': { outcome: 'Settlement Possible', probability: '55%', timeMonths: '6-8', path: 'Negotiation/Court' },
      'Moderate': { outcome: 'Partial Relief', probability: '70%', timeMonths: '4-6', path: 'Court/Settlement' },
      'Strong': { outcome: 'Full Relief', probability: '88%', timeMonths: '3-4', path: 'Consumer Forum' },
      'Very Strong': { outcome: 'Full Relief + Punitive Damages', probability: '96%', timeMonths: '2-3', path: 'Consumer Forum' },
    },
    'High': {
      'Weak': { outcome: 'Long Litigation', probability: '35%', timeMonths: '12-18', path: 'Higher Court' },
      'Moderate': { outcome: 'Substantial Relief', probability: '60%', timeMonths: '8-12', path: 'Consumer Forum/Higher Court' },
      'Strong': { outcome: 'Full Relief Likely', probability: '82%', timeMonths: '6-8', path: 'Higher Court' },
      'Very Strong': { outcome: 'Full Relief Assured', probability: '94%', timeMonths: '4-6', path: 'Consumer Forum' },
    },
    'Critical': {
      'Weak': { outcome: 'Difficult Case', probability: '25%', timeMonths: '18-24', path: 'Supreme Court/Higher Court' },
      'Moderate': { outcome: 'Moderate Success', probability: '50%', timeMonths: '12-18', path: 'Higher Court' },
      'Strong': { outcome: 'Favorable Outcome', probability: '75%', timeMonths: '8-12', path: 'Higher Court' },
      'Very Strong': { outcome: 'Strong Chance of Relief', probability: '90%', timeMonths: '6-10', path: 'Higher Court' },
    },
  },
  'Labor Dispute': {
    'Low': {
      'Weak': { outcome: 'Settlement Likely', probability: '60%', timeMonths: '2-4', path: 'Negotiation' },
      'Moderate': { outcome: 'Favorable Settlement', probability: '75%', timeMonths: '2-3', path: 'Labor Board' },
      'Strong': { outcome: 'Full Compensation', probability: '88%', timeMonths: '1-2', path: 'Labor Court' },
      'Very Strong': { outcome: 'Full Relief + Penalties', probability: '96%', timeMonths: '1-2', path: 'Labor Court' },
    },
    'Medium': {
      'Weak': { outcome: 'Partial Relief', probability: '55%', timeMonths: '4-6', path: 'Labor Court' },
      'Moderate': { outcome: 'Good Chance of Relief', probability: '70%', timeMonths: '3-4', path: 'Labor Court' },
      'Strong': { outcome: 'Relief Assured', probability: '85%', timeMonths: '2-3', path: 'Labor Court' },
      'Very Strong': { outcome: 'Full Relief + Compensation', probability: '94%', timeMonths: '2-3', path: 'Labor Court' },
    },
    'High': {
      'Weak': { outcome: 'Long Process', probability: '40%', timeMonths: '8-12', path: 'Higher Court' },
      'Moderate': { outcome: 'Moderate Success', probability: '60%', timeMonths: '6-8', path: 'Labor Court/Higher Court' },
      'Strong': { outcome: 'Strong Relief', probability: '80%', timeMonths: '4-6', path: 'Labor Court' },
      'Very Strong': { outcome: 'Full Relief Likely', probability: '92%', timeMonths: '3-4', path: 'Labor Court' },
    },
    'Critical': {
      'Weak': { outcome: 'Very Difficult', probability: '20%', timeMonths: '12-18', path: 'Higher Court' },
      'Moderate': { outcome: 'Moderate Relief', probability: '50%', timeMonths: '10-14', path: 'Higher Court' },
      'Strong': { outcome: 'Good Relief', probability: '72%', timeMonths: '6-8', path: 'Higher Court' },
      'Very Strong': { outcome: 'Relief Probable', probability: '88%', timeMonths: '5-7', path: 'Higher Court' },
    },
  },
  'Property Dispute': {
    'Low': {
      'Weak': { outcome: 'Dispute Resolution', probability: '50%', timeMonths: '6-8', path: 'Civil Court' },
      'Moderate': { outcome: 'Favorable Resolution', probability: '68%', timeMonths: '4-6', path: 'Civil Court' },
      'Strong': { outcome: 'Relief Likely', probability: '82%', timeMonths: '3-4', path: 'Civil Court' },
      'Very Strong': { outcome: 'Full Relief', probability: '94%', timeMonths: '2-3', path: 'Civil Court' },
    },
    'Medium': {
      'Weak': { outcome: 'Contested Case', probability: '45%', timeMonths: '8-10', path: 'Civil Court/Higher Court' },
      'Moderate': { outcome: 'Partial Relief', probability: '62%', timeMonths: '6-8', path: 'Civil Court' },
      'Strong': { outcome: 'Strong Relief', probability: '80%', timeMonths: '4-5', path: 'Civil Court' },
      'Very Strong': { outcome: 'Full Relief Assured', probability: '92%', timeMonths: '3-4', path: 'Civil Court' },
    },
    'High': {
      'Weak': { outcome: 'Lengthy Litigation', probability: '35%', timeMonths: '12-18', path: 'Higher Court' },
      'Moderate': { outcome: 'Moderate Relief', probability: '55%', timeMonths: '9-12', path: 'Civil Court/Higher Court' },
      'Strong': { outcome: 'Good Relief', probability: '75%', timeMonths: '6-8', path: 'Higher Court' },
      'Very Strong': { outcome: 'Relief Likely', probability: '90%', timeMonths: '5-6', path: 'Higher Court' },
    },
    'Critical': {
      'Weak': { outcome: 'Very Complex', probability: '25%', timeMonths: '18-24', path: 'Supreme Court' },
      'Moderate': { outcome: 'Uncertain Outcome', probability: '45%', timeMonths: '14-18', path: 'Higher Court' },
      'Strong': { outcome: 'Favorable Outcome', probability: '70%', timeMonths: '10-12', path: 'Higher Court' },
      'Very Strong': { outcome: 'Good Chance', probability: '85%', timeMonths: '8-10', path: 'Higher Court' },
    },
  },
};

export default function OutcomeSim ulatorPage() {
  const [caseType, setCaseType] = useState('');
  const [severity, setSeverity] = useState('');
  const [evidence, setEvidence] = useState('');
  const [result, setResult] = useState<any>(null);

  const handleSimulate = () => {
    if (caseType && severity && evidence) {
      const simulation = outcomeDatabase[caseType]?.[severity]?.[evidence] || {
        outcome: 'Unable to predict',
        probability: 'N/A',
        timeMonths: 'Varies',
        path: 'Consult a lawyer',
      };
      setResult(simulation);
    }
  };

  const getProbabilityColor = (probability: string) => {
    const num = parseInt(probability);
    if (num >= 80) return 'text-green-600';
    if (num >= 60) return 'text-blue-600';
    if (num >= 40) return 'text-amber-600';
    return 'text-red-600';
  };

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Case Outcome Simulator</h1>
          <p className="text-muted-foreground mt-2">
            Get a prediction on your case based on similar cases
          </p>
        </div>

        {/* Input Card */}
        <Card className="p-8 bg-card border-border space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Case Type</label>
              <Select value={caseType} onValueChange={setCaseType}>
                <SelectTrigger className="bg-input border-border">
                  <SelectValue placeholder="Select case type" />
                </SelectTrigger>
                <SelectContent>
                  {caseTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Severity Level</label>
              <Select value={severity} onValueChange={setSeverity}>
                <SelectTrigger className="bg-input border-border">
                  <SelectValue placeholder="Select severity" />
                </SelectTrigger>
                <SelectContent>
                  {severityLevels.map((level) => (
                    <SelectItem key={level} value={level}>
                      {level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Evidence Strength</label>
              <Select value={evidence} onValueChange={setEvidence}>
                <SelectTrigger className="bg-input border-border">
                  <SelectValue placeholder="Select evidence" />
                </SelectTrigger>
                <SelectContent>
                  {evidenceStrengths.map((strength) => (
                    <SelectItem key={strength} value={strength}>
                      {strength}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button onClick={handleSimulate} disabled={!caseType || !severity || !evidence} className="w-full" size="lg">
            <TrendingUp className="mr-2" size={18} />
            Simulate Outcome
          </Button>
        </Card>

        {/* Disclaimer */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex gap-3">
            <AlertCircle className="text-blue-600 flex-shrink-0" size={20} />
            <div className="text-sm text-blue-800">
              <p className="font-semibold mb-1">Disclaimer</p>
              <p>This is an estimate based on similar cases and historical data. Actual outcomes may vary. Consult a qualified lawyer for accurate legal advice.</p>
            </div>
          </div>
        </div>

        {/* Results */}
        {result && (
          <div className="space-y-6">
            <Card className="p-8 bg-gradient-to-br from-accent/10 to-primary/10 border-accent/30">
              <h2 className="text-2xl font-bold text-foreground mb-6">Predicted Outcome</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white p-6 rounded-lg border border-border">
                  <p className="text-xs font-medium text-muted-foreground mb-2">LIKELY OUTCOME</p>
                  <p className="text-xl font-bold text-primary">{result.outcome}</p>
                </div>

                <div className="bg-white p-6 rounded-lg border border-border">
                  <p className="text-xs font-medium text-muted-foreground mb-2">SUCCESS PROBABILITY</p>
                  <p className={`text-xl font-bold ${getProbabilityColor(result.probability)}`}>
                    {result.probability}
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg border border-border">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock size={16} className="text-muted-foreground" />
                    <p className="text-xs font-medium text-muted-foreground">TIME ESTIMATE</p>
                  </div>
                  <p className="text-lg font-bold text-foreground">{result.timeMonths}</p>
                  <p className="text-xs text-muted-foreground">months</p>
                </div>

                <div className="bg-white p-6 rounded-lg border border-border">
                  <div className="flex items-center gap-2 mb-2">
                    <Scale size={16} className="text-muted-foreground" />
                    <p className="text-xs font-medium text-muted-foreground">LEGAL PATH</p>
                  </div>
                  <p className="text-sm font-bold text-foreground">{result.path}</p>
                </div>
              </div>
            </Card>

            {/* Recommendations */}
            <Card className="p-8 bg-card border-border">
              <h3 className="text-xl font-semibold text-foreground mb-4">Recommendations</h3>
              <ul className="space-y-3 text-foreground">
                <li className="flex gap-3">
                  <span className="text-accent font-bold">•</span>
                  <span>Consult a specialized lawyer for {caseType}</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent font-bold">•</span>
                  <span>Strengthen your evidence and documentation</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent font-bold">•</span>
                  <span>Consider alternative dispute resolution (mediation/arbitration)</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent font-bold">•</span>
                  <span>Prepare for {result.timeMonths} months of legal proceedings</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent font-bold">•</span>
                  <span>Keep all evidence, documents, and communications</span>
                </li>
              </ul>
            </Card>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
