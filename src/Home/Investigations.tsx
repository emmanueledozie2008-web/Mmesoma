import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  FaSearch, FaFilter, FaClock, FaChartLine, FaShieldAlt, 
  FaExclamationTriangle, 
   FaExternalLinkAlt, FaNewspaper,
  FaChevronLeft, FaChevronRight
} from 'react-icons/fa';
import Navbar from '../Component/Navbar';
import Footer from '../Component/Footer';

type InvestigationCategory = 'counterterrorism' | 'counterintelligence' | 'cyber' | 'publicCorruption' | 'organizedCrime' | 'violentCrime';

interface Investigation {
  id: string;
  titleKey: string;
  category: InvestigationCategory;
  status: 'active' | 'ongoing' | 'new' | 'update';
  locationKey: string;
  summaryKey: string;
  lastUpdate: string;
  imageUrls: string[];   // array of images for auto-slide
  priority: 'high' | 'medium' | 'low';
}

// Helper: image sets – you can replace with real ones
const getImageSet = (baseIndex: number): string[] => [
  `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8B4U85CLzSwjZneysW0LThc2VutoJtQZLkA&s${baseIndex}`,
  `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHlqSuOZThZfFbdJKO75Onu0iuHbrM4EOP-g&s${baseIndex+1}`,
  `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkFwaIi_B9qH3YoZrMhjDZfWthhvXkeIS87g&s${baseIndex+2}`,
];

const investigationsData: Investigation[] = [
  {
    id: 'inv1',
    titleKey: 'inv1Title',
    category: 'counterterrorism',
    status: 'active',
    locationKey: 'inv1Location',
    summaryKey: 'inv1Summary',
    lastUpdate: '2025-06-03',
    imageUrls: getImageSet(1),
    priority: 'high',
  },
  {
    id: 'inv2',
    titleKey: 'inv2Title',
    category: 'counterintelligence',
    status: 'ongoing',
    locationKey: 'inv2Location',
    summaryKey: 'inv2Summary',
    lastUpdate: '2025-06-01',
    imageUrls: getImageSet(2),
    priority: 'high',
  },
  {
    id: 'inv3',
    titleKey: 'inv3Title',
    category: 'cyber',
    status: 'active',
    locationKey: 'inv3Location',
    summaryKey: 'inv3Summary',
    lastUpdate: '2025-06-04',
    imageUrls: getImageSet(3),
    priority: 'high',
  },
  {
    id: 'inv4',
    titleKey: 'inv4Title',
    category: 'publicCorruption',
    status: 'new',
    locationKey: 'inv4Location',
    summaryKey: 'inv4Summary',
    lastUpdate: '2025-06-02',
    imageUrls: getImageSet(4),
    priority: 'medium',
  },
  {
    id: 'inv5',
    titleKey: 'inv5Title',
    category: 'organizedCrime',
    status: 'ongoing',
    locationKey: 'inv5Location',
    summaryKey: 'inv5Summary',
    lastUpdate: '2025-05-30',
    imageUrls: getImageSet(5),
    priority: 'high',
  },
  {
    id: 'inv6',
    titleKey: 'inv6Title',
    category: 'violentCrime',
    status: 'update',
    locationKey: 'inv6Location',
    summaryKey: 'inv6Summary',
    lastUpdate: '2025-06-05',
    imageUrls: getImageSet(6),
    priority: 'medium',
  },
];

const categoryLabels: Record<InvestigationCategory, string> = {
  counterterrorism: 'categoryCounterterrorism',
  counterintelligence: 'categoryCounterintelligence',
  cyber: 'categoryCyber',
  publicCorruption: 'categoryPublicCorruption',
  organizedCrime: 'categoryOrganizedCrime',
  violentCrime: 'categoryViolentCrime',
};

const statusBadgeColors = {
  active: 'bg-red-600',
  ongoing: 'bg-orange-600',
  new: 'bg-blue-600',
  update: 'bg-green-600',
};

const priorityColors = {
  high: 'text-red-700 bg-red-100',
  medium: 'text-yellow-700 bg-yellow-100',
  low: 'text-green-700 bg-green-100',
};

const formatDate = (dateStr: string) => {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

// Image Carousel Component (auto‑slide)
const ImageCarousel: React.FC<{ images: string[]; title: string }> = ({ images, title }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right'>('right');
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (images.length <= 1) return;
    const startAutoSlide = () => {
      intervalRef.current = setInterval(() => {
        setSlideDirection('right');
        setCurrentIndex((prev) => (prev + 1) % images.length);
      }, 4000);
    };
    const stopAutoSlide = () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
    if (!isHovered) startAutoSlide();
    else stopAutoSlide();
    return () => stopAutoSlide();
  }, [isHovered, images.length]);

  const nextSlide = () => {
    setSlideDirection('right');
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };
  const prevSlide = () => {
    setSlideDirection('left');
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };
  const goToSlide = (index: number) => {
    setSlideDirection(index > currentIndex ? 'right' : 'left');
    setCurrentIndex(index);
  };

  return (
    <div className="relative h-40 overflow-hidden group" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <div
        key={currentIndex}
        className={`w-full h-full transition-transform duration-500 ease-in-out ${
          slideDirection === 'right' ? 'animate-slideInRight' : 'animate-slideInLeft'
        }`}
      >
        <img src={images[currentIndex]} alt={title} className="w-full h-full object-cover" />
      </div>
      {images.length > 1 && (
        <>
          <button onClick={prevSlide} className="absolute left-1 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition">
            <FaChevronLeft size={12} />
          </button>
          <button onClick={nextSlide} className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition">
            <FaChevronRight size={12} />
          </button>
          <div className="absolute bottom-1 left-0 right-0 flex justify-center gap-1">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goToSlide(idx)}
                className={`w-1.5 h-1.5 rounded-full transition-all ${
                  idx === currentIndex ? 'bg-[#FFD700] w-3' : 'bg-white/60'
                }`}
              />
            ))}
          </div>
        </>
      )}
      <style>{`
        @keyframes slideInRight { from { opacity: 0; transform: translateX(100%); } to { opacity: 1; transform: translateX(0); } }
        @keyframes slideInLeft { from { opacity: 0; transform: translateX(-100%); } to { opacity: 1; transform: translateX(0); } }
        .animate-slideInRight { animation: slideInRight 0.4s ease-out; }
        .animate-slideInLeft { animation: slideInLeft 0.4s ease-out; }
      `}</style>
    </div>
  );
};

const InvestigationsPage: React.FC = () => {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filteredInvestigations = investigationsData.filter(inv => {
    const matchesCategory = activeCategory === 'all' || inv.category === activeCategory;
    const matchesSearch = t(inv.titleKey).toLowerCase().includes(searchTerm.toLowerCase()) ||
                          t(inv.summaryKey).toLowerCase().includes(searchTerm.toLowerCase()) ||
                          t(inv.locationKey).toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || inv.status === filterStatus;
    return matchesCategory && matchesSearch && matchesStatus;
  });

  const activeInvestigations = filteredInvestigations.filter(inv => inv.status === 'active' || inv.status === 'ongoing' || inv.status === 'new');
  const caseUpdates = filteredInvestigations.filter(inv => inv.status === 'update');

  return (
    <div className="bg-white min-h-screen">
      <Navbar/>
      {/* Hero */}
      <div className="bg-[#0B3B60] text-white py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-[#B22234] p-3 rounded-full">
              <FaShieldAlt className="text-3xl" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">{t('investigationsTitle')}</h1>
          <p className="text-gray-200 max-w-2xl mx-auto">{t('investigationsSubtitle')}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        {/* Search and Filters */}
        <div className="bg-gray-50 rounded-xl p-4 md:p-6 mb-8 shadow-sm">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder={t('searchInvestigations')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B22234] focus:outline-none"
              />
            </div>
            <div className="flex gap-3">
              <div className="relative">
                <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B22234] appearance-none"
                >
                  <option value="all">{t('allStatus')}</option>
                  <option value="active">{t('statusActive')}</option>
                  <option value="ongoing">{t('statusOngoing')}</option>
                  <option value="new">{t('statusNew')}</option>
                  <option value="update">{t('statusUpdate')}</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Investigation Categories */}
        <div className="mb-10">
          <h2 className="text-xl font-bold text-[#0B3B60] mb-4 flex items-center gap-2">
            <FaChartLine /> {t('investigationCategories')}
          </h2>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                activeCategory === 'all' ? 'bg-[#B22234] text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {t('allCategories')}
            </button>
            {Object.entries(categoryLabels).map(([value, labelKey]) => (
              <button
                key={value}
                onClick={() => setActiveCategory(value)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                  activeCategory === value ? 'bg-[#B22234] text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {t(labelKey)}
              </button>
            ))}
          </div>
        </div>

        {/* Active Investigations */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-[#0B3B60] border-l-4 border-[#B22234] pl-3 mb-6 flex items-center gap-2">
            <FaExclamationTriangle /> {t('activeInvestigations')}
          </h2>
          {activeInvestigations.length === 0 ? (
            <div className="text-center py-8 bg-gray-50 rounded-xl">
              <p className="text-gray-500">{t('noActiveInvestigations')}</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activeInvestigations.map(inv => (
                <div key={inv.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition flex flex-col h-full">
                  <ImageCarousel images={inv.imageUrls} title={t(inv.titleKey)} />
                  <div className="p-5 flex flex-col flex-grow">
                    <div className="flex flex-wrap gap-1 mb-2">
                      <span className={`text-xs font-bold px-2 py-1 rounded-full ${statusBadgeColors[inv.status]} text-white`}>
                        {t(`status_${inv.status}`)}
                      </span>
                      <span className={`text-xs font-bold px-2 py-1 rounded-full ${priorityColors[inv.priority]}`}>
                        {t(`priority_${inv.priority}`)}
                      </span>
                    </div>
                    <h3 className="font-bold text-lg text-[#0B3B60] mb-1">{t(inv.titleKey)}</h3>
                    <p className="text-sm text-gray-500 mb-2">📍 {t(inv.locationKey)}</p>
                    <p className="text-sm text-gray-600 mb-3 flex-grow">{t(inv.summaryKey)}</p>
                    <div className="flex justify-between items-center text-xs text-gray-400 mt-2">
                      <span className="flex items-center gap-1"><FaClock /> {t('lastUpdate')}: {formatDate(inv.lastUpdate)}</span>
                      <span className="bg-gray-100 px-2 py-1 rounded">{t(categoryLabels[inv.category])}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Case Updates */}
        {caseUpdates.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-[#0B3B60] border-l-4 border-[#B22234] pl-3 mb-6 flex items-center gap-2">
              <FaNewspaper /> {t('caseUpdates')}
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {caseUpdates.map(update => (
                <div key={update.id} className="bg-gray-50 rounded-xl p-5 border-l-4 border-[#FFD700] shadow-sm hover:shadow-md transition">
                  <div className="flex items-start gap-3">
                    <div className="bg-[#B22234]/10 p-2 rounded-full">
                      <FaExternalLinkAlt className="text-[#B22234]" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-[#0B3B60] text-lg">{t(update.titleKey)}</h3>
                      <p className="text-sm text-gray-500 mt-1">📍 {t(update.locationKey)}</p>
                      <p className="text-gray-700 text-sm mt-2">{t(update.summaryKey)}</p>
                      <div className="flex justify-between items-center mt-3 text-xs text-gray-400">
                        <span className="flex items-center gap-1"><FaClock /> {formatDate(update.lastUpdate)}</span>
                        <span className="text-green-600 font-semibold">{t('newDevelopment')}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* No results */}
        {filteredInvestigations.length === 0 && (
          <div className="text-center py-12 bg-gray-50 rounded-xl">
            <p className="text-gray-500">{t('noInvestigationsMatch')}</p>
          </div>
        )}

        {/* Disclaimer */}
        <div className="mt-12 text-center text-xs text-gray-400 border-t pt-6">
          <p>{t('investigationsDisclaimer')}</p>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default InvestigationsPage;