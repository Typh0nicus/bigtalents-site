"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiCheck, FiUser, FiMessageSquare, FiStar, FiAlertCircle, FiSave, FiLoader } from "react-icons/fi";
import { FaYoutube, FaTwitch, FaDiscord } from "react-icons/fa";
import { SiTiktok } from "react-icons/si";
import Link from "next/link";

type Platform = "youtube" | "twitch" | "tiktok";
type CreatorTier = "academy" | "partner" | "elite";

interface PlatformData {
  platform: Platform;
  handle: string;
  url: string;
  subscribers?: number;
  followers?: number;
  views60d?: number;
  avgCCV?: number;
  hours60d?: number;
}

interface FormData {
  name: string;
  email: string;
  discordId: string;
  supercellCreatorCode: string;
  platforms: PlatformData[];
  motivation: string;
  availability: string;
  preferredTier: CreatorTier;
  agreedToTerms: boolean;
}

const initialFormData: FormData = {
  name: "",
  email: "",
  discordId: "",
  supercellCreatorCode: "",
  platforms: [],
  motivation: "",
  availability: "",
  preferredTier: "partner",
  agreedToTerms: false,
};

const PLATFORM_CONFIG = {
  youtube: {
    icon: FaYoutube,
    color: "text-red-500",
    name: "YouTube",
    fields: ["subscribers", "views60d"],
    placeholder: "https://youtube.com/@yourhandle",
    bgColor: "bg-red-500/10",
  },
  twitch: {
    icon: FaTwitch,
    color: "text-purple-500",
    name: "Twitch",
    fields: ["followers", "views60d", "avgCCV", "hours60d"],
    placeholder: "https://twitch.tv/yourhandle",
    bgColor: "bg-purple-500/10",
  },
  tiktok: {
    icon: SiTiktok,
    color: "text-white",
    name: "TikTok",
    fields: ["followers", "views60d"],
    placeholder: "https://tiktok.com/@yourhandle",
    bgColor: "bg-white/10",
  },
};

const TIER_INFO = {
  academy: {
    name: "BGT Academy",
    description: "Learning & Growth - 5K+ YouTube or 3K+ Twitch or 15K+ TikTok",
    color: "from-blue-500 to-cyan-500",
    iconBg: "bg-blue-500/10",
    iconColor: "text-blue-400",
  },
  partner: {
    name: "BGT Partner",
    description: "Revenue Sharing - 35K+ YouTube or 10K+ Twitch or 100K+ TikTok",
    color: "from-[#D4AF37] to-[#FFD700]",
    iconBg: "bg-[#D4AF37]/10",
    iconColor: "text-[#D4AF37]",
  },
  elite: {
    name: "BGT Elite",
    description: "Professional - 100K+ YouTube or 50K+ Twitch or 500K+ TikTok",
    color: "from-purple-500 to-pink-500",
    iconBg: "bg-purple-500/10",
    iconColor: "text-purple-400",
  },
};

const STORAGE_KEY = "bgt_creator_application";

export function CreatorApplication() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [currentStep, setCurrentStep] = useState(1);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  // Auto-save to localStorage
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setFormData(parsed);
        setLastSaved(new Date());
      } catch {
        console.error("Failed to load saved form data");
      }
    }
  }, []);

  const saveToLocalStorage = useCallback(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
      setLastSaved(new Date());
    } catch {
      console.error("Failed to save form data");
    }
  }, [formData]);

  useEffect(() => {
    const timer = setTimeout(saveToLocalStorage, 1000);
    return () => clearTimeout(timer);
  }, [formData, saveToLocalStorage]);

  const addPlatform = (platform: Platform) => {
    setFormData((prev) => ({
      ...prev,
      platforms: [
        ...prev.platforms,
        {
          platform,
          handle: "",
          url: "",
          subscribers: undefined,
          followers: undefined,
          views60d: 0,
          avgCCV: undefined,
          hours60d: undefined,
        },
      ],
    }));
  };

  const removePlatform = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      platforms: prev.platforms.filter((_, i) => i !== index),
    }));
  };

  const updatePlatform = (index: number, field: string, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      platforms: prev.platforms.map((platform, i) =>
        i === index ? { ...platform, [field]: value } : platform
      ),
    }));
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!formData.name.trim()) newErrors.name = "Name is required";
      if (!formData.email.trim()) newErrors.email = "Email is required";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Valid email is required";
      if (!formData.discordId.trim()) newErrors.discordId = "Discord ID is required";
    }

    if (step === 2) {
      if (formData.platforms.length === 0) newErrors.platforms = "At least one platform is required";

      formData.platforms.forEach((platform, index) => {
        if (!platform.handle.trim()) newErrors[`platform_${index}_handle`] = "Handle is required";
        if (!platform.url.trim()) newErrors[`platform_${index}_url`] = "URL is required";
        if (!platform.views60d || platform.views60d <= 0)
          newErrors[`platform_${index}_views`] = "Views in last 60 days is required";

        if (platform.platform === "youtube" && (!platform.subscribers || platform.subscribers <= 0)) {
          newErrors[`platform_${index}_subs`] = "Subscriber count is required for YouTube";
        }
        if (platform.platform === "twitch") {
          if (!platform.followers || platform.followers <= 0) {
            newErrors[`platform_${index}_followers`] = "Follower count is required for Twitch";
          }
          if (!platform.avgCCV || platform.avgCCV <= 0) {
            newErrors[`platform_${index}_ccv`] = "Average CCV is required for Twitch";
          }
          if (!platform.hours60d || platform.hours60d <= 0) {
            newErrors[`platform_${index}_hours`] = "Stream hours in last 60 days is required for Twitch";
          }
        }
        if (platform.platform === "tiktok" && (!platform.followers || platform.followers <= 0)) {
          newErrors[`platform_${index}_followers`] = "Follower count is required for TikTok";
        }
      });
    }

    if (step === 3) {
      if (!formData.motivation.trim()) newErrors.motivation = "Motivation is required";
      if (formData.motivation.trim().length < 50) newErrors.motivation = "Please provide at least 50 characters";
      if (!formData.availability.trim()) newErrors.availability = "Availability is required";
      if (!formData.agreedToTerms) newErrors.terms = "You must agree to the terms";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 3));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateStep(3)) return;

    setIsSubmitting(true);
    setErrors({});

    try {
      // Prepare data for Discord webhook
      const applicationData = {
        fullName: formData.name,
        email: formData.email,
        discordUsername: formData.discordId,
        tier: formData.preferredTier,
        supercellCreator: !!formData.supercellCreatorCode,
        supercellCode: formData.supercellCreatorCode,
        platforms: formData.platforms,
        motivation: formData.motivation,
        availability: formData.availability,
      };

      console.log("Submitting application:", applicationData);

      const response = await fetch('/api/creator-program/apply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(applicationData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit application');
      }

      localStorage.removeItem(STORAGE_KEY);
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error("Submission failed:", error);
      setErrors({ submit: error instanceof Error ? error.message : "Submission failed. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="container py-20 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl mx-auto text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex p-8 bg-green-500/10 text-green-400 rounded-full mb-8"
          >
            <FiCheck size={64} />
          </motion.div>
          <h2 className="text-3xl md:text-4xl font-black mb-6">Application Submitted!</h2>
          <p className="text-lg text-white/70 mb-8 leading-relaxed px-4">
            Thank you for applying to the BGT Creator Program. We&apos;ll review your application
            within <span className="text-[#D4AF37] font-semibold">10 business days</span> and contact you via Discord or email with the next steps.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
            <Link
              href="/creator-program"
              className="btn btn-outline rounded-2xl px-8 py-4"
            >
              Back to Creator Program
            </Link>
            <a
              href="https://discord.gg/bgt"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary rounded-2xl px-8 py-4 inline-flex items-center justify-center gap-2"
            >
              <FaDiscord /> Join Our Discord
            </a>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="container py-20 px-4 select-none overflow-x-hidden">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 px-4">Apply to BGT Creator Program</h1>
          <p className="text-base sm:text-lg text-white/70 max-w-2xl mx-auto leading-relaxed px-4">
            Join the most exclusive creator program in Brawl Stars esports.
            Complete the application below to get started on your journey.
          </p>
          
          {lastSaved && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="inline-flex items-center gap-2 mt-4 text-sm text-green-400"
            >
              <FiSave size={14} />
              <span>Auto-saved {new Date(lastSaved).toLocaleTimeString()}</span>
            </motion.div>
          )}
        </motion.div>

        {/* Progress Bar */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="mb-12 px-4">
          <div className="flex items-center justify-center mb-4">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <motion.div
                  initial={false}
                  animate={{
                    scale: currentStep === step ? 1.1 : 1,
                  }}
                  className={`
                    w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300
                    ${currentStep >= step ? "bg-[#D4AF37] text-black shadow-lg shadow-[#D4AF37]/30" : "bg-white/10 text-white/60"}
                  `}
                >
                  {currentStep > step ? <FiCheck size={18} /> : step}
                </motion.div>
                {step < 3 && (
                  <motion.div
                    initial={false}
                    animate={{
                      backgroundColor: currentStep > step ? "rgba(212, 175, 55, 1)" : "rgba(255, 255, 255, 0.2)"
                    }}
                    className="w-12 sm:w-20 h-1 mx-2 sm:mx-3 rounded-full transition-all duration-300"
                  />
                )}
              </div>
            ))}
          </div>
          <div className="text-center text-sm text-white/60">
            Step {currentStep} of 3: {currentStep === 1 ? "Personal Information" : currentStep === 2 ? "Platform Information" : "Additional Details"}
          </div>
        </motion.div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          <AnimatePresence mode="wait">
            {/* Step 1 */}
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="card p-4 sm:p-6 md:p-8"
              >
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-3 bg-[#D4AF37]/10 rounded-xl">
                    <FiUser className="text-[#D4AF37]" size={20} />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold">Personal Information</h3>
                </div>

                <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-white/90">Full Name *</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                      className={`w-full px-4 py-3 bg-white/5 border rounded-xl focus:outline-none transition-all duration-200 text-base ${
                        errors.name ? 'border-red-500 focus:border-red-500' : 'border-white/20 focus:border-[#D4AF37]'
                      }`}
                      placeholder="John Doe"
                    />
                    <AnimatePresence>
                      {errors.name && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="text-red-400 text-sm mt-2 flex items-center gap-1"
                        >
                          <FiAlertCircle size={14} /> {errors.name}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2 text-white/90">Email *</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                      className={`w-full px-4 py-3 bg-white/5 border rounded-xl focus:outline-none transition-all duration-200 text-base ${
                        errors.email ? 'border-red-500 focus:border-red-500' : 'border-white/20 focus:border-[#D4AF37]'
                      }`}
                      placeholder="john@example.com"
                    />
                    <AnimatePresence>
                      {errors.email && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="text-red-400 text-sm mt-2 flex items-center gap-1"
                        >
                          <FiAlertCircle size={14} /> {errors.email}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2 text-white/90">Discord ID *</label>
                    <input
                      type="text"
                      value={formData.discordId}
                      onChange={(e) => setFormData((prev) => ({ ...prev, discordId: e.target.value }))}
                      className={`w-full px-4 py-3 bg-white/5 border rounded-xl focus:outline-none transition-all duration-200 text-base ${
                        errors.discordId ? 'border-red-500 focus:border-red-500' : 'border-white/20 focus:border-[#D4AF37]'
                      }`}
                      placeholder="username"
                    />
                    <AnimatePresence>
                      {errors.discordId && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="text-red-400 text-sm mt-2 flex items-center gap-1"
                        >
                          <FiAlertCircle size={14} /> {errors.discordId}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2 text-white/90">
                      Supercell Creator Code
                      <span className="text-white/50 text-xs ml-2">(Optional)</span>
                    </label>
                    <input
                      type="text"
                      value={formData.supercellCreatorCode}
                      onChange={(e) => setFormData((prev) => ({ ...prev, supercellCreatorCode: e.target.value }))}
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl focus:border-[#D4AF37] focus:outline-none transition-all duration-200 text-base"
                      placeholder="For T2+ status"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 2 - Platform Info - MOBILE OPTIMIZED */}
            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="card p-4 sm:p-6 md:p-8"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-[#D4AF37]/10 rounded-xl">
                      <FiStar className="text-[#D4AF37]" size={20} />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold">Platform Information</h3>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {Object.entries(PLATFORM_CONFIG).map(([platform, config]) => (
                      <motion.button
                        key={platform}
                        type="button"
                        onClick={() => addPlatform(platform as Platform)}
                        disabled={formData.platforms.some((p) => p.platform === platform)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`p-3 border border-white/20 rounded-xl hover:border-[#D4AF37] disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 ${config.bgColor}`}
                        title={`Add ${config.name}`}
                      >
                        <config.icon className={config.color} size={20} />
                      </motion.button>
                    ))}
                  </div>
                </div>

                {formData.platforms.length === 0 ? (
                  <div className="text-center py-12 sm:py-16 border-2 border-dashed border-white/20 rounded-2xl bg-white/[0.02]">
                    <FiStar className="text-white/30 text-4xl sm:text-5xl mx-auto mb-4" />
                    <p className="text-white/60 text-base sm:text-lg mb-2 font-medium px-4">Add Your First Platform</p>
                    <p className="text-white/40 text-sm px-4">Click the platform icons above to get started</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {formData.platforms.map((platform, index) => {
                      const config = PLATFORM_CONFIG[platform.platform];
                      const IconComponent = config.icon;

                      return (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="border border-white/15 rounded-2xl p-4 sm:p-6 bg-white/[0.02] hover:bg-white/[0.04] transition-colors duration-200"
                        >
                          <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                              <IconComponent className={config.color} size={24} />
                              <span className="font-semibold text-base sm:text-lg">{config.name}</span>
                            </div>
                            <motion.button
                              type="button"
                              onClick={() => removePlatform(index)}
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors duration-200"
                            >
                              <FiX size={20} />
                            </motion.button>
                          </div>

                          <div className="grid sm:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-semibold mb-2 text-white/90">Handle/Username *</label>
                              <input
                                type="text"
                                value={platform.handle}
                                onChange={(e) => updatePlatform(index, "handle", e.target.value)}
                                className={`w-full px-4 py-3 bg-white/5 border rounded-xl focus:outline-none transition-all duration-200 text-base ${
                                  errors[`platform_${index}_handle`] ? 'border-red-500' : 'border-white/20 focus:border-[#D4AF37]'
                                }`}
                                placeholder="@yourhandle"
                              />
                              <AnimatePresence>
                                {errors[`platform_${index}_handle`] && (
                                  <motion.p
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                    className="text-red-400 text-sm mt-2 flex items-center gap-1"
                                  >
                                    <FiAlertCircle size={14} /> {errors[`platform_${index}_handle`]}
                                  </motion.p>
                                )}
                              </AnimatePresence>
                            </div>

                            <div>
                              <label className="block text-sm font-semibold mb-2 text-white/90">Channel/Profile URL *</label>
                              <input
                                type="url"
                                value={platform.url}
                                onChange={(e) => updatePlatform(index, "url", e.target.value)}
                                className={`w-full px-4 py-3 bg-white/5 border rounded-xl focus:outline-none transition-all duration-200 text-base ${
                                  errors[`platform_${index}_url`] ? 'border-red-500' : 'border-white/20 focus:border-[#D4AF37]'
                                }`}
                                placeholder={config.placeholder}
                              />
                              <AnimatePresence>
                                {errors[`platform_${index}_url`] && (
                                  <motion.p
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                    className="text-red-400 text-sm mt-2 flex items-center gap-1"
                                  >
                                    <FiAlertCircle size={14} /> {errors[`platform_${index}_url`]}
                                  </motion.p>
                                )}
                              </AnimatePresence>
                            </div>

                            {/* Dynamic platform-specific fields */}
                            {config.fields.includes("subscribers") && (
                              <div>
                                <label className="block text-sm font-semibold mb-2 text-white/90">Subscribers *</label>
                                <input
                                  type="number"
                                  value={platform.subscribers || ""}
                                  onChange={(e) => updatePlatform(index, "subscribers", parseInt(e.target.value) || 0)}
                                  className={`w-full px-4 py-3 bg-white/5 border rounded-xl focus:outline-none transition-all duration-200 text-base ${
                                    errors[`platform_${index}_subs`] ? 'border-red-500' : 'border-white/20 focus:border-[#D4AF37]'
                                  }`}
                                  placeholder="5000"
                                />
                                <AnimatePresence>
                                  {errors[`platform_${index}_subs`] && (
                                    <motion.p
                                      initial={{ opacity: 0, y: -10 }}
                                      animate={{ opacity: 1, y: 0 }}
                                      exit={{ opacity: 0 }}
                                      className="text-red-400 text-sm mt-2 flex items-center gap-1"
                                    >
                                      <FiAlertCircle size={14} /> {errors[`platform_${index}_subs`]}
                                    </motion.p>
                                  )}
                                </AnimatePresence>
                              </div>
                            )}

                            {config.fields.includes("followers") && (
                              <div>
                                <label className="block text-sm font-semibold mb-2 text-white/90">Followers *</label>
                                <input
                                  type="number"
                                  value={platform.followers || ""}
                                  onChange={(e) => updatePlatform(index, "followers", parseInt(e.target.value) || 0)}
                                  className={`w-full px-4 py-3 bg-white/5 border rounded-xl focus:outline-none transition-all duration-200 text-base ${
                                    errors[`platform_${index}_followers`] ? 'border-red-500' : 'border-white/20 focus:border-[#D4AF37]'
                                  }`}
                                  placeholder={platform.platform === "twitch" ? "3000" : "15000"}
                                />
                                <AnimatePresence>
                                  {errors[`platform_${index}_followers`] && (
                                    <motion.p
                                      initial={{ opacity: 0, y: -10 }}
                                      animate={{ opacity: 1, y: 0 }}
                                      exit={{ opacity: 0 }}
                                      className="text-red-400 text-sm mt-2 flex items-center gap-1"
                                    >
                                      <FiAlertCircle size={14} /> {errors[`platform_${index}_followers`]}
                                    </motion.p>
                                  )}
                                </AnimatePresence>
                              </div>
                            )}

                            {config.fields.includes("views60d") && (
                              <div>
                                <label className="block text-sm font-semibold mb-2 text-white/90">Views (Last 60 Days) *</label>
                                <input
                                  type="number"
                                  value={platform.views60d || ""}
                                  onChange={(e) => updatePlatform(index, "views60d", parseInt(e.target.value) || 0)}
                                  className={`w-full px-4 py-3 bg-white/5 border rounded-xl focus:outline-none transition-all duration-200 text-base ${
                                    errors[`platform_${index}_views`] ? 'border-red-500' : 'border-white/20 focus:border-[#D4AF37]'
                                  }`}
                                  placeholder="100000"
                                />
                                <AnimatePresence>
                                  {errors[`platform_${index}_views`] && (
                                    <motion.p
                                      initial={{ opacity: 0, y: -10 }}
                                      animate={{ opacity: 1, y: 0 }}
                                      exit={{ opacity: 0 }}
                                      className="text-red-400 text-sm mt-2 flex items-center gap-1"
                                    >
                                      <FiAlertCircle size={14} /> {errors[`platform_${index}_views`]}
                                    </motion.p>
                                  )}
                                </AnimatePresence>
                              </div>
                            )}

                            {config.fields.includes("avgCCV") && (
                              <div>
                                <label className="block text-sm font-semibold mb-2 text-white/90">Average CCV *</label>
                                <input
                                  type="number"
                                  value={platform.avgCCV || ""}
                                  onChange={(e) => updatePlatform(index, "avgCCV", parseInt(e.target.value) || 0)}
                                  className={`w-full px-4 py-3 bg-white/5 border rounded-xl focus:outline-none transition-all duration-200 text-base ${
                                    errors[`platform_${index}_ccv`] ? 'border-red-500' : 'border-white/20 focus:border-[#D4AF37]'
                                  }`}
                                  placeholder="125"
                                />
                                <AnimatePresence>
                                  {errors[`platform_${index}_ccv`] && (
                                    <motion.p
                                      initial={{ opacity: 0, y: -10 }}
                                      animate={{ opacity: 1, y: 0 }}
                                      exit={{ opacity: 0 }}
                                      className="text-red-400 text-sm mt-2 flex items-center gap-1"
                                    >
                                      <FiAlertCircle size={14} /> {errors[`platform_${index}_ccv`]}
                                    </motion.p>
                                  )}
                                </AnimatePresence>
                              </div>
                            )}

                            {config.fields.includes("hours60d") && (
                              <div>
                                <label className="block text-sm font-semibold mb-2 text-white/90">Stream Hours (Last 60 Days) *</label>
                                <input
                                  type="number"
                                  value={platform.hours60d || ""}
                                  onChange={(e) => updatePlatform(index, "hours60d", parseInt(e.target.value) || 0)}
                                  className={`w-full px-4 py-3 bg-white/5 border rounded-xl focus:outline-none transition-all duration-200 text-base ${
                                    errors[`platform_${index}_hours`] ? 'border-red-500' : 'border-white/20 focus:border-[#D4AF37]'
                                  }`}
                                  placeholder="20"
                                />
                                <AnimatePresence>
                                  {errors[`platform_${index}_hours`] && (
                                    <motion.p
                                      initial={{ opacity: 0, y: -10 }}
                                      animate={{ opacity: 1, y: 0 }}
                                      exit={{ opacity: 0 }}
                                      className="text-red-400 text-sm mt-2 flex items-center gap-1"
                                    >
                                      <FiAlertCircle size={14} /> {errors[`platform_${index}_hours`]}
                                    </motion.p>
                                  )}
                                </AnimatePresence>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                )}
                <AnimatePresence>
                  {errors.platforms && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-red-400 text-sm mt-4 flex items-center gap-1"
                    >
                      <FiAlertCircle size={14} /> {errors.platforms}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>
            )}

            {/* Step 3 - Additional Info */}
            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="card p-4 sm:p-6 md:p-8"
              >
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-3 bg-[#D4AF37]/10 rounded-xl">
                    <FiMessageSquare className="text-[#D4AF37]" size={20} />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold">Additional Information</h3>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-white/90">
                      Why do you want to join BGT? *
                      <span className="text-white/50 text-xs ml-2">(Min 50 characters)</span>
                    </label>
                    <textarea
                      value={formData.motivation}
                      onChange={(e) => setFormData((prev) => ({ ...prev, motivation: e.target.value }))}
                      rows={5}
                      className={`w-full px-4 py-3 bg-white/5 border rounded-xl focus:outline-none transition-all duration-200 resize-none text-base ${
                        errors.motivation ? 'border-red-500' : 'border-white/20 focus:border-[#D4AF37]'
                      }`}
                      placeholder="Tell us about your motivation, goals, and what you can bring to the BGT community..."
                    />
                    <div className="flex items-center justify-between mt-2">
                      <AnimatePresence>
                        {errors.motivation && (
                          <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="text-red-400 text-sm flex items-center gap-1"
                          >
                            <FiAlertCircle size={14} /> {errors.motivation}
                          </motion.p>
                        )}
                      </AnimatePresence>
                      <span className={`text-xs ${formData.motivation.length < 50 ? 'text-white/40' : 'text-green-400'}`}>
                        {formData.motivation.length} / 50
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2 text-white/90">Availability & Commitment *</label>
                    <textarea
                      value={formData.availability}
                      onChange={(e) => setFormData((prev) => ({ ...prev, availability: e.target.value }))}
                      rows={4}
                      className={`w-full px-4 py-3 bg-white/5 border rounded-xl focus:outline-none transition-all duration-200 resize-none text-base ${
                        errors.availability ? 'border-red-500' : 'border-white/20 focus:border-[#D4AF37]'
                      }`}
                      placeholder="Describe your availability for content creation, tournaments, and community activities..."
                    />
                    <AnimatePresence>
                      {errors.availability && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="text-red-400 text-sm mt-2 flex items-center gap-1"
                        >
                          <FiAlertCircle size={14} /> {errors.availability}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* PREMIUM TIER SELECTION - MOBILE OPTIMIZED */}
                  <div>
                    <label className="block text-sm font-semibold mb-4 text-white/90">Preferred Tier *</label>
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {(Object.entries(TIER_INFO) as [CreatorTier, typeof TIER_INFO[CreatorTier]][]).map(([tier, info]) => (
                        <motion.label
                          key={tier}
                          whileHover={{ scale: 1.02, y: -4 }}
                          whileTap={{ scale: 0.98 }}
                          className={`relative cursor-pointer group rounded-2xl ${
                            formData.preferredTier === tier ? 'ring-2 ring-[#D4AF37]' : ''
                          }`}
                        >
                          <input
                            type="radio"
                            name="tier"
                            value={tier}
                            checked={formData.preferredTier === tier}
                            onChange={() => setFormData((prev) => ({ ...prev, preferredTier: tier }))}
                            className="sr-only"
                          />
                          
                          {/* Main Card */}
                          <div className={`
                            relative p-6 rounded-2xl transition-all duration-300 overflow-hidden h-full
                            bg-[#0A0A0A] backdrop-blur-xl
                            ${formData.preferredTier === tier 
                              ? 'border-2 border-[#D4AF37]/50 shadow-2xl shadow-[#D4AF37]/20' 
                              : 'border border-white/10 hover:border-[#D4AF37]/30 hover:shadow-lg hover:shadow-[#D4AF37]/10'
                            }
                          `}>
                            {/* Icon */}
                            <div className={`inline-flex p-4 rounded-xl ${info.iconBg} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                              <FiStar className={info.iconColor} size={24} />
                            </div>
                            
                            {/* Tier Name */}
                            <div className={`text-lg sm:text-xl font-black mb-2 bg-gradient-to-r ${info.color} bg-clip-text text-transparent`}>
                              {info.name}
                            </div>
                            
                            {/* Description */}
                            <div className="text-xs text-white/70 leading-relaxed">
                              {info.description}
                            </div>
                            
                            {/* Animated gradient background on hover/select */}
                            <motion.div
                              className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${info.color} pointer-events-none`}
                              animate={{ 
                                opacity: formData.preferredTier === tier ? 0.08 : 0
                              }}
                              transition={{ duration: 0.3 }}
                            />
                            
                            {/* Hover glow */}
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#D4AF37]/0 via-[#D4AF37]/5 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                          </div>
                          
                          {/* Animated Check Icon */}
                          <AnimatePresence>
                            {formData.preferredTier === tier && (
                              <motion.div
                                initial={{ scale: 0, rotate: -180 }}
                                animate={{ scale: 1, rotate: 0 }}
                                exit={{ scale: 0, rotate: 180 }}
                                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                                className="absolute top-3 right-3 w-8 h-8 bg-[#D4AF37] rounded-full flex items-center justify-center shadow-xl shadow-[#D4AF37]/60 z-20"
                              >
                                <FiCheck className="text-black" size={18} strokeWidth={3} />
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.label>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 sm:p-5 bg-white/[0.02] border border-white/10 rounded-xl">
                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        id="terms"
                        checked={formData.agreedToTerms}
                        onChange={(e) => setFormData((prev) => ({ ...prev, agreedToTerms: e.target.checked }))}
                        className="mt-1 h-5 w-5 rounded border-white/20 bg-white/5 text-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37] cursor-pointer shrink-0"
                      />
                      <label htmlFor="terms" className="text-sm text-white/80 leading-relaxed cursor-pointer">
                        I agree to the BGT Creator Program terms and conditions, including brand guidelines,
                        content requirements, and monthly reporting obligations. I understand that acceptance
                        into the program is competitive and based on application quality and fit. *
                      </label>
                    </div>
                    <AnimatePresence>
                      {errors.terms && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="text-red-400 text-sm mt-3 flex items-center gap-1"
                        >
                          <FiAlertCircle size={14} /> {errors.terms}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 px-4">
            <button
              type="button"
              onClick={prevStep}
              disabled={currentStep === 1}
              className="btn btn-outline w-full sm:w-auto px-8 py-4 disabled:cursor-not-allowed disabled:opacity-30 hover:bg-white/5 transition-all duration-200 rounded-xl"
            >
              Previous
            </button>

            {errors.submit && (
              <p className="text-red-400 text-sm flex items-center gap-1 order-first sm:order-none">
                <FiAlertCircle size={14} /> {errors.submit}
              </p>
            )}

            {currentStep < 3 ? (
              <button
                type="button"
                onClick={nextStep}
                className="btn btn-primary w-full sm:w-auto px-8 py-4 hover:shadow-lg hover:shadow-[#D4AF37]/30 transition-all duration-300 rounded-xl"
              >
                Next Step
              </button>
            ) : (
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary w-full sm:w-auto px-8 py-4 disabled:cursor-not-allowed disabled:opacity-50 hover:shadow-lg hover:shadow-[#D4AF37]/30 transition-all duration-300 inline-flex items-center justify-center gap-2 rounded-xl"
              >
                {isSubmitting ? (
                  <>
                    <FiLoader className="animate-spin" size={18} />
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <FiCheck size={18} />
                    <span>Submit Application</span>
                  </>
                )}
              </button>
            )}
          </div>

          {/* Help text */}
          <div className="text-center pt-6 border-t border-white/10 mt-8 px-4">
            <p className="text-white/60 text-sm">
              We&apos;ll review your application within <span className="text-[#D4AF37] font-semibold">10 business days</span> and contact you via Discord or email.
            </p>
            <p className="mt-2 text-xs text-white/40">
              Having issues? Join our{" "}
              <a
                href="https://discord.gg/bgt"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#D4AF37] hover:underline"
              >
                Discord
              </a>{" "}
              for support.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
