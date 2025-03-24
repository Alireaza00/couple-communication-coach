
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { analyzeCommunication, transcribeAudio } from '@/services/api';

interface UseAudioAnalyzerProps {
  onTranscriptAnalyzed: (analysis: any) => void;
}

interface UseAudioAnalyzerReturn {
  isProcessing: boolean;
  currentlyProcessingId: number | null;
  isTranscriptionEnabled: boolean;
  toggleTranscription: () => void;
  analyzeRecording: (id: number, blob?: Blob) => Promise<void>;
}

export const useAudioAnalyzer = ({ onTranscriptAnalyzed }: UseAudioAnalyzerProps): UseAudioAnalyzerReturn => {
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentlyProcessingId, setCurrentlyProcessingId] = useState<number | null>(null);
  const [isTranscriptionEnabled, setIsTranscriptionEnabled] = useState(true);

  const toggleTranscription = () => {
    setIsTranscriptionEnabled(prev => !prev);
    toast({
      title: isTranscriptionEnabled ? "Using Demo Mode" : "Using Real Transcription",
      description: isTranscriptionEnabled 
        ? "Switched to demo mode. Your recordings won't be sent for transcription." 
        : "Switched to real transcription. Your recordings will be transcribed using Galadia API.",
    });
  };

  const analyzeRecording = async (id: number, blob?: Blob) => {
    try {
      // Prevent multiple simultaneous analyses
      if (isProcessing) {
        toast({
          title: "Processing in Progress",
          description: "Please wait until the current analysis is complete.",
        });
        return;
      }

      if (!blob) {
        throw new Error("Recording not found");
      }

      setIsProcessing(true);
      setCurrentlyProcessingId(id);
      
      toast({
        title: "Processing Audio",
        description: "Transcribing your recording, please wait...",
      });
      
      let transcript = '';
      let shouldUseFallback = false;
      
      if (isTranscriptionEnabled) {
        try {
          console.log("Sending blob for transcription:", {
            size: blob.size,
            type: blob.type
          });
          
          const transcriptionResult = await transcribeAudio(blob);
          
          transcript = typeof transcriptionResult === 'string' 
            ? transcriptionResult 
            : JSON.stringify(transcriptionResult);
          
          console.log("Transcription result:", transcript);
          
          // Format the transcript if it's in JSON format
          if (transcript.startsWith('[') && transcript.includes('transcription')) {
            try {
              const jsonData = JSON.parse(transcript);
              transcript = jsonData
                .filter((item: any) => item && item.transcription)
                .map((item: any) => item.transcription)
                .join(' ');
            } catch (e) {
              console.error('Error parsing JSON transcript:', e);
            }
          }
          
          if (!transcript || (typeof transcript === 'string' && transcript.trim() === '')) {
            throw new Error("Empty transcript received");
          }
          
          toast({
            title: "Transcription Complete",
            description: "Your recording has been successfully transcribed.",
          });
        } catch (error) {
          console.error('Transcription error:', error);
          toast({
            title: "Transcription Error",
            description: "Could not transcribe your recording. Using fallback mode.",
            variant: "destructive"
          });
          shouldUseFallback = true;
          setIsTranscriptionEnabled(false);
        }
      }
      
      if (!isTranscriptionEnabled || shouldUseFallback || transcript === '') {
        transcript = `
Jessica: I felt a bit overwhelmed at work today. The project deadline got moved up and now I'm worried about getting everything done.
Mark: That sounds stressful. Why don't you just ask for an extension?
Jessica: Well, it's not that simple. I've already—
Mark: You always say that, but have you actually tried asking?
Jessica: I feel like you're not really understanding what I'm saying. This is important to me.
Mark: I'm sorry. You're right. Can you help me understand what's making this so difficult?
`;
      }

      const analysisResult = await analyzeCommunication(transcript);
      
      onTranscriptAnalyzed({
        transcript: transcript,
        analysis: analysisResult.text
      });
      
      toast({
        title: "Analysis Complete",
        description: "Your conversation has been analyzed.",
      });
    } catch (error) {
      console.error('Error analyzing recording:', error);
      toast({
        title: "Analysis Error",
        description: "Could not analyze your recording. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
      setCurrentlyProcessingId(null);
    }
  };

  return {
    isProcessing,
    currentlyProcessingId,
    isTranscriptionEnabled,
    toggleTranscription,
    analyzeRecording
  };
};
