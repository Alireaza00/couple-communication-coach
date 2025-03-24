
import { Clock, Mic } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface RecordingInfoProps {
  isRecording?: boolean;
  duration?: number;
  formatTime?: (seconds: number) => string;
  isTranscriptionEnabled?: boolean;
  toggleTranscription?: () => void;
}

export const RecordingInfo = ({ 
  isRecording, 
  duration = 0, 
  formatTime,
  isTranscriptionEnabled,
  toggleTranscription
}: RecordingInfoProps) => {
  // Recording status display
  if (isRecording !== undefined) {
    return (
      <div className="flex items-center">
        <div className={cn(
          "h-12 w-12 rounded-full flex items-center justify-center",
          isRecording ? "bg-red-100" : "bg-gray-100"
        )}>
          {isRecording ? (
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
          ) : (
            <Mic className="h-6 w-6 text-gray-500" />
          )}
        </div>
        
        <div className="ml-4">
          <div className="text-lg font-medium">
            {isRecording ? "Recording..." : "Ready to record"}
          </div>
          {isRecording && formatTime && (
            <div className="text-sm text-red-500 flex items-center">
              <Clock className="h-3 w-3 mr-1" /> {formatTime(duration)}
            </div>
          )}
        </div>
      </div>
    );
  }
  
  // Transcription mode info
  if (isTranscriptionEnabled !== undefined && toggleTranscription) {
    return (
      <div className="text-sm text-foreground/60 mb-6">
        <strong>How it works:</strong> When you start recording, your browser will ask for microphone permission. After 
        recording your conversation, {isTranscriptionEnabled 
          ? "your audio will be transcribed using Galadia.io API and analyzed for communication patterns." 
          : "a simulated transcript will be used for demonstration purposes."}
        
        <Button
          variant="link"
          size="sm"
          onClick={toggleTranscription}
          className="ml-2 p-0 h-auto text-primary underline"
        >
          {isTranscriptionEnabled ? "Switch to Demo Mode" : "Use Real Transcription"}
        </Button>
      </div>
    );
  }
  
  return null;
};
