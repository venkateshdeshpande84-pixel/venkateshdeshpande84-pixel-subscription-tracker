import React from 'react';

interface SummaryCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  gradient: string;
  subtext: string;
}

export const SummaryCard: React.FC<SummaryCardProps> = ({ title, value, icon, gradient, subtext }) => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  });

  return (
    <div className="relative overflow-hidden bg-white p-6 rounded-2xl shadow-sm border border-slate-100 group hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-default">
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
          <h3 className="text-2xl font-bold text-slate-900 tracking-tight group-hover:text-brand-700 transition-colors">
            {formatter.format(value)}
          </h3>
        </div>
        <div className={`p-3 rounded-xl bg-gradient-to-br ${gradient} shadow-lg shadow-brand-500/20 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
          {icon}
        </div>
      </div>
      <p className="text-xs text-slate-400 font-medium flex items-center gap-1">
        <span className="w-1.5 h-1.5 rounded-full bg-brand-500 opacity-50 group-hover:opacity-100 transition-opacity"></span>
        {subtext}
      </p>
    </div>
  );
};