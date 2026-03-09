import { GoogleGenAI, Type } from "@google/genai";

async function generateProducts() {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });
  
  const prompt = `Generate 100 realistic ecommerce products in JSON format for the Indian market.
  Categories: Electronics, Men's Fashion, Women's Fashion, Footwear, Groceries, Home & Kitchen, Beauty, Sports, Books.
  
  Each product must include:
  - name: string
  - price: number (in INR, reasonable for India)
  - category: string (one of the above)
  - brand: string (realistic, non-copyrighted)
  - stock: number
  - rating: number (3.5 to 5.0)
  - numReviews: number
  - description: string (2-3 lines)
  - imagePrompt: string (detailed AI image prompt, white background, studio lighting, ecommerce style)

  Return ONLY a JSON array of objects. No other text.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING },
              price: { type: Type.NUMBER },
              category: { type: Type.STRING },
              brand: { type: Type.STRING },
              stock: { type: Type.NUMBER },
              rating: { type: Type.NUMBER },
              numReviews: { type: Type.NUMBER },
              description: { type: Type.STRING },
              imagePrompt: { type: Type.STRING }
            },
            required: ["name", "price", "category", "brand", "stock", "rating", "numReviews", "description", "imagePrompt"]
          }
        }
      }
    });

    console.log(response.text);
  } catch (error) {
    console.error("Error generating products:", error);
  }
}

generateProducts();
