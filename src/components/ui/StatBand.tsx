"use client";

import { ReactNode } from "react";
import { Pill } from "./Pill";

interface StatItem {
  label: string;
  value: string | number;
  icon?: ReactNode;
  variant?: "default" | "gold";
}

interface StatBandProps {
  stats: StatItem[];
  className?: string;
}

export function StatBand({ stats, className = "" }: StatBandProps) {
  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      {stats.map((stat, index) => (
        <Pill
          key={index}
          icon={stat.icon}
          variant={stat.variant || "default"}
          size="md"
          glow={stat.variant === "gold"}
        >
          <span className="font-normal text-white/70 mr-1">{stat.label}:</span>
          <span className="font-bold">{stat.value}</span>
        </Pill>
      ))}
    </div>
  );
}
