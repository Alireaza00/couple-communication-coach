
import { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Mail, Lock, User, Heart } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const Auth = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");
  const [isLoading, setIsLoading] = useState(false);
  
  // Form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [partnerEmail, setPartnerEmail] = useState("");
  
  useEffect(() => {
    // Set auth mode based on URL query param
    const searchParams = new URLSearchParams(location.search);
    const mode = searchParams.get("mode");
    if (mode === "login" || mode === "signup") {
      setAuthMode(mode);
    }
  }, [location.search]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Mock authentication logic - in a real app, this would connect to Supabase
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (authMode === "signup") {
        toast.success("Account created successfully! Please check your email for verification.");
      } else {
        toast.success("Login successful! Redirecting to dashboard...");
        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
      console.error("Auth error:", error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const toggleAuthMode = () => {
    const newMode = authMode === "login" ? "signup" : "login";
    setAuthMode(newMode);
    
    // Update URL query param without page reload
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("mode", newMode);
    navigate({ search: searchParams.toString() }, { replace: true });
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header with back button */}
      <header className="p-4">
        <Link to="/" className="inline-flex items-center text-foreground/70 hover:text-primary">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to home
        </Link>
      </header>
      
      <div className="flex flex-1 items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <div className="mx-auto h-12 w-12 rounded-full bg-primary flex items-center justify-center">
              <Heart className="h-6 w-6 text-white" />
            </div>
            <h2 className="mt-6 text-3xl font-bold tracking-tight">
              {authMode === "login" ? "Welcome back" : "Create your account"}
            </h2>
            <p className="mt-2 text-sm text-foreground/70">
              {authMode === "login" 
                ? "Sign in to access your account" 
                : "Start your journey to better communication"}
            </p>
          </div>
          
          <div className="mt-8">
            <div className="glass rounded-xl p-8 shadow-md">
              <form className="space-y-6" onSubmit={handleSubmit}>
                {authMode === "signup" && (
                  <div className="space-y-4">
                    <label htmlFor="name" className="block text-sm font-medium">
                      Your Name
                    </label>
                    <div className="relative">
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        required
                        className="pl-10"
                        placeholder="Enter your full name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                      <User className="absolute left-3 top-2.5 h-5 w-5 text-foreground/40" />
                    </div>
                  </div>
                )}
                
                <div className="space-y-4">
                  <label htmlFor="email" className="block text-sm font-medium">
                    Email Address
                  </label>
                  <div className="relative">
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="pl-10"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <Mail className="absolute left-3 top-2.5 h-5 w-5 text-foreground/40" />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label htmlFor="password" className="block text-sm font-medium">
                      Password
                    </label>
                    {authMode === "login" && (
                      <a href="#" className="text-sm font-medium text-primary hover:text-primary/80">
                        Forgot password?
                      </a>
                    )}
                  </div>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete={authMode === "login" ? "current-password" : "new-password"}
                      required
                      className="pl-10"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <Lock className="absolute left-3 top-2.5 h-5 w-5 text-foreground/40" />
                  </div>
                </div>
                
                {authMode === "signup" && (
                  <div className="space-y-4">
                    <label htmlFor="partnerEmail" className="block text-sm font-medium">
                      Partner's Email (Optional)
                    </label>
                    <div className="relative">
                      <Input
                        id="partnerEmail"
                        name="partnerEmail"
                        type="email"
                        className="pl-10"
                        placeholder="partner@example.com"
                        value={partnerEmail}
                        onChange={(e) => setPartnerEmail(e.target.value)}
                      />
                      <Mail className="absolute left-3 top-2.5 h-5 w-5 text-foreground/40" />
                    </div>
                    <p className="text-xs text-foreground/60">
                      We'll send an invitation to your partner to join you on your communication journey.
                    </p>
                  </div>
                )}
                
                <div>
                  <Button 
                    type="submit" 
                    className="w-full h-11 text-base"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        {authMode === "login" ? "Signing in..." : "Creating account..."}
                      </span>
                    ) : (
                      <span>{authMode === "login" ? "Sign in" : "Create account"}</span>
                    )}
                  </Button>
                </div>
              </form>
              
              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300/50"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-foreground/70">Or</span>
                  </div>
                </div>
                
                <div className="mt-6 text-center text-sm">
                  <span className="text-foreground/70">
                    {authMode === "login" ? "Don't have an account? " : "Already have an account? "}
                  </span>
                  <button
                    type="button"
                    onClick={toggleAuthMode}
                    className="font-medium text-primary hover:text-primary/80"
                  >
                    {authMode === "login" ? "Sign up" : "Sign in"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
