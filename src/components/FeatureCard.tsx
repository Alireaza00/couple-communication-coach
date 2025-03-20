
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  delay?: number;
  className?: string;
}

const FeatureCard = ({
  title,
  description,
  icon: Icon,
  delay = 0,
  className,
}: FeatureCardProps) => {
  return (
    <div 
      className={cn(
        "glass rounded-2xl p-8 shadow-sm transition-all duration-300 hover:shadow-md hover:translate-y-[-5px] animate-fade-in-up",
        className
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="feature-icon">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="mt-6 text-xl font-semibold">{title}</h3>
      <p className="mt-2 text-foreground/70">{description}</p>
    </div>
  );
};

export default FeatureCard;
