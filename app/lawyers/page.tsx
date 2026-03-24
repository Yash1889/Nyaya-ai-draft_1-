'use client';

import { useState, useMemo } from 'react';
import { MainLayout } from '@/components/layout/main-layout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  searchLawyers,
  specializations,
  locations,
  Lawyer,
} from '@/lib/lawyers-data';
import { Star, Phone, Mail, MapPin, Award } from 'lucide-react';

export default function LawyersPage() {
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const [selectedSpecialization, setSelectedSpecialization] = useState<string>('');
  const [minExperience, setMinExperience] = useState<number>(0);

  const filteredLawyers = useMemo(
    () =>
      searchLawyers(
        selectedLocation || undefined,
        selectedSpecialization || undefined,
        minExperience > 0 ? minExperience : undefined
      ),
    [selectedLocation, selectedSpecialization, minExperience]
  );

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Find a Lawyer</h1>
          <p className="text-muted-foreground mt-2">
            Connect with qualified legal professionals
          </p>
        </div>

        {/* Filters */}
        <Card className="p-6 bg-card border-border">
          <h2 className="font-semibold text-foreground mb-4">Filter Lawyers</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Location Filter */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Location
              </label>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
              >
                <option value="">All Locations</option>
                {locations.map((location) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>
            </div>

            {/* Specialization Filter */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Specialization
              </label>
              <select
                value={selectedSpecialization}
                onChange={(e) => setSelectedSpecialization(e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
              >
                <option value="">All Specializations</option>
                {specializations.map((spec) => (
                  <option key={spec} value={spec}>
                    {spec}
                  </option>
                ))}
              </select>
            </div>

            {/* Experience Filter */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Min. Experience
              </label>
              <select
                value={minExperience}
                onChange={(e) => setMinExperience(Number(e.target.value))}
                className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
              >
                <option value={0}>Any</option>
                <option value={5}>5+ years</option>
                <option value={10}>10+ years</option>
                <option value={15}>15+ years</option>
              </select>
            </div>

            {/* Clear Filters */}
            <div className="flex items-end">
              <Button
                variant="outline"
                onClick={() => {
                  setSelectedLocation('');
                  setSelectedSpecialization('');
                  setMinExperience(0);
                }}
                className="w-full"
              >
                Clear Filters
              </Button>
            </div>
          </div>
        </Card>

        {/* Results Count */}
        <div className="flex items-center gap-2">
          <p className="text-sm text-muted-foreground">
            Found {filteredLawyers.length} lawyer{filteredLawyers.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Lawyers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLawyers.length > 0 ? (
            filteredLawyers.map((lawyer) => (
              <LawyerCard key={lawyer.id} lawyer={lawyer} />
            ))
          ) : (
            <div className="col-span-full py-12 text-center">
              <p className="text-muted-foreground mb-4">No lawyers found matching your criteria</p>
              <Button
                variant="outline"
                onClick={() => {
                  setSelectedLocation('');
                  setSelectedSpecialization('');
                  setMinExperience(0);
                }}
              >
                Reset Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}

interface LawyerCardProps {
  lawyer: Lawyer;
}

function LawyerCard({ lawyer }: LawyerCardProps) {
  return (
    <Card className="p-6 bg-card border-border hover:border-accent/50 transition-colors">
      {/* Header */}
      <div className="mb-4">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="font-semibold text-foreground text-lg">{lawyer.name}</h3>
            <p className="text-sm text-accent font-medium">{lawyer.specialization}</p>
          </div>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1 mt-2">
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={14}
                className={
                  i < Math.floor(lawyer.rating)
                    ? 'fill-accent text-accent'
                    : 'text-muted-foreground'
                }
              />
            ))}
          </div>
          <span className="text-sm font-medium text-foreground">{lawyer.rating}</span>
          <span className="text-xs text-muted-foreground">({lawyer.reviewCount} reviews)</span>
        </div>
      </div>

      {/* Info */}
      <div className="space-y-3 mb-4 text-sm">
        {/* Experience */}
        <div className="flex items-center gap-2 text-muted-foreground">
          <Award size={16} className="text-accent" />
          <span>{lawyer.experience} years experience</span>
        </div>

        {/* Location */}
        <div className="flex items-center gap-2 text-muted-foreground">
          <MapPin size={16} className="text-accent" />
          <span>{lawyer.location}</span>
        </div>

        {/* Fee */}
        <div className="text-sm font-medium text-primary">{lawyer.fee}</div>

        {/* Languages */}
        <div className="flex flex-wrap gap-1">
          {lawyer.languages.map((lang) => (
            <span
              key={lang}
              className="px-2 py-1 text-xs bg-primary/10 text-primary rounded"
            >
              {lang}
            </span>
          ))}
        </div>
      </div>

      {/* Contact Buttons */}
      <div className="space-y-2 border-t border-border pt-4">
        <Button
          variant="outline"
          size="sm"
          className="w-full gap-2 text-accent border-accent hover:bg-accent/10"
        >
          <Phone size={16} />
          Call: {lawyer.phone}
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="w-full gap-2 text-accent border-accent hover:bg-accent/10"
        >
          <Mail size={16} />
          Email: {lawyer.email}
        </Button>
      </div>
    </Card>
  );
}
