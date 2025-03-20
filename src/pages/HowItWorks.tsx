
import { 
  ArrowRight,
  MessageSquare, 
  Brain, 
  LineChart, 
  HeartHandshake 
} from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const HowItWorks = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden pt-[120px] pb-16">
        <div className="absolute inset-0 -z-10 h-full w-full bg-gradient-to-b from-primary/5 to-transparent" aria-hidden="true" />
        
        <div className="container-tight">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl leading-tight animate-fade-in-up">
              How Couple Coach Works
            </h1>
            <p className="mt-6 text-lg leading-8 text-foreground/70 md:text-xl animate-fade-in-up">
              Our science-backed approach helps couples improve communication and strengthen their relationship through personalized insights and exercises.
            </p>
          </div>
        </div>
      </div>
      
      {/* Detailed Steps Section */}
      <section className="py-16 md:py-24">
        <div className="container-tight">
          <div className="space-y-24">
            {/* Step 1 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                <div className="badge mb-4">Step 1</div>
                <h2 className="text-3xl font-bold tracking-tight mb-6">Record Conversations</h2>
                <p className="text-lg text-foreground/70 mb-4">
                  Using our secure platform, you and your partner engage in guided conversations about various topics that matter to your relationship.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center text-primary mr-3 mt-0.5">
                      1
                    </div>
                    <span>Choose from our library of conversation starters</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center text-primary mr-3 mt-0.5">
                      2
                    </div>
                    <span>Record your conversation in a comfortable setting</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center text-primary mr-3 mt-0.5">
                      3
                    </div>
                    <span>Our AI securely processes your conversation patterns</span>
                  </li>
                </ul>
              </div>
              <div className="order-1 md:order-2">
                <div className="glass rounded-2xl p-8 shadow-md aspect-square flex items-center justify-center">
                  <MessageSquare className="h-32 w-32 text-primary opacity-80" />
                </div>
              </div>
            </div>
            
            {/* Step 2 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="md:order-2">
                <div className="badge mb-4">Step 2</div>
                <h2 className="text-3xl font-bold tracking-tight mb-6">Receive Personalized Insights</h2>
                <p className="text-lg text-foreground/70 mb-4">
                  Our AI analyzes communication patterns, identifies areas for improvement, and provides actionable insights specific to your relationship dynamics.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center text-primary mr-3 mt-0.5">
                      1
                    </div>
                    <span>Identify communication styles and patterns</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center text-primary mr-3 mt-0.5">
                      2
                    </div>
                    <span>Highlight strengths and potential growth areas</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center text-primary mr-3 mt-0.5">
                      3
                    </div>
                    <span>Receive tailored recommendations for improvement</span>
                  </li>
                </ul>
              </div>
              <div className="md:order-1">
                <div className="glass rounded-2xl p-8 shadow-md aspect-square flex items-center justify-center">
                  <Brain className="h-32 w-32 text-love-500 opacity-80" />
                </div>
              </div>
            </div>
            
            {/* Step 3 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                <div className="badge mb-4">Step 3</div>
                <h2 className="text-3xl font-bold tracking-tight mb-6">Practice with Guided Exercises</h2>
                <p className="text-lg text-foreground/70 mb-4">
                  Based on your unique communication profile, we provide personalized activities and exercises designed to strengthen your connection.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center text-primary mr-3 mt-0.5">
                      1
                    </div>
                    <span>Complete personalized communication exercises</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center text-primary mr-3 mt-0.5">
                      2
                    </div>
                    <span>Practice active listening and empathetic responding</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center text-primary mr-3 mt-0.5">
                      3
                    </div>
                    <span>Develop strategies for navigating difficult conversations</span>
                  </li>
                </ul>
              </div>
              <div className="order-1 md:order-2">
                <div className="glass rounded-2xl p-8 shadow-md aspect-square flex items-center justify-center">
                  <HeartHandshake className="h-32 w-32 text-mint-500 opacity-80" />
                </div>
              </div>
            </div>
            
            {/* Step 4 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="md:order-2">
                <div className="badge mb-4">Step 4</div>
                <h2 className="text-3xl font-bold tracking-tight mb-6">Track Your Progress</h2>
                <p className="text-lg text-foreground/70 mb-4">
                  Visualize your relationship growth over time with detailed metrics that help you celebrate improvements and identify ongoing opportunities.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center text-primary mr-3 mt-0.5">
                      1
                    </div>
                    <span>View relationship growth metrics and trends</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center text-primary mr-3 mt-0.5">
                      2
                    </div>
                    <span>Celebrate communication improvements together</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center text-primary mr-3 mt-0.5">
                      3
                    </div>
                    <span>Receive ongoing personalized recommendations</span>
                  </li>
                </ul>
              </div>
              <div className="md:order-1">
                <div className="glass rounded-2xl p-8 shadow-md aspect-square flex items-center justify-center">
                  <LineChart className="h-32 w-32 text-ocean-500 opacity-80" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-primary/5 relative overflow-hidden">
        <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-primary/10 blur-3xl" aria-hidden="true" />
        <div className="absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-ocean-100 blur-3xl" aria-hidden="true" />
        
        <div className="container-tight relative">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Start your relationship journey today
            </h2>
            <p className="mt-4 text-lg text-foreground/70">
              Experience the benefits of AI-powered relationship communication coaching with our easy-to-use platform.
            </p>
            
            <div className="mt-10">
              <Link 
                to="/auth?mode=signup" 
                className="btn-primary inline-flex items-center gap-2"
              >
                Begin Your Free Trial <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default HowItWorks;
