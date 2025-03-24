
import { useState, useEffect, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';
import { analyzeCommunication, transcribeAudio } from '@/services/api';
import { RecordingPermissionAlert } from './RecordingPermissionAlert';
import { DemoModeAlert } from './DemoModeAlert';
import { RecordingControls } from './RecordingControls';
import { RecordingInfo } from './RecordingInfo';
import { RecordingsList } from './RecordingsList';

const AudioRecorder = ({ onTranscriptAnalyzed = (analysis: any) => {} }) => {
  const { toast } = useToast();
  const [isRecording, setIsRecording] = useState(false);
  const [duration, setDuration] = useState(0);
  const [recordings, setRecordings] = useState<{ id: number; duration: number; blob?: Blob }[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [permissionStatus, setPermissionStatus] = useState<'granted' | 'denied' | 'prompt'>('prompt');
  const [isTranscriptionEnabled, setIsTranscriptionEnabled] = useState(true);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  
  useEffect(() => {
    const checkMicrophonePermission = async () => {
      try {
        const permissionResult = await navigator.permissions.query({ name: 'microphone' as PermissionName });
        setPermissionStatus(permissionResult.state as 'granted' | 'denied' | 'prompt');
        
        permissionResult.onchange = () => {
          setPermissionStatus(permissionResult.state as 'granted' | 'denied' | 'prompt');
        };
      } catch (error) {
        console.log('Permission API not supported, will check on recording attempt');
      }
    };
    
    checkMicrophonePermission();
  }, []);
  
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
      setPermissionStatus('granted');
      
      mediaRecorderRef.current = new MediaRecorder(stream, {
        mimeType: 'audio/webm'
      });
      audioChunksRef.current = [];
      
      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };
      
      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        console.log('Recording complete. Blob created:', { 
          size: audioBlob.size, 
          type: audioBlob.type,
          chunks: audioChunksRef.current.length
        });
        
        const recording = { id: Date.now(), duration, blob: audioBlob };
        setRecordings(prev => [...prev, recording]);
        stream.getTracks().forEach(track => track.stop());
      };
      
      mediaRecorderRef.current.start();
      setIsRecording(true);
      setDuration(0);
      
      toast({
        title: "Recording Started",
        description: "Your microphone is now active and recording your conversation.",
      });
    } catch (error) {
      console.error('Error starting recording:', error);
      setPermissionStatus('denied');
      
      toast({
        title: "Microphone Access Denied",
        description: "Please allow microphone access in your browser settings to use this feature.",
        variant: "destructive"
      });
    }
  };
  
  const handleStopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      
      toast({
        title: "Recording Stopped",
        description: "Your conversation has been recorded. You can now analyze it.",
      });
    }
  };
  
  const handleDeleteRecording = (id: number) => {
    setRecordings(prev => prev.filter(recording => recording.id !== id));
    toast({
      title: "Recording Deleted",
      description: "The recording has been removed.",
    });
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
      
      toast({
        title: "Processing Audio",
        description: "Transcribing your recording, please wait...",
      });
      
      let transcript = '';
      let shouldUseFallback = false;
      
      if (isTranscriptionEnabled) {
        try {
          console.log("Sending blob for transcription:", {
            size: recording.blob.size,
            type: recording.blob.type
          });
          
          const transcriptionResult = await transcribeAudio(recording.blob);
          
          transcript = typeof transcriptionResult === 'string' 
            ? transcriptionResult 
            : JSON.stringify(transcriptionResult);
          
          console.log("Transcription result:", transcript);
          
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
    }
  };
  
  const toggleTranscription = () => {
    setIsTranscriptionEnabled(prev => !prev);
    toast({
      title: isTranscriptionEnabled ? "Using Demo Mode" : "Using Real Transcription",
      description: isTranscriptionEnabled 
        ? "Switched to demo mode. Your recordings won't be sent for transcription." 
        : "Switched to real transcription. Your recordings will be transcribed using Galadia API.",
    });
  };
  
  return (
    <div className="glass rounded-xl p-6 shadow-sm">
      <h3 className="font-medium mb-4">Record Your Conversation</h3>
      
      <RecordingPermissionAlert permissionStatus={permissionStatus} />
      
      {!isTranscriptionEnabled && <DemoModeAlert />}
      
      <RecordingControls 
        isRecording={isRecording}
        permissionStatus={permissionStatus}
        handleStartRecording={handleStartRecording}
        handleStopRecording={handleStopRecording}
      >
        <RecordingInfo 
          isRecording={isRecording} 
          duration={duration} 
          formatTime={(seconds: number) => {
            const minutes = Math.floor(seconds / 60);
            const remainingSeconds = seconds % 60;
            return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
          }} 
        />
      </RecordingControls>

      <RecordingInfo 
        isTranscriptionEnabled={isTranscriptionEnabled}
        toggleTranscription={toggleTranscription}
      />
      
      {recordings.length > 0 && (
        <RecordingsList 
          recordings={recordings}
          isProcessing={isProcessing}
          isTranscriptionEnabled={isTranscriptionEnabled}
          handlePlayRecording={handlePlayRecording}
          handleDeleteRecording={handleDeleteRecording}
          analyzeRecording={analyzeRecording}
          formatTime={(seconds: number) => {
            const minutes = Math.floor(seconds / 60);
            const remainingSeconds = seconds % 60;
            return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
          }}
        />
      )}
    </div>
  );
};

export default AudioRecorder;
