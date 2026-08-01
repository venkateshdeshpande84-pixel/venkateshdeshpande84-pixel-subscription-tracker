import React, { useState } from 'react';
import { ArrowRight, Check, CreditCard, PieChart, Bell, X } from 'lucide-react';

interface Props {
  onComplete: () => void;
}

export const Onboarding: React.FC<Props> = ({ onComplete }) => {
  const [step, setStep] = useState(0);

  const steps = [
    {
      icon: <CreditCard className="w-12 h-12 text-brand-500" />,
      title: "Track Subscriptions",
      description: "Keep all your recurring payments in one organized list. Never lose track of a subscription again."
    },
    {
      icon: <PieChart className="w-12 h-12 text-purple-500" />,
      title: "Spending Insights",
      description: "Visualize where your money goes with detailed charts and monthly expense summaries."
    },
    {
      icon: <Bell className="w-12 h-12 text-emerald-500" />,
      title: "Stay in Control",
      description: "Manage your budget effectively and cancel unused services to save money every month."
    }
  ];

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      onComplete();
    }
  };

  return (
    <div className="absolute inset-0 bg-slate-900/90 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
      <div className="relative max-w-lg w-full bg-white rounded-3xl p-8 shadow-2xl animate-slide-up">
        
        <button 
          onClick={onComplete}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-8 flex justify-center">
          <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-brand-500 transition-all duration-300 ease-out"
              style={{ width: `${((step + 1) / steps.length) * 100}%` }}
            />
          </div>
        </div>

        <div className="text-center py-8" key={step}>
          <div className="inline-flex items-center justify-center p-6 bg-brand-50 rounded-full mb-6 ring-4 ring-brand-100">
            {steps[step].icon}
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-3">{steps[step].title}</h2>
          <p className="text-slate-500 leading-relaxed">
            {steps[step].description}
          </p>
        </div>

        <div className="flex items-center justify-between mt-8">
          <div className="flex gap-2">
            {steps.map((_, i) => (
              <div 
                key={i}
                className={`w-2.5 h-2.5 rounded-full transition-colors duration-300 ${
                  i === step ? 'bg-brand-600 scale-110' : 'bg-slate-200'
                }`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-xl font-medium transition-all hover:shadow-lg active:scale-95"
          >
            {step === steps.length - 1 ? (
              <>
                Get Started
                <Check className="w-4 h-4" />
              </>
            ) : (
              <>
                Next
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};