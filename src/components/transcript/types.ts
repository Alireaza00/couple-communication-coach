
export interface Insight {
  title: string;
  description: string;
  type: 'strength' | 'improvement';
  icon: any; // Will be more specific when importing from lucide-react
  suggestion: string;
}

export interface CommunicationMetrics {
  speakingTimeBalance: string;
  interruptions: { you: number; partner: number };
  emotions: { name: string; percentage: string; color: string }[];
}

export interface SpeakerSegment {
  speaker?: string;
  content: string;
}

export interface TranscriptAnalyzerProps {
  transcript?: string;
  analysisResult?: string;
}
