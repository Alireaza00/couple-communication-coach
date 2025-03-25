
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { FileText, InfoIcon } from 'lucide-react';

interface RepairAttemptsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const RepairAttemptsDialog: React.FC<RepairAttemptsDialogProps> = ({ open, onOpenChange }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <FileText className="h-5 w-5 mr-2" />
            Learn About "Repair Attempts"
          </DialogTitle>
          <DialogDescription>
            Discover this crucial skill for maintaining healthy relationships during conflict.
          </DialogDescription>
        </DialogHeader>
        
        <div className="mt-4 space-y-4">
          <div>
            <h3 className="font-medium text-lg mb-2">What are "Repair Attempts"?</h3>
            <p className="text-foreground/80">
              Coined by relationship researcher Dr. John Gottman, repair attempts are any statement or action—silly or otherwise—that prevents 
              negativity from escalating out of control during conflict. They're like the emergency brake system in relationships.
            </p>
          </div>

          <div>
            <h3 className="font-medium text-lg mb-2">Examples of Repair Attempts</h3>
            <ul className="space-y-2 text-foreground/80">
              <li><span className="font-medium">• Using humor:</span> "Can we rewind this conversation? I think we got off track."</li>
              <li><span className="font-medium">• Taking responsibility:</span> "I'm sorry, that came out wrong. Let me try again."</li>
              <li><span className="font-medium">• Expressing appreciation:</span> "I know you're trying to help, and I appreciate that."</li>
              <li><span className="font-medium">• Asking for clarification:</span> "I'm not sure I understand. Can you explain that differently?"</li>
              <li><span className="font-medium">• Suggesting a break:</span> "I'm feeling overwhelmed. Can we take 20 minutes and come back to this?"</li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-lg mb-2">Why Repair Attempts Matter</h3>
            <p className="text-foreground/80">
              According to Gottman's research, the success or failure of repair attempts is one of the primary factors that determine whether 
              relationships succeed or fail. Happy couples aren't those who never argue—they're couples who effectively repair when conflicts arise.
            </p>
          </div>

          <div>
            <h3 className="font-medium text-lg mb-2">How to Make and Receive Repair Attempts</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium mb-2 text-blue-800">Making Repair Attempts</h4>
                <ul className="space-y-1 text-blue-700 text-sm">
                  <li>• Be sincere and authentic</li>
                  <li>• Use "I" statements instead of "you" accusations</li>
                  <li>• Keep them simple and clear</li>
                  <li>• Try different approaches if one doesn't work</li>
                  <li>• Use touch when appropriate (hand on arm, etc.)</li>
                </ul>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-medium mb-2 text-green-800">Receiving Repair Attempts</h4>
                <ul className="space-y-1 text-green-700 text-sm">
                  <li>• Be mindful and watch for attempts</li>
                  <li>• Acknowledge them, even during disagreement</li>
                  <li>• Respond positively when possible</li>
                  <li>• Express appreciation for the effort</li>
                  <li>• Remember that accepting doesn't mean agreeing</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-primary/5 rounded-lg p-4">
            <div className="flex items-start">
              <InfoIcon className="h-5 w-5 text-primary mr-2 mt-1" />
              <div>
                <h4 className="text-sm font-medium mb-1">Practice Exercise</h4>
                <p className="text-sm text-foreground/70">
                  With your partner, create a list of repair attempts that have worked for you in the past. Then, 
                  discuss new phrases or actions you might try next time a conflict arises. Having these ready makes 
                  them easier to use in the moment.
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

export default RepairAttemptsDialog;
