import React, { useState } from 'react';
import { FaSearch, FaFilter, FaUserSecret, FaDollarSign, FaBalanceScale } from 'react-icons/fa';

// Sample fugitive data (replace with real API data later)
interface Fugitive {
  id: number;
  name: string;
  aliases: string;
  reward: string;
  charges: string;
  imageUrl: string;
  caution: string;
}

const fugitivesData: Fugitive[] = [
  {
    id: 1,
    name: 'JAMAL SAEED ABDUL RAHIM',
    aliases: 'J.D., "Ghost"',
    reward: '$100,000',
    charges: 'Terrorism, Most Wanted Terrorists',
    imageUrl: 'https://www.fbi.gov/wanted/wanted_terrorists/jamal-saeed-abdul-rahim/@@images/image/high',
    caution: 'Considered armed and dangerous',
  },
  {
    id: 2,
    name: 'WILLIAM WILLINGHAM',
    aliases: 'La Reina, "death"',
    reward: '$50,000',
    charges: 'Crimes Against Children',
    imageUrl: 'https://www.fbi.gov/wanted/cac/william-willingham/@@images/image/mini',
    caution: 'Extreme caution: known to use multiple identities',
  },
  {
    id: 3,
    name: 'JOE MATTHEW CONSTANCE',
    aliases: 'Vic, "El Loco"',
    reward: '$75,000',
    charges: 'Violent Crimes - Murders',
    imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=500&fit=crop',
    caution: 'Armed and extremely dangerous',
  },
  {
    id: 4,
    name: 'SHAARE TEFILA SYNAGOGUE VANDALISM',
    aliases: 'Bolek, "The Ghost"',
    reward: '$200,000',
    charges: 'Seeking Information',
    imageUrl: 'https://www.fbi.gov/wanted/seeking-info/shaare-tefila-synagogue-vandalism/@@images/image/mini',
    caution: 'Foreign intelligence ties – do not approach',
  },
  {
    id: 5,
    name: 'JESSON QUINTERO',
    aliases: 'Elena, "La Jefa"',
    reward: '$125,000',
    charges: 'Additional Violent Crimes',
    imageUrl: 'https://www.fbi.gov/wanted/additional/jesson-quintero/@@images/image/mini',
    caution: 'Known to be protected by armed cartel members',
  },
  {
    id: 6,
    name: 'LEOBARDO PENA GUTIERREZ',
    aliases: 'Dima, "The Wolf"',
    reward: '$500,000',
    charges: 'Criminal Enterprise Investigations',
    imageUrl: 'https://www.fbi.gov/wanted/cei/leobardo-pena-gutierrez/@@images/image/high',
    caution: 'Highly skilled hacker; uses encrypted communications',
  },
];

const Mostwanted: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterReward, setFilterReward] = useState('all');

  const filteredFugitives = fugitivesData.filter((fugitive) => {
    const matchesSearch = fugitive.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          fugitive.aliases.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          fugitive.charges.toLowerCase().includes(searchTerm.toLowerCase());
    if (!matchesSearch) return false;

    if (filterReward === 'high') {
      const rewardAmount = parseInt(fugitive.reward.replace(/[^0-9]/g, ''));
      return rewardAmount >= 100000;
    } else if (filterReward === 'medium') {
      const rewardAmount = parseInt(fugitive.reward.replace(/[^0-9]/g, ''));
      return rewardAmount >= 50000 && rewardAmount < 100000;
    } else if (filterReward === 'low') {
      const rewardAmount = parseInt(fugitive.reward.replace(/[^0-9]/g, ''));
      return rewardAmount < 50000;
    }
    return true;
  });

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero banner */}
      <div className="bg-[#0B3B60] text-white py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 flex items-center justify-center gap-3">
            <FaUserSecret className="text-[#FFD700]" />
            FBI Most Wanted
          </h1>
          <p className="text-lg text-gray-200 max-w-2xl mx-auto">
            Help the FBI locate and capture these dangerous fugitives. 
            If you have any information, do not approach – call 1-800-CALL-FBI immediately.
          </p>
        </div>
      </div>

      {/* Search and filter bar */}
      <div className="sticky top-0 z-10 bg-white shadow-md py-4 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="relative w-full md:w-96">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, alias, or charge..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B22234]"
            />
          </div>
          <div className="flex items-center gap-3">
            <FaFilter className="text-gray-500" />
            <select
              value={filterReward}
              onChange={(e) => setFilterReward(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#B22234]"
            >
              <option value="all">All Rewards</option>
              <option value="high">High Reward ($100k+)</option>
              <option value="medium">Medium Reward ($50k - $99k)</option>
              <option value="low">Low Reward (below $50k)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Fugitive grid */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {filteredFugitives.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">No fugitives match your search criteria.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredFugitives.map((fugitive) => (
              <div
                key={fugitive.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={fugitive.imageUrl}
                    alt={fugitive.name}
                    className="w-full h-full object-cover object-top transition-transform duration-500 hover:scale-110"
                  />
                  <div className="absolute top-3 right-3 bg-[#B22234] text-white text-xs font-bold px-2 py-1 rounded-full">
                    WANTED
                  </div>
                </div>
                <div className="p-5">
                  <h2 className="text-xl font-bold text-[#0B3B60] mb-1">{fugitive.name}</h2>
                  <p className="text-sm text-gray-500 mb-3">AKA: {fugitive.aliases}</p>
                  <div className="flex items-center gap-2 mb-2">
                    <FaDollarSign className="text-[#FFD700]" />
                    <span className="font-semibold text-green-700">{fugitive.reward} REWARD</span>
                  </div>
                  <div className="flex items-start gap-2 mb-3">
                    <FaBalanceScale className="text-gray-500 mt-0.5" />
                    <p className="text-sm text-gray-700">{fugitive.charges}</p>
                  </div>
                  <div className="bg-red-50 border-l-4 border-[#B22234] p-2 mb-4">
                    <p className="text-xs text-red-700 font-semibold">⚠️ {fugitive.caution}</p>
                  </div>
                  <div className="flex gap-3">
                    <a
                      href={`/most-wanted/${fugitive.id}`}
                      className="flex-1 bg-[#0B3B60] hover:bg-[#082A45] text-white text-center py-2 rounded-lg font-semibold transition-colors"
                    >
                      View Profile
                    </a>
                    <a
                      href="/tips"
                      className="flex-1 border-2 border-[#B22234] text-[#B22234] hover:bg-[#B22234] hover:text-white text-center py-2 rounded-lg font-semibold transition-colors"
                    >
                      Submit Tip
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Disclaimer and tip reminder */}
      <div className="bg-[#0B3B60]/5 py-8 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm text-gray-600">
            Do not attempt to apprehend any of these individuals yourself. They are considered armed and dangerous. 
            Any information should be reported to your local FBI field office or by calling <strong className="text-[#B22234]">1-800-CALL-FBI</strong>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Mostwanted;