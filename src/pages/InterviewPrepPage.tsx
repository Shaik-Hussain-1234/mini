import { motion } from "framer-motion";
import { MessageSquare, Code, Briefcase, Brain, ChevronDown, Lightbulb, Building2 } from "lucide-react";
import { useState } from "react";

const categories = [
  {
    name: "Coding Interview", icon: Code,
    questions: [
      { q: "Explain the difference between arrays and linked lists.", a: "Arrays store elements in contiguous memory with O(1) random access but O(n) insertion/deletion. Linked lists use nodes with pointers giving O(1) insertion/deletion at known positions but O(n) access. Arrays have better cache locality. Use arrays when you need random access; linked lists when you need frequent insertions/deletions." },
      { q: "What is time complexity of binary search?", a: "O(log n) — it halves the search space with each comparison. Requires a sorted array. Space complexity is O(1) for iterative, O(log n) for recursive due to call stack." },
      { q: "Explain dynamic programming.", a: "DP solves complex problems by breaking them into overlapping subproblems, storing results to avoid redundant computation. Two approaches: Top-down (memoization with recursion) and Bottom-up (tabulation with iteration). Classic examples: Fibonacci, Knapsack, Longest Common Subsequence." },
      { q: "What is a hash table collision and how to handle it?", a: "When two keys hash to the same index. Solutions: Chaining (linked lists at each bucket, O(1) avg, O(n) worst), Open Addressing (linear probing, quadratic probing, double hashing). Load factor = n/m determines performance." },
      { q: "Explain BFS vs DFS.", a: "BFS (Breadth-First Search): Uses a queue, explores level by level. Best for shortest path in unweighted graphs. Space: O(V). DFS (Depth-First Search): Uses a stack/recursion, goes deep before backtracking. Best for detecting cycles, topological sort. Space: O(V)." },
      { q: "What is the two-pointer technique?", a: "Using two indices to traverse data from different positions. Common patterns: 1) Opposite ends moving inward (sorted array sum), 2) Fast/slow pointers (cycle detection), 3) Sliding window (substring problems). Reduces O(n²) to O(n)." },
    ],
  },
  {
    name: "System Design", icon: Brain,
    questions: [
      { q: "Design a URL shortener like bit.ly.", a: "Components: API Gateway, Load Balancer, App Servers, Database (key-value store), Cache (Redis). Generate short ID using base62 encoding of auto-increment ID or hash. Store mapping: shortURL → longURL. Add caching layer for popular URLs. Handle analytics (click count, geo). Scale: Horizontal scaling with consistent hashing, read replicas." },
      { q: "Design a chat application like WhatsApp.", a: "Use WebSocket for real-time messaging. Components: Chat servers (WebSocket), Message queue (Kafka), Database (Cassandra for messages, SQL for users), Push notification service, Media storage (S3). Message flow: Client → WebSocket → Message Queue → Recipient's WebSocket. Group chats: Fan-out on write vs fan-out on read." },
      { q: "Design a rate limiter.", a: "Algorithms: 1) Token Bucket (tokens added at fixed rate), 2) Sliding Window (count requests in time window), 3) Leaky Bucket (fixed processing rate). Implementation: Redis for distributed rate limiting. Store: user_id → {count, window_start}. Return 429 when limit exceeded. Consider: per-user, per-IP, per-API limits." },
      { q: "Explain REST vs GraphQL.", a: "REST: Multiple endpoints, fixed data shapes, HTTP methods (GET/POST/PUT/DELETE), caching via HTTP headers. GraphQL: Single endpoint, client specifies data needs, reduces over/under-fetching, subscription support. REST is simpler, better caching. GraphQL is flexible, reduces requests." },
      { q: "Design a notification system.", a: "Components: Notification service, Template engine, User preference store, Delivery channels (Email/SMS/Push/In-app), Message queue, Analytics. Flow: Event triggers → Notification service checks preferences → Renders template → Queues for delivery → Channel-specific sender → Track delivery/open. Use priority queues, rate limiting, retry with exponential backoff." },
    ],
  },
  {
    name: "HR Interview", icon: Briefcase,
    questions: [
      { q: "Tell me about yourself.", a: "Formula: Present → Past → Future. 'I'm currently [role/skills]. Previously, I [relevant experience]. I'm excited about [this opportunity] because [alignment with goals].' Keep it 90 seconds. Focus on what's relevant to the position." },
      { q: "Why do you want to work here?", a: "Research the company deeply. Mention: 1) Specific products or tech you admire, 2) Company culture/values that resonate, 3) Growth opportunities, 4) How your skills align with their needs. Be genuine — interviewers detect generic answers." },
      { q: "What is your biggest weakness?", a: "Pick a genuine area for improvement that isn't critical to the role. Show self-awareness and proactive improvement. Example: 'I used to struggle with public speaking, so I joined Toastmasters and now present at team meetings regularly.'" },
      { q: "Where do you see yourself in 5 years?", a: "Show ambition aligned with the company. Focus on: 1) Skills you want to develop, 2) Impact you want to make, 3) Leadership or technical depth. Avoid: specific titles, leaving the company, unrealistic goals." },
      { q: "Tell me about a time you handled conflict.", a: "Use STAR method: Situation (brief context), Task (your responsibility), Action (specific steps you took), Result (positive outcome with metrics if possible). Focus on resolution, communication, and learning." },
      { q: "Why should we hire you?", a: "Connect three things: 1) Your unique skills and experience, 2) The company's needs (from job description), 3) Your passion for the work. Be specific: 'My experience with [X] directly addresses your need for [Y], and I'm excited about [Z].'" },
    ],
  },
  {
    name: "Company-Specific", icon: Building2,
    questions: [
      { q: "Google: How would you design Google Search?", a: "Web crawlers → Indexing (inverted index) → Ranking (PageRank, ML signals) → Serving (distributed cache, CDN). Key challenges: Scale (billions of pages), Freshness (re-crawling), Relevance (NLP, user intent), Speed (<200ms). Use MapReduce for indexing, distributed systems for serving." },
      { q: "Amazon: Tell me about a time you disagreed with a decision.", a: "Use Amazon's Leadership Principle 'Have Backbone; Disagree and Commit.' Describe: the situation, why you disagreed, how you presented your case with data, the outcome. Show you can disagree respectfully but commit fully once a decision is made." },
      { q: "Meta: Design Facebook's News Feed.", a: "Feed generation: 1) Pull model (query on request) vs Push model (precompute). Hybrid approach: Push for active users, Pull for celebrity posts. Ranking: ML model with features (engagement probability, recency, relationship strength). Components: Feed service, Ranking service, Social graph, Content store, Cache layer." },
      { q: "Microsoft: How would you improve Microsoft Teams?", a: "Research current pain points. Suggest: 1) Better threading (like Slack), 2) Faster startup time, 3) Better search across chats/files, 4) AI meeting summaries, 5) Reduced memory usage. For each suggestion, explain the technical approach and user impact." },
    ],
  },
];

const InterviewPrepPage = () => {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filtered = activeCategory ? categories.filter(c => c.name === activeCategory) : categories;

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <MessageSquare className="h-6 w-6 text-primary" /> Interview Preparation Center
        </h1>
        <p className="text-muted-foreground text-sm mt-1">Comprehensive preparation for coding, system design, HR, and company-specific interviews.</p>
      </div>

      {/* Category filters */}
      <div className="flex flex-wrap gap-2">
        <button onClick={() => setActiveCategory(null)} className={`text-xs px-3 py-1.5 rounded-full border transition-all ${!activeCategory ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground"}`}>All</button>
        {categories.map(c => (
          <button key={c.name} onClick={() => setActiveCategory(c.name === activeCategory ? null : c.name)}
            className={`text-xs px-3 py-1.5 rounded-full border transition-all flex items-center gap-1 ${activeCategory === c.name ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground"}`}>
            <c.icon className="h-3 w-3" /> {c.name}
          </button>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        {categories.map(c => (
          <div key={c.name} className="glass-card p-4 text-center">
            <c.icon className="h-5 w-5 text-primary mx-auto mb-1" />
            <div className="text-lg font-bold text-foreground">{c.questions.length}</div>
            <div className="text-xs text-muted-foreground">{c.name}</div>
          </div>
        ))}
      </div>

      {filtered.map((cat) => (
        <div key={cat.name} className="glass-card p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <cat.icon className="h-5 w-5 text-primary" /> {cat.name} Questions
          </h2>
          <div className="space-y-2">
            {cat.questions.map((item) => (
              <div key={item.q} className="rounded-lg border border-border/50 overflow-hidden">
                <button
                  onClick={() => setExpanded(expanded === item.q ? null : item.q)}
                  className="w-full text-left p-4 flex items-center justify-between bg-secondary/20 hover:bg-secondary/40 transition-colors"
                >
                  <span className="text-sm text-foreground">{item.q}</span>
                  <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform shrink-0 ml-2 ${expanded === item.q ? "rotate-180 text-primary" : ""}`} />
                </button>
                {expanded === item.q && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 bg-secondary/10 border-t border-border/50">
                    <div className="flex items-start gap-2">
                      <Lightbulb className="h-4 w-4 text-neon-amber shrink-0 mt-0.5" />
                      <p className="text-sm text-muted-foreground leading-relaxed">{item.a}</p>
                    </div>
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </motion.div>
  );
};

export default InterviewPrepPage;
