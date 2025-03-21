
import { useState } from "react";
import { 
  MessageSquare, 
  Brain, 
  ArrowRight,
  Mic,
  BarChart3,
  Info
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AudioRecorder from "@/components/AudioRecorder";
import CommunicationChart from "@/components/CommunicationChart";
import TranscriptAnalyzer from "@/components/TranscriptAnalyzer";

interface AnalysisData {
  transcript: string;
  analysis: string;
}

const Analysis = () => {
  const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null);
  
  const handleAnalysisComplete = (data: AnalysisData) => {
    setAnalysisData(data);
    // Scroll to results
    setTimeout(() => {
      document.getElementById('analysis-results')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };
  
  const communicationData = [
    { name: 'Active Listening', value: 82, color: '#3B82F6' },
    { name: 'Empathy', value: 75, color: '#10B981' },
    { name: 'Clear Expression', value: 68, color: '#F59E0B' },
    { name: 'Nonverbal Cues', value: 55, color: '#8B5CF6' },
    { name: 'Conflict Resolution', value: 60, color: '#EC4899' },
  ];
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-[100px] pb-20">
        <div className="container-tight">
          {/* Header Section */}
          <section className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Communication Analysis</h1>
            <p className="text-foreground/70 max-w-2xl mb-4">
              Get personalized insights about your communication patterns and learn how to express yourself more effectively.
            </p>
            
            <Alert className="mb-4">
              <Info className="h-4 w-4" />
              <AlertTitle>How Communication Analysis Works</AlertTitle>
              <AlertDescription>
                <ol className="mt-2 ml-4 space-y-1 list-decimal">
                  <li>Record a conversation using the tool below (will request microphone access)</li>
                  <li>Our AI transcribes your conversation into text</li>
                  <li>The transcript is analyzed for communication patterns</li>
                  <li>You'll receive personalized insights and improvement suggestions</li>
                </ol>
                <p className="mt-2 text-sm text-muted-foreground">
                  <strong>Note:</strong> In this demo, we use simulated transcription and analysis to showcase the feature.
                </p>
              </AlertDescription>
            </Alert>
          </section>
          
          {/* Recorder Section */}
          <section className="mb-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1">
                <AudioRecorder onTranscriptAnalyzed={handleAnalysisComplete} />
              </div>
              
              <div className="lg:col-span-2 glass rounded-xl p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  <h3 className="font-medium">Communication Score Overview</h3>
                </div>
                <p className="text-sm text-foreground/70 mb-6">
                  Based on your last conversation {analysisData ? '(Just Analyzed)' : '(May 12, 2023 • 15 minutes)'}
                </p>
                
                <CommunicationChart data={communicationData} />
                
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Overall Communication Quality</span>
                      <span className="text-sm font-semibold">72%</span>
                    </div>
                    <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full" style={{ width: "72%" }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Improvement Since Last Month</span>
                      <span className="text-sm font-semibold text-green-500">+8%</span>
                    </div>
                    <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 rounded-full" style={{ width: "8%" }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          {/* Analysis Results Section */}
          <div id="analysis-results">
            {analysisData && <TranscriptAnalyzer transcript={analysisData.transcript} analysisResult={analysisData.analysis} />}
            
            {/* Next Steps Section - Always shown */}
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
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Analysis;
