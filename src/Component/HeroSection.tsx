import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaLock, FaShieldAlt } from 'react-icons/fa';

const HeroSection: React.FC = () => {
  const { t } = useTranslation();
  const [showInfoWidget, setShowInfoWidget] = useState(false);
  const infoRef = useRef<HTMLDivElement>(null);

  const handleHowYouKnowClick = () => {
    const willShow = !showInfoWidget;
    setShowInfoWidget(willShow);
    if (willShow) {
      setTimeout(() => infoRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-white">
      <div className="bg-[#0B3B60] text-white py-2 px-4 text-center text-sm">
        <span>{t('officialWebsiteText')}</span>{' '}
        <button onClick={handleHowYouKnowClick} className="text-[#FFD700] underline hover:text-yellow-300">
          {t('howYouKnow')}
        </button>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-16 md:py-24 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-[#0B3B60] mb-4">{t('heroTitle')}</h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">{t('heroSubtitle')}</p>
      </div>
      {showInfoWidget && (
        <div ref={infoRef} className="bg-gray-50 py-16 px-4 scroll-mt-16 animate-fadeInUp">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl shadow-lg border-l-8 border-[#B22234] p-6">
              <h3 className="text-xl font-bold text-[#0B3B60]">{t('secureGovText')}</h3>
              <p className="text-gray-700 mt-2">{t('lockExplanation')}</p>
            </div>
            <div className="bg-white rounded-xl shadow-lg border-l-8 border-[#FFD700] p-6">
              <h3 className="text-xl font-bold text-[#0B3B60]">{t('secureHttpsText')}</h3>
              <p className="text-gray-700 mt-2">{t('lockExplanation')}</p>
            </div>
          </div>
          <div className="mt-8 text-center">
            <div className="inline-flex items-center gap-3 bg-[#0B3B60] text-white px-6 py-3 rounded-full">
              <FaShieldAlt className="text-[#FFD700]" />
              <span>{t('trustBadge')}</span>
              <FaLock className="text-[#FFD700]" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default HeroSection;