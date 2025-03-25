
import React, { useState } from "react";
import { MessageSquare, Brain, ArrowRight, InfoIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";

const NextStepsSection = () => {
  const [showNoInterruptionsDialog, setShowNoInterruptionsDialog] = useState(false);
  const [showRepairAttemptsDialog, setShowRepairAttemptsDialog] = useState(false);
  
  return (
    <section>
      <h2 className="text-2xl font-bold mb-6">Recommended Next Steps</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* No Interruptions Card */}
        <div className="glass rounded-xl p-6 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16"></div>
          <div className="relative">
            <div className="flex items-center mb-4">
              <MessageSquare className="h-5 w-5 text-primary mr-2" />
              <h3 className="font-medium">Practice "No Interruptions" Conversation</h3>
            </div>
            <p className="text-foreground/70 mb-4">
              Try a 15-minute conversation where both partners must wait 3 seconds after the other finishes before responding.
            </p>
            <Dialog open={showNoInterruptionsDialog} onOpenChange={setShowNoInterruptionsDialog}>
              <DialogTrigger asChild>
                <Button className="w-full flex items-center justify-center">
                  Start Exercise <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="flex items-center">
                    <MessageSquare className="h-5 w-5 mr-2" />
                    Practice "No Interruptions" Conversation
                  </DialogTitle>
                  <DialogDescription>
                    Learn how to practice this important conversation technique with your partner.
                  </DialogDescription>
                </DialogHeader>
                
                <div className="mt-4 space-y-4">
                  <div>
                    <h4 className="font-medium text-lg mb-2">What is a "No Interruptions" Conversation?</h4>
                    <p className="text-foreground/80">
                      This exercise helps partners develop better listening skills by enforcing a simple rule: 
                      after one person finishes speaking, the other person must wait 3 seconds before responding. 
                      This creates space for complete thoughts and reduces the tendency to interrupt.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-medium text-lg mb-2">How to Practice</h4>
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
                    <h4 className="font-medium text-lg mb-2">Benefits</h4>
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
                    onClick={() => setShowNoInterruptionsDialog(false)}
                  >
                    Close
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        
        {/* Repair Attempts Card */}
        <div className="glass rounded-xl p-6 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16"></div>
          <div className="relative">
            <div className="flex items-center mb-4">
              <Brain className="h-5 w-5 text-primary mr-2" />
              <h3 className="font-medium">Learn About "Repair Attempts"</h3>
            </div>
            <p className="text-foreground/70 mb-4">
              Discover how to recognize and respond to repair attempts during conflict, a key skill in successful relationships.
            </p>
            <Dialog open={showRepairAttemptsDialog} onOpenChange={setShowRepairAttemptsDialog}>
              <DialogTrigger asChild>
                <Button 
                  variant="outline" 
                  className="w-full flex items-center justify-center"
                >
                  View Guide <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="flex items-center">
                    <Brain className="h-5 w-5 mr-2" />
                    Learn About "Repair Attempts"
                  </DialogTitle>
                  <DialogDescription>
                    Discover this crucial skill for maintaining healthy relationships during conflict.
                  </DialogDescription>
                </DialogHeader>
                
                <div className="mt-4 space-y-4">
                  <div>
                    <h4 className="font-medium text-lg mb-2">What are "Repair Attempts"?</h4>
                    <p className="text-foreground/80">
                      Coined by relationship researcher Dr. John Gottman, repair attempts are any statement or action—silly or otherwise—that prevents 
                      negativity from escalating out of control during conflict. They're like the emergency brake system in relationships.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-medium text-lg mb-2">Examples of Repair Attempts</h4>
                    <ul className="space-y-2 text-foreground/80">
                      <li><span className="font-medium">• Using humor:</span> "Can we rewind this conversation? I think we got off track."</li>
                      <li><span className="font-medium">• Taking responsibility:</span> "I'm sorry, that came out wrong. Let me try again."</li>
                      <li><span className="font-medium">• Expressing appreciation:</span> "I know you're trying to help, and I appreciate that."</li>
                      <li><span className="font-medium">• Asking for clarification:</span> "I'm not sure I understand. Can you explain that differently?"</li>
                      <li><span className="font-medium">• Suggesting a break:</span> "I'm feeling overwhelmed. Can we take 20 minutes and come back to this?"</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium text-lg mb-2">Why Repair Attempts Matter</h4>
                    <p className="text-foreground/80">
                      According to Gottman's research, the success or failure of repair attempts is one of the primary factors that determine whether 
                      relationships succeed or fail. Happy couples aren't those who never argue—they're couples who effectively repair when conflicts arise.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-medium text-lg mb-2">How to Make and Receive Repair Attempts</h4>
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
                    onClick={() => setShowRepairAttemptsDialog(false)}
                  >
                    Close
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NextStepsSection;
