import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaYoutube, FaPlayCircle } from 'react-icons/fa';

interface VideoProps {
  url: string;        // full YouTube URL (any format)
  title: string;      // translation key
  description?: string;
}

// Helper: extract video ID from any YouTube URL
const extractYouTubeId = (url: string): string => {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/live\/)([^&?#/]+)/,
    /youtube\.com\/shorts\/([^&?#/]+)/,
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  // Fallback: assume the string itself is an ID if it's short and contains no slashes
  if (!url.includes('/') && url.length < 20) return url;
  return '';
};

const featuredVideo: VideoProps = {
  url: 'https://www.youtube.com/live/BDlr7SdVFJo?si=Sh3PA8QFqFJN9wa7',
  title: 'featuredVideoTitle',
  description: 'featuredVideoDesc',
};

const moreVideos: VideoProps[] = [
  {
    url: 'https://youtu.be/XVoMnAyPHCE?si=JzexvXaCGJk4cLLW',
    title: 'moreVideo1Title',
    description: 'moreVideo1Desc',
  },
  {
    url: 'https://www.youtube.com/live/KuRurx3ACLw?si=CMuiUqFuszaeFHcf',
    title: 'moreVideo2Title',
    description: 'moreVideo2Desc',
  },
];

const YouTubeSection: React.FC = () => {
  const { t } = useTranslation();

  const getEmbedUrl = (url: string) => {
    const videoId = extractYouTubeId(url);
    if (!videoId) return '';
    return `https://www.youtube.com/embed/${videoId}?autoplay=0&modestbranding=1&rel=0`;
  };

  return (
    <section className="bg-gray-50 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-[#B22234]/10 text-[#B22234] px-4 py-1 rounded-full mb-3">
            <FaYoutube className="text-[#B22234]" />
            <span className="text-sm font-semibold">{t('multimediaBadge')}</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#0B3B60]">
            {t('watchAndLearn')}
          </h2>
          <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
            {t('officialVideosDesc')}
          </p>
        </div>

        {/* Featured video */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-12 transition-transform hover:scale-[1.01] duration-300">
          <div className="aspect-video w-full">
            <iframe
              src={getEmbedUrl(featuredVideo.url)}
              title={t(featuredVideo.title)}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          </div>
          <div className="p-6">
            <div className="flex items-start gap-3">
              <FaPlayCircle className="text-[#B22234] text-2xl mt-1" />
              <div>
                <h3 className="text-xl font-bold text-[#0B3B60]">{t(featuredVideo.title)}</h3>
                <p className="text-gray-600 mt-2">{t(featuredVideo.description || '')}</p>
              </div>
            </div>
          </div>
        </div>

        {/* More videos grid */}
        {moreVideos.length > 0 && (
          <>
            <h3 className="text-xl font-bold text-[#0B3B60] mb-6 border-l-4 border-[#B22234] pl-3">
              {t('moreFromFBI')}
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {moreVideos.map((video, idx) => (
                <div key={idx} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-video w-full">
                    <iframe
                      src={getEmbedUrl(video.url)}
                      title={t(video.title)}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                    ></iframe>
                  </div>
                  <div className="p-4">
                    <h4 className="font-bold text-[#0B3B60]">{t(video.title)}</h4>
                    {video.description && (
                      <p className="text-sm text-gray-500 mt-1">{t(video.description)}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Call to action link to official YouTube channel */}
        <div className="text-center mt-10">
          <a
            href="https://www.youtube.com/@FBI"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#B22234] hover:bg-[#8B1A1A] text-white font-semibold px-6 py-3 rounded-full transition-colors"
          >
            <FaYoutube size={20} />
            {t('visitOfficialChannel')}
          </a>
        </div>
      </div>
    </section>
  );
};

export default YouTubeSection;