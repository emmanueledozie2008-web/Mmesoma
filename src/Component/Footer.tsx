import React from 'react';
import { FaTwitter, FaFacebookF, FaYoutube, FaEnvelope, FaPhoneAlt, FaShieldAlt } from 'react-icons/fa';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0B3B60] text-white mt-auto">
      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1: Agency info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-[#B22234] rounded-full flex items-center justify-center">
                <FaShieldAlt className="text-white text-sm" />
              </div>
              <span className="font-bold text-lg tracking-tight">FBI</span>
            </div>
            <p className="text-sm text-gray-300 mb-4">
              Federal Bureau of Investigation<br />
              J. Edgar Hoover Building<br />
              935 Pennsylvania Avenue, NW<br />
              Washington, D.C. 20535-0001
            </p>
            <div className="flex space-x-3">
              <a href="#" className="text-gray-300 hover:text-[#FFD700] transition-colors">
                <FaTwitter size={18} />
              </a>
              <a href="#" className="text-gray-300 hover:text-[#FFD700] transition-colors">
                <FaFacebookF size={18} />
              </a>
              <a href="#" className="text-gray-300 hover:text-[#FFD700] transition-colors">
                <FaYoutube size={18} />
              </a>
            </div>
          </div>

          {/* Column 2: Quick links */}
          <div>
            <h3 className="text-lg font-bold border-b-2 border-[#B22234] inline-block pb-1 mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/most-wanted" className="text-gray-300 hover:text-white transition-colors">FBI Most Wanted</a></li>
              <li><a href="/ten-most-wanted" className="text-gray-300 hover:text-white transition-colors">Ten Most Wanted Fugitives</a></li>
              <li><a href="/tips" className="text-gray-300 hover:text-white transition-colors">Submit a Tip</a></li>
              <li><a href="/jobs" className="text-gray-300 hover:text-white transition-colors">Careers at FBI</a></li>
              <li><a href="/news" className="text-gray-300 hover:text-white transition-colors">Press Room</a></li>
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div>
            <h3 className="text-lg font-bold border-b-2 border-[#B22234] inline-block pb-1 mb-4">
              Resources
            </h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/foia" className="text-gray-300 hover:text-white transition-colors">Freedom of Information Act (FOIA)</a></li>
              <li><a href="/legal" className="text-gray-300 hover:text-white transition-colors">Legal Notices</a></li>
              <li><a href="/privacy" className="text-gray-300 hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="/accessibility" className="text-gray-300 hover:text-white transition-colors">Accessibility</a></li>
              <li><a href="/sitemap" className="text-gray-300 hover:text-white transition-colors">Site Map</a></li>
            </ul>
          </div>

          {/* Column 4: Contact & alert */}
          <div>
            <h3 className="text-lg font-bold border-b-2 border-[#B22234] inline-block pb-1 mb-4">
              Get in Touch
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <FaPhoneAlt className="text-[#FFD700] mt-0.5" />
                <span className="text-gray-300">Emergency: 911</span>
              </div>
              <div className="flex items-start gap-2">
                <FaPhoneAlt className="text-[#FFD700] mt-0.5" />
                <span className="text-gray-300">FBI Tip Line: 1-800-CALL-FBI</span>
              </div>
              <div className="flex items-start gap-2">
                <FaEnvelope className="text-[#FFD700] mt-0.5" />
                <span className="text-gray-300">tips@fbi.gov</span>
              </div>
            </div>
            <div className="mt-6 bg-[#B22234]/20 p-3 rounded-lg border-l-4 border-[#FFD700]">
              <p className="text-xs text-gray-200">
                <strong className="text-[#FFD700]">⚠️ Report Suspicious Activity</strong><br />
                If you see something, say something. Contact your local field office or submit a tip online.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar with official disclaimer */}
        <div className="border-t border-[#B22234]/30 mt-10 pt-6 text-center text-xs text-gray-400">
          <p>
            An official website of the United States government. 
            This site is maintained by the Federal Bureau of Investigation.
          </p>
          <p className="mt-2">
            The FBI seal and the phrase "FBI" are registered trademarks of the Federal Bureau of Investigation.
          </p>
          <p className="mt-4">
            © {currentYear} Federal Bureau of Investigation. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;