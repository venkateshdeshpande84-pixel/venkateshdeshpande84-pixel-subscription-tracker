import React from 'react';
import { Subscription, Category, CATEGORY_COLORS } from '../types';
import { TrendingUp, ArrowUpRight, DollarSign } from 'lucide-react';

interface Props {
  subscriptions: Subscription[];
}

export const Insights: React.FC<Props> = ({ subscriptions }) => {
  const totalMonthly = subscriptions.reduce((sum, sub) => sum + sub.amount, 0);
  
  // Calculate breakdown
  const breakdown = Object.values(Category).map(cat => {
    const subs = subscriptions.filter(s => s.category === cat);
    const amount = subs.reduce((sum, s) => sum + s.amount, 0);
    const percentage = totalMonthly > 0 ? (amount / totalMonthly) * 100 : 0;
    return { category: cat, amount, percentage, count: subs.length };
  }).filter(b => b.amount > 0).sort((a, b) => b.amount - a.amount);

  // SVG Donut Chart Calculation
  let cumulativePercent = 0;
  
  const getCoordinatesForPercent = (percent: number) => {
    const x = Math.cos(2 * Math.PI * percent);
    const y = Math.sin(2 * Math.PI * percent);
    return [x, y];
  };

  const chartData = breakdown.map((item) => {
    const start = cumulativePercent;
    cumulativePercent += item.percentage / 100;
    return { 
      ...item, 
      start, 
      end: cumulativePercent 
    };
  });

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-slate-900">Spending Insights</h2>

      {subscriptions.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-300">
          <p className="text-slate-500">Add subscriptions to see insights.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Main Stats */}
            <div className="bg-brand-600 rounded-2xl p-6 text-white relative overflow-hidden">
              <div className="relative z-10">
                <p className="text-brand-100 font-medium mb-1">Total Monthly Spend</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold">${totalMonthly.toFixed(2)}</span>
                  <span className="text-brand-200 text-sm">/mo</span>
                </div>
                <div className="mt-4 flex items-center gap-2 text-sm text-brand-100 bg-brand-500/50 inline-flex px-3 py-1.5 rounded-full">
                  <TrendingUp className="w-4 h-4" />
                  <span>${(totalMonthly * 12).toFixed(0)} projected yearly</span>
                </div>
              </div>
              <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-1/4 translate-y-1/4">
                <DollarSign className="w-64 h-64" />
              </div>
            </div>

            {/* Average */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-center">
              <p className="text-slate-500 font-medium text-sm mb-1">Average Subscription Cost</p>
              <h3 className="text-3xl font-bold text-slate-900">
                ${(totalMonthly / subscriptions.length).toFixed(2)}
              </h3>
              <p className="text-slate-400 text-sm mt-2">Across {subscriptions.length} active services</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Chart */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm lg:col-span-1 flex flex-col items-center justify-center">
               <h3 className="text-slate-900 font-semibold mb-6 w-full text-left">Cost Distribution</h3>
               <div className="relative w-48 h-48">
                 <svg viewBox="-1 -1 2 2" className="transform -rotate-90 w-full h-full">
                   {chartData.map((slice, i) => {
                     const [startX, startY] = getCoordinatesForPercent(slice.start);
                     const [endX, endY] = getCoordinatesForPercent(slice.end);
                     const largeArcFlag = slice.percentage > 50 ? 1 : 0;
                     const pathData = `M ${startX} ${startY} A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY} L 0 0`;
                     
                     // Map categories to simple colors for the chart or use a palette
                     const colors = ['#3b82f6', '#8b5cf6', '#10b981', '#f97316', '#ef4444', '#64748b'];
                     return (
                       <path 
                         key={slice.category} 
                         d={pathData} 
                         fill={colors[i % colors.length]} 
                         stroke="white" 
                         strokeWidth="0.05" 
                       />
                     );
                   })}
                   <circle cx="0" cy="0" r="0.6" fill="white" />
                 </svg>
                 <div className="absolute inset-0 flex items-center justify-center flex-col">
                    <span className="text-xs text-slate-400 font-medium">Top Category</span>
                    <span className="text-sm font-bold text-slate-900">{breakdown[0]?.category}</span>
                 </div>
               </div>
            </div>

            {/* Breakdown List */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm lg:col-span-2">
              <h3 className="text-slate-900 font-semibold mb-6">Category Breakdown</h3>
              <div className="space-y-5">
                {breakdown.map((item) => (
                  <div key={item.category}>
                    <div className="flex justify-between items-end mb-1">
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${CATEGORY_COLORS[item.category].split(' ')[0].replace('bg-', 'bg-')}`}></span>
                        <span className="text-sm font-medium text-slate-700">{item.category}</span>
                        <span className="text-xs text-slate-400">({item.count})</span>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-bold text-slate-900">${item.amount.toFixed(2)}</span>
                        <span className="text-xs text-slate-500 ml-1">({item.percentage.toFixed(0)}%)</span>
                      </div>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${CATEGORY_COLORS[item.category].split(' ')[0].replace('bg-', 'bg-')}`} 
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
