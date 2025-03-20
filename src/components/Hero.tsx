
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="relative overflow-hidden pt-[120px] pb-16 md:pb-24 lg:pb-32">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-gradient-to-b from-primary/5 to-transparent" aria-hidden="true" />
      
      {/* Decorative blobs */}
      <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-primary/5 blur-3xl" aria-hidden="true" />
      <div className="absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-ocean-100 blur-3xl" aria-hidden="true" />
      
      <div className="container-tight relative">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center rounded-full bg-primary/10 px-6 py-2 text-sm font-medium text-primary backdrop-blur-sm">
            <span className="animate-pulse-soft">New</span>
            <span className="mx-2">•</span>
            <span>AI-powered relationship coach</span>
          </div>
          
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl leading-tight animate-fade-in-up">
            Transform your relationship through better communication
          </h1>
          
          <p className="mt-6 text-lg leading-8 text-foreground/70 md:text-xl animate-fade-in-up" style={{ animationDelay: "100ms" }}>
            Our AI-powered communication coach helps couples understand each other better, resolve conflicts productively, and deepen their connection through personalized insights and exercises.
          </p>
          
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6 animate-fade-in-up" style={{ animationDelay: "200ms" }}>
            <Link to="/auth?mode=signup" className="btn-primary flex items-center gap-2 w-full sm:w-auto">
              Get Started <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/how-it-works" className="btn-secondary w-full sm:w-auto">
              Learn how it works
            </Link>
          </div>
        </div>
      </div>
      
      {/* Stats section */}
      <div className="mt-16 md:mt-24 container-tight">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="glass rounded-2xl p-8 text-center shadow-sm animate-fade-in-up" style={{ animationDelay: "300ms" }}>
            <div className="text-4xl font-bold text-primary">94%</div>
            <p className="mt-2 text-sm text-foreground/70">of couples report improved communication</p>
          </div>
          <div className="glass rounded-2xl p-8 text-center shadow-sm animate-fade-in-up" style={{ animationDelay: "400ms" }}>
            <div className="text-4xl font-bold text-primary">30+</div>
            <p className="mt-2 text-sm text-foreground/70">personalized communication exercises</p>
          </div>
          <div className="glass rounded-2xl p-8 text-center shadow-sm animate-fade-in-up" style={{ animationDelay: "500ms" }}>
            <div className="text-4xl font-bold text-primary">21 days</div>
            <p className="mt-2 text-sm text-foreground/70">to notice significant relationship improvements</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
