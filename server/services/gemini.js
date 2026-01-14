import { GoogleGenAI } from "@google/genai";

export const ai = new GoogleGenAI(process.env.GEMINI_API_KEY);
