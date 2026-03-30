import { motion } from "framer-motion";
import { Newspaper, ExternalLink, Clock, TrendingUp } from "lucide-react";

const news = [
  { title: "GPT-5.2 Released: OpenAI's Most Capable Model Yet", source: "TechCrunch", time: "2 hours ago", category: "AI", trending: true },
  { title: "React 20 Introduces Server Components by Default", source: "Vercel Blog", time: "5 hours ago", category: "Frontend", trending: true },
  { title: "Rust Overtakes C++ in Systems Programming Popularity", source: "InfoQ", time: "8 hours ago", category: "Languages", trending: false },
  { title: "AWS Announces 40% Price Cut on Lambda Functions", source: "AWS Blog", time: "12 hours ago", category: "Cloud", trending: true },
  { title: "GitHub Copilot X Now Writes Entire Applications", source: "GitHub Blog", time: "1 day ago", category: "Tools", trending: false },
  { title: "WebAssembly 3.0 Brings Full Threading Support", source: "MDN", time: "1 day ago", category: "Web", trending: false },
  { title: "Kubernetes 1.32: Simplified Networking with eBPF", source: "CNCF Blog", time: "2 days ago", category: "DevOps", trending: false },
  { title: "Python 3.15 Released with 3x Performance Improvements", source: "Python.org", time: "2 days ago", category: "Languages", trending: true },
  { title: "Apple Vision Pro 2: Developer SDK Now Available", source: "Apple Dev", time: "3 days ago", category: "Hardware", trending: false },
  { title: "Supabase Raises $200M to Compete with Firebase", source: "TechCrunch", time: "3 days ago", category: "Backend", trending: false },
  { title: "Deno 3.0 Achieves Full Node.js Compatibility", source: "Deno Blog", time: "4 days ago", category: "Runtime", trending: false },
  { title: "Tesla Releases Open Source Autonomous Driving Framework", source: "Ars Technica", time: "5 days ago", category: "AI", trending: true },
];

const catColor: Record<string, string> = {
  AI: "border-neon-purple/30 bg-neon-purple/10 text-neon-purple",
  Frontend: "border-neon-cyan/30 bg-neon-cyan/10 text-neon-cyan",
  Languages: "border-neon-amber/30 bg-neon-amber/10 text-neon-amber",
  Cloud: "border-neon-blue/30 bg-neon-blue/10 text-neon-blue",
  Tools: "border-neon-emerald/30 bg-neon-emerald/10 text-neon-emerald",
  Web: "border-neon-pink/30 bg-neon-pink/10 text-neon-pink",
  DevOps: "border-primary/30 bg-primary/10 text-primary",
  Backend: "border-neon-lime/30 bg-neon-lime/10 text-neon-lime",
  Hardware: "border-neon-amber/30 bg-neon-amber/10 text-neon-amber",
  Runtime: "border-neon-cyan/30 bg-neon-cyan/10 text-neon-cyan",
};

const TechNewsPage = () => {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
        <Newspaper className="h-6 w-6 text-primary" /> Tech News
      </h1>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-3">
          {news.map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
              className="glass-card p-5 group hover:border-primary/20 transition-all cursor-pointer">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full border ${catColor[item.category] || "border-border/30 text-muted-foreground"}`}>
                      {item.category}
                    </span>
                    {item.trending && (
                      <span className="flex items-center gap-0.5 text-[10px] text-neon-amber">
                        <TrendingUp className="h-2.5 w-2.5" /> Trending
                      </span>
                    )}
                  </div>
                  <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">{item.title}</h3>
                  <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                    <span>{item.source}</span>
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {item.time}</span>
                  </div>
                </div>
                <ExternalLink className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0 mt-1" />
              </div>
            </motion.div>
          ))}
        </div>

        <div className="space-y-4">
          <div className="glass-card p-5">
            <h3 className="text-sm font-semibold text-foreground mb-3">Trending Topics</h3>
            <div className="space-y-2">
              {["Artificial Intelligence", "WebAssembly", "Rust Lang", "Edge Computing", "LLM Agents"].map((t, i) => (
                <div key={t} className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted/20 cursor-pointer transition-colors">
                  <span className="text-xs text-muted-foreground w-4">#{i + 1}</span>
                  <span className="text-sm text-foreground">{t}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="glass-card p-5">
            <h3 className="text-sm font-semibold text-foreground mb-3">Quick Stats</h3>
            <div className="space-y-3">
              {[
                { label: "Articles Today", value: "47" },
                { label: "Trending Tech", value: "AI/ML" },
                { label: "Most Active", value: "Frontend" },
              ].map(s => (
                <div key={s.label} className="flex justify-between">
                  <span className="text-xs text-muted-foreground">{s.label}</span>
                  <span className="text-xs text-primary font-medium">{s.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TechNewsPage;
