
import { useState } from "react";
import { Heart, Calendar, Clock, DollarSign, MapPin, Star, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface DateCardProps {
  title: string;
  description: string;
  category: string;
  duration: string;
  cost: "free" | "low" | "medium" | "high";
  location: "indoor" | "outdoor" | "online";
  imageUrl?: string;
  isSaved?: boolean;
  className?: string;
}

const DateCard = ({
  title,
  description,
  category,
  duration,
  cost,
  location,
  imageUrl = "https://placehold.co/400x300/e6e7ff/818cf8?text=Date+Idea",
  isSaved = false,
  className,
}: DateCardProps) => {
  const [saved, setSaved] = useState(isSaved);
  
  const costMapping = {
    free: { label: "Free", icon: 0 },
    low: { label: "Inexpensive", icon: 1 },
    medium: { label: "Moderate", icon: 2 },
    high: { label: "Expensive", icon: 3 },
  };
  
  const locationMapping = {
    indoor: "Indoor",
    outdoor: "Outdoor",
    online: "Virtual",
  };
  
  const handleSave = () => {
    setSaved(!saved);
    if (!saved) {
      toast.success("Date idea saved to your collection");
    } else {
      toast.success("Date idea removed from your collection");
    }
  };
  
  const handleSchedule = () => {
    toast.success(`${title} has been scheduled`, {
      description: "Check your calendar for details",
      action: {
        label: "View Calendar",
        onClick: () => console.log("View calendar"),
      },
    });
  };
  
  return (
    <div className={cn("bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300", className)}>
      <div className="relative">
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-48 object-cover"
        />
        <span className="absolute top-3 left-3 bg-primary/90 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm">
          {category}
        </span>
        <button 
          className={cn(
            "absolute top-3 right-3 h-8 w-8 rounded-full flex items-center justify-center backdrop-blur-sm transition-colors",
            saved ? "bg-primary/90 text-white" : "bg-white/90 text-gray-600 hover:bg-primary/90 hover:text-white"
          )}
          onClick={handleSave}
          aria-label={saved ? "Remove from saved" : "Save this date idea"}
        >
          <Bookmark className="h-4 w-4" fill={saved ? "currentColor" : "none"} />
        </button>
      </div>
      
      <div className="p-5">
        <h3 className="font-medium text-lg mb-2 text-gray-900 dark:text-gray-100">{title}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{description}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="inline-flex items-center text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full">
            <Clock className="h-3 w-3 mr-1" /> {duration}
          </span>
          <span className="inline-flex items-center text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full">
            <MapPin className="h-3 w-3 mr-1" /> {locationMapping[location]}
          </span>
          <span className="inline-flex items-center text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full">
            <DollarSign className="h-3 w-3 mr-1" /> 
            {costMapping[cost].label}
          </span>
        </div>
        
        <div className="flex justify-between">
          <Button variant="outline" size="sm" className="flex-1 mr-2" onClick={handleSave}>
            {saved ? "Saved" : "Save idea"}
          </Button>
          <Button size="sm" className="flex-1" onClick={handleSchedule}>
            Schedule
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DateCard;
