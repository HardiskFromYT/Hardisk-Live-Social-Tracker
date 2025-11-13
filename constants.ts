import { SocialAccount, Platform } from './types';

export const INITIAL_ACCOUNTS: SocialAccount[] = [
  { id: 'yt1', platform: Platform.YouTube, username: '@Hardisk', metric: 'Subscribers', embedUrl: 'https://livecounts.io/embed/youtube-live-subscriber-counter/UCA6rJQnIFgQOcjO-xtNV7lg?background_color=1e293b&stats_color=e2e8f0&title_color=e2e8f0' },
  { id: 'yt2', platform: Platform.YouTube, username: '@HardiskTV', metric: 'Subscribers', embedUrl: 'https://livecounts.io/embed/youtube-live-subscriber-counter/UCFqa4N0_WhVctqkqiHXm_QA?background_color=1e293b&stats_color=e2e8f0&title_color=e2e8f0' },
  { id: 'ig1', platform: Platform.Instagram, username: '@Hardisk', metric: 'Followers', embedUrl: 'https://livecounts.nl/instagram-realtime/embed/?u=hardisk&background=%231e293b&color=%23e2e8f0' },
  { id: 'fb1', platform: Platform.Facebook, username: 'Hardisk', metric: 'Likes', embedUrl: 'https://livecounts.nl/facebook-realtime/embed/?u=197710520303655&background=%231e293b&color=%23e2e8f0' },
  { id: 'fb2', platform: Platform.Facebook, username: 'HardiskTV', metric: 'Likes', embedUrl: 'https://livecounts.nl/facebook-realtime/embed/?u=702984372900796&background=%231e293b&color=%23e2e8f0' },
  { id: 'tt1', platform: Platform.TikTok, username: '@Hardisk', metric: 'Followers', embedUrl: 'https://livecounts.io/embed/tiktok-live-follower-counter/hardisk?theme=dark' },
  { id: 'tw1', platform: Platform.Twitch, username: 'Hardisk', metric: 'Followers', embedUrl: 'https://livecounts.io/embed/twitch-live-follower-counter/hardisk?theme=dark' },
  { id: 'kc1', platform: Platform.Kick, username: 'Hardisk', metric: 'Followers', embedUrl: 'https://livecounts.io/embed/kick-live-follower-counter/hardisk?theme=dark' },
];

export const PLATFORM_COLORS: { [key in Platform]: string } = {
  [Platform.YouTube]: 'border-red-500',
  [Platform.Instagram]: 'border-pink-500',
  [Platform.Facebook]: 'border-blue-600',
  [Platform.TikTok]: 'border-cyan-400',
  [Platform.Twitch]: 'border-purple-600',
  [Platform.Kick]: 'border-green-500',
};