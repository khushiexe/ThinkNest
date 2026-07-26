import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY,
});

export const askGemini = async (prompt) => {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash", // <-- Updated model name here
    contents: prompt,
  });

  return response.text;
};