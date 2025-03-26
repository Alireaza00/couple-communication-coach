import { useState } from "react";
import { 
  MessageSquare, 
  Heart, 
  HandHeart, 
  Search, 
  Eye, 
  Brain, 
  Clock, 
  Filter, 
  RefreshCw,
  ArrowRight,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import InterventionCard from "@/components/InterventionCard";
import { Link } from "react-router-dom";

const Interventions = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  
  const filters = [
    { id: "all", label: "All" },
    { id: "communication", label: "Communication" },
    { id: "emotional", label: "Emotional" },
    { id: "conflict", label: "Conflict" },
    { id: "intimacy", label: "Intimacy" },
  ];
  
  const handleFilterClick = (filterId: string) => {
    if (activeFilter === filterId) {
      setActiveFilter(null);
    } else {
      setActiveFilter(filterId);
    }
  };
  
  const weeklyProgress = 4; // Completed out of 7
  
  // Mocked intervention exercises
  const interventions = [
    {
      id: 1,
      title: "Active Listening Practice",
      description: "Take turns speaking and listening without interruption to develop deeper understanding.",
      icon: MessageSquare,
      category: "communication",
      level: "beginner" as const,
      timeEstimate: "15 minutes",
      isCompleted: true,
    },
    {
      id: 2,
      title: "Emotion Recognition",
      description: "Practice identifying and naming emotions to increase emotional awareness.",
      icon: Heart,
      category: "emotional",
      level: "intermediate" as const,
      timeEstimate: "20 minutes",
      isCompleted: true,
    },
    {
      id: 3,
      title: "Appreciation Exchange",
      description: "Share specific things you appreciate about each other to build positive connection.",
      icon: HandHeart,
      category: "emotional",
      level: "beginner" as const,
      timeEstimate: "10 minutes",
      isCompleted: true,
    },
    {
      id: 4,
      title: "Perspective Taking",
      description: "Practice seeing situations from your partner's point of view to build empathy.",
      icon: Eye,
      category: "communication",
      level: "intermediate" as const,
      timeEstimate: "25 minutes",
      isCompleted: true,
    },
    {
      id: 5,
      title: "Conflict Resolution Framework",
      description: "Learn and practice a structured approach to resolving disagreements productively.",
      icon: Brain,
      category: "conflict",
      level: "advanced" as const,
      timeEstimate: "30 minutes",
      isCompleted: false,
    },
    {
      id: 6,
      title: "Validation Practice",
      description: "Learn to validate your partner's feelings even when you disagree with their perspective.",
      icon: MessageSquare,
      category: "communication",
      level: "intermediate" as const,
      timeEstimate: "20 minutes",
      isCompleted: false,
    },
    {
      id: 7,
      title: "Intimacy Questions",
      description: "Build emotional intimacy by asking and answering thoughtful questions.",
      icon: Heart,
      category: "intimacy",
      level: "beginner" as const,
      timeEstimate: "25 minutes",
      isCompleted: false,
    },
    {
      id: 8,
      title: "Nonverbal Communication",
      description: "Improve awareness and interpretation of body language and facial expressions.",
      icon: Eye,
      category: "communication",
      level: "intermediate" as const,
      timeEstimate: "15 minutes",
      isCompleted: false,
    },
  ];
  
  // Filter interventions based on search query and active filter
  const filteredInterventions = interventions.filter((intervention) => {
    const matchesSearch = 
      intervention.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      intervention.description.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesFilter = 
      !activeFilter || 
      activeFilter === "all" || 
      intervention.category === activeFilter;
      
    return matchesSearch && matchesFilter;
  });
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-[100px] pb-20">
        <div className="container-tight">
          {/* Header Section */}
          <section className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Personalized Interventions</h1>
            <p className="text-foreground/70 max-w-2xl">
              Strengthen your relationship with targeted exercises designed to address your specific communication patterns.
            </p>
          </section>
          
          {/* Weekly Progress Section */}
          <section className="mb-12">
            <div className="glass rounded-xl p-6 shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex-1">
                  <h3 className="font-semibold mb-2 flex items-center">
                    <RefreshCw className="h-4 w-4 mr-2 text-primary" />
                    Weekly Challenge Progress
                  </h3>
                  <p className="text-sm text-foreground/70 mb-3">
                    Complete 7 exercises this week to improve your communication quality.
                  </p>
                  <div className="relative pt-1">
                    <div className="flex mb-2 items-center justify-between">
                      <div>
                        <span className="text-xs font-semibold inline-block text-primary">
                          {weeklyProgress} of 7 completed
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-semibold inline-block text-primary">
                          {Math.round((weeklyProgress / 7) * 100)}%
                        </span>
                      </div>
                    </div>
                    <Progress value={(weeklyProgress / 7) * 100} className="h-2" />
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center">
                    <Clock className="h-8 w-8 text-primary" />
                  </div>
                  <div className="ml-4">
                    <span className="text-sm text-foreground/70">Time remaining</span>
                    <p className="text-xl font-semibold">3 days</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          {/* Featured Exercise Section */}
          <section className="mb-12">
            <div className="glass rounded-xl overflow-hidden shadow-md relative">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-32 -mt-32 z-0"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-ocean-50 rounded-full -ml-32 -mb-32 z-0"></div>
              
              <div className="relative z-10 p-8 md:p-10">
                <div className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary mb-4">
                  <Sparkles className="h-3 w-3 mr-1" /> Recommended for you
                </div>
                
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="md:flex-1">
                    <h2 className="text-2xl font-bold mb-3">The Five Love Languages Exercise</h2>
                    <p className="text-foreground/70 mb-6">
                      Discover how you and your partner prefer to give and receive love through this insightful exercise. Understanding each other's love languages can significantly reduce misunderstandings and strengthen your connection.
                    </p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
                      <div className="bg-white/80 rounded-lg p-3 text-center">
                        <p className="text-xs text-foreground/60 mb-1">Time</p>
                        <p className="font-medium">25 minutes</p>
                      </div>
                      <div className="bg-white/80 rounded-lg p-3 text-center">
                        <p className="text-xs text-foreground/60 mb-1">Level</p>
                        <p className="font-medium">Beginner</p>
                      </div>
                      <div className="bg-white/80 rounded-lg p-3 text-center">
                        <p className="text-xs text-foreground/60 mb-1">Category</p>
                        <p className="font-medium">Emotional</p>
                      </div>
                    </div>
                    
                    <Link to="/exercises?id=love-languages">
                      <Button className="w-full md:w-auto px-8 flex items-center">
                        Start Exercise <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </Link>
                  </div>
                  
                  <div className="md:w-1/3 flex items-center justify-center">
                    <div className="w-full max-w-[200px] aspect-square bg-white rounded-full shadow-lg flex items-center justify-center p-8">
                      <HandHeart className="h-24 w-24 text-primary/40" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          {/* Search and Filter Section */}
          <section className="mb-8">
            <div className="flex flex-col sm:flex-row justify-between gap-4">
              <div className="relative w-full sm:w-1/2 lg:w-1/3">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-foreground/40" />
                <Input
                  type="text"
                  placeholder="Search exercises..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="flex items-center space-x-2 overflow-x-auto pb-2 sm:pb-0">
                <span className="text-sm text-foreground/70 flex items-center whitespace-nowrap">
                  <Filter className="h-4 w-4 mr-1" /> Filter:
                </span>
                {filters.map((filter) => (
                  <button
                    key={filter.id}
                    onClick={() => handleFilterClick(filter.id)}
                    className={`px-3 py-1 rounded-full text-sm whitespace-nowrap transition-colors ${
                      activeFilter === filter.id
                        ? "bg-primary text-white"
                        : "bg-secondary hover:bg-secondary/80 text-foreground/70"
                    }`}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            </div>
          </section>
          
          {/* Exercise Grid Section */}
          <section>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredInterventions.map((intervention) => (
                <InterventionCard
                  key={intervention.id}
                  title={intervention.title}
                  description={intervention.description}
                  icon={intervention.icon}
                  level={intervention.level}
                  timeEstimate={intervention.timeEstimate}
                  isCompleted={intervention.isCompleted}
                />
              ))}
            </div>
            
            {filteredInterventions.length === 0 && (
              <div className="text-center py-12">
                <Search className="h-12 w-12 text-foreground/30 mx-auto mb-4" />
                <h3 className="text-xl font-medium mb-2">No exercises found</h3>
                <p className="text-foreground/70">
                  Try adjusting your search or filters to find what you're looking for.
                </p>
              </div>
            )}
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Interventions;
