// src/components/rosters/RosterFilter.tsx
"use client";
import { motion } from "framer-motion";
import { FiFilter, FiUsers } from "react-icons/fi";

type FilterOption = 'ALL' | 'NA' | 'EU';

interface RosterFilterProps {
  activeFilter: FilterOption;
  onFilterChange: (filter: FilterOption) => void;
  counts: {
    all: number;
    na: number;
    eu: number;
  };
}

const FILTERS: { value: FilterOption; label: string; icon?: typeof FiUsers }[] = [
  { value: 'ALL', label: 'All Regions', icon: FiUsers },
  { value: 'NA', label: 'North America' },
  { value: 'EU', label: 'Europe' },
];

export function RosterFilter({ activeFilter, onFilterChange, counts }: RosterFilterProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="mb-16"
    >
      <div className="flex items-center justify-center gap-3 mb-6">
        <FiFilter className="w-5 h-5 text-white/40" />
        <span className="text-sm font-semibold text-white/60 uppercase tracking-wider">
          Filter by Region
        </span>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3">
        {FILTERS.map((filter) => {
          const isActive = activeFilter === filter.value;
          const count = filter.value === 'ALL' 
            ? counts.all 
            : filter.value === 'NA' 
            ? counts.na 
            : counts.eu;

          return (
            <motion.button
              key={filter.value}
              onClick={() => onFilterChange(filter.value)}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className={`
                relative px-6 py-3 rounded-xl font-semibold transition-all duration-300
                ${isActive 
                  ? 'bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] text-black shadow-lg shadow-[#D4AF37]/40' 
                  : 'bg-white/5 text-white/70 hover:bg-white/10 border border-white/10 hover:border-[#D4AF37]/30'
                }
              `}
            >
              <div className="flex items-center gap-2">
                {filter.icon && <filter.icon className="w-4 h-4" />}
                <span>{filter.label}</span>
                <span className={`
                  px-2 py-0.5 rounded-full text-xs font-bold
                  ${isActive 
                    ? 'bg-black/20 text-black' 
                    : 'bg-white/10 text-white/60'
                  }
                `}>
                  {count}
                </span>
              </div>
              
              {/* Active Indicator */}
              {isActive && (
                <motion.div
                  layoutId="activeFilter"
                  className="absolute inset-0 bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] rounded-xl -z-10"
                  transition={{ type: "spring", duration: 0.6 }}
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}
