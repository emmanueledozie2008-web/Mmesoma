import React from 'react';
import { FaYoutube, FaPlayCircle } from 'react-icons/fa';

interface VideoProps {
  videoId: string;
  title: string;
  description?: string;
}

const featuredVideo: VideoProps = {
  videoId: '5uRzBOdOqmU?si=JtyOzmRdozmguUIV', // Replace with your FBI-related video ID (e.g., official FBI YouTube)
  title: 'FBI: Protecting America – A Mission Overview',
  description: 'Learn how the FBI works to protect the American people and uphold the Constitution through intelligence, law enforcement, and partnership.',
};

const moreVideos: VideoProps[] = [
  {
    videoId: 'KuRurx3ACLw?si=CMuiUqFuszaeFHcf', // Example – replace with real FBI videos
    title: 'FBI Most Wanted Capture',
    description: 'See how the public helped capture a top ten fugitive.',
  },
  {
    videoId: 'XVoMnAyPHCE?si=JzexvXaCGJk4cLLW',
    title: 'Cyber Threats Explained',
    description: 'FBI experts discuss the latest cyber threats and how to stay safe.',
  },
];

const Youtube: React.FC = () => {
  const getYouTubeEmbedUrl = (videoId: string) => `https://www.youtube.com/embed/${videoId}?autoplay=0&modestbranding=1&rel=0`;

  return (
    <section className="bg-gray-50 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-[#B22234]/10 text-[#B22234] px-4 py-1 rounded-full mb-3">
            <FaYoutube className="text-[#B22234]" />
            <span className="text-sm font-semibold">FBI Multimedia</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#0B3B60]">
            Watch & Learn
          </h2>
          <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
            Official FBI videos – see how we serve and protect communities nationwide.
          </p>
        </div>

        {/* Featured video */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-12 transition-transform hover:scale-[1.01] duration-300">
          <div className="aspect-video w-full">
            <iframe
              src={getYouTubeEmbedUrl(featuredVideo.videoId)}
              title={featuredVideo.title}
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
                <h3 className="text-xl font-bold text-[#0B3B60]">{featuredVideo.title}</h3>
                <p className="text-gray-600 mt-2">{featuredVideo.description}</p>
              </div>
            </div>
          </div>
        </div>

        {/* More videos grid (optional) */}
        {moreVideos.length > 0 && (
          <>
            <h3 className="text-xl font-bold text-[#0B3B60] mb-6 border-l-4 border-[#B22234] pl-3">
              More from the FBI
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {moreVideos.map((video, idx) => (
                <div key={idx} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-video w-full">
                    <iframe
                      src={getYouTubeEmbedUrl(video.videoId)}
                      title={video.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                    ></iframe>
                  </div>
                  <div className="p-4">
                    <h4 className="font-bold text-[#0B3B60]">{video.title}</h4>
                    {video.description && <p className="text-sm text-gray-500 mt-1">{video.description}</p>}
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
            Visit Official FBI YouTube Channel
          </a>
        </div>
      </div>
    </section>
  );
};

export default Youtube;