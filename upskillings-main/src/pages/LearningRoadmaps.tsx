import { motion } from "framer-motion";
import { Map, BookOpen, CheckCircle2, ChevronRight, Play, Lightbulb, Clock, Target } from "lucide-react";
import { useState } from "react";

interface RoadmapStep {
  name: string;
  description: string;
  duration: string;
  topics: string[];
  resources: { title: string; type: string }[];
  completed?: boolean;
}

interface Roadmap {
  title: string;
  icon: string;
  description: string;
  totalWeeks: number;
  steps: RoadmapStep[];
}

const roadmaps: Roadmap[] = [
  {
    title: "AI Engineer", icon: "🤖", description: "From Python basics to deploying ML models in production", totalWeeks: 24,
    steps: [
      { name: "Python Fundamentals", description: "Master Python syntax, data structures, OOP, and standard library", duration: "3 weeks",
        topics: ["Variables & Data Types", "Control Flow", "Functions & Classes", "File I/O", "List Comprehensions", "Decorators"],
        resources: [{ title: "Python Crash Course", type: "Tutorial" }, { title: "100 Python Exercises", type: "Practice" }] },
      { name: "Mathematics & Statistics", description: "Linear algebra, calculus, probability, and statistics for ML", duration: "4 weeks",
        topics: ["Linear Algebra", "Calculus", "Probability", "Statistics", "Bayesian Thinking", "Hypothesis Testing"],
        resources: [{ title: "Math for ML", type: "Course" }, { title: "Statistics Problems", type: "Practice" }] },
      { name: "Machine Learning Basics", description: "Supervised & unsupervised learning algorithms", duration: "5 weeks",
        topics: ["Linear Regression", "Logistic Regression", "Decision Trees", "Random Forests", "SVM", "K-Means", "PCA"],
        resources: [{ title: "ML Fundamentals", type: "Course" }, { title: "Scikit-learn Guide", type: "Tutorial" }] },
      { name: "Deep Learning", description: "Neural networks, CNNs, RNNs, and Transformers", duration: "5 weeks",
        topics: ["Neural Network Basics", "Backpropagation", "CNN", "RNN & LSTM", "Transformers", "GANs"],
        resources: [{ title: "Deep Learning Specialization", type: "Course" }, { title: "PyTorch Tutorial", type: "Tutorial" }] },
      { name: "MLOps & Deployment", description: "Model serving, monitoring, and production pipelines", duration: "4 weeks",
        topics: ["Docker", "MLflow", "Model Serving", "API Development", "Monitoring", "CI/CD for ML"],
        resources: [{ title: "MLOps Guide", type: "Tutorial" }, { title: "Deploy ML Models", type: "Project" }] },
      { name: "Specialization", description: "Choose NLP, Computer Vision, or Reinforcement Learning", duration: "3 weeks",
        topics: ["NLP with Transformers", "Computer Vision", "Reinforcement Learning", "Fine-tuning LLMs", "Prompt Engineering"],
        resources: [{ title: "HuggingFace Course", type: "Tutorial" }, { title: "Capstone Project", type: "Project" }] },
    ],
  },
  {
    title: "Full Stack Developer", icon: "🌐", description: "Build modern web applications from frontend to backend", totalWeeks: 20,
    steps: [
      { name: "HTML, CSS & JavaScript", description: "Core web technologies and modern CSS", duration: "3 weeks",
        topics: ["Semantic HTML", "CSS Grid & Flexbox", "Responsive Design", "JavaScript ES6+", "DOM Manipulation", "Async/Await"],
        resources: [{ title: "Web Dev Bootcamp", type: "Course" }, { title: "CSS Battle", type: "Practice" }] },
      { name: "React & TypeScript", description: "Modern frontend development with React ecosystem", duration: "4 weeks",
        topics: ["Components & JSX", "State & Props", "Hooks", "Context API", "React Router", "TypeScript Basics"],
        resources: [{ title: "React Documentation", type: "Tutorial" }, { title: "Todo App Project", type: "Project" }] },
      { name: "Backend with Node.js", description: "Server-side development with Express and APIs", duration: "4 weeks",
        topics: ["Node.js Basics", "Express.js", "REST APIs", "Authentication", "Middleware", "Error Handling"],
        resources: [{ title: "Node.js Guide", type: "Tutorial" }, { title: "API Project", type: "Project" }] },
      { name: "Databases", description: "SQL and NoSQL databases with ORMs", duration: "3 weeks",
        topics: ["PostgreSQL", "MongoDB", "SQL Queries", "Prisma ORM", "Database Design", "Migrations"],
        resources: [{ title: "Database Design", type: "Course" }, { title: "SQL Exercises", type: "Practice" }] },
      { name: "DevOps Basics", description: "Containerization, CI/CD, and deployment", duration: "3 weeks",
        topics: ["Docker", "GitHub Actions", "CI/CD Pipelines", "Vercel/Netlify", "Environment Variables", "Logging"],
        resources: [{ title: "Docker Crash Course", type: "Tutorial" }, { title: "Deploy Full Stack App", type: "Project" }] },
      { name: "System Design", description: "Architecture patterns for scalable applications", duration: "3 weeks",
        topics: ["Load Balancing", "Caching", "Microservices", "Message Queues", "CDN", "Database Sharding"],
        resources: [{ title: "System Design Primer", type: "Tutorial" }, { title: "Design Exercises", type: "Practice" }] },
    ],
  },
  {
    title: "Data Scientist", icon: "📊", description: "Turn data into insights with statistics and ML", totalWeeks: 22,
    steps: [
      { name: "Python & Statistics", description: "Statistical analysis with Python", duration: "3 weeks",
        topics: ["NumPy", "Descriptive Statistics", "Inferential Statistics", "Hypothesis Testing", "A/B Testing", "Bayesian Methods"],
        resources: [{ title: "Stats with Python", type: "Course" }, { title: "Stats Problems", type: "Practice" }] },
      { name: "Data Wrangling", description: "Clean, transform, and prepare data for analysis", duration: "3 weeks",
        topics: ["Pandas", "Data Cleaning", "Feature Engineering", "Missing Data", "Outlier Detection", "Data Pipelines"],
        resources: [{ title: "Pandas Tutorial", type: "Tutorial" }, { title: "Kaggle Datasets", type: "Practice" }] },
      { name: "Data Visualization", description: "Create compelling visualizations and dashboards", duration: "3 weeks",
        topics: ["Matplotlib", "Seaborn", "Plotly", "Dashboard Design", "Storytelling with Data", "Interactive Charts"],
        resources: [{ title: "Visualization Guide", type: "Tutorial" }, { title: "Dashboard Project", type: "Project" }] },
      { name: "Machine Learning", description: "Predictive modeling and evaluation", duration: "5 weeks",
        topics: ["Regression", "Classification", "Ensemble Methods", "Cross-Validation", "Hyperparameter Tuning", "Feature Selection"],
        resources: [{ title: "Applied ML", type: "Course" }, { title: "ML Projects", type: "Project" }] },
      { name: "Deep Learning", description: "Neural networks for complex patterns", duration: "4 weeks",
        topics: ["Neural Networks", "CNNs", "NLP", "Transfer Learning", "Time Series", "Autoencoders"],
        resources: [{ title: "DL Course", type: "Course" }, { title: "DL Projects", type: "Project" }] },
      { name: "Communication", description: "Present findings to stakeholders", duration: "4 weeks",
        topics: ["Technical Writing", "Presentation Skills", "Jupyter Notebooks", "Report Generation", "Business Metrics", "Stakeholder Management"],
        resources: [{ title: "Data Storytelling", type: "Course" }, { title: "Portfolio Project", type: "Project" }] },
    ],
  },
  {
    title: "DevOps Engineer", icon: "⚙️", description: "Automate infrastructure and deployment pipelines", totalWeeks: 20,
    steps: [
      { name: "Linux & Networking", description: "Master Linux admin and networking fundamentals", duration: "3 weeks",
        topics: ["Linux Commands", "File System", "Processes", "Networking", "SSH", "Firewalls"],
        resources: [{ title: "Linux Admin Guide", type: "Tutorial" }, { title: "Linux Labs", type: "Practice" }] },
      { name: "Scripting", description: "Automate tasks with Bash and Python", duration: "3 weeks",
        topics: ["Bash Scripting", "Python Automation", "Cron Jobs", "System Monitoring", "Log Parsing", "API Scripting"],
        resources: [{ title: "Scripting Course", type: "Course" }, { title: "Automation Scripts", type: "Project" }] },
      { name: "Containers & Docker", description: "Containerize applications with Docker", duration: "3 weeks",
        topics: ["Docker Basics", "Dockerfile", "Docker Compose", "Container Networking", "Image Optimization", "Multi-stage Builds"],
        resources: [{ title: "Docker Guide", type: "Tutorial" }, { title: "Containerize App", type: "Project" }] },
      { name: "CI/CD Pipelines", description: "Automated build, test, and deploy workflows", duration: "3 weeks",
        topics: ["GitHub Actions", "Jenkins", "GitLab CI", "Testing Pipelines", "Deployment Strategies", "Artifact Management"],
        resources: [{ title: "CI/CD Tutorial", type: "Tutorial" }, { title: "Pipeline Project", type: "Project" }] },
      { name: "Kubernetes", description: "Container orchestration at scale", duration: "4 weeks",
        topics: ["K8s Architecture", "Pods & Services", "Deployments", "Helm Charts", "Ingress", "Monitoring"],
        resources: [{ title: "K8s Course", type: "Course" }, { title: "K8s Labs", type: "Practice" }] },
      { name: "Infrastructure as Code", description: "Manage infra with Terraform and Ansible", duration: "4 weeks",
        topics: ["Terraform Basics", "AWS/GCP Resources", "State Management", "Ansible Playbooks", "GitOps", "Observability"],
        resources: [{ title: "Terraform Guide", type: "Tutorial" }, { title: "IaC Project", type: "Project" }] },
    ],
  },
  {
    title: "Cybersecurity Analyst", icon: "🔒", description: "Protect systems and hunt for vulnerabilities", totalWeeks: 24,
    steps: [
      { name: "Networking Basics", description: "TCP/IP, protocols, and network architecture", duration: "4 weeks",
        topics: ["OSI Model", "TCP/IP", "DNS", "HTTP/HTTPS", "Firewalls", "VPN"],
        resources: [{ title: "Networking Course", type: "Course" }, { title: "Packet Analysis", type: "Practice" }] },
      { name: "Linux Administration", description: "System administration for security professionals", duration: "3 weeks",
        topics: ["Linux Security", "User Management", "File Permissions", "SELinux", "Logging", "Hardening"],
        resources: [{ title: "Linux Security Guide", type: "Tutorial" }, { title: "Linux Labs", type: "Practice" }] },
      { name: "Security Fundamentals", description: "Core cybersecurity concepts and frameworks", duration: "4 weeks",
        topics: ["CIA Triad", "NIST Framework", "Risk Assessment", "Compliance", "Security Policies", "Incident Response"],
        resources: [{ title: "Security+ Prep", type: "Course" }, { title: "Security Quiz", type: "Practice" }] },
      { name: "Threat Analysis", description: "Identify and analyze security threats", duration: "4 weeks",
        topics: ["SIEM Tools", "Log Analysis", "Malware Analysis", "Threat Intelligence", "MITRE ATT&CK", "IOCs"],
        resources: [{ title: "Threat Analysis", type: "Course" }, { title: "SOC Labs", type: "Practice" }] },
      { name: "Penetration Testing", description: "Ethical hacking and vulnerability assessment", duration: "5 weeks",
        topics: ["Reconnaissance", "Scanning", "Exploitation", "Web App Security", "OWASP Top 10", "Report Writing"],
        resources: [{ title: "Pen Testing Guide", type: "Tutorial" }, { title: "CTF Challenges", type: "Practice" }] },
      { name: "Incident Response", description: "Handle and recover from security incidents", duration: "4 weeks",
        topics: ["IR Planning", "Forensics", "Evidence Collection", "Recovery", "Root Cause Analysis", "Post-Incident Review"],
        resources: [{ title: "IR Course", type: "Course" }, { title: "IR Simulation", type: "Project" }] },
    ],
  },
  {
    title: "Cloud Architect", icon: "☁️", description: "Design scalable cloud infrastructure on AWS/Azure/GCP", totalWeeks: 22,
    steps: [
      { name: "Cloud Fundamentals", description: "Core cloud computing concepts and services", duration: "3 weeks",
        topics: ["IaaS/PaaS/SaaS", "Regions & AZs", "IAM", "Billing", "Shared Responsibility", "Cloud Migration"],
        resources: [{ title: "Cloud Concepts", type: "Course" }, { title: "Free Tier Labs", type: "Practice" }] },
      { name: "Networking & Security", description: "Virtual networks, firewalls, and IAM", duration: "4 weeks",
        topics: ["VPC", "Subnets", "Security Groups", "NACLs", "VPN/Direct Connect", "WAF"],
        resources: [{ title: "Cloud Networking", type: "Tutorial" }, { title: "Network Labs", type: "Practice" }] },
      { name: "Compute & Storage", description: "VMs, containers, and storage services", duration: "4 weeks",
        topics: ["EC2/VMs", "Lambda/Functions", "S3/Blob Storage", "EBS/Disks", "RDS/Cloud SQL", "DynamoDB/Cosmos"],
        resources: [{ title: "Compute Guide", type: "Tutorial" }, { title: "Architecture Project", type: "Project" }] },
      { name: "Containers & Serverless", description: "Modern deployment patterns", duration: "4 weeks",
        topics: ["ECS/AKS", "Kubernetes", "Serverless", "API Gateway", "Event-Driven", "Step Functions"],
        resources: [{ title: "Container Orchestration", type: "Course" }, { title: "Serverless App", type: "Project" }] },
      { name: "IaC & Automation", description: "Infrastructure as code and automation", duration: "3 weeks",
        topics: ["Terraform", "CloudFormation", "ARM Templates", "Ansible", "CI/CD", "GitOps"],
        resources: [{ title: "Terraform AWS", type: "Tutorial" }, { title: "IaC Project", type: "Project" }] },
      { name: "Architecture Patterns", description: "Design resilient, scalable systems", duration: "4 weeks",
        topics: ["Well-Architected Framework", "Multi-Region", "DR Planning", "Cost Optimization", "Microservices", "Event Sourcing"],
        resources: [{ title: "Architecture Course", type: "Course" }, { title: "Design Review", type: "Project" }] },
    ],
  },
];

const LearningRoadmaps = () => {
  const [selected, setSelected] = useState<string | null>(null);
  const [activeStep, setActiveStep] = useState<number>(0);
  const roadmap = roadmaps.find((r) => r.title === selected);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <Map className="h-6 w-6 text-primary" /> Learning Roadmaps
        </h1>
        <p className="text-muted-foreground text-sm mt-1">Interactive step-by-step guidance for top career tracks with detailed content at each stage.</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {roadmaps.map((r) => (
          <motion.div
            key={r.title}
            whileHover={{ scale: 1.02, y: -4 }}
            onClick={() => { setSelected(r.title === selected ? null : r.title); setActiveStep(0); }}
            className={`glass-card-hover p-5 cursor-pointer ${selected === r.title ? "neon-border" : ""}`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{r.icon}</span>
                <div>
                  <h3 className="text-base font-semibold text-foreground">{r.title}</h3>
                  <p className="text-xs text-muted-foreground">{r.steps.length} phases • {r.totalWeeks} weeks</p>
                </div>
              </div>
              <ChevronRight className={`h-4 w-4 text-muted-foreground transition-transform ${selected === r.title ? "rotate-90 text-primary" : ""}`} />
            </div>
            <p className="text-xs text-muted-foreground mt-3">{r.description}</p>
          </motion.div>
        ))}
      </div>

      {roadmap && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          {/* Roadmap timeline */}
          <div className="glass-card-premium neon-border p-6">
            <h2 className="text-xl font-bold gradient-text mb-2 flex items-center gap-2">
              <span className="text-2xl">{roadmaps.find(r => r.title === selected)?.icon}</span>
              {roadmap.title} Roadmap
            </h2>
            <p className="text-sm text-muted-foreground mb-6">{roadmap.steps.length} phases • Estimated {roadmap.totalWeeks} weeks</p>
            
            {/* Visual timeline */}
            <div className="relative">
              <div className="absolute left-[19px] top-0 bottom-0 w-0.5 bg-border" />
              <div className="space-y-2">
                {roadmap.steps.map((step, i) => (
                  <motion.div
                    key={step.name}
                    whileHover={{ x: 4 }}
                    onClick={() => setActiveStep(i)}
                    className={`relative flex items-start gap-4 p-4 rounded-xl cursor-pointer transition-all ${
                      activeStep === i ? "bg-primary/10 border border-primary/30" : "hover:bg-secondary/30"
                    }`}
                  >
                    <div className={`h-10 w-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0 z-10 ${
                      activeStep === i ? "bg-primary text-primary-foreground" : "bg-secondary border border-border text-muted-foreground"
                    }`}>
                      {i + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className={`text-sm font-semibold ${activeStep === i ? "text-primary" : "text-foreground"}`}>{step.name}</span>
                        <span className="text-xs text-muted-foreground flex items-center gap-1"><Clock className="h-3 w-3" />{step.duration}</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">{step.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Active step detail */}
          {roadmap.steps[activeStep] && (
            <motion.div key={activeStep} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="glass-card p-6 space-y-5">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  Phase {activeStep + 1}: {roadmap.steps[activeStep].name}
                </h3>
                <span className="text-xs text-muted-foreground bg-secondary/50 px-3 py-1 rounded-full">{roadmap.steps[activeStep].duration}</span>
              </div>
              <p className="text-sm text-muted-foreground">{roadmap.steps[activeStep].description}</p>

              {/* Topics */}
              <div>
                <h4 className="text-xs font-semibold text-foreground mb-3 flex items-center gap-1"><Lightbulb className="h-3.5 w-3.5 text-neon-amber" /> Key Topics</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {roadmap.steps[activeStep].topics.map((topic, i) => (
                    <motion.div key={topic} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                      className="flex items-center gap-2 text-xs text-muted-foreground bg-secondary/20 rounded-lg p-2.5 border border-border/30 hover:border-primary/30 transition-colors">
                      <CheckCircle2 className="h-3.5 w-3.5 text-primary shrink-0" />
                      {topic}
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Resources */}
              <div>
                <h4 className="text-xs font-semibold text-foreground mb-3 flex items-center gap-1"><BookOpen className="h-3.5 w-3.5 text-neon-cyan" /> Learning Resources</h4>
                <div className="space-y-2">
                  {roadmap.steps[activeStep].resources.map((res) => (
                    <div key={res.title} className="flex items-center justify-between p-3 rounded-lg bg-secondary/20 border border-border/30 hover:border-primary/20 transition-colors">
                      <div className="flex items-center gap-3">
                        <Play className="h-4 w-4 text-primary" />
                        <span className="text-sm text-foreground">{res.title}</span>
                      </div>
                      <span className="text-[10px] px-2 py-0.5 rounded-full border border-primary/20 bg-primary/5 text-primary">{res.type}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      )}
    </motion.div>
  );
};

export default LearningRoadmaps;
