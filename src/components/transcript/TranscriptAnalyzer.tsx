
import { useState } from 'react';
import { InfoIcon, AlertCircle, CheckCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { TranscriptAnalyzerProps } from './types';
import { 
  getSpeakerSegments, 
  formatTranscript, 
  analyzeTranscriptForMetrics, 
  parseInsights, 
  defaultInsights 
} from './utils';
import KeyInsights from './KeyInsights';
import DetailedAnalysis from './DetailedAnalysis';
import NoInterruptionsDialog from './NoInterruptionsDialog';
import RepairAttemptsDialog from './RepairAttemptsDialog';

const TranscriptAnalyzer = ({ transcript, analysisResult }: TranscriptAnalyzerProps) => {
  const [showNoInterruptionsDialog, setShowNoInterruptionsDialog] = useState(false);
  const [showRepairAttemptsDialog, setShowRepairAttemptsDialog] = useState(false);
  
  // Check if this is a demo transcript or real data
  const isDemoTranscript = !transcript || transcript.includes("Jessica: I felt a bit overwhelmed at work today");
  
  const formattedTranscript = formatTranscript(transcript);
  
  // Parse insights from the AI analysis
  const insights = parseInsights(analysisResult, defaultInsights);
  
  // Communication metrics based on the analysis
  const communicationMetrics = analyzeTranscriptForMetrics(transcript, isDemoTranscript);
  
  if (!transcript && !analysisResult) {
    return (
      <div className="glass rounded-xl p-6 shadow-sm text-center">
        <p className="text-foreground/70">
          Record a conversation and click "Analyze" to see your simulated analysis here.
        </p>
      </div>
    );
  }
  
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
      <KeyInsights insights={insights} />
      
      {/* Detailed Analysis Section */}
      <DetailedAnalysis 
        transcriptSegments={transcriptSegments}
        communicationMetrics={communicationMetrics}
        isDemoTranscript={isDemoTranscript}
      />
      
      {/* Dialogs */}
      <NoInterruptionsDialog 
        open={showNoInterruptionsDialog} 
        onOpenChange={setShowNoInterruptionsDialog} 
      />

      <RepairAttemptsDialog 
        open={showRepairAttemptsDialog} 
        onOpenChange={setShowRepairAttemptsDialog} 
      />
    </>
  );
};

export default TranscriptAnalyzer;
