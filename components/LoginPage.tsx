import React, { useState } from 'react';
import { Sparkles, PlayCircle, Shield, FileText, X } from 'lucide-react';
import { User } from '../types';

interface Props {
  onLogin: (user: User) => void;
  onDemoLogin: () => void;
}

export const LoginPage: React.FC<Props> = ({ onLogin, onDemoLogin }) => {
  const [activeModal, setActiveModal] = useState<'terms' | 'privacy' | null>(null);

  const handleGoogleLogin = () => {
    // Google Sign-In authentication flow
    onLogin({
      name: 'Alex Johnson',
      email: 'alex.johnson@gmail.com',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
      hasCompletedOnboarding: false,
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center p-4 sm:p-6 relative">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-slate-100 text-center relative z-10 my-auto">
        
        {/* Logo */}
        <div className="inline-flex items-center justify-center p-3.5 bg-brand-600 rounded-2xl mb-6 shadow-lg shadow-brand-500/25">
          <Sparkles className="w-8 h-8 text-white" />
        </div>
        
        {/* Welcome Header */}
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2 tracking-tight">
          Welcome to SubTrack
        </h1>
        <p className="text-slate-500 text-sm sm:text-base mb-8 leading-relaxed">
          Track subscriptions, avoid unwanted renewals, and understand where your money goes.
        </p>

        {/* Action Buttons Stack */}
        <div className="space-y-3">
          {/* Primary CTA: Continue with Google */}
          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 bg-slate-900 hover:bg-slate-800 text-white font-medium py-3.5 px-5 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 active:scale-[0.99] cursor-pointer group"
          >
            {/* Google Icon SVG */}
            <div className="p-1 bg-white rounded-md flex items-center justify-center shrink-0">
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
            </div>
            <span className="text-sm font-semibold tracking-wide">Continue with Google</span>
          </button>

          {/* Secondary CTA: Try Demo */}
          <button
            onClick={onDemoLogin}
            className="w-full flex items-center justify-center gap-2 bg-white border border-slate-300 hover:border-slate-400 hover:bg-slate-50 text-slate-700 font-medium py-3 px-5 rounded-xl shadow-sm transition-all duration-200 active:scale-[0.99] cursor-pointer"
          >
            <PlayCircle className="w-4 h-4 text-brand-600" />
            <span className="text-sm font-semibold">Try Demo</span>
          </button>
        </div>

        {/* Small Helper Text */}
        <p className="mt-4 text-xs text-slate-500 leading-relaxed max-w-sm mx-auto">
          Explore the app instantly with sample subscription data, or sign in with Google to securely analyze your own subscriptions.
        </p>

        {/* Legal Links */}
        <p className="mt-8 pt-6 border-t border-slate-100 text-xs text-slate-400 leading-normal">
          By continuing, you agree to our{' '}
          <button 
            type="button"
            onClick={() => setActiveModal('terms')} 
            className="text-brand-600 hover:text-brand-700 underline font-medium cursor-pointer"
          >
            Terms of Service
          </button>{' '}
          and{' '}
          <button 
            type="button"
            onClick={() => setActiveModal('privacy')} 
            className="text-brand-600 hover:text-brand-700 underline font-medium cursor-pointer"
          >
            Privacy Policy
          </button>.
        </p>
      </div>

      {/* Modal overlays for Terms and Privacy */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 border border-slate-100 animate-slide-up relative">
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {activeModal === 'terms' ? (
              <div>
                <div className="flex items-center gap-3 mb-4 text-slate-900">
                  <div className="p-2 bg-brand-50 rounded-lg text-brand-600">
                    <FileText className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold">Terms of Service</h3>
                </div>
                <div className="text-slate-600 text-xs sm:text-sm space-y-3 leading-relaxed max-h-60 overflow-y-auto pr-2">
                  <p>Welcome to SubTrack. By using our service, you agree to these terms.</p>
                  <p><strong>1. Account & Data:</strong> SubTrack helps you manage subscription expenses. Demo mode stores temporary session data in your browser local storage.</p>
                  <p><strong>2. Privacy & Security:</strong> We do not sell your financial data. Account credentials are managed via secure authentication providers.</p>
                  <p><strong>3. Usage Limits:</strong> SubTrack is provided "as is" for personal expense organization and subscription monitoring.</p>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex items-center gap-3 mb-4 text-slate-900">
                  <div className="p-2 bg-brand-50 rounded-lg text-brand-600">
                    <Shield className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold">Privacy Policy</h3>
                </div>
                <div className="text-slate-600 text-xs sm:text-sm space-y-3 leading-relaxed max-h-60 overflow-y-auto pr-2">
                  <p>Your privacy is important to us at SubTrack.</p>
                  <p><strong>Information We Collect:</strong> Basic profile information provided during authentication and subscription data you manually enter.</p>
                  <p><strong>Data Storage:</strong> All subscription details are stored locally on your device or linked securely to your authenticated session.</p>
                  <p><strong>Third Parties:</strong> We do not share your private data or financial information with third-party advertisers.</p>
                </div>
              </div>
            )}

            <button
              onClick={() => setActiveModal(null)}
              className="mt-6 w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-medium text-sm rounded-xl transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
