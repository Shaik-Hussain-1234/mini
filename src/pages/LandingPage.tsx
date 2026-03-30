import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Brain, Code, Rocket, TrendingUp, Users, Trophy, ChevronRight, Star, Sparkles, Shield, Globe, Terminal, Cpu, Database, GitBranch, Layers, Play, BarChart3, Award, BookOpen, Target, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useRef, useState } from "react";

const stats = [
  { label: "Active Learners", value: "50K+", icon: Users },
  { label: "Coding Problems", value: "200+", icon: Code },
  { label: "Career Paths", value: "25+", icon: Rocket },
  { label: "Success Rate", value: "94%", icon: Trophy },
];

const features = [
  { icon: Code, title: "200+ Coding Problems", desc: "Multi-platform problems from LeetCode, HackerRank, Codeforces & more with real test cases.", tag: "Practice" },
  { icon: Brain, title: "AI Career Assistant", desc: "Get personalized career advice, coding help, and project suggestions from AI.", tag: "AI" },
  { icon: TrendingUp, title: "Interactive Roadmaps", desc: "Step-by-step career guidance with topics, resources & realistic timelines.", tag: "Learn" },
  { icon: Rocket, title: "Hackathon Explorer", desc: "Discover 500+ real hackathons with prizes, deadlines & team matching.", tag: "Compete" },
  { icon: Shield, title: "Interview Prep Suite", desc: "Mock interviews, system design, behavioral & company-specific prep.", tag: "Career" },
  { icon: Terminal, title: "30+ Dev Tools", desc: "Git simulator, SQL playground, regex tester, API playground & more.", tag: "Tools" },
];

const tools = [
  "Algorithm Visualizer", "SQL Playground", "Git Simulator", "Linux Terminal",
  "Regex Tester", "JSON Formatter", "CSS Playground", "Markdown Editor",
  "API Playground", "Color Palette", "System Design Board", "Code Snippets"
];

const testimonials = [
  { name: "Sarah K.", role: "SWE at Google", text: "SkillNavigator's roadmaps and coding practice helped me crack my Google interview. The AI assistant is insanely useful.", avatar: "SK", rating: 5 },
  { name: "Alex M.", role: "Data Scientist at Meta", text: "Switched careers from marketing to data science using this platform. The skill gap analyzer showed me exactly what to learn.", avatar: "AM", rating: 5 },
  { name: "Priya R.", role: "DevOps at Netflix", text: "The Linux terminal simulator and Docker exercises prepared me better than any bootcamp. Highly recommend!", avatar: "PR", rating: 5 },
];

const careerPaths = [
  { title: "AI Engineer", salary: "$130K-$200K", demand: 95, skills: ["Python", "TensorFlow", "MLOps"], icon: Brain },
  { title: "Full Stack Dev", salary: "$100K-$160K", demand: 88, skills: ["React", "Node.js", "PostgreSQL"], icon: Layers },
  { title: "Cloud Architect", salary: "$140K-$190K", demand: 85, skills: ["AWS", "K8s", "Terraform"], icon: Globe },
  { title: "DevOps Engineer", salary: "$110K-$170K", demand: 82, skills: ["Docker", "CI/CD", "Linux"], icon: Terminal },
];

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.06 } } };
const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } } };

const LandingPage = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/15 bg-background/60 backdrop-blur-2xl">
        <div className="container mx-auto flex h-14 items-center justify-between px-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Zap className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="text-base font-black font-display tracking-tight">
              <span className="text-foreground">SKILL</span><span className="gradient-text">NAV</span>
            </span>
          </Link>
          <div className="hidden md:flex items-center gap-6">
            {["Features", "Careers", "Tools", "Reviews"].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-xs text-muted-foreground hover:text-primary transition-colors font-medium uppercase tracking-wider">{item}</a>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <Link to="/login"><Button variant="ghost" size="sm" className="text-xs">Log In</Button></Link>
            <Link to="/register"><Button size="sm" className="text-xs bg-primary hover:bg-primary/90 btn-glow">Get Started <ArrowRight className="ml-1 h-3 w-3" /></Button></Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section ref={heroRef} className="relative pt-24 pb-20 min-h-screen flex items-center aurora-bg">
        <div className="orb w-[500px] h-[500px] bg-primary/5 top-0 left-[10%]" />
        <div className="orb w-[400px] h-[400px] bg-accent/5 bottom-10 right-[15%]" style={{ animationDelay: "4s" }} />

        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="container mx-auto px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 35 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} className="max-w-4xl mx-auto text-center">
            
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/5 px-4 py-1.5 text-xs text-primary mb-8 backdrop-blur-xl font-medium">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse-glow" />
              AI-Powered Career Intelligence
              <Sparkles className="h-3 w-3" />
            </motion.div>

            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tighter mb-6 leading-[0.95] font-display">
              <span className="text-foreground">BUILD YOUR</span>
              <br />
              <span className="gradient-text">TECH CAREER</span>
            </h1>

            <p className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto mb-10 leading-relaxed">
              200+ problems, AI roadmaps, real hackathons, 30+ dev tools — <span className="text-foreground font-medium">one platform for everything.</span>
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-16">
              <Link to="/register">
                <Button size="lg" className="text-sm px-8 h-12 btn-glow bg-primary hover:bg-primary/90 font-bold">
                  START FREE <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" size="lg" className="text-sm px-8 h-12 border-border/30 hover:border-primary/30">
                  <Play className="mr-2 h-4 w-4" /> Watch Demo
                </Button>
              </Link>
            </div>

            {/* Stats inline */}
            <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-2xl mx-auto">
              {stats.map((stat) => (
                <motion.div key={stat.label} variants={itemVariants} className="glass-card p-4 text-center">
                  <stat.icon className="h-5 w-5 text-primary mx-auto mb-2" />
                  <div className="text-xl font-black text-foreground font-display">{stat.value}</div>
                  <div className="text-[10px] text-muted-foreground uppercase tracking-widest">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      <div className="particle-line" />

      {/* Features */}
      <section id="features" className="py-24 relative">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="cyber-label mb-3 block">PLATFORM</span>
            <h2 className="text-3xl md:text-5xl font-black mb-4 font-display">
              EVERYTHING TO <span className="gradient-text">LEVEL UP</span>
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto">One ecosystem for learning, practicing, and career growth.</p>
          </motion.div>

          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((feature) => (
              <motion.div key={feature.title} variants={itemVariants}>
                <div className="glass-card p-6 h-full group cursor-pointer hover:border-primary/25 transition-all duration-500">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="h-10 w-10 rounded-xl bg-primary/10 border border-primary/15 flex items-center justify-center group-hover:bg-primary/15 transition-all">
                      <feature.icon className="h-5 w-5 text-primary" />
                    </div>
                    <span className="text-[9px] uppercase tracking-widest text-primary font-bold bg-primary/5 px-2 py-0.5 rounded-full">{feature.tag}</span>
                  </div>
                  <h3 className="text-sm font-bold text-foreground mb-1.5">{feature.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <div className="particle-line" />

      {/* Career Paths */}
      <section id="careers" className="py-24 relative aurora-bg">
        <div className="container mx-auto px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="cyber-label mb-3 block">CAREERS</span>
            <h2 className="text-3xl md:text-5xl font-black mb-4 font-display">
              EXPLORE <span className="gradient-text-warm">PATHS</span>
            </h2>
            <p className="text-muted-foreground">Find your perfect role with real salary data.</p>
          </motion.div>

          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {careerPaths.map((career) => (
              <motion.div key={career.title} variants={itemVariants}>
                <div className="glass-card p-6 group cursor-pointer hover:border-primary/25 transition-all duration-500">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-11 w-11 rounded-xl bg-primary/10 border border-primary/15 flex items-center justify-center">
                      <career.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-foreground">{career.title}</h3>
                      <p className="text-xs text-primary font-semibold">{career.salary}</p>
                    </div>
                    <div className="ml-auto text-right">
                      <div className="text-lg font-black text-foreground font-display">{career.demand}%</div>
                      <div className="text-[9px] text-muted-foreground uppercase">Demand</div>
                    </div>
                  </div>
                  <div className="h-1.5 bg-secondary rounded-full overflow-hidden mb-3">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${career.demand}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                      className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
                    />
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {career.skills.map((skill) => (
                      <span key={skill} className="tag-pill text-[10px]">{skill}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <div className="particle-line" />

      {/* Dev Tools Showcase */}
      <section id="tools" className="py-24 relative">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="cyber-label mb-3 block">DEV TOOLS</span>
            <h2 className="text-3xl md:text-5xl font-black mb-4 font-display">
              30+ <span className="gradient-text-cool">BUILT-IN TOOLS</span>
            </h2>
            <p className="text-muted-foreground">Everything a developer needs, right in the browser.</p>
          </motion.div>

          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="flex flex-wrap justify-center gap-2 max-w-3xl mx-auto">
            {tools.map((tool, i) => (
              <motion.span
                key={tool}
                variants={itemVariants}
                whileHover={{ scale: 1.08, y: -3 }}
                className="tag-pill text-xs cursor-pointer px-4 py-2"
              >
                {tool}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </section>

      <div className="particle-line" />

      {/* Testimonials */}
      <section id="reviews" className="py-24 relative">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="cyber-label mb-3 block">REVIEWS</span>
            <h2 className="text-3xl md:text-5xl font-black mb-4 font-display">
              LOVED BY <span className="gradient-text-warm">DEVS</span>
            </h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {testimonials.map((t, i) => (
              <motion.div key={t.name} initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="glass-card p-6 hover:border-primary/20 transition-all duration-500">
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="h-3.5 w-3.5 text-neon-amber fill-neon-amber" />
                  ))}
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed mb-4 italic">"{t.text}"</p>
                <div className="flex items-center gap-2.5">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-[10px] font-bold text-primary-foreground">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-foreground">{t.name}</p>
                    <p className="text-[10px] text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="particle-line" />

      {/* CTA */}
      <section className="py-24 relative">
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card neon-border p-12 md:p-16 text-center max-w-3xl mx-auto relative overflow-hidden"
          >
            <div className="orb w-[300px] h-[300px] bg-primary/6 -top-32 -left-32" />
            <div className="orb w-[200px] h-[200px] bg-accent/6 -bottom-16 -right-16" style={{ animationDelay: "3s" }} />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-black mb-4 font-display">
                <span className="gradient-text">START TODAY</span>
              </h2>
              <p className="text-muted-foreground mb-8 max-w-md mx-auto text-sm">
                Join 50,000+ developers building their future. Free forever.
              </p>
              <Link to="/register">
                <Button size="lg" className="text-sm px-10 h-12 btn-glow bg-primary hover:bg-primary/90 font-bold">
                  GET STARTED FREE <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/15 py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <Zap className="h-3.5 w-3.5 text-primary-foreground" />
                </div>
                <span className="text-sm font-black font-display"><span className="text-foreground">SKILL</span><span className="gradient-text">NAV</span></span>
              </div>
              <p className="text-[11px] text-muted-foreground leading-relaxed">The developer ecosystem built for the future of tech careers.</p>
            </div>
            {[
              { title: "Platform", links: ["Coding Practice", "Career Explorer", "Hackathons", "Courses"] },
              { title: "Resources", links: ["Roadmaps", "Interview Prep", "Resume Builder", "Community"] },
              { title: "Company", links: ["About", "Blog", "Careers", "Contact"] },
            ].map((col) => (
              <div key={col.title}>
                <h4 className="cyber-label mb-3">{col.title}</h4>
                <div className="space-y-2">
                  {col.links.map(link => (
                    <p key={link} className="text-[11px] text-muted-foreground hover:text-primary cursor-pointer transition-colors">{link}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="border-t border-border/15 mt-8 pt-6 text-center text-[11px] text-muted-foreground">
            © 2026 SkillNavigator. Built for the future of tech careers.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
