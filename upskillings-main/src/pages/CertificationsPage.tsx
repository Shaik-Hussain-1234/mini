import { motion } from "framer-motion";
import { GraduationCap, ArrowLeft, CheckCircle, BookOpen, ChevronRight, Brain, Trophy } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface CertPrep {
  name: string; provider: string; difficulty: string; studyTime: string;
  syllabus: string[];
  roadmap: { step: string; description: string }[];
  practiceQuestions: { q: string; options: string[]; answer: number; explanation: string }[];
  tips: string[];
}

const certs: CertPrep[] = [
  {
    name: "AWS Cloud Practitioner", provider: "Amazon Web Services", difficulty: "Beginner", studyTime: "6-8 weeks",
    syllabus: ["Cloud Concepts (26%)", "Security & Compliance (25%)", "Cloud Technology & Services (33%)", "Billing, Pricing & Support (16%)"],
    roadmap: [
      { step: "Learn Cloud Basics", description: "Understand what cloud computing is, deployment models (IaaS, PaaS, SaaS), and AWS global infrastructure." },
      { step: "Core AWS Services", description: "Study EC2, S3, RDS, Lambda, VPC, IAM, CloudFront, and Route 53." },
      { step: "Security & IAM", description: "Master IAM users, groups, roles, policies. Understand shared responsibility model." },
      { step: "Pricing & Billing", description: "Learn AWS pricing models, Free Tier, Cost Explorer, and AWS Budgets." },
      { step: "Practice Exams", description: "Take multiple practice tests. Aim for 80%+ before the real exam." },
    ],
    practiceQuestions: [
      { q: "What is the AWS shared responsibility model?", options: ["AWS manages everything", "Customer manages everything", "AWS manages infrastructure, customer manages data & apps", "Customer manages infrastructure"], answer: 2, explanation: "AWS is responsible for security OF the cloud (hardware, network), while customers are responsible for security IN the cloud (data, access)." },
      { q: "Which AWS service provides serverless computing?", options: ["EC2", "Lambda", "ECS", "Lightsail"], answer: 1, explanation: "AWS Lambda lets you run code without provisioning servers. You pay only for compute time consumed." },
      { q: "What does S3 stand for?", options: ["Simple Server Service", "Simple Storage Service", "Secure Storage System", "Server-Side Storage"], answer: 1, explanation: "Amazon S3 (Simple Storage Service) is object storage built to retrieve any amount of data from anywhere." },
      { q: "Which service is used for DNS?", options: ["CloudFront", "Route 53", "VPC", "Direct Connect"], answer: 1, explanation: "Amazon Route 53 is a highly available DNS web service." },
    ],
    tips: ["Focus on understanding concepts, not memorizing", "Use AWS Free Tier for hands-on practice", "Take at least 3-4 practice exams", "Read the AWS whitepapers on Well-Architected Framework", "Exam is 65 questions, 90 minutes, need 70% to pass"],
  },
  {
    name: "Salesforce Administrator", provider: "Salesforce", difficulty: "Intermediate", studyTime: "10-12 weeks",
    syllabus: ["Org Setup (3%)", "Users & Security (7%)", "Object Manager (11%)", "Sales & Marketing Apps (11%)", "Service & Support (11%)", "Activity Management (3%)", "Data Management (10%)", "Analytics (10%)", "Workflow & Process (15%)", "Desktop & Mobile (3%)", "AppExchange (2%)"],
    roadmap: [
      { step: "Trailhead Basics", description: "Complete Admin Beginner trail on Trailhead (free)." },
      { step: "Data Model & Objects", description: "Understand standard/custom objects, fields, relationships." },
      { step: "Security Model", description: "Master profiles, permission sets, OWD, sharing rules, role hierarchy." },
      { step: "Automation", description: "Learn Flow Builder, Process Builder, Workflow Rules, Approval Processes." },
      { step: "Reports & Dashboards", description: "Build reports with filters, groupings, formulas. Create dashboards." },
    ],
    practiceQuestions: [
      { q: "What determines a user's baseline permissions?", options: ["Role", "Profile", "Permission Set", "Public Group"], answer: 1, explanation: "A Profile defines a user's baseline permissions for objects, fields, and system actions." },
      { q: "What is the most restrictive OWD setting?", options: ["Public Read/Write", "Public Read Only", "Private", "Controlled by Parent"], answer: 2, explanation: "Private means only the record owner and users above in the role hierarchy can access the record." },
    ],
    tips: ["Use Trailhead extensively - it's free and comprehensive", "Get a Developer Edition org for practice", "Focus on Flow Builder - it's heavily tested", "Understand the data model deeply", "70% is passing, 60 questions in 105 minutes"],
  },
  {
    name: "ServiceNow Developer", provider: "ServiceNow", difficulty: "Intermediate", studyTime: "8-10 weeks",
    syllabus: ["Scripting (25%)", "Application Development (20%)", "Platform (25%)", "Data Management (15%)", "Collaboration (15%)"],
    roadmap: [
      { step: "Platform Basics", description: "Understand tables, records, forms, lists, and the ServiceNow data model." },
      { step: "Scripting", description: "Learn Client Scripts, Business Rules, Script Includes, UI Policies." },
      { step: "Application Development", description: "Build scoped applications using Studio." },
      { step: "Integration", description: "REST API, Web Services, Import Sets, Transform Maps." },
    ],
    practiceQuestions: [
      { q: "Where do Client Scripts execute?", options: ["Server", "Browser", "Both", "Neither"], answer: 1, explanation: "Client Scripts run in the user's browser and control form behavior." },
      { q: "What is a Business Rule?", options: ["UI script", "Server-side script on table operations", "Client script", "Workflow"], answer: 1, explanation: "Business Rules are server-side scripts that run when records are displayed, inserted, updated, or deleted." },
    ],
    tips: ["Get a free Personal Developer Instance (PDI)", "Focus on scripting - it's 25% of the exam", "Practice building scoped applications", "Understand GlideRecord and GlideSystem APIs"],
  },
  {
    name: "Microsoft Azure Fundamentals (AZ-900)", provider: "Microsoft", difficulty: "Beginner", studyTime: "4-6 weeks",
    syllabus: ["Cloud Concepts (25-30%)", "Azure Architecture (35-40%)", "Azure Management & Governance (30-35%)"],
    roadmap: [
      { step: "Cloud Concepts", description: "IaaS, PaaS, SaaS, public/private/hybrid cloud." },
      { step: "Core Azure Services", description: "Azure VMs, App Service, Functions, Storage, SQL Database." },
      { step: "Networking", description: "Virtual Networks, Load Balancer, Application Gateway, VPN." },
      { step: "Security & Governance", description: "Azure AD, RBAC, Azure Policy, Cost Management." },
    ],
    practiceQuestions: [
      { q: "What is Azure Active Directory?", options: ["A database service", "An identity & access management service", "A VM service", "A storage service"], answer: 1, explanation: "Azure AD is Microsoft's cloud-based identity and access management service." },
    ],
    tips: ["Microsoft Learn has free learning paths", "This is an entry-level cert - no Azure experience required", "Focus on understanding cloud concepts vs memorizing services", "700/1000 passing score, ~45 questions"],
  },
  {
    name: "Google Cloud Digital Leader", provider: "Google Cloud", difficulty: "Beginner", studyTime: "4-6 weeks",
    syllabus: ["Digital Transformation with Google Cloud (17%)", "Innovating with Data & ML (17%)", "Infrastructure & App Modernization (22%)", "Google Cloud Security & Operations (22%)", "Scaling with Google Cloud Operations (22%)"],
    roadmap: [
      { step: "GCP Overview", description: "Understand Google Cloud products and their use cases." },
      { step: "Compute & Storage", description: "Compute Engine, Cloud Run, Cloud Storage, BigQuery." },
      { step: "Data & AI", description: "BigQuery, Vertex AI, Cloud AI APIs." },
      { step: "Security", description: "IAM, Cloud Armor, Security Command Center." },
    ],
    practiceQuestions: [
      { q: "What is BigQuery?", options: ["A VM service", "A serverless data warehouse", "A container service", "A networking service"], answer: 1, explanation: "BigQuery is Google's fully-managed, serverless data warehouse for analytics." },
    ],
    tips: ["Google Cloud Skills Boost has free learning paths", "Focus on understanding when to use each service", "Practice with GCP free tier", "70% passing, 50 questions in 90 minutes"],
  },
];

const diffColor: Record<string, string> = {
  Beginner: "text-neon-emerald border-neon-emerald/20 bg-neon-emerald/5",
  Intermediate: "text-neon-amber border-neon-amber/20 bg-neon-amber/5",
  Advanced: "text-neon-pink border-neon-pink/20 bg-neon-pink/5",
};

const CertificationsPage = () => {
  const [selected, setSelected] = useState<CertPrep | null>(null);
  const [activeTab, setActiveTab] = useState<"syllabus" | "roadmap" | "practice" | "tips">("syllabus");
  const [quizIdx, setQuizIdx] = useState(0);
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);
  const [quizScore, setQuizScore] = useState(0);

  if (selected) {
    const pq = selected.practiceQuestions[quizIdx];
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
        <button onClick={() => { setSelected(null); setActiveTab("syllabus"); setQuizIdx(0); setQuizAnswer(null); setQuizScore(0); }} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary">
          <ArrowLeft className="h-4 w-4" /> Back to Certifications
        </button>
        <div>
          <h1 className="text-2xl font-bold text-foreground">{selected.name}</h1>
          <p className="text-sm text-muted-foreground">{selected.provider} • {selected.studyTime}</p>
        </div>

        <div className="flex gap-2">
          {(["syllabus", "roadmap", "practice", "tips"] as const).map(tab => (
            <button key={tab} onClick={() => { setActiveTab(tab); setQuizIdx(0); setQuizAnswer(null); }}
              className={`text-xs px-3 py-1.5 rounded-full border transition-all capitalize ${activeTab === tab ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground"}`}>
              {tab}
            </button>
          ))}
        </div>

        {activeTab === "syllabus" && (
          <div className="glass-card p-6 space-y-3">
            <h2 className="text-lg font-semibold text-foreground flex items-center gap-2"><BookOpen className="h-5 w-5 text-primary" /> Exam Syllabus</h2>
            {selected.syllabus.map((s, i) => (
              <div key={i} className="flex items-center gap-3 p-3 bg-secondary/20 rounded-lg">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">{i + 1}</div>
                <span className="text-sm text-foreground">{s}</span>
              </div>
            ))}
          </div>
        )}

        {activeTab === "roadmap" && (
          <div className="glass-card p-6 space-y-4">
            <h2 className="text-lg font-semibold text-foreground">Learning Roadmap</h2>
            {selected.roadmap.map((r, i) => (
              <div key={i} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="h-10 w-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-sm font-bold text-primary">{i + 1}</div>
                  {i < selected.roadmap.length - 1 && <div className="w-px flex-1 bg-border mt-2" />}
                </div>
                <div className="pb-6">
                  <h3 className="text-sm font-semibold text-foreground">{r.step}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{r.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "practice" && pq && (
          <div className="glass-card neon-border p-6 space-y-4 max-w-2xl">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-foreground flex items-center gap-2"><Brain className="h-5 w-5 text-primary" /> Practice Question</h2>
              <span className="text-xs text-muted-foreground">{quizIdx + 1}/{selected.practiceQuestions.length}</span>
            </div>
            <p className="text-sm text-foreground">{pq.q}</p>
            <div className="space-y-2">
              {pq.options.map((opt, i) => (
                <button key={i} onClick={() => { if (quizAnswer === null) { setQuizAnswer(i); if (i === pq.answer) setQuizScore(s => s + 1); }}}
                  disabled={quizAnswer !== null}
                  className={`w-full text-left p-3 rounded-lg border text-sm transition-all ${
                    quizAnswer === null ? "border-border/50 hover:border-primary/30 text-muted-foreground" :
                    i === pq.answer ? "border-neon-emerald bg-neon-emerald/10 text-neon-emerald" :
                    i === quizAnswer ? "border-destructive bg-destructive/10 text-destructive" :
                    "border-border/50 text-muted-foreground opacity-50"
                  }`}>
                  {opt}
                </button>
              ))}
            </div>
            {quizAnswer !== null && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-3 bg-secondary/20 rounded-lg">
                <p className="text-xs text-muted-foreground">{pq.explanation}</p>
              </motion.div>
            )}
            <div className="flex justify-between pt-2">
              <span className="text-xs text-primary">Score: {quizScore}/{quizIdx + (quizAnswer !== null ? 1 : 0)}</span>
              {quizAnswer !== null && quizIdx < selected.practiceQuestions.length - 1 && (
                <Button variant="neon" size="sm" onClick={() => { setQuizIdx(i => i + 1); setQuizAnswer(null); }}>Next Question</Button>
              )}
            </div>
          </div>
        )}

        {activeTab === "tips" && (
          <div className="glass-card p-6 space-y-3">
            <h2 className="text-lg font-semibold text-foreground flex items-center gap-2"><Trophy className="h-5 w-5 text-neon-amber" /> Exam Tips</h2>
            {selected.tips.map((t, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" /> {t}
              </div>
            ))}
          </div>
        )}
      </motion.div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <GraduationCap className="h-6 w-6 text-primary" /> Certification Learning Center
        </h1>
        <p className="text-muted-foreground text-sm mt-1">Complete preparation guides with syllabi, roadmaps, practice questions, and exam tips.</p>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        {certs.map((c) => (
          <motion.div key={c.name} whileHover={{ scale: 1.02 }} onClick={() => setSelected(c)} className="glass-card-hover p-6 cursor-pointer">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-base font-semibold text-foreground">{c.name}</h3>
              <span className={`text-xs px-2 py-0.5 rounded-full border ${diffColor[c.difficulty]}`}>{c.difficulty}</span>
            </div>
            <p className="text-xs text-muted-foreground mb-3">{c.provider} • {c.studyTime}</p>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span>{c.syllabus.length} topics</span>
              <span>{c.practiceQuestions.length} practice Q&As</span>
              <span>{c.roadmap.length} steps</span>
            </div>
            <Button variant="ghost" size="sm" className="text-primary text-xs mt-3">Start Preparation <ChevronRight className="ml-1 h-3 w-3" /></Button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default CertificationsPage;
