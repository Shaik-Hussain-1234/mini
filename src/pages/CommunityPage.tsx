import { motion } from "framer-motion";
import { Users, MessageSquare, Lightbulb, TrendingUp, Flame, ExternalLink } from "lucide-react";

const discussions = [
  { title: "Best resources for learning Kubernetes in 2026?", author: "DevLearner42", replies: 24, category: "DevOps", time: "2 hours ago" },
  { title: "React vs Vue vs Svelte - which to learn in 2026?", author: "WebDev_Pro", replies: 56, category: "Frontend", time: "5 hours ago" },
  { title: "How to prepare for FAANG system design interviews?", author: "CareerSwitch", replies: 38, category: "Interviews", time: "1 day ago" },
  { title: "Is Rust worth learning for backend development?", author: "RustFan", replies: 42, category: "Languages", time: "1 day ago" },
  { title: "Share your AI/ML project ideas for beginners", author: "AI_Beginner", replies: 31, category: "AI/ML", time: "2 days ago" },
];

const skillOfWeek = { name: "Docker & Containerization", reason: "Essential for modern DevOps and deployment. High demand across all roles.", resource: "https://docs.docker.com/get-started/" };

const newsItems = [
  { title: "GPT-5 Released: What Developers Need to Know", source: "TechCrunch", url: "https://techcrunch.com" },
  { title: "Rust 2.0 Preview Announced", source: "The Verge", url: "https://theverge.com" },
  { title: "AWS Launches New Free Tier Services", source: "AWS Blog", url: "https://aws.amazon.com/blogs/" },
  { title: "Google Introduces New AI Coding Assistant", source: "Google Blog", url: "https://blog.google" },
];

const CommunityPage = () => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
    <div>
      <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
        <Users className="h-6 w-6 text-primary" /> Community & News
      </h1>
      <p className="text-muted-foreground text-sm mt-1">Discuss technologies, share resources, and stay updated.</p>
    </div>

    <div className="grid lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        {/* Discussions */}
        <div className="glass-card p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2"><MessageSquare className="h-5 w-5 text-primary" /> Trending Discussions</h2>
          <div className="space-y-3">
            {discussions.map((d) => (
              <div key={d.title} className="p-4 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors cursor-pointer">
                <h3 className="text-sm font-medium text-foreground">{d.title}</h3>
                <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                  <span>{d.author}</span>
                  <span>{d.replies} replies</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full border border-primary/20 bg-primary/5 text-primary">{d.category}</span>
                  <span>{d.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* News Feed */}
        <div className="glass-card p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2"><TrendingUp className="h-5 w-5 text-primary" /> Daily Tech News</h2>
          <div className="space-y-3">
            {newsItems.map((n) => (
              <a key={n.title} href={n.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors group">
                <div>
                  <h3 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">{n.title}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">{n.source}</p>
                </div>
                <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary shrink-0" />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {/* Skill of the Week */}
        <div className="glass-card neon-border p-6">
          <h2 className="text-base font-semibold text-foreground mb-3 flex items-center gap-2"><Flame className="h-5 w-5 text-neon-amber" /> Skill of the Week</h2>
          <h3 className="text-lg font-bold gradient-text">{skillOfWeek.name}</h3>
          <p className="text-xs text-muted-foreground mt-2 mb-3">{skillOfWeek.reason}</p>
          <a href={skillOfWeek.resource} target="_blank" rel="noopener noreferrer" className="text-xs text-primary flex items-center gap-1 hover:underline">
            Start Learning <ExternalLink className="h-3 w-3" />
          </a>
        </div>

        {/* Developer Leaderboard */}
        <div className="glass-card p-6">
          <h2 className="text-base font-semibold text-foreground mb-4 flex items-center gap-2"><Lightbulb className="h-5 w-5 text-primary" /> Developer Leaderboard</h2>
          <div className="space-y-3">
            {[
              { rank: 1, name: "Alice Chen", score: 2840, badge: "🥇" },
              { rank: 2, name: "Bob Smith", score: 2650, badge: "🥈" },
              { rank: 3, name: "Carol Lee", score: 2480, badge: "🥉" },
              { rank: 4, name: "David Kim", score: 2320, badge: "" },
              { rank: 5, name: "Emily Wang", score: 2150, badge: "" },
            ].map((u) => (
              <div key={u.rank} className="flex items-center justify-between p-2">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold text-muted-foreground w-6">#{u.rank}</span>
                  <span className="text-sm text-foreground">{u.badge} {u.name}</span>
                </div>
                <span className="text-xs font-bold text-primary">{u.score}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </motion.div>
);

export default CommunityPage;
