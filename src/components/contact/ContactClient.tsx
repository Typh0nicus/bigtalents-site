"use client";

import { useState } from "react";
import { Listbox } from "@headlessui/react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiMail,
  FiMessageSquare,
  FiUsers,
  FiTrendingUp,
  FiSend,
  FiCheckCircle,
  FiAlertCircle,
  FiChevronDown,
} from "react-icons/fi";
import { FaDiscord } from "react-icons/fa";
import { GridOverlay } from "@/components/ui/GridOverlay";

type ContactMethod = {
  icon: React.ElementType;
  title: string;
  description: string;
  contact: string;
  href: string;
};

const CONTACT_METHODS: ContactMethod[] = [
  {
    icon: FiMail,
    title: "General Inquiries",
    description: "Questions about Big Talents, events, or community initiatives.",
    contact: "support@bigtalents.org",
    href: "mailto:support@bigtalents.org",
  },
  {
    icon: FiUsers,
    title: "Partnerships",
    description: "Brand partnerships, sponsorships, and collaboration opportunities.",
    contact: "partnerships@bigtalents.org",
    href: "mailto:partnerships@bigtalents.org",
  },
  {
    icon: FiTrendingUp,
    title: "Media & Press",
    description: "Press, media kits, interviews, and brand-related requests.",
    contact: "media@bigtalents.org",
    href: "mailto:media@bigtalents.org",
  },
  {
    icon: FiMessageSquare,
    title: "Community & Support",
    description: "Questions from players, creators, and community members.",
    contact: "Discord Community",
    href: "https://discord.gg/bgt",
  },
];

const CATEGORIES = [
  { value: "general", label: "General Inquiry" },
  { value: "partnership", label: "Partnership" },
  { value: "media", label: "Media & Press" },
  { value: "support", label: "Community / Support" },
  { value: "creator", label: "Creator Program" },
];

export default function ContactClient() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    category: "general",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!emailRegex.test(formData.email)) newErrors.email = "Invalid email";
    if (!formData.subject.trim()) newErrors.subject = "Subject is required";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    else if (formData.message.trim().length < 10)
      newErrors.message = "Message too short (min 10 characters)";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) {
      const firstError = document.querySelector('[data-error="true"]');
      firstError?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    setIsSubmitting(true);

    try {
      // Replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setErrors({ form: "Something went wrong. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  // Premium BGT Select (Headless UI)
  const handleCategoryChange = (val: string) => {
    setFormData((prev) => ({ ...prev, category: val }));
    if (errors.category) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next['category'];
        return next;
      });
    }
  };

  return (
    <div className="relative min-h-screen bg-black text-white">
      {/* BGT Background System */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 800px 600px at 85% 5%, rgba(255,187,0,0.08), transparent 50%),
              radial-gradient(ellipse 600px 400px at 15% 95%, rgba(212,175,55,0.04), transparent 50%)
            `,
          }}
        />
        <GridOverlay />
      </div>
      
      {/* Hero */}
      <section className="relative py-20 md:py-32 z-10">
        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black mb-6 tracking-tight">
              Get in <span className="text-[#D4AF37]">Touch</span>
            </h1>
            <p className="text-lg sm:text-xl text-white/70 mb-4 max-w-2xl mx-auto leading-relaxed">
              Reach the Big Talents team for partnerships, creator program, media, or support.
            </p>
            <p className="text-sm text-white/50 max-w-2xl mx-auto">
              Whether you&apos;re a brand, creator, player, or fan, we&apos;d love to hear from you.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container pb-20">
        <div className="grid gap-10 lg:gap-16 lg:grid-cols-3">
          {/* Contact Methods */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl font-bold mb-8">Contact Methods</h2>
              <div className="space-y-4">
                {CONTACT_METHODS.map((method, idx) => (
                  <motion.a
                    key={method.title}
                    href={method.href}
                    target={method.href.startsWith("http") ? "_blank" : undefined}
                    rel={method.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.08, duration: 0.5 }}
                    className="block p-6 rounded-2xl bg-[#050505]/80 border border-white/10 hover:border-[#D4AF37]/40 hover:bg-[#0b0b0b] transition-all duration-300 group"
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-[#D4AF37]/10 rounded-xl border border-[#D4AF37]/20 group-hover:bg-[#D4AF37]/20 transition-colors">
                        <method.icon className="text-[#D4AF37] text-xl" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-base mb-1 group-hover:text-[#D4AF37] transition-colors">
                          {method.title}
                        </h3>
                        <p className="text-sm text-white/60 mb-2 leading-relaxed">
                          {method.description}
                        </p>
                        <div className="text-sm text-[#D4AF37] font-medium truncate">
                          {method.contact}
                        </div>
                      </div>
                    </div>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="w-full"
            >
              {submitted ? (
                <div className="rounded-3xl border border-white/10 bg-[#050505]/95 p-8 sm:p-12 text-center relative overflow-hidden min-h-[360px] flex flex-col justify-center items-center">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/10 via-transparent to-transparent pointer-events-none" />
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 200, duration: 0.8 }}
                    className="relative inline-flex p-4 bg-gradient-to-br from-[#D4AF37] to-[#FFD700] text-black rounded-full mb-6 shadow-xl shadow-[#D4AF37]/30"
                  >
                    <FiCheckCircle size={40} strokeWidth={2.5} />
                  </motion.div>
                  <h3 className="text-3xl font-black mb-4">Message Sent!</h3>
                  <p className="text-white/70 mb-8 leading-relaxed">
                    Thank you for reaching out. We&apos;ll get back to you as soon as possible.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: "", email: "", subject: "", category: "general", message: "" });
                    }}
                    className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-white/70 hover:text-white font-medium"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <div className="rounded-3xl border border-white/10 bg-[#050505]/80 p-4 sm:p-8 md:p-10">
                  <h2 className="text-2xl font-bold mb-8 text-center">Send us a Message</h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid gap-6 sm:grid-cols-2 min-w-0">
                      {/* Name */}
                      <div className="space-y-2.5" data-error={!!errors.name}>
                        <label className="block uppercase tracking-widest text-xs font-bold text-white/60">
                          Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          onFocus={() => setFocusedField("name")}
                          onBlur={() => setFocusedField(null)}
                          suppressHydrationWarning
                          autoComplete="name"
                          className={`w-full px-4 py-3.5 rounded-xl border text-sm transition-all font-medium
                            placeholder-white/40 text-white/90 bg-[#17120a] border-white/15
                            focus:border-[#D4AF37] focus:bg-[#D4AF37]/10
                            focus-visible:ring-2 focus-visible:ring-[#D4AF37]
                            focus-visible:outline-none focus:outline-none
                            ${errors.name ? "border-red-500/50 bg-red-500/10" : ""}
                            ${focusedField === "name" ? "border-[#D4AF37] bg-[#D4AF37]/10" : ""}
                          `}
                          placeholder="Your full name"
                        />
                        <AnimatePresence>
                          {errors.name && (
                            <motion.p
                              initial={{ opacity: 0, y: -5 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -5 }}
                              className="text-red-400 text-xs font-semibold flex items-center gap-1.5"
                            >
                              <FiAlertCircle className="w-3 h-3" />
                              <span>{errors.name}</span>
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </div>
                      {/* Email */}
                      <div className="space-y-2.5" data-error={!!errors.email}>
                        <label className="block uppercase tracking-widest text-xs font-bold text-white/60">
                          Email *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          onFocus={() => setFocusedField("email")}
                          onBlur={() => setFocusedField(null)}
                          suppressHydrationWarning
                          autoComplete="email"
                          className={`w-full px-4 py-3.5 rounded-xl border text-sm transition-all font-medium
                            placeholder-white/40 text-white/90 bg-[#17120a] border-white/15
                            focus:border-[#D4AF37] focus:bg-[#D4AF37]/10
                            focus-visible:ring-2 focus-visible:ring-[#D4AF37]
                            focus-visible:outline-none focus:outline-none
                            ${errors.email ? "border-red-500/50 bg-red-500/10" : ""}
                            ${focusedField === "email" ? "border-[#D4AF37] bg-[#D4AF37]/10" : ""}
                          `}
                          placeholder="your@email.com"
                        />
                        <AnimatePresence>
                          {errors.email && (
                            <motion.p
                              initial={{ opacity: 0, y: -5 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -5 }}
                              className="text-red-400 text-xs font-semibold flex items-center gap-1.5"
                            >
                              <FiAlertCircle className="w-3 h-3" />
                              <span>{errors.email}</span>
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                    {/* CATEGORY UPGRADED */}
                    <div className="space-y-2.5 w-full max-w-full">
                      <label className="block uppercase tracking-widest text-xs font-bold text-white/60">
                        Category
                      </label>
                      <Listbox value={formData.category} onChange={handleCategoryChange}>
                        {({ open }) => (
                          <div className="relative w-full">
                            <Listbox.Button className={`relative w-full flex items-center px-4 py-3.5 rounded-xl border text-sm font-medium transition-all
                              bg-[#17120a] border-white/15 text-white/90
                              focus:border-[#D4AF37] focus:bg-[#D4AF37]/10
                              focus-visible:ring-2 focus-visible:ring-[#D4AF37]
                              focus-visible:outline-none focus:outline-none
                              ${open ? 'border-[#D4AF37] bg-[#201a0b]/100' : ''}
                            `}>
                              <span className="flex-1 text-left truncate">
                                {CATEGORIES.find((c) => c.value === formData.category)?.label}
                              </span>
                              <FiChevronDown className="ml-2 text-[#D4AF37]" />
                            </Listbox.Button>
                            <AnimatePresence>
                              {open && (
<Listbox.Options
  className="absolute z-50 w-full mt-1 rounded-xl shadow-2xl border border-[#D4AF37]/25 bg-[#17120a] py-0 overflow-auto max-h-[260px] ring-1 ring-[#D4AF37]/20 focus:outline-none"
>
  {CATEGORIES.map((category, idx) => (
    <Listbox.Option
      key={category.value}
      value={category.value}
      as={motion.li}
      whileTap={{ scale: 0.99 }}
      className={({ active, selected }) => {
        const isFirst = idx === 0;
        const isLast = idx === CATEGORIES.length - 1;
        const rounded =
          active || selected
            ? (isFirst ? "rounded-t-xl" : "") + " " + (isLast ? "rounded-b-xl" : "")
            : "";
        return [
          "px-5 py-2 cursor-pointer font-medium flex items-center gap-2 transition-all",
          rounded,
          active
            ? "bg-[#D4AF37]/30 text-[#D4AF37]"
            : selected
            ? "bg-[#D4AF37]/10 text-[#FFD700] font-semibold"
            : "text-white/90",
        ].join(" ");
      }}
    >
      {category.label}
    </Listbox.Option>
  ))}
</Listbox.Options>

                              )}
                            </AnimatePresence>
                          </div>
                        )}
                      </Listbox>
                    </div>
                    {/* Subject */}
                    <div className="space-y-2.5" data-error={!!errors.subject}>
                      <label className="block uppercase tracking-widest text-xs font-bold text-white/60">
                        Subject *
                      </label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        onFocus={() => setFocusedField("subject")}
                        onBlur={() => setFocusedField(null)}
                        suppressHydrationWarning
                        autoComplete="off"
                        className={`w-full px-4 py-3.5 rounded-xl border text-sm transition-all font-medium
                          placeholder-white/40 text-white/90 bg-[#17120a] border-white/15
                          focus:border-[#D4AF37] focus:bg-[#D4AF37]/10
                          focus-visible:ring-2 focus-visible:ring-[#D4AF37]
                          focus-visible:outline-none focus:outline-none
                          ${errors.subject ? "border-red-500/50 bg-red-500/10" : ""}
                          ${focusedField === "subject" ? "border-[#D4AF37] bg-[#D4AF37]/10" : ""}
                        `}
                        placeholder="What's this about?"
                      />
                      <AnimatePresence>
                        {errors.subject && (
                          <motion.p
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -5 }}
                            className="text-red-400 text-xs font-semibold flex items-center gap-1.5"
                          >
                            <FiAlertCircle className="w-3 h-3" />
                            <span>{errors.subject}</span>
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                    {/* Message */}
                    <div className="space-y-2.5" data-error={!!errors.message}>
                      <label className="block uppercase tracking-widest text-xs font-bold text-white/60">
                        Message *
                      </label>
                      <div className="relative">
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          onFocus={() => setFocusedField("message")}
                          onBlur={() => setFocusedField(null)}
                          rows={6}
                          suppressHydrationWarning
                          className={`w-full px-4 py-3.5 rounded-xl border text-sm transition-all font-medium
                            placeholder-white/40 text-white/90 bg-[#17120a] border-white/15
                            focus:border-[#D4AF37] focus:bg-[#D4AF37]/10
                            focus-visible:ring-2 focus-visible:ring-[#D4AF37]
                            focus-visible:outline-none focus:outline-none
                            resize-none leading-relaxed
                            ${errors.message ? "border-red-500/50 bg-red-500/10" : ""}
                            ${focusedField === "message" ? "border-[#D4AF37] bg-[#D4AF37]/10" : ""}
                          `}
                          placeholder="Tell us more about your inquiry..."
                        />
                        {focusedField === "message" && formData.message && (
                          <motion.div
                            initial={{ opacity: 0, y: 4 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="absolute bottom-3 right-3 text-[10px] text-white/30 font-mono"
                          >
                            {formData.message.length} chars
                          </motion.div>
                        )}
                      </div>
                      <AnimatePresence>
                        {errors.message && (
                          <motion.p
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -5 }}
                            className="text-red-400 text-xs font-semibold flex items-center gap-1.5"
                          >
                            <FiAlertCircle className="w-3 h-3" />
                            <span>{errors.message}</span>
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                    {/* Validation error */}
                    {errors.form && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm flex items-center gap-3"
                      >
                        <FiAlertCircle className="w-5 h-5 flex-shrink-0" />
                        <span className="font-medium">{errors.form}</span>
                      </motion.div>
                    )}
                    {/* Submit button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="relative w-full group overflow-hidden rounded-xl shadow-xl
                        bg-gradient-to-r from-[#D4AF37] via-[#FFD700] to-[#C9B037]
                        border-2 border-[#D4AF37]/40
                        font-bold uppercase text-base tracking-wide py-4
                        transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2 text-black">
                        {isSubmitting ? (
                          <>
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full"
                            />
                            <span>Sending...</span>
                          </>
                        ) : (
                          <>
                            <FiSend className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                            <span>Send Message</span>
                          </>
                        )}
                      </span>
                      {/* Gold shimmer */}
                      <span className="absolute left-0 top-0 w-full h-full pointer-events-none" aria-hidden="true">
                        <span
                          className="hidden group-hover:block absolute left-[-60%] top-0 w-2/3 h-full
                            bg-gradient-to-r from-transparent via-white/60 to-transparent
                            opacity-80 rounded-xl"
                          style={{
                            filter: "blur(2px)",
                            animation: "shimmerX 1.35s cubic-bezier(0.27,0.5,0.58,1.11) forwards",
                          }}
                        />
                        <style>{`
                          @keyframes shimmerX {
                            0% { left: -60%; opacity: 0.55; }
                            80% { left: 115%; opacity: 1; }
                            100% { left: 120%; opacity: 0; }
                          }
                        `}</style>
                      </span>
                    </button>
                  </form>
                </div>
              )}
            </motion.div>
          </div>
        </div>
        {/* Footer note */}
        <div className="mt-16 text-center">
          <p className="text-white/50 text-sm">
            Need quicker help? Join our{" "}
            <a
              href="https://discord.gg/bgt"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[#D4AF37] hover:text-[#FFD700] transition-colors font-medium"
            >
              <FaDiscord className="inline" />
              Discord community
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
