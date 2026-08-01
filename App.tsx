import React, { useState, useEffect } from 'react';
import { Subscription, User, View, Category } from './types';
import { LoginPage } from './components/LoginPage';
import { Onboarding } from './components/Onboarding';
import { Sidebar } from './components/Sidebar';
import { Home } from './components/Home';
import { Insights } from './components/Insights';
import { Profile } from './components/Profile';
import { X, PlayCircle } from 'lucide-react';

const SAMPLE_DEMO_SUBSCRIPTIONS: Subscription[] = [
  {
    id: 'demo-1',
    name: 'Netflix Premium',
    amount: 19.99,
    billingDate: '2026-08-15',
    dueDate: '2026-08-15',
    category: Category.ENTERTAINMENT,
    reminderEnabled: true,
  },
  {
    id: 'demo-2',
    name: 'Spotify Family',
    amount: 16.99,
    billingDate: '2026-08-20',
    dueDate: '2026-08-20',
    category: Category.ENTERTAINMENT,
    reminderEnabled: true,
  },
  {
    id: 'demo-3',
    name: 'Equinox Gym',
    amount: 95.00,
    billingDate: '2026-08-01',
    dueDate: '2026-08-01',
    category: Category.HEALTH,
    reminderEnabled: true,
  },
  {
    id: 'demo-4',
    name: 'ChatGPT Plus',
    amount: 20.00,
    billingDate: '2026-08-10',
    dueDate: '2026-08-10',
    category: Category.PRODUCTIVITY,
    reminderEnabled: false,
  },
  {
    id: 'demo-5',
    name: 'iCloud+ 200GB',
    amount: 2.99,
    billingDate: '2026-08-05',
    dueDate: '2026-08-05',
    category: Category.UTILITIES,
    reminderEnabled: true,
  },
];

export default function App() {
  // --- STATE MANAGEMENT ---
  
  // User State
  const [user, setUser] = useState<User | null>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('subtrack_user');
      return saved ? JSON.parse(saved) : null;
    }
    return null;
  });

  // Subscription Data
  const [subscriptions, setSubscriptions] = useState<Subscription[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('subtrack_data');
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  // Navigation State
  const [currentView, setCurrentView] = useState<View>('home');

  // Onboarding State
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
  const [isOnboardingActive, setIsOnboardingActive] = useState(false);

  // --- PERSISTENCE & EFFECT ---

  useEffect(() => {
    if (user) {
      localStorage.setItem('subtrack_user', JSON.stringify(user));
      // Show welcome modal if user hasn't completed onboarding
      if (!user.hasCompletedOnboarding) {
        // Small delay to let the dashboard render first
        const timer = setTimeout(() => setShowWelcomeModal(true), 1000);
        return () => clearTimeout(timer);
      }
    } else {
      localStorage.removeItem('subtrack_user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('subtrack_data', JSON.stringify(subscriptions));
  }, [subscriptions]);

  // --- NOTIFICATION CHECKER ---
  useEffect(() => {
    if (!('Notification' in window) || Notification.permission !== 'granted') return;

    const todayStr = new Date().toISOString().split('T')[0];
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let updatesNeeded = false;
    const updatedSubscriptions = subscriptions.map(sub => {
      // Check if reminder is enabled and due date exists
      if (sub.reminderEnabled && sub.dueDate) {
        const dueDate = new Date(sub.dueDate);
        dueDate.setHours(0, 0, 0, 0);

        // Calculate difference in days
        const diffTime = dueDate.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        // If due in exactly 2 days and haven't notified today
        if (diffDays === 2 && sub.lastNotifiedDate !== todayStr) {
          try {
            new Notification(`Upcoming Payment: ${sub.name}`, {
              body: `Your payment of $${sub.amount.toFixed(2)} is due in 2 days.`,
              icon: '/vite.svg', // Fallback icon
              tag: `sub-reminder-${sub.id}-${todayStr}` // Prevent duplicate notifications at OS level
            });
            updatesNeeded = true;
            return { ...sub, lastNotifiedDate: todayStr };
          } catch (e) {
            console.error("Notification failed", e);
            return sub;
          }
        }
      }
      return sub;
    });

    if (updatesNeeded) {
      setSubscriptions(updatedSubscriptions);
    }
  }, [subscriptions]);


  // --- HANDLERS ---

  const handleLogin = (loggedInUser: User) => {
    setUser(loggedInUser);
  };

  const handleDemoLogin = () => {
    setUser({
      name: 'Demo Visitor',
      email: 'visitor@subtrack.app',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
      hasCompletedOnboarding: true,
    });
    if (subscriptions.length === 0) {
      setSubscriptions(SAMPLE_DEMO_SUBSCRIPTIONS);
    }
  };

  const handleStartOnboarding = () => {
    setShowWelcomeModal(false);
    setIsOnboardingActive(true);
  };

  const handleSkipOnboarding = () => {
    setShowWelcomeModal(false);
    if (user) {
      const updatedUser = { ...user, hasCompletedOnboarding: true };
      setUser(updatedUser);
    }
  };

  const handleOnboardingComplete = () => {
    setIsOnboardingActive(false);
    if (user) {
      const updatedUser = { ...user, hasCompletedOnboarding: true };
      setUser(updatedUser);
    }
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView('home');
    setShowWelcomeModal(false);
    setIsOnboardingActive(false);
  };

  const handleClearData = () => {
    setSubscriptions([]);
    localStorage.removeItem('subtrack_data');
  };

  const handleAddSubscription = (newSub: Omit<Subscription, 'id'>) => {
    const subscription: Subscription = {
      ...newSub,
      id: crypto.randomUUID(),
    };
    setSubscriptions(prev => [subscription, ...prev]);
  };

  const handleDeleteSubscription = (id: string) => {
    setSubscriptions(prev => prev.filter(sub => sub.id !== id));
  };

  // --- RENDER LOGIC ---

  // 1. Not Authenticated -> Show Login
  if (!user) {
    return <LoginPage onLogin={handleLogin} onDemoLogin={handleDemoLogin} />;
  }

  // 3. Main App Layout
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20 lg:pb-0 relative">
      <Sidebar 
        currentView={currentView} 
        onNavigate={setCurrentView} 
        user={user}
        onLogout={handleLogout}
      />
      
      <main className="lg:ml-64 min-h-screen transition-all duration-300">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {currentView === 'home' && (
            <div className="animate-fade-in">
               <Home 
                 subscriptions={subscriptions}
                 onAddSubscription={handleAddSubscription}
                 onDeleteSubscription={handleDeleteSubscription}
               />
            </div>
          )}

          {currentView === 'insights' && (
             <div className="animate-fade-in">
               <Insights subscriptions={subscriptions} />
             </div>
          )}

          {currentView === 'profile' && (
             <div className="animate-fade-in">
               <Profile 
                 user={user} 
                 onLogout={handleLogout} 
                 onClearData={handleClearData}
                 subscriptionCount={subscriptions.length}
                 totalCost={subscriptions.reduce((sum, s) => sum + s.amount, 0)}
               />
             </div>
          )}
        </div>
      </main>

      {/* WELCOME DIALOG OVERLAY */}
      {showWelcomeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm animate-fade-in" />
          <div className="relative bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-full animate-slide-up border border-slate-100">
            <div className="text-center mb-6">
              <div className="mx-auto w-12 h-12 bg-brand-100 rounded-full flex items-center justify-center mb-4">
                <PlayCircle className="w-6 h-6 text-brand-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Welcome to SubTrack!</h3>
              <p className="text-slate-500 text-sm">
                Would you like a quick walkthrough of the features to get you started?
              </p>
            </div>
            
            <div className="space-y-3">
              <button 
                onClick={handleStartOnboarding}
                className="w-full py-2.5 px-4 bg-brand-600 hover:bg-brand-700 text-white font-medium rounded-xl shadow-lg shadow-brand-500/30 transition-transform active:scale-95"
              >
                Yes, show me around
              </button>
              <button 
                onClick={handleSkipOnboarding}
                className="w-full py-2.5 px-4 bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 font-medium rounded-xl transition-colors"
              >
                No thanks, I'll explore
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FULL ONBOARDING OVERLAY */}
      {isOnboardingActive && (
        <div className="fixed inset-0 z-[60]">
           <Onboarding onComplete={handleOnboardingComplete} />
        </div>
      )}
    </div>
  );
}