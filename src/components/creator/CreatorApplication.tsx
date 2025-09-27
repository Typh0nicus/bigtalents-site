"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { FiX, FiCheck, FiUser, FiMessageSquare, FiStar } from "react-icons/fi";
import { FaYoutube, FaTwitch, FaDiscord } from "react-icons/fa";
import { SiTiktok } from "react-icons/si";
import { CreatorTier, Platform } from "@/types/creator";

interface FormData {
  name: string;
  email: string;
  discordId: string;
  supercellCreatorCode: string;
  platforms: {
    platform: Platform;
    handle: string;
    url: string;
    subscribers?: number;
    followers?: number;
    views60d?: number;
    avgCCV?: number;
    hours60d?: number;
  }[];
  portfolio: {
    description: string;
    samples: string[];
  };
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
  portfolio: { description: "", samples: [] },
  motivation: "",
  availability: "",
  preferredTier: "academy",
  agreedToTerms: false,
};

const PLATFORM_CONFIG = {
  youtube: {
    icon: FaYoutube,
    color: "text-red-500",
    name: "YouTube",
    fields: ["subscribers", "views60d"],
  },
  twitch: {
    icon: FaTwitch,
    color: "text-purple-500",
    name: "Twitch",
    fields: ["followers", "views60d", "avgCCV", "hours60d"],
  },
  tiktok: {
    icon: SiTiktok,
    color: "text-white",
    name: "TikTok",
    fields: ["followers", "views60d"],
  },
};

export function CreatorApplication() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [currentStep, setCurrentStep] = useState(1);

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
      if (!formData.availability.trim()) newErrors.availability = "Availability is required";
      if (!formData.agreedToTerms) newErrors.terms = "You must agree to the terms";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 3));
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateStep(3)) return;

    setIsSubmitting(true);

    try {
      // Here you would submit to your API
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setSubmitted(true);
    } catch (error) {
      console.error("Submission failed:", error);
      setErrors({ submit: "Submission failed. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="container py-20">
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
          <h2 className="h2 mb-6">Application Submitted Successfully!</h2>
          <p className="lead mb-8 text-white/80">
            Thank you for applying to the BGT Creator Program. We&apos;ll review your application
            within 10 business days and contact you via Discord or email with the next steps.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a
              href="/creator-program"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn btn-outline rounded-2xl px-8 py-4"
            >
              Back to Creator Program
            </motion.a>
            <motion.a
              href="https://discord.gg/bgt"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn btn-primary rounded-2xl px-8 py-4"
            >
              <FaDiscord className="mr-2" /> Join Our Discord
            </motion.a>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="container py-20">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="h1 mb-6">Apply to BGT Creator Program</h1>
          <p className="lead text-white/80 max-w-2xl mx-auto">
            Join the most exclusive creator program in Brawl Stars esports.
            Complete the application below to get started on your journey.
          </p>
        </motion.div>

        {/* Progress Bar */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="mb-12">
          <div className="flex items-center justify-center mb-4">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`
                  w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all
                  ${currentStep >= step ? "bg-[var(--gold)] text-black" : "bg-white/10 text-white/60"}
                `}
                >
                  {currentStep > step ? <FiCheck size={16} /> : step}
                </div>
                {step < 3 && (
                  <div
                    className={`
                    w-16 h-0.5 mx-2 transition-all
                    ${currentStep > step ? "bg-[var(--gold)]" : "bg-white/20"}
                  `}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="text-center text-sm text-white/70">
            Step {currentStep} of 3: {currentStep === 1 ? "Personal Information" : currentStep === 2 ? "Platform Information" : "Additional Details"}
          </div>
        </motion.div>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          onSubmit={handleSubmit}
          className="space-y-8"
        >
          {/* Step 1: Personal Information */}
          {currentStep === 1 && (
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="card p-8">
              <div className="flex items-center gap-3 mb-6">
                <FiUser className="text-[var(--gold)] text-xl" />
                <h3 className="text-xl font-bold">Personal Information</h3>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2 text-white/90">Full Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl focus:border-[var(--gold)] focus:outline-none transition-colors"
                    placeholder="Your full name"
                  />
                  {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-white/90">Email *</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl focus:border-[var(--gold)] focus:outline-none transition-colors"
                    placeholder="your@email.com"
                  />
                  {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-white/90">Discord ID *</label>
                  <input
                    type="text"
                    value={formData.discordId}
                    onChange={(e) => setFormData((prev) => ({ ...prev, discordId: e.target.value }))}
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl focus:border-[var(--gold)] focus:outline-none transition-colors"
                    placeholder="username#1234"
                  />
                  {errors.discordId && <p className="text-red-400 text-sm mt-1">{errors.discordId}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-white/90">Supercell Creator Code</label>
                  <input
                    type="text"
                    value={formData.supercellCreatorCode}
                    onChange={(e) => setFormData((prev) => ({ ...prev, supercellCreatorCode: e.target.value }))}
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl focus:border-[var(--gold)] focus:outline-none transition-colors"
                    placeholder="Optional - if you have T2+ status"
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 2: Platform Information */}
          {currentStep === 2 && (
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="card p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <FiStar className="text-[var(--gold)] text-xl" />
                  <h3 className="text-xl font-bold">Platform Information *</h3>
                </div>
                <div className="flex gap-2">
                  {Object.entries(PLATFORM_CONFIG).map(([platform, config]) => (
                    <motion.button
                      key={platform}
                      type="button"
                      onClick={() => addPlatform(platform as Platform)}
                      disabled={formData.platforms.some((p) => p.platform === platform)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-3 bg-white/5 border border-white/20 rounded-xl hover:border-[var(--gold)] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                      title={`Add ${config.name}`}
                    >
                      <config.icon className={config.color} size={20} />
                    </motion.button>
                  ))}
                </div>
              </div>

              {formData.platforms.length === 0 ? (
                <div className="text-center py-12 border-2 border-dashed border-white/20 rounded-xl">
                  <FiStar className="text-white/40 text-4xl mx-auto mb-4" />
                  <p className="text-white/60 text-lg mb-2">Add Your First Platform</p>
                  <p className="text-white/40 text-sm">Click the platform icons above to get started</p>
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
                        className="border border-white/15 rounded-xl p-6 bg-white/[0.02]"
                      >
                        <div className="flex items-center justify-between mb-6">
                          <div className="flex items-center gap-3">
                            <IconComponent className={config.color} size={24} />
                            <span className="font-medium text-lg">{config.name}</span>
                          </div>
                          <motion.button
                            type="button"
                            onClick={() => removePlatform(index)}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                          >
                            <FiX size={18} />
                          </motion.button>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium mb-2 text-white/90">Handle/Username *</label>
                            <input
                              type="text"
                              value={platform.handle}
                              onChange={(e) => updatePlatform(index, "handle", e.target.value)}
                              className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl focus:border-[var(--gold)] focus:outline-none transition-colors"
                              placeholder="@username"
                            />
                            {errors[`platform_${index}_handle`] && (
                              <p className="text-red-400 text-sm mt-1">{errors[`platform_${index}_handle`]}</p>
                            )}
                          </div>

                          <div>
                            <label className="block text-sm font-medium mb-2 text-white/90">Channel/Profile URL *</label>
                            <input
                              type="url"
                              value={platform.url}
                              onChange={(e) => updatePlatform(index, "url", e.target.value)}
                              className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl focus:border-[var(--gold)] focus:outline-none transition-colors"
                              placeholder="https://..."
                            />
                            {errors[`platform_${index}_url`] && (
                              <p className="text-red-400 text-sm mt-1">{errors[`platform_${index}_url`]}</p>
                            )}
                          </div>

                          {/* Dynamic fields based on platform */}
                          {config.fields.includes("subscribers") && (
                            <div>
                              <label className="block text-sm font-medium mb-2 text-white/90">Subscribers *</label>
                              <input
                                type="number"
                                value={platform.subscribers || ""}
                                onChange={(e) => updatePlatform(index, "subscribers", parseInt(e.target.value) || 0)}
                                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl focus:border-[var(--gold)] focus:outline-none transition-colors"
                                placeholder="5000"
                              />
                              {errors[`platform_${index}_subs`] && (
                                <p className="text-red-400 text-sm mt-1">{errors[`platform_${index}_subs`]}</p>
                              )}
                            </div>
                          )}

                          {config.fields.includes("followers") && (
                            <div>
                              <label className="block text-sm font-medium mb-2 text-white/90">Followers *</label>
                              <input
                                type="number"
                                value={platform.followers || ""}
                                onChange={(e) => updatePlatform(index, "followers", parseInt(e.target.value) || 0)}
                                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl focus:border-[var(--gold)] focus:outline-none transition-colors"
                                placeholder={platform.platform === "twitch" ? "3000" : "15000"}
                              />
                              {errors[`platform_${index}_followers`] && (
                                <p className="text-red-400 text-sm mt-1">{errors[`platform_${index}_followers`]}</p>
                              )}
                            </div>
                          )}

                          {config.fields.includes("views60d") && (
                            <div>
                              <label className="block text-sm font-medium mb-2 text-white/90">Views (Last 60 Days) *</label>
                              <input
                                type="number"
                                value={platform.views60d || ""}
                                onChange={(e) => updatePlatform(index, "views60d", parseInt(e.target.value) || 0)}
                                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl focus:border-[var(--gold)] focus:outline-none transition-colors"
                                placeholder="100000"
                              />
                              {errors[`platform_${index}_views`] && (
                                <p className="text-red-400 text-sm mt-1">{errors[`platform_${index}_views`]}</p>
                              )}
                            </div>
                          )}

                          {config.fields.includes("avgCCV") && (
                            <div>
                              <label className="block text-sm font-medium mb-2 text-white/90">Average CCV *</label>
                              <input
                                type="number"
                                value={platform.avgCCV || ""}
                                onChange={(e) => updatePlatform(index, "avgCCV", parseInt(e.target.value) || 0)}
                                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl focus:border-[var(--gold)] focus:outline-none transition-colors"
                                placeholder="125"
                              />
                              {errors[`platform_${index}_ccv`] && (
                                <p className="text-red-400 text-sm mt-1">{errors[`platform_${index}_ccv`]}</p>
                              )}
                            </div>
                          )}

                          {config.fields.includes("hours60d") && (
                            <div>
                              <label className="block text-sm font-medium mb-2 text-white/90">Stream Hours (Last 60 Days) *</label>
                              <input
                                type="number"
                                value={platform.hours60d || ""}
                                onChange={(e) => updatePlatform(index, "hours60d", parseInt(e.target.value) || 0)}
                                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl focus:border-[var(--gold)] focus:outline-none transition-colors"
                                placeholder="20"
                              />
                              {errors[`platform_${index}_hours`] && (
                                <p className="text-red-400 text-sm mt-1">{errors[`platform_${index}_hours`]}</p>
                              )}
                            </div>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}
              {errors.platforms && <p className="text-red-400 text-sm mt-4">{errors.platforms}</p>}
            </motion.div>
          )}

          {/* Step 3: Additional Information */}
          {currentStep === 3 && (
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="card p-8">
              <div className="flex items-center gap-3 mb-6">
                <FiMessageSquare className="text-[var(--gold)] text-xl" />
                <h3 className="text-xl font-bold">Additional Information</h3>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2 text-white/90">Why do you want to join BGT? *</label>
                  <textarea
                    value={formData.motivation}
                    onChange={(e) => setFormData((prev) => ({ ...prev, motivation: e.target.value }))}
                    rows={4}
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl focus:border-[var(--gold)] focus:outline-none transition-colors resize-none"
                    placeholder="Tell us about your motivation, goals, and what you can bring to the BGT community..."
                  />
                  {errors.motivation && <p className="text-red-400 text-sm mt-1">{errors.motivation}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-white/90">Availability &amp; Commitment *</label>
                  <textarea
                    value={formData.availability}
                    onChange={(e) => setFormData((prev) => ({ ...prev, availability: e.target.value }))}
                    rows={3}
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl focus:border-[var(--gold)] focus:outline-none transition-colors resize-none"
                    placeholder="Describe your availability for content creation, tournaments, and community activities..."
                  />
                  {errors.availability && <p className="text-red-400 text-sm mt-1">{errors.availability}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-white/90">Preferred Tier</label>
                  <select
                    value={formData.preferredTier}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, preferredTier: e.target.value as CreatorTier }))
                    }
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl focus:border-[var(--gold)] focus:outline-none transition-colors"
                  >
                    <option value="academy">BGT Academy - Learning &amp; Growth</option>
                    <option value="partnered">BGT Partnered Creator - Collaboration</option>
                    <option value="paid">BGT Paid Creator - Professional</option>
                  </select>
                </div>

                <div className="p-4 bg-white/[0.02] border border-white/10 rounded-xl">
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="terms"
                      checked={formData.agreedToTerms}
                      onChange={(e) => setFormData((prev) => ({ ...prev, agreedToTerms: e.target.checked }))}
                      className="mt-1 h-4 w-4 rounded border-white/20 bg-white/5 text-[var(--gold)] focus:ring-2 focus:ring-[var(--gold)]"
                    />
                    <label htmlFor="terms" className="text-sm text-white/80 leading-relaxed">
                      I agree to the BGT Creator Program terms and conditions, including brand guidelines,
                      content requirements, and monthly reporting obligations. I understand that acceptance
                      into the program is competitive and based on application quality and fit. *
                    </label>
                  </div>
                  {errors.terms && <p className="text-red-400 text-sm mt-2">{errors.terms}</p>}
                </div>
              </div>
            </motion.div>
          )}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between pt-8">
            <motion.button
              type="button"
              onClick={prevStep}
              disabled={currentStep === 1}
              whileHover={currentStep > 1 ? { scale: 1.05 } : {}}
              whileTap={currentStep > 1 ? { scale: 0.95 } : {}}
              className="btn btn-outline px-8 py-4 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Previous
            </motion.button>

            {errors.submit && <p className="text-red-400 text-sm">{errors.submit}</p>}

            {currentStep < 3 ? (
              <motion.button
                type="button"
                onClick={nextStep}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn btn-primary px-8 py-4"
              >
                Next Step
              </motion.button>
            ) : (
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={!isSubmitting ? { scale: 1.05 } : {}}
                whileTap={!isSubmitting ? { scale: 0.95 } : {}}
                className="btn btn-primary px-8 py-4 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <div className="mr-2 h-5 w-5 animate-spin rounded-full border-2 border-white/20 border-t-white" />
                    Submitting...
                  </>
                ) : (
                  "Submit Application"
                )}
              </motion.button>
            )}
          </div>

          {/* Help Text */}
          <div className="text-center pt-4">
            <p className="text-white/60 text-sm">
              We&apos;ll review your application within 10 business days and contact you via Discord or email.
            </p>
            <p className="mt-2 text-xs text-white/40">
              Having issues? Join our{" "}
              <a
                href="https://discord.gg/bgt"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--gold)] hover:underline"
              >
                Discord
              </a>{" "}
              for support.
            </p>
          </div>
        </motion.form>
      </div>
    </div>
  );
}
