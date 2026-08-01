import React from 'react';
import { User, Subscription } from '../types';
import { LogOut, Trash2, Shield, Bell, Mail } from 'lucide-react';

interface Props {
  user: User;
  subscriptionCount: number;
  totalCost: number;
  onLogout: () => void;
  onClearData: () => void;
}

export const Profile: React.FC<Props> = ({ user, subscriptionCount, totalCost, onLogout, onClearData }) => {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold text-slate-900">My Profile</h2>

      {/* User Card */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex items-center gap-6">
        <img 
          src={user.avatar} 
          alt={user.name} 
          className="w-20 h-20 rounded-full bg-slate-100 border-4 border-slate-50"
        />
        <div>
          <h3 className="text-xl font-bold text-slate-900">{user.name}</h3>
          <p className="text-slate-500 flex items-center gap-2">
            <Mail className="w-4 h-4" />
            {user.email}
          </p>
          <div className="mt-3 flex items-center gap-3">
             <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
               Pro Plan
             </span>
             <span className="text-xs text-slate-400">Member since 2023</span>
          </div>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <p className="text-xs text-slate-500 uppercase font-semibold">Active Subscriptions</p>
          <p className="text-2xl font-bold text-slate-900 mt-1">{subscriptionCount}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <p className="text-xs text-slate-500 uppercase font-semibold">Monthly Spending</p>
          <p className="text-2xl font-bold text-slate-900 mt-1">${totalCost.toFixed(2)}</p>
        </div>
      </div>

      {/* Settings */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 font-medium text-slate-900">
          Account Settings
        </div>
        
        <div className="divide-y divide-slate-100">
          <button className="w-full flex items-center justify-between p-4 hover:bg-slate-50 transition-colors text-left">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-slate-100 rounded-lg text-slate-600">
                <Bell className="w-5 h-5" />
              </div>
              <div>
                <p className="font-medium text-slate-900">Notifications</p>
                <p className="text-xs text-slate-500">Manage billing alerts</p>
              </div>
            </div>
            <span className="text-brand-600 text-sm font-medium">On</span>
          </button>

          <button className="w-full flex items-center justify-between p-4 hover:bg-slate-50 transition-colors text-left">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-slate-100 rounded-lg text-slate-600">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <p className="font-medium text-slate-900">Privacy & Security</p>
                <p className="text-xs text-slate-500">Password and authentication</p>
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="space-y-3">
        <button 
          onClick={onLogout}
          className="w-full flex items-center justify-center gap-2 p-3 bg-white border border-slate-200 rounded-xl text-slate-700 font-medium hover:bg-slate-50 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>

        <button 
          onClick={() => {
            if(window.confirm('Are you sure you want to delete all data? This cannot be undone.')) {
              onClearData();
            }
          }}
          className="w-full flex items-center justify-center gap-2 p-3 rounded-xl text-red-600 font-medium hover:bg-red-50 transition-colors"
        >
          <Trash2 className="w-4 h-4" />
          Clear Data & Reset
        </button>
      </div>
    </div>
  );
};
