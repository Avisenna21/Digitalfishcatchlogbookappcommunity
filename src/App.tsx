import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { ShipManagement } from './components/ShipManagement';
import { LogbookInput } from './components/LogbookInput';
import { LogbookValidation } from './components/LogbookValidation';
import { Reports } from './components/Reports';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [userRole, setUserRole] = useState<'admin' | 'operator'>('admin');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'ships':
        return <ShipManagement />;
      case 'logbook-input':
        return <LogbookInput />;
      case 'validation':
        return <LogbookValidation />;
      case 'reports':
        return <Reports />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Custom CSS for maritime colors */}
      <style jsx>{`
        :root {
          --ocean-blue: #0891b2;
          --deep-blue: #0e7490;
          --sea-green: #059669;
          --light-blue: #e0f2fe;
          --wave-blue: #0284c7;
        }
      `}</style>
      
      <div className="flex">
        <Sidebar 
          activeTab={activeTab} 
          setActiveTab={setActiveTab}
          userRole={userRole}
          setUserRole={setUserRole}
        />
        <main className="flex-1 ml-64">
          <div className="p-6">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
}