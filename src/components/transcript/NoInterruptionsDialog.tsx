
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { FileText, InfoIcon } from 'lucide-react';

interface NoInterruptionsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const NoInterruptionsDialog: React.FC<NoInterruptionsDialogProps> = ({ open, onOpenChange }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <FileText className="h-5 w-5 mr-2" />
            Practice "No Interruptions" Conversation
          </DialogTitle>
          <DialogDescription>
            Learn how to practice this important conversation technique with your partner.
          </DialogDescription>
        </DialogHeader>
        
        <div className="mt-4 space-y-4">
          <div>
            <h3 className="font-medium text-lg mb-2">What is a "No Interruptions" Conversation?</h3>
            <p className="text-foreground/80">
              This exercise helps partners develop better listening skills by enforcing a simple rule: 
              after one person finishes speaking, the other person must wait 3 seconds before responding. 
              This creates space for complete thoughts and reduces the tendency to interrupt.
            </p>
          </div>

          <div>
            <h3 className="font-medium text-lg mb-2">How to Practice</h3>
            <ol className="space-y-3 list-decimal pl-5">
              <li>
                <p><span className="font-medium">Choose a Topic:</span> Select something meaningful but not highly contentious for your first practice.</p>
              </li>
              <li>
                <p><span className="font-medium">Set a Timer:</span> Agree to practice for 15 minutes.</p>
              </li>
              <li>
                <p><span className="font-medium">Establish the 3-Second Rule:</span> After one person stops speaking, the other must count silently to 3 before responding.</p>
              </li>
              <li>
                <p><span className="font-medium">Use a "Talking Object":</span> Optional: Use an object that is passed between partners to indicate who has the floor.</p>
              </li>
              <li>
                <p><span className="font-medium">Reflect:</span> After the exercise, discuss how it felt to wait before responding.</p>
              </li>
            </ol>
          </div>

          <div>
            <h3 className="font-medium text-lg mb-2">Benefits</h3>
            <ul className="space-y-2 list-disc pl-5">
              <li>Reduces interruptions and promotes active listening</li>
              <li>Creates space for complete thoughts to be expressed</li>
              <li>Helps partners feel more heard and understood</li>
              <li>Slows down heated discussions before they escalate</li>
              <li>Improves overall communication quality</li>
            </ul>
          </div>

          <div className="bg-primary/5 rounded-lg p-4">
            <div className="flex items-start">
              <InfoIcon className="h-5 w-5 text-primary mr-2 mt-1" />
              <div>
                <h4 className="text-sm font-medium mb-1">Pro Tip</h4>
                <p className="text-sm text-foreground/70">
                  Record your practice session (with permission) and analyze it together afterward to identify 
                  patterns and improvements. You can use the recording feature in this app!
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-6 flex justify-end">
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NoInterruptionsDialog;
