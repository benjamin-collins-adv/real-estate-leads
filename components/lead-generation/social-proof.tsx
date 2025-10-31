"use client";

import { Users, TrendingUp, Award, Clock } from "lucide-react";

interface SocialProofProps {
  variant?: "default" | "compact" | "inline";
}

const stats = [
  { icon: Users, label: "Active Buyers", value: "1,200+" },
  { icon: TrendingUp, label: "Properties Sold", value: "500+" },
  { icon: Award, label: "Expert Agents", value: "25+" },
  { icon: Clock, label: "Avg. Time to Close", value: "45 days" },
];

export function SocialProof({ variant = "default" }: SocialProofProps) {
  if (variant === "compact") {
    return (
      <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="flex items-center gap-2">
              <Icon className="h-4 w-4 text-primary" />
              <span className="font-semibold">{stat.value}</span>
              <span className="text-muted-foreground hidden sm:inline">
                {stat.label}
              </span>
            </div>
          );
        })}
      </div>
    );
  }

  if (variant === "inline") {
    return (
      <div className="flex flex-wrap gap-6 sm:gap-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="flex items-center gap-2">
              <Icon className="h-5 w-5 text-primary" />
              <div>
                <div className="font-bold text-lg">{stat.value}</div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  // Default variant
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div
            key={index}
            className="text-center p-4 sm:p-6 bg-muted/50 rounded-lg"
          >
            <div className="flex justify-center mb-2 sm:mb-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2">
              {stat.value}
            </div>
            <div className="text-xs sm:text-sm text-muted-foreground">
              {stat.label}
            </div>
          </div>
        );
      })}
    </div>
  );
}

