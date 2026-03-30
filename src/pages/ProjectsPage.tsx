import { motion } from "framer-motion";
import { Lightbulb, Code, Wand2, ArrowRight, Layers } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const languages = ["Python", "JavaScript", "TypeScript", "Java", "C++", "Go", "Rust"];
const difficulties = ["Beginner", "Intermediate", "Advanced"];

interface ProjectIdea {
  title: string; description: string; architecture: string; techStack: string[]; features: string[];
}

const projectDB: Record<string, Record<string, ProjectIdea[]>> = {
  Python: {
    Beginner: [
      { title: "Todo CLI App", description: "A command-line task manager with file persistence.", architecture: "Single module with JSON file storage. Uses argparse for CLI, pathlib for file handling.", techStack: ["Python", "JSON", "argparse"], features: ["Add/remove tasks", "Mark complete", "Filter by status", "Data persistence"] },
      { title: "Weather Dashboard", description: "Fetch weather data from API and display in terminal with color formatting.", architecture: "API client module + display formatter. Uses requests for HTTP, rich for terminal UI.", techStack: ["Python", "Requests", "Rich", "API"], features: ["Current weather", "5-day forecast", "Multiple cities", "Color output"] },
    ],
    Intermediate: [
      { title: "REST API with FastAPI", description: "Build a full CRUD REST API with authentication and database.", architecture: "FastAPI app → SQLAlchemy ORM → PostgreSQL. JWT authentication middleware. Pydantic for validation.", techStack: ["Python", "FastAPI", "SQLAlchemy", "PostgreSQL", "JWT"], features: ["CRUD operations", "JWT auth", "Input validation", "API docs (Swagger)", "Database migrations"] },
      { title: "Web Scraper Pipeline", description: "Automated web scraper that collects, cleans, and stores data.", architecture: "Scrapy spider → Data pipeline → PostgreSQL storage. Celery for scheduling.", techStack: ["Python", "Scrapy", "Celery", "PostgreSQL"], features: ["Multi-page scraping", "Data cleaning", "Scheduled runs", "Export to CSV/JSON"] },
    ],
    Advanced: [
      { title: "ML Model Serving Platform", description: "Deploy ML models as API endpoints with monitoring.", architecture: "FastAPI serving layer → Redis caching → Model registry (MLflow) → Prometheus metrics.", techStack: ["Python", "FastAPI", "MLflow", "Redis", "Docker", "Prometheus"], features: ["Model versioning", "A/B testing", "Performance monitoring", "Auto-scaling", "Batch predictions"] },
    ],
  },
  JavaScript: {
    Beginner: [
      { title: "Quiz App", description: "Interactive quiz with multiple categories and score tracking.", architecture: "React SPA with component-based architecture. Local state with useState.", techStack: ["React", "Tailwind CSS", "Vite"], features: ["Multiple categories", "Score tracking", "Timer", "High scores", "Responsive design"] },
    ],
    Intermediate: [
      { title: "Real-time Chat App", description: "Full-featured chat with rooms, typing indicators, and file sharing.", architecture: "React frontend ↔ Socket.io server ↔ MongoDB. Redis for session management.", techStack: ["React", "Node.js", "Socket.io", "MongoDB", "Redis"], features: ["Chat rooms", "Typing indicators", "File sharing", "Message history", "Online status"] },
      { title: "E-commerce Platform", description: "Complete online store with cart, checkout, and admin panel.", architecture: "Next.js → API routes → PostgreSQL. Stripe for payments. S3 for media.", techStack: ["React", "Node.js", "PostgreSQL", "Stripe", "S3"], features: ["Product catalog", "Shopping cart", "Checkout flow", "Admin dashboard", "Order tracking"] },
    ],
    Advanced: [
      { title: "Collaborative Code Editor", description: "Real-time collaborative code editing like CodeSandbox.", architecture: "Monaco editor + Y.js for CRDT-based collaboration + WebSocket server + Docker for sandboxing.", techStack: ["React", "Monaco", "Y.js", "WebSocket", "Docker"], features: ["Real-time collaboration", "Syntax highlighting", "Code execution", "Multiple language support", "Share links"] },
    ],
  },
  TypeScript: {
    Beginner: [
      { title: "Type-safe API Client", description: "Build a type-safe wrapper around a REST API.", architecture: "Generic fetch wrapper with TypeScript generics. Zod for runtime validation.", techStack: ["TypeScript", "Zod", "Fetch API"], features: ["Type-safe requests", "Runtime validation", "Error handling", "Auto-completion", "Request interceptors"] },
    ],
    Intermediate: [
      { title: "Full-Stack Dashboard", description: "Analytics dashboard with charts, tables, and real-time data.", architecture: "React + TypeScript frontend → tRPC → Prisma ORM → PostgreSQL.", techStack: ["TypeScript", "React", "tRPC", "Prisma", "PostgreSQL"], features: ["Interactive charts", "Data tables", "Real-time updates", "Export reports", "Role-based access"] },
    ],
    Advanced: [
      { title: "Custom UI Component Library", description: "Build a production-ready component library with Storybook.", architecture: "Monorepo with Turborepo. Components → Storybook docs → npm package. Testing with Vitest.", techStack: ["TypeScript", "React", "Storybook", "Vitest", "Turborepo"], features: ["30+ components", "Storybook docs", "Theme system", "Accessibility (a11y)", "Tree-shakeable"] },
    ],
  },
};

// Fill missing combos with generic projects
for (const lang of languages) {
  if (!projectDB[lang]) projectDB[lang] = {};
  for (const diff of difficulties) {
    if (!projectDB[lang][diff]) {
      projectDB[lang][diff] = [
        { title: `${lang} ${diff} Project`, description: `A ${diff.toLowerCase()}-level project using ${lang}.`, architecture: `Standard ${lang} project architecture with modular design.`, techStack: [lang], features: ["Core functionality", "Error handling", "Documentation", "Testing"] },
      ];
    }
  }
}

const diffColor: Record<string, string> = {
  Beginner: "text-neon-emerald border-neon-emerald/20 bg-neon-emerald/5",
  Intermediate: "text-neon-amber border-neon-amber/20 bg-neon-amber/5",
  Advanced: "text-neon-pink border-neon-pink/20 bg-neon-pink/5",
};

const ProjectsPage = () => {
  const [lang, setLang] = useState<string>("");
  const [diff, setDiff] = useState<string>("");
  const [generated, setGenerated] = useState<ProjectIdea[] | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);

  const generate = () => {
    if (lang && diff && projectDB[lang]?.[diff]) {
      setGenerated(projectDB[lang][diff]);
      setExpanded(null);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <Lightbulb className="h-6 w-6 text-primary" /> Project Generator
        </h1>
        <p className="text-muted-foreground text-sm mt-1">Select a language and difficulty to generate project ideas with architecture and tech stack.</p>
      </div>

      {/* Generator */}
      <div className="glass-card neon-border p-6 space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <Wand2 className="h-5 w-5 text-primary" />
          <h2 className="text-base font-semibold text-foreground">Generate Project Ideas</h2>
        </div>

        <div>
          <p className="text-xs text-muted-foreground mb-2">Programming Language</p>
          <div className="flex flex-wrap gap-2">
            {languages.map(l => (
              <button key={l} onClick={() => setLang(l)}
                className={`text-xs px-3 py-1.5 rounded-full border transition-all ${lang === l ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground"}`}>
                {l}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs text-muted-foreground mb-2">Difficulty Level</p>
          <div className="flex gap-2">
            {difficulties.map(d => (
              <button key={d} onClick={() => setDiff(d)}
                className={`text-xs px-3 py-1.5 rounded-full border transition-all ${diff === d ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground"}`}>
                {d}
              </button>
            ))}
          </div>
        </div>

        <Button variant="neon" onClick={generate} disabled={!lang || !diff}>
          Generate Ideas <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>

      {/* Results */}
      {generated && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
          <h2 className="text-lg font-semibold text-foreground">{lang} • {diff} Projects</h2>
          {generated.map((project) => (
            <div key={project.title} className="glass-card p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-base font-semibold text-foreground">{project.title}</h3>
                <span className={`text-xs px-2 py-0.5 rounded-full border ${diffColor[diff]}`}>{diff}</span>
              </div>
              <p className="text-sm text-muted-foreground mb-4">{project.description}</p>

              <button onClick={() => setExpanded(expanded === project.title ? null : project.title)} className="text-xs text-primary hover:underline flex items-center gap-1">
                {expanded === project.title ? "Hide Details" : "View Architecture & Details"} <ArrowRight className="h-3 w-3" />
              </button>

              {expanded === project.title && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 space-y-4">
                  <div>
                    <h4 className="text-xs font-semibold text-foreground flex items-center gap-1 mb-2"><Layers className="h-3 w-3 text-primary" /> Architecture</h4>
                    <p className="text-xs text-muted-foreground bg-secondary/20 rounded-lg p-3">{project.architecture}</p>
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-foreground mb-2">Tech Stack</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {project.techStack.map(t => (
                        <span key={t} className="text-[10px] px-2 py-0.5 rounded-full border border-primary/20 bg-primary/5 text-primary">{t}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-foreground mb-2">Key Features</h4>
                    <div className="grid grid-cols-2 gap-1.5">
                      {project.features.map(f => (
                        <div key={f} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <Code className="h-3 w-3 text-primary shrink-0" /> {f}
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
};

export default ProjectsPage;
