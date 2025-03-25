
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { SubscriptionProvider } from "./contexts/SubscriptionContext";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Analysis from "./pages/Analysis";
import Interventions from "./pages/Interventions";
import DateNight from "./pages/DateNight";
import Progress from "./pages/Progress";
import HowItWorks from "./pages/HowItWorks";
import ConversationStarters from "./pages/ConversationStarters";
import DailyCheckIn from "./pages/DailyCheckIn";
import Account from "./pages/Account";
import Pricing from "./pages/Pricing";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <SubscriptionProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/analysis" element={<Analysis />} />
              <Route path="/interventions" element={<Interventions />} />
              <Route path="/date-night" element={<DateNight />} />
              <Route path="/progress" element={<Progress />} />
              <Route path="/conversation-starters" element={<ConversationStarters />} />
              <Route path="/daily-check-in" element={<DailyCheckIn />} />
              <Route path="/how-it-works" element={<HowItWorks />} />
              <Route path="/account" element={<Account />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </SubscriptionProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
