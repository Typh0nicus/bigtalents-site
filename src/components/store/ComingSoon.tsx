"use client";

import { motion } from "framer-motion";
import { FiShoppingBag, FiMail, FiCheck } from "react-icons/fi";

export function ComingSoon() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bgt-bg-master" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/90 to-black" />
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(800px 400px at 50% 50%, rgba(212,175,55,0.08), transparent 70%)`
          }}
        />
      </div>

      {/* Content */}
      <div className="container relative z-10 px-6 py-24">
        <div className="max-w-3xl mx-auto text-center">
          {/* Icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8 flex justify-center"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gold-vibrant/20 blur-3xl rounded-full" />
              <div className="relative bg-black/40 border border-gold-vibrant/30 rounded-full p-8">
                <FiShoppingBag className="w-16 h-16 text-gold-vibrant" />
              </div>
            </div>
          </motion.div>

          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight text-white mb-6">
              Store <span className="text-gradient-gold">Coming Soon</span>
            </h1>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl text-white/60 mb-12 max-w-2xl mx-auto"
          >
            We're crafting an exclusive collection of premium BGT merchandise.
            <br className="hidden sm:block" />
            Be the first to know when we launch.
          </motion.p>

          {/* Notify Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="max-w-md mx-auto mb-16"
          >
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:border-gold-vibrant/50 focus:bg-white/10 transition-all"
                />
              </div>
              <button className="btn btn-primary px-8 py-4 whitespace-nowrap">
                Notify Me
              </button>
            </div>
            <p className="text-xs text-white/40 mt-4">
              We'll send you an email when the store opens. No spam, promise.
            </p>
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6"
          >
            {[
              { icon: FiCheck, title: "Premium Quality", desc: "High-quality esports apparel" },
              { icon: FiCheck, title: "Exclusive Designs", desc: "Limited edition collections" },
              { icon: FiCheck, title: "Global Shipping", desc: "Worldwide delivery" }
            ].map((feature, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-sm hover:bg-white/10 hover:border-gold-vibrant/20 transition-all duration-300">
                <feature.icon className="w-6 h-6 text-gold-vibrant mx-auto mb-3" />
                <h3 className="text-white font-bold mb-2">{feature.title}</h3>
                <p className="text-sm text-white/50">{feature.desc}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
