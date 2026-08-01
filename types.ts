export interface Subscription {
  id: string;
  name: string;
  amount: number;
  billingDate: string; // YYYY-MM-DD
  dueDate?: string; // YYYY-MM-DD
  category: Category;
  reminderEnabled?: boolean;
  lastNotifiedDate?: string; // YYYY-MM-DD
}

export enum Category {
  ENTERTAINMENT = 'Entertainment',
  UTILITIES = 'Utilities',
  HEALTH = 'Health & Fitness',
  PRODUCTIVITY = 'Productivity',
  FOOD = 'Food & Drink',
  OTHER = 'Other'
}

export const CATEGORY_COLORS: Record<Category, string> = {
  [Category.ENTERTAINMENT]: 'bg-purple-100 text-purple-700',
  [Category.UTILITIES]: 'bg-blue-100 text-blue-700',
  [Category.HEALTH]: 'bg-green-100 text-green-700',
  [Category.PRODUCTIVITY]: 'bg-orange-100 text-orange-700',
  [Category.FOOD]: 'bg-red-100 text-red-700',
  [Category.OTHER]: 'bg-slate-100 text-slate-700',
};

export interface User {
  name: string;
  email: string;
  avatar: string;
  hasCompletedOnboarding: boolean;
}

export type View = 'home' | 'insights' | 'profile';