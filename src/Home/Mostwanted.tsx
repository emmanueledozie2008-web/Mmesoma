import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaSearch, FaFilter, FaUserSecret, FaDollarSign, FaBalanceScale } from 'react-icons/fa';
import Navbar from '../Component/Navbar';

interface Fugitive {
  id: number;
  nameKey: string;
  aliasesKey: string;
  reward: string;
  chargesKey: string;
  imageUrl: string;
  cautionKey: string;
}

const fugitivesData: Fugitive[] = [
  {
    id: 1,
    nameKey: 'fugitive1Name',
    aliasesKey: 'fugitive1Alias',
    reward: '$100,000',
    chargesKey: 'fugitive1Charges',
    imageUrl: 'https://www.fbi.gov/wanted/wanted_terrorists/jamal-saeed-abdul-rahim/@@images/image/high',
    cautionKey: 'fugitive1Caution',
  },
  {
    id: 2,
    nameKey: 'fugitive2Name',
    aliasesKey: 'fugitive2Alias',
    reward: '$50,000',
    chargesKey: 'fugitive2Charges',
    imageUrl: 'https://www.fbi.gov/wanted/cac/william-willingham/@@images/image/mini',
    cautionKey: 'fugitive2Caution',
  },
  {
    id: 3,
    nameKey: 'fugitive3Name',
    aliasesKey: 'fugitive3Alias',
    reward: '$75,000',
    chargesKey: 'fugitive3Charges',
    imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=500&fit=crop',
    cautionKey: 'fugitive3Caution',
  },
  {
    id: 4,
    nameKey: 'fugitive4Name',
    aliasesKey: 'fugitive4Alias',
    reward: '$200,000',
    chargesKey: 'fugitive4Charges',
    imageUrl: 'https://www.fbi.gov/wanted/seeking-info/shaare-tefila-synagogue-vandalism/@@images/image/mini',
    cautionKey: 'fugitive4Caution',
  },
  {
    id: 5,
    nameKey: 'fugitive5Name',
    aliasesKey: 'fugitive5Alias',
    reward: '$125,000',
    chargesKey: 'fugitive5Charges',
    imageUrl: 'https://www.fbi.gov/wanted/additional/jesson-quintero/@@images/image/mini',
    cautionKey: 'fugitive5Caution',
  },
  {
    id: 6,
    nameKey: 'fugitive6Name',
    aliasesKey: 'fugitive6Alias',
    reward: '$500,000',
    chargesKey: 'fugitive6Charges',
    imageUrl: 'https://www.fbi.gov/wanted/cei/leobardo-pena-gutierrez/@@images/image/high',
    cautionKey: 'fugitive6Caution',
  },
];

const Mostwanted: React.FC = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterReward, setFilterReward] = useState('all');

  const filteredFugitives = fugitivesData.filter((fugitive) => {
    const matchesSearch =
      t(fugitive.nameKey).toLowerCase().includes(searchTerm.toLowerCase()) ||
      t(fugitive.aliasesKey).toLowerCase().includes(searchTerm.toLowerCase()) ||
      t(fugitive.chargesKey).toLowerCase().includes(searchTerm.toLowerCase());
    if (!matchesSearch) return false;

    const rewardAmount = parseInt(fugitive.reward.replace(/[^0-9]/g, ''));
    if (filterReward === 'high') return rewardAmount >= 100000;
    if (filterReward === 'medium') return rewardAmount >= 50000 && rewardAmount < 100000;
    if (filterReward === 'low') return rewardAmount < 50000;
    return true;
  });

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      {/* Hero banner */}
      <div className="bg-[#0B3B60] text-white py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 flex items-center justify-center gap-3">
            <FaUserSecret className="text-[#FFD700]" />
            {t('mostWantedTitle')}
          </h1>
          <p className="text-lg text-gray-200 max-w-2xl mx-auto">
            {t('mostWantedSubtitle')}
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
              placeholder={t('searchFugitives')}
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
              <option value="all">{t('allRewards')}</option>
              <option value="high">{t('highReward')}</option>
              <option value="medium">{t('mediumReward')}</option>
              <option value="low">{t('lowReward')}</option>
            </select>
          </div>
        </div>
      </div>

      {/* Fugitive grid */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {filteredFugitives.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">{t('noFugitives')}</p>
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
                    alt={t(fugitive.nameKey)}
                    className="w-full h-full object-cover object-top transition-transform duration-500 hover:scale-110"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x500?text=FBI+Wanted';
                    }}
                  />
                  <div className="absolute top-3 right-3 bg-[#B22234] text-white text-xs font-bold px-2 py-1 rounded-full">
                    {t('wantedBadge')}
                  </div>
                </div>
                <div className="p-5">
                  <h2 className="text-xl font-bold text-[#0B3B60] mb-1">{t(fugitive.nameKey)}</h2>
                  <p className="text-sm text-gray-500 mb-3">
                    {t('aka')}: {t(fugitive.aliasesKey)}
                  </p>
                  <div className="flex items-center gap-2 mb-2">
                    <FaDollarSign className="text-[#FFD700]" />
                    <span className="font-semibold text-green-700">{fugitive.reward} {t('rewardLabel')}</span>
                  </div>
                  <div className="flex items-start gap-2 mb-3">
                    <FaBalanceScale className="text-gray-500 mt-0.5" />
                    <p className="text-sm text-gray-700">{t(fugitive.chargesKey)}</p>
                  </div>
                  <div className="bg-red-50 border-l-4 border-[#B22234] p-2 mb-4">
                    <p className="text-xs text-red-700 font-semibold">⚠️ {t(fugitive.cautionKey)}</p>
                  </div>
                  <div className="flex gap-3">
                    <a
                      href={`/most-wanted/${fugitive.id}`}
                      className="flex-1 bg-[#0B3B60] hover:bg-[#082A45] text-white text-center py-2 rounded-lg font-semibold transition-colors"
                    >
                      {t('viewProfile')}
                    </a>
                    <a
                      href="/tips"
                      className="flex-1 border-2 border-[#B22234] text-[#B22234] hover:bg-[#B22234] hover:text-white text-center py-2 rounded-lg font-semibold transition-colors"
                    >
                      {t('submitTip')}
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
            {t('tipWarning')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Mostwanted;