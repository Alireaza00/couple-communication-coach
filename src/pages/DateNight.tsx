
import { useState, useEffect } from "react";
import { 
  Search, 
  Filter, 
  Heart, 
  Calendar,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DateCard from "@/components/DateCard";
import { useAuth } from "@/contexts/AuthContext";
import { generateDateNightIdeas } from "@/services/api";
import { DateNightIdea } from "@/types";
import { toast } from "sonner";

const DateNight = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [dateIdeas, setDateIdeas] = useState<DateNightIdea[]>([]);
  
  const filters = [
    { id: "all", label: "All" },
    { id: "indoor", label: "Indoor" },
    { id: "outdoor", label: "Outdoor" },
    { id: "free", label: "Free" },
    { id: "romantic", label: "Romantic" },
  ];
  
  useEffect(() => {
    const loadDateIdeas = async () => {
      setIsLoading(true);
      try {
        const ideas = await generateDateNightIdeas();
        setDateIdeas(ideas);
      } catch (error) {
        console.error("Error loading date ideas:", error);
        toast.error("Failed to load date ideas");
      } finally {
        setIsLoading(false);
      }
    };
    
    loadDateIdeas();
  }, []);
  
  // Mock date ideas with more details
  const mockDateIdeas = [
    {
      id: "1",
      title: "Sunset Picnic",
      description: "Pack a basket with cheese, wine, and snacks. Find a scenic spot to watch the sunset together.",
      category: "romantic",
      imageUrl: "https://placehold.co/400x300/ffdde1/ee9ca7?text=Sunset+Picnic",
      location: "outdoor" as const,
      cost: "low" as const,
      duration: "2-3 hours",
    },
    {
      id: "2",
      title: "Museum Day",
      description: "Visit a local museum or art gallery. Take your time exploring and discussing the exhibits.",
      category: "indoor",
      imageUrl: "https://placehold.co/400x300/e6e9f0/304352?text=Museum+Day",
      location: "indoor" as const,
      cost: "medium" as const,
      duration: "3-4 hours",
    },
    {
      id: "3",
      title: "Cooking Class",
      description: "Learn a new cuisine together with an online or in-person cooking class. Enjoy your creation afterward.",
      category: "indoor",
      imageUrl: "https://placehold.co/400x300/e2d1c3/fdfcfb?text=Cooking+Class",
      location: "indoor" as const,
      cost: "medium" as const,
      duration: "2-3 hours",
    },
    {
      id: "4",
      title: "Hiking Adventure",
      description: "Find a beautiful trail and spend the day hiking together. Pack a lunch to enjoy at a scenic spot.",
      category: "outdoor",
      imageUrl: "https://placehold.co/400x300/c1c161/d4d4b1?text=Hiking+Adventure",
      location: "outdoor" as const,
      cost: "free" as const,
      duration: "4-6 hours",
    },
    {
      id: "5",
      title: "Stargazing",
      description: "Drive to a spot with minimal light pollution. Bring blankets, hot drinks, and maybe a star map app.",
      category: "romantic",
      imageUrl: "https://placehold.co/400x300/243949/517fa4?text=Stargazing",
      location: "outdoor" as const,
      cost: "free" as const,
      duration: "2-3 hours",
    },
    {
      id: "6",
      title: "Board Game Night",
      description: "Stay in with your favorite board games or try a new one. Add snacks and drinks for a perfect evening.",
      category: "indoor",
      imageUrl: "https://placehold.co/400x300/accbee/e7f0fd?text=Game+Night",
      location: "indoor" as const,
      cost: "low" as const,
      duration: "2-4 hours",
    },
  ];
  
  const handleFilterClick = (filterId: string) => {
    if (activeFilter === filterId) {
      setActiveFilter(null);
    } else {
      setActiveFilter(filterId);
    }
  };
  
  // Filter date ideas based on search query and active filter
  const filteredDateIdeas = mockDateIdeas.filter((idea) => {
    const matchesSearch = 
      idea.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      idea.description.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesFilter = 
      !activeFilter || 
      activeFilter === "all" || 
      idea.location === activeFilter || 
      idea.cost === activeFilter ||
      idea.category === activeFilter;
      
    return matchesSearch && matchesFilter;
  });
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-[100px] pb-20">
        <div className="container max-w-6xl px-4 md:px-0">
          {/* Header Section */}
          <section className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Date Night Ideas</h1>
            <p className="text-foreground/70 max-w-2xl">
              Discover creative and fun ways to spend quality time together and strengthen your connection.
            </p>
          </section>
          
          {/* Featured Date Idea Section */}
          <section className="mb-12">
            <div className="glass rounded-xl overflow-hidden shadow-md">
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="p-8 md:p-10 flex flex-col justify-center">
                  <div className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary mb-4">
                    <Heart className="h-3 w-3 mr-1" /> Featured Date Idea
                  </div>
                  <h2 className="text-2xl font-bold mb-3">Weekend Getaway</h2>
                  <p className="text-foreground/70 mb-6">
                    Escape the routine with a spontaneous weekend trip. Book a cozy cabin or beachside cottage just a few hours away and disconnect from daily stresses to focus on each other.
                  </p>
                  
                  <div className="flex flex-wrap gap-3 mb-6">
                    <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-700">
                      2-3 days
                    </span>
                    <span className="text-xs px-2 py-1 rounded-full bg-amber-100 text-amber-700">
                      Romantic
                    </span>
                    <span className="text-xs px-2 py-1 rounded-full bg-purple-100 text-purple-700">
                      Adventure
                    </span>
                  </div>
                  
                  <Button className="w-full md:w-auto px-8 flex items-center">
                    View Details <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
                
                <div className="relative h-64 md:h-auto">
                  <img 
                    src="https://placehold.co/800x600/ffa99f/fff?text=Weekend+Getaway" 
                    alt="Weekend Getaway" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-4 right-4 bg-white/90 rounded-full p-2 shadow-md">
                    <Calendar className="h-6 w-6 text-primary" />
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
                  placeholder="Search date ideas..."
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
          
          {/* Date Ideas Grid Section */}
          <section>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDateIdeas.map((idea) => (
                <DateCard
                  key={idea.id}
                  title={idea.title}
                  description={idea.description}
                  category={idea.category}
                  duration={idea.duration}
                  cost={idea.cost}
                  location={idea.location}
                  imageUrl={idea.imageUrl}
                />
              ))}
            </div>
            
            {filteredDateIdeas.length === 0 && (
              <div className="text-center py-12">
                <Search className="h-12 w-12 text-foreground/30 mx-auto mb-4" />
                <h3 className="text-xl font-medium mb-2">No date ideas found</h3>
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

export default DateNight;
