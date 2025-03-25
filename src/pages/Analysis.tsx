
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TranscriptAnalyzer from "@/components/TranscriptAnalyzer";
import AnalysisHeader from "@/components/analysis/AnalysisHeader";
import RecorderSection from "@/components/analysis/RecorderSection";
import NextStepsSection from "@/components/analysis/NextStepsSection";

interface AnalysisData {
  transcript: string;
  analysis: string;
}

const Analysis = () => {
  const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null);
  
  const handleAnalysisComplete = (data: AnalysisData) => {
    setAnalysisData(data);
    // Scroll to results
    setTimeout(() => {
      document.getElementById('analysis-results')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };
  
  const communicationData = [
    { name: 'Active Listening', value: 82, color: '#3B82F6' },
    { name: 'Empathy', value: 75, color: '#10B981' },
    { name: 'Clear Expression', value: 68, color: '#F59E0B' },
    { name: 'Nonverbal Cues', value: 55, color: '#8B5CF6' },
    { name: 'Conflict Resolution', value: 60, color: '#EC4899' },
  ];
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-[100px] pb-20">
        <div className="container-tight">
          {/* Header Section */}
          <AnalysisHeader />
          
          {/* Recorder Section */}
          <RecorderSection 
            onAnalysisComplete={handleAnalysisComplete} 
            analysisData={analysisData}
            communicationData={communicationData}
          />
          
          {/* Analysis Results Section */}
          <div id="analysis-results">
            {analysisData && (
              <TranscriptAnalyzer 
                transcript={analysisData.transcript} 
                analysisResult={analysisData.analysis} 
              />
            )}
            
            {/* Next Steps Section - Always shown */}
            <NextStepsSection />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Analysis;
