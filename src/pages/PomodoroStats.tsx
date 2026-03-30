import { useState } from "react";
import { motion } from "framer-motion";
import { BarChart3, Calendar, Flame, Target, Clock } from "lucide-react";

const weekData = [
  { day: "Mon", hours: 3.5, sessions: 7 },
  { day: "Tue", hours: 4.2, sessions: 8 },
  { day: "Wed", hours: 2.8, sessions: 5 },
  { day: "Thu", hours: 5.1, sessions: 10 },
  { day: "Fri", hours: 3.9, sessions: 7 },
  { day: "Sat", hours: 6.3, sessions: 12 },
  { day: "Sun", hours: 4.5, sessions: 9 },
];

const maxHours = Math.max(...weekData.map(d => d.hours));

const heatmapData = Array.from({ length: 52 }, () =>
  Array.from({ length: 7 }, () => Math.floor(Math.random() * 5))
);

const PomodoroStats = () => {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
        <BarChart3 className="h-6 w-6 text-primary" /> Learning Analytics
      </h1>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: Clock, label: "Total Hours", value: "247", sub: "+12 this week" },
          { icon: Flame, label: "Current Streak", value: "23 days", sub: "🔥 Best: 45 days" },
          { icon: Target, label: "Sessions", value: "1,847", sub: "+58 this week" },
          { icon: Calendar, label: "Active Days", value: "186", sub: "76% consistency" },
        ].map((stat, i) => (
          <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
            className="glass-card p-5">
            <stat.icon className="h-5 w-5 text-primary mb-3" />
            <p className="text-2xl font-bold text-foreground">{stat.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
            <p className="text-xs text-primary mt-1">{stat.sub}</p>
          </motion.div>
        ))}
      </div>

      <div className="glass-card p-6">
        <h3 className="text-sm font-semibold text-foreground mb-6">This Week</h3>
        <div className="flex items-end gap-3 h-48">
          {weekData.map((d, i) => (
            <div key={d.day} className="flex-1 flex flex-col items-center gap-2">
              <span className="text-xs text-primary font-mono">{d.hours}h</span>
              <motion.div initial={{ height: 0 }} animate={{ height: `${(d.hours / maxHours) * 100}%` }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                className="w-full rounded-t-lg bg-gradient-to-t from-primary/40 to-primary min-h-[4px]" />
              <span className="text-xs text-muted-foreground">{d.day}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="glass-card p-6">
        <h3 className="text-sm font-semibold text-foreground mb-4">Activity Heatmap (Last Year)</h3>
        <div className="overflow-x-auto">
          <div className="flex gap-[3px] min-w-[700px]">
            {heatmapData.map((week, wi) => (
              <div key={wi} className="flex flex-col gap-[3px]">
                {week.map((val, di) => (
                  <div key={di} className="h-3 w-3 rounded-sm transition-colors"
                    style={{
                      backgroundColor: val === 0 ? "hsl(240 10% 8%)" :
                        val === 1 ? "hsl(160 100% 50% / 0.15)" :
                        val === 2 ? "hsl(160 100% 50% / 0.3)" :
                        val === 3 ? "hsl(160 100% 50% / 0.55)" :
                        "hsl(160 100% 50% / 0.8)"
                    }} />
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2 mt-3 justify-end">
          <span className="text-[10px] text-muted-foreground">Less</span>
          {[0, 1, 2, 3, 4].map(v => (
            <div key={v} className="h-3 w-3 rounded-sm" style={{
              backgroundColor: v === 0 ? "hsl(240 10% 8%)" :
                v === 1 ? "hsl(160 100% 50% / 0.15)" :
                v === 2 ? "hsl(160 100% 50% / 0.3)" :
                v === 3 ? "hsl(160 100% 50% / 0.55)" :
                "hsl(160 100% 50% / 0.8)"
            }} />
          ))}
          <span className="text-[10px] text-muted-foreground">More</span>
        </div>
      </div>
    </motion.div>
  );
};

export default PomodoroStats;
