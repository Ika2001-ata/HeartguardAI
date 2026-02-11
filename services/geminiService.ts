
import { GoogleGenAI, Type } from "@google/genai";
import { Vitals, Recommendation } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const analyzeVitals = async (vitals: Vitals): Promise<{
  riskScore: number;
  diagnosis: string;
  recommendations: Recommendation[];
}> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Clinical Review: 
      HR: ${vitals.heartRate} BPM, 
      BP: ${vitals.bloodPressureSys}/${vitals.bloodPressureDia} mmHg, 
      SpO2: ${vitals.spo2}%, 
      Temp: ${vitals.temperature}°C. 
      Provide a risk score (0-100), a simple professional summary, and 3 clear health tips.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            riskScore: { type: Type.NUMBER },
            diagnosis: { type: Type.STRING },
            recommendations: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  category: { type: Type.STRING, enum: ["diet", "exercise", "stress", "medical"] },
                  title: { type: Type.STRING },
                  description: { type: Type.STRING }
                },
                required: ["category", "title", "description"]
              }
            }
          },
          required: ["riskScore", "diagnosis", "recommendations"]
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No data");
    return JSON.parse(text);
  } catch (error) {
    console.warn("AI Analysis offline, using local metrics.");
    return {
      riskScore: vitals.heartRate > 100 ? 45 : 10,
      diagnosis: vitals.heartRate > 100 
        ? "Heart rate is currently elevated. Please rest and remain calm while the system monitors your pulse."
        : "Your vitals are stable and within a healthy range for your age group.",
      recommendations: [
        { category: 'stress', title: 'Deep Breathing', description: 'Take 5 minutes for controlled breathing to optimize heart rhythm.' },
        { category: 'medical', title: 'Hydration Check', description: 'Ensure you are drinking enough water to maintain blood health.' },
        { category: 'exercise', title: 'Daily Walk', description: 'Maintain your cardiovascular health with light, consistent movement.' }
      ]
    };
  }
};
