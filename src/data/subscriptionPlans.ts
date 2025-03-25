
import { SubscriptionPlan } from '@/types/subscription';

export const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: 'free',
    name: 'Free',
    description: 'Basic tools for improving your relationship',
    price: {
      monthly: 0,
      annual: 0
    },
    features: [
      { name: '3 conversation recordings per month', included: true },
      { name: 'Basic communication analysis', included: true },
      { name: 'Daily check-ins', included: true },
      { name: 'Limited conversation starters', included: true },
      { name: 'Community support', included: true },
      { name: 'Advanced communication insights', included: false },
      { name: 'Unlimited recordings', included: false },
      { name: 'Personalized relationship exercises', included: false },
      { name: 'Relationship progress tracking', included: false },
      { name: 'Priority support', included: false }
    ],
    buttonText: 'Get Started'
  },
  {
    id: 'essential',
    name: 'Essential',
    description: 'Everything you need for relationship growth',
    price: {
      monthly: 9.99,
      annual: 99.99
    },
    features: [
      { name: '10 conversation recordings per month', included: true },
      { name: 'Basic communication analysis', included: true },
      { name: 'Daily check-ins', included: true },
      { name: 'Full conversation starters library', included: true, highlight: true },
      { name: 'Community support', included: true },
      { name: 'Advanced communication insights', included: true, highlight: true },
      { name: 'Date night recommendations', included: true, highlight: true },
      { name: 'Personalized relationship exercises', included: false },
      { name: 'Relationship progress tracking', included: false },
      { name: 'Priority support', included: false }
    ],
    buttonText: 'Start 7-Day Free Trial',
    trialDays: 7,
    recommended: true
  },
  {
    id: 'premium',
    name: 'Premium',
    description: 'Complete toolkit for relationship mastery',
    price: {
      monthly: 19.99,
      annual: 199.99
    },
    features: [
      { name: 'Unlimited conversation recordings', included: true, highlight: true },
      { name: 'Advanced communication analysis', included: true, highlight: true },
      { name: 'Daily check-ins', included: true },
      { name: 'Full conversation starters library', included: true },
      { name: 'Community support', included: true },
      { name: 'Advanced communication insights', included: true },
      { name: 'Date night recommendations', included: true },
      { name: 'Personalized relationship exercises', included: true, highlight: true },
      { name: 'Relationship progress tracking', included: true, highlight: true },
      { name: 'Priority support', included: true, highlight: true }
    ],
    buttonText: 'Start 14-Day Free Trial',
    trialDays: 14
  }
];

// Helper function to get features based on plan ID
export const getPlanFeatures = (planId: string | null): string[] => {
  if (!planId) return [];
  
  const plan = subscriptionPlans.find(p => p.id === planId);
  if (!plan) return [];
  
  return plan.features
    .filter(feature => feature.included)
    .map(feature => feature.name);
};

// Helper function to check if user has access to a specific feature
export const hasFeatureAccess = (planId: string | null, featureName: string): boolean => {
  if (!planId) return false;
  
  const plan = subscriptionPlans.find(p => p.id === planId);
  if (!plan) return false;
  
  const feature = plan.features.find(f => f.name === featureName);
  return feature?.included || false;
};
