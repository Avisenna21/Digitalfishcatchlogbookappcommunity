import React from 'react';
import { 
  Home, 
  Ship, 
  BookOpen, 
  CheckCircle, 
  BarChart3, 
  Fish,
  Waves,
  User,
  Settings 
} from 'lucide-react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  userRole: 'admin' | 'operator';
  setUserRole: (role: 'admin' | 'operator') => void;
}

export function Sidebar({ activeTab, setActiveTab, userRole, setUserRole }: SidebarProps) {
  const adminMenuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'ships', label: 'Data Kapal & Nelayan', icon: Ship },
    { id: 'validation', label: 'Validasi Logbook', icon: CheckCircle },
    { id: 'reports', label: 'Laporan & Export', icon: BarChart3 },
  ];

  const operatorMenuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'logbook-input', label: 'Input Logbook', icon: BookOpen },
    { id: 'reports', label: 'Riwayat Logbook', icon: BarChart3 },
  ];

  const menuItems = userRole === 'admin' ? adminMenuItems : operatorMenuItems;

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-gradient-to-b from-cyan-600 to-blue-700 text-white shadow-xl">
      {/* Header */}
      <div className="p-6 border-b border-cyan-500/30">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-white/20 p-2 rounded-lg">
            <Fish className="w-6 h-6 text-cyan-100" />
          </div>
          <div>
            <h1 className="text-lg font-semibold">SiLog</h1>
            <p className="text-cyan-100 text-sm">Logbook Digital</p>
          </div>
        </div>
        
        {/* Role Switcher */}
        <div className="flex gap-2">
          <Button
            variant={userRole === 'admin' ? 'secondary' : 'ghost'}
            size="sm"
            onClick={() => setUserRole('admin')}
            className={`text-xs ${userRole === 'admin' 
              ? 'bg-white text-cyan-700' 
              : 'text-cyan-100 hover:bg-white/20'
            }`}
          >
            Admin DKP
          </Button>
          <Button
            variant={userRole === 'operator' ? 'secondary' : 'ghost'}
            size="sm"
            onClick={() => setUserRole('operator')}
            className={`text-xs ${userRole === 'operator' 
              ? 'bg-white text-cyan-700' 
              : 'text-cyan-100 hover:bg-white/20'
            }`}
          >
            Operator
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <li key={item.id}>
                <button
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-white/20 text-white shadow-md'
                      : 'text-cyan-100 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-sm">{item.label}</span>
                  {item.id === 'validation' && userRole === 'admin' && (
                    <Badge className="ml-auto bg-orange-500 text-white">3</Badge>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-cyan-500/30">
        <div className="flex items-center gap-3 text-cyan-100">
          <div className="bg-white/20 p-2 rounded-full">
            <User className="w-4 h-4" />
          </div>
          <div className="text-sm">
            <p className="font-medium">{userRole === 'admin' ? 'Admin DKP' : 'Operator Kapal'}</p>
            <p className="text-xs text-cyan-200">Pelabuhan Muara Baru</p>
          </div>
        </div>
      </div>
    </div>
  );
}