import { motion } from "framer-motion";
import { Globe, Plus, Trash2, Eye, Download, Palette } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Project { name: string; description: string; tech: string; link: string }

const themes = [
  { id: "minimal", name: "Minimal", bg: "from-background to-secondary", accent: "primary" },
  { id: "neon", name: "Neon Dark", bg: "from-background via-card to-background", accent: "neon-cyan" },
  { id: "gradient", name: "Gradient", bg: "from-accent/20 via-background to-primary/10", accent: "accent" },
];

const PortfolioBuilder = () => {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [bio, setBio] = useState("");
  const [skills, setSkills] = useState<string[]>(["React", "TypeScript", "Python"]);
  const [skillInput, setSkillInput] = useState("");
  const [projects, setProjects] = useState<Project[]>([
    { name: "SkillNavigator", description: "AI-powered developer learning platform", tech: "React, TypeScript, Supabase", link: "" },
  ]);
  const [theme, setTheme] = useState(themes[1]);
  const [preview, setPreview] = useState(false);
  const [github, setGithub] = useState("");
  const [linkedin, setLinkedin] = useState("");

  const addProject = () => setProjects(p => [...p, { name: "", description: "", tech: "", link: "" }]);
  const removeProject = (i: number) => setProjects(p => p.filter((_, idx) => idx !== i));
  const updateProject = (i: number, field: keyof Project, val: string) => {
    setProjects(p => p.map((proj, idx) => idx === i ? { ...proj, [field]: val } : proj));
  };

  if (preview) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
        <Button variant="outline" size="sm" onClick={() => setPreview(false)}>← Back to Editor</Button>
        <div className={`glass-card neon-border p-8 bg-gradient-to-br ${theme.bg} space-y-8`}>
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold gradient-text">{name || "Your Name"}</h1>
            <p className="text-lg text-primary">{title || "Full Stack Developer"}</p>
            <p className="text-sm text-muted-foreground max-w-lg mx-auto">{bio || "Passionate developer building amazing things."}</p>
            <div className="flex justify-center gap-3 mt-2">
              {github && <a href={github} className="text-xs text-primary hover:underline">GitHub</a>}
              {linkedin && <a href={linkedin} className="text-xs text-primary hover:underline">LinkedIn</a>}
            </div>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-3">Skills</h2>
            <div className="flex flex-wrap gap-2 justify-center">
              {skills.map(s => (
                <motion.span key={s} whileHover={{ scale: 1.1 }} className="text-xs px-3 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary">{s}</motion.span>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-4">Projects</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {projects.filter(p => p.name).map((p, i) => (
                <div key={i} className="glass-card p-4 space-y-2">
                  <h3 className="text-base font-semibold text-foreground">{p.name}</h3>
                  <p className="text-xs text-muted-foreground">{p.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {p.tech.split(",").map(t => <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-secondary text-muted-foreground">{t.trim()}</span>)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2"><Globe className="h-6 w-6 text-primary" /> Portfolio Builder</h1>
          <p className="text-muted-foreground text-sm mt-1">Create a stunning developer portfolio from your projects.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="neon-outline" onClick={() => setPreview(true)}><Eye className="h-4 w-4 mr-1" /> Preview</Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Info */}
          <div className="glass-card p-6 space-y-4">
            <h2 className="text-base font-semibold text-foreground">Personal Info</h2>
            <div className="grid md:grid-cols-2 gap-3">
              <Input value={name} onChange={e => setName(e.target.value)} placeholder="Full Name" className="bg-secondary/30 border-border/50" />
              <Input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title (e.g. Full Stack Developer)" className="bg-secondary/30 border-border/50" />
              <Input value={github} onChange={e => setGithub(e.target.value)} placeholder="GitHub URL" className="bg-secondary/30 border-border/50" />
              <Input value={linkedin} onChange={e => setLinkedin(e.target.value)} placeholder="LinkedIn URL" className="bg-secondary/30 border-border/50" />
            </div>
            <textarea value={bio} onChange={e => setBio(e.target.value)} placeholder="Short bio..." className="w-full bg-secondary/30 border border-border/50 rounded-lg p-3 text-sm text-foreground placeholder:text-muted-foreground outline-none resize-none h-20" />
          </div>

          {/* Skills */}
          <div className="glass-card p-6 space-y-3">
            <h2 className="text-base font-semibold text-foreground">Skills</h2>
            <div className="flex gap-2">
              <Input value={skillInput} onChange={e => setSkillInput(e.target.value)} placeholder="Add skill..." className="bg-secondary/30 border-border/50"
                onKeyDown={e => { if (e.key === "Enter" && skillInput.trim()) { setSkills(s => [...s, skillInput.trim()]); setSkillInput(""); }}} />
              <Button variant="neon" size="sm" onClick={() => { if (skillInput.trim()) { setSkills(s => [...s, skillInput.trim()]); setSkillInput(""); }}}>Add</Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {skills.map((s, i) => (
                <span key={i} className="text-xs px-2.5 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary flex items-center gap-1">
                  {s} <button onClick={() => setSkills(sk => sk.filter((_, idx) => idx !== i))} className="hover:text-destructive">×</button>
                </span>
              ))}
            </div>
          </div>

          {/* Projects */}
          <div className="glass-card p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold text-foreground">Projects</h2>
              <Button variant="ghost" size="sm" onClick={addProject}><Plus className="h-4 w-4 mr-1" /> Add</Button>
            </div>
            {projects.map((p, i) => (
              <div key={i} className="p-4 bg-secondary/20 rounded-lg space-y-2">
                <div className="flex items-center justify-between">
                  <Input value={p.name} onChange={e => updateProject(i, "name", e.target.value)} placeholder="Project name" className="bg-secondary/30 border-border/50 flex-1 mr-2" />
                  <button onClick={() => removeProject(i)} className="text-muted-foreground hover:text-destructive"><Trash2 className="h-4 w-4" /></button>
                </div>
                <Input value={p.description} onChange={e => updateProject(i, "description", e.target.value)} placeholder="Description" className="bg-secondary/30 border-border/50" />
                <Input value={p.tech} onChange={e => updateProject(i, "tech", e.target.value)} placeholder="Tech stack (comma separated)" className="bg-secondary/30 border-border/50" />
              </div>
            ))}
          </div>
        </div>

        {/* Theme Selector */}
        <div className="space-y-4">
          <div className="glass-card p-6 space-y-3">
            <h2 className="text-base font-semibold text-foreground flex items-center gap-2"><Palette className="h-4 w-4 text-primary" /> Theme</h2>
            {themes.map(t => (
              <button key={t.id} onClick={() => setTheme(t)}
                className={`w-full p-3 rounded-lg border transition-all text-left ${theme.id === t.id ? "border-primary bg-primary/10" : "border-border/50 hover:border-primary/30"}`}>
                <span className="text-sm text-foreground">{t.name}</span>
              </button>
            ))}
          </div>
          <div className="glass-card neon-border p-6 text-center space-y-3">
            <h3 className="text-sm font-semibold text-foreground">Portfolio Score</h3>
            <div className="text-4xl font-bold gradient-text">
              {Math.min(100, (name ? 15 : 0) + (title ? 10 : 0) + (bio ? 15 : 0) + skills.length * 5 + projects.filter(p => p.name).length * 15)}%
            </div>
            <p className="text-xs text-muted-foreground">Complete all sections for maximum impact</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PortfolioBuilder;
