import { motion } from "framer-motion";
import { FileText, Upload, CheckCircle, AlertTriangle, XCircle } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const mockAnalysis = {
  score: 72,
  strengths: ["Good project experience", "Relevant skills listed", "Clean formatting"],
  improvements: [
    "Add quantifiable achievements (numbers, percentages)",
    "Include a professional summary section",
    "Add links to GitHub and portfolio",
    "Tailor skills to the target job description",
    "Add certifications section",
  ],
  missingSkills: ["Docker", "Kubernetes", "CI/CD", "Cloud (AWS/Azure)"],
  format: { issues: ["Resume exceeds 2 pages", "Inconsistent date formatting"], good: ["Professional font used", "Clear section headers"] },
};

const ResumeAnalyzer = () => {
  const [uploaded, setUploaded] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<typeof mockAnalysis | null>(null);

  const handleUpload = () => {
    setUploaded(true);
    setAnalyzing(true);
    setTimeout(() => {
      setResult(mockAnalysis);
      setAnalyzing(false);
    }, 2000);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <FileText className="h-6 w-6 text-primary" /> Resume Analyzer
        </h1>
        <p className="text-muted-foreground text-sm mt-1">Upload your resume for AI-powered analysis and improvement suggestions.</p>
      </div>

      {!uploaded && (
        <div className="glass-card neon-border p-12 text-center">
          <Upload className="h-12 w-12 text-primary mx-auto mb-4" />
          <h2 className="text-lg font-semibold text-foreground mb-2">Upload Your Resume</h2>
          <p className="text-sm text-muted-foreground mb-6">Supports PDF, DOC, DOCX (max 5MB)</p>
          <Button variant="neon" onClick={handleUpload}>
            <Upload className="h-4 w-4 mr-2" /> Select File
          </Button>
        </div>
      )}

      {analyzing && (
        <div className="glass-card p-12 text-center">
          <div className="h-8 w-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-foreground">Analyzing your resume...</p>
        </div>
      )}

      {result && !analyzing && (
        <div className="space-y-6">
          <div className="glass-card neon-border p-8 text-center">
            <h2 className="text-lg font-semibold text-foreground mb-2">Resume Score</h2>
            <div className="text-5xl font-bold gradient-text">{result.score}/100</div>
            <p className="text-sm text-muted-foreground mt-2">{result.score >= 80 ? "Great resume! 🎉" : result.score >= 60 ? "Good, but room for improvement 💪" : "Needs significant improvements 📝"}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="glass-card p-6">
              <h3 className="text-base font-semibold text-foreground mb-4 flex items-center gap-2"><CheckCircle className="h-4 w-4 text-neon-emerald" /> Strengths</h3>
              <div className="space-y-2">
                {result.strengths.map((s) => (
                  <div key={s} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="h-3.5 w-3.5 text-neon-emerald shrink-0" /> {s}
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-card p-6">
              <h3 className="text-base font-semibold text-foreground mb-4 flex items-center gap-2"><AlertTriangle className="h-4 w-4 text-neon-amber" /> Improvements</h3>
              <div className="space-y-2">
                {result.improvements.map((s) => (
                  <div key={s} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <AlertTriangle className="h-3.5 w-3.5 text-neon-amber shrink-0" /> {s}
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-card p-6">
              <h3 className="text-base font-semibold text-foreground mb-4 flex items-center gap-2"><XCircle className="h-4 w-4 text-neon-pink" /> Missing Skills</h3>
              <div className="flex flex-wrap gap-2">
                {result.missingSkills.map((s) => (
                  <span key={s} className="text-xs px-2.5 py-1 rounded-full border border-neon-pink/20 bg-neon-pink/5 text-neon-pink">{s}</span>
                ))}
              </div>
            </div>

            <div className="glass-card p-6">
              <h3 className="text-base font-semibold text-foreground mb-4">Formatting</h3>
              <div className="space-y-2">
                {result.format.good.map((s) => (
                  <div key={s} className="flex items-center gap-2 text-sm text-muted-foreground"><CheckCircle className="h-3.5 w-3.5 text-neon-emerald shrink-0" /> {s}</div>
                ))}
                {result.format.issues.map((s) => (
                  <div key={s} className="flex items-center gap-2 text-sm text-muted-foreground"><AlertTriangle className="h-3.5 w-3.5 text-neon-amber shrink-0" /> {s}</div>
                ))}
              </div>
            </div>
          </div>

          <div className="text-center">
            <Button variant="neon" onClick={() => { setUploaded(false); setResult(null); }}>
              Analyze Another Resume
            </Button>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default ResumeAnalyzer;
