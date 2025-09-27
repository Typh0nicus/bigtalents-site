"use client";
import { motion } from "framer-motion";
import { FiDollarSign, FiUsers, FiAward } from "react-icons/fi";

interface StatsCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  description?: string;
}

function StatsCard({ icon, label, value, description }: StatsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="card p-6 group"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="p-3 rounded-xl bg-[var(--gold)]/10 text-[var(--gold)] group-hover:bg-[var(--gold)]/20 transition-colors">
          {icon}
        </div>
      </div>
      
      <div className="mb-3">
        <h3 className="text-3xl font-black text-white group-hover:text-[var(--gold)] transition-colors">
          {typeof value === 'number' ? value.toLocaleString() : value}
        </h3>
        <p className="text-white/70 text-sm font-medium">{label}</p>
      </div>
      
      {description && (
        <p className="text-xs text-white/50 border-t border-white/10 pt-3">
          {description}
        </p>
      )}
    </motion.div>
  );
}

export function TournamentStats() {
  return (
    <section className="py-16">
      <div className="container">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-12"
        >
          <h2 className="h2 mb-4">Tournament Performance</h2>
          <p className="lead max-w-2xl mx-auto">
            Our competitive Brawl Stars ecosystem continues to grow with professional tournaments and community engagement.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatsCard
            icon={<FiDollarSign size={24} />}
            label="Total Prize Pool"
            value="$6,947"
            description="Distributed across all tournaments"
          />
          <StatsCard
            icon={<FiUsers size={24} />}
            label="Total Participants"
            value="4,387"
            description="Teams and players registered"
          />
          <StatsCard
            icon={<FiAward size={24} />}
            label="Tournaments Hosted"
            value={14}
            description="Since platform launch"
          />
        </div>
      </div>
    </section>
  );
}
