
import { useState } from 'react';
import { Calendar, CreditCard, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { useSubscription } from '@/contexts/SubscriptionContext';
import { subscriptionPlans } from '@/data/subscriptionPlans';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';

const SubscriptionManager = () => {
  const { currentPlan, userSubscription, cancelSubscription, reactivateSubscription } = useSubscription();
  const [isCancelling, setIsCancelling] = useState(false);
  const [isReactivating, setIsReactivating] = useState(false);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  
  const handleCancelSubscription = async () => {
    try {
      setIsCancelling(true);
      await cancelSubscription();
      setShowCancelDialog(false);
    } catch (error) {
      console.error('Error cancelling subscription:', error);
    } finally {
      setIsCancelling(false);
    }
  };
  
  const handleReactivateSubscription = async () => {
    try {
      setIsReactivating(true);
      await reactivateSubscription();
    } catch (error) {
      console.error('Error reactivating subscription:', error);
    } finally {
      setIsReactivating(false);
    }
  };
  
  const getStatusBadge = () => {
    switch (userSubscription.status) {
      case 'active':
        return <Badge variant="default" className="bg-green-500">Active</Badge>;
      case 'trialing':
        return <Badge variant="outline" className="border-primary text-primary">Trial</Badge>;
      case 'past_due':
        return <Badge variant="destructive">Past Due</Badge>;
      case 'canceled':
        return <Badge variant="outline" className="border-muted-foreground text-muted-foreground">Canceled</Badge>;
      default:
        return <Badge variant="outline">None</Badge>;
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Subscription Details</span>
          {getStatusBadge()}
        </CardTitle>
        <CardDescription>Manage your subscription plan and billing</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {currentPlan ? (
          <>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">{currentPlan.name} Plan</h3>
                <p className="text-sm text-muted-foreground">{currentPlan.description}</p>
              </div>
              <div className="text-right">
                <p className="font-medium">
                  ${userSubscription.planId === 'free' ? '0.00' : 
                    userSubscription.cancelAtPeriodEnd ? 
                      (currentPlan.price.monthly).toFixed(2) : 
                      (currentPlan.price.monthly).toFixed(2)}
                </p>
                <p className="text-xs text-muted-foreground">per month</p>
              </div>
            </div>
            
            {userSubscription.currentPeriodEnd && (
              <div className="flex items-center text-sm text-muted-foreground">
                <Calendar className="mr-2 h-4 w-4" />
                {userSubscription.cancelAtPeriodEnd ? (
                  <span>
                    Your subscription will end on{' '}
                    <span className="font-medium">
                      {format(new Date(userSubscription.currentPeriodEnd), 'MMMM d, yyyy')}
                    </span>
                  </span>
                ) : (
                  <span>
                    Next billing date:{' '}
                    <span className="font-medium">
                      {format(new Date(userSubscription.currentPeriodEnd), 'MMMM d, yyyy')}
                    </span>
                  </span>
                )}
              </div>
            )}
            
            {userSubscription.cancelAtPeriodEnd && (
              <div className="rounded-md bg-amber-50 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <AlertCircle className="h-5 w-5 text-amber-400" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-amber-800">Subscription Canceled</h3>
                    <div className="mt-2 text-sm text-amber-700">
                      <p>
                        Your subscription has been canceled but you still have access until your current billing period ends.
                      </p>
                    </div>
                    <div className="mt-4">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={handleReactivateSubscription}
                        disabled={isReactivating}
                      >
                        {isReactivating ? (
                          <>
                            <span className="animate-spin mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full"></span>
                            Processing...
                          </>
                        ) : (
                          <>Reactivate Subscription</>
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div className="pt-2">
              <h4 className="text-sm font-semibold mb-2">Your Plan Includes:</h4>
              <ul className="space-y-1">
                {currentPlan.features
                  .filter(feature => feature.included)
                  .map((feature, index) => (
                    <li key={index} className="flex items-center text-sm">
                      <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                      {feature.name}
                    </li>
                  ))}
              </ul>
            </div>
          </>
        ) : (
          <div className="text-center py-4">
            <p className="mb-4">You don't have an active subscription</p>
            <Link to="/pricing">
              <Button>View Plans</Button>
            </Link>
          </div>
        )}
      </CardContent>
      
      {currentPlan && currentPlan.id !== 'free' && !userSubscription.cancelAtPeriodEnd && (
        <CardFooter className="flex justify-between">
          <Dialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
            <DialogTrigger asChild>
              <Button variant="outline">Cancel Subscription</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Cancel your subscription?</DialogTitle>
                <DialogDescription>
                  Are you sure you want to cancel your subscription? You'll continue to have access until the end of your current billing period on {userSubscription.currentPeriodEnd ? format(new Date(userSubscription.currentPeriodEnd), 'MMMM d, yyyy') : 'your billing date'}.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="gap-2 sm:justify-start">
                <Button
                  variant="destructive"
                  onClick={handleCancelSubscription}
                  disabled={isCancelling}
                >
                  {isCancelling ? (
                    <>
                      <span className="animate-spin mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full"></span>
                      Processing...
                    </>
                  ) : (
                    <>Yes, Cancel</>
                  )}
                </Button>
                <Button variant="outline" onClick={() => setShowCancelDialog(false)}>
                  No, Keep It
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          
          <Link to="/pricing">
            <Button variant="default">Change Plan</Button>
          </Link>
        </CardFooter>
      )}
    </Card>
  );
};

export default SubscriptionManager;
