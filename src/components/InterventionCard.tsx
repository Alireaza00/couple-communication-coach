
import { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

interface InterventionCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  level: "beginner" | "intermediate" | "advanced";
  timeEstimate: string;
  isCompleted?: boolean;
  onClick?: () => void;
  id?: number;
  className?: string;
}

const InterventionCard = ({
  title,
  description,
  icon: Icon,
  level,
  timeEstimate,
  isCompleted = false,
  onClick,
  id,
  className,
}: InterventionCardProps) => {
  const levelColor = {
    beginner: "bg-green-100 text-green-700",
    intermediate: "bg-blue-100 text-blue-700",
    advanced: "bg-purple-100 text-purple-700",
  };
  
  const levelText = {
    beginner: "Beginner",
    intermediate: "Intermediate",
    advanced: "Advanced",
  };

  return (
    <div 
      className={cn(
        "glass rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300",
        isCompleted ? "border-green-200 bg-white/90" : "",
        className
      )}
    >
      <div className="flex items-start">
        <div className="feature-icon mr-4">
          <Icon className="h-5 w-5" />
        </div>
        <div className="flex-1">
          <h3 className="font-medium">{title}</h3>
          <p className="mt-1 text-sm text-foreground/70">{description}</p>
          
          <div className="mt-4 flex flex-wrap gap-2">
            <span className={cn("text-xs px-2 py-1 rounded-full", levelColor[level])}>
              {levelText[level]}
            </span>
            <span className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-full">
              {timeEstimate}
            </span>
            {isCompleted && (
              <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">
                Completed
              </span>
            )}
          </div>
          
          <div className="mt-4">
            {onClick ? (
              <Button 
                onClick={onClick}
                variant={isCompleted ? "outline" : "default"}
                className="w-full"
              >
                {isCompleted ? "View Results" : "Start Exercise"}
              </Button>
            ) : (
              <Link to={`/exercises${id ? `?id=${id}` : ''}`} className="w-full">
                <Button 
                  variant={isCompleted ? "outline" : "default"}
                  className="w-full"
                >
                  {isCompleted ? "View Results" : "Start Exercise"}
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterventionCard;
