
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { SubscriptionPlan, UserSubscription, SubscriptionStatus } from '@/types/subscription';
import { useAuth } from './AuthContext';
import { toast } from "sonner";
import { subscriptionPlans } from '@/data/subscriptionPlans';

interface SubscriptionContextType {
  currentPlan: SubscriptionPlan | null;
  userSubscription: UserSubscription;
  isLoading: boolean;
  upgradeSubscription: (planId: string, interval: 'monthly' | 'annual') => Promise<void>;
  cancelSubscription: () => Promise<void>;
  reactivateSubscription: () => Promise<void>;
}

const defaultUserSubscription: UserSubscription = {
  planId: null,
  status: 'none',
  currentPeriodEnd: null,
  cancelAtPeriodEnd: false
};

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

export const SubscriptionProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [userSubscription, setUserSubscription] = useState<UserSubscription>(defaultUserSubscription);
  const [currentPlan, setCurrentPlan] = useState<SubscriptionPlan | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch user subscription when user changes
  useEffect(() => {
    const fetchSubscription = async () => {
      if (!user) {
        setUserSubscription(defaultUserSubscription);
        setCurrentPlan(null);
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        // Mock implementation - would connect to Supabase in real implementation
        // Simulate free tier for now
        const mockSubscription: UserSubscription = {
          planId: 'free',
          status: 'active',
          currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
          cancelAtPeriodEnd: false
        };
        
        setUserSubscription(mockSubscription);
        
        // Find the current plan based on the planId
        const plan = subscriptionPlans.find(p => p.id === mockSubscription.planId) || null;
        setCurrentPlan(plan);
      } catch (error) {
        console.error('Error fetching subscription:', error);
        toast.error('Failed to load subscription details');
      } finally {
        setIsLoading(false);
      }
    };

    fetchSubscription();
  }, [user]);

  // Mock implementation of subscription management
  const upgradeSubscription = async (planId: string, interval: 'monthly' | 'annual') => {
    if (!user) {
      toast.error('Please sign in to upgrade your subscription');
      return;
    }

    try {
      setIsLoading(true);
      // This would connect to your payment processor in a real implementation
      console.log(`Upgrading to plan ${planId} with ${interval} interval`);
      
      // Mock success
      const plan = subscriptionPlans.find(p => p.id === planId) || null;
      
      // Update state
      const updatedSubscription: UserSubscription = {
        planId: planId,
        status: 'active',
        currentPeriodEnd: new Date(Date.now() + (interval === 'annual' ? 365 : 30) * 24 * 60 * 60 * 1000).toISOString(),
        cancelAtPeriodEnd: false
      };
      
      setUserSubscription(updatedSubscription);
      setCurrentPlan(plan);
      
      toast.success(`Successfully upgraded to ${plan?.name}`);
    } catch (error) {
      console.error('Error upgrading subscription:', error);
      toast.error('Failed to upgrade subscription');
    } finally {
      setIsLoading(false);
    }
  };

  const cancelSubscription = async () => {
    if (!user || !userSubscription.planId) {
      toast.error('No active subscription to cancel');
      return;
    }

    try {
      setIsLoading(true);
      
      // Mock implementation
      console.log('Cancelling subscription');
      
      // Update state to mark as cancelling at period end
      setUserSubscription({
        ...userSubscription,
        cancelAtPeriodEnd: true
      });
      
      toast.success('Your subscription will be canceled at the end of the current billing period');
    } catch (error) {
      console.error('Error cancelling subscription:', error);
      toast.error('Failed to cancel subscription');
    } finally {
      setIsLoading(false);
    }
  };

  const reactivateSubscription = async () => {
    if (!user || !userSubscription.planId || !userSubscription.cancelAtPeriodEnd) {
      toast.error('No subscription to reactivate');
      return;
    }

    try {
      setIsLoading(true);
      
      // Mock implementation
      console.log('Reactivating subscription');
      
      // Update state
      setUserSubscription({
        ...userSubscription,
        cancelAtPeriodEnd: false
      });
      
      toast.success('Your subscription has been reactivated');
    } catch (error) {
      console.error('Error reactivating subscription:', error);
      toast.error('Failed to reactivate subscription');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SubscriptionContext.Provider
      value={{
        currentPlan,
        userSubscription,
        isLoading,
        upgradeSubscription,
        cancelSubscription,
        reactivateSubscription
      }}
    >
      {children}
    </SubscriptionContext.Provider>
  );
};

export const useSubscription = () => {
  const context = useContext(SubscriptionContext);
  if (context === undefined) {
    throw new Error('useSubscription must be used within a SubscriptionProvider');
  }
  return context;
};
