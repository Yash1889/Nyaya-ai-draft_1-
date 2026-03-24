'use client';

import { Search } from 'lucide-react';
import { useAuth } from '@/lib/auth-context';

export function Navbar() {
  const { user } = useAuth();

  return (
    <nav className="sticky top-0 z-20 bg-card border-b border-border h-16 flex items-center justify-between px-6 lg:px-8">
      <div className="hidden lg:flex items-center gap-3 flex-1">
        <Search size={20} className="text-muted-foreground" />
        <input
          type="text"
          placeholder="Search legal topics..."
          className="w-full max-w-md bg-transparent text-foreground placeholder-muted-foreground text-sm focus:outline-none"
        />
      </div>

      <div className="ml-auto flex items-center gap-4">
        {user && (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">
              {user.name.charAt(0).toUpperCase()}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
