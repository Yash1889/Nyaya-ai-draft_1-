'use client';

import { MainLayout } from '@/components/layout/main-layout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  helplines,
  womenRights,
  complaintSteps,
  safetyTips,
  resources,
} from '@/lib/women-safety-data';
import { Phone, Shield, AlertTriangle, Heart, Info, ExternalLink } from 'lucide-react';

export default function WomenSafetyPage() {
  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-3">
          <h1 className="text-4xl font-bold text-foreground">Women Safety & Support</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Know your rights, access resources, and get support when you need it most
          </p>
        </div>

        {/* Emergency Alert */}
        <Card className="p-6 bg-destructive/10 border-2 border-destructive rounded-lg">
          <div className="flex items-start gap-4">
            <AlertTriangle size={28} className="text-destructive flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-destructive mb-2 text-lg">
                In Case of Emergency
              </h3>
              <p className="text-foreground mb-4">
                If you are in immediate danger, call the police immediately at{' '}
                <span className="font-bold text-destructive">100</span>
              </p>
              <Button className="bg-destructive hover:bg-destructive/90 text-white gap-2">
                <Phone size={18} />
                Call Police: 100
              </Button>
            </div>
          </div>
        </Card>

        {/* Helplines */}
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              <Heart size={28} className="text-accent" />
              Helplines & Support
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {helplines.map((helpline, index) => (
              <Card key={index} className="p-6 bg-card border-border">
                <h3 className="font-semibold text-foreground mb-1">{helpline.name}</h3>
                <p className="text-2xl font-bold text-accent mb-3">{helpline.number}</p>
                <p className="text-sm text-foreground mb-3">{helpline.description}</p>
                <p className="text-xs text-muted-foreground">
                  <span className="font-medium">Availability:</span> {helpline.availability}
                </p>
              </Card>
            ))}
          </div>
        </div>

        {/* Women's Rights */}
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              <Shield size={28} className="text-accent" />
              Your Legal Rights
            </h2>
            <p className="text-muted-foreground">
              India's laws protect women's safety, dignity, and rights
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {womenRights.map((right, index) => (
              <Card key={index} className="p-6 bg-card border-border">
                <h3 className="font-semibold text-foreground mb-2">{right.title}</h3>
                <p className="text-sm text-foreground leading-relaxed">
                  {right.description}
                </p>
              </Card>
            ))}
          </div>
        </div>

        {/* If You Need Help */}
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              <Info size={28} className="text-accent" />
              If You're Being Harmed
            </h2>
            <p className="text-muted-foreground mb-6">
              Step-by-step guidance for addressing abuse and violence
            </p>
          </div>

          <div className="space-y-4">
            {complaintSteps.map((step, index) => (
              <Card key={index} className="p-6 bg-card border-border">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0 font-bold">
                    {step.step}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-1">{step.title}</h3>
                    <p className="text-sm text-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="p-4 bg-accent/10 border border-accent/30 rounded-lg">
            <p className="text-sm text-foreground">
              <strong>Remember:</strong> You are not alone. Help is available. It's not your fault,
              and seeking help is a sign of strength, not weakness.
            </p>
          </div>
        </div>

        {/* Safety Tips */}
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-4">Safety Tips</h2>
            <p className="text-muted-foreground">
              Simple steps to protect yourself and stay safe
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {safetyTips.map((tip, index) => (
              <Card key={index} className="p-6 bg-card border-border">
                <h3 className="font-semibold text-foreground mb-2">{tip.title}</h3>
                <p className="text-sm text-foreground leading-relaxed">
                  {tip.description}
                </p>
              </Card>
            ))}
          </div>
        </div>

        {/* Resources */}
        <div className="space-y-6 pb-8">
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-4">Organizations & Resources</h2>
            <p className="text-muted-foreground">
              NGOs and organizations working for women's safety and rights
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {resources.map((resource, index) => (
              <Card key={index} className="p-6 bg-card border-border">
                <h3 className="font-semibold text-foreground mb-1">{resource.name}</h3>
                <p className="text-sm text-foreground mb-3">{resource.description}</p>
                <a
                  href={`https://${resource.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-accent hover:underline flex items-center gap-1"
                >
                  {resource.website}
                  <ExternalLink size={14} />
                </a>
              </Card>
            ))}
          </div>
        </div>

        {/* Final Message */}
        <Card className="p-8 bg-primary text-primary-foreground text-center rounded-lg">
          <h3 className="text-xl font-bold mb-3">You Have Rights. You Are Not Alone.</h3>
          <p className="leading-relaxed">
            Every woman deserves to live safely and with dignity. If you're experiencing any form of
            abuse, harassment, or discrimination, reach out. Help is available, and you deserve
            support.
          </p>
        </Card>
      </div>
    </MainLayout>
  );
}
