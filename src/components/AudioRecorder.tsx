
import { useState, useEffect, useRef } from 'react';
import { Mic, Square, Clock, Play, Trash2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useToast } from '@/components/ui/use-toast';
import { analyzeCommunication } from '@/services/api';

const AudioRecorder = ({ onTranscriptAnalyzed = (analysis: any) => {} }) => {
  const { toast } = useToast();
  const [isRecording, setIsRecording] = useState(false);
  const [duration, setDuration] = useState(0);
  const [recordings, setRecordings] = useState<{ id: number; duration: number; blob?: Blob }[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  
  useEffect(() => {
    let interval: number;
    if (isRecording) {
      interval = window.setInterval(() => {
        setDuration(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording]);
  
  const handleStartRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];
      
      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };
      
      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        const recording = { id: Date.now(), duration, blob: audioBlob };
        setRecordings(prev => [...prev, recording]);
        stream.getTracks().forEach(track => track.stop());
      };
      
      mediaRecorderRef.current.start();
      setIsRecording(true);
      setDuration(0);
    } catch (error) {
      console.error('Error starting recording:', error);
      toast({
        title: "Recording Error",
        description: "Could not access your microphone. Please check permissions.",
        variant: "destructive"
      });
    }
  };
  
  const handleStopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };
  
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };
  
  const handleDeleteRecording = (id: number) => {
    setRecordings(prev => prev.filter(recording => recording.id !== id));
  };
  
  const handlePlayRecording = (id: number) => {
    const recording = recordings.find(rec => rec.id === id);
    if (recording?.blob) {
      const url = URL.createObjectURL(recording.blob);
      const audio = new Audio(url);
      audio.play();
    }
  };
  
  const analyzeRecording = async (id: number) => {
    try {
      setIsProcessing(true);
      const recording = recordings.find(rec => rec.id === id);
      if (!recording?.blob) {
        throw new Error("Recording not found");
      }
      
      // For demo purposes, we'll use a mock transcript
      // In a real app, you'd send the audio to a transcription API
      const mockTranscript = `
Jessica: I felt a bit overwhelmed at work today. The project deadline got moved up and now I'm worried about getting everything done.
Mark: That sounds stressful. Why don't you just ask for an extension?
Jessica: Well, it's not that simple. I've already—
Mark: You always say that, but have you actually tried asking?
Jessica: I feel like you're not really understanding what I'm saying. This is important to me.
Mark: I'm sorry. You're right. Can you help me understand what's making this so difficult?
`;

      // Now analyze the transcript
      const analysisResult = await analyzeCommunication(mockTranscript);
      
      // Notify the parent component with the analysis results
      onTranscriptAnalyzed({
        transcript: mockTranscript,
        analysis: analysisResult.text
      });
      
      toast({
        title: "Analysis Complete",
        description: "Your conversation has been analyzed successfully."
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
    }
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
                  <button
                    onClick={() => handlePlayRecording(recording.id)}
                    className="text-gray-500 hover:text-primary"
                  >
                    <Play className="h-4 w-4 mr-2" />
                  </button>
                  <span className="text-sm">Recording {new Date(recording.id).toLocaleTimeString()}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-xs text-gray-500">{formatTime(recording.duration)}</span>
                  <Button
                    onClick={() => analyzeRecording(recording.id)}
                    variant="outline"
                    size="sm"
                    disabled={isProcessing}
                    className="text-xs h-8"
                  >
                    {isProcessing ? 
                      <><Loader2 className="h-3 w-3 mr-1 animate-spin" /> Analyzing...</> : 
                      'Analyze'}
                  </Button>
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
