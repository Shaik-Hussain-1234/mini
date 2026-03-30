import { useState } from "react";
import { motion } from "framer-motion";
import { GitBranch, Star, GitFork, ExternalLink, Filter } from "lucide-react";

const projects = [
  { name: "React", org: "facebook", desc: "A JavaScript library for building user interfaces", stars: "225k", forks: "46k", lang: "JavaScript", tags: ["frontend", "ui"], url: "https://github.com/facebook/react" },
  { name: "Next.js", org: "vercel", desc: "The React Framework for the Web", stars: "128k", forks: "27k", lang: "JavaScript", tags: ["frontend", "fullstack"], url: "https://github.com/vercel/next.js" },
  { name: "Rust", org: "rust-lang", desc: "Empowering everyone to build reliable and efficient software", stars: "100k", forks: "13k", lang: "Rust", tags: ["systems", "language"], url: "https://github.com/rust-lang/rust" },
  { name: "TensorFlow", org: "tensorflow", desc: "An end-to-end open source machine learning platform", stars: "186k", forks: "74k", lang: "Python", tags: ["ai", "ml"], url: "https://github.com/tensorflow/tensorflow" },
  { name: "VS Code", org: "microsoft", desc: "Visual Studio Code - Code editor redefined", stars: "165k", forks: "30k", lang: "TypeScript", tags: ["tools", "editor"], url: "https://github.com/microsoft/vscode" },
  { name: "Kubernetes", org: "kubernetes", desc: "Production-Grade Container Orchestration", stars: "112k", forks: "40k", lang: "Go", tags: ["devops", "cloud"], url: "https://github.com/kubernetes/kubernetes" },
  { name: "FastAPI", org: "tiangolo", desc: "Modern, fast web framework for building APIs with Python", stars: "78k", forks: "6.7k", lang: "Python", tags: ["backend", "api"], url: "https://github.com/tiangolo/fastapi" },
  { name: "Supabase", org: "supabase", desc: "The open source Firebase alternative", stars: "74k", forks: "7.2k", lang: "TypeScript", tags: ["backend", "database"], url: "https://github.com/supabase/supabase" },
  { name: "Tailwind CSS", org: "tailwindlabs", desc: "A utility-first CSS framework for rapid UI development", stars: "84k", forks: "4.3k", lang: "CSS", tags: ["frontend", "css"], url: "https://github.com/tailwindlabs/tailwindcss" },
  { name: "Docker", org: "moby", desc: "The Moby Project - container ecosystem toolkit", stars: "69k", forks: "19k", lang: "Go", tags: ["devops", "containers"], url: "https://github.com/moby/moby" },
  { name: "LangChain", org: "langchain-ai", desc: "Build context-aware reasoning applications", stars: "96k", forks: "15k", lang: "Python", tags: ["ai", "llm"], url: "https://github.com/langchain-ai/langchain" },
  { name: "Prisma", org: "prisma", desc: "Next-generation ORM for Node.js & TypeScript", stars: "40k", forks: "1.6k", lang: "TypeScript", tags: ["backend", "database"], url: "https://github.com/prisma/prisma" },
];

const allTags = [...new Set(projects.flatMap(p => p.tags))];
const allLangs = [...new Set(projects.map(p => p.lang))];

const OpenSourceExplorer = () => {
  const [tagFilter, setTagFilter] = useState<string | null>(null);
  const [langFilter, setLangFilter] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const filtered = projects.filter(p => {
    if (tagFilter && !p.tags.includes(tagFilter)) return false;
    if (langFilter && p.lang !== langFilter) return false;
    if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const langColor: Record<string, string> = {
    JavaScript: "bg-neon-amber", TypeScript: "bg-neon-blue", Python: "bg-neon-emerald",
    Go: "bg-neon-cyan", Rust: "bg-neon-pink", CSS: "bg-neon-purple",
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
        <GitBranch className="h-6 w-6 text-primary" /> Open Source Explorer
      </h1>

      <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search projects..."
        className="glass-input w-full px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/40" />

      <div className="flex gap-4 flex-wrap">
        <div className="flex gap-1 items-center flex-wrap">
          <Filter className="h-3 w-3 text-muted-foreground mr-1" />
          <button onClick={() => setTagFilter(null)} className={`tag-pill text-xs ${!tagFilter ? "border-primary/60 bg-primary/20" : ""}`}>All</button>
          {allTags.map(t => (
            <button key={t} onClick={() => setTagFilter(tagFilter === t ? null : t)} className={`tag-pill text-xs ${tagFilter === t ? "border-primary/60 bg-primary/20" : ""}`}>{t}</button>
          ))}
        </div>
        <div className="flex gap-1 items-center flex-wrap">
          {allLangs.map(l => (
            <button key={l} onClick={() => setLangFilter(langFilter === l ? null : l)} className={`tag-pill text-xs ${langFilter === l ? "border-primary/60 bg-primary/20" : ""}`}>{l}</button>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(p => (
          <motion.div key={p.name} layout className="glass-card-hover p-5 group">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">{p.name}</h3>
                <p className="text-xs text-muted-foreground">{p.org}</p>
              </div>
              <a href={p.url} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
            <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{p.desc}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><Star className="h-3 w-3 text-neon-amber" /> {p.stars}</span>
                <span className="flex items-center gap-1"><GitFork className="h-3 w-3" /> {p.forks}</span>
              </div>
              <div className="flex items-center gap-1">
                <div className={`h-2.5 w-2.5 rounded-full ${langColor[p.lang] || "bg-muted-foreground"}`} />
                <span className="text-xs text-muted-foreground">{p.lang}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default OpenSourceExplorer;
