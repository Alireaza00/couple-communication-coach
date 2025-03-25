
import React, { useState } from 'react';
import { Insight } from './types';
import { cn } from '@/lib/utils';
import { ChevronDown, ChevronUp, InfoIcon, AlertCircle, CheckCircle } from 'lucide-react';

interface KeyInsightsProps {
  insights: Insight[];
}

const KeyInsights: React.FC<KeyInsightsProps> = ({ insights }) => {
  const [expandedInsight, setExpandedInsight] = useState<number | null>(null);
  
  const toggleInsight = (index: number) => {
    if (expandedInsight === index) {
      setExpandedInsight(null);
    } else {
      setExpandedInsight(index);
    }
  };
  
  // Set the icon components
  const insightsWithIcons = insights.map(insight => ({
    ...insight,
    icon: insight.type === 'strength' ? CheckCircle : AlertCircle
  }));
  
  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Key Insights</h2>
        <div className="flex space-x-2">
          <div className="flex items-center">
            <span className="w-3 h-3 rounded-full bg-green-500 mr-2"></span>
            <span className="text-sm text-foreground/70">Strengths</span>
          </div>
          <div className="flex items-center">
            <span className="w-3 h-3 rounded-full bg-amber-500 mr-2"></span>
            <span className="text-sm text-foreground/70">Areas to Improve</span>
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        {insightsWithIcons.map((insight, index) => (
          <div 
            key={index} 
            className={cn(
              "glass rounded-xl shadow-sm overflow-hidden transition-all duration-300",
              expandedInsight === index ? "shadow-md" : ""
            )}
          >
            <div 
              className="p-5 flex items-center justify-between cursor-pointer"
              onClick={() => toggleInsight(index)}
            >
              <div className="flex items-center">
                <div className={cn(
                  "h-10 w-10 rounded-full flex items-center justify-center mr-4",
                  insight.type === "strength" ? "bg-green-100" : "bg-amber-100"
                )}>
                  <insight.icon 
                    className={cn(
                      "h-5 w-5", 
                      insight.type === "strength" ? "text-green-500" : "text-amber-500"
                    )} 
                  />
                </div>
                <div>
                  <h3 className="font-medium">{insight.title}</h3>
                  <p className="text-sm text-foreground/70 line-clamp-1">
                    {insight.description}
                  </p>
                </div>
              </div>
              <div>
                {expandedInsight === index ? (
                  <ChevronUp className="h-5 w-5 text-foreground/50" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-foreground/50" />
                )}
              </div>
            </div>
            
            {expandedInsight === index && (
              <div className="px-5 pb-5 pt-0 border-t border-gray-100">
                <div className="bg-primary/5 rounded-lg p-4 mt-2">
                  <div className="flex items-start">
                    <InfoIcon className="h-5 w-5 text-primary mr-2 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-medium mb-1">Suggestion</h4>
                      <p className="text-sm text-foreground/70">{insight.suggestion}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default KeyInsights;
