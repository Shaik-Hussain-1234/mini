import { motion } from "framer-motion";
import { FileText, Download, Plus, Trash2, Eye, Star } from "lucide-react";
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface ResumeData {
  name: string; email: string; phone: string; location: string;
  summary: string;
  skills: string[];
  experience: { title: string; company: string; duration: string; description: string }[];
  education: { degree: string; school: string; year: string }[];
  projects: { name: string; tech: string; description: string }[];
  certifications: string[];
}

const templates = [
  { id: "modern", name: "Modern", color: "from-primary to-accent" },
  { id: "classic", name: "Classic", color: "from-neon-emerald to-neon-cyan" },
  { id: "minimal", name: "Minimal", color: "from-neon-amber to-neon-pink" },
];

const emptyResume: ResumeData = {
  name: "", email: "", phone: "", location: "", summary: "",
  skills: [], experience: [], education: [], projects: [], certifications: [],
};

const ResumeBuilder = () => {
  const [data, setData] = useState<ResumeData>(emptyResume);
  const [template, setTemplate] = useState("modern");
  const [preview, setPreview] = useState(false);
  const [newSkill, setNewSkill] = useState("");
  const [newCert, setNewCert] = useState("");
  const printRef = useRef<HTMLDivElement>(null);

  const score = (() => {
    let s = 0;
    if (data.name) s += 10;
    if (data.email) s += 10;
    if (data.summary.length > 30) s += 15;
    if (data.skills.length >= 5) s += 15; else if (data.skills.length > 0) s += 8;
    if (data.experience.length > 0) s += 20;
    if (data.education.length > 0) s += 10;
    if (data.projects.length > 0) s += 10;
    if (data.certifications.length > 0) s += 10;
    return Math.min(s, 100);
  })();

  const handleExportPDF = () => {
    const content = printRef.current;
    if (!content) return;
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;
    printWindow.document.write(`
      <html><head><title>${data.name || "Resume"} - Resume</title>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Segoe UI', sans-serif; color: #1a1a1a; padding: 40px; max-width: 800px; margin: 0 auto; }
        h1 { font-size: 28px; margin-bottom: 4px; }
        h2 { font-size: 16px; color: #0891b2; border-bottom: 2px solid #0891b2; padding-bottom: 4px; margin: 20px 0 10px; text-transform: uppercase; letter-spacing: 1px; }
        h3 { font-size: 14px; margin-bottom: 2px; }
        p, li { font-size: 13px; line-height: 1.5; color: #333; }
        .contact { color: #666; font-size: 13px; margin-bottom: 12px; }
        .skill-tag { display: inline-block; background: #f0f9ff; border: 1px solid #bae6fd; padding: 2px 10px; border-radius: 12px; font-size: 12px; margin: 2px; }
        .exp-header { display: flex; justify-content: space-between; align-items: baseline; }
        .duration { color: #888; font-size: 12px; }
        ul { padding-left: 18px; margin-top: 4px; }
        @media print { body { padding: 20px; } }
      </style></head><body>
        <h1>${data.name}</h1>
        <div class="contact">${[data.email, data.phone, data.location].filter(Boolean).join(" • ")}</div>
        ${data.summary ? `<h2>Summary</h2><p>${data.summary}</p>` : ""}
        ${data.skills.length ? `<h2>Skills</h2><div>${data.skills.map(s => `<span class="skill-tag">${s}</span>`).join(" ")}</div>` : ""}
        ${data.experience.length ? `<h2>Experience</h2>${data.experience.map(e => `
          <div style="margin-bottom:12px"><div class="exp-header"><h3>${e.title} — ${e.company}</h3><span class="duration">${e.duration}</span></div><p>${e.description}</p></div>
        `).join("")}` : ""}
        ${data.education.length ? `<h2>Education</h2>${data.education.map(e => `<div style="margin-bottom:8px"><div class="exp-header"><h3>${e.degree}</h3><span class="duration">${e.year}</span></div><p>${e.school}</p></div>`).join("")}` : ""}
        ${data.projects.length ? `<h2>Projects</h2>${data.projects.map(p => `<div style="margin-bottom:10px"><h3>${p.name} <span class="duration">(${p.tech})</span></h3><p>${p.description}</p></div>`).join("")}` : ""}
        ${data.certifications.length ? `<h2>Certifications</h2><ul>${data.certifications.map(c => `<li>${c}</li>`).join("")}</ul>` : ""}
      </body></html>
    `);
    printWindow.document.close();
    setTimeout(() => { printWindow.print(); }, 500);
  };

  const addExperience = () => setData(d => ({ ...d, experience: [...d.experience, { title: "", company: "", duration: "", description: "" }] }));
  const addEducation = () => setData(d => ({ ...d, education: [...d.education, { degree: "", school: "", year: "" }] }));
  const addProject = () => setData(d => ({ ...d, projects: [...d.projects, { name: "", tech: "", description: "" }] }));

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <FileText className="h-6 w-6 text-primary" /> ATS Resume Builder
          </h1>
          <p className="text-muted-foreground text-sm mt-1">Create professional, ATS-friendly resumes.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="glass-card px-4 py-2 flex items-center gap-2">
            <Star className="h-4 w-4 text-neon-amber" />
            <span className="text-sm font-bold text-foreground">{score}</span>
            <span className="text-xs text-muted-foreground">/100</span>
          </div>
          <Button variant="neon" onClick={handleExportPDF} disabled={!data.name}>
            <Download className="h-4 w-4 mr-2" /> Export PDF
          </Button>
        </div>
      </div>

      {/* Template Selection */}
      <div className="flex gap-3">
        {templates.map(t => (
          <button key={t.id} onClick={() => setTemplate(t.id)}
            className={`px-4 py-2 rounded-lg border text-sm transition-all ${template === t.id ? "border-primary bg-primary/10 text-primary" : "border-border/50 text-muted-foreground"}`}>
            {t.name}
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Form */}
        <div className="space-y-6">
          {/* Personal */}
          <div className="glass-card p-5 space-y-3">
            <h2 className="text-sm font-semibold text-foreground">Personal Information</h2>
            <div className="grid grid-cols-2 gap-3">
              <div><Label className="text-xs text-muted-foreground">Full Name</Label><Input value={data.name} onChange={e => setData(d => ({ ...d, name: e.target.value }))} className="mt-1 bg-secondary/30 border-border/50" /></div>
              <div><Label className="text-xs text-muted-foreground">Email</Label><Input value={data.email} onChange={e => setData(d => ({ ...d, email: e.target.value }))} className="mt-1 bg-secondary/30 border-border/50" /></div>
              <div><Label className="text-xs text-muted-foreground">Phone</Label><Input value={data.phone} onChange={e => setData(d => ({ ...d, phone: e.target.value }))} className="mt-1 bg-secondary/30 border-border/50" /></div>
              <div><Label className="text-xs text-muted-foreground">Location</Label><Input value={data.location} onChange={e => setData(d => ({ ...d, location: e.target.value }))} className="mt-1 bg-secondary/30 border-border/50" /></div>
            </div>
            <div><Label className="text-xs text-muted-foreground">Professional Summary</Label><Textarea value={data.summary} onChange={e => setData(d => ({ ...d, summary: e.target.value }))} className="mt-1 bg-secondary/30 border-border/50 h-20" /></div>
          </div>

          {/* Skills */}
          <div className="glass-card p-5 space-y-3">
            <h2 className="text-sm font-semibold text-foreground">Skills</h2>
            <div className="flex gap-2">
              <Input value={newSkill} onChange={e => setNewSkill(e.target.value)} placeholder="Add a skill..." className="bg-secondary/30 border-border/50"
                onKeyDown={e => { if (e.key === "Enter" && newSkill.trim()) { setData(d => ({ ...d, skills: [...d.skills, newSkill.trim()] })); setNewSkill(""); }}} />
              <Button variant="outline" size="icon" onClick={() => { if (newSkill.trim()) { setData(d => ({ ...d, skills: [...d.skills, newSkill.trim()] })); setNewSkill(""); }}}><Plus className="h-4 w-4" /></Button>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {data.skills.map((s, i) => (
                <span key={i} className="text-xs px-2.5 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary flex items-center gap-1">
                  {s} <button onClick={() => setData(d => ({ ...d, skills: d.skills.filter((_, j) => j !== i) }))}><Trash2 className="h-2.5 w-2.5" /></button>
                </span>
              ))}
            </div>
          </div>

          {/* Experience */}
          <div className="glass-card p-5 space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-foreground">Experience</h2>
              <Button variant="ghost" size="sm" onClick={addExperience} className="text-primary text-xs"><Plus className="h-3 w-3 mr-1" /> Add</Button>
            </div>
            {data.experience.map((exp, i) => (
              <div key={i} className="p-3 bg-secondary/20 rounded-lg space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <Input placeholder="Job Title" value={exp.title} onChange={e => { const n = [...data.experience]; n[i].title = e.target.value; setData(d => ({ ...d, experience: n })); }} className="bg-secondary/30 border-border/50 text-xs" />
                  <Input placeholder="Company" value={exp.company} onChange={e => { const n = [...data.experience]; n[i].company = e.target.value; setData(d => ({ ...d, experience: n })); }} className="bg-secondary/30 border-border/50 text-xs" />
                </div>
                <Input placeholder="Duration (e.g. Jan 2024 - Present)" value={exp.duration} onChange={e => { const n = [...data.experience]; n[i].duration = e.target.value; setData(d => ({ ...d, experience: n })); }} className="bg-secondary/30 border-border/50 text-xs" />
                <Textarea placeholder="Description..." value={exp.description} onChange={e => { const n = [...data.experience]; n[i].description = e.target.value; setData(d => ({ ...d, experience: n })); }} className="bg-secondary/30 border-border/50 text-xs h-16" />
                <Button variant="ghost" size="sm" onClick={() => setData(d => ({ ...d, experience: d.experience.filter((_, j) => j !== i) }))} className="text-destructive text-xs"><Trash2 className="h-3 w-3 mr-1" /> Remove</Button>
              </div>
            ))}
          </div>

          {/* Education */}
          <div className="glass-card p-5 space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-foreground">Education</h2>
              <Button variant="ghost" size="sm" onClick={addEducation} className="text-primary text-xs"><Plus className="h-3 w-3 mr-1" /> Add</Button>
            </div>
            {data.education.map((edu, i) => (
              <div key={i} className="p-3 bg-secondary/20 rounded-lg space-y-2">
                <Input placeholder="Degree" value={edu.degree} onChange={e => { const n = [...data.education]; n[i].degree = e.target.value; setData(d => ({ ...d, education: n })); }} className="bg-secondary/30 border-border/50 text-xs" />
                <div className="grid grid-cols-2 gap-2">
                  <Input placeholder="School" value={edu.school} onChange={e => { const n = [...data.education]; n[i].school = e.target.value; setData(d => ({ ...d, education: n })); }} className="bg-secondary/30 border-border/50 text-xs" />
                  <Input placeholder="Year" value={edu.year} onChange={e => { const n = [...data.education]; n[i].year = e.target.value; setData(d => ({ ...d, education: n })); }} className="bg-secondary/30 border-border/50 text-xs" />
                </div>
                <Button variant="ghost" size="sm" onClick={() => setData(d => ({ ...d, education: d.education.filter((_, j) => j !== i) }))} className="text-destructive text-xs"><Trash2 className="h-3 w-3 mr-1" /> Remove</Button>
              </div>
            ))}
          </div>

          {/* Projects */}
          <div className="glass-card p-5 space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-foreground">Projects</h2>
              <Button variant="ghost" size="sm" onClick={addProject} className="text-primary text-xs"><Plus className="h-3 w-3 mr-1" /> Add</Button>
            </div>
            {data.projects.map((proj, i) => (
              <div key={i} className="p-3 bg-secondary/20 rounded-lg space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <Input placeholder="Project Name" value={proj.name} onChange={e => { const n = [...data.projects]; n[i].name = e.target.value; setData(d => ({ ...d, projects: n })); }} className="bg-secondary/30 border-border/50 text-xs" />
                  <Input placeholder="Tech Stack" value={proj.tech} onChange={e => { const n = [...data.projects]; n[i].tech = e.target.value; setData(d => ({ ...d, projects: n })); }} className="bg-secondary/30 border-border/50 text-xs" />
                </div>
                <Textarea placeholder="Description..." value={proj.description} onChange={e => { const n = [...data.projects]; n[i].description = e.target.value; setData(d => ({ ...d, projects: n })); }} className="bg-secondary/30 border-border/50 text-xs h-16" />
                <Button variant="ghost" size="sm" onClick={() => setData(d => ({ ...d, projects: d.projects.filter((_, j) => j !== i) }))} className="text-destructive text-xs"><Trash2 className="h-3 w-3 mr-1" /> Remove</Button>
              </div>
            ))}
          </div>

          {/* Certifications */}
          <div className="glass-card p-5 space-y-3">
            <h2 className="text-sm font-semibold text-foreground">Certifications</h2>
            <div className="flex gap-2">
              <Input value={newCert} onChange={e => setNewCert(e.target.value)} placeholder="Add certification..." className="bg-secondary/30 border-border/50"
                onKeyDown={e => { if (e.key === "Enter" && newCert.trim()) { setData(d => ({ ...d, certifications: [...d.certifications, newCert.trim()] })); setNewCert(""); }}} />
              <Button variant="outline" size="icon" onClick={() => { if (newCert.trim()) { setData(d => ({ ...d, certifications: [...d.certifications, newCert.trim()] })); setNewCert(""); }}}><Plus className="h-4 w-4" /></Button>
            </div>
            <div className="space-y-1">
              {data.certifications.map((c, i) => (
                <div key={i} className="flex items-center justify-between text-sm text-muted-foreground p-2 bg-secondary/20 rounded">
                  {c}
                  <button onClick={() => setData(d => ({ ...d, certifications: d.certifications.filter((_, j) => j !== i) }))}><Trash2 className="h-3 w-3 text-destructive" /></button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Live Preview */}
        <div className="glass-card p-6 sticky top-20 max-h-[calc(100vh-120px)] overflow-y-auto" ref={printRef}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-foreground flex items-center gap-2"><Eye className="h-4 w-4 text-primary" /> Live Preview</h2>
            <span className="text-[10px] px-2 py-0.5 rounded-full border border-primary/20 bg-primary/5 text-primary uppercase">{template}</span>
          </div>
          
          <div className="bg-white text-gray-900 rounded-lg p-6 min-h-[500px] text-sm">
            {data.name ? (
              <div className="space-y-4">
                <div className="border-b-2 border-cyan-600 pb-3">
                  <h1 className="text-2xl font-bold text-gray-900">{data.name}</h1>
                  <p className="text-gray-500 text-xs mt-1">{[data.email, data.phone, data.location].filter(Boolean).join(" • ")}</p>
                </div>
                {data.summary && <div><h2 className="text-xs font-bold text-cyan-700 uppercase tracking-wider mb-1">Summary</h2><p className="text-xs text-gray-600 leading-relaxed">{data.summary}</p></div>}
                {data.skills.length > 0 && <div><h2 className="text-xs font-bold text-cyan-700 uppercase tracking-wider mb-1">Skills</h2><div className="flex flex-wrap gap-1">{data.skills.map((s,i) => <span key={i} className="text-[10px] px-2 py-0.5 bg-cyan-50 border border-cyan-200 rounded-full text-cyan-700">{s}</span>)}</div></div>}
                {data.experience.length > 0 && <div><h2 className="text-xs font-bold text-cyan-700 uppercase tracking-wider mb-2">Experience</h2>{data.experience.map((e,i) => <div key={i} className="mb-3"><div className="flex justify-between"><span className="text-xs font-semibold">{e.title} — {e.company}</span><span className="text-[10px] text-gray-400">{e.duration}</span></div><p className="text-[11px] text-gray-600 mt-1">{e.description}</p></div>)}</div>}
                {data.education.length > 0 && <div><h2 className="text-xs font-bold text-cyan-700 uppercase tracking-wider mb-2">Education</h2>{data.education.map((e,i) => <div key={i} className="mb-2"><div className="flex justify-between"><span className="text-xs font-semibold">{e.degree}</span><span className="text-[10px] text-gray-400">{e.year}</span></div><p className="text-[11px] text-gray-500">{e.school}</p></div>)}</div>}
                {data.projects.length > 0 && <div><h2 className="text-xs font-bold text-cyan-700 uppercase tracking-wider mb-2">Projects</h2>{data.projects.map((p,i) => <div key={i} className="mb-2"><span className="text-xs font-semibold">{p.name}</span><span className="text-[10px] text-gray-400 ml-1">({p.tech})</span><p className="text-[11px] text-gray-600">{p.description}</p></div>)}</div>}
                {data.certifications.length > 0 && <div><h2 className="text-xs font-bold text-cyan-700 uppercase tracking-wider mb-1">Certifications</h2><ul className="list-disc pl-4">{data.certifications.map((c,i) => <li key={i} className="text-[11px] text-gray-600">{c}</li>)}</ul></div>}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-[400px] text-gray-400">
                <FileText className="h-12 w-12 mb-3 opacity-30" />
                <p className="text-sm">Start filling in your details</p>
                <p className="text-xs">Your resume will preview here</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ResumeBuilder;
