import { motion } from "framer-motion";
import { Layers, Plus, X, ArrowRight, Sparkles, CheckCircle } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const categories = [
  { name: "Frontend", options: [
    { id: "react", name: "React", icon: "⚛️", desc: "Component-based UI library" },
    { id: "vue", name: "Vue.js", icon: "💚", desc: "Progressive JS framework" },
    { id: "angular", name: "Angular", icon: "🅰️", desc: "Full-featured framework" },
    { id: "nextjs", name: "Next.js", icon: "▲", desc: "React meta-framework" },
    { id: "svelte", name: "Svelte", icon: "🔥", desc: "Compile-time framework" },
  ]},
  { name: "Backend", options: [
    { id: "nodejs", name: "Node.js", icon: "🟢", desc: "JavaScript runtime" },
    { id: "python-be", name: "Python/Django", icon: "🐍", desc: "Batteries-included" },
    { id: "go", name: "Go", icon: "🔷", desc: "Fast, concurrent" },
    { id: "rust-be", name: "Rust/Actix", icon: "🦀", desc: "Safe, performant" },
    { id: "java-be", name: "Java/Spring", icon: "☕", desc: "Enterprise-grade" },
  ]},
  { name: "Database", options: [
    { id: "postgres", name: "PostgreSQL", icon: "🐘", desc: "Relational, robust" },
    { id: "mongodb", name: "MongoDB", icon: "🍃", desc: "Document store" },
    { id: "redis", name: "Redis", icon: "🔴", desc: "In-memory cache" },
    { id: "supabase-db", name: "Supabase", icon: "⚡", desc: "Postgres + APIs" },
    { id: "firebase-db", name: "Firebase", icon: "🔥", desc: "Real-time NoSQL" },
  ]},
  { name: "DevOps", options: [
    { id: "docker", name: "Docker", icon: "🐳", desc: "Containerization" },
    { id: "k8s", name: "Kubernetes", icon: "☸️", desc: "Container orchestration" },
    { id: "github-actions", name: "GitHub Actions", icon: "🔄", desc: "CI/CD pipelines" },
    { id: "vercel", name: "Vercel", icon: "▲", desc: "Frontend deployment" },
    { id: "aws", name: "AWS", icon: "☁️", desc: "Cloud platform" },
  ]},
];

const recommendations: Record<string, { stack: string[]; reason: string }> = {
  "AI Engineer": { stack: ["react", "python-be", "postgres", "docker"], reason: "Python is essential for ML. React for dashboards. PostgreSQL for structured data." },
  "Full Stack Developer": { stack: ["react", "nodejs", "postgres", "github-actions"], reason: "JavaScript full stack. PostgreSQL is versatile. GitHub Actions for CI/CD." },
  "DevOps Engineer": { stack: ["react", "go", "postgres", "k8s"], reason: "Go for CLI tools. Kubernetes is industry standard. React for internal tools." },
  "Data Scientist": { stack: ["react", "python-be", "postgres", "docker"], reason: "Python for analysis. PostgreSQL for data storage. Docker for reproducibility." },
};

const TechStackBuilder = () => {
  const [selected, setSelected] = useState<Record<string, string>>({});
  const [careerPath, setCareerPath] = useState<string | null>(null);

  const toggle = (category: string, id: string) => {
    setSelected(prev => ({ ...prev, [category]: prev[category] === id ? "" : id }));
  };

  const applyRecommendation = (career: string) => {
    const rec = recommendations[career];
    if (!rec) return;
    const newSel: Record<string, string> = {};
    categories.forEach((cat, i) => {
      const match = cat.options.find(o => rec.stack.includes(o.id));
      if (match) newSel[cat.name] = match.id;
    });
    setSelected(newSel);
    setCareerPath(career);
  };

  const stackComplete = Object.keys(selected).filter(k => selected[k]).length;

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2"><Layers className="h-6 w-6 text-primary" /> Tech Stack Builder</h1>
        <p className="text-muted-foreground text-sm mt-1">Assemble the perfect tech stack for your career path.</p>
      </div>

      {/* Quick Recommendations */}
      <div className="glass-card p-4">
        <h2 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2"><Sparkles className="h-4 w-4 text-neon-amber" /> Quick Recommendations</h2>
        <div className="flex gap-2 flex-wrap">
          {Object.keys(recommendations).map(career => (
            <Button key={career} variant={careerPath === career ? "neon" : "neon-outline"} size="sm" onClick={() => applyRecommendation(career)} className="text-xs">
              {career}
            </Button>
          ))}
        </div>
        {careerPath && recommendations[careerPath] && (
          <p className="text-xs text-muted-foreground mt-2">{recommendations[careerPath].reason}</p>
        )}
      </div>

      {/* Stack Builder */}
      <div className="grid md:grid-cols-2 gap-6">
        {categories.map(cat => (
          <div key={cat.name} className="glass-card p-6 space-y-3">
            <h2 className="text-base font-semibold text-foreground">{cat.name}</h2>
            <div className="space-y-2">
              {cat.options.map(opt => (
                <motion.button key={opt.id} whileHover={{ scale: 1.02 }} onClick={() => toggle(cat.name, opt.id)}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg border transition-all text-left ${
                    selected[cat.name] === opt.id ? "border-primary bg-primary/10" : "border-border/50 hover:border-primary/30"
                  }`}
                >
                  <span className="text-xl">{opt.icon}</span>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-foreground">{opt.name}</div>
                    <div className="text-[10px] text-muted-foreground">{opt.desc}</div>
                  </div>
                  {selected[cat.name] === opt.id && <CheckCircle className="h-4 w-4 text-primary" />}
                </motion.button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Stack Summary */}
      {stackComplete > 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card neon-border p-6 space-y-3">
          <h2 className="text-base font-semibold gradient-text">Your Tech Stack ({stackComplete}/4)</h2>
          <div className="flex gap-3 flex-wrap">
            {categories.map(cat => {
              const sel = cat.options.find(o => o.id === selected[cat.name]);
              return sel ? (
                <div key={cat.name} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-primary/5 border border-primary/20">
                  <span className="text-lg">{sel.icon}</span>
                  <div>
                    <div className="text-xs font-semibold text-foreground">{sel.name}</div>
                    <div className="text-[10px] text-muted-foreground">{cat.name}</div>
                  </div>
                </div>
              ) : null;
            })}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default TechStackBuilder;
