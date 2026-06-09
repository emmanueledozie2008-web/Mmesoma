import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import emailjs from '@emailjs/browser';
import { 
  FaShieldAlt,  FaBug, 
  FaEnvelope, FaUserSecret,
  
  FaPaperPlane
} from 'react-icons/fa';
import Navbar from '../Component/Navbar';
import Footer from '../Component/Footer';

// EmailJS configuration – replace with your own
const EMAILJS_SERVICE_ID = 'service_piu02te';
const EMAILJS_TEMPLATE_ID = 'template_nq8nx4j';
const EMAILJS_PUBLIC_KEY = '6gf9TWqZfHZDVz8S9';

// ... (keep all existing alert data, slide data, and carousel component as before)

const CyberCrimeCenter: React.FC = () => {
  const { t } = useTranslation();
  const [fraudForm, setFraudForm] = useState({ name: '', email: '', fraudType: '', description: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const formRef = useRef<HTMLFormElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFraudForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fraudForm.description.trim()) {
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 3000);
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const templateParams = {
        from_name: fraudForm.name || 'Anonymous',
        from_email: fraudForm.email || 'no-reply@example.com',
        fraud_type: fraudForm.fraudType || 'Not specified',
        description: fraudForm.description,
        reply_to: fraudForm.email || 'no-reply@example.com',
      };

      const result = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );

      if (result.status === 200) {
        setSubmitStatus('success');
        setFraudForm({ name: '', email: '', fraudType: '', description: '' });
        if (formRef.current) formRef.current.reset();
      } else {
        throw new Error('Failed to send');
      }
    } catch (error) {
      console.error('EmailJS error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }
  };

  return (
    <div className="bg-white min-h-screen">
      <Navbar/>
      {/* Hero (unchanged) */}
      <div className="bg-[#0B3B60] text-white py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-[#B22234] p-3 rounded-full">
              <FaShieldAlt className="text-3xl" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">{t('cyberTitle')}</h1>
          <p className="text-gray-200 max-w-2xl mx-auto">{t('cyberSubtitle')}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        {/* Cybersecurity Alerts Section (unchanged) */}
        {/* ... keep existing alerts grid ... */}

        {/* Online Fraud Reporting Section */}
        <section className="mb-16">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-bold text-[#0B3B60] border-l-4 border-[#B22234] pl-3 mb-4 flex items-center gap-2">
                <FaBug /> {t('reportOnlineFraud')}
              </h2>
              <p className="text-gray-700 mb-4 text-sm">{t('ic3Description')}</p>
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-4">
                <div className="flex items-center gap-2 text-[#0B3B60] font-semibold">
                  <FaEnvelope /> {t('ic3Portal')}
                </div>
                <a href="#" className="text-[#B22234] font-mono text-sm break-all hover:underline">www.ic3.gov</a>
                <p className="text-xs text-gray-500 mt-2">{t('ic3Available')}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">{t('ic3Warning')}</p>
              </div>
            </div>

            {/* Submit a Cyber Tip Form with EmailJS */}
            <div className="bg-gray-50 rounded-xl p-6 shadow-sm">
              <h3 className="font-bold text-[#0B3B60] mb-3 flex items-center gap-2">
                <FaUserSecret /> {t('submitCyberTip')}
              </h3>
              {submitStatus === 'success' && (
                <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-3 rounded mb-4">
                  {t('tipSuccess')}
                </div>
              )}
              {submitStatus === 'error' && (
                <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-3 rounded mb-4">
                  {t('tipError')}
                </div>
              )}
              <form ref={formRef} onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="name"
                  placeholder={t('yourName')}
                  value={fraudForm.name}
                  onChange={handleChange}
                  className="w-full mb-3 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#B22234]"
                />
                <input
                  type="email"
                  name="email"
                  placeholder={t('yourEmail')}
                  value={fraudForm.email}
                  onChange={handleChange}
                  className="w-full mb-3 px-3 py-2 border rounded-lg"
                />
                <select
                  name="fraudType"
                  value={fraudForm.fraudType}
                  onChange={handleChange}
                  className="w-full mb-3 px-3 py-2 border rounded-lg"
                >
                  <option value="">{t('selectFraudType')}</option>
                  <option>{t('fraudTypePhishing')}</option>
                  <option>{t('fraudTypeRansomware')}</option>
                  <option>{t('fraudTypeBEC')}</option>
                  <option>{t('fraudTypeIdentityTheft')}</option>
                  <option>{t('fraudTypeOnlineScam')}</option>
                </select>
                <textarea
                  name="description"
                  rows={4}
                  placeholder={t('briefDescription')}
                  value={fraudForm.description}
                  onChange={handleChange}
                  className="w-full mb-3 px-3 py-2 border rounded-lg"
                  required
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full bg-[#B22234] hover:bg-[#8B1A1A] text-white font-semibold py-2 rounded-lg transition flex items-center justify-center gap-2 ${
                    isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting ? t('sending') : <><FaPaperPlane /> {t('sendTip')}</>}
                </button>
              </form>
              <p className="text-xs text-gray-500 mt-3">{t('tipDisclaimer')}</p>
            </div>
          </div>
        </section>
        <Footer/>

        {/* Educational Materials Carousel (unchanged) */}
        {/* ... keep the existing carousel section ... */}
      </div>
    </div>
  );
};

export default CyberCrimeCenter;