
export type PlanFeature = {
  name: string;
  included: boolean;
  highlight?: boolean;
}

export type SubscriptionPlan = {
  id: string;
  name: string;
  description: string;
  price: {
    monthly: number;
    annual: number;
  };
  features: PlanFeature[];
  recommended?: boolean;
  buttonText: string;
  trialDays?: number;
}

export type SubscriptionStatus = 'active' | 'trialing' | 'past_due' | 'canceled' | 'incomplete' | 'incomplete_expired' | 'unpaid' | 'none';

export interface UserSubscription {
  planId: string | null;
  status: SubscriptionStatus;
  currentPeriodEnd: string | null;
  cancelAtPeriodEnd: boolean;
}
