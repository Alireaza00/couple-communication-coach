
import { Play, Trash2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatTime } from './utils/formatTime';

interface Recording {
  id: number;
  duration: number;
  blob?: Blob;
}

interface RecordingsListProps {
  recordings: Recording[];
  isProcessing: boolean;
  currentlyProcessingId: number | null;
  isTranscriptionEnabled: boolean;
  handlePlayRecording: (id: number) => void;
  handleDeleteRecording: (id: number) => void;
  analyzeRecording: (id: number) => void;
  formatTime?: (seconds: number) => string;
}

export const RecordingsList = ({
  recordings,
  isProcessing,
  currentlyProcessingId,
  isTranscriptionEnabled,
  handlePlayRecording,
  handleDeleteRecording,
  analyzeRecording,
  formatTime: customFormatTime
}: RecordingsListProps) => {
  // Use the provided format function or the default one
  const timeFormatter = customFormatTime || formatTime;
  
  return (
    <div>
      <h4 className="text-sm font-medium text-foreground/70 mb-3">Recent Recordings</h4>
      <div className="space-y-3">
        {recordings.map(recording => {
          const isCurrentlyProcessing = isProcessing && currentlyProcessingId === recording.id;
          
          return (
            <div 
              key={recording.id}
              className="flex items-center justify-between py-2 px-4 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center">
                <button
                  onClick={() => handlePlayRecording(recording.id)}
                  className="text-gray-500 hover:text-primary"
                  title="Play recording"
                  disabled={isProcessing}
                >
                  <Play className="h-4 w-4 mr-2" />
                </button>
                <span className="text-sm">Recording {new Date(recording.id).toLocaleTimeString()}</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-xs text-gray-500">{timeFormatter(recording.duration)}</span>
                <Button
                  onClick={() => analyzeRecording(recording.id)}
                  variant="outline"
                  size="sm"
                  disabled={isProcessing}
                  className="text-xs h-8"
                >
                  {isCurrentlyProcessing ? 
                    <><Loader2 className="h-3 w-3 mr-1 animate-spin" /> Analyzing...</> : 
                    isTranscriptionEnabled ? 'Analyze' : 'Analyze (Demo)'}
                </Button>
                <button 
                  onClick={() => handleDeleteRecording(recording.id)}
                  className="text-gray-400 hover:text-red-500"
                  title="Delete recording"
                  disabled={isProcessing}
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
