'use client';

import { Sidebar } from './sidebar';
import { Navbar } from './navbar';

export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex flex-col flex-1 lg:ml-64">
        <Navbar />
        <main className="flex-1 overflow-auto pt-4 pb-8 px-4 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
