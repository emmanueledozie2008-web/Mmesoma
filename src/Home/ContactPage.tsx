import React, { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import emailjs from "@emailjs/browser";
import { FaWhatsapp } from "react-icons/fa";
import {
  FaEnvelope,
  FaUser,
  FaPhone,
  FaCalendarAlt,
  FaFileAlt,
  FaPaperPlane,
  FaCheckCircle,
  FaExclamationTriangle,
} from "react-icons/fa";
import Navbar from "../Component/Navbar";

// EmailJS configuration – replace with your own
const EMAILJS_SERVICE_ID = "service_heibpfa";
const EMAILJS_TEMPLATE_ID = "template_apxqt3m";
const EMAILJS_PUBLIC_KEY = "G4WYJ6aM4gwc4bbks";

interface FormData {
  name: string;
  email: string;
  phone: string;
  scamType: string;
  incidentDate: string;
  description: string;
  attachment: File | null;
}

const scamTypeKeys = [
  "scamTypePhishing",
  "scamTypeRansomware",
  "scamTypeBEC",
  "scamTypeRomance",
  "scamTypeInvestment",
  "scamTypeTechSupport",
  "scamTypeIdentityTheft",
  "scamTypeOther",
];

const ContactPage: React.FC = () => {
  const { t } = useTranslation();
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    scamType: "",
    incidentDate: "",
    description: "",
    attachment: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, attachment: e.target.files![0] }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");
    setErrorMessage("");

    // Basic validation
    if (
      !formData.name ||
      !formData.email ||
      !formData.scamType ||
      !formData.description
    ) {
      setSubmitStatus("error");
      setErrorMessage(t("validationRequired"));
      setIsSubmitting(false);
      return;
    }

    if (!formData.email.includes("@")) {
      setSubmitStatus("error");
      setErrorMessage(t("validationEmail"));
      setIsSubmitting(false);
      return;
    }

    try {
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone || t("notProvided"),
        scam_type: t(formData.scamType),
        incident_date: formData.incidentDate || t("notSpecified"),
        description: formData.description,
        attachment: formData.attachment
          ? formData.attachment.name
          : t("noFile"),
        reply_to: formData.email,
      };

      const result = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );

      if (result.status === 200) {
        setSubmitStatus("success");
        setFormData({
          name: "",
          email: "",
          phone: "",
          scamType: "",
          incidentDate: "",
          description: "",
          attachment: null,
        });
        if (formRef.current) formRef.current.reset();
      } else {
        throw new Error("Failed to send");
      }
    } catch (error) {
      console.error("EmailJS error:", error);
      setSubmitStatus("error");
      setErrorMessage(t("submitError"));
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus("idle"), 5000);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      {/* Hero */}
      <div className="bg-[#0B3B60] text-white py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-[#B22234] p-3 rounded-full">
              <FaExclamationTriangle className="text-3xl" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            {t("contactTitle")}
          </h1>
          <p className="text-gray-200 max-w-2xl mx-auto">
            {t("contactSubtitle")}
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-[#B22234]/10 px-6 py-4 border-b border-[#B22234]/20">
            <h2 className="text-2xl font-bold text-[#0B3B60] flex items-center gap-2">
              <FaFileAlt /> {t("formTitle")}
            </h2>
            <p className="text-gray-600 text-sm mt-1">{t("formDisclaimer")}</p>
          </div>

          <form ref={formRef} onSubmit={handleSubmit} className="p-6 space-y-5">
            {/* Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                {t("fullName")} *
              </label>
              <div className="relative">
                <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B22234] focus:outline-none"
                  placeholder={t("namePlaceholder")}
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                {t("email")} *
              </label>
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B22234] focus:outline-none"
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                {t("phoneOptional")}
              </label>
              <div className="relative">
                <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B22234] focus:outline-none"
                  placeholder={t("phonePlaceholder")}
                />
              </div>
            </div>

            {/* Scam Type */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                {t("scamType")} *
              </label>
              <select
                name="scamType"
                value={formData.scamType}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B22234] focus:outline-none"
                required
              >
                <option value="">{t("selectCategory")}</option>
                {scamTypeKeys.map((key) => (
                  <option key={key} value={key}>
                    {t(key)}
                  </option>
                ))}
              </select>
            </div>

            {/* Incident Date */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                {t("incidentDateOptional")}
              </label>
              <div className="relative">
                <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="date"
                  name="incidentDate"
                  value={formData.incidentDate}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B22234] focus:outline-none"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                {t("description")} *
              </label>
              <textarea
                name="description"
                rows={6}
                value={formData.description}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B22234] focus:outline-none"
                placeholder={t("descriptionPlaceholder")}
                required
              />
            </div>

            {/* File Attachment */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                {t("attachmentLabel")}
              </label>
              <input
                type="file"
                onChange={handleFileChange}
                accept="image/*,application/pdf,.txt"
                className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#B22234]/10 file:text-[#B22234] hover:file:bg-[#B22234]/20"
              />
              <p className="text-xs text-gray-400 mt-1">
                {t("attachmentHint")}
              </p>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full flex items-center justify-center gap-2 bg-[#B22234] hover:bg-[#8B1A1A] text-white font-semibold py-3 rounded-lg transition-colors ${
                  isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {isSubmitting ? (
                  t("sending")
                ) : (
                  <>
                    <FaPaperPlane /> {t("submitButton")}
                  </>
                )}
              </button>
            </div>

            {/* Status Messages */}
            {submitStatus === "success" && (
              <div className="mt-4 p-4 bg-green-100 border-l-4 border-green-500 text-green-700 rounded">
                <div className="flex items-center gap-2 mb-2">
                  <FaCheckCircle className="text-green-600" />
                  <span className="font-semibold">{t("successMessage")}</span>
                </div>

                <p className="text-sm mb-2">
                  Your report has been submitted successfully. For additional
                  information or follow-up, contact us on WhatsApp:
                </p>

                <a
                  href="https://wa.me/+16628218160"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-green-700 font-semibold hover:text-green-900"
                >
                  <FaWhatsapp className="text-xl text-green-600" />
                  +16628218160
                </a>
              </div>
            )}
            {submitStatus === "error" && (
              <div className="mt-4 p-3 bg-red-100 border-l-4 border-red-500 text-red-700 rounded flex items-center gap-2">
                <FaExclamationTriangle /> {errorMessage || t("genericError")}
              </div>
            )}
          </form>
        </div>

        {/* Footer Note */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>{t("emergencyNote")}</p>
          <p className="mt-2">{t("disclaimerNote")}</p>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
