
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  MessageSquare, 
  Brain, 
  LineChart, 
  HeartHandshake, 
  Calendar, 
  ShieldCheck,
  ArrowRight, 
  CheckCircle2
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeatureCard from "@/components/FeatureCard";
import Footer from "@/components/Footer";

const Index = () => {
  // Smooth scroll to element when clicking hash links
  useEffect(() => {
    const handleHashLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const id = target.getAttribute('href')?.substring(1);
        const element = document.getElementById(id || '');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    document.addEventListener('click', handleHashLinkClick);
    return () => document.removeEventListener('click', handleHashLinkClick);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <Hero />
      
      {/* Features Section */}
      <section id="features" className="py-16 md:py-24">
        <div className="container-tight">
          <div className="mx-auto max-w-3xl text-center mb-16">
            <div className="badge mb-4">Features</div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Everything you need to improve your relationship
            </h2>
            <p className="mt-4 text-lg text-foreground/70">
              Our comprehensive suite of tools is designed to help you communicate better, understand each other deeper, and grow together.
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              title="Communication Analysis"
              description="Get insights into your communication patterns and learn how to express yourself more effectively."
              icon={MessageSquare}
              delay={100}
            />
            <FeatureCard
              title="Personalized Interventions"
              description="Receive tailored exercises and conversation prompts based on your specific relationship needs."
              icon={Brain}
              delay={200}
            />
            <FeatureCard
              title="Progress Tracking"
              description="Visualize your relationship growth over time with detailed metrics and feedback."
              icon={LineChart}
              delay={300}
            />
            <FeatureCard
              title="Conflict Resolution"
              description="Learn effective techniques to navigate disagreements and turn conflicts into opportunities for growth."
              icon={HeartHandshake}
              delay={400}
            />
            <FeatureCard
              title="Date Night Generator"
              description="Get personalized date ideas that align with your shared interests and relationship goals."
              icon={Calendar}
              delay={500}
            />
            <FeatureCard
              title="Private & Secure"
              description="Your conversations and relationship data are fully encrypted and never shared with third parties."
              icon={ShieldCheck}
              delay={600}
            />
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section id="how-it-works" className="py-16 md:py-24 bg-gradient-to-b from-white to-ocean-50">
        <div className="container-tight">
          <div className="mx-auto max-w-3xl text-center mb-16">
            <div className="badge mb-4">How It Works</div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Simple steps to a stronger relationship
            </h2>
            <p className="mt-4 text-lg text-foreground/70">
              Our approach is backed by relationship psychology and communication science to help you build a more fulfilling connection.
            </p>
          </div>
          
          <div className="relative">
            {/* Connect the steps with a line */}
            <div className="absolute left-[50%] top-0 bottom-0 w-0.5 bg-primary/20 hidden md:block" aria-hidden="true"></div>
            
            <div className="space-y-16">
              {/* Step 1 */}
              <div className="relative">
                <div className="flex flex-col md:flex-row items-center">
                  <div className="md:w-1/2 md:pr-12 md:text-right">
                    <div className="mb-4 animate-fade-in-up">
                      <span className="text-sm font-medium text-primary">Step 1</span>
                      <h3 className="text-2xl font-bold mt-1">Record Conversations</h3>
                      <p className="mt-2 text-foreground/70">
                        Have natural conversations with your partner about various topics while our app records and analyzes your communication patterns.
                      </p>
                    </div>
                  </div>
                  <div className="md:w-1/2 md:pl-12 flex justify-center md:justify-start animate-fade-in-up">
                    <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-sm">
                      <div className="aspect-video bg-ocean-100 rounded-lg flex items-center justify-center mb-4">
                        <MessageSquare className="h-10 w-10 text-ocean-500" />
                      </div>
                      <div className="space-y-2">
                        <div className="h-3 bg-gray-200 rounded-full w-full"></div>
                        <div className="h-3 bg-gray-200 rounded-full w-2/3"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute top-0 left-[50%] transform -translate-x-1/2 -translate-y-1/2 hidden md:flex">
                  <div className="h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center">
                    1
                  </div>
                </div>
              </div>
              
              {/* Step 2 */}
              <div className="relative">
                <div className="flex flex-col md:flex-row-reverse items-center">
                  <div className="md:w-1/2 md:pl-12">
                    <div className="mb-4 animate-fade-in-up">
                      <span className="text-sm font-medium text-primary">Step 2</span>
                      <h3 className="text-2xl font-bold mt-1">Receive Personalized Insights</h3>
                      <p className="mt-2 text-foreground/70">
                        Our AI analyzes your communication style, identifies patterns, and provides actionable insights to improve your relationship.
                      </p>
                    </div>
                  </div>
                  <div className="md:w-1/2 md:pr-12 flex justify-center md:justify-end animate-fade-in-up">
                    <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-sm">
                      <div className="aspect-video bg-love-100 rounded-lg flex items-center justify-center mb-4">
                        <Brain className="h-10 w-10 text-love-500" />
                      </div>
                      <div className="space-y-2">
                        <div className="h-3 bg-gray-200 rounded-full w-full"></div>
                        <div className="h-3 bg-gray-200 rounded-full w-3/4"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute top-0 left-[50%] transform -translate-x-1/2 -translate-y-1/2 hidden md:flex">
                  <div className="h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center">
                    2
                  </div>
                </div>
              </div>
              
              {/* Step 3 */}
              <div className="relative">
                <div className="flex flex-col md:flex-row items-center">
                  <div className="md:w-1/2 md:pr-12 md:text-right">
                    <div className="mb-4 animate-fade-in-up">
                      <span className="text-sm font-medium text-primary">Step 3</span>
                      <h3 className="text-2xl font-bold mt-1">Practice with Guided Exercises</h3>
                      <p className="mt-2 text-foreground/70">
                        Follow personalized exercises and conversation prompts designed to strengthen your connection and improve communication.
                      </p>
                    </div>
                  </div>
                  <div className="md:w-1/2 md:pl-12 flex justify-center md:justify-start animate-fade-in-up">
                    <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-sm">
                      <div className="aspect-video bg-mint-100 rounded-lg flex items-center justify-center mb-4">
                        <HeartHandshake className="h-10 w-10 text-mint-500" />
                      </div>
                      <div className="space-y-2">
                        <div className="h-3 bg-gray-200 rounded-full w-full"></div>
                        <div className="h-3 bg-gray-200 rounded-full w-1/2"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute top-0 left-[50%] transform -translate-x-1/2 -translate-y-1/2 hidden md:flex">
                  <div className="h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center">
                    3
                  </div>
                </div>
              </div>
              
              {/* Step 4 */}
              <div className="relative">
                <div className="flex flex-col md:flex-row-reverse items-center">
                  <div className="md:w-1/2 md:pl-12">
                    <div className="mb-4 animate-fade-in-up">
                      <span className="text-sm font-medium text-primary">Step 4</span>
                      <h3 className="text-2xl font-bold mt-1">Track Your Progress</h3>
                      <p className="mt-2 text-foreground/70">
                        Watch your relationship grow as you track improvements in communication, emotional connection, and conflict resolution.
                      </p>
                    </div>
                  </div>
                  <div className="md:w-1/2 md:pr-12 flex justify-center md:justify-end animate-fade-in-up">
                    <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-sm">
                      <div className="aspect-video bg-ocean-100 rounded-lg flex items-center justify-center mb-4">
                        <LineChart className="h-10 w-10 text-ocean-500" />
                      </div>
                      <div className="space-y-2">
                        <div className="h-3 bg-gray-200 rounded-full w-full"></div>
                        <div className="h-3 bg-gray-200 rounded-full w-4/5"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute top-0 left-[50%] transform -translate-x-1/2 -translate-y-1/2 hidden md:flex">
                  <div className="h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center">
                    4
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-16 md:py-24">
        <div className="container-tight">
          <div className="mx-auto max-w-3xl text-center mb-16">
            <div className="badge mb-4">Testimonials</div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Real couples, real results
            </h2>
            <p className="mt-4 text-lg text-foreground/70">
              Hear from couples who have transformed their relationships with our communication coach.
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Testimonial 1 */}
            <div className="glass rounded-2xl p-8 shadow-sm animate-fade-in-up">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-medium">
                  JM
                </div>
                <div className="ml-4">
                  <h4 className="font-medium">Jessica & Mark</h4>
                  <p className="text-sm text-foreground/70">Together 5 years</p>
                </div>
              </div>
              <p className="text-foreground/80 italic">
                "The communication insights were eye-opening. I didn't realize how often I was interrupting my partner. This app helped us develop much healthier conversation patterns."
              </p>
            </div>
            
            {/* Testimonial 2 */}
            <div className="glass rounded-2xl p-8 shadow-sm animate-fade-in-up" style={{ animationDelay: "100ms" }}>
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-medium">
                  DL
                </div>
                <div className="ml-4">
                  <h4 className="font-medium">David & Lisa</h4>
                  <p className="text-sm text-foreground/70">Together 2 years</p>
                </div>
              </div>
              <p className="text-foreground/80 italic">
                "The personalized exercises helped us work through communication issues that were causing unnecessary arguments. Now we have tools to resolve conflicts before they escalate."
              </p>
            </div>
            
            {/* Testimonial 3 */}
            <div className="glass rounded-2xl p-8 shadow-sm animate-fade-in-up" style={{ animationDelay: "200ms" }}>
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-medium">
                  AS
                </div>
                <div className="ml-4">
                  <h4 className="font-medium">Alex & Sarah</h4>
                  <p className="text-sm text-foreground/70">Together 8 years</p>
                </div>
              </div>
              <p className="text-foreground/80 italic">
                "Even after 8 years together, we learned new ways to listen and connect with each other. The date night suggestions have been fantastic for keeping our relationship fresh."
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-primary/5 relative overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-primary/10 blur-3xl" aria-hidden="true" />
        <div className="absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-ocean-100 blur-3xl" aria-hidden="true" />
        
        <div className="container-tight relative">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Ready to transform your relationship?
            </h2>
            <p className="mt-4 text-lg text-foreground/70">
              Join thousands of couples who have strengthened their connection with our AI-powered communication coach.
            </p>
            
            <div className="mt-10 space-y-4">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <Link to="/auth?mode=signup" className="btn-primary flex items-center gap-2 w-full sm:w-auto">
                  Get Started <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              
              <p className="text-sm text-foreground/70 flex flex-col sm:flex-row items-center justify-center gap-4">
                <span className="flex items-center">
                  <CheckCircle2 className="h-4 w-4 text-primary mr-2" />
                  Free 7-day trial
                </span>
                <span className="flex items-center">
                  <CheckCircle2 className="h-4 w-4 text-primary mr-2" />
                  No credit card required
                </span>
                <span className="flex items-center">
                  <CheckCircle2 className="h-4 w-4 text-primary mr-2" />
                  Cancel anytime
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
