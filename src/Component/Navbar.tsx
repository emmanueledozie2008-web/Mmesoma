import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaBars, FaTimes, FaShieldAlt, FaGlobe } from 'react-icons/fa';

interface NavLink {
  name: string;
  href: string;
  external?: boolean;
}

const Navbar: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const { t, i18n } = useTranslation();

  const navLinks: NavLink[] = [
    { name: t('home'), href: '/' },
    { name: t('mostWanted'), href: '/mostwanted' },
    { name: t('history'), href: '/History' },
    { name: t('about'), href: '/About' },
    { name: t('news'), href: '/news' },
    { name: t('investigations'), href: '/Investigations' },
    { name: t('contact'), href: '/ContactPage' },
    { name: t('cyberCrime'), href: '/CybarCrimeCenter' },
    { name: t('usaGov'), href: 'https://www.usa.gov', external: true },
    { name: t('white-House'), href: 'https://www.whitehouse.gov/', external: true },
  ];

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'zh', name: '中文', flag: '🇨🇳' },
  ];

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setIsLangDropdownOpen(false);
    // Close sidebar if it's open (better UX)
    if (isSidebarOpen) setIsSidebarOpen(false);
  };

  const closeSidebar = () => setIsSidebarOpen(false);

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  return (
    <>
      <nav className="sticky top-0 z-40 w-full bg-[#0B3B60] border-b border-[#B22234]/30 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-[#B22234] rounded-full flex items-center justify-center shadow-lg">
                <FaShieldAlt className="text-white text-sm md:text-base" />
              </div>
              <div className="flex flex-col">
                <span className="text-white font-bold text-sm md:text-lg tracking-wider">
                  FEDERAL BUREAU
                </span>
                <span className="text-[#FFD700] text-[10px] md:text-xs tracking-widest -mt-1">
                  OF INVESTIGATION
                </span>
              </div>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-1 lg:space-x-4">
              {navLinks.map((link) =>
                link.external ? (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-2 rounded-md text-sm font-medium text-gray-200 hover:text-white hover:bg-[#B22234]/20 transition-all"
                  >
                    {link.name}
                  </a>
                ) : (
                  <Link
                    key={link.name}
                    to={link.href}
                    className="px-3 py-2 rounded-md text-sm font-medium text-gray-200 hover:text-white hover:bg-[#B22234]/20 transition-all"
                  >
                    {link.name}
                  </Link>
                )
              )}
              {/* Desktop language dropdown */}
              <div className="relative ml-2">
                <button
                  onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-gray-200 hover:text-white hover:bg-[#B22234]/20 transition-all"
                >
                  <FaGlobe size={14} />
                  <span>{currentLanguage.flag} {currentLanguage.name}</span>
                </button>
                {isLangDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden z-50">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => changeLanguage(lang.code)}
                        className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition flex items-center gap-2 ${
                          i18n.language === lang.code ? 'bg-[#B22234]/10 text-[#B22234] font-semibold' : 'text-gray-700'
                        }`}
                      >
                        <span className="text-lg">{lang.flag}</span>
                        <span>{lang.name}</span>
                        {i18n.language === lang.code && <span className="ml-auto">✓</span>}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Mobile: language icon + hamburger (both in top bar) */}
            <div className="flex items-center gap-2 md:hidden">
              {/* Mobile language icon (compact) */}
              <div className="relative">
                <button
                  onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                  className="flex items-center gap-1 p-2 rounded-md text-gray-200 hover:text-white hover:bg-[#B22234]/30 transition-all"
                >
                  <FaGlobe size={18} />
                  <span className="text-sm">{currentLanguage.flag}</span>
                </button>
                {isLangDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden z-50">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => changeLanguage(lang.code)}
                        className={`w-full text-left px-3 py-2 text-xs hover:bg-gray-100 transition flex items-center gap-2 ${
                          i18n.language === lang.code ? 'bg-[#B22234]/10 text-[#B22234] font-semibold' : 'text-gray-700'
                        }`}
                      >
                        <span>{lang.flag}</span>
                        <span>{lang.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
              {/* Hamburger menu button */}
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="p-2 rounded-md text-gray-200 hover:text-white hover:bg-[#B22234]/30"
              >
                <FaBars size={20} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar – includes language selection section */}
      <div
        className={`fixed inset-0 z-50 transition-all duration-300 ${
          isSidebarOpen ? 'visible' : 'invisible'
        }`}
      >
        <div
          className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${
            isSidebarOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={closeSidebar}
        />
        <div
          className={`absolute top-0 left-0 h-full w-64 bg-white shadow-2xl transform transition-transform duration-300 ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="flex items-center justify-between p-4 border-b border-[#B22234]/20">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-[#B22234] rounded-full"></div>
              <span className="font-bold text-[#0B3B60]">{t('fbiPortal')}</span>
            </div>
            <button onClick={closeSidebar} className="p-1 rounded-md text-gray-500 hover:text-[#B22234]">
              <FaTimes size={18} />
            </button>
          </div>
          <div className="flex flex-col p-4 space-y-3">
            {navLinks.map((link) =>
              link.external ? (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeSidebar}
                  className="px-3 py-2 rounded-md text-gray-700 hover:text-[#B22234] hover:bg-[#B22234]/10 transition-colors"
                >
                  {link.name}
                </a>
              ) : (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={closeSidebar}
                  className="px-3 py-2 rounded-md text-gray-700 hover:text-[#B22234] hover:bg-[#B22234]/10 transition-colors"
                >
                  {link.name}
                </Link>
              )
            )}
            {/* Language selection inside sidebar */}
            <div className="pt-4 mt-2 border-t border-gray-200">
              <p className="text-xs text-gray-500 mb-2 flex items-center gap-1">
                <FaGlobe size={10} /> {t('language')}
              </p>
              <div className="flex flex-col gap-2">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => changeLanguage(lang.code)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm transition ${
                      i18n.language === lang.code
                        ? 'bg-[#B22234] text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <span className="text-base">{lang.flag}</span>
                    <span>{lang.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="absolute bottom-4 left-0 right-0 text-center text-xs text-gray-400">
            <p>{t('footerText')}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;