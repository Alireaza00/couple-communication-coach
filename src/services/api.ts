
import { DateNightIdea, OpenRouterMessage, AIResponse } from "@/types";

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
