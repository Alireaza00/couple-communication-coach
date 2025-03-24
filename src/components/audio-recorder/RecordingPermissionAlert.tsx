
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface RecordingPermissionAlertProps {
  permissionStatus: 'granted' | 'denied' | 'prompt';
}

export const RecordingPermissionAlert = ({ permissionStatus }: RecordingPermissionAlertProps) => {
  if (permissionStatus === 'denied') {
    return (
      <Alert variant="destructive" className="mb-4">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Microphone Access Required</AlertTitle>
        <AlertDescription>
          This feature requires microphone access to record your conversations. 
          Please allow microphone access in your browser settings and refresh the page.
        </AlertDescription>
      </Alert>
    );
  }
  return null;
};
