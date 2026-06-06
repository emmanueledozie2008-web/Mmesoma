import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes, FaShieldAlt } from 'react-icons/fa';

interface NavLink {
  name: string;
  href: string;
  external?: boolean;
}

const Navbar: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navLinks: NavLink[] = [
    { name: 'HOME', href: '/' },
    { name: 'MOST WANTED', href: '/mostwanted' },
    { name: 'HISTORY', href: '/History' },
    { name: 'ABOUT', href: '/About' },
    { name: 'NEWS', href: '/news' },
    { name: 'INVESTIGATIONS', href: '/Investigations' },
    { name: 'CONTACT', href: '/contact' },
    { name: 'CYBER-CRIME', href: '/CybarCrimeCenter' },
    { name: 'USA-GOV', href: 'https://www.usa.gov', external: true },
    { name: 'WHITE-HOUSE', href: 'https://www.whitehouse.gov', external: true },
  ];

  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <>
      {/* Top Navbar */}
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
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="md:hidden p-2 rounded-md text-gray-200 hover:text-white hover:bg-[#B22234]/30"
            >
              <FaBars size={20} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-0 z-50 transition-all duration-300 ${
          isSidebarOpen ? 'visible' : 'invisible'
        }`}
      >
        {/* Overlay */}
        <div
          className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${
            isSidebarOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={closeSidebar}
        />

        {/* Sidebar Panel */}
        <div
          className={`absolute top-0 left-0 h-full w-64 bg-white shadow-2xl transform transition-transform duration-300 ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="flex items-center justify-between p-4 border-b border-[#B22234]/20">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-[#B22234] rounded-full"></div>
              <span className="font-bold text-[#0B3B60]">FBI Portal</span>
            </div>
            <button
              onClick={closeSidebar}
              className="p-1 rounded-md text-gray-500 hover:text-[#B22234]"
            >
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
          </div>

          <div className="absolute bottom-4 left-0 right-0 text-center text-xs text-gray-400">
            <p>FBI.gov • Official Site</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;