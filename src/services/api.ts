
import { DateNightIdea, OpenRouterMessage, AIResponse, ConversationStarter } from "@/types";

// Placeholder function for fetching date nights
export const getDateNights = async (userId?: string, date?: Date) => {
  // Mock implementation until we connect to a real backend
  console.log("Fetching date nights for user:", userId, "on date:", date);
  return [];
};

// Placeholder function for saving date night
export const saveDateNight = async (dateNight: any) => {
  // Mock implementation until we connect to a real backend
  console.log("Saving date night:", dateNight);
  return null;
};

// Placeholder function for deleting date night
export const deleteDateNight = async (params: any) => {
  // Mock implementation until we connect to a real backend
  console.log("Deleting date night:", params);
  return null;
};

// Generate date night ideas using AI
export const generateDateNightIdeas = async (): Promise<DateNightIdea[]> => {
  try {
    const response = await callOpenRouter([
      { role: "system", content: "You are a helpful relationship assistant that generates creative date night ideas for couples." },
      { role: "user", content: "Generate 3 unique and interesting date night ideas. For each, provide a title and description." }
    ]);

    // Parse the AI response to extract date night ideas
    const text = response.text;
    const ideas: DateNightIdea[] = [];
    
    // Simple parser for the expected format
    const ideaRegex = /(\d+\.\s*)?([^\n]+)\n([^]*?)(?=\n\d+\.|$)/g;
    let match;
    let counter = 0;
    
    while ((match = ideaRegex.exec(text)) !== null && counter < 10) {
      const title = match[2].trim();
      const description = match[3].trim();
      
      if (title && description) {
        ideas.push({
          id: String(Date.now() + counter),
          title,
          description
        });
        counter++;
      }
    }
    
    // If parsing failed, create a fallback idea
    if (ideas.length === 0) {
      ideas.push({
        id: String(Date.now()),
        title: "Romantic Dinner at Home",
        description: "Cook a special meal together at home. Set the mood with candles and music."
      });
    }
    
    return ideas;
  } catch (error) {
    console.error("Error generating date night ideas:", error);
    // Return fallback ideas if API call fails
    return [
      {
        id: String(Date.now()),
        title: "Picnic in the Park",
        description: "Pack a basket with your favorite foods and drinks. Find a quiet spot in a local park and enjoy each other's company."
      },
      {
        id: String(Date.now() + 1),
        title: "Movie Marathon Night",
        description: "Pick a theme or series and watch multiple movies back-to-back. Prepare snacks and cozy blankets."
      },
      {
        id: String(Date.now() + 2),
        title: "Stargazing Adventure",
        description: "Drive to a spot away from city lights. Bring blankets and hot chocolate, lie back and enjoy the night sky together."
      }
    ];
  }
};

// Function to transcribe audio using Galadia API
export const transcribeAudio = async (audioBlob: Blob): Promise<string> => {
  try {
    const apiKey = '93a3db91-f8d6-4bc9-9cac-92fbe76c50e1'; // Updated API key
    const formData = new FormData();
    formData.append('file', audioBlob, 'audio.wav');
    
    console.log('Sending audio to Galadia API...');
    
    const response = await fetch('https://api.gladia.io/v2/transcription', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`
      },
      body: formData
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Galadia API response:', response.status, errorText);
      throw new Error(`Galadia API error: ${response.status} - ${errorText || 'Unknown error'}`);
    }
    
    const data = await response.json();
    console.log('Galadia API response data:', data);
    
    // Handle different response formats
    if (data.text) {
      return data.text;
    } else if (data.result?.transcription) {
      return data.result.transcription;
    } else if (data.transcription) {
      return data.transcription;
    } else {
      console.error('Unexpected Galadia API response format:', data);
      throw new Error('Unexpected response format from Galadia API');
    }
  } catch (error) {
    console.error('Error transcribing audio:', error);
    throw error;
  }
};

// Generic function to analyze communication using AI
export const analyzeCommunication = async (transcript: string): Promise<AIResponse> => {
  return callOpenRouter([
    { role: "system", content: "You are a relationship communication expert. Analyze the provided conversation transcript between partners and provide insights on their communication patterns, strengths, and areas for improvement." },
    { role: "user", content: `Please analyze this conversation between partners:\n\n${transcript}` }
  ]);
};

// Generate personalized relationship exercises using AI
export const generateExercises = async (issues: string[]): Promise<AIResponse> => {
  const issuesText = issues.join(", ");
  return callOpenRouter([
    { role: "system", content: "You are a relationship therapist specialized in creating exercises to improve communication and connection between partners." },
    { role: "user", content: `Generate 3 personalized exercises to help a couple work on these issues: ${issuesText}` }
  ]);
};

// Core function to call OpenRouter API
export const callOpenRouter = async (messages: OpenRouterMessage[]): Promise<AIResponse> => {
  try {
    // Get the API key from local storage
    const apiKey = localStorage.getItem('openrouter_api_key');
    
    if (!apiKey) {
      throw new Error("OpenRouter API key not found. Please add it in the AI Settings.");
    }
    
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'HTTP-Referer': window.location.origin,
        'X-Title': 'Relationship Communication Coach'
      },
      body: JSON.stringify({
        model: 'openai/gpt-3.5-turbo',  // Default model, can be changed
        messages: messages,
        temperature: 0.7,
        max_tokens: 1000
      })
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`OpenRouter API error: ${errorData.error?.message || 'Unknown error'}`);
    }
    
    const data = await response.json();
    
    return {
      text: data.choices[0].message.content,
      model: data.model
    };
  } catch (error) {
    console.error("Error calling OpenRouter:", error);
    return {
      text: "I'm sorry, I couldn't process your request. Please check your API key and try again.",
      model: "error"
    };
  }
};

// Function to get conversation starters
export const getConversationStarters = async (): Promise<ConversationStarter[]> => {
  // This would eventually fetch from an API or database
  // For now, we'll return a static list
  return [
    {
      id: "1",
      question: "What's one small thing I do that makes you happy?",
      category: "relationship",
      difficulty: "easy"
    },
    {
      id: "2",
      question: "If we could travel anywhere tomorrow, where would you want to go and why?",
      category: "fun",
      difficulty: "easy"
    },
    {
      id: "3",
      question: "What's something you're afraid to tell me?",
      category: "deep",
      difficulty: "deep"
    },
    {
      id: "4",
      question: "What's your favorite memory of us together?",
      category: "relationship",
      difficulty: "easy"
    },
    {
      id: "5",
      question: "If you could change one decision from your past, what would it be?",
      category: "past",
      difficulty: "medium"
    },
    {
      id: "6",
      question: "What's something you want to accomplish in the next five years?",
      category: "future",
      difficulty: "medium"
    },
    {
      id: "7",
      question: "What makes you feel most loved in our relationship?",
      category: "relationship",
      difficulty: "medium"
    },
    {
      id: "8",
      question: "What's one way we could improve our communication?",
      category: "relationship",
      difficulty: "medium"
    },
    {
      id: "9",
      question: "What hobby or activity have you always wanted to try together?",
      category: "fun",
      difficulty: "easy"
    },
    {
      id: "10",
      question: "What's the most meaningful gift you've ever received?",
      category: "past",
      difficulty: "medium"
    },
    {
      id: "11",
      question: "How do you envision our relationship in 10 years?",
      category: "future",
      difficulty: "deep"
    },
    {
      id: "12",
      question: "What's something about yourself that you're working on improving?",
      category: "deep",
      difficulty: "medium"
    },
    {
      id: "13",
      question: "What's a boundary you need that you haven't clearly expressed?",
      category: "relationship",
      difficulty: "deep"
    },
    {
      id: "14",
      question: "What's your favorite way to spend a weekend together?",
      category: "fun",
      difficulty: "easy"
    },
    {
      id: "15",
      question: "What's one thing your parents did that you want to do differently in our relationship?",
      category: "past",
      difficulty: "deep"
    },
    {
      id: "16",
      question: "If you could have dinner with anyone, living or dead, who would it be and why?",
      category: "fun",
      difficulty: "medium"
    },
    {
      id: "17",
      question: "What's something I do that annoys you but you've never mentioned?",
      category: "relationship",
      difficulty: "deep"
    },
    {
      id: "18",
      question: "What three words would you use to describe our relationship?",
      category: "relationship",
      difficulty: "medium"
    },
    {
      id: "19",
      question: "What's your love language and how can I better speak it?",
      category: "relationship",
      difficulty: "medium"
    },
    {
      id: "20",
      question: "What's a dream you've given up on that you wish you hadn't?",
      category: "deep",
      difficulty: "deep"
    }
  ];
};

// Function to generate AI-powered conversation starters
export const generateConversationStarters = async (category?: string): Promise<ConversationStarter[]> => {
  try {
    const categoryPrompt = category ? `focused on the topic of ${category}` : "on various topics";
    
    const response = await callOpenRouter([
      { 
        role: "system", 
        content: "You are a relationship coach specializing in creating conversation starters that help couples connect more deeply." 
      },
      { 
        role: "user", 
        content: `Generate 5 thoughtful conversation starter questions ${categoryPrompt}. Make them unique and engaging.` 
      }
    ]);

    // Parse the AI response to extract conversation starters
    const text = response.text;
    const starters: ConversationStarter[] = [];
    
    // Simple parser for the expected format
    const starterRegex = /(\d+\.\s*)?([^\n]+)/g;
    let match;
    let counter = 0;
    
    while ((match = starterRegex.exec(text)) !== null && counter < 10) {
      const question = match[2].trim().replace(/^["']|["']$/g, '');
      
      if (question) {
        // Assign a random category and difficulty for AI-generated starters
        const categories: ConversationStarter['category'][] = ['fun', 'deep', 'relationship', 'future', 'past'];
        const difficulties: ConversationStarter['difficulty'][] = ['easy', 'medium', 'deep'];
        
        starters.push({
          id: `ai-${Date.now()}-${counter}`,
          question,
          category: category as ConversationStarter['category'] || categories[Math.floor(Math.random() * categories.length)],
          difficulty: difficulties[Math.floor(Math.random() * difficulties.length)]
        });
        counter++;
      }
    }
    
    // If parsing failed, create a fallback starter
    if (starters.length === 0) {
      starters.push({
        id: `ai-${Date.now()}`,
        question: "What is something new you'd like us to experience together?",
        category: 'relationship',
        difficulty: 'medium'
      });
    }
    
    return starters;
  } catch (error) {
    console.error("Error generating conversation starters:", error);
    // Return fallback starters if API call fails
    return [
      {
        id: `ai-${Date.now()}-1`,
        question: "What has been your favorite memory with me so far?",
        category: 'relationship',
        difficulty: 'easy'
      },
      {
        id: `ai-${Date.now()}-2`,
        question: "What's something you've always wanted to ask me but haven't?",
        category: 'deep',
        difficulty: 'medium'
      },
      {
        id: `ai-${Date.now()}-3`,
        question: "How would you describe our relationship to someone who doesn't know us?",
        category: 'relationship',
        difficulty: 'medium'
      }
    ];
  }
};
