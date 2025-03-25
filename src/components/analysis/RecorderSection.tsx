
import React from "react";
import { BarChart3 } from "lucide-react";
import AudioRecorder from "@/components/audio-recorder/AudioRecorder";
import CommunicationChart from "@/components/CommunicationChart";

interface AnalysisData {
  transcript: string;
  analysis: string;
}

interface RecorderSectionProps {
  onAnalysisComplete: (data: AnalysisData) => void;
  analysisData: AnalysisData | null;
  communicationData: Array<{
    name: string;
    value: number;
    color: string;
  }>;
}

const RecorderSection = ({
  onAnalysisComplete,
  analysisData,
  communicationData,
}: RecorderSectionProps) => {
  return (
    <section className="mb-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <AudioRecorder onTranscriptAnalyzed={onAnalysisComplete} />
        </div>
        
        <div className="lg:col-span-2 glass rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="h-5 w-5 text-primary" />
            <h3 className="font-medium">Communication Score Overview</h3>
          </div>
          <p className="text-sm text-foreground/70 mb-6">
            Based on your last conversation {analysisData ? '' : '(May 12, 2023 • 15 minutes)'}
          </p>
          
          <CommunicationChart data={communicationData} />
          
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Overall Communication Quality</span>
                <span className="text-sm font-semibold">72%</span>
              </div>
              <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full" style={{ width: "72%" }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Improvement Since Last Month</span>
                <span className="text-sm font-semibold text-green-500">+8%</span>
              </div>
              <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 rounded-full" style={{ width: "8%" }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecorderSection;
