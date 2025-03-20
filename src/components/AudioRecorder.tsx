
import { useState, useEffect } from 'react';
import { Mic, Square, Clock, Play, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const AudioRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [duration, setDuration] = useState(0);
  const [recordings, setRecordings] = useState<{ id: number; duration: number }[]>([]);
  
  useEffect(() => {
    let interval: number;
    if (isRecording) {
      interval = window.setInterval(() => {
        setDuration(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording]);
  
  const handleStartRecording = () => {
    setIsRecording(true);
    setDuration(0);
  };
  
  const handleStopRecording = () => {
    setIsRecording(false);
    if (duration > 0) {
      const newRecording = { id: Date.now(), duration };
      setRecordings(prev => [...prev, newRecording]);
    }
    setDuration(0);
  };
  
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };
  
  const handleDeleteRecording = (id: number) => {
    setRecordings(prev => prev.filter(recording => recording.id !== id));
  };
  
  return (
    <div className="glass rounded-xl p-6 shadow-sm">
      <h3 className="font-medium mb-4">Record Your Conversation</h3>
      
      <div className="flex items-center justify-between mb-6">
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
            {isRecording && (
              <div className="text-sm text-red-500 flex items-center">
                <Clock className="h-3 w-3 mr-1" /> {formatTime(duration)}
              </div>
            )}
          </div>
        </div>
        
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
            >
              <Mic className="h-4 w-4 mr-2" /> Start Recording
            </Button>
          )}
        </div>
      </div>
      
      {recordings.length > 0 && (
        <div>
          <h4 className="text-sm font-medium text-foreground/70 mb-3">Recent Recordings</h4>
          <div className="space-y-3">
            {recordings.map(recording => (
              <div 
                key={recording.id}
                className="flex items-center justify-between py-2 px-4 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center">
                  <Play className="h-4 w-4 text-gray-500 mr-2" />
                  <span className="text-sm">Recording {new Date(recording.id).toLocaleTimeString()}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-xs text-gray-500 mr-4">{formatTime(recording.duration)}</span>
                  <button 
                    onClick={() => handleDeleteRecording(recording.id)}
                    className="text-gray-400 hover:text-red-500"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      <div className="mt-4 text-sm text-foreground/60">
        Record a conversation with your partner to receive AI-powered communication analysis and personalized insights.
      </div>
    </div>
  );
};

export default AudioRecorder;
