
import { useState } from "react";
import { CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { subscriptionPlans } from "@/data/subscriptionPlans";
import { useSubscription } from "@/contexts/SubscriptionContext";
import { useNavigate } from "react-router-dom";

const Pricing = () => {
  const { user } = useAuth();
  const { currentPlan, upgradeSubscription } = useSubscription();
  const [billingInterval, setBillingInterval] = useState<'monthly' | 'annual'>('monthly');
  const [isProcessing, setIsProcessing] = useState<string | null>(null);
  const navigate = useNavigate();
  
  const handleSubscribe = async (planId: string) => {
    if (!user) {
      navigate('/auth?mode=signup&redirect=pricing');
      return;
    }
    
    try {
      setIsProcessing(planId);
      await upgradeSubscription(planId, billingInterval);
      navigate('/dashboard');
    } catch (error) {
      console.error('Error subscribing:', error);
    } finally {
      setIsProcessing(null);
    }
  };
  
  const getButtonText = (planId: string, buttonText: string) => {
    if (currentPlan?.id === planId) {
      return 'Current Plan';
    }
    return buttonText;
  };
  
  const discount = 17; // Annual discount percentage
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-[100px] pb-20">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12 md:mb-16">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">Choose Your Plan</h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
              Invest in your relationship with our flexible subscription options
            </p>
            
            <div className="flex items-center justify-center mt-8">
              <span className={cn("text-sm mr-2", billingInterval === "monthly" ? "font-semibold" : "text-muted-foreground")}>
                Monthly
              </span>
              <Switch
                checked={billingInterval === "annual"}
                onCheckedChange={(checked) => setBillingInterval(checked ? "annual" : "monthly")}
              />
              <span className={cn("text-sm ml-2 flex items-center", billingInterval === "annual" ? "font-semibold" : "text-muted-foreground")}>
                Yearly
                <span className="ml-1.5 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                  Save {discount}%
                </span>
              </span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {subscriptionPlans.map((plan) => {
              const price = billingInterval === 'annual' ? plan.price.annual : plan.price.monthly;
              return (
                <div
                  key={plan.id}
                  className={cn(
                    "glass rounded-xl p-6 shadow-sm border border-transparent relative overflow-hidden transition-all duration-300",
                    plan.recommended ? "border-primary" : "",
                    currentPlan?.id === plan.id ? "ring-2 ring-primary" : ""
                  )}
                >
                  {plan.recommended && (
                    <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-bl-lg">
                      Recommended
                    </div>
                  )}
                  
                  <div className="mb-4">
                    <h3 className="text-xl font-bold">{plan.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{plan.description}</p>
                  </div>
                  
                  <div className="mb-6">
                    <div className="flex items-baseline">
                      <span className="text-3xl font-bold">${price}</span>
                      <span className="text-muted-foreground ml-1">
                        /{billingInterval === 'annual' ? 'year' : 'month'}
                      </span>
                    </div>
                    {billingInterval === 'annual' && plan.id !== 'free' && (
                      <p className="text-xs text-muted-foreground mt-1">
                        ${(plan.price.monthly * 12).toFixed(2)} billed monthly
                      </p>
                    )}
                  </div>
                  
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        {feature.included ? (
                          <CheckCircle2 className={cn("h-5 w-5 mr-2 flex-shrink-0", feature.highlight ? "text-primary" : "text-muted-foreground")} />
                        ) : (
                          <XCircle className="h-5 w-5 mr-2 flex-shrink-0 text-muted-foreground" />
                        )}
                        <span className={cn("text-sm", feature.highlight ? "font-medium" : "")}>{feature.name}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button
                    variant={plan.id === 'free' ? "outline" : "default"}
                    className="w-full"
                    disabled={currentPlan?.id === plan.id || isProcessing !== null}
                    onClick={() => handleSubscribe(plan.id)}
                  >
                    {isProcessing === plan.id ? (
                      <span className="flex items-center">
                        <span className="animate-spin mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full"></span>
                        Processing...
                      </span>
                    ) : (
                      getButtonText(plan.id, plan.buttonText)
                    )}
                  </Button>
                  
                  {plan.trialDays && plan.id !== currentPlan?.id && (
                    <p className="text-xs text-center mt-2 text-muted-foreground">
                      {plan.trialDays}-day free trial, cancel anytime
                    </p>
                  )}
                </div>
              );
            })}
          </div>
          
          <div className="mt-16 text-center">
            <h3 className="text-xl font-semibold mb-4">Questions? We're here to help</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="glass rounded-lg p-6">
                <h4 className="font-medium mb-2">Can I cancel anytime?</h4>
                <p className="text-sm text-muted-foreground">
                  Yes, you can cancel your subscription at any time. Your plan will remain active until the end of your current billing period.
                </p>
              </div>
              <div className="glass rounded-lg p-6">
                <h4 className="font-medium mb-2">What payment methods do you accept?</h4>
                <p className="text-sm text-muted-foreground">
                  We accept all major credit cards, PayPal, and Apple Pay for subscription payments.
                </p>
              </div>
              <div className="glass rounded-lg p-6">
                <h4 className="font-medium mb-2">Do you offer refunds?</h4>
                <p className="text-sm text-muted-foreground">
                  If you're not satisfied, contact us within 14 days of your purchase for a full refund.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Pricing;
