
import { useState } from "react";
import { 
  MessageSquare, 
  Brain, 
  ArrowRight, 
  AlertCircle, 
  CheckCircle,
  InfoIcon,
  FileText,
  BarChart3,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AudioRecorder from "@/components/AudioRecorder";
import CommunicationChart from "@/components/CommunicationChart";
import { cn } from "@/lib/utils";

const Analysis = () => {
  const [expandedInsight, setExpandedInsight] = useState<number | null>(null);
  
  const toggleInsight = (index: number) => {
    if (expandedInsight === index) {
      setExpandedInsight(null);
    } else {
      setExpandedInsight(index);
    }
  };
  
  const communicationData = [
    { name: 'Active Listening', value: 82, color: '#3B82F6' },
    { name: 'Empathy', value: 75, color: '#10B981' },
    { name: 'Clear Expression', value: 68, color: '#F59E0B' },
    { name: 'Nonverbal Cues', value: 55, color: '#8B5CF6' },
    { name: 'Conflict Resolution', value: 60, color: '#EC4899' },
  ];
  
  const insights = [
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
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-[100px] pb-20">
        <div className="container-tight">
          {/* Header Section */}
          <section className="mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Communication Analysis</h1>
            <p className="text-foreground/70 max-w-2xl">
              Get personalized insights about your communication patterns and learn how to express yourself more effectively.
            </p>
          </section>
          
          {/* Recorder Section */}
          <section className="mb-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1">
                <AudioRecorder />
              </div>
              
              <div className="lg:col-span-2 glass rounded-xl p-6 shadow-sm">
                <h3 className="font-medium mb-4">Communication Score Overview</h3>
                <p className="text-sm text-foreground/70 mb-6">
                  Based on your last conversation (May 12, 2023 • 15 minutes)
                </p>
                
                <CommunicationChart data={communicationData} />
                
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Overall Communication Quality</span>
                      <span className="text-sm font-semibold">72%</span>
                    </div>
                    <Progress value={72} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Improvement Since Last Month</span>
                      <span className="text-sm font-semibold text-green-500">+8%</span>
                    </div>
                    <Progress value={8} className="h-2 bg-gray-100" />
                  </div>
                </div>
              </div>
            </div>
          </section>
          
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
                  <h3 className="font-medium">Conversation Transcript</h3>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 max-h-[300px] overflow-y-auto">
                  <div className="space-y-4">
                    <div>
                      <div className="font-medium text-sm mb-1">Jessica:</div>
                      <p className="text-sm text-foreground/80">
                        I felt a bit overwhelmed at work today. The project deadline got moved up and now I'm worried about getting everything done.
                      </p>
                    </div>
                    <div>
                      <div className="font-medium text-sm mb-1">Mark:</div>
                      <p className="text-sm text-foreground/80">
                        That sounds stressful. <span className="text-green-500">[active listening]</span> Why don't you just ask for an extension?
                      </p>
                    </div>
                    <div>
                      <div className="font-medium text-sm mb-1">Jessica:</div>
                      <p className="text-sm text-foreground/80">
                        Well, it's not that simple. I've already—
                      </p>
                    </div>
                    <div>
                      <div className="font-medium text-sm mb-1">Mark:</div>
                      <p className="text-sm text-foreground/80">
                        <span className="text-amber-500">[interruption]</span> You always say that, but have you actually tried asking?
                      </p>
                    </div>
                    <div>
                      <div className="font-medium text-sm mb-1">Jessica:</div>
                      <p className="text-sm text-foreground/80">
                        I feel like you're not really understanding what I'm saying. This is important to me.
                      </p>
                    </div>
                    <div>
                      <div className="font-medium text-sm mb-1">Mark:</div>
                      <p className="text-sm text-foreground/80">
                        <span className="text-green-500">[acknowledging]</span> I'm sorry. You're right. Can you help me understand what's making this so difficult?
                      </p>
                    </div>
                    {/* More conversation... */}
                  </div>
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
                      <span className="text-xs text-foreground/70">60% / 40%</span>
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
                        You: 8
                      </div>
                      <div className="flex-1 h-6 bg-blue-100 rounded-r-md text-center text-xs flex items-center justify-center text-blue-700">
                        Partner: 3
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm">Emotion Expression</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="bg-blue-100 h-16 rounded-md flex flex-col items-center justify-center">
                        <span className="text-xs text-blue-700 font-medium">Frustration</span>
                        <span className="text-lg font-semibold text-blue-700">45%</span>
                      </div>
                      <div className="bg-green-100 h-16 rounded-md flex flex-col items-center justify-center">
                        <span className="text-xs text-green-700 font-medium">Empathy</span>
                        <span className="text-lg font-semibold text-green-700">30%</span>
                      </div>
                      <div className="bg-purple-100 h-16 rounded-md flex flex-col items-center justify-center">
                        <span className="text-xs text-purple-700 font-medium">Neutral</span>
                        <span className="text-lg font-semibold text-purple-700">25%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          {/* Next Steps Section */}
          <section>
            <h2 className="text-2xl font-bold mb-6">Recommended Next Steps</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="glass rounded-xl p-6 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16"></div>
                <div className="relative">
                  <div className="flex items-center mb-4">
                    <MessageSquare className="h-5 w-5 text-primary mr-2" />
                    <h3 className="font-medium">Practice "No Interruptions" Conversation</h3>
                  </div>
                  <p className="text-foreground/70 mb-4">
                    Try a 15-minute conversation where both partners must wait 3 seconds after the other finishes before responding.
                  </p>
                  <Button className="w-full flex items-center justify-center">
                    Start Exercise <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </div>
              
              <div className="glass rounded-xl p-6 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16"></div>
                <div className="relative">
                  <div className="flex items-center mb-4">
                    <Brain className="h-5 w-5 text-primary mr-2" />
                    <h3 className="font-medium">Learn About "Repair Attempts"</h3>
                  </div>
                  <p className="text-foreground/70 mb-4">
                    Discover how to recognize and respond to repair attempts during conflict, a key skill in successful relationships.
                  </p>
                  <Button variant="outline" className="w-full flex items-center justify-center">
                    View Guide <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Analysis;
