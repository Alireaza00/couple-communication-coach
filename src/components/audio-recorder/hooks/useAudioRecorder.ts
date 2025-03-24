
import { useState, useEffect, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';

interface Recording {
  id: number;
  duration: number;
  blob?: Blob;
}

interface UseAudioRecorderReturn {
  isRecording: boolean;
  duration: number;
  recordings: Recording[];
  permissionStatus: 'granted' | 'denied' | 'prompt';
  handleStartRecording: () => Promise<void>;
  handleStopRecording: () => void;
  handleDeleteRecording: (id: number) => void;
  handlePlayRecording: (id: number) => void;
}

export const useAudioRecorder = (): UseAudioRecorderReturn => {
  const { toast } = useToast();
  const [isRecording, setIsRecording] = useState(false);
  const [duration, setDuration] = useState(0);
  const [recordings, setRecordings] = useState<Recording[]>([]);
  const [permissionStatus, setPermissionStatus] = useState<'granted' | 'denied' | 'prompt'>('prompt');
  
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

  return {
    isRecording,
    duration,
    recordings,
    permissionStatus,
    handleStartRecording,
    handleStopRecording,
    handleDeleteRecording,
    handlePlayRecording
  };
};
