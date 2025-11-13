
export enum Platform {
  YouTube = 'YouTube',
  Instagram = 'Instagram',
  Facebook = 'Facebook',
  TikTok = 'TikTok',
  Twitch = 'Twitch',
  Kick = 'Kick',
}

export interface SocialAccount {
  id: string;
  platform: Platform;
  username: string;
  metric: string;
  embedUrl: string;
  // Fix: Add optional count and views properties to support dynamic stats.
  count?: number;
  views?: number;
}
