import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Target, ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";

const jobRoles = [
  "AI Engineer", "Data Scientist", "Frontend Developer", "Backend Developer",
  "DevOps Engineer", "Cloud Architect", "Full Stack Developer", "Cybersecurity Analyst",
  "Data Engineer", "ML Engineer",
];

const allSkills = [
  "Python", "JavaScript", "TypeScript", "React", "Node.js", "SQL", "Docker",
  "Kubernetes", "AWS", "GCP", "Azure", "TensorFlow", "PyTorch", "Git",
  "Linux", "MongoDB", "PostgreSQL", "Redis", "GraphQL", "REST APIs",
  "CI/CD", "Terraform", "Java", "C++", "Go", "Rust",
];

const roleRequirements: Record<string, string[]> = {
  "AI Engineer": ["Python", "TensorFlow", "PyTorch", "Docker", "AWS", "SQL", "Git", "Linux", "REST APIs", "Kubernetes"],
  "Frontend Developer": ["JavaScript", "TypeScript", "React", "Git", "REST APIs", "GraphQL", "CSS", "Node.js"],
  "DevOps Engineer": ["Docker", "Kubernetes", "AWS", "Linux", "CI/CD", "Terraform", "Git", "Python", "MongoDB"],
  "Full Stack Developer": ["JavaScript", "TypeScript", "React", "Node.js", "SQL", "PostgreSQL", "Git", "Docker", "REST APIs"],
  "Data Scientist": ["Python", "SQL", "TensorFlow", "Git", "AWS", "PostgreSQL", "Docker", "Linux"],
  "Backend Developer": ["Python", "Node.js", "SQL", "PostgreSQL", "Docker", "Git", "REST APIs", "Redis", "Linux"],
  "Cloud Architect": ["AWS", "GCP", "Azure", "Docker", "Kubernetes", "Terraform", "Linux", "CI/CD", "Python"],
  "Cybersecurity Analyst": ["Linux", "Python", "Git", "AWS", "Docker", "SQL", "REST APIs"],
  "Data Engineer": ["Python", "SQL", "AWS", "Docker", "Kubernetes", "PostgreSQL", "Git", "Linux"],
  "ML Engineer": ["Python", "TensorFlow", "PyTorch", "Docker", "AWS", "Git", "Kubernetes", "SQL"],
};

const SkillGapAnalyzer = () => {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [targetRole, setTargetRole] = useState("");
  const [analyzed, setAnalyzed] = useState(false);

  const toggleSkill = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
    setAnalyzed(false);
  };

  const required = roleRequirements[targetRole] || [];
  const matched = required.filter((s) => selectedSkills.includes(s));
  const missing = required.filter((s) => !selectedSkills.includes(s));
  const score = required.length > 0 ? Math.round((matched.length / required.length) * 100) : 0;

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <Target className="h-6 w-6 text-primary" /> Skill Gap Analyzer
        </h1>
        <p className="text-muted-foreground text-sm mt-1">Select your current skills and target role to identify gaps.</p>
      </div>

      {/* Target Role */}
      <div className="glass-card p-6">
        <h2 className="text-sm font-semibold text-foreground mb-3">Select Target Role</h2>
        <div className="flex flex-wrap gap-2">
          {jobRoles.map((role) => (
            <button
              key={role}
              onClick={() => { setTargetRole(role); setAnalyzed(false); }}
              className={`text-xs px-3 py-1.5 rounded-full border transition-all duration-200 ${
                targetRole === role
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border text-muted-foreground hover:border-primary/30 hover:text-foreground"
              }`}
            >
              {role}
            </button>
          ))}
        </div>
      </div>

      {/* Current Skills */}
      <div className="glass-card p-6">
        <h2 className="text-sm font-semibold text-foreground mb-3">Select Your Current Skills</h2>
        <div className="flex flex-wrap gap-2">
          {allSkills.map((skill) => (
            <button
              key={skill}
              onClick={() => toggleSkill(skill)}
              className={`text-xs px-3 py-1.5 rounded-full border transition-all duration-200 ${
                selectedSkills.includes(skill)
                  ? "border-neon-emerald bg-neon-emerald/10 text-neon-emerald"
                  : "border-border text-muted-foreground hover:border-primary/30 hover:text-foreground"
              }`}
            >
              {skill}
            </button>
          ))}
        </div>
      </div>

      {/* Analyze Button */}
      <Button variant="neon" onClick={() => setAnalyzed(true)} disabled={!targetRole || selectedSkills.length === 0}>
        Analyze Skill Gap <ArrowRight className="ml-2 h-4 w-4" />
      </Button>

      {/* Results */}
      {analyzed && targetRole && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
          {/* Score */}
          <div className="glass-card neon-border p-6 text-center">
            <p className="text-sm text-muted-foreground mb-2">Readiness Score for {targetRole}</p>
            <div className="text-5xl font-bold gradient-text">{score}%</div>
            <div className="h-3 bg-muted rounded-full overflow-hidden mt-4 max-w-md mx-auto">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${score}%` }}
                transition={{ duration: 1 }}
                className="h-full rounded-full bg-neon-cyan"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {/* Matched */}
            <div className="glass-card p-5">
              <h3 className="text-sm font-semibold text-neon-emerald flex items-center gap-2 mb-3">
                <CheckCircle2 className="h-4 w-4" /> Skills You Have ({matched.length})
              </h3>
              <div className="flex flex-wrap gap-2">
                {matched.map((s) => (
                  <span key={s} className="text-xs px-2.5 py-1 rounded-full border border-neon-emerald/30 bg-neon-emerald/5 text-neon-emerald">{s}</span>
                ))}
                {matched.length === 0 && <p className="text-xs text-muted-foreground">None yet — start learning!</p>}
              </div>
            </div>
            {/* Missing */}
            <div className="glass-card p-5">
              <h3 className="text-sm font-semibold text-neon-pink flex items-center gap-2 mb-3">
                <AlertCircle className="h-4 w-4" /> Skills to Learn ({missing.length})
              </h3>
              <div className="flex flex-wrap gap-2">
                {missing.map((s) => (
                  <span key={s} className="text-xs px-2.5 py-1 rounded-full border border-neon-pink/30 bg-neon-pink/5 text-neon-pink">{s}</span>
                ))}
                {missing.length === 0 && <p className="text-xs text-neon-emerald">You have all required skills! 🎉</p>}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default SkillGapAnalyzer;
