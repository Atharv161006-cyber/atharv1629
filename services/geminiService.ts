import { GoogleGenAI, Type } from "@google/genai";
import { Product, AIInsight } from "../types";

const API_KEY = process.env.API_KEY || process.env.GEMINI_API_KEY || "";
const ai = API_KEY ? new GoogleGenAI({ apiKey: API_KEY }) : null;

export const getProductInsight = async (product: Product): Promise<AIInsight> => {
  // Return fallback if no API key
  if (!ai) {
    return {
      reason: `${product.name} offers excellent value with premium features and reliable performance.`,
      bestFor: "Anyone looking for quality products at competitive prices."
    };
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Provide a quick expert insight for this product: ${product.name}. 
      Description: ${product.description}. 
      Price: ${product.price}.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            reason: { type: Type.STRING, description: "Why this product stands out." },
            bestFor: { type: Type.STRING, description: "Who is the ideal user for this product?" }
          },
          required: ["reason", "bestFor"]
        }
      }
    });

    return JSON.parse(response.text || "{}");
  } catch (error) {
    console.error("Gemini Error:", error);
    return {
      reason: `${product.name} combines quality craftsmanship with modern design.`,
      bestFor: "Customers seeking reliable products with great reviews."
    };
  }
};

export const getComparisonInsight = async (p1: Product, p2: Product): Promise<string> => {
  if (!ai) {
    return "AI comparison requires API key configuration.";
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Compare these two products briefly and tell me which is better for value vs performance: 
      1. ${p1.name} (${p1.price})
      2. ${p2.name} (${p2.price})
      Keep it to 3 concise bullet points.`,
      config: {
        temperature: 0.7,
      }
    });

    return response.text || "Unable to generate comparison at this time.";
  } catch (error) {
    return "Error fetching AI comparison.";
  }
};

export const searchByImage = async (base64Image: string): Promise<string> => {
  if (!ai) {
    return "";
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: "image/jpeg",
              data: base64Image.includes(",") ? base64Image.split(",")[1] : base64Image
            }
          },
          {
            text: "Identify the main product in this image. Return only the name of the product or a few descriptive keywords for searching in an e-commerce store. No other text."
          }
        ]
      }
    });

    return response.text?.trim() || "";
  } catch (error) {
    console.error("Visual Search Error:", error);
    return "";
  }
};
