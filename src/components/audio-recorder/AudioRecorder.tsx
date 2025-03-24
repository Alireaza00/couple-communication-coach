
import { useAudioRecorder } from './hooks/useAudioRecorder';
import { useAudioAnalyzer } from './hooks/useAudioAnalyzer';
import { formatTime } from './utils/formatTime';
import { RecordingPermissionAlert } from './RecordingPermissionAlert';
import { DemoModeAlert } from './DemoModeAlert';
import { RecordingControls } from './RecordingControls';
import { RecordingInfo } from './RecordingInfo';
import { RecordingsList } from './RecordingsList';

const AudioRecorder = ({ onTranscriptAnalyzed = (analysis: any) => {} }) => {
  const {
    isRecording,
    duration,
    recordings,
    permissionStatus,
    handleStartRecording,
    handleStopRecording,
    handleDeleteRecording,
    handlePlayRecording
  } = useAudioRecorder();
  
  const {
    isProcessing,
    currentlyProcessingId,
    isTranscriptionEnabled,
    toggleTranscription,
    analyzeRecording: processAnalysis
  } = useAudioAnalyzer({ onTranscriptAnalyzed });
  
  const handleAnalyzeRecording = (id: number) => {
    const recording = recordings.find(rec => rec.id === id);
    if (recording?.blob) {
      processAnalysis(id, recording.blob);
    }
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
          formatTime={formatTime} 
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
          currentlyProcessingId={currentlyProcessingId}
          isTranscriptionEnabled={isTranscriptionEnabled}
          handlePlayRecording={handlePlayRecording}
          handleDeleteRecording={handleDeleteRecording}
          analyzeRecording={handleAnalyzeRecording}
          formatTime={formatTime}
        />
      )}
    </div>
  );
};

export default AudioRecorder;
