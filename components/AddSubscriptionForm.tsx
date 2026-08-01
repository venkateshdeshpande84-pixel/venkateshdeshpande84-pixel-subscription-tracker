import React, { useState } from 'react';
import { Plus, Loader2, Bell } from 'lucide-react';
import { Subscription, Category } from '../types';

interface Props {
  onAdd: (sub: Omit<Subscription, 'id'>) => void;
}

export const AddSubscriptionForm: React.FC<Props> = ({ onAdd }) => {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [category, setCategory] = useState<Category>(Category.ENTERTAINMENT);
  const [reminderEnabled, setReminderEnabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleReminderChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    if (isChecked) {
      if ('Notification' in window) {
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
          setReminderEnabled(true);
        } else {
          setReminderEnabled(false);
          alert('We need notification permissions to send you reminders.');
        }
      } else {
        alert('This browser does not support notifications.');
      }
    } else {
      setReminderEnabled(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !amount || !date) return;

    setIsLoading(true);
    
    // Simulate a tiny delay for better UX feel
    setTimeout(() => {
      onAdd({
        name,
        amount: parseFloat(amount),
        billingDate: date,
        dueDate: dueDate || undefined,
        category,
        reminderEnabled: dueDate ? reminderEnabled : false,
      });
      
      // Reset form
      setName('');
      setAmount('');
      setDate('');
      setDueDate('');
      setCategory(Category.ENTERTAINMENT);
      setReminderEnabled(false);
      setIsLoading(false);
    }, 400);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
      <h3 className="text-lg font-semibold text-slate-900 mb-1 hidden lg:block">New Subscription</h3>
      <p className="text-sm text-slate-500 mb-6 hidden lg:block">Track a new monthly expense.</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
            Service Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Spotify"
            className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all placeholder:text-slate-400"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="amount" className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
              Monthly Cost
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-slate-400">$</span>
              </div>
              <input
                type="number"
                id="amount"
                step="0.01"
                min="0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="w-full pl-7 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all placeholder:text-slate-400"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="category" className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
              Category
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value as Category)}
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all text-slate-700"
            >
              {Object.values(Category).map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="date" className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
              Billing Date
            </label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all text-slate-700"
              required
            />
          </div>

          <div>
            <label htmlFor="dueDate" className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
              Due Date <span className="text-slate-400 font-normal lowercase">(optional)</span>
            </label>
            <input
              type="date"
              id="dueDate"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all text-slate-700"
            />
          </div>
        </div>

        {dueDate && (
          <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
            <div className={`p-2 rounded-lg ${reminderEnabled ? 'bg-brand-100 text-brand-600' : 'bg-slate-200 text-slate-400'} transition-colors`}>
              <Bell className="w-4 h-4" />
            </div>
            <div className="flex-1">
              <label htmlFor="reminder" className="block text-sm font-medium text-slate-700 cursor-pointer select-none">
                Remind me
              </label>
              <p className="text-xs text-slate-500">2 days before due date</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                id="reminder"
                className="sr-only peer"
                checked={reminderEnabled}
                onChange={handleReminderChange}
              />
              <div className="w-9 h-5 bg-slate-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-brand-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-brand-600"></div>
            </label>
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full mt-6 bg-brand-600 hover:bg-brand-700 text-white font-medium py-2.5 rounded-xl shadow-lg shadow-brand-500/30 flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <>
              <Plus className="w-5 h-5" />
              Add Subscription
            </>
          )}
        </button>
      </form>
    </div>
  );
};