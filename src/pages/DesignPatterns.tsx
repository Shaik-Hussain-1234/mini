import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shapes, ChevronDown } from "lucide-react";

const patterns = [
  { name: "Singleton", category: "Creational", desc: "Ensures a class has only one instance and provides a global point of access to it.",
    code: `class Singleton {
  static instance = null;
  static getInstance() {
    if (!Singleton.instance) {
      Singleton.instance = new Singleton();
    }
    return Singleton.instance;
  }
}`, useCase: "Database connections, configuration managers, logging" },
  { name: "Observer", category: "Behavioral", desc: "Defines a one-to-many dependency between objects so that when one changes state, all dependents are notified.",
    code: `class EventEmitter {
  listeners = {};
  on(event, fn) {
    (this.listeners[event] ??= []).push(fn);
  }
  emit(event, data) {
    this.listeners[event]?.forEach(fn => fn(data));
  }
}`, useCase: "Event systems, React state management, pub/sub" },
  { name: "Factory", category: "Creational", desc: "Creates objects without specifying the exact class to create, using a common interface.",
    code: `function createUser(type) {
  switch(type) {
    case 'admin': return new Admin();
    case 'user': return new User();
    default: throw new Error('Unknown type');
  }
}`, useCase: "Object creation logic, plugin systems, API response parsing" },
  { name: "Strategy", category: "Behavioral", desc: "Defines a family of algorithms, encapsulates each one, and makes them interchangeable.",
    code: `const strategies = {
  bubble: (arr) => { /* bubble sort */ },
  quick: (arr) => { /* quick sort */ },
  merge: (arr) => { /* merge sort */ },
};
const sort = (arr, strategy) => strategies[strategy](arr);`, useCase: "Sorting algorithms, payment methods, validation rules" },
  { name: "Decorator", category: "Structural", desc: "Attaches additional responsibilities to an object dynamically, as a flexible alternative to subclassing.",
    code: `function withLogging(fn) {
  return function(...args) {
    console.log('Calling', fn.name, args);
    const result = fn(...args);
    console.log('Result:', result);
    return result;
  };
}`, useCase: "Middleware, HOCs in React, logging/caching wrappers" },
  { name: "Adapter", category: "Structural", desc: "Converts the interface of a class into another interface clients expect.",
    code: `class OldAPI {
  fetchData() { return { items: [] }; }
}
class APIAdapter {
  constructor(oldApi) { this.api = oldApi; }
  getData() {
    const { items } = this.api.fetchData();
    return { data: items, count: items.length };
  }
}`, useCase: "Legacy system integration, third-party API wrappers" },
];

const DesignPatterns = () => {
  const [open, setOpen] = useState<string | null>(null);
  const [filter, setFilter] = useState("All");
  const categories = ["All", ...new Set(patterns.map(p => p.category))];
  const filtered = filter === "All" ? patterns : patterns.filter(p => p.category === filter);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
        <Shapes className="h-6 w-6 text-primary" /> Design Patterns
      </h1>

      <div className="flex gap-2">
        {categories.map(c => (
          <button key={c} onClick={() => setFilter(c)} className={`tag-pill ${filter === c ? "border-primary/60 bg-primary/20" : ""}`}>{c}</button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map(p => (
          <div key={p.name} className="glass-card overflow-hidden">
            <button onClick={() => setOpen(open === p.name ? null : p.name)}
              className="w-full p-5 flex items-center justify-between text-left hover:bg-muted/10 transition-colors">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-foreground font-semibold">{p.name}</span>
                  <span className="tag-pill text-[10px]">{p.category}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">{p.desc}</p>
              </div>
              <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${open === p.name ? "rotate-180" : ""}`} />
            </button>
            <AnimatePresence>
              {open === p.name && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                  className="border-t border-border/30">
                  <div className="p-5 space-y-3">
                    <pre className="text-sm font-mono text-neon-emerald bg-muted/20 p-4 rounded-xl overflow-auto">{p.code}</pre>
                    <p className="text-sm text-muted-foreground"><strong className="text-foreground">Use cases:</strong> {p.useCase}</p>
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

export default DesignPatterns;
