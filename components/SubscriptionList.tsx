import React from 'react';
import { Trash2, Calendar, Clock, Bell } from 'lucide-react';
import { Subscription, CATEGORY_COLORS } from '../types';

interface Props {
  subscriptions: Subscription[];
  onDelete: (id: string) => void;
}

export const SubscriptionList: React.FC<Props> = ({ subscriptions, onDelete }) => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { day: 'numeric', month: 'short' }).format(date);
  };

  return (
    <div className="space-y-3">
      {subscriptions.map((sub) => (
        <div
          key={sub.id}
          className="group relative bg-white rounded-xl p-4 border border-slate-100 shadow-sm hover:shadow-md hover:border-brand-100 transition-all duration-200"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Category Icon Placeholder / Initial */}
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold ${CATEGORY_COLORS[sub.category]} shrink-0 relative`}>
                {sub.name.charAt(0).toUpperCase()}
                {sub.reminderEnabled && (
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-brand-500 rounded-full border-2 border-white flex items-center justify-center">
                    <Bell className="w-2 h-2 text-white" />
                  </div>
                )}
              </div>
              
              <div>
                <h4 className="font-semibold text-slate-900 leading-tight">{sub.name}</h4>
                <div className="flex items-center gap-3 mt-1 flex-wrap">
                  <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${CATEGORY_COLORS[sub.category]}`}>
                    {sub.category}
                  </span>
                  
                  {sub.dueDate ? (
                    <div className="flex items-center gap-1 text-xs font-medium text-orange-600 bg-orange-50 px-2 py-0.5 rounded-md border border-orange-100">
                      <Clock className="w-3 h-3" />
                      <span>Due: {formatDate(sub.dueDate)}</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 text-xs text-slate-400">
                      <Calendar className="w-3 h-3" />
                      <span>Billing: {formatDate(sub.billingDate)}</span>
                    </div>
                  )}

                  {sub.dueDate && (
                     <div className="flex items-center gap-1 text-xs text-slate-400 hidden sm:flex">
                        <span className="text-slate-300">|</span>
                        <span>Billed: {formatDate(sub.billingDate)}</span>
                     </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <span className="block font-bold text-slate-900">{formatter.format(sub.amount)}</span>
                <span className="text-xs text-slate-400">/mo</span>
              </div>
              
              <button
                onClick={() => onDelete(sub.id)}
                className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
                aria-label="Delete subscription"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};