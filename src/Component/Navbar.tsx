import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  FaBars,
  FaTimes,
  FaShieldAlt,
  FaGripLines,
} from 'react-icons/fa';

interface Position {
  x: number;
  y: number;
}

const Navbar: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [dragPosition, setDragPosition] = useState<Position>({
    x: 20,
    y: 20,
  });
  const [isDragging, setIsDragging] = useState(false);

  const dragRef = useRef<HTMLDivElement>(null);
  const dragOffset = useRef<Position>({
    x: 0,
    y: 0,
  });

  const navLinks = [
    { name: 'HOME', href: '/' },
    { name: 'MOST WANTED', href: '/mostwanted' },
    { name: 'TEN MOST WANTED', href: '/ten-most-wanted' },
    { name: 'NEWS', href: '/news' },
    { name: 'CONTACT', href: '/contact' },
  ];

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!dragRef.current) return;

    setIsDragging(true);

    const rect = dragRef.current.getBoundingClientRect();

    dragOffset.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };

    e.preventDefault();
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!dragRef.current) return;

    setIsDragging(true);

    const touch = e.touches[0];
    const rect = dragRef.current.getBoundingClientRect();

    dragOffset.current = {
      x: touch.clientX - rect.left,
      y: touch.clientY - rect.top,
    };

    e.preventDefault();
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;

      let newX = e.clientX - dragOffset.current.x;
      let newY = e.clientY - dragOffset.current.y;

      newX = Math.min(
        window.innerWidth - (dragRef.current?.offsetWidth || 120),
        Math.max(0, newX)
      );

      newY = Math.min(
        window.innerHeight - (dragRef.current?.offsetHeight || 50),
        Math.max(0, newY)
      );

      setDragPosition({
        x: newX,
        y: newY,
      });
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging) return;

      const touch = e.touches[0];

      let newX = touch.clientX - dragOffset.current.x;
      let newY = touch.clientY - dragOffset.current.y;

      newX = Math.min(
        window.innerWidth - (dragRef.current?.offsetWidth || 120),
        Math.max(0, newX)
      );

      newY = Math.min(
        window.innerHeight - (dragRef.current?.offsetHeight || 50),
        Math.max(0, newY)
      );

      setDragPosition({
        x: newX,
        y: newY,
      });
    };

    const handleUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleUp);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleUp);
    };
  }, [isDragging]);

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
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="px-3 py-2 rounded-md text-sm font-medium text-gray-200 hover:text-white hover:bg-[#B22234]/20 transition-all"
                >
                  {link.name}
                </Link>
              ))}
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
          onClick={() => setIsSidebarOpen(false)}
        />

        {/* Sidebar */}
        <div
          className={`absolute top-0 left-0 h-full w-64 bg-white shadow-2xl transform transition-transform duration-300 ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="flex items-center justify-between p-4 border-b border-[#B22234]/20">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-[#B22234] rounded-full"></div>
              <span className="font-bold text-[#0B3B60]">
                FBI Portal
              </span>
            </div>

            <button
              onClick={() => setIsSidebarOpen(false)}
              className="p-1 rounded-md text-gray-500 hover:text-[#B22234]"
            >
              <FaTimes size={18} />
            </button>
          </div>

          <div className="flex flex-col p-4 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                onClick={() => setIsSidebarOpen(false)}
                className="px-3 py-2 rounded-md text-gray-700 hover:text-[#B22234] hover:bg-[#B22234]/10 transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="absolute bottom-4 left-0 right-0 text-center text-xs text-gray-400">
            <p>FBI.gov • Official Site</p>
          </div>
        </div>
      </div>

      {/* Draggable Widget */}
      <div
        ref={dragRef}
        className="fixed z-50 cursor-grab active:cursor-grabbing bg-[#0B3B60]/90 backdrop-blur-sm text-white px-4 py-2 rounded-full shadow-lg border border-[#FFD700]/50 flex items-center gap-2 select-none"
        style={{
          left: `${dragPosition.x}px`,
          top: `${dragPosition.y}px`,
        }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        <FaGripLines className="text-[#FFD700]" />
        <span className="text-sm font-medium tracking-wide">
          🔹 Main FBI Website
        </span>
      </div>
    </>
  );
};

export default Navbar;