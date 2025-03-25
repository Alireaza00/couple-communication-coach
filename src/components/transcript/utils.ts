
import { SpeakerSegment, CommunicationMetrics } from './types';

// Function to split transcript into speaker segments
export const getSpeakerSegments = (text: string): SpeakerSegment[] => {
  if (!text) return [];
  
  const segments: SpeakerSegment[] = [];
  const lines = text.split('\n');
  
  lines.forEach(line => {
    const trimmedLine = line.trim();
    if (!trimmedLine) return;
    
    const speakerMatch = trimmedLine.match(/^([^:]+):/);
    if (speakerMatch) {
      const speaker = speakerMatch[1].trim();
      const content = trimmedLine.substring(speakerMatch[0].length).trim();
      segments.push({ speaker, content });
    } else {
      segments.push({ content: trimmedLine });
    }
  });
  
  return segments;
};

// Format the transcript for display
export const formatTranscript = (text: string | undefined): string => {
  if (!text) return "";
  
  // If the transcript is a JSON string, parse it and extract the transcriptions
  if (text.startsWith('[') && text.includes('transcription')) {
    try {
      const jsonData = JSON.parse(text);
      return jsonData
        .filter((item: any) => item && item.transcription)
        .map((item: any) => item.transcription)
        .join(' ');
    } catch (e) {
      console.error('Error parsing JSON transcript:', e);
    }
  }
  
  return text;
};

// Analyze transcript to generate metrics
export const analyzeTranscriptForMetrics = (transcript: string | undefined, isDemoTranscript: boolean): CommunicationMetrics => {
  if (!transcript || isDemoTranscript) {
    // Return default demo metrics
    return {
      speakingTimeBalance: "60% / 40%",
      interruptions: { you: 8, partner: 3 },
      emotions: [
        { name: "Frustration", percentage: "45%", color: "blue" },
        { name: "Empathy", percentage: "30%", color: "green" },
        { name: "Neutral", percentage: "25%", color: "purple" }
      ]
    };
  }

  // Analyze real transcript
  // Here we could implement more sophisticated analysis
  // For now, we'll generate some random but plausible metrics
  
  // Count speaker turns to estimate speaking time
  const speakerTurns = getSpeakerSegments(formatTranscript(transcript));
  const speakerCounts: Record<string, number> = {};
  
  speakerTurns.forEach(segment => {
    if (segment.speaker) {
      if (!speakerCounts[segment.speaker]) {
        speakerCounts[segment.speaker] = 0;
      }
      speakerCounts[segment.speaker] += segment.content.length;
    }
  });
  
  // Calculate speaking time balance
  let speakingTimeBalance = "50% / 50%";
  const speakers = Object.keys(speakerCounts);
  if (speakers.length >= 2) {
    const total = Object.values(speakerCounts).reduce((sum, count) => sum + count, 0);
    const firstSpeakerPercentage = Math.round((speakerCounts[speakers[0]] / total) * 100);
    speakingTimeBalance = `${firstSpeakerPercentage}% / ${100 - firstSpeakerPercentage}%`;
  }
  
  // For other metrics, we'll use slightly randomized values
  // In a real implementation, these would be calculated based on the transcript
  return {
    speakingTimeBalance,
    interruptions: { 
      you: Math.floor(Math.random() * 5) + 2, 
      partner: Math.floor(Math.random() * 3) + 1 
    },
    emotions: [
      { 
        name: "Neutral", 
        percentage: `${40 + Math.floor(Math.random() * 20)}%`, 
        color: "blue" 
      },
      { 
        name: "Positive", 
        percentage: `${20 + Math.floor(Math.random() * 15)}%`, 
        color: "green" 
      },
      { 
        name: "Negative", 
        percentage: `${10 + Math.floor(Math.random() * 15)}%`, 
        color: "purple" 
      }
    ]
  };
};

// Default insights for demo purposes
export const defaultInsights = [
  {
    title: "Interruptions detected",
    description: "You interrupted your partner 8 times during the conversation. This may make them feel unheard or devalued.",
    type: "improvement",
    icon: null, // Will be set in the component
    suggestion: "Try to notice when you feel the urge to interrupt. Take a breath and wait until your partner has finished their thought before responding.",
  },
  {
    title: "Strong active listening",
    description: "You asked clarifying questions and paraphrased your partner's points, showing that you were truly listening.",
    type: "strength",
    icon: null, // Will be set in the component
    suggestion: "Continue this excellent habit. Your partner feels valued when you demonstrate that you're absorbing what they say.",
  },
  {
    title: "Defensive responses",
    description: "When receiving feedback, you responded defensively 5 times by immediately justifying your actions.",
    type: "improvement",
    icon: null, // Will be set in the component
    suggestion: "Try acknowledging your partner's perspective first before explaining your side. This validates their feelings even if you disagree.",
  },
  {
    title: "Positive affirmations",
    description: "You expressed appreciation and gratitude multiple times during the conversation.",
    type: "strength",
    icon: null, // Will be set in the component
    suggestion: "This is excellent relationship-building behavior. Continue to notice and verbalize the things you appreciate about your partner.",
  },
];

// Parse insights from the AI analysis
export const parseInsights = (text: string | undefined, defaultInsights: any[]): any[] => {
  if (!text) return defaultInsights;
  
  // In a real app, you would parse the AI response more intelligently
  // For now, we'll use default insights if AI analysis is provided
  if (text.length > 0) {
    return defaultInsights;
  }
  
  return defaultInsights;
};
