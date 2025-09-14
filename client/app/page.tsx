"use client";

import dynamic from 'next/dynamic';

const AquaWindow = dynamic(() => import('./components/ui/AquaWindow'), { 
  ssr: false,
  loading: () => <div className="min-h-screen flex items-center justify-center">Loading...</div>
});

const CardShop = dynamic(() => import('./components/CardShop'), { 
  ssr: false 
});

export default function Home() {
  return (
    <div className="min-h-screen py-10" style={{background: 'linear-gradient(135deg, #e3edf7 0%, #c7d2e7 100%)'}}>
      <div className="container mx-auto px-4">
        <AquaWindow
          title="WARLOK Card Shop"
          toolbar={null}
          sidebar={null}
          className="mx-auto max-w-[1400px]"
        >
          <CardShop />
        </AquaWindow>
      </div>
    </div>
  );
}
