
// FIX: Removed import for non-existent YouTubeAccount type.
import { SocialAccount, Platform } from '../types';

export const fetchLiveStats = async (currentStats: SocialAccount[]): Promise<SocialAccount[]> => {
  return new Promise(resolve => {
    // Simulate network delay
    setTimeout(() => {
      const newStats = currentStats.map(account => {
        // Fluctuate the main count (subscribers/followers/likes)
        const countFluctuation = Math.floor(Math.random() * 20) - 5; // Can be negative, but mostly positive
        // FIX: The 'count' property now exists on the SocialAccount type.
        // Fix: Default account.count to 0 to prevent NaN if it's undefined.
        const newCount = Math.max(0, (account.count || 0) + countFluctuation);

        // If it's a YouTube account, also fluctuate the views
        if (account.platform === Platform.YouTube) {
          // FIX: Removed cast to non-existent YouTubeAccount and use optional chaining on views.
          const viewFluctuation = Math.floor(Math.random() * 1000) + 100; // Views always go up
          const newViews = (account.views || 0) + viewFluctuation;
          return { ...account, count: newCount, views: newViews };
        }

        return { ...account, count: newCount };
      });
      resolve(newStats);
    }, 800);
  });
};
