import React, { useState, useEffect } from 'react';
import { 
  FaQuestionCircle, FaPhoneAlt,  FaEnvelope, 
   FaLightbulb, FaChevronDown, FaChevronUp,
  FaUserSecret,  FaFileAlt
} from 'react-icons/fa';

// FAQ data structure
interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'reporting' | 'safety';
}

const faqData: FAQItem[] = [
  // General questions
  {
    id: 'gen1',
    question: 'What is the FBI’s primary mission?',
    answer: 'The FBI’s mission is to protect the American people and uphold the Constitution of the United States. We investigate federal crimes, counter terrorism and espionage, combat cyber threats, and support law enforcement partners.',
    category: 'general',
  },
  {
    id: 'gen2',
    question: 'How do I verify an FBI agent’s identity?',
    answer: 'Ask for official credentials (badge and ID card). You can also call your local FBI field office to verify the agent’s identity. Never share personal information without verification.',
    category: 'general',
  },
  {
    id: 'gen3',
    question: 'Does the FBI have a toll-free number?',
    answer: 'Yes, the FBI Tips Line is 1-800-CALL-FBI (1-800-225-5324). For emergencies, always call 911 first.',
    category: 'general',
  },
  // Reporting procedures
  {
    id: 'rep1',
    question: 'How do I report a crime to the FBI?',
    answer: 'You can report online at tips.fbi.gov, call 1-800-CALL-FBI, or contact your nearest FBI field office. Provide as much detail as possible – dates, names, locations, and evidence.',
    category: 'reporting',
  },
  {
    id: 'rep2',
    question: 'Can I report anonymously?',
    answer: 'Yes. The FBI accepts anonymous tips online or by phone. However, providing contact information may help investigators follow up or reward you if a reward is offered.',
    category: 'reporting',
  },
  {
    id: 'rep3',
    question: 'What happens after I submit a tip?',
    answer: 'Trained analysts review all submissions. If your tip contains actionable intelligence, an agent may contact you (if you left contact info). Due to volume, you may not receive a direct response.',
    category: 'reporting',
  },
  {
    id: 'rep4',
    question: 'How do I report cybercrime (hacking, ransomware, online fraud)?',
    answer: 'File a complaint with the IC3 (Internet Crime Complaint Center) at ic3.gov. The FBI works with partners to investigate major cyberattacks.',
    category: 'reporting',
  },
  // Safety information
  {
    id: 'saf1',
    question: 'What should I do if I see suspicious activity?',
    answer: 'If you see something, say something. Report to local law enforcement or call the FBI Tips Line. Do not confront suspects. Note descriptions, vehicles, or license plates from a safe distance.',
    category: 'safety',
  },
  {
    id: 'saf2',
    question: 'How can I protect myself from scams?',
    answer: 'Never send money or personal info to unsolicited callers/emails. Hang up on “government imposters” demanding payment. Enable two‑factor authentication and monitor financial accounts.',
    category: 'safety',
  },
  {
    id: 'saf3',
    question: 'What is the “Run, Hide, Fight” protocol?',
    answer: 'In an active shooter situation: Run – evacuate if possible. Hide – find a secure location if you cannot escape. Fight – as a last resort, disrupt the shooter using any available objects.',
    category: 'safety',
  },
  {
    id: 'saf4',
    question: 'How do I keep my children safe online?',
    answer: 'Use parental controls, educate about not sharing personal information, and report suspicious behavior to the FBI’s Crimes Against Children task force or NCMEC (1-800-THE-LOST).',
    category: 'safety',
  },
];

// Emergency Contacts Widget (interactive)
const EmergencyWidget: React.FC = () => {
  const [tipIndex, setTipIndex] = useState(0);
  const safetyTips = [
    "Always verify caller ID – scammers spoof FBI numbers.",
    "Never share passwords or one‑time codes with anyone.",
    "If you receive a threat, preserve all evidence (screenshots, call logs).",
    "Report suspicious emails to phishing-report@us-cert.gov.",
  ];
  useEffect(() => {
    const interval = setInterval(() => {
      setTipIndex((prev) => (prev + 1) % safetyTips.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="bg-[#0B3B60] text-white rounded-xl shadow-lg p-5">
      <h3 className="text-lg font-bold flex items-center gap-2 mb-3 border-b border-[#FFD700]/30 pb-2">
        <FaPhoneAlt className="text-[#FFD700]" /> Emergency & Safety Hub
      </h3>
      <div className="space-y-3 text-sm">
        <div className="flex justify-between items-center">
          <span>📞 FBI Tips Line:</span>
          <span className="font-mono font-bold">1-800-CALL-FBI</span>
        </div>
        <div className="flex justify-between items-center">
          <span>🖥️ Online Tips:</span>
          <a href="#" className="text-[#FFD700] hover:underline">tips.fbi.gov</a>
        </div>
        <div className="flex justify-between items-center">
          <span>🚨 Emergencies:</span>
          <span className="font-bold">911</span>
        </div>
        <div className="mt-3 pt-2 border-t border-white/20">
          <div className="flex items-start gap-2">
            <FaLightbulb className="text-[#FFD700] mt-0.5" />
            <div>
              <p className="text-xs font-semibold">Safety Tip of the Moment</p>
              <p className="text-xs opacity-90">{safetyTips[tipIndex]}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Accordion component for FAQ items
const AccordionItem: React.FC<{ item: FAQItem; isOpen: boolean; onToggle: () => void }> = ({ item, isOpen, onToggle }) => {
  return (
    <div className="border border-gray-200 rounded-lg mb-3 overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full px-5 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
      >
        <span className="font-semibold text-[#0B3B60]">{item.question}</span>
        {isOpen ? <FaChevronUp className="text-gray-500" /> : <FaChevronDown className="text-gray-500" />}
      </button>
      {isOpen && (
        <div className="px-5 pb-4 pt-0 text-gray-600 text-sm border-t border-gray-100">
          {item.answer}
        </div>
      )}
    </div>
  );
};

const FAQPage: React.FC = () => {
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
    general: 'Common Questions',
    reporting: 'Reporting Procedures',
    safety: 'Safety Information',
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
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Frequently Asked Questions</h1>
          <p className="text-gray-200 max-w-2xl mx-auto">
            Find answers to common questions about the FBI, reporting crimes, and staying safe.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left column: Category navigation + Widget */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* Category selector */}
              <div className="bg-gray-50 rounded-xl p-5 shadow-sm">
                <h3 className="font-bold text-[#0B3B60] mb-3 flex items-center gap-2">
                  <FaFileAlt /> Browse by Topic
                </h3>
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => setActiveCategory('general')}
                    className={`text-left px-4 py-2 rounded-lg transition ${
                      activeCategory === 'general'
                        ? 'bg-[#B22234] text-white'
                        : 'hover:bg-gray-200 text-gray-700'
                    }`}
                  >
                    📖 Common Questions
                  </button>
                  <button
                    onClick={() => setActiveCategory('reporting')}
                    className={`text-left px-4 py-2 rounded-lg transition ${
                      activeCategory === 'reporting'
                        ? 'bg-[#B22234] text-white'
                        : 'hover:bg-gray-200 text-gray-700'
                    }`}
                  >
                    📞 Reporting Procedures
                  </button>
                  <button
                    onClick={() => setActiveCategory('safety')}
                    className={`text-left px-4 py-2 rounded-lg transition ${
                      activeCategory === 'safety'
                        ? 'bg-[#B22234] text-white'
                        : 'hover:bg-gray-200 text-gray-700'
                    }`}
                  >
                    🛡️ Safety Information
                  </button>
                </div>
              </div>
              {/* Interactive Widget */}
              <EmergencyWidget />
              {/* Additional quick link */}
              <div className="bg-[#B22234]/10 rounded-xl p-4 text-center">
                <FaUserSecret className="text-2xl text-[#B22234] mx-auto mb-2" />
                <p className="text-xs text-gray-600">
                  Your cooperation helps keep communities safe.
                </p>
              </div>
            </div>
          </div>

          {/* Right column: FAQ accordions */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-[#0B3B60] border-l-4 border-[#B22234] pl-3">
                {categoryLabels[activeCategory]}
              </h2>
              <p className="text-gray-500 mt-1">
                {activeCategory === 'general' && 'General information about the FBI and its operations.'}
                {activeCategory === 'reporting' && 'How to report crimes, submit tips, and work with the FBI.'}
                {activeCategory === 'safety' && 'Guidance to protect yourself, your family, and your community.'}
              </p>
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
            {/* Footer note */}
            <div className="mt-8 p-4 bg-gray-50 rounded-lg text-center text-sm text-gray-500">
              <FaEnvelope className="inline mr-1" /> Still have questions? Contact your local FBI field office or call <span className="font-bold text-[#B22234]">1-800-CALL-FBI</span>.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;