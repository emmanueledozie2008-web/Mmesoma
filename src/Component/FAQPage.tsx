import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  FaQuestionCircle, FaPhoneAlt,  FaEnvelope, 
   FaLightbulb, FaChevronDown, FaChevronUp,
  FaUserSecret,  FaFileAlt
} from 'react-icons/fa';

interface FAQItem {
  id: string;
  questionKey: string;
  answerKey: string;
  category: 'general' | 'reporting' | 'safety';
}

const faqData: FAQItem[] = [
  // General questions
  { id: 'gen1', questionKey: 'faqGen1Q', answerKey: 'faqGen1A', category: 'general' },
  { id: 'gen2', questionKey: 'faqGen2Q', answerKey: 'faqGen2A', category: 'general' },
  { id: 'gen3', questionKey: 'faqGen3Q', answerKey: 'faqGen3A', category: 'general' },
  // Reporting procedures
  { id: 'rep1', questionKey: 'faqRep1Q', answerKey: 'faqRep1A', category: 'reporting' },
  { id: 'rep2', questionKey: 'faqRep2Q', answerKey: 'faqRep2A', category: 'reporting' },
  { id: 'rep3', questionKey: 'faqRep3Q', answerKey: 'faqRep3A', category: 'reporting' },
  { id: 'rep4', questionKey: 'faqRep4Q', answerKey: 'faqRep4A', category: 'reporting' },
  // Safety information
  { id: 'saf1', questionKey: 'faqSaf1Q', answerKey: 'faqSaf1A', category: 'safety' },
  { id: 'saf2', questionKey: 'faqSaf2Q', answerKey: 'faqSaf2A', category: 'safety' },
  { id: 'saf3', questionKey: 'faqSaf3Q', answerKey: 'faqSaf3A', category: 'safety' },
  { id: 'saf4', questionKey: 'faqSaf4Q', answerKey: 'faqSaf4A', category: 'safety' },
];

// Emergency widget safety tips (rotating)
const safetyTipsKeys = [
  'safetyTip1',
  'safetyTip2',
  'safetyTip3',
  'safetyTip4',
];

const EmergencyWidget: React.FC = () => {
  const { t } = useTranslation();
  const [tipIndex, setTipIndex] = useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setTipIndex((prev) => (prev + 1) % safetyTipsKeys.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#0B3B60] text-white rounded-xl shadow-lg p-5">
      <h3 className="text-lg font-bold flex items-center gap-2 mb-3 border-b border-[#FFD700]/30 pb-2">
        <FaPhoneAlt className="text-[#FFD700]" /> {t('emergencyHub')}
      </h3>
      <div className="space-y-3 text-sm">
        <div className="flex justify-between items-center">
          <span>{t('fbiTipsLine')}</span>
          <span className="font-mono font-bold">1-800-CALL-FBI</span>
        </div>
        <div className="flex justify-between items-center">
          <span>{t('onlineTips')}</span>
          <a href="#" className="text-[#FFD700] hover:underline">tips.fbi.gov</a>
        </div>
        <div className="flex justify-between items-center">
          <span>{t('emergencies')}</span>
          <span className="font-bold">911</span>
        </div>
        <div className="mt-3 pt-2 border-t border-white/20">
          <div className="flex items-start gap-2">
            <FaLightbulb className="text-[#FFD700] mt-0.5" />
            <div>
              <p className="text-xs font-semibold">{t('safetyTipMoment')}</p>
              <p className="text-xs opacity-90">{t(safetyTipsKeys[tipIndex])}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const AccordionItem: React.FC<{ item: FAQItem; isOpen: boolean; onToggle: () => void }> = ({ item, isOpen, onToggle }) => {
  const { t } = useTranslation();
  return (
    <div className="border border-gray-200 rounded-lg mb-3 overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full px-5 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
      >
        <span className="font-semibold text-[#0B3B60]">{t(item.questionKey)}</span>
        {isOpen ? <FaChevronUp className="text-gray-500" /> : <FaChevronDown className="text-gray-500" />}
      </button>
      {isOpen && (
        <div className="px-5 pb-4 pt-0 text-gray-600 text-sm border-t border-gray-100">
          {t(item.answerKey)}
        </div>
      )}
    </div>
  );
};

const FAQPage: React.FC = () => {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState<'general' | 'reporting' | 'safety'>('general');
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const toggleItem = (id: string) => {
    const newSet = new Set(openItems);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setOpenItems(newSet);
  };

  const filteredFAQs = faqData.filter(item => item.category === activeCategory);

  const categoryLabels = {
    general: t('commonQuestions'),
    reporting: t('reportingProcedures'),
    safety: t('safetyInformation'),
  };

  const categoryDescriptions = {
    general: t('commonQuestionsDesc'),
    reporting: t('reportingProceduresDesc'),
    safety: t('safetyInformationDesc'),
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <div className="bg-[#0B3B60] text-white py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-[#B22234] p-3 rounded-full">
              <FaQuestionCircle className="text-3xl" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">{t('faqTitle')}</h1>
          <p className="text-gray-200 max-w-2xl mx-auto">{t('faqSubtitle')}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left column */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              <div className="bg-gray-50 rounded-xl p-5 shadow-sm">
                <h3 className="font-bold text-[#0B3B60] mb-3 flex items-center gap-2">
                  <FaFileAlt /> {t('browseByTopic')}
                </h3>
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => setActiveCategory('general')}
                    className={`text-left px-4 py-2 rounded-lg transition ${
                      activeCategory === 'general' ? 'bg-[#B22234] text-white' : 'hover:bg-gray-200 text-gray-700'
                    }`}
                  >
                    📖 {t('commonQuestions')}
                  </button>
                  <button
                    onClick={() => setActiveCategory('reporting')}
                    className={`text-left px-4 py-2 rounded-lg transition ${
                      activeCategory === 'reporting' ? 'bg-[#B22234] text-white' : 'hover:bg-gray-200 text-gray-700'
                    }`}
                  >
                    📞 {t('reportingProcedures')}
                  </button>
                  <button
                    onClick={() => setActiveCategory('safety')}
                    className={`text-left px-4 py-2 rounded-lg transition ${
                      activeCategory === 'safety' ? 'bg-[#B22234] text-white' : 'hover:bg-gray-200 text-gray-700'
                    }`}
                  >
                    🛡️ {t('safetyInformation')}
                  </button>
                </div>
              </div>
              <EmergencyWidget />
              <div className="bg-[#B22234]/10 rounded-xl p-4 text-center">
                <FaUserSecret className="text-2xl text-[#B22234] mx-auto mb-2" />
                <p className="text-xs text-gray-600">{t('cooperationMessage')}</p>
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-[#0B3B60] border-l-4 border-[#B22234] pl-3">
                {categoryLabels[activeCategory]}
              </h2>
              <p className="text-gray-500 mt-1">{categoryDescriptions[activeCategory]}</p>
            </div>
            <div className="space-y-2">
              {filteredFAQs.map(faq => (
                <AccordionItem
                  key={faq.id}
                  item={faq}
                  isOpen={openItems.has(faq.id)}
                  onToggle={() => toggleItem(faq.id)}
                />
              ))}
            </div>
            <div className="mt-8 p-4 bg-gray-50 rounded-lg text-center text-sm text-gray-500">
              <FaEnvelope className="inline mr-1" /> {t('stillHaveQuestions')}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;