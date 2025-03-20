
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { ConversationStarter } from '@/types';
import { MessageSquare, Sparkle, Heart, Clock, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { HoverCard, HoverCardTrigger, HoverCardContent } from '@/components/ui/hover-card';

interface ConversationStarterCardProps {
  starter: ConversationStarter;
  onClick?: () => void;
}

const categoryIcons = {
  fun: <Sparkle className="h-4 w-4" />,
  deep: <MessageSquare className="h-4 w-4" />,
  relationship: <Heart className="h-4 w-4" />,
  future: <Clock className="h-4 w-4" />,
  past: <Star className="h-4 w-4" />,
};

const difficultyColors = {
  easy: "bg-green-100 text-green-800",
  medium: "bg-blue-100 text-blue-800",
  deep: "bg-purple-100 text-purple-800",
};

const categoryColors = {
  fun: "bg-pink-100 text-pink-800",
  deep: "bg-indigo-100 text-indigo-800",
  relationship: "bg-red-100 text-red-800",
  future: "bg-cyan-100 text-cyan-800",
  past: "bg-amber-100 text-amber-800",
};

const ConversationStarterCard: React.FC<ConversationStarterCardProps> = ({ starter, onClick }) => {
  return (
    <Card 
      className={cn(
        "relative overflow-hidden border-l-4 transition-all duration-200 hover:shadow-md cursor-pointer",
        {
          "border-l-pink-400": starter.category === "fun",
          "border-l-indigo-400": starter.category === "deep",
          "border-l-red-400": starter.category === "relationship",
          "border-l-cyan-400": starter.category === "future",
          "border-l-amber-400": starter.category === "past",
        }
      )}
      onClick={onClick}
    >
      <CardContent className="p-5">
        <div className="flex justify-between items-start mb-3">
          <HoverCard>
            <HoverCardTrigger asChild>
              <Badge 
                className={cn("px-2 py-1", 
                  categoryColors[starter.category]
                )}
              >
                <div className="flex items-center gap-1">
                  {categoryIcons[starter.category]}
                  <span className="capitalize">{starter.category}</span>
                </div>
              </Badge>
            </HoverCardTrigger>
            <HoverCardContent className="w-60">
              <div className="flex justify-between space-x-4">
                <div className="space-y-1">
                  <h4 className="text-sm font-semibold">{starter.category.charAt(0).toUpperCase() + starter.category.slice(1)} conversation</h4>
                  <p className="text-sm">
                    {starter.category === "fun" && "Light-hearted questions to create enjoyable moments together."}
                    {starter.category === "deep" && "Thought-provoking questions that explore deeper thoughts and feelings."}
                    {starter.category === "relationship" && "Questions focused on understanding and improving your connection."}
                    {starter.category === "future" && "Forward-looking questions about hopes, dreams, and plans."}
                    {starter.category === "past" && "Reflective questions about experiences and memories."}
                  </p>
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>

          <HoverCard>
            <HoverCardTrigger asChild>
              <Badge 
                variant="outline" 
                className={cn("px-2 py-1", 
                  difficultyColors[starter.difficulty]
                )}
              >
                <span className="capitalize">{starter.difficulty}</span>
              </Badge>
            </HoverCardTrigger>
            <HoverCardContent className="w-60">
              <div className="flex justify-between space-x-4">
                <div className="space-y-1">
                  <h4 className="text-sm font-semibold">{starter.difficulty.charAt(0).toUpperCase() + starter.difficulty.slice(1)} difficulty</h4>
                  <p className="text-sm">
                    {starter.difficulty === "easy" && "Casual questions that are comfortable for most couples to discuss."}
                    {starter.difficulty === "medium" && "Questions that require more thoughtful reflection and openness."}
                    {starter.difficulty === "deep" && "Challenging questions that may reveal vulnerable feelings or thoughts."}
                  </p>
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
        </div>
        
        <p className="text-lg font-medium">{starter.question}</p>
      </CardContent>
    </Card>
  );
};

export default ConversationStarterCard;
