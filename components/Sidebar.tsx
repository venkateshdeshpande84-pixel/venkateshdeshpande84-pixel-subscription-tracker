import React from 'react';
import { LayoutGrid, PieChart, User as UserIcon, LogOut, Sparkles } from 'lucide-react';
import { View, User } from '../types';

interface Props {
  currentView: View;
  onNavigate: (view: View) => void;
  user: User | null;
  onLogout: () => void;
}

export const Sidebar: React.FC<Props> = ({ currentView, onNavigate, user, onLogout }) => {
  const menuItems = [
    { id: 'home' as View, label: 'Dashboard', icon: LayoutGrid },
    { id: 'insights' as View, label: 'Insights', icon: PieChart },
    { id: 'profile' as View, label: 'Profile', icon: UserIcon },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex flex-col w-64 bg-white border-r border-slate-200 h-screen fixed left-0 top-0 z-20 shadow-[4px_0_24px_-12px_rgba(0,0,0,0.1)]">
        <div className="p-6 border-b border-slate-50">
          <div className="flex items-center gap-2 group cursor-default">
            <div className="bg-brand-600 p-2 rounded-xl group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-brand-500/30">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-700 to-brand-500">
              SubTrack
            </h1>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group ${
                currentView === item.id
                  ? 'bg-brand-50 text-brand-700 shadow-sm'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 hover:translate-x-1'
              }`}
            >
              <item.icon className={`w-5 h-5 transition-colors ${currentView === item.id ? 'text-brand-600' : 'text-slate-400 group-hover:text-slate-600'}`} />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-50">
          <div className="flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-slate-50 transition-colors cursor-pointer group">
            <div className="relative">
                <img 
                  src={user?.avatar} 
                  alt={user?.name} 
                  className="w-9 h-9 rounded-full bg-slate-200 ring-2 ring-white group-hover:ring-brand-100 transition-all"
                />
                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-slate-900 truncate group-hover:text-brand-700 transition-colors">{user?.name}</p>
              <p className="text-xs text-slate-500 truncate">{user?.email}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Nav */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 z-30 pb-safe shadow-[0_-4px_20px_-10px_rgba(0,0,0,0.1)]">
        <div className="flex justify-around items-center h-16">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center justify-center w-full h-full space-y-1 active:scale-95 transition-transform ${
                currentView === item.id ? 'text-brand-600' : 'text-slate-400'
              }`}
            >
              <item.icon className={`w-6 h-6 ${currentView === item.id ? 'drop-shadow-sm' : ''}`} />
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
};