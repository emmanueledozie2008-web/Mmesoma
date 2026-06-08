import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaHistory, FaFilePdf, FaDownload, FaBookOpen, FaLandmark, FaShieldAlt, FaImages } from 'react-icons/fa';
import Navbar from '../Component/Navbar';

// Document files (PDFs for download)
interface DocumentFile {
  id: number;
  titleKey: string;
  descriptionKey: string;
  year: string;
  fileUrl: string;
}

const documentsData: DocumentFile[] = [
  {
    id: 1,
    titleKey: 'doc1Title',
    descriptionKey: 'doc1Desc',
    year: '2020',
    fileUrl: '/documents/fbi-timeline.pdf',
  },
  {
    id: 2,
    titleKey: 'doc2Title',
    descriptionKey: 'doc2Desc',
    year: '2008',
    fileUrl: '/documents/100-years.pdf',
  },
  {
    id: 3,
    titleKey: 'doc3Title',
    descriptionKey: 'doc3Desc',
    year: '2011',
    fileUrl: '/documents/famous-cases.pdf',
  },
  {
    id: 4,
    titleKey: 'doc4Title',
    descriptionKey: 'doc4Desc',
    year: 'Various',
    fileUrl: '/documents/foia-history.pdf',
  },
];

// Document images (for gallery)
interface DocumentImage {
  id: number;
  titleKey: string;
  descriptionKey: string;
  year: string;
  imageUrl: string;
}

const documentImages: DocumentImage[] = [
  {
    id: 1,
    titleKey: 'img1Title',
    descriptionKey: 'img1Desc',
    year: '1908',
    imageUrl: 'https://www.fbi.gov/image-repository/history/agent-application-1909.jpeg/@@images/image/high',
  },
  {
    id: 2,
    titleKey: 'img2Title',
    descriptionKey: 'img2Desc',
    year: '1924',
    imageUrl: 'https://www.fbi.gov/image-repository/history/first-io-2.jpeg/@@images/bea4dd43-3bcf-4b1c-b945-1e00bfb34d28.jpeg',
  },
  {
    id: 3,
    titleKey: 'img3Title',
    descriptionKey: 'img3Desc',
    year: '1932',
    imageUrl: 'https://www.fbi.gov/image-repository/history/emilio-kosterlitzky.jpeg/@@images/04333879-4467-46c7-9b9d-c7966c62f065.jpeg',
  },
  {
    id: 4,
    titleKey: 'img4Title',
    descriptionKey: 'img4Desc',
    year: '2001',
    imageUrl: 'https://www.fbi.gov/image-repository/history/agent-credentials.jpg/@@images/image/high',
  },
];

// Component for truncated text with "Read more"
const TruncatedText: React.FC<{ text: string; maxLength?: number }> = ({ text, maxLength = 120 }) => {
  const [expanded, setExpanded] = useState(false);
  const isLong = text.length > maxLength;
  const displayText = expanded ? text : text.slice(0, maxLength) + (isLong ? '…' : '');

  return (
    <div>
      <p className="text-sm text-gray-600 leading-relaxed">{displayText}</p>
      {isLong && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-2 text-xs font-semibold text-[#B22234] hover:text-[#8B1A1A] flex items-center gap-1 transition-colors"
        >
          {expanded ? 'Read less ↑' : 'Read more ↓'}
        </button>
      )}
    </div>
  );
};

const HistoryPage: React.FC = () => {
  const { t } = useTranslation();
  const [searchDocs, setSearchDocs] = useState('');
  const [showGallery, setShowGallery] = useState(true);

  const filteredDocs = documentsData.filter(doc =>
    t(doc.titleKey).toLowerCase().includes(searchDocs.toLowerCase()) ||
    t(doc.descriptionKey).toLowerCase().includes(searchDocs.toLowerCase()) ||
    doc.year.includes(searchDocs)
  );

  return (
    <div className="bg-white min-h-screen">
      {/* Hero with background video (optional, keep your existing) */}
      <Navbar/>
      <div className="relative h-[70vh] min-h-[450px] flex items-center justify-center overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover"
          poster="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhN2yBKhu-sUjuQxO5mtYHau8nSVftWQ1HrA&s"
        >
          <source src="https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&cad=rja&uact=8&ved=2ahUKEwix2N3th_aUAxVdXEEAHabkF7MQ748MegQIGxAD&url=https%3A%2F%2Fwww.tiktok.com%2F%40triphacksdc%2Fvideo%2F6911724717531467014&usg=AOvVaw31FCru7sCATHnVC6a-p7Eo&opi=89978449" type="video/mp4" />
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhN2yBKhu-sUjuQxO5mtYHau8nSVftWQ1HrA&s" className="absolute top-0 left-0 w-full h-full object-cover" />
        </video>
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-10 text-center text-white px-6 max-w-4xl">
          <div className="flex justify-center mb-4">
            <div className="bg-[#B22234] p-3 rounded-full">
              <FaHistory className="text-3xl md:text-4xl" />
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 leading-tight">
            {t('historyTitle')}
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-200 max-w-2xl mx-auto">
            {t('historySubtitle')}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Timeline narrative sections */}
        <div className="space-y-10 md:space-y-12">
          {/* Section 1 */}
          <div className="flex flex-col md:flex-row gap-5 md:gap-8 items-start">
            <div className="md:w-1/4 flex justify-center md:justify-start">
              <div className="bg-[#B22234]/10 p-4 md:p-6 rounded-full">
                <FaLandmark className="text-4xl md:text-5xl text-[#B22234]" />
              </div>
            </div>
            <div className="md:w-3/4">
              <h2 className="text-xl md:text-2xl font-bold text-[#0B3B60] mb-3 border-l-4 border-[#B22234] pl-3">
                {t('eraBeginning')}
              </h2>
              <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                {t('eraBeginningText')}
              </p>
            </div>
          </div>

          {/* Section 2 */}
          <div className="flex flex-col md:flex-row gap-5 md:gap-8 items-start">
            <div className="md:w-1/4 flex justify-center md:justify-start">
              <div className="bg-[#B22234]/10 p-4 md:p-6 rounded-full">
                <FaShieldAlt className="text-4xl md:text-5xl text-[#B22234]" />
              </div>
            </div>
            <div className="md:w-3/4">
              <h2 className="text-xl md:text-2xl font-bold text-[#0B3B60] mb-3 border-l-4 border-[#B22234] pl-3">
                {t('eraHoover')}
              </h2>
              <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                {t('eraHooverText')}
              </p>
            </div>
          </div>

          {/* Section 3 */}
          <div className="flex flex-col md:flex-row gap-5 md:gap-8 items-start">
            <div className="md:w-1/4 flex justify-center md:justify-start">
              <div className="bg-[#B22234]/10 p-4 md:p-6 rounded-full">
                <FaBookOpen className="text-4xl md:text-5xl text-[#B22234]" />
              </div>
            </div>
            <div className="md:w-3/4">
              <h2 className="text-xl md:text-2xl font-bold text-[#0B3B60] mb-3 border-l-4 border-[#B22234] pl-3">
                {t('eraPost911')}
              </h2>
              <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                {t('eraPost911Text')}
              </p>
            </div>
          </div>
        </div>

        {/* Document Images Gallery */}
        <div className="mt-16 md:mt-20">
          <div className="border-t-2 border-[#B22234]/30 my-8 md:my-10"></div>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 md:mb-8">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-[#0B3B60] flex items-center gap-2">
                <FaImages className="text-[#B22234]" />
                {t('documentImageGallery')}
              </h2>
              <p className="text-gray-600 text-sm md:text-base mt-1">
                {t('galleryDescription')}
              </p>
            </div>
            <button
              onClick={() => setShowGallery(!showGallery)}
              className="text-sm text-[#B22234] border border-[#B22234] px-3 py-1.5 rounded-full hover:bg-[#B22234] hover:text-white transition"
            >
              {showGallery ? t('galleryToggleHide') : t('galleryToggleShow')}
            </button>
          </div>

          {showGallery && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {documentImages.map((img) => (
                <div key={img.id} className="bg-gray-50 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition flex flex-col h-full">
                  <div className="relative pt-[56.25%]">
                    <img src={img.imageUrl} alt={t(img.titleKey)} className="absolute top-0 left-0 w-full h-full object-cover" />
                  </div>
                  <div className="p-4 md:p-5 flex flex-col flex-grow">
                    <div className="flex justify-between items-start gap-2 mb-2">
                      <h3 className="font-bold text-[#0B3B60] text-base md:text-lg leading-tight flex-1">
                        {t(img.titleKey)}
                      </h3>
                      <span className="text-xs bg-[#B22234] text-white px-2 py-1 rounded-full shrink-0">
                        {img.year}
                      </span>
                    </div>
                    <TruncatedText text={t(img.descriptionKey)} maxLength={120} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Downloadable PDF Documents Section */}
        <div className="mt-16 md:mt-20">
          <div className="border-t-2 border-[#B22234]/30 my-8 md:my-10"></div>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 md:mb-8">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-[#0B3B60] flex items-center gap-2">
                <FaFilePdf className="text-[#B22234]" />
                {t('historicalDocuments')}
              </h2>
              <p className="text-gray-600 text-sm md:text-base mt-1">
                {t('documentsDescription')}
              </p>
            </div>
            <div className="relative w-full sm:w-64">
              <input
                type="text"
                placeholder={t('searchDocuments')}
                value={searchDocs}
                onChange={(e) => setSearchDocs(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B22234] text-sm"
              />
            </div>
          </div>

          {filteredDocs.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-xl">
              <p className="text-gray-500">{t('noDocumentsFound')}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {filteredDocs.map((doc) => (
                <div key={doc.id} className="bg-gray-50 rounded-xl p-5 border border-gray-200 hover:shadow-lg transition flex flex-col h-full">
                  <div className="flex items-start justify-between mb-3">
                    <div className="bg-[#B22234]/10 p-2 rounded-lg">
                      <FaFilePdf className="text-[#B22234] text-xl" />
                    </div>
                    <span className="text-xs bg-[#0B3B60] text-white px-2 py-1 rounded-full">{doc.year}</span>
                  </div>
                  <h3 className="font-bold text-[#0B3B60] text-base md:text-lg mb-2">{t(doc.titleKey)}</h3>
                  <p className="text-sm text-gray-600 mb-4 flex-grow">{t(doc.descriptionKey)}</p>
                  <a href={doc.fileUrl} download className="inline-flex items-center gap-2 text-[#B22234] font-semibold hover:text-[#8B1A1A] transition-colors text-sm mt-auto">
                    <FaDownload /> {t('downloadPdf')}
                  </a>
                </div>
              ))}
            </div>
          )}

          <div className="mt-8 bg-[#0B3B60]/5 p-4 rounded-lg border border-[#B22234]/20 text-center text-sm text-gray-600">
            <p>{t('foiaDisclaimer')}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryPage;