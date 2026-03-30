import { motion } from "framer-motion";
import { Trophy, MapPin, Calendar, Bookmark, BookmarkCheck, Search, Users, Clock, ExternalLink, DollarSign, ChevronDown, Globe } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";

const hackathons = [
  { id: 1, name: "HackMIT 2026", org: "MIT", date: "Apr 12-14, 2026", location: "Boston, MA", mode: "In-Person", skills: ["AI", "Web3", "Cloud"], featured: true, deadline: "Mar 30, 2026", prizes: "$10,000", participants: "500+", description: "MIT's annual student hackathon. Build innovative projects in 36 hours with mentors from top tech companies. Open to all university students worldwide.", website: "hackmit.org" },
  { id: 2, name: "Google DevFest Hackathon", org: "Google Developer Groups", date: "May 5-7, 2026", location: "Online", mode: "Virtual", skills: ["Flutter", "Firebase", "AI"], featured: true, deadline: "Apr 20, 2026", prizes: "$15,000", participants: "2000+", description: "Build with Google technologies. Solve real-world problems using Google Cloud, Flutter, Firebase, and AI/ML tools.", website: "devfest.withgoogle.com" },
  { id: 3, name: "ETHGlobal Singapore", org: "ETHGlobal", date: "Mar 22-24, 2026", location: "Singapore", mode: "In-Person", skills: ["Web3", "Solidity", "DeFi"], featured: true, deadline: "Mar 15, 2026", prizes: "$50,000", participants: "1000+", description: "The world's largest Ethereum hackathon series. Build decentralized applications with support from 100+ sponsors.", website: "ethglobal.com" },
  { id: 4, name: "MLH Global Hack Week", org: "Major League Hacking", date: "Year-round", location: "Online & In-Person", mode: "Hybrid", skills: ["Python", "React", "APIs"], featured: false, deadline: "Rolling", prizes: "Varies", participants: "10000+", description: "Week-long themed hackathons happening throughout the year. Perfect for beginners and experienced hackers alike.", website: "mlh.io" },
  { id: 5, name: "HackTheBox CTF", org: "HackTheBox", date: "Jun 1-2, 2026", location: "Online", mode: "Virtual", skills: ["Security", "Linux", "Forensics"], featured: false, deadline: "May 25, 2026", prizes: "$5,000", participants: "3000+", description: "Capture-the-flag competition for cybersecurity enthusiasts. Test your skills in web exploitation, cryptography, and reverse engineering.", website: "hackthebox.com" },
  { id: 6, name: "AWS GameDay Challenge", org: "Amazon Web Services", date: "May 15, 2026", location: "Online", mode: "Virtual", skills: ["AWS", "Cloud", "DevOps"], featured: false, deadline: "May 10, 2026", prizes: "$8,000", participants: "1500+", description: "Team-based AWS challenge where you manage a production workload. Test your cloud skills under pressure with real AWS services.", website: "aws.amazon.com/gameday" },
  { id: 7, name: "React Conf Hackathon", org: "Meta Open Source", date: "Jun 20-22, 2026", location: "Las Vegas, NV", mode: "In-Person", skills: ["React", "TypeScript", "Node.js"], featured: false, deadline: "Jun 5, 2026", prizes: "$12,000", participants: "300+", description: "Build with the latest React features alongside the React core team. Get early access to upcoming APIs.", website: "conf.react.dev" },
  { id: 8, name: "AI for Good Global", org: "Microsoft", date: "Jul 10-12, 2026", location: "Online", mode: "Virtual", skills: ["AI", "Python", "Azure"], featured: true, deadline: "Jun 30, 2026", prizes: "$20,000", participants: "5000+", description: "Use artificial intelligence to solve humanitarian challenges. Categories include health, environment, accessibility, and education.", website: "aiforgood.itu.int" },
  { id: 9, name: "PennApps XXVI", org: "University of Pennsylvania", date: "Sep 5-7, 2026", location: "Philadelphia, PA", mode: "In-Person", skills: ["Full Stack", "AI", "IoT"], featured: false, deadline: "Aug 20, 2026", prizes: "$25,000", participants: "800+", description: "One of the oldest and largest college hackathons in the world. Build anything you can imagine in 36 hours.", website: "pennapps.com" },
  { id: 10, name: "Devfolio BUIDLit", org: "Devfolio", date: "Aug 1-30, 2026", location: "Online", mode: "Virtual", skills: ["Web3", "Blockchain", "DeFi"], featured: false, deadline: "Jul 25, 2026", prizes: "$30,000", participants: "4000+", description: "India's largest Web3 hackathon. Build decentralized apps on multiple blockchain platforms.", website: "devfolio.co" },
  { id: 11, name: "CalHacks 11.0", org: "UC Berkeley", date: "Oct 18-20, 2026", location: "Berkeley, CA", mode: "In-Person", skills: ["AI", "ML", "Mobile"], featured: true, deadline: "Oct 1, 2026", prizes: "$40,000", participants: "2000+", description: "The world's largest collegiate hackathon hosted at UC Berkeley.", website: "calhacks.io" },
  { id: 12, name: "Junction 2026", org: "Junction", date: "Nov 7-9, 2026", location: "Helsinki, Finland", mode: "In-Person", skills: ["IoT", "AI", "Sustainability"], featured: false, deadline: "Oct 15, 2026", prizes: "€15,000", participants: "1500+", description: "Europe's leading hackathon bringing together 1,500 hackers from around the world in Helsinki.", website: "hackjunction.com" },
];

const filters = ["All", "In-Person", "Virtual", "Hybrid", "AI", "Web3", "Cloud", "Security", "React", "Full Stack"];

const HackathonsPage = () => {
  const [active, setActive] = useState("All");
  const [bookmarked, setBookmarked] = useState<number[]>([]);
  const [search, setSearch] = useState("");
  const [showBookmarked, setShowBookmarked] = useState(false);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const toggleBookmark = (id: number) => {
    setBookmarked(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const filtered = hackathons.filter((h) => {
    if (showBookmarked && !bookmarked.includes(h.id)) return false;
    if (search && !h.name.toLowerCase().includes(search.toLowerCase()) && !h.org.toLowerCase().includes(search.toLowerCase())) return false;
    if (active === "All") return true;
    if (["In-Person", "Virtual", "Hybrid"].includes(active)) return h.mode === active;
    return h.skills.includes(active);
  });

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <Trophy className="h-6 w-6 text-primary" /> Hackathon Explorer
        </h1>
        <p className="text-muted-foreground text-sm mt-1">Discover {hackathons.length} hackathons, coding competitions, and tech events worldwide.</p>
      </div>

      {/* Search & Bookmark Filter */}
      <div className="flex items-center gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search hackathons..." className="pl-10 bg-secondary/30 border-border/50" />
        </div>
        <button
          onClick={() => setShowBookmarked(!showBookmarked)}
          className={`flex items-center gap-1.5 text-xs px-3 py-2 rounded-lg border transition-all ${showBookmarked ? "border-neon-amber bg-neon-amber/10 text-neon-amber" : "border-border text-muted-foreground"}`}
        >
          <BookmarkCheck className="h-3.5 w-3.5" /> Saved ({bookmarked.length})
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {filters.map((f) => (
          <button key={f} onClick={() => setActive(f)}
            className={`text-xs px-3 py-1.5 rounded-full border transition-all ${active === f ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground hover:text-foreground"}`}>
            {f}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {filtered.map((h) => (
          <motion.div key={h.id} layout whileHover={{ y: -2 }} className={`glass-card-hover p-5 ${h.featured ? "neon-border" : ""}`}>
            <div className="flex items-start justify-between">
              <div>
                {h.featured && <span className="text-[10px] uppercase tracking-wider text-primary font-semibold animate-pulse-glow">⚡ Featured</span>}
                <h3 className="text-base font-semibold text-foreground mt-1">{h.name}</h3>
                <p className="text-xs text-muted-foreground">{h.org}</p>
              </div>
              <button onClick={() => toggleBookmark(h.id)} className="text-muted-foreground hover:text-neon-amber transition-colors">
                {bookmarked.includes(h.id) ? <BookmarkCheck className="h-5 w-5 text-neon-amber" /> : <Bookmark className="h-5 w-5" />}
              </button>
            </div>
            <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {h.date}</span>
              <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {h.location}</span>
            </div>
            <div className="grid grid-cols-3 gap-2 mt-3 text-xs text-muted-foreground">
              <div><span className="text-foreground font-medium flex items-center gap-1"><DollarSign className="h-3 w-3 text-neon-emerald" />{h.prizes}</span><span className="text-[10px]">Prizes</span></div>
              <div><span className="text-foreground font-medium flex items-center gap-1"><Users className="h-3 w-3 text-neon-purple" />{h.participants}</span><span className="text-[10px]">Participants</span></div>
              <div><span className="text-foreground font-medium flex items-center gap-1"><Clock className="h-3 w-3 text-neon-pink" />{h.deadline}</span><span className="text-[10px]">Deadline</span></div>
            </div>
            <div className="flex flex-wrap gap-1.5 mt-3">
              {h.skills.map((s) => (
                <span key={s} className="text-[10px] px-2 py-0.5 rounded-full border border-primary/20 bg-primary/5 text-primary">{s}</span>
              ))}
            </div>
            <div className="flex items-center justify-between mt-4">
              <span className={`text-xs px-2 py-0.5 rounded-full ${
                h.mode === "Virtual" ? "bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/20" : 
                h.mode === "Hybrid" ? "bg-neon-amber/10 text-neon-amber border border-neon-amber/20" :
                "bg-neon-purple/10 text-neon-purple border border-neon-purple/20"
              }`}>
                {h.mode}
              </span>
              <button onClick={() => setExpandedId(expandedId === h.id ? null : h.id)} className="text-xs text-primary flex items-center gap-1 hover:underline">
                Details <ChevronDown className={`h-3 w-3 transition-transform ${expandedId === h.id ? "rotate-180" : ""}`} />
              </button>
            </div>

            {/* Expanded details */}
            {expandedId === h.id && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="mt-4 pt-4 border-t border-border/30 space-y-3">
                <p className="text-sm text-muted-foreground leading-relaxed">{h.description}</p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Globe className="h-3.5 w-3.5" />
                  <span>{h.website}</span>
                </div>
              </motion.div>
            )}
          </motion.div>
        ))}
        {filtered.length === 0 && (
          <div className="col-span-2 text-center py-12 text-muted-foreground">
            <Trophy className="h-12 w-12 mx-auto mb-3 opacity-30" />
            <p>No hackathons found matching your filters.</p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default HackathonsPage;
