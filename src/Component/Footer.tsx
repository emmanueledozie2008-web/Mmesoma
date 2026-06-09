import React from "react";
import { useTranslation } from "react-i18next";
import {
  FaTwitter,
  FaFacebookF,
  FaYoutube,
  FaEnvelope,
  FaPhoneAlt,
  FaShieldAlt,
} from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";

const Footer: React.FC = () => {
  const { t, i18n } = useTranslation();
  const currentYear = new Date().getFullYear();

  const languages = [
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "es", name: "Español", flag: "🇪🇸" },
    { code: "fr", name: "Français", flag: "🇫🇷" },
    { code: "de", name: "Deutsch", flag: "🇩🇪" },
    { code: "zh", name: "中文", flag: "🇨🇳" },
  ];

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <footer className="bg-[#0B3B60] text-white mt-auto">
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
            <div
              className="text-sm text-gray-300 mb-4"
              dangerouslySetInnerHTML={{ __html: t("footerAddress") }}
            />
            <div className="flex space-x-3 mb-4">
              <a
                href="#"
                className="text-gray-300 hover:text-[#FFD700] transition-colors"
              >
                <FaTwitter size={18} />
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-[#FFD700] transition-colors"
              >
                <FaFacebookF size={18} />
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-[#FFD700] transition-colors"
              >
                <FaYoutube size={18} />
              </a>
            </div>
          </div>

          {/* Column 2: Quick links */}
          <div>
            <h3 className="text-lg font-bold border-b-2 border-[#B22234] inline-block pb-1 mb-4">
              {t("quickLinks")}
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="/Mostwanted"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {t("mostWanted")}
                </a>
              </li>
              <li>
                <a
                  href="/Mostwanted"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {t("Mostwanted")}
                </a>
              </li>
              <li>
                <a
                  href="/History"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {t("/History")}
                </a>
              </li>
              <li>
                <a
                  href="/ContactPage"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {t("Contact-Us")}
                </a>
              </li>
              <li>
                <a
                  href="/News"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {t("pressRoom")}
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div>
            <h3 className="text-lg font-bold border-b-2 border-[#B22234] inline-block pb-1 mb-4">
              {t("resources")}
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="/CybarCrimeCenter"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {t("Cybar-Crime")}
                </a>
              </li>
              <li>
                <a
                  href="/Investigations"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {t("Investigations")}
                </a>
              </li>
              <li>
                <a
                  href="/About"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {t("privacyPolicy")}
                </a>
              </li>
              <li>
                <a
                  href="https://www.usa.gov"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {t("USA-GOV")}
                </a>
              </li>
              <li>
                <a
                  href="https://www.whitehouse.gov/'"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {t("White-House")}
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & language */}

          <div>
            <h3 className="text-lg font-bold border-b-2 border-[#B22234] inline-block pb-1 mb-4">
              {t("getInTouch")}
            </h3>

            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <FaPhoneAlt className="text-[#FFD700] mt-0.5" />
                <span className="text-gray-300">{t("emergency")}</span>
              </div>

              <div className="flex items-start gap-2">
                <FaPhoneAlt className="text-[#FFD700] mt-0.5" />
                <span className="text-gray-300">{t("tipLine")}</span>
              </div>

              <div className="flex items-start gap-2">
                <FaEnvelope className="text-[#FFD700] mt-0.5" />
                <span className="text-gray-300">{t("emailTips")}</span>
              </div>

              {/* WhatsApp Contact */}
              <div className="flex items-start gap-2">
                <FaWhatsapp className="text-green-500 mt-0.5 text-lg" />
                <a
                  href="https://wa.me/+16628218160"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-green-400 transition-colors"
                >
                  +16628218160
                </a>
              </div>
            </div>

            <div className="mt-6 bg-[#B22234]/20 p-3 rounded-lg border-l-4 border-[#FFD700]">
              <p className="text-xs text-gray-200">
                <strong className="text-[#FFD700]">
                  ⚠️ {t("reportSuspicious")}
                </strong>
                <br />
                {t("reportSuspiciousText")}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[#B22234]/30 mt-10 pt-6 text-center text-xs text-gray-400">
          <p>{t("officialNotice")}</p>
          <p className="mt-1">{t("trademarkNotice")}</p>
          <p className="mt-4">{t("copyright", { year: currentYear })}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
