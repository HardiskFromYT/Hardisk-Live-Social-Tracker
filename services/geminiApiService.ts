import { GoogleGenAI, Type } from '@google/genai';
import { SocialAccount, Platform } from '../types';

// This service uses the Gemini API to simulate realistic, live data updates for accounts
// that do not have a real-time embed source.

// Fix: Define an interface for the expected shape of the data from the Gemini API.
// This provides type safety for the parsed JSON response.
interface GeminiAccountUpdate {
    id: string;
    platform: Platform;
    username: string;
    metric: string;
    count: number;
    views: number;
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const responseSchema = {
    type: Type.ARRAY,
    description: "A list of social media accounts with updated stats.",
    items: {
        type: Type.OBJECT,
        properties: {
            id: { type: Type.STRING, description: "The unique ID of the account." },
            platform: { type: Type.STRING, description: "The social media platform." },
            username: { type: Type.STRING, description: "The account username." },
            metric: { type: Type.STRING, description: "The primary metric being tracked." },
            count: { type: Type.INTEGER, description: "The updated count for the primary metric." },
            views: { type: Type.INTEGER, description: "The updated total views. Only meaningful for YouTube. For others, return 0." },
        },
        required: ["id", "platform", "username", "metric", "count", "views"]
    }
};

export const fetchLiveStats = async (currentStats: SocialAccount[]): Promise<SocialAccount[]> => {
  // Filter out accounts that have an embed URL, as they update on their own.
  const accountsToUpdateWithGemini = currentStats.filter(acc => !acc.embedUrl);

  // If no accounts are left to update with Gemini, just return the original array.
  if (accountsToUpdateWithGemini.length === 0) {
    return currentStats;
  }
  
  const prompt = `
    You are a social media statistics simulator.
    Given the following JSON array of social media accounts, return a new JSON array with updated, realistic statistics.
    The subscriber/follower/like counts should fluctuate slightly, mostly trending upwards with small, believable increments.
    YouTube view counts should always increase by a realistic amount.
    Do not change the 'id', 'platform', 'username', or 'metric' fields.
    Only update the 'count' and, for YouTube accounts, the 'views' fields.
    For non-YouTube accounts, the 'views' field in the response should be 0.
    
    Current stats:
    ${JSON.stringify(accountsToUpdateWithGemini)}
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
      },
    });

    const jsonText = response.text.trim();
    // Fix: Cast the parsed JSON to an array of the defined interface to ensure type safety.
    const geminiUpdatedStats = JSON.parse(jsonText) as GeminiAccountUpdate[];
    
    // Create a map of updates for quick lookup
    const updatesMap = new Map(geminiUpdatedStats.map((acc: GeminiAccountUpdate) => [acc.id, acc]));

    // Map over the original full list of accounts to merge the updates
    return currentStats.map(originalAccount => {
      // If the account is in our update map, return the updated version
      if (updatesMap.has(originalAccount.id)) {
        const updatedData = updatesMap.get(originalAccount.id);

        // This check is for TypeScript's benefit, as .get() can return undefined.
        if (!updatedData) {
          return originalAccount;
        }
        
        if (updatedData.platform === Platform.YouTube) {
          return {
            ...originalAccount,
            count: updatedData.count,
            views: updatedData.views,
          };
        }
        return {
          ...originalAccount,
          count: updatedData.count,
        };
      }
      // Otherwise, return the original account (e.g., the one with the embed)
      return originalAccount;
    });

  } catch (error) {
    console.error("Error fetching stats from Gemini API:", error);
    // In case of an error, return the old stats to prevent the UI from breaking.
    return currentStats;
  }
};
