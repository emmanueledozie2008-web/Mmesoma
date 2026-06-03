import React, { useState, useEffect } from 'react';
import { FaUserSecret,  FaPaperPlane, FaClock, FaExclamationTriangle } from 'react-icons/fa';

// Sample most wanted data (replace with real API if needed)
const mostWantedList = [
  { name: 'JASON DEREK BROWN', reward: '$100,000', crime: 'Terrorism', link: '/wanted/jason-brown' },
  { name: 'YULAN ANDREA GONGORA', reward: '$50,000', crime: 'Cybercrime', link: '/wanted/yulan-gongora' },
  { name: 'VICTOR MANUEL GERENA', reward: '$75,000', crime: 'Violent Crime', link: '/wanted/victor-gerena' },
  { name: 'BOLESLAW DOMINIK', reward: '$200,000', crime: 'Espionage', link: '/wanted/boleslaw-dominik' },
];

const Interactivew: React.FC = () => {
  // Most Wanted random index – changes daily
  const [wantedIndex, setWantedIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const [tipSubmitted, setTipSubmitted] = useState(false);
  const [tipText, setTipText] = useState('');

  // Randomize Most Wanted daily (based on date)
  useEffect(() => {
    const today = new Date().toDateString();
    const storedDate = localStorage.getItem('wantedDate');
    const storedIndex = localStorage.getItem('wantedIndex');
    if (storedDate === today && storedIndex !== null) {
      setWantedIndex(parseInt(storedIndex));
    } else {
      const randomIndex = Math.floor(Math.random() * mostWantedList.length);
      setWantedIndex(randomIndex);
      localStorage.setItem('wantedDate', today);
      localStorage.setItem('wantedIndex', randomIndex.toString());
    }
  }, []);

  // Countdown timer to next day (midnight)
  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const midnight = new Date(now);
      midnight.setDate(now.getDate() + 1);
      midnight.setHours(0, 0, 0, 0);
      const diff = midnight.getTime() - now.getTime();
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      setTimeLeft({ hours, minutes, seconds });
    };
    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleTipSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (tipText.trim()) {
      setTipSubmitted(true);
      setTimeout(() => setTipSubmitted(false), 3000);
      setTipText('');
    }
  };

  const currentWanted = mostWantedList[wantedIndex];

  return (
    <section className="bg-white py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-[#0B3B60] text-center mb-12">
          Citizen Tools & Resources
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {/* LEFT WIDGET: Most Wanted of the Day */}
          <div className="bg-gradient-to-br from-[#0B3B60] to-[#082A45] rounded-2xl shadow-xl overflow-hidden transition-transform hover:scale-[1.02] duration-300">
            <div className="p-6 text-white">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-2xl font-bold flex items-center gap-2">
                    <FaExclamationTriangle className="text-[#FFD700]" />
                    FBI Most Wanted
                  </h3>
                  <p className="text-sm opacity-80">Today's featured fugitive</p>
                </div>
                <div className="bg-black/30 rounded-lg px-3 py-1 text-center">
                  <FaClock className="inline mr-1 text-[#FFD700]" />
                  <span className="text-xs font-mono">
                    {String(timeLeft.hours).padStart(2, '0')}:
                    {String(timeLeft.minutes).padStart(2, '0')}:
                    {String(timeLeft.seconds).padStart(2, '0')}
                  </span>
                </div>
              </div>
              <div className="bg-white/10 rounded-xl p-4 mb-4 backdrop-blur-sm">
                <h4 className="text-xl font-mono font-bold text-[#FFD700]">{currentWanted.name}</h4>
                <p className="text-sm mt-1">Crime: {currentWanted.crime}</p>
                <p className="text-sm">Reward: {currentWanted.reward}</p>
              </div>
              <a
                href={currentWanted.link}
                className="inline-block w-full text-center bg-[#B22234] hover:bg-[#8B1A1A] py-2 rounded-lg font-semibold transition-colors"
              >
                View Profile & Report Sighting
              </a>
              <p className="text-xs text-center mt-3 opacity-70">
                New fugitive featured daily. If seen, do not approach – call 1-800-CALL-FBI.
              </p>
            </div>
          </div>

          {/* RIGHT WIDGET: Anonymous Tip Form */}
          <div className="bg-gray-50 rounded-2xl shadow-xl overflow-hidden border border-gray-200">
            <div className="bg-[#B22234] px-6 py-4">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <FaUserSecret />
                Submit an Anonymous Tip
              </h3>
            </div>
            <div className="p-6">
              {tipSubmitted ? (
                <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded animate-fadeIn">
                  <p className="font-semibold">✓ Tip submitted successfully.</p>
                  <p className="text-sm">Thank you for helping keep our communities safe.</p>
                </div>
              ) : (
                <form onSubmit={handleTipSubmit}>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Your message (required)
                    </label>
                    <textarea
                      value={tipText}
                      onChange={(e) => setTipText(e.target.value)}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B22234]"
                      placeholder="Describe the suspicious activity or provide information..."
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Your email (optional, for follow‑up)
                    </label>
                    <input
                      type="email"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B22234]"
                      placeholder="anonymous@example.com"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-[#0B3B60] hover:bg-[#082A45] text-white font-semibold py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <FaPaperPlane /> Send Tip Securely
                  </button>
                  <p className="text-xs text-gray-500 mt-3 text-center">
                    Your identity will remain anonymous. All tips are encrypted.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Additional row: live news ticker widget (optional) */}
        <div className="mt-12 bg-[#0B3B60]/5 rounded-xl p-4 border border-[#B22234]/20">
          <div className="flex items-center gap-3 overflow-hidden">
            <span className="bg-[#B22234] text-white text-xs font-bold px-2 py-1 rounded">LIVE</span>
            <div className="animate-marquee whitespace-nowrap">
              <span className="text-[#0B3B60] font-medium">
                🔹 FBI seeks public assistance in identifying Jan 6 Capitol suspects • 
                🔹 New cyber advisory: protect against ransomware • 
                🔹 Joint operation dismantles international drug ring • 
                🔹 Most Wanted capture in Virginia
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Reuse fadeIn animation from earlier, plus marquee */}
      <style>{`
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default Interactivew;