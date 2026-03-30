import { motion } from "framer-motion";
import { Quote, RefreshCw, Heart, Share2, Copy, Check } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const quotes = [
  { text: "First, solve the problem. Then, write the code.", author: "John Johnson" },
  { text: "Code is like humor. When you have to explain it, it's bad.", author: "Cory House" },
  { text: "Make it work, make it right, make it fast.", author: "Kent Beck" },
  { text: "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.", author: "Martin Fowler" },
  { text: "The best error message is the one that never shows up.", author: "Thomas Fuchs" },
  { text: "Simplicity is the soul of efficiency.", author: "Austin Freeman" },
  { text: "Programs must be written for people to read, and only incidentally for machines to execute.", author: "Harold Abelson" },
  { text: "Talk is cheap. Show me the code.", author: "Linus Torvalds" },
  { text: "Truth can only be found in one place: the code.", author: "Robert C. Martin" },
  { text: "The most disastrous thing that you can ever learn is your first programming language.", author: "Alan Kay" },
  { text: "Experience is the name everyone gives to their mistakes.", author: "Oscar Wilde" },
  { text: "Perfection is achieved not when there is nothing more to add, but when there is nothing left to take away.", author: "Antoine de Saint-Exupéry" },
  { text: "Java is to JavaScript what car is to carpet.", author: "Chris Heilmann" },
  { text: "The only way to learn a new programming language is by writing programs in it.", author: "Dennis Ritchie" },
  { text: "Software is a great combination between artistry and engineering.", author: "Bill Gates" },
  { text: "The function of good software is to make the complex appear to be simple.", author: "Grady Booch" },
  { text: "Don't worry if it doesn't work right. If everything did, you'd be out of a job.", author: "Mosher's Law" },
  { text: "It's not a bug — it's an undocumented feature.", author: "Anonymous" },
  { text: "Before software can be reusable it first has to be usable.", author: "Ralph Johnson" },
  { text: "The best way to predict the future is to implement it.", author: "David Heinemeier Hansson" },
];

const DevQuotes = () => {
  const [index, setIndex] = useState(0);
  const [liked, setLiked] = useState<number[]>([]);
  const [copied, setCopied] = useState(false);
  const quote = quotes[index];

  const next = () => setIndex((index + 1) % quotes.length);
  const random = () => setIndex(Math.floor(Math.random() * quotes.length));
  const toggleLike = () => setLiked(prev => prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]);
  const copy = () => { navigator.clipboard.writeText(`"${quote.text}" — ${quote.author}`); setCopied(true); setTimeout(() => setCopied(false), 2000); };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 max-w-2xl mx-auto">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-foreground flex items-center justify-center gap-2"><Quote className="h-6 w-6 text-primary" /> Dev Quotes</h1>
        <p className="text-muted-foreground text-sm mt-1">Daily inspiration for developers.</p>
      </div>
      <motion.div key={index} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="glass-card-premium neon-border p-10 text-center aurora-bg">
        <Quote className="h-8 w-8 text-primary/30 mx-auto mb-4" />
        <p className="text-xl md:text-2xl font-medium text-foreground leading-relaxed mb-6 italic">"{quote.text}"</p>
        <p className="text-sm text-primary font-semibold">— {quote.author}</p>
      </motion.div>
      <div className="flex items-center justify-center gap-3">
        <Button variant="neon" onClick={random}><RefreshCw className="h-4 w-4 mr-2" /> Random</Button>
        <Button variant={liked.includes(index) ? "neon-purple" : "neon-outline"} onClick={toggleLike}>
          <Heart className={`h-4 w-4 mr-2 ${liked.includes(index) ? "fill-current" : ""}`} /> {liked.includes(index) ? "Liked" : "Like"}
        </Button>
        <Button variant="ghost" onClick={copy}>
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        </Button>
      </div>
      <div className="glass-card p-4">
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
          <span>All Quotes ({quotes.length})</span>
          <span>{liked.length} liked</span>
        </div>
        <div className="space-y-2 max-h-[300px] overflow-y-auto">
          {quotes.map((q, i) => (
            <button key={i} onClick={() => setIndex(i)}
              className={`w-full text-left p-3 rounded-lg text-xs transition-all ${index === i ? "bg-primary/10 border border-primary/30" : "bg-secondary/20 hover:bg-secondary/40"}`}>
              <p className="text-foreground truncate">"{q.text}"</p>
              <p className="text-muted-foreground mt-0.5">— {q.author}</p>
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default DevQuotes;
