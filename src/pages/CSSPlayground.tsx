import { useState } from "react";
import { motion } from "framer-motion";
import { Paintbrush, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

const presets = [
  { name: "Glassmorphism", css: "background: rgba(255,255,255,0.05);\nborder: 1px solid rgba(255,255,255,0.1);\nbackdrop-filter: blur(20px);\nborder-radius: 16px;\npadding: 32px;\ncolor: white;\ntext-align: center;\nfont-size: 18px;" },
  { name: "Neon Glow", css: "background: #0a0a0a;\nborder: 2px solid #00ff88;\nborder-radius: 12px;\npadding: 32px;\ncolor: #00ff88;\ntext-align: center;\nfont-size: 18px;\nbox-shadow: 0 0 20px #00ff8844, 0 0 40px #00ff8822;" },
  { name: "Gradient Card", css: "background: linear-gradient(135deg, #667eea, #764ba2);\nborder-radius: 20px;\npadding: 32px;\ncolor: white;\ntext-align: center;\nfont-size: 18px;\nbox-shadow: 0 20px 60px rgba(102,126,234,0.4);" },
  { name: "Neumorphism", css: "background: #e0e5ec;\nborder-radius: 20px;\npadding: 32px;\ncolor: #333;\ntext-align: center;\nfont-size: 18px;\nbox-shadow: 9px 9px 16px #c8ccd0, -9px -9px 16px #ffffff;" },
];

const CSSPlayground = () => {
  const [css, setCss] = useState(presets[0].css);
  const [html, setHtml] = useState("Hello, CSS! ✨");

  const parseCSS = (str: string) => {
    const style: Record<string, string> = {};
    str.split("\n").forEach(line => {
      const [key, ...vals] = line.split(":");
      if (key && vals.length) {
        const camelKey = key.trim().replace(/-([a-z])/g, (_, c) => c.toUpperCase()).replace(";", "");
        style[camelKey] = vals.join(":").trim().replace(";", "");
      }
    });
    return style;
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
        <Paintbrush className="h-6 w-6 text-primary" /> CSS Playground
      </h1>

      <div className="flex gap-2 flex-wrap">
        {presets.map(p => (
          <button key={p.name} onClick={() => setCss(p.css)} className="tag-pill">{p.name}</button>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="glass-card p-4">
            <p className="text-xs text-muted-foreground mb-2">HTML Content</p>
            <input value={html} onChange={e => setHtml(e.target.value)}
              className="w-full bg-muted/20 border border-border/40 rounded-xl p-3 text-sm font-mono text-foreground focus:outline-none" />
          </div>
          <div className="glass-card p-4">
            <p className="text-xs text-muted-foreground mb-2">CSS</p>
            <textarea value={css} onChange={e => setCss(e.target.value)} rows={12}
              className="w-full bg-transparent text-sm font-mono text-neon-emerald resize-none focus:outline-none" />
          </div>
        </div>

        <div className="glass-card p-6">
          <p className="text-xs text-muted-foreground mb-4">Preview</p>
          <div className="flex items-center justify-center min-h-[300px] rounded-xl bg-muted/10 p-8">
            <div style={parseCSS(css)}>{html}</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CSSPlayground;
