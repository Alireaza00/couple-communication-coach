
import React from 'react';
import { Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useSubscription } from '@/contexts/SubscriptionContext';
import { hasFeatureAccess } from '@/data/subscriptionPlans';

interface FeatureGateProps {
  /**
   * Feature name that should match a name in the subscription plans
   */
  feature: string;
  /**
   * Content to show when the user has access to the feature
   */
  children: React.ReactNode;
  /**
   * Optional custom message to show when user doesn't have access
   */
  lockedMessage?: string;
  /**
   * Optional custom fallback content to show instead of the default lock screen
   */
  fallback?: React.ReactNode;
}

const FeatureGate = ({
  feature,
  children,
  lockedMessage,
  fallback
}: FeatureGateProps) => {
  const { userSubscription } = useSubscription();
  
  const hasAccess = hasFeatureAccess(userSubscription.planId, feature);
  
  if (hasAccess) {
    return <>{children}</>;
  }
  
  if (fallback) {
    return <>{fallback}</>;
  }
  
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center bg-background border border-dashed rounded-lg min-h-[200px]">
      <Lock className="h-12 w-12 text-muted-foreground mb-4" />
      <h3 className="text-xl font-semibold mb-2">Premium Feature</h3>
      <p className="text-muted-foreground mb-4">
        {lockedMessage || `This feature requires a subscription plan that includes "${feature}".`}
      </p>
      <Link to="/pricing">
        <Button>Upgrade Your Plan</Button>
      </Link>
    </div>
  );
};

export default FeatureGate;
