"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FiMail, FiMessageSquare, FiUsers, FiTrendingUp, FiSend } from "react-icons/fi";
import { FaDiscord } from "react-icons/fa";

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
    description: "Questions about tournaments, partnerships, or general support",
    contact: "support@bigtalents.gg",
    href: "mailto:support@bigtalents.gg",
  },
  {
    icon: FiUsers,
    title: "Partnerships",
    description: "Brand partnerships, sponsorships, and collaboration opportunities",
    contact: "partnerships@bigtalents.gg",
    href: "mailto:partnerships@bigtalents.gg",
  },
  {
    icon: FiTrendingUp,
    title: "Media & Press",
    description: "Press releases, media kits, interviews, and brand assets",
    contact: "media@bigtalents.gg",
    href: "mailto:media@bigtalents.gg",
  },
  {
    icon: FiMessageSquare,
    title: "Player Support",
    description: "Tournament questions, technical issues, and player assistance",
    contact: "Discord Community",
    href: "https://discord.gg/bgt",
  },
];

const REGIONS = [
  { name: "North America", timezone: "EST/PST", flag: "🇺🇸" },
  { name: "Europe", timezone: "CET/GMT", flag: "🇪🇺" },
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setSubmitted(true);
    setIsSubmitting(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="relative">
      {/* Hero */}
      <section className="relative py-20 md:py-32">
        <div className="absolute inset-0">
          <div
            className="absolute inset-0"
            style={{
              background: `
                radial-gradient(1000px 500px at 20% -10%, rgba(212,175,55,0.06), transparent 60%),
                radial-gradient(800px 400px at 80% 10%, rgba(224,184,79,0.04), transparent 60%)
              `,
            }}
          />
        </div>

        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="h1 mb-6">
              Get in <span className="text-[color:var(--gold)]">Touch</span>
            </h1>

            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Reach the Big Talents team for partnerships, press, player support, or any questions.
              We&apos;re active across NA &amp; EU and ready to help.
            </p>

            <div className="flex items-center justify-center gap-6 mb-8">
              {REGIONS.map((region) => (
                <div key={region.name} className="text-center">
                  <div className="text-2xl mb-1">{region.flag}</div>
                  <div className="text-sm font-medium text-white">{region.name}</div>
                  <div className="text-xs text-white/60">{region.timezone}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <div className="container">
        <div className="grid gap-12 lg:grid-cols-3">
          {/* Contact Methods */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl font-bold mb-8">Contact Methods</h2>

              <div className="space-y-6">
                {CONTACT_METHODS.map((method, idx) => (
                  <motion.a
                    key={method.title}
                    href={method.href}
                    target={method.href.startsWith("http") ? "_blank" : undefined}
                    rel={method.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1, duration: 0.5 }}
                    whileHover={{ scale: 1.02 }}
                    className="block p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-[color:var(--gold)]/30 transition-all"
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-[color:var(--gold)]/20 rounded-lg">
                        <method.icon className="text-[color:var(--gold)] text-xl" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold mb-2">{method.title}</h3>
                        <p className="text-sm text-white/70 mb-2">{method.description}</p>
                        <div className="text-sm text-[color:var(--gold)]">{method.contact}</div>
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
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {submitted ? (
                <div className="card p-8 text-center">
                  <div className="inline-flex p-4 bg-green-500/20 text-green-400 rounded-full mb-6">
                    <FiSend size={32} />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Message Sent!</h3>
                  <p className="text-white/80 mb-6">
                    Thank you for reaching out. We&apos;ll get back to you within 24-48 hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="btn btn-outline rounded-xl px-6 py-3"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <div className="card p-8">
                  <h2 className="text-2xl font-bold mb-8">Send us a Message</h2>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid gap-6 md:grid-cols-2">
                      <div>
                        <label className="block text-sm font-medium mb-2 text-white/90">
                          Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl focus:border-[color:var(--gold)] focus:outline-none transition-colors text-white placeholder-white/50"
                          placeholder="Your full name"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2 text-white/90">
                          Email *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl focus:border-[color:var(--gold)] focus:outline-none transition-colors text-white placeholder-white/50"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2 text-white/90">
                        Category
                      </label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-black/50 border border-white/20 rounded-xl focus:border-[color:var(--gold)] focus:outline-none transition-colors text-white [&>option]:bg-black [&>option]:text-white"
                      >
                        <option value="general">General Inquiry</option>
                        <option value="partnership">Partnership</option>
                        <option value="media">Media &amp; Press</option>
                        <option value="support">Player Support</option>
                        <option value="creator">Creator Program</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2 text-white/90">
                        Subject *
                      </label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl focus:border-[color:var(--gold)] focus:outline-none transition-colors text-white placeholder-white/50"
                        placeholder="What&apos;s this about?"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2 text-white/90">
                        Message *
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={6}
                        className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl focus:border-[color:var(--gold)] focus:outline-none transition-colors resize-none text-white placeholder-white/50"
                        placeholder="Tell us more about your inquiry..."
                      />
                    </div>

                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                      whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                      className="w-full btn btn-primary rounded-xl py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="mr-2 h-5 w-5 animate-spin rounded-full border-2 border-white/20 border-t-white" />
                          Sending Message...
                        </>
                      ) : (
                        <>
                          <FiSend className="mr-2" />
                          Send Message
                        </>
                      )}
                    </motion.button>
                  </form>
                </div>
              )}
            </motion.div>
          </div>
        </div>

        {/* Simple footer note */}
        <div className="mt-16 mb-16 text-center">
          <p className="text-white/60">
            Need immediate help? Join our{" "}
            <a
              href="https://discord.gg/bgt"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[color:var(--gold)] hover:underline"
            >
              <FaDiscord className="inline" />
              Discord community
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
