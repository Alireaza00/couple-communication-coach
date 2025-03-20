
export interface DateNightIdea {
  id: string;
  title: string;
  description: string;
}

export interface OpenRouterMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface OpenRouterResponse {
  choices: {
    message: {
      content: string;
      role: string;
    };
    finish_reason: string;
    index: number;
  }[];
  created: number;
  id: string;
  model: string;
  object: string;
}

export interface AIResponse {
  text: string;
  model: string;
}

export interface ConversationStarter {
  id: string;
  question: string;
  category: 'fun' | 'deep' | 'relationship' | 'future' | 'past';
  difficulty: 'easy' | 'medium' | 'deep';
}

export interface CheckIn {
  id: string;
  date: string;
  mood: number;
  highlight: string;
  challenge: string;
  gratitude: string;
  needsSupport: boolean;
  supportDetails?: string;
  userId: string;
}
