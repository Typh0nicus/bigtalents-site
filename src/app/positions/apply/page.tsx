// src/app/positions/apply/page.tsx
"use client";

import { useState, useEffect, Suspense, type ReactNode } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  FiArrowLeft,
  FiCheck,
  FiLoader,
  FiAlertCircle,
  FiUser,
  FiMail,
  FiClock,
  FiSend,
  FiCheckCircle,
  FiInfo,
  FiHash,
  FiGlobe,
} from "react-icons/fi";
import { FaShieldAlt, FaDiscord } from "react-icons/fa";
import { STAFF_ROLES, STAFF_ROLE_LIST, type StaffRoleId } from "@/data/staffRoles";

const PARTICLE_COUNT = 12;

export default function PositionsApplyPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <ApplicationForm />
    </Suspense>
  );
}

function LoadingFallback() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col items-center gap-4"
      >
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 border-2 border-[#D4AF37]/20 rounded-full" />
          <motion.div
            className="absolute inset-0 border-t-2 border-[#D4AF37] rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        </div>
        <p className="text-[#D4AF37]/60 text-[10px] uppercase tracking-[0.2em] font-bold">
          Initializing Application
        </p>
      </motion.div>
    </div>
  );
}

function ApplicationForm() {
  const searchParams = useSearchParams();
  const roleId = searchParams.get("role") as StaffRoleId | null;
  const selectedRole = roleId && STAFF_ROLES[roleId] ? STAFF_ROLES[roleId] : null;

  const [isMounted, setIsMounted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    discord: "",
    age: "",
    country: "",
    availability: "",
    answers: {} as Record<string, string>,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [touchedFields, setTouchedFields] = useState<Set<string>>(new Set());
  const [completedSections, setCompletedSections] = useState<Set<string>>(new Set());

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (selectedRole) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [selectedRole]);

  useEffect(() => {
    const completed = new Set<string>();
    if (
      formData.name &&
      formData.email &&
      formData.discord &&
      formData.age &&
      formData.country
    ) {
      completed.add("personal");
    }
    if (formData.availability.trim().length > 20) {
      completed.add("availability");
    }
    if (selectedRole) {
      const allAnswered = selectedRole.questions.every(
        (q) => !q.required || formData.answers[q.id]?.trim()
      );
      if (allAnswered) completed.add("questions");
    }
    setCompletedSections(completed);
  }, [formData, selectedRole]);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!emailRegex.test(formData.email)) newErrors.email = "Invalid email format";
    if (!formData.discord.trim()) newErrors.discord = "Discord is required";
    if (!formData.age.trim()) newErrors.age = "Age is required";
    else if (
      isNaN(Number(formData.age)) ||
      Number(formData.age) < 13 ||
      Number(formData.age) > 99
    ) {
      newErrors.age = "Please enter a valid age (13-99)";
    }
    if (!formData.country.trim()) newErrors.country = "Country / region is required";
    if (!formData.availability.trim()) {
      newErrors.availability = "Please describe your availability";
    }

    selectedRole?.questions.forEach((q) => {
      if (q.required && !formData.answers[q.id]?.trim()) {
        newErrors[q.id] = "This field is required";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRole || !validate()) {
      const firstError = document.querySelector<HTMLElement>('[data-error="true"]');
      firstError?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        roleId: selectedRole.id,
        roleTitle: selectedRole.title,
        ...formData,
      };

      const res = await fetch("/api/positions/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Submission failed");

      setIsSuccess(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setErrors({ form: "Something went wrong. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateField = (key: keyof typeof formData, value: string) => {
    if (key === "age") {
      const sanitized = value.replace(/[^0-9]/g, "").slice(0, 2);
      setFormData((prev) => ({ ...prev, [key]: sanitized }));
    } else if (key !== "answers") {
      setFormData((prev) => ({ ...prev, [key]: value }));
    }

    setTouchedFields((prev) => new Set(prev).add(key as string));

    if (errors[key as string]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[key as string];
        return next;
      });
    }
  };

  const updateAnswer = (id: string, value: string) => {
    setFormData((prev) => ({ ...prev, answers: { ...prev.answers, [id]: value } }));
    setTouchedFields((prev) => new Set(prev).add(id));
    if (errors[id]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[id];
        return next;
      });
    }
  };

  // --- SUCCESS STATE ---
  if (isSuccess) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center p-4 select-none relative overflow-hidden">
        {/* Gold particles (subtle) */}
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 12 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-[#D4AF37] rounded-full"
              initial={{ x: "50vw", y: "50vh", scale: 0, opacity: 0.8 }}
              animate={{
                x: `${Math.random() * 100}vw`,
                y: `${Math.random() * 100}vh`,
                scale: [0, 1, 0],
                opacity: [0.8, 0.6, 0],
              }}
              transition={{
                duration: 2.4 + Math.random(),
                delay: i * 0.03,
                ease: "easeOut",
              }}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-lg w-full rounded-3xl border border-white/10 bg-[#050505]/95 backdrop-blur-sm p-10 sm:p-12 text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/10 via-transparent to-transparent pointer-events-none" />
          <motion.div
            className="absolute -top-20 left-1/2 -translate-x-1/2 w-64 h-64 bg-[#D4AF37]/20 rounded-full blur-[100px]"
            animate={{ scale: [1, 1.2, 1], opacity: [0.25, 0.4, 0.25] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />

          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2, duration: 0.8 }}
            className="relative w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-[#D4AF37] to-[#FFD700] rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl shadow-[#D4AF37]/30 ring-4 ring-[#D4AF37]/15"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 300 }}
            >
              <FiCheck className="text-black text-3xl sm:text-4xl" strokeWidth={3} />
            </motion.div>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-3xl sm:text-4xl font-black mb-5"
          >
            Application Received
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-white/70 leading-relaxed mb-3"
          >
            Thanks for applying for the{" "}
            <span className="text-[#D4AF37] font-bold">{selectedRole?.title}</span>{" "}
            position at Big Talents.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-sm text-white/50 leading-relaxed mb-10"
          >
            Our team reviews every application manually. If we see a fit,
            we&apos;ll reach out via Discord (and email if needed) within 5–7
            business days.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="space-y-3"
          >
            <Link
              href="/positions"
              className="inline-flex items-center justify-center w-full py-4 rounded-2xl bg-gradient-to-r from-[#D4AF37] to-[#FFD700] text-black font-bold hover:scale-[1.02] active:scale-[0.98] transition-transform shadow-lg shadow-[#D4AF37]/25 group"
            >
              <span>Back to Positions</span>
              <FiArrowLeft className="ml-2 rotate-180 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/"
              className="inline-flex items-center justify-center w-full py-3 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-white/70 hover:text-white font-medium text-sm"
            >
              Return to Home
            </Link>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  // --- ROLE PICKER ---
  if (!selectedRole) {
    return (
      <div className="min-h-screen bg-black text-white py-20 px-4 select-none">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="inline-flex p-3.5 bg-gradient-to-br from-[#D4AF37] to-[#FFD700] rounded-2xl shadow-xl shadow-[#D4AF37]/40 mb-6 relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37] to-[#FFD700] rounded-2xl blur-xl opacity-50" />
              <FaShieldAlt className="relative w-7 h-7 text-black" />
            </motion.div>
            <h1 className="text-4xl sm:text-5xl font-black mb-3 tracking-tight">
              Select Position
            </h1>
            <p className="text-xs font-bold uppercase tracking-widest text-white/40 mb-2">
              Open Team Positions
            </p>
            <p className="text-white/60 text-sm sm:text-base">
              Choose the role you&apos;d like to apply for and we&apos;ll tailor the
              form to it.
            </p>
          </motion.div>

          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
            variants={{
              hidden: { opacity: 0 },
              show: { opacity: 1, transition: { staggerChildren: 0.06 } },
            }}
            initial="hidden"
            animate="show"
          >
            {STAFF_ROLE_LIST.filter((r) => r.open).map((role) => (
              <motion.div
                key={role.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0 },
                }}
              >
                <Link
                  href={`/positions/apply?role=${role.id}`}
                  className="group block p-7 rounded-2xl border border-white/10 bg-[#050505]/80 hover:bg-[#0b0b0b] hover:border-[#D4AF37]/40 transition-all duration-300 relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/0 to-[#D4AF37]/6 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative flex items-center justify-between mb-5">
                    <motion.span
                      className="text-4xl"
                      whileHover={{ scale: 1.1, rotate: [0, -10, 10, 0] }}
                      transition={{ duration: 0.3 }}
                    >
                      {role.iconEmoji}
                    </motion.span>
                    <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-[#D4AF37] group-hover:bg-[#D4AF37] transition-all">
                      <FiArrowLeft className="rotate-180 text-white/40 group-hover:text-black transition-colors" />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold mb-2 group-hover:text-[#D4AF37] transition-colors">
                    {role.title}
                  </h3>
                  <p className="text-[10px] uppercase tracking-widest text-white/40">
                    {role.category}
                  </p>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          <div className="mt-14 text-center">
            <Link
              href="/positions"
              className="text-white/40 hover:text-white text-xs uppercase tracking-widest transition-colors font-bold inline-flex items-center gap-2 group"
            >
              <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
              <span>Cancel & Return</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // --- MAIN FORM ---
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative select-none">
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(1200px 600px at 25% 0%, rgba(212,175,55,0.04), transparent 55%),
              radial-gradient(1000px 500px at 75% 20%, rgba(212,175,55,0.02), transparent 55%)
            `,
          }}
        />
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03]" />
        {isMounted && (
          <div className="absolute inset-0 opacity-15">
            {Array.from({ length: PARTICLE_COUNT }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-px h-px bg-[#D4AF37] rounded-full"
                style={{
                  left: `${(i * 8.33) % 100}%`,
                  top: `${(i * 10) % 100}%`,
                }}
                animate={{
                  y: [0, -30, 0],
                  opacity: [0.2, 0.7, 0.2],
                }}
                transition={{
                  duration: 4 + (i % 2),
                  repeat: Infinity,
                  delay: i * 0.3,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        )}
      </div>

      <main className="container mx-auto px-4 pt-32 pb-24 max-w-2xl relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-20 text-center"
        >
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/20 text-[#D4AF37] text-[10px] font-bold tracking-widest uppercase mb-6">
            <span className="text-base">{selectedRole.iconEmoji}</span>
            <span>{selectedRole.category}</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black mb-6 tracking-tight">
            <span className="text-white">Apply for </span>
            <span className="bg-gradient-to-r from-white via-[#FFD700] to-[#D4AF37] bg-clip-text text-transparent">
              {selectedRole.title}
            </span>
          </h1>

          <p className="text-white/60 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            {selectedRole.longDescription}
          </p>
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-16">
          {/* Personal Information */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="space-y-7"
          >
            <SectionHeader
              title="Identity & Contact"
              icon={<FiUser className="w-4 h-4" />}
              completed={completedSections.has("personal")}
            />

            <div className="space-y-6">
              <FormInput
                label="Full Name / IGN"
                value={formData.name}
                onChange={(v) => updateField("name", v)}
                error={errors.name}
                placeholder="e.g. Alex (Slayer)"
                icon={<FiUser />}
                onFocus={() => setFocusedField("name")}
                onBlur={() => setFocusedField(null)}
                focused={focusedField === "name"}
                touched={touchedFields.has("name")}
              />

              <div className="grid sm:grid-cols-2 gap-6 min-w-0">
                <FormInput
                  label="Age"
                  value={formData.age}
                  onChange={(v) => updateField("age", v)}
                  error={errors.age}
                  placeholder="21"
                  icon={<FiHash />}
                  onFocus={() => setFocusedField("age")}
                  onBlur={() => setFocusedField(null)}
                  focused={focusedField === "age"}
                  touched={touchedFields.has("age")}
                  inputMode="numeric"
                />

                <FormInput
                  label="Region / Timezone"
                  value={formData.country}
                  onChange={(v) => updateField("country", v)}
                  error={errors.country}
                  placeholder="Germany (CET)"
                  icon={<FiGlobe />}
                  onFocus={() => setFocusedField("country")}
                  onBlur={() => setFocusedField(null)}
                  focused={focusedField === "country"}
                  touched={touchedFields.has("country")}
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-6 min-w-0">
                <FormInput
                  label="Email"
                  type="email"
                  value={formData.email}
                  onChange={(v) => updateField("email", v)}
                  error={errors.email}
                  placeholder="name@example.com"
                  icon={<FiMail />}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                  focused={focusedField === "email"}
                  touched={touchedFields.has("email")}
                />

                <FormInput
                  label="Discord"
                  value={formData.discord}
                  onChange={(v) => updateField("discord", v)}
                  error={errors.discord}
                  placeholder="username"
                  icon={<FaDiscord />}
                  onFocus={() => setFocusedField("discord")}
                  onBlur={() => setFocusedField(null)}
                  focused={focusedField === "discord"}
                  touched={touchedFields.has("discord")}
                />
              </div>
            </div>
          </motion.section>

          {/* Availability */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="space-y-7"
          >
            <SectionHeader
              title="Availability & Commitment"
              icon={<FiClock className="w-4 h-4" />}
              completed={completedSections.has("availability")}
            />

            <FormTextarea
              label="When can you contribute to BGT?"
              value={formData.availability}
              onChange={(v) => updateField("availability", v)}
              error={errors.availability}
              placeholder="Weekdays after 5pm CET, weekends flexible..."
              helperText="Be specific about days, times, time zone, and approximate hours per week."
              rows={4}
              onFocus={() => setFocusedField("availability")}
              onBlur={() => setFocusedField(null)}
              focused={focusedField === "availability"}
              touched={touchedFields.has("availability")}
            />
          </motion.section>

          {/* Role Questions */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="space-y-10"
          >
            <SectionHeader
              title="Role-Specific Assessment"
              icon={<FaShieldAlt className="w-4 h-4" />}
              completed={completedSections.has("questions")}
            />

            {selectedRole.questions.map((q, qIndex) => (
              <motion.div
                key={q.id}
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.35 + qIndex * 0.08, duration: 0.5 }}
                className="space-y-5"
                data-error={!!errors[q.id]}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-white/90 leading-relaxed">
                      <span className="text-[#D4AF37] mr-2 font-mono text-xs">
                        {String(qIndex + 1).padStart(2, "0")}
                      </span>
                      {q.label}
                      {q.required && <span className="text-[#D4AF37] ml-2">*</span>}
                    </label>

                    {q.helperText && (
                      <p className="text-sm text-white/50 leading-relaxed flex items-start gap-2">
                        <FiInfo className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#D4AF37]/70" />
                        <span>{q.helperText}</span>
                      </p>
                    )}
                  </div>

                  {q.required && (
                    <span className="text-[10px] uppercase tracking-widest text-[#D4AF37]/70 font-bold mt-1 flex-shrink-0">
                      Required
                    </span>
                  )}
                </div>

                {q.type === "image_scenario" && q.imageUrl && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 + qIndex * 0.08, duration: 0.5 }}
                    className="relative rounded-xl overflow-hidden border border-white/10 group mb-5 bg-[#0a0a0a]"
                  >
                    <div className="relative w-full max-h-[500px]">
                      <Image
                        src={q.imageUrl}
                        alt={q.imageAlt || "Scenario"}
                        width={1200}
                        height={800}
                        className="w-full h-auto object-contain transition-transform duration-700 group-hover:scale-105"
                        style={{ maxHeight: "500px" }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    </div>
                  </motion.div>
                )}

                {q.type === "short_text" ? (
                  <FormInput
                    value={formData.answers[q.id] || ""}
                    onChange={(v) => updateAnswer(q.id, v)}
                    error={errors[q.id]}
                    placeholder="Your answer..."
                    onFocus={() => setFocusedField(q.id)}
                    onBlur={() => setFocusedField(null)}
                    focused={focusedField === q.id}
                    touched={touchedFields.has(q.id)}
                  />
                ) : (
                  <FormTextarea
                    value={formData.answers[q.id] || ""}
                    onChange={(v) => updateAnswer(q.id, v)}
                    error={errors[q.id]}
                    placeholder="Type your response..."
                    rows={q.type === "image_scenario" ? 6 : 5}
                    onFocus={() => setFocusedField(q.id)}
                    onBlur={() => setFocusedField(null)}
                    focused={focusedField === q.id}
                    touched={touchedFields.has(q.id)}
                  />
                )}
              </motion.div>
            ))}
          </motion.section>

          {/* Submit */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="pt-10 border-t border-white/10 space-y-6"
          >
            <div className="flex items-center justify-center gap-2 mb-8">
              {[
                { id: "personal", icon: FiUser },
                { id: "availability", icon: FiClock },
                { id: "questions", icon: FaShieldAlt },
              ].map((section, idx) => (
                <div key={section.id} className="flex items-center gap-2">
                  <motion.div
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                      completedSections.has(section.id)
                        ? "bg-[#D4AF37] text-black"
                        : "bg-white/5 text-white/30"
                    }`}
                    animate={
                      completedSections.has(section.id) ? { scale: [1, 1.1, 1] } : {}
                    }
                    transition={{ duration: 0.3 }}
                  >
                    <section.icon className="w-4 h-4" />
                  </motion.div>
                  {idx < 2 && (
                    <div
                      className={`w-12 h-0.5 ${
                        completedSections.has(section.id)
                          ? "bg-[#D4AF37]"
                          : "bg-white/10"
                      } transition-colors`}
                    />
                  )}
                </div>
              ))}
            </div>

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

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Link
                href="/positions"
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#17120a] border border-white/15 hover:bg-[#1f1910] transition-all text-white/70 hover:text-white font-medium group"
              >
                <FiArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                <span>Cancel</span>
              </Link>

              <button
                type="submit"
                disabled={isSubmitting}
                className="relative w-full sm:flex-1 group overflow-hidden rounded-xl shadow-xl
                  bg-gradient-to-r from-[#D4AF37] via-[#FFD700] to-[#C9B037]
                  border-2 border-[#D4AF37]/40
                  font-bold uppercase text-sm sm:text-base tracking-wide py-3.5
                  transition-all cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <span className="relative z-10 flex items-center justify-center gap-2 text-black">
                  {isSubmitting ? (
                    <>
                      <FiLoader className="w-5 h-5 animate-spin" />
                      <span>Submitting…</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Application</span>
                      <FiSend className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                    </>
                  )}
                </span>

                <span
                  className="absolute left-0 top-0 w-full h-full pointer-events-none"
                  aria-hidden="true"
                >
                  <span
                    className="hidden group-hover:block absolute left-[-60%] top-0 w-2/3 h-full
                      bg-gradient-to-r from-transparent via-white/60 to-transparent
                      opacity-80 rounded-xl"
                    style={{
                      filter: "blur(2px)",
                      animation:
                        "shimmerX 1.35s cubic-bezier(0.27,0.5,0.58,1.11) forwards",
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
            </div>

            <p className="text-center text-[10px] text-white/30 tracking-widest uppercase">
              By submitting, you confirm all information is accurate and that you&apos;re
              ready to build with Big Talents.
            </p>
          </motion.div>
        </form>
      </main>
    </div>
  );
}

// --- SHARED COMPONENTS ---

function SectionHeader({
  title,
  icon,
  completed,
}: {
  title: string;
  icon: ReactNode;
  completed: boolean;
}) {
  return (
    <div className="flex items-center justify-between mb-2">
      <div className="flex items-center gap-3.5 min-w-0">
        <motion.div
          className={`flex items-center justify-center w-9 h-9 rounded-xl transition-all ${
            completed ? "bg-[#D4AF37] text-black" : "bg-[#D4AF37]/10 text-[#D4AF37]"
          }`}
          animate={completed ? { scale: [1, 1.05, 1] } : {}}
          transition={{ duration: 0.3 }}
        >
          {completed ? <FiCheckCircle className="w-5 h-5" /> : icon}
        </motion.div>
        <h2 className="text-xs sm:text-sm font-bold uppercase tracking-widest text-white/60 truncate">
          {title}
        </h2>
      </div>
      <div className="hidden sm:block h-px flex-1 ml-4 bg-white/5" />
    </div>
  );
}

interface FormInputProps {
  label?: string;
  value: string;
  onChange: (val: string) => void;
  error?: string;
  type?: string;
  placeholder?: string;
  icon?: ReactNode;
  focused?: boolean;
  touched?: boolean;
  onFocus?: () => void;
  onBlur?: () => void;
  helperText?: string;
  inputMode?: "text" | "numeric";
}

function FormInput({
  label,
  value,
  onChange,
  error,
  type = "text",
  placeholder,
  icon,
  focused,
  touched,
  onFocus,
  onBlur,
  helperText,
  inputMode = "text",
}: FormInputProps) {
  const hasValue = value.length > 0;

  return (
    <div className="space-y-2.5" data-error={!!error}>
      {label && (
        <div className="flex items-baseline justify-between gap-3">
          <label className="uppercase tracking-widest text-xs font-bold text-white/60">
            {label}
          </label>
          {helperText && (
            <p className="text-[10px] text-white/40 leading-relaxed hidden sm:block">
              {helperText}
            </p>
          )}
        </div>
      )}

      {!label && helperText && (
        <p className="text-[10px] text-white/40 leading-relaxed">{helperText}</p>
      )}

      <div className="relative group">
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={onFocus}
          onBlur={onBlur}
          placeholder={placeholder}
          inputMode={inputMode}
          suppressHydrationWarning
          autoComplete="new-password"
          className={`w-full px-4 pr-11 py-3.5 rounded-xl border text-sm transition-all font-medium
            placeholder-white/40 text-white/90 bg-[#17120a] border-white/15
            focus:border-[#D4AF37]
            focus:bg-[#D4AF37]/10
            focus-visible:ring-2 focus-visible:ring-[#D4AF37]
            focus-visible:outline-none focus:outline-none
            disabled:bg-white/5 disabled:cursor-not-allowed
            ${error ? "border-red-500/50 bg-red-500/10" : ""}
            ${focused ? "border-[#D4AF37] bg-[#D4AF37]/10" : ""}
          `}
          style={{ outline: "none" }}
        />
        {icon && (
          <div
            className={`absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none transition-colors duration-150 ${
              focused ? "text-[#D4AF37]" : "text-white/30"
            }`}
          >
            {icon}
          </div>
        )}
        {touched && hasValue && !error && !icon && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-400"
          >
            <FiCheckCircle className="w-4 h-4" />
          </motion.div>
        )}
      </div>

      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -5, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -5, height: 0 }}
            transition={{ duration: 0.2 }}
            className="text-red-400 text-xs font-semibold flex items-center gap-1.5"
          >
            <FiAlertCircle className="w-3 h-3" />
            <span>{error}</span>
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

interface FormTextareaProps {
  label?: string;
  value: string;
  onChange: (val: string) => void;
  error?: string;
  placeholder?: string;
  rows?: number;
  focused?: boolean;
  touched?: boolean;
  onFocus?: () => void;
  onBlur?: () => void;
  helperText?: string;
}

function FormTextarea({
  label,
  value,
  onChange,
  error,
  placeholder,
  rows = 4,
  focused,
  touched,
  onFocus,
  onBlur,
  helperText,
}: FormTextareaProps) {
  const hasValue = value.length > 0;

  return (
    <div className="space-y-2.5" data-error={!!error}>
      {label && (
        <div className="flex items-baseline justify-between gap-3">
          <label className="uppercase tracking-widest text-xs font-bold text-white/60">
            {label}
          </label>
          {helperText && (
            <p className="text-[10px] text-white/40 leading-relaxed hidden sm:block max-w-xs text-right">
              {helperText}
            </p>
          )}
        </div>
      )}

      {!label && helperText && (
        <p className="text-[10px] text-white/40 leading-relaxed">{helperText}</p>
      )}

      <div className="relative">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={onFocus}
          onBlur={onBlur}
          placeholder={placeholder}
          rows={rows}
          suppressHydrationWarning
          className={`w-full px-4 py-3.5 rounded-xl border text-sm transition-all font-medium
            placeholder-white/40 text-white/90 bg-[#17120a] border-white/15
            focus:border-[#D4AF37]
            focus:bg-[#D4AF37]/10
            focus-visible:ring-2 focus-visible:ring-[#D4AF37]
            focus-visible:outline-none focus:outline-none
            disabled:bg-white/5 disabled:cursor-not-allowed
            resize-none leading-relaxed
            ${error ? "border-red-500/50 bg-red-500/10" : ""}
            ${focused ? "border-[#D4AF37] bg-[#D4AF37]/10" : ""}
          `}
          style={{ outline: "none" }}
        />
        {focused && hasValue && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute bottom-3 right-3 text-[10px] text-white/30 font-mono"
          >
            {value.length} chars
          </motion.div>
        )}
      </div>

      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -5, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -5, height: 0 }}
            transition={{ duration: 0.2 }}
            className="text-red-400 text-xs font-semibold flex items-center gap-1.5"
          >
            <FiAlertCircle className="w-3 h-3" />
            <span>{error}</span>
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
