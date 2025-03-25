
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { SubscriptionPlan, UserSubscription, SubscriptionStatus } from '@/types/subscription';
import { useAuth } from './AuthContext';
import { toast } from "sonner";
import { subscriptionPlans } from '@/data/subscriptionPlans';
import { getUserSubscription, updateSubscription } from '@/services/supabaseApi';

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
        
        // Fetch subscription from Supabase
        const subscription = await getUserSubscription(user.uid);
        
        if (subscription) {
          const mappedSubscription: UserSubscription = {
            planId: subscription.plan_id,
            status: subscription.status as SubscriptionStatus,
            currentPeriodEnd: subscription.current_period_end,
            cancelAtPeriodEnd: subscription.cancel_at_period_end
          };
          
          setUserSubscription(mappedSubscription);
          
          // Find the current plan based on the planId
          const plan = subscriptionPlans.find(p => p.id === mappedSubscription.planId) || null;
          setCurrentPlan(plan);
        } else {
          // Set to free plan if no subscription exists
          const freeSubscription: UserSubscription = {
            planId: 'free',
            status: 'active',
            currentPeriodEnd: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(), // 1 year from now
            cancelAtPeriodEnd: false
          };
          
          setUserSubscription(freeSubscription);
          
          // Find the free plan
          const plan = subscriptionPlans.find(p => p.id === 'free') || null;
          setCurrentPlan(plan);
          
          // Create the free subscription in the database
          await updateSubscription(
            user.uid,
            'free',
            'active',
            freeSubscription.currentPeriodEnd as string,
            false
          );
        }
      } catch (error) {
        console.error('Error fetching subscription:', error);
        toast.error('Failed to load subscription details');
        
        // Fallback to free plan
        setUserSubscription({
          planId: 'free',
          status: 'active',
          currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
          cancelAtPeriodEnd: false
        });
        setCurrentPlan(subscriptionPlans.find(p => p.id === 'free') || null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSubscription();
  }, [user]);

  const upgradeSubscription = async (planId: string, interval: 'monthly' | 'annual') => {
    if (!user) {
      toast.error('Please sign in to upgrade your subscription');
      return;
    }

    try {
      setIsLoading(true);
      
      // In a real implementation, this would connect to Stripe or another payment processor
      console.log(`Upgrading to plan ${planId} with ${interval} interval`);
      
      // Calculate the end date based on the interval
      const currentPeriodEnd = new Date(Date.now() + (interval === 'annual' ? 365 : 30) * 24 * 60 * 60 * 1000).toISOString();
      
      // Update subscription in Supabase
      await updateSubscription(
        user.uid,
        planId,
        'active',
        currentPeriodEnd,
        false
      );
      
      // Update local state
      const plan = subscriptionPlans.find(p => p.id === planId) || null;
      
      const updatedSubscription: UserSubscription = {
        planId: planId,
        status: 'active',
        currentPeriodEnd: currentPeriodEnd,
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
      
      // Update subscription in Supabase
      await updateSubscription(
        user.uid,
        userSubscription.planId,
        userSubscription.status,
        userSubscription.currentPeriodEnd as string,
        true
      );
      
      // Update local state
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
      
      // Update subscription in Supabase
      await updateSubscription(
        user.uid,
        userSubscription.planId,
        userSubscription.status,
        userSubscription.currentPeriodEnd as string,
        false
      );
      
      // Update local state
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
