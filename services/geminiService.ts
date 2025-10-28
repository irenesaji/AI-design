import { GoogleGenAI, Modality } from "@google/genai";

// Lazily initialize the client.
let ai: GoogleGenAI | null = null;

function getAiClient(): GoogleGenAI {
  if (!ai) {
    // This is the secure way to handle API keys.
    // It reads the key from the environment variables, which are set differently
    // for local development (in a .env file) and for deployment (in the hosting provider's dashboard).
    const apiKey = process.env.API_KEY;

    if (!apiKey) {
      throw new Error("API key is not configured. Please set the API_KEY environment variable.");
    }
    
    ai = new GoogleGenAI({ apiKey: apiKey });
  }
  return ai;
}

export async function generateDrawing(prompt: string): Promise<string> {
  try {
    const client = getAiClient();
    const response = await client.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
            parts: [{ text: prompt }],
        },
        config: {
            responseModalities: [Modality.IMAGE],
        },
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
        if (part.inlineData) {
            const base64ImageBytes: string = part.inlineData.data;
            const mimeType = part.inlineData.mimeType;
            return `data:${mimeType};base64,${base64ImageBytes}`;
        }
    }

    throw new Error("No image data found in the API response.");

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof Error) {
        if (error.message.includes("API_KEY_INVALID") || error.message.includes("API key not valid")) {
            throw new Error(`Gemini API Error: The provided API key is not valid. Please ensure it is correct.`);
        }
        throw new Error(`Gemini API Error: ${error.message}`);
    }
    throw new Error("An unknown error occurred while communicating with the Gemini API.");
  }
}
