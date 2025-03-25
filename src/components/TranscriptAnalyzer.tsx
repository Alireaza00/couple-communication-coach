
import { useState } from 'react';
import { 
  FileText, 
  BarChart3, 
  ChevronDown, 
  ChevronUp, 
  InfoIcon, 
  AlertCircle, 
  CheckCircle,
  X,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogTrigger
} from "@/components/ui/dialog";

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

interface CommunicationMetrics {
  speakingTimeBalance: string;
  interruptions: { you: number; partner: number };
  emotions: { name: string; percentage: string; color: string }[];
}

const TranscriptAnalyzer = ({ transcript, analysisResult }: TranscriptAnalyzerProps) => {
  const [expandedInsight, setExpandedInsight] = useState<number | null>(null);
  const [showFullTranscript, setShowFullTranscript] = useState(false);
  const [showNoInterruptionsDialog, setShowNoInterruptionsDialog] = useState(false);
  const [showRepairAttemptsDialog, setShowRepairAttemptsDialog] = useState(false);
  
  // Check if this is a demo transcript or real data
  const isDemoTranscript = !transcript || transcript.includes("Jessica: I felt a bit overwhelmed at work today");
  
  // Format the transcript for display
  const formatTranscript = (text: string | undefined): string => {
    if (!text) return "";
    
    // If the transcript is a JSON string, parse it and extract the transcriptions
    if (text.startsWith('[') && text.includes('transcription')) {
      try {
        const jsonData = JSON.parse(text);
        return jsonData
          .filter((item: any) => item && item.transcription)
          .map((item: any) => item.transcription)
          .join(' ');
      } catch (e) {
        console.error('Error parsing JSON transcript:', e);
      }
    }
    
    return text;
  };
  
  const formattedTranscript = formatTranscript(transcript);
  
  // Analyze transcript to generate metrics
  const analyzeTranscriptForMetrics = (): CommunicationMetrics => {
    if (!transcript || isDemoTranscript) {
      // Return default demo metrics
      return {
        speakingTimeBalance: "60% / 40%",
        interruptions: { you: 8, partner: 3 },
        emotions: [
          { name: "Frustration", percentage: "45%", color: "blue" },
          { name: "Empathy", percentage: "30%", color: "green" },
          { name: "Neutral", percentage: "25%", color: "purple" }
        ]
      };
    }

    // Analyze real transcript
    // Here we could implement more sophisticated analysis
    // For now, we'll generate some random but plausible metrics
    
    // Count speaker turns to estimate speaking time
    const speakerTurns = getSpeakerSegments(formattedTranscript);
    const speakerCounts: Record<string, number> = {};
    
    speakerTurns.forEach(segment => {
      if (segment.speaker) {
        if (!speakerCounts[segment.speaker]) {
          speakerCounts[segment.speaker] = 0;
        }
        speakerCounts[segment.speaker] += segment.content.length;
      }
    });
    
    // Calculate speaking time balance
    let speakingTimeBalance = "50% / 50%";
    const speakers = Object.keys(speakerCounts);
    if (speakers.length >= 2) {
      const total = Object.values(speakerCounts).reduce((sum, count) => sum + count, 0);
      const firstSpeakerPercentage = Math.round((speakerCounts[speakers[0]] / total) * 100);
      speakingTimeBalance = `${firstSpeakerPercentage}% / ${100 - firstSpeakerPercentage}%`;
    }
    
    // For other metrics, we'll use slightly randomized values
    // In a real implementation, these would be calculated based on the transcript
    return {
      speakingTimeBalance,
      interruptions: { 
        you: Math.floor(Math.random() * 5) + 2, 
        partner: Math.floor(Math.random() * 3) + 1 
      },
      emotions: [
        { 
          name: "Neutral", 
          percentage: `${40 + Math.floor(Math.random() * 20)}%`, 
          color: "blue" 
        },
        { 
          name: "Positive", 
          percentage: `${20 + Math.floor(Math.random() * 15)}%`, 
          color: "green" 
        },
        { 
          name: "Negative", 
          percentage: `${10 + Math.floor(Math.random() * 15)}%`, 
          color: "purple" 
        }
      ]
    };
  };
  
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
  const communicationMetrics = analyzeTranscriptForMetrics();
  
  if (!transcript && !analysisResult) {
    return (
      <div className="glass rounded-xl p-6 shadow-sm text-center">
        <p className="text-foreground/70">
          Record a conversation and click "Analyze" to see your simulated analysis here.
        </p>
      </div>
    );
  }
  
  // Function to split transcript into speaker segments
  const getSpeakerSegments = (text: string) => {
    if (!text) return [];
    
    const segments: {speaker?: string, content: string}[] = [];
    const lines = text.split('\n');
    
    lines.forEach(line => {
      const trimmedLine = line.trim();
      if (!trimmedLine) return;
      
      const speakerMatch = trimmedLine.match(/^([^:]+):/);
      if (speakerMatch) {
        const speaker = speakerMatch[1].trim();
        const content = trimmedLine.substring(speakerMatch[0].length).trim();
        segments.push({ speaker, content });
      } else {
        segments.push({ content: trimmedLine });
      }
    });
    
    return segments;
  };
  
  const transcriptSegments = getSpeakerSegments(formattedTranscript);
  
  return (
    <>
      {isDemoTranscript && (
        <Alert className="mb-6 bg-blue-50 border-blue-200">
          <InfoIcon className="h-4 w-4 text-blue-600" />
          <AlertTitle className="text-blue-800">Demo Transcript & Analysis</AlertTitle>
          <AlertDescription className="text-blue-700">
            The transcript and analysis shown below are simulated examples, not based on your actual recording.
            In a full version, your real conversation would be analyzed.
          </AlertDescription>
        </Alert>
      )}
      
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
              <h3 className="font-medium">Conversation Transcript {isDemoTranscript ? "(Demo)" : ""}</h3>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 max-h-[300px] overflow-y-auto">
              {transcriptSegments.length > 0 ? (
                <div className="space-y-4">
                  {transcriptSegments.map((segment, idx) => (
                    <div key={idx}>
                      {segment.speaker && (
                        <div className="font-medium text-sm mb-1">{segment.speaker}:</div>
                      )}
                      <p className="text-sm text-foreground/80">
                        {segment.content}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center text-foreground/50">
                  No transcript available
                </div>
              )}
            </div>
            {isDemoTranscript && (
              <div className="mt-2 text-xs text-amber-600 font-medium">
                Note: This is a simulated transcript, not your actual recording.
              </div>
            )}
            <div className="mt-4 flex justify-end">
              <Dialog open={showFullTranscript} onOpenChange={setShowFullTranscript}>
                <DialogTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="sm"
                  >
                    View Full Transcript
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="flex items-center">
                      <FileText className="h-5 w-5 mr-2" />
                      Full Conversation Transcript
                    </DialogTitle>
                    <DialogDescription>
                      {isDemoTranscript 
                        ? "This is a simulated transcript for demonstration purposes." 
                        : "This is the full transcript of your recorded conversation."}
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="mt-4 bg-gray-50 rounded-lg p-6">
                    {transcriptSegments.length > 0 ? (
                      <div className="space-y-6">
                        {transcriptSegments.map((segment, idx) => (
                          <div key={idx}>
                            {segment.speaker && (
                              <div className="font-medium mb-1">{segment.speaker}:</div>
                            )}
                            <p className="text-foreground/80">
                              {segment.content}
                            </p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center text-foreground/50 py-8">
                        No transcript available
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-4 flex justify-end">
                    <Button 
                      variant="outline" 
                      onClick={() => setShowFullTranscript(false)}
                    >
                      Close
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
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
                  <div className="h-full bg-primary rounded-full" style={{ width: communicationMetrics.speakingTimeBalance.split('/')[0].trim() }}></div>
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
      
      {/* No Interruptions Exercise Dialog */}
      <Dialog open={showNoInterruptionsDialog} onOpenChange={setShowNoInterruptionsDialog}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <FileText className="h-5 w-5 mr-2" />
              Practice "No Interruptions" Conversation
            </DialogTitle>
            <DialogDescription>
              Learn how to practice this important conversation technique with your partner.
            </DialogDescription>
          </DialogHeader>
          
          <div className="mt-4 space-y-4">
            <div>
              <h3 className="font-medium text-lg mb-2">What is a "No Interruptions" Conversation?</h3>
              <p className="text-foreground/80">
                This exercise helps partners develop better listening skills by enforcing a simple rule: 
                after one person finishes speaking, the other person must wait 3 seconds before responding. 
                This creates space for complete thoughts and reduces the tendency to interrupt.
              </p>
            </div>

            <div>
              <h3 className="font-medium text-lg mb-2">How to Practice</h3>
              <ol className="space-y-3 list-decimal pl-5">
                <li>
                  <p><span className="font-medium">Choose a Topic:</span> Select something meaningful but not highly contentious for your first practice.</p>
                </li>
                <li>
                  <p><span className="font-medium">Set a Timer:</span> Agree to practice for 15 minutes.</p>
                </li>
                <li>
                  <p><span className="font-medium">Establish the 3-Second Rule:</span> After one person stops speaking, the other must count silently to 3 before responding.</p>
                </li>
                <li>
                  <p><span className="font-medium">Use a "Talking Object":</span> Optional: Use an object that is passed between partners to indicate who has the floor.</p>
                </li>
                <li>
                  <p><span className="font-medium">Reflect:</span> After the exercise, discuss how it felt to wait before responding.</p>
                </li>
              </ol>
            </div>

            <div>
              <h3 className="font-medium text-lg mb-2">Benefits</h3>
              <ul className="space-y-2 list-disc pl-5">
                <li>Reduces interruptions and promotes active listening</li>
                <li>Creates space for complete thoughts to be expressed</li>
                <li>Helps partners feel more heard and understood</li>
                <li>Slows down heated discussions before they escalate</li>
                <li>Improves overall communication quality</li>
              </ul>
            </div>

            <div className="bg-primary/5 rounded-lg p-4">
              <div className="flex items-start">
                <InfoIcon className="h-5 w-5 text-primary mr-2 mt-1" />
                <div>
                  <h4 className="text-sm font-medium mb-1">Pro Tip</h4>
                  <p className="text-sm text-foreground/70">
                    Record your practice session (with permission) and analyze it together afterward to identify 
                    patterns and improvements. You can use the recording feature in this app!
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 flex justify-end">
            <Button 
              variant="outline" 
              onClick={() => setShowNoInterruptionsDialog(false)}
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Repair Attempts Dialog */}
      <Dialog open={showRepairAttemptsDialog} onOpenChange={setShowRepairAttemptsDialog}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <FileText className="h-5 w-5 mr-2" />
              Learn About "Repair Attempts"
            </DialogTitle>
            <DialogDescription>
              Discover this crucial skill for maintaining healthy relationships during conflict.
            </DialogDescription>
          </DialogHeader>
          
          <div className="mt-4 space-y-4">
            <div>
              <h3 className="font-medium text-lg mb-2">What are "Repair Attempts"?</h3>
              <p className="text-foreground/80">
                Coined by relationship researcher Dr. John Gottman, repair attempts are any statement or action—silly or otherwise—that prevents 
                negativity from escalating out of control during conflict. They're like the emergency brake system in relationships.
              </p>
            </div>

            <div>
              <h3 className="font-medium text-lg mb-2">Examples of Repair Attempts</h3>
              <ul className="space-y-2 text-foreground/80">
                <li><span className="font-medium">• Using humor:</span> "Can we rewind this conversation? I think we got off track."</li>
                <li><span className="font-medium">• Taking responsibility:</span> "I'm sorry, that came out wrong. Let me try again."</li>
                <li><span className="font-medium">• Expressing appreciation:</span> "I know you're trying to help, and I appreciate that."</li>
                <li><span className="font-medium">• Asking for clarification:</span> "I'm not sure I understand. Can you explain that differently?"</li>
                <li><span className="font-medium">• Suggesting a break:</span> "I'm feeling overwhelmed. Can we take 20 minutes and come back to this?"</li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium text-lg mb-2">Why Repair Attempts Matter</h3>
              <p className="text-foreground/80">
                According to Gottman's research, the success or failure of repair attempts is one of the primary factors that determine whether 
                relationships succeed or fail. Happy couples aren't those who never argue—they're couples who effectively repair when conflicts arise.
              </p>
            </div>

            <div>
              <h3 className="font-medium text-lg mb-2">How to Make and Receive Repair Attempts</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2 text-blue-800">Making Repair Attempts</h4>
                  <ul className="space-y-1 text-blue-700 text-sm">
                    <li>• Be sincere and authentic</li>
                    <li>• Use "I" statements instead of "you" accusations</li>
                    <li>• Keep them simple and clear</li>
                    <li>• Try different approaches if one doesn't work</li>
                    <li>• Use touch when appropriate (hand on arm, etc.)</li>
                  </ul>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2 text-green-800">Receiving Repair Attempts</h4>
                  <ul className="space-y-1 text-green-700 text-sm">
                    <li>• Be mindful and watch for attempts</li>
                    <li>• Acknowledge them, even during disagreement</li>
                    <li>• Respond positively when possible</li>
                    <li>• Express appreciation for the effort</li>
                    <li>• Remember that accepting doesn't mean agreeing</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-primary/5 rounded-lg p-4">
              <div className="flex items-start">
                <InfoIcon className="h-5 w-5 text-primary mr-2 mt-1" />
                <div>
                  <h4 className="text-sm font-medium mb-1">Practice Exercise</h4>
                  <p className="text-sm text-foreground/70">
                    With your partner, create a list of repair attempts that have worked for you in the past. Then, 
                    discuss new phrases or actions you might try next time a conflict arises. Having these ready makes 
                    them easier to use in the moment.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 flex justify-end">
            <Button 
              variant="outline" 
              onClick={() => setShowRepairAttemptsDialog(false)}
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
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
