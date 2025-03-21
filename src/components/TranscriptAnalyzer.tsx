
import { useState } from 'react';
import { 
  FileText, 
  BarChart3, 
  ChevronDown, 
  ChevronUp, 
  InfoIcon, 
  AlertCircle, 
  CheckCircle 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface TranscriptAnalyzerProps {
  transcript?: string;
  analysisResult?: string;
}

interface Insight {
  title: string;
  description: string;
  type: 'strength' | 'improvement';
  icon: typeof AlertCircle | typeof CheckCircle;
  suggestion: string;
}

const TranscriptAnalyzer = ({ transcript, analysisResult }: TranscriptAnalyzerProps) => {
  const [expandedInsight, setExpandedInsight] = useState<number | null>(null);
  
  // Parse insights from the AI analysis
  const parseInsights = (text: string | undefined): Insight[] => {
    if (!text) return defaultInsights;
    
    // In a real app, you would parse the AI response more intelligently
    // For now, we'll use default insights if AI analysis is provided
    if (text.length > 0) {
      return defaultInsights;
    }
    
    return defaultInsights;
  };
  
  const insights = parseInsights(analysisResult);
  
  const toggleInsight = (index: number) => {
    if (expandedInsight === index) {
      setExpandedInsight(null);
    } else {
      setExpandedInsight(index);
    }
  };
  
  // Communication metrics based on the analysis
  const communicationMetrics = {
    speakingTimeBalance: "60% / 40%",
    interruptions: { you: 8, partner: 3 },
    emotions: [
      { name: "Frustration", percentage: "45%", color: "blue" },
      { name: "Empathy", percentage: "30%", color: "green" },
      { name: "Neutral", percentage: "25%", color: "purple" }
    ]
  };
  
  if (!transcript && !analysisResult) {
    return (
      <div className="glass rounded-xl p-6 shadow-sm text-center">
        <p className="text-foreground/70">
          Record a conversation and click "Analyze" to see your simulated analysis here.
        </p>
      </div>
    );
  }
  
  return (
    <>
      <Alert className="mb-6 bg-blue-50 border-blue-200">
        <InfoIcon className="h-4 w-4 text-blue-600" />
        <AlertTitle className="text-blue-800">Demo Transcript & Analysis</AlertTitle>
        <AlertDescription className="text-blue-700">
          The transcript and analysis shown below are simulated examples, not based on your actual recording.
          In a full version, your real conversation would be analyzed.
        </AlertDescription>
      </Alert>
      
      {/* Key Insights Section */}
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
          {insights.map((insight, index) => (
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
      
      {/* Detailed Analysis Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Detailed Analysis</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass rounded-xl p-6 shadow-sm">
            <div className="flex items-center mb-4">
              <FileText className="h-5 w-5 text-primary mr-2" />
              <h3 className="font-medium">Conversation Transcript (Demo)</h3>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 max-h-[300px] overflow-y-auto">
              <div className="space-y-4">
                {transcript ? (
                  transcript.split('\n').map((line, idx) => {
                    if (!line.trim()) return null;
                    
                    const speakerMatch = line.match(/^([^:]+):/);
                    if (speakerMatch) {
                      const speaker = speakerMatch[1];
                      const content = line.substring(speakerMatch[0].length).trim();
                      
                      return (
                        <div key={idx}>
                          <div className="font-medium text-sm mb-1">{speaker}:</div>
                          <p className="text-sm text-foreground/80">
                            {content}
                          </p>
                        </div>
                      );
                    }
                    
                    return (
                      <div key={idx}>
                        <p className="text-sm text-foreground/80">{line}</p>
                      </div>
                    );
                  })
                ) : (
                  <div className="text-center text-foreground/50">
                    No transcript available
                  </div>
                )}
              </div>
            </div>
            <div className="mt-2 text-xs text-amber-600 font-medium">
              Note: This is a simulated transcript, not your actual recording.
            </div>
            <div className="mt-4 flex justify-end">
              <Button variant="outline" size="sm">
                View Full Transcript
              </Button>
            </div>
          </div>
          
          <div className="glass rounded-xl p-6 shadow-sm">
            <div className="flex items-center mb-4">
              <BarChart3 className="h-5 w-5 text-primary mr-2" />
              <h3 className="font-medium">Communication Metrics</h3>
            </div>
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm">Speaking Time Balance</span>
                  <span className="text-xs text-foreground/70">{communicationMetrics.speakingTimeBalance}</span>
                </div>
                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: "60%" }}></div>
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-xs text-foreground/60">You</span>
                  <span className="text-xs text-foreground/60">Partner</span>
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm">Interruptions</span>
                </div>
                <div className="flex items-center">
                  <div className="flex-1 h-6 bg-amber-100 rounded-l-md text-center text-xs flex items-center justify-center text-amber-700">
                    You: {communicationMetrics.interruptions.you}
                  </div>
                  <div className="flex-1 h-6 bg-blue-100 rounded-r-md text-center text-xs flex items-center justify-center text-blue-700">
                    Partner: {communicationMetrics.interruptions.partner}
                  </div>
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm">Emotion Expression</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {communicationMetrics.emotions.map((emotion, idx) => (
                    <div 
                      key={idx}
                      className={`bg-${emotion.color}-100 h-16 rounded-md flex flex-col items-center justify-center`}
                    >
                      <span className={`text-xs text-${emotion.color}-700 font-medium`}>{emotion.name}</span>
                      <span className={`text-lg font-semibold text-${emotion.color}-700`}>{emotion.percentage}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

// Default insights for demo purposes
const defaultInsights: Insight[] = [
  {
    title: "Interruptions detected",
    description: "You interrupted your partner 8 times during the conversation. This may make them feel unheard or devalued.",
    type: "improvement",
    icon: AlertCircle,
    suggestion: "Try to notice when you feel the urge to interrupt. Take a breath and wait until your partner has finished their thought before responding.",
  },
  {
    title: "Strong active listening",
    description: "You asked clarifying questions and paraphrased your partner's points, showing that you were truly listening.",
    type: "strength",
    icon: CheckCircle,
    suggestion: "Continue this excellent habit. Your partner feels valued when you demonstrate that you're absorbing what they say.",
  },
  {
    title: "Defensive responses",
    description: "When receiving feedback, you responded defensively 5 times by immediately justifying your actions.",
    type: "improvement",
    icon: AlertCircle,
    suggestion: "Try acknowledging your partner's perspective first before explaining your side. This validates their feelings even if you disagree.",
  },
  {
    title: "Positive affirmations",
    description: "You expressed appreciation and gratitude multiple times during the conversation.",
    type: "strength",
    icon: CheckCircle,
    suggestion: "This is excellent relationship-building behavior. Continue to notice and verbalize the things you appreciate about your partner.",
  },
];

export default TranscriptAnalyzer;
