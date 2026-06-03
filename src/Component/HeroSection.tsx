import React, { useRef, useState } from 'react';
import { FaLock, FaShieldAlt, FaGlobe } from 'react-icons/fa';


const HeroSection: React.FC = () => {
  const [showInfoWidget, setShowInfoWidget] = useState(false);
  const infoRef = useRef<HTMLDivElement>(null);

  const handleHowYouKnowClick = () => {
    const willShow = !showInfoWidget;
    setShowInfoWidget(willShow);

    if (willShow) {
      // Show widget: scroll to it
      setTimeout(() => {
        infoRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    } else {
      // Hide widget: scroll back to top of hero
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-white">
      {/* Top bar – always visible */}
      <div className="bg-[#0B3B60] text-white py-2 px-4 text-center text-sm">
        <span>An official website of the United States government</span>{' '}
        <button
          onClick={handleHowYouKnowClick}
          className="text-[#FFD700] underline hover:text-yellow-300 transition-colors"
        >
          Here's how you know
        </button>
      </div>

      {/* Hero main content */}

      {/* Info Widget – toggles visibility */}
      {showInfoWidget && (
        <div ref={infoRef} className="bg-gray-50 py-16 px-4 scroll-mt-16 animate-fadeInUp">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              {/* .gov Card */}
              <div className="bg-white rounded-xl shadow-lg border-l-8 border-[#B22234] overflow-hidden transition-transform hover:scale-105">
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-[#0B3B60]/10 p-3 rounded-full">
                      <FaGlobe className="text-[#0B3B60] text-2xl" />
                    </div>
                    <h3 className="text-xl font-bold text-[#0B3B60]">Official websites use .gov</h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    A <strong className="text-[#B22234]">.gov</strong> website belongs to an official government 
                    organization in the United States.
                  </p>
                  <div className="mt-4 pt-3 border-t border-gray-100 text-sm text-gray-500">
                    <span className="inline-flex items-center gap-1">
                      <FaLock className="text-green-600 text-xs" /> Secure .gov websites use HTTPS
                    </span>
                  </div>
                </div>
              </div>

              {/* HTTPS Card */}
              <div className="bg-white rounded-xl shadow-lg border-l-8 border-[#FFD700] overflow-hidden transition-transform hover:scale-105">
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-[#B22234]/10 p-3 rounded-full">
                      <FaLock className="text-[#B22234] text-2xl" />
                    </div>
                    <h3 className="text-xl font-bold text-[#0B3B60]">Secure .gov websites use HTTPS</h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    A <strong className="text-[#B22234]">lock</strong> ( <FaLock className="inline text-xs" /> ) or 
                    <strong className="text-[#B22234]"> https://</strong> means you’ve safely connected to the 
                    .gov website. Share sensitive information only on official, secure websites.
                  </p>
                  <div className="mt-4 flex justify-end">
                    <div className="bg-green-50 text-green-700 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                      <FaShieldAlt /> Verified Government Domain
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional trust badge */}
            <div className="mt-10 text-center">
              <div className="inline-flex items-center gap-3 bg-[#0B3B60] text-white px-6 py-3 rounded-full shadow-md">
                <FaShieldAlt className="text-[#FFD700]" />
                <span className="font-medium">Official FBI Website • Secure Connection</span>
                <FaLock className="text-[#FFD700]" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Fade-in animation */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.4s ease-out;
        }
      `}</style>
    </div>
  );
};

export default HeroSection;