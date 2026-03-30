import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Network, ChevronDown } from "lucide-react";

const systems = [
  { name: "URL Shortener", components: ["API Gateway", "Short URL Service", "Database (KV Store)", "Cache (Redis)", "Analytics Service"],
    steps: ["1. User sends long URL to API", "2. Service generates short code (Base62)", "3. Store mapping in database", "4. Cache hot URLs in Redis", "5. On access, lookup + redirect (301)", "6. Log analytics asynchronously"],
    considerations: ["Read-heavy (100:1 ratio)", "~1B URLs, each ~500 bytes = 500GB storage", "Use consistent hashing for distribution", "Custom aliases support"] },
  { name: "Chat Application", components: ["WebSocket Server", "Message Queue (Kafka)", "User Service", "Presence Service", "Media Service", "Database"],
    steps: ["1. Client connects via WebSocket", "2. Messages published to queue", "3. Queue delivers to recipient's server", "4. Store messages in database", "5. Presence service tracks online status", "6. Media uploaded to object storage"],
    considerations: ["WebSocket for real-time", "Kafka for message ordering", "Read receipts and typing indicators", "End-to-end encryption"] },
  { name: "Social Media Feed", components: ["API Server", "Feed Service", "Post Service", "User Graph", "Cache Layer", "CDN", "Search Service"],
    steps: ["1. User creates post → Post Service", "2. Fan-out to followers' feeds", "3. Feed stored in cache per user", "4. On read, fetch from cache + merge", "5. Images/videos served via CDN", "6. Search index updated async"],
    considerations: ["Fan-out on write vs read tradeoff", "Celebrity problem (hybrid approach)", "Ranking algorithm for feed", "Eventual consistency acceptable"] },
  { name: "Ride Sharing Service", components: ["API Gateway", "Matching Service", "Location Service", "Pricing Engine", "Payment Service", "Notification Service"],
    steps: ["1. Rider requests ride with location", "2. Location service finds nearby drivers", "3. Matching algorithm selects best driver", "4. Pricing engine calculates fare", "5. Real-time tracking via WebSocket", "6. Payment processed on completion"],
    considerations: ["Geospatial indexing (QuadTree/S2)", "Real-time location updates every 3-4s", "Dynamic pricing during high demand", "ETA calculation with traffic data"] },
];

const SystemDesignBoard = () => {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
        <Network className="h-6 w-6 text-primary" /> System Design Board
      </h1>

      <div className="space-y-4">
        {systems.map(sys => (
          <div key={sys.name} className="glass-card overflow-hidden">
            <button onClick={() => setOpen(open === sys.name ? null : sys.name)}
              className="w-full p-6 flex items-center justify-between hover:bg-muted/10 transition-colors">
              <div className="text-left">
                <h3 className="text-lg font-semibold text-foreground">{sys.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">{sys.components.length} components</p>
              </div>
              <ChevronDown className={`h-5 w-5 text-muted-foreground transition-transform ${open === sys.name ? "rotate-180" : ""}`} />
            </button>
            <AnimatePresence>
              {open === sys.name && (
                <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden">
                  <div className="p-6 pt-0 space-y-6">
                    <div>
                      <h4 className="text-sm font-semibold text-foreground mb-3">Components</h4>
                      <div className="flex gap-2 flex-wrap">
                        {sys.components.map(c => (
                          <span key={c} className="px-3 py-1.5 rounded-xl bg-primary/10 border border-primary/20 text-primary text-xs font-medium">{c}</span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-foreground mb-3">Design Steps</h4>
                      <div className="space-y-2">
                        {sys.steps.map((s, i) => (
                          <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-muted/10">
                            <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center text-xs text-primary font-bold shrink-0">{i + 1}</div>
                            <p className="text-sm text-foreground">{s.replace(/^\d+\.\s*/, "")}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-foreground mb-3">Key Considerations</h4>
                      <ul className="space-y-1">
                        {sys.considerations.map(c => (
                          <li key={c} className="text-sm text-muted-foreground flex items-start gap-2">
                            <span className="text-primary mt-1">•</span> {c}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default SystemDesignBoard;
