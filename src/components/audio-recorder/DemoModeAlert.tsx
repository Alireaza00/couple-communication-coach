
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export const DemoModeAlert = () => {
  return (
    <Alert className="mb-4 bg-amber-50 border-amber-200">
      <AlertCircle className="h-4 w-4 text-amber-600" />
      <AlertTitle className="text-amber-800">Demo Mode Active</AlertTitle>
      <AlertDescription className="text-amber-700">
        <p className="font-medium mb-2">In this demo mode:</p>
        <ol className="mt-2 ml-4 space-y-1 list-decimal">
          <li>Your recordings are not actually processed or sent to any server</li>
          <li>The transcript is a pre-written example conversation</li>
          <li>The analysis is simulated and not based on your actual conversation</li>
        </ol>
      </AlertDescription>
    </Alert>
  );
};
