'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MainLayout } from '@/components/layout/main-layout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  helplines,
  womenRights,
  complaintSteps,
  safetyTips,
  resources,
} from '@/lib/women-safety-data';
import { Phone, Shield, AlertTriangle, Heart, Info, Eye, EyeOff, MapPin, FileText } from 'lucide-react';

export default function WomenSafetyEnhancedPage() {
  const router = useRouter();
  const [showSOSPanel, setShowSOSPanel] = useState(false);
  const [hiddenMode, setHiddenMode] = useState(false);

  const handleSafeExit = () => {
    // Clear any sensitive data and navigate to neutral page
    sessionStorage.clear();
    window.location.href = 'https://www.google.com';
  };

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Safe Exit & Hidden Mode Controls */}
        <div className="flex gap-3 justify-end items-center">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setHiddenMode(!hiddenMode)}
            className="gap-2"
          >
            {hiddenMode ? (
              <>
                <Eye size={16} />
                Show Content
              </>
            ) : (
              <>
                <EyeOff size={16} />
                Hide Content
              </>
            )}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleSafeExit}
            className="gap-2 text-red-600 hover:text-red-700"
          >
            <AlertTriangle size={16} />
            Safe Exit
          </Button>
        </div>

        {/* Safe Space Message */}
        <Card className="p-6 bg-blue-50 border-2 border-blue-200 rounded-lg">
          <div className="flex gap-3">
            <Heart className="text-blue-600 flex-shrink-0" size={24} />
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">You are in a safe space</h3>
              <p className="text-blue-800 text-sm">
                You can proceed at your own pace. All information shared here is confidential and private.
              </p>
            </div>
          </div>
        </Card>

        {/* Header */}
        <div className="text-center space-y-3">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Badge variant="destructive" className="text-xs">FREE SERVICE</Badge>
            <Badge className="bg-blue-600 text-xs">CONFIDENTIAL</Badge>
          </div>
          <h1 className="text-4xl font-bold text-foreground">Women Safety & Support</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Know your rights, access resources, and get support when you need it most.
            This service is 100% free for harassment and violence victims.
          </p>
        </div>

        {/* Emergency SOS Button */}
        <div className="flex justify-center">
          <button
            onClick={() => setShowSOSPanel(!showSOSPanel)}
            className="relative group"
          >
            <div className="absolute inset-0 bg-red-600 rounded-full opacity-75 group-hover:opacity-100 blur-md transition"></div>
            <div className="relative px-8 py-6 bg-red-600 hover:bg-red-700 rounded-full text-white font-bold text-lg shadow-2xl transition transform hover:scale-105 flex items-center gap-3">
              <AlertTriangle size={28} />
              EMERGENCY SOS
            </div>
          </button>
        </div>

        {/* SOS Panel */}
        {showSOSPanel && (
          <Card className="p-8 bg-red-50 border-2 border-red-300">
            <h2 className="text-2xl font-bold text-red-900 mb-6">Emergency Contacts</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-white p-6 rounded-lg border-2 border-red-200">
                <p className="text-sm font-medium text-red-600 mb-2">EMERGENCY POLICE</p>
                <a href="tel:100" className="text-2xl font-bold text-red-600 hover:underline">
                  100
                </a>
              </div>
              <div className="bg-white p-6 rounded-lg border-2 border-red-200">
                <p className="text-sm font-medium text-red-600 mb-2">WOMEN HELPLINE</p>
                <a href="tel:1091" className="text-2xl font-bold text-red-600 hover:underline">
                  1091
                </a>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button className="bg-red-600 hover:bg-red-700 text-white" size="lg">
                <Phone className="mr-2" size={20} />
                Call Emergency Services
              </Button>
              <Button onClick={() => setShowSOSPanel(false)} variant="outline" size="lg">
                Close
              </Button>
            </div>
          </Card>
        )}

        {!hiddenMode && (
          <>
            {/* Helplines Section */}
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <Phone className="text-accent" size={28} />
                  Support Helplines
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {helplines.map((helpline, index) => (
                    <Card key={index} className="p-6 bg-card border-border hover:border-accent/50 transition-colors">
                      <h3 className="font-semibold text-foreground mb-2">{helpline.name}</h3>
                      <a href={`tel:${helpline.number}`} className="text-xl font-bold text-accent mb-2 block hover:underline">
                        {helpline.number}
                      </a>
                      <p className="text-sm text-muted-foreground">{helpline.description}</p>
                      {helpline.availability && (
                        <p className="text-xs text-muted-foreground mt-2">{helpline.availability}</p>
                      )}
                    </Card>
                  ))}
                </div>
              </div>
            </div>

            {/* Guided Complaint Flow */}
            <Card className="p-8 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
              <div className="flex gap-4 mb-6">
                <FileText className="text-blue-600" size={28} />
                <div>
                  <h2 className="text-2xl font-bold text-blue-900 mb-2">Guided Complaint Flow</h2>
                  <p className="text-blue-800">Step-by-step process to file a formal complaint</p>
                </div>
              </div>
              <div className="space-y-4">
                {complaintSteps.map((step, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center">
                      {index + 1}
                    </div>
                    <div>
                      <h4 className="font-semibold text-blue-900">{step.title}</h4>
                      <p className="text-blue-800 text-sm">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Button className="mt-6 bg-blue-600 hover:bg-blue-700">
                Start Complaint Process
              </Button>
            </Card>

            {/* Women Rights */}
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <Shield className="text-accent" size={28} />
                  Your Rights
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {womenRights.map((right, index) => (
                    <Card key={index} className="p-6 bg-card border-border">
                      <h3 className="font-semibold text-foreground mb-3">{right.title}</h3>
                      <p className="text-sm text-muted-foreground">{right.description}</p>
                    </Card>
                  ))}
                </div>
              </div>
            </div>

            {/* Safety Tips */}
            <Card className="p-8 bg-green-50 border-green-200">
              <h2 className="text-2xl font-bold text-green-900 mb-6 flex items-center gap-2">
                <Info className="text-green-600" size={28} />
                Safety Tips
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {safetyTips.map((tip, index) => (
                  <div key={index} className="bg-white p-4 rounded-lg border border-green-200">
                    <h4 className="font-semibold text-green-900 mb-2">{tip.title}</h4>
                    <p className="text-sm text-green-800">{tip.description}</p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Free Service Notice */}
            <Card className="p-6 bg-green-50 border-2 border-green-300">
              <div className="flex gap-4">
                <Heart className="text-green-600" size={24} />
                <div>
                  <h3 className="font-semibold text-green-900 mb-2">FREE SERVICE FOR VICTIMS</h3>
                  <p className="text-green-800 text-sm">
                    All legal guidance and resources on this platform are completely FREE for victims of harassment, abuse, and violence. Your safety and well-being are our priority.
                  </p>
                </div>
              </div>
            </Card>
          </>
        )}

        {hiddenMode && (
          <div className="text-center py-12">
            <Eye className="mx-auto text-muted-foreground mb-4" size={48} />
            <h3 className="text-2xl font-bold text-foreground mb-2">Content Hidden</h3>
            <p className="text-muted-foreground mb-6">Click "Show Content" to view this page</p>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
