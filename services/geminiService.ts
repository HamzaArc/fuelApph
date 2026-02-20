
import { GoogleGenAI, Type } from "@google/genai";

export async function extractFuelPriceFromImage(base64Image: string) {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        {
          inlineData: {
            mimeType: 'image/jpeg',
            data: base64Image
          }
        },
        {
          text: "Extract the fuel prices and fuel types from this gas station pump or receipt. Look for price per liter in MAD/DH. Return JSON with 'price' and 'fuelType'."
        }
      ],
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            price: { type: Type.NUMBER, description: "The price per liter extracted" },
            fuelType: { type: Type.STRING, description: "The type of fuel identified" }
          },
          required: ["price", "fuelType"]
        }
      }
    });

    const text = response.text;
    if (text) {
      return JSON.parse(text);
    }
  } catch (error) {
    console.error("Gemini OCR failed:", error);
    return null;
  }
}

export async function processVoiceReport(prompt: string) {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Parse this voice input into fuel price data for Morocco: "${prompt}". Return JSON with keys: price, fuelType, stationName.`
  });
  return response.text;
}
