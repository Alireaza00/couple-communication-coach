
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { FileText, BarChart3 } from 'lucide-react';
import { SpeakerSegment, CommunicationMetrics } from './types';

interface DetailedAnalysisProps {
  transcriptSegments: SpeakerSegment[];
  communicationMetrics: CommunicationMetrics;
  isDemoTranscript: boolean;
}

const DetailedAnalysis: React.FC<DetailedAnalysisProps> = ({ 
  transcriptSegments, 
  communicationMetrics,
  isDemoTranscript
}) => {
  const [showFullTranscript, setShowFullTranscript] = useState(false);
  
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold mb-6">Detailed Analysis</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass rounded-xl p-6 shadow-sm">
          <div className="flex items-center mb-4">
            <FileText className="h-5 w-5 text-primary mr-2" />
            <h3 className="font-medium">Conversation Transcript {isDemoTranscript ? "(Demo)" : ""}</h3>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 max-h-[300px] overflow-y-auto">
            {transcriptSegments.length > 0 ? (
              <div className="space-y-4">
                {transcriptSegments.map((segment, idx) => (
                  <div key={idx}>
                    {segment.speaker && (
                      <div className="font-medium text-sm mb-1">{segment.speaker}:</div>
                    )}
                    <p className="text-sm text-foreground/80">
                      {segment.content}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-foreground/50">
                No transcript available
              </div>
            )}
          </div>
          {isDemoTranscript && (
            <div className="mt-2 text-xs text-amber-600 font-medium">
              Note: This is a simulated transcript, not your actual recording.
            </div>
          )}
          <div className="mt-4 flex justify-end">
            <Dialog open={showFullTranscript} onOpenChange={setShowFullTranscript}>
              <DialogTrigger asChild>
                <Button 
                  variant="outline" 
                  size="sm"
                >
                  View Full Transcript
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="flex items-center">
                    <FileText className="h-5 w-5 mr-2" />
                    Full Conversation Transcript
                  </DialogTitle>
                  <DialogDescription>
                    {isDemoTranscript 
                      ? "This is a simulated transcript for demonstration purposes." 
                      : "This is the full transcript of your recorded conversation."}
                  </DialogDescription>
                </DialogHeader>
                
                <div className="mt-4 bg-gray-50 rounded-lg p-6">
                  {transcriptSegments.length > 0 ? (
                    <div className="space-y-6">
                      {transcriptSegments.map((segment, idx) => (
                        <div key={idx}>
                          {segment.speaker && (
                            <div className="font-medium mb-1">{segment.speaker}:</div>
                          )}
                          <p className="text-foreground/80">
                            {segment.content}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center text-foreground/50 py-8">
                      No transcript available
                    </div>
                  )}
                </div>
                
                <div className="mt-4 flex justify-end">
                  <Button 
                    variant="outline" 
                    onClick={() => setShowFullTranscript(false)}
                  >
                    Close
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        
        <div className="glass rounded-xl p-6 shadow-sm">
          <div className="flex items-center mb-4">
            <BarChart3 className="h-5 w-5 text-primary mr-2" />
            <h3 className="font-medium">Communication Metrics</h3>
          </div>
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm">Speaking Time Balance</span>
                <span className="text-xs text-foreground/70">{communicationMetrics.speakingTimeBalance}</span>
              </div>
              <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full" style={{ width: communicationMetrics.speakingTimeBalance.split('/')[0].trim() }}></div>
              </div>
              <div className="flex justify-between mt-1">
                <span className="text-xs text-foreground/60">You</span>
                <span className="text-xs text-foreground/60">Partner</span>
              </div>
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm">Interruptions</span>
              </div>
              <div className="flex items-center">
                <div className="flex-1 h-6 bg-amber-100 rounded-l-md text-center text-xs flex items-center justify-center text-amber-700">
                  You: {communicationMetrics.interruptions.you}
                </div>
                <div className="flex-1 h-6 bg-blue-100 rounded-r-md text-center text-xs flex items-center justify-center text-blue-700">
                  Partner: {communicationMetrics.interruptions.partner}
                </div>
              </div>
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm">Emotion Expression</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {communicationMetrics.emotions.map((emotion, idx) => (
                  <div 
                    key={idx}
                    className={`bg-${emotion.color}-100 h-16 rounded-md flex flex-col items-center justify-center`}
                  >
                    <span className={`text-xs text-${emotion.color}-700 font-medium`}>{emotion.name}</span>
                    <span className={`text-lg font-semibold text-${emotion.color}-700`}>{emotion.percentage}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DetailedAnalysis;
