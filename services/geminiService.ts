
import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);

export async function extractFuelPriceFromImage(base64Image: string) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent([
      {
        inlineData: {
          mimeType: "image/jpeg",
          data: base64Image
        }
      },
      {
        text: `You are an expert fuel price analyst in Morocco. 
        Analyze this image of a gas station price tower or pump display.
        Extract the price per liter for the fuel types shown.
        Focus on values typically ranging from 10.00 to 18.00 MAD.
        Return ONLY a JSON object with:
        - "price": number (the detected price per liter)
        - "fuelType": string (one of: "Diesel", "Sans Plomb", "Premium")
        
        Example: {"price": 13.45, "fuelType": "Diesel"}
        If multiple are shown, prioritize the most prominent or standard Diesel.`
      }
    ]);

    const response = await result.response;
    const text = response.text();
    const jsonStr = text.match(/\{.*\}/s)?.[0];
    if (jsonStr) {
      return JSON.parse(jsonStr);
    }
  } catch (error) {
    console.error("Gemini OCR failed:", error);
    return null;
  }
}

export async function processVoiceReport(prompt: string) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(`Parse this voice input into fuel price data for Morocco: "${prompt}". Return JSON with keys: price (number), fuelType (one of: Diesel, Sans Plomb, Premium), stationName.`);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Gemini Voice processing failed:", error);
    return null;
  }
}
