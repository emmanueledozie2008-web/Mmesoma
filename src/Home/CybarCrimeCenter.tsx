import React, { useState } from 'react';
import { 
  FaShieldAlt, FaExclamationTriangle, FaBug, 
  FaEnvelope, FaUserSecret, FaArrowRight, FaChevronLeft, 
  FaChevronRight, FaDownload, FaVideo, FaBookOpen
} from 'react-icons/fa';
import Navbar from '../Component/Navbar';

// Alert data
interface Alert {
  id: string;
  title: string;
  severity: 'critical' | 'high' | 'medium';
  description: string;
  date: string;
}

const alertsData: Alert[] = [
  {
    id: 'a1',
    title: 'Ransomware Variant "LockBit 4.0" Spreading',
    severity: 'critical',
    description: 'New strain targeting healthcare and education. Implement offline backups and update EDR signatures.',
    date: '2025-06-05',
  },
  {
    id: 'a2',
    title: 'Phishing Campaign – IRS Tax Refund Scams',
    severity: 'high',
    description: 'Emails impersonating IRS demanding payment. Verify via official IRS channels.',
    date: '2025-06-03',
  },
  {
    id: 'a3',
    title: 'Critical RCE in Popular VPN Appliances',
    severity: 'critical',
    description: 'Unpatched VPN gateways exploited. Apply vendor patches immediately.',
    date: '2025-06-01',
  },
  {
    id: 'a4',
    title: 'BEC Scams Targeting Small Businesses',
    severity: 'medium',
    description: 'Criminals spoofing executives. Implement multi-factor authentication on wire transfers.',
    date: '2025-05-30',
  },
];

// Carousel slides (Educational Materials)
interface Slide {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  link: string;
  type: 'guide' | 'video' | 'tip';
}

const slides: Slide[] = [
  {
    id: 's1',
    title: 'How to Recognize Phishing Emails',
    description: 'Learn to spot fake sender addresses, urgent language, and suspicious attachments.',
    imageUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&h=350&fit=crop',
    link: '#',
    type: 'tip',
  },
  {
    id: 's2',
    title: 'Ransomware Prevention Guide',
    description: 'Step-by-step guide to secure backups, user training, and network segmentation.',
    imageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&h=350&fit=crop',
    link: '#',
    type: 'guide',
  },
  {
    id: 's3',
    title: 'Video: FBI Cyber Task Force in Action',
    description: 'Watch how investigators track down international cybercriminals.',
    imageUrl: 'data:image/jpeg;base64,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',
    link: '#',
    type: 'video',
  },
  {
    id: 's4',
    title: 'Secure Your Home Network',
    description: 'Change default router passwords, enable WPA3, and keep firmware updated.',
    imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=350&fit=crop',
    link: '#',
    type: 'tip',
  },
];

const severityColors = {
  critical: 'bg-red-600',
  high: 'bg-orange-500',
  medium: 'bg-yellow-500',
};

const severityBadge = {
  critical: 'CRITICAL',
  high: 'HIGH',
  medium: 'MEDIUM',
};

// Carousel Component
const EducationalCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right'>('right');

  const nextSlide = () => {
    setSlideDirection('right');
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setSlideDirection('left');
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setSlideDirection(index > currentIndex ? 'right' : 'left');
    setCurrentIndex(index);
  };

  const currentSlide = slides[currentIndex];

  return (
    <div className="relative bg-gray-900 rounded-2xl overflow-hidden shadow-xl">
        
      {/* Slides with animation */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <div
          key={currentIndex}
          className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
            slideDirection === 'right' ? 'animate-slideInRight' : 'animate-slideInLeft'
          }`}
        >
          <img src={currentSlide.imageUrl} alt={currentSlide.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
            <div className="flex items-center gap-2 mb-2">
              {currentSlide.type === 'guide' && <FaBookOpen className="text-[#FFD700]" />}
              {currentSlide.type === 'video' && <FaVideo className="text-[#FFD700]" />}
              {currentSlide.type === 'tip' && <FaShieldAlt className="text-[#FFD700]" />}
              <span className="text-xs uppercase tracking-wide bg-[#B22234] px-2 py-0.5 rounded">
                {currentSlide.type}
              </span>
            </div>
            <h3 className="text-xl md:text-2xl font-bold mb-1">{currentSlide.title}</h3>
            <p className="text-sm md:text-base text-gray-200 max-w-2xl">{currentSlide.description}</p>
            <a href={currentSlide.link} className="inline-flex items-center gap-1 mt-2 text-[#FFD700] text-sm font-semibold hover:underline">
              Learn more <FaArrowRight size={12} />
            </a>
          </div>
        </div>
      </div>

      {/* Navigation buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition z-10"
      >
        <FaChevronLeft size={18} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition z-10"
      >
        <FaChevronRight size={18} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2 z-10">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goToSlide(idx)}
            className={`w-2 h-2 rounded-full transition-all ${
              idx === currentIndex ? 'bg-[#FFD700] w-4' : 'bg-white/60'
            }`}
          />
        ))}
      </div>

      {/* Slide animations */}
      <style>{`
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(100%); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-100%); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-slideInRight { animation: slideInRight 0.4s ease-out; }
        .animate-slideInLeft { animation: slideInLeft 0.4s ease-out; }
      `}</style>
    </div>
  );
};

const CyberCrimeCenter: React.FC = () => {
  const [fraudForm, setFraudForm] = useState({ name: '', email: '', fraudType: '', description: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (fraudForm.name && fraudForm.email && fraudForm.description) {
      setFormSubmitted(true);
      setTimeout(() => setFormSubmitted(false), 3000);
      setFraudForm({ name: '', email: '', fraudType: '', description: '' });
    }
  };

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
          <h1 className="text-3xl md:text-4xl font-bold mb-3">FBI Cyber Crime Center</h1>
          <p className="text-gray-200 max-w-2xl mx-auto">
            Your resource for cybersecurity alerts, online fraud reporting, and digital safety education.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        {/* Cybersecurity Alerts Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-[#0B3B60] border-l-4 border-[#B22234] pl-3 mb-6 flex items-center gap-2">
            <FaExclamationTriangle /> Cybersecurity Alerts
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {alertsData.map(alert => (
              <div key={alert.id} className="bg-gray-50 rounded-xl overflow-hidden shadow hover:shadow-md transition">
                <div className={`h-1.5 ${severityColors[alert.severity]}`}></div>
                <div className="p-4">
                  <div className="flex justify-between items-start gap-2 mb-2">
                    <h3 className="font-bold text-[#0B3B60] text-sm leading-tight">{alert.title}</h3>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full text-white ${severityColors[alert.severity]}`}>
                      {severityBadge[alert.severity]}
                    </span>
                  </div>
                  <p className="text-gray-600 text-xs mb-2">{alert.description}</p>
                  <div className="text-xs text-gray-400">Issued: {new Date(alert.date).toLocaleDateString()}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Online Fraud Reporting Section */}
        <section className="mb-16">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-bold text-[#0B3B60] border-l-4 border-[#B22234] pl-3 mb-4 flex items-center gap-2">
                <FaBug /> Report Online Fraud
              </h2>
              <p className="text-gray-700 mb-4 text-sm">
                If you are a victim of cybercrime (ransomware, phishing, identity theft, romance scams, or business email compromise), 
                file a complaint with the <strong className="text-[#B22234]">IC3 (Internet Crime Complaint Center)</strong>.
              </p>
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-4">
                <div className="flex items-center gap-2 text-[#0B3B60] font-semibold">
                  <FaEnvelope /> IC3 Official Portal
                </div>
                <a href="#" className="text-[#B22234] font-mono text-sm break-all hover:underline">www.ic3.gov</a>
                <p className="text-xs text-gray-500 mt-2">24/7 online submission – Anonymous reporting available.</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">⚠️ Do <strong>not</strong> share sensitive information unless you are on the official IC3 website. The FBI will never ask for payment or cryptocurrency.</p>
              </div>
            </div>

            {/* Quick tip form (optional reporting assistance) */}
            <div className="bg-gray-50 rounded-xl p-6 shadow-sm">
              <h3 className="font-bold text-[#0B3B60] mb-3 flex items-center gap-2">
                <FaUserSecret /> Submit a Cyber Tip (Non‑emergency)
              </h3>
              {formSubmitted ? (
                <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-3 rounded">
                  Thank you. Your information has been forwarded to the appropriate unit.
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <input
                    type="text"
                    placeholder="Your name (optional)"
                    value={fraudForm.name}
                    onChange={(e) => setFraudForm({ ...fraudForm, name: e.target.value })}
                    className="w-full mb-3 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#B22234]"
                  />
                  <input
                    type="email"
                    placeholder="Email (optional)"
                    value={fraudForm.email}
                    onChange={(e) => setFraudForm({ ...fraudForm, email: e.target.value })}
                    className="w-full mb-3 px-3 py-2 border rounded-lg"
                  />
                  <select
                    value={fraudForm.fraudType}
                    onChange={(e) => setFraudForm({ ...fraudForm, fraudType: e.target.value })}
                    className="w-full mb-3 px-3 py-2 border rounded-lg"
                  >
                    <option value="">Select fraud type (optional)</option>
                    <option>Phishing</option>
                    <option>Ransomware</option>
                    <option>Business Email Compromise</option>
                    <option>Identity Theft</option>
                    <option>Online Scam</option>
                  </select>
                  <textarea
                    rows={3}
                    placeholder="Brief description of the incident..."
                    value={fraudForm.description}
                    onChange={(e) => setFraudForm({ ...fraudForm, description: e.target.value })}
                    className="w-full mb-3 px-3 py-2 border rounded-lg"
                    required
                  />
                  <button type="submit" className="bg-[#B22234] hover:bg-[#8B1A1A] text-white font-semibold py-2 px-4 rounded-lg transition w-full">
                    Send Tip
                  </button>
                </form>
              )}
              <p className="text-xs text-gray-500 mt-3">For immediate threats, call 911 or 1-800-CALL-FBI.</p>
            </div>
          </div>
        </section>

        {/* Educational Materials – Sliding Carousel */}
        <section>
          <h2 className="text-2xl font-bold text-[#0B3B60] border-l-4 border-[#B22234] pl-3 mb-6 flex items-center gap-2">
            <FaBookOpen /> Educational Materials
          </h2>
          <EducationalCarousel />
          <div className="mt-6 text-center text-sm text-gray-500">
            More resources: <a href="#" className="text-[#B22234] font-semibold hover:underline">FBI Cyber Safety Guides</a> • <a href="#" className="text-[#B22234] font-semibold hover:underline">Stop.Think.Connect.</a>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CyberCrimeCenter;