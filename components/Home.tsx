import React, { useState } from 'react';
import { Plus, CreditCard, Wallet, TrendingUp } from 'lucide-react';
import { Subscription } from '../types';
import { SummaryCard } from './SummaryCard';
import { AddSubscriptionForm } from './AddSubscriptionForm';
import { SubscriptionList } from './SubscriptionList';

interface Props {
  subscriptions: Subscription[];
  onAddSubscription: (newSub: Omit<Subscription, 'id'>) => void;
  onDeleteSubscription: (id: string) => void;
}

export const Home: React.FC<Props> = ({ subscriptions, onAddSubscription, onDeleteSubscription }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleAdd = (newSub: Omit<Subscription, 'id'>) => {
    onAddSubscription(newSub);
    setIsFormOpen(false);
  };

  const totalMonthly = subscriptions.reduce((sum, sub) => sum + sub.amount, 0);
  const mostExpensive = subscriptions.length > 0 
    ? [...subscriptions].sort((a, b) => b.amount - a.amount)[0] 
    : null;

  return (
    <div className="space-y-8">
      {/* Mobile Add Button Header Element */}
      <div className="flex md:hidden justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-slate-900">Dashboard</h2>
        <button
          onClick={() => setIsFormOpen(true)}
          className="p-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SummaryCard 
          title="Monthly Expense" 
          value={totalMonthly} 
          icon={<Wallet className="w-5 h-5 text-white" />}
          gradient="from-brand-500 to-brand-600"
          subtext={`${subscriptions.length} active subscriptions`}
        />
        <SummaryCard 
          title="Yearly Projection" 
          value={totalMonthly * 12} 
          icon={<TrendingUp className="w-5 h-5 text-white" />}
          gradient="from-emerald-500 to-emerald-600"
          subtext="Estimated total cost"
        />
        <SummaryCard 
          title="Highest Cost" 
          value={mostExpensive?.amount || 0} 
          icon={<CreditCard className="w-5 h-5 text-white" />}
          gradient="from-purple-500 to-purple-600"
          subtext={mostExpensive?.name || 'No subscriptions yet'}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content: List */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-800">Your Subscriptions</h2>
          </div>

          {subscriptions.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-slate-300">
              <div className="mx-auto w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                <CreditCard className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-lg font-medium text-slate-900">No subscriptions yet</h3>
              <p className="text-slate-500 mt-1 max-w-sm mx-auto">
                Add your first subscription to start tracking your monthly expenses.
              </p>
              <button
                onClick={() => setIsFormOpen(true)}
                className="mt-6 inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-brand-600 bg-brand-50 hover:bg-brand-100 rounded-lg transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add First Subscription
              </button>
            </div>
          ) : (
            <SubscriptionList 
              subscriptions={subscriptions} 
              onDelete={onDeleteSubscription} 
            />
          )}
        </div>

        {/* Sidebar: Add Form (Desktop) */}
        <div className="hidden lg:block lg:col-span-1">
          <div className="sticky top-6">
            <AddSubscriptionForm onAdd={handleAdd} />
          </div>
        </div>
      </div>

      {/* Mobile Modal Form */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={() => setIsFormOpen(false)} />
          <div className="absolute inset-x-0 bottom-0 bg-white rounded-t-2xl p-6 shadow-2xl animate-in slide-in-from-bottom duration-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-slate-900">Add Subscription</h2>
              <button 
                onClick={() => setIsFormOpen(false)}
                className="p-2 text-slate-400 hover:text-slate-600 bg-slate-100 rounded-full"
              >
                <span className="sr-only">Close</span>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <AddSubscriptionForm onAdd={handleAdd} />
          </div>
        </div>
      )}
    </div>
  );
};
