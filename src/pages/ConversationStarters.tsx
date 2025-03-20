
import React, { useState, useEffect } from 'react';
import { getConversationStarters, generateConversationStarters } from '@/services/api';
import { ConversationStarter } from '@/types';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import ConversationStarterCard from '@/components/ConversationStarterCard';
import {
  MessageSquare,
  Sparkle,
  Heart,
  Clock,
  Star,
  Search,
  RefreshCw,
  Filter,
  Download,
  Copy,
  Lightbulb,
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const ConversationStarters = () => {
  const [starters, setStarters] = useState<ConversationStarter[]>([]);
  const [filteredStarters, setFilteredStarters] = useState<ConversationStarter[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeDifficulty, setActiveDifficulty] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedStarter, setSelectedStarter] = useState<ConversationStarter | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    const fetchStarters = async () => {
      try {
        const data = await getConversationStarters();
        setStarters(data);
        setFilteredStarters(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching conversation starters:', error);
        toast({
          variant: 'destructive',
          title: 'Error fetching conversation starters',
          description: 'Please try again later.',
        });
        setIsLoading(false);
      }
    };

    fetchStarters();
  }, [toast]);

  useEffect(() => {
    // Filter starters based on search query, category, and difficulty
    const filtered = starters.filter((starter) => {
      const matchesSearch = starter.question
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === null || starter.category === activeCategory;
      const matchesDifficulty = activeDifficulty === null || starter.difficulty === activeDifficulty;
      return matchesSearch && matchesCategory && matchesDifficulty;
    });
    setFilteredStarters(filtered);
  }, [searchQuery, activeCategory, activeDifficulty, starters]);

  const handleCategoryClick = (category: string) => {
    setActiveCategory(activeCategory === category ? null : category);
  };

  const handleDifficultyClick = (difficulty: string) => {
    setActiveDifficulty(activeDifficulty === difficulty ? null : difficulty);
  };

  const handleGenerateMore = async () => {
    if (!user) {
      toast({
        title: 'Login required',
        description: 'Please login to generate custom conversation starters',
        variant: 'destructive',
      });
      return;
    }
    
    setIsGenerating(true);
    try {
      const newStarters = await generateConversationStarters(activeCategory || undefined);
      setStarters((prev) => [...newStarters, ...prev]);
      toast({
        title: 'New conversation starters generated!',
        description: 'Scroll to the top to see your new starters.',
      });
    } catch (error) {
      console.error('Error generating conversation starters:', error);
      toast({
        variant: 'destructive',
        title: 'Error generating conversation starters',
        description: 'Please try again later.',
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopyToClipboard = () => {
    if (selectedStarter) {
      navigator.clipboard.writeText(selectedStarter.question);
      toast({
        title: 'Copied to clipboard!',
        description: 'You can now paste the conversation starter wherever you need it.',
      });
    }
  };

  const categoryIcons = {
    fun: <Sparkle className="h-5 w-5" />,
    deep: <MessageSquare className="h-5 w-5" />,
    relationship: <Heart className="h-5 w-5" />,
    future: <Clock className="h-5 w-5" />,
    past: <Star className="h-5 w-5" />,
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-[100px] pb-20">
        <div className="container-tight">
          {/* Header Section */}
          <section className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Conversation Starters</h1>
            <p className="text-foreground/70 max-w-2xl">
              Discover meaningful questions to spark deeper connections and conversations with your
              partner.
            </p>
          </section>

          {/* Tabs Section */}
          <section className="mb-8">
            <Tabs defaultValue="browse">
              <TabsList className="mb-6 w-full sm:w-auto">
                <TabsTrigger value="browse" className="flex gap-2 items-center">
                  <MessageSquare className="h-4 w-4" />
                  Browse Starters
                </TabsTrigger>
                <TabsTrigger value="favorites" className="flex gap-2 items-center">
                  <Heart className="h-4 w-4" />
                  Favorites
                </TabsTrigger>
                <TabsTrigger value="custom" className="flex gap-2 items-center">
                  <Sparkle className="h-4 w-4" />
                  Create Custom
                </TabsTrigger>
              </TabsList>

              <TabsContent value="browse" className="space-y-6">
                {/* Search and Filter Row */}
                <div className="flex flex-col sm:flex-row justify-between gap-4">
                  <div className="relative w-full sm:w-1/2 lg:w-1/3">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-foreground/40" />
                    <Input
                      type="text"
                      placeholder="Search conversation starters..."
                      className="pl-10"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>

                  <div className="flex items-center space-x-2 overflow-x-auto pb-2 sm:pb-0">
                    <span className="text-sm text-foreground/70 flex items-center whitespace-nowrap">
                      <Filter className="h-4 w-4 mr-1" /> Categories:
                    </span>
                    {['fun', 'deep', 'relationship', 'future', 'past'].map((category) => (
                      <button
                        key={category}
                        onClick={() => handleCategoryClick(category)}
                        className={`px-3 py-1 rounded-full text-sm whitespace-nowrap transition-colors flex items-center gap-1 ${
                          activeCategory === category
                            ? 'bg-primary text-white'
                            : 'bg-secondary hover:bg-secondary/80 text-foreground/70'
                        }`}
                      >
                        {categoryIcons[category as keyof typeof categoryIcons]}
                        <span className="capitalize">{category}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Difficulty Filter */}
                <div className="flex items-center space-x-2 overflow-x-auto pb-2">
                  <span className="text-sm text-foreground/70 flex items-center whitespace-nowrap">
                    <Filter className="h-4 w-4 mr-1" /> Difficulty:
                  </span>
                  {['easy', 'medium', 'deep'].map((difficulty) => (
                    <button
                      key={difficulty}
                      onClick={() => handleDifficultyClick(difficulty)}
                      className={`px-3 py-1 rounded-full text-sm whitespace-nowrap transition-colors ${
                        activeDifficulty === difficulty
                          ? 'bg-primary text-white'
                          : 'bg-secondary hover:bg-secondary/80 text-foreground/70'
                      }`}
                    >
                      <span className="capitalize">{difficulty}</span>
                    </button>
                  ))}
                </div>

                {/* Generate with AI Button */}
                <div className="flex justify-end">
                  <Button
                    onClick={handleGenerateMore}
                    disabled={isGenerating}
                    className="flex items-center gap-2"
                  >
                    {isGenerating ? (
                      <RefreshCw className="h-4 w-4 animate-spin" />
                    ) : (
                      <Lightbulb className="h-4 w-4" />
                    )}
                    {isGenerating ? 'Generating...' : 'Generate with AI'}
                  </Button>
                </div>

                {/* Starters Grid */}
                {isLoading ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                      <div
                        key={i}
                        className="h-36 rounded-lg bg-muted animate-pulse"
                      />
                    ))}
                  </div>
                ) : filteredStarters.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredStarters.map((starter) => (
                      <ConversationStarterCard
                        key={starter.id}
                        starter={starter}
                        onClick={() => setSelectedStarter(starter)}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Search className="h-12 w-12 text-foreground/30 mx-auto mb-4" />
                    <h3 className="text-xl font-medium mb-2">No conversation starters found</h3>
                    <p className="text-foreground/70">
                      Try adjusting your search or filters to find what you're looking for.
                    </p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="favorites">
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <Heart className="h-16 w-16 text-muted-foreground mb-4" />
                  <h3 className="text-xl font-medium mb-2">Your favorites will appear here</h3>
                  <p className="text-foreground/70 max-w-md mb-6">
                    Save your favorite conversation starters for quick access. This feature will be
                    available soon.
                  </p>
                  <Button variant="outline" disabled>
                    Coming Soon
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="custom">
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <Sparkle className="h-16 w-16 text-muted-foreground mb-4" />
                  <h3 className="text-xl font-medium mb-2">Create your own conversation starters</h3>
                  <p className="text-foreground/70 max-w-md mb-6">
                    Craft personalized questions tailored to your relationship. This feature will be
                    available soon.
                  </p>
                  <Button variant="outline" disabled>
                    Coming Soon
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </section>
        </div>
      </main>

      {/* Dialog for selected starter */}
      <Dialog open={!!selectedStarter} onOpenChange={(open) => !open && setSelectedStarter(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Conversation Starter</DialogTitle>
            <DialogDescription>
              Use this question to start a meaningful conversation with your partner.
            </DialogDescription>
          </DialogHeader>
          {selectedStarter && (
            <div className="p-4 bg-muted rounded-lg my-4">
              <p className="text-xl font-medium">{selectedStarter.question}</p>
            </div>
          )}
          <div className="flex space-x-2 justify-end">
            <Button
              variant="outline"
              onClick={handleCopyToClipboard}
              className="flex items-center gap-2"
            >
              <Copy className="h-4 w-4" />
              Copy
            </Button>
            <Button disabled className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Save
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default ConversationStarters;
