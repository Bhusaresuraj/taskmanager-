import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navigation } from './Navigation';
import { Header } from './Header';

export function Layout() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="flex">
        <Navigation />
        <main className="flex-1 p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}