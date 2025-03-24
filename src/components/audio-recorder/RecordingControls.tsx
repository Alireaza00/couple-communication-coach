
import { Mic, Square } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ReactNode } from 'react';

interface RecordingControlsProps {
  isRecording: boolean;
  permissionStatus: 'granted' | 'denied' | 'prompt';
  handleStartRecording: () => void;
  handleStopRecording: () => void;
  children: ReactNode;
}

export const RecordingControls = ({ 
  isRecording, 
  permissionStatus, 
  handleStartRecording, 
  handleStopRecording,
  children
}: RecordingControlsProps) => {
  return (
    <div className="flex items-center justify-between mb-6">
      {children}
      
      <div>
        {isRecording ? (
          <Button 
            onClick={handleStopRecording}
            variant="destructive"
            size="sm"
            className="h-10"
          >
            <Square className="h-4 w-4 mr-2" /> Stop
          </Button>
        ) : (
          <Button 
            onClick={handleStartRecording}
            variant="default"
            size="sm"
            className="h-10"
            disabled={permissionStatus === 'denied'}
          >
            <Mic className="h-4 w-4 mr-2" /> Start Recording
          </Button>
        )}
      </div>
    </div>
  );
};
