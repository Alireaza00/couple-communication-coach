
import { useState, useEffect } from "react";
import { 
  Search, 
  Filter, 
  Sparkles, 
  Heart, 
  Calendar, 
  RefreshCcw,
  Bookmark
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DateCard from "@/components/DateCard";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const DateNight = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  
  const filterCategories = [
    { id: "cost", label: "Cost", options: ["free", "low", "medium", "high"] },
    { id: "duration", label: "Duration", options: ["quick", "half-day", "full-day", "weekend"] },
    { id: "location", label: "Location", options: ["indoor", "outdoor", "online"] },
    { id: "activity", label: "Type", options: ["adventure", "relaxation", "creative", "culinary", "cultural"] },
  ];
  
  const toggleFilter = (filter: string) => {
    if (activeFilters.includes(filter)) {
      setActiveFilters(activeFilters.filter(f => f !== filter));
    } else {
      setActiveFilters([...activeFilters, filter]);
    }
  };
  
  const handleGenerateMore = () => {
    setIsGenerating(true);
    // Simulate API call
    setTimeout(() => {
      setIsGenerating(false);
      toast.success("New date ideas generated!");
    }, 1500);
  };
  
  // Sample date ideas
  const dateIdeas = [
    {
      id: 1,
      title: "Sunset Picnic",
      description: "Pack a basket with your favorite snacks and drinks, and find a scenic spot to watch the sunset together.",
      category: "Romantic",
      duration: "2-3 hours",
      cost: "low" as const,
      location: "outdoor" as const,
      imageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80",
      isSaved: true,
    },
    {
      id: 2,
      title: "Cooking Class",
      description: "Learn to prepare a new cuisine together. The teamwork in the kitchen can strengthen your bond and communication.",
      category: "Culinary",
      duration: "3-4 hours",
      cost: "medium" as const,
      location: "indoor" as const,
      imageUrl: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 3,
      title: "Museum Exploration",
      description: "Visit a local museum or art gallery. Discussing the exhibits can lead to deeper conversations and shared perspectives.",
      category: "Cultural",
      duration: "2-3 hours",
      cost: "low" as const,
      location: "indoor" as const,
      imageUrl: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 4,
      title: "Stargazing Adventure",
      description: "Drive away from city lights, bring blankets and hot drinks, and spend the evening identifying stars and constellations.",
      category: "Adventure",
      duration: "2-3 hours",
      cost: "free" as const,
      location: "outdoor" as const,
      imageUrl: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 5,
      title: "Virtual Wine Tasting",
      description: "Order a wine tasting kit online and join a virtual session with an expert sommelier to guide you through the experience.",
      category: "Culinary",
      duration: "1-2 hours",
      cost: "medium" as const,
      location: "online" as const,
      imageUrl: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 6,
      title: "Couples Massage",
      description: "Book a spa day for relaxing massages side by side. This shared relaxation experience can reduce stress and increase intimacy.",
      category: "Relaxation",
      duration: "2-3 hours",
      cost: "high" as const,
      location: "indoor" as const,
      imageUrl: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 7,
      title: "Hiking Trail",
      description: "Find a scenic trail suitable for your fitness levels. Being in nature together can create space for meaningful conversations.",
      category: "Adventure",
      duration: "half-day",
      cost: "free" as const,
      location: "outdoor" as const,
      imageUrl: "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 8,
      title: "DIY Pottery Workshop",
      description: "Get creative with clay together in a pottery class. Creating something with your hands can be both relaxing and bonding.",
      category: "Creative",
      duration: "3-4 hours",
      cost: "medium" as const,
      location: "indoor" as const,
      imageUrl: "https://images.unsplash.com/photo-1565373987291-4d7424dd9e59?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 9,
      title: "Online Dance Lesson",
      description: "Learn a new dance style together from the comfort of your home with an online instructor.",
      category: "Creative",
      duration: "1 hour",
      cost: "low" as const,
      location: "online" as const,
      imageUrl: "https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?auto=format&fit=crop&w=600&q=80",
    },
  ];
  
  // Filter date ideas based on search query and active filters
  const filteredDateIdeas = dateIdeas.filter((idea) => {
    const matchesSearch = 
      idea.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      idea.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      idea.category.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesFilters = 
      activeFilters.length === 0 || 
      activeFilters.some(filter => 
        idea.cost === filter || 
        idea.location === filter || 
        idea.duration.toLowerCase().includes(filter)
      );
      
    return matchesSearch && matchesFilters;
  });
  
  const savedDateIdeas = dateIdeas.filter(idea => idea.isSaved);
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-[100px] pb-20">
        <div className="container-tight">
          {/* Header Section */}
          <section className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Date Night Generator</h1>
            <p className="text-foreground/70 max-w-2xl">
              Discover personalized date ideas based on your shared interests, preferences, and relationship goals.
            </p>
          </section>
          
          {/* Featured Date Idea */}
          <section className="mb-12">
            <div className="glass rounded-xl overflow-hidden shadow-md relative">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-32 -mt-32 z-0"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-love-100 rounded-full -ml-32 -mb-32 z-0"></div>
              
              <div className="relative z-10 p-8 md:p-10">
                <div className="inline-flex items-center rounded-full bg-love-100 px-3 py-1 text-xs font-medium text-love-700 mb-4">
                  <Sparkles className="h-3 w-3 mr-1" /> Top Recommendation
                </div>
                
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="md:flex-1">
                    <h2 className="text-2xl font-bold mb-3">Weekend Getaway: Countryside Retreat</h2>
                    <p className="text-foreground/70 mb-6">
                      Escape the routine with a weekend in a cozy cabin or B&B in the countryside. Disconnect from technology and reconnect with each other through walks, cooking together, and meaningful conversations by the fireplace. 
                    </p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
                      <div className="bg-white/80 rounded-lg p-3 text-center">
                        <p className="text-xs text-foreground/60 mb-1">Duration</p>
                        <p className="font-medium">Weekend</p>
                      </div>
                      <div className="bg-white/80 rounded-lg p-3 text-center">
                        <p className="text-xs text-foreground/60 mb-1">Cost</p>
                        <p className="font-medium">Moderate-High</p>
                      </div>
                      <div className="bg-white/80 rounded-lg p-3 text-center">
                        <p className="text-xs text-foreground/60 mb-1">Category</p>
                        <p className="font-medium">Romantic</p>
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2" /> Schedule This Date
                      </Button>
                      <Button variant="outline" className="flex items-center">
                        <Bookmark className="h-4 w-4 mr-2" /> Save to Collection
                      </Button>
                    </div>
                  </div>
                  
                  <div className="md:w-1/3">
                    <img 
                      src="https://images.unsplash.com/photo-1518558152545-e5f451a8c61b?auto=format&fit=crop&w=600&q=80" 
                      alt="Countryside retreat" 
                      className="w-full h-full object-cover rounded-xl"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          {/* Tabs Section */}
          <section>
            <Tabs defaultValue="browse" className="w-full">
              <TabsList className="w-full bg-secondary mb-8">
                <TabsTrigger value="browse" className="flex-1">
                  <Search className="h-4 w-4 mr-2" /> Browse Ideas
                </TabsTrigger>
                <TabsTrigger value="saved" className="flex-1">
                  <Heart className="h-4 w-4 mr-2" /> Saved Dates
                </TabsTrigger>
                <TabsTrigger value="history" className="flex-1">
                  <Calendar className="h-4 w-4 mr-2" /> Date History
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="browse">
                {/* Search and Filters */}
                <div className="mb-8">
                  <div className="flex flex-col sm:flex-row gap-4 mb-4">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-foreground/40" />
                      <Input
                        type="text"
                        placeholder="Search date ideas..."
                        className="pl-10"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    
                    <Button
                      onClick={handleGenerateMore}
                      className="flex items-center"
                      disabled={isGenerating}
                    >
                      {isGenerating ? (
                        <>
                          <RefreshCcw className="h-4 w-4 mr-2 animate-spin" /> Generating...
                        </>
                      ) : (
                        <>
                          <RefreshCcw className="h-4 w-4 mr-2" /> Generate New Ideas
                        </>
                      )}
                    </Button>
                  </div>
                  
                  <div>
                    <div className="flex items-center mb-3">
                      <Filter className="h-4 w-4 mr-2 text-foreground/60" />
                      <span className="text-sm font-medium">Filters</span>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {filterCategories.map(category => (
                        <div key={category.id} className="mr-4 mb-2">
                          <p className="text-xs text-foreground/60 mb-1">{category.label}</p>
                          <div className="flex flex-wrap gap-2">
                            {category.options.map(option => (
                              <button
                                key={option}
                                onClick={() => toggleFilter(option)}
                                className={cn(
                                  "px-2 py-1 rounded-full text-xs transition-colors whitespace-nowrap",
                                  activeFilters.includes(option)
                                    ? "bg-primary text-white"
                                    : "bg-secondary hover:bg-secondary/80 text-foreground/70"
                                )}
                              >
                                {option.charAt(0).toUpperCase() + option.slice(1)}
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Date Ideas Grid */}
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
                      isSaved={idea.isSaved}
                    />
                  ))}
                </div>
                
                {filteredDateIdeas.length === 0 && (
                  <div className="text-center py-12">
                    <Search className="h-12 w-12 text-foreground/30 mx-auto mb-4" />
                    <h3 className="text-xl font-medium mb-2">No date ideas found</h3>
                    <p className="text-foreground/70 mb-4">
                      Try adjusting your search or filters to find what you're looking for.
                    </p>
                    <Button onClick={() => {
                      setSearchQuery("");
                      setActiveFilters([]);
                    }}>
                      Clear Filters
                    </Button>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="saved">
                {savedDateIdeas.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {savedDateIdeas.map((idea) => (
                      <DateCard
                        key={idea.id}
                        title={idea.title}
                        description={idea.description}
                        category={idea.category}
                        duration={idea.duration}
                        cost={idea.cost}
                        location={idea.location}
                        imageUrl={idea.imageUrl}
                        isSaved={true}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Heart className="h-12 w-12 text-foreground/30 mx-auto mb-4" />
                    <h3 className="text-xl font-medium mb-2">No saved date ideas yet</h3>
                    <p className="text-foreground/70 mb-4">
                      Browse date ideas and save your favorites to find them here.
                    </p>
                    <Button onClick={() => document.querySelector('[data-value="browse"]')?.click()}>
                      Browse Date Ideas
                    </Button>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="history">
                <div className="text-center py-12">
                  <Calendar className="h-12 w-12 text-foreground/30 mx-auto mb-4" />
                  <h3 className="text-xl font-medium mb-2">Your date history</h3>
                  <p className="text-foreground/70 mb-4">
                    When you schedule and complete dates, they'll appear here.
                  </p>
                  <Button onClick={() => document.querySelector('[data-value="browse"]')?.click()}>
                    Find Date Ideas
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default DateNight;
