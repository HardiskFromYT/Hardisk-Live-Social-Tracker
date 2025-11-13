import React from 'react';
import { SocialAccount } from '../types';
import { PLATFORM_COLORS } from '../constants';
import PlatformIcon from './PlatformIcon';

interface SocialCardProps {
  account: SocialAccount;
}

const SocialCard: React.FC<SocialCardProps> = ({ account }) => {
  const brandColor = PLATFORM_COLORS[account.platform];

  return (
    <div className={`bg-slate-800 rounded-xl shadow-lg overflow-hidden border-t-4 ${brandColor} transition-transform duration-300 hover:scale-105 hover:shadow-2xl`}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <PlatformIcon platform={account.platform} className="w-8 h-8 text-slate-300" />
            <span className="font-semibold text-lg text-slate-200">{account.platform}</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            <span className="text-sm text-green-400 font-medium">Live</span>
          </div>
        </div>

        <div className="text-center mb-6">
          <p className="text-xl font-medium text-slate-300">{account.username}</p>
        </div>
        
        <div className="flex justify-center items-center min-h-[80px]">
          <iframe
            src={account.embedUrl}
            height="80px"
            width="300px"
            frameBorder="0"
            scrolling="no"
            style={{ border: 0, width: '300px', height: '80px', borderRadius: '8px' }}
            title={`${account.platform} live count for ${account.username}`}
            aria-label={`${account.platform} live count for ${account.username}`}
          />
        </div>
      </div>
    </div>
  );
};

export default SocialCard;