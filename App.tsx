import React, { useState } from 'react';
import SocialCard from './components/SocialCard';
import { INITIAL_ACCOUNTS } from './constants';
import type { SocialAccount } from './types';

const App: React.FC = () => {
  const [accounts] = useState<SocialAccount[]>(INITIAL_ACCOUNTS);

  return (
    <div className="min-h-screen bg-slate-900 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-10">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-300 via-blue-500 to-purple-600">
            Live Social Stats Dashboard
          </h1>
          <p className="mt-4 text-lg text-slate-400">
            Real-time tracking of your social media engagement using live data embeds.
          </p>
        </header>

        <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {accounts.map(account => (
            <SocialCard key={account.id} account={account} />
          ))}
        </main>
      </div>
    </div>
  );
};

export default App;