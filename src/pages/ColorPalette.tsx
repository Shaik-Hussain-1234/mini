import { useState } from "react";
import { motion } from "framer-motion";
import { Palette, Copy, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const generatePalette = (): string[] => {
  const hue = Math.random() * 360;
  return Array.from({ length: 5 }, (_, i) => {
    const h = (hue + i * 30 + Math.random() * 20) % 360;
    const s = 60 + Math.random() * 30;
    const l = 35 + Math.random() * 35;
    return `hsl(${Math.round(h)}, ${Math.round(s)}%, ${Math.round(l)}%)`;
  });
};

const hslToHex = (hsl: string): string => {
  const m = hsl.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/);
  if (!m) return "#000000";
  let [h, s, l] = [+m[1], +m[2] / 100, +m[3] / 100];
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => { const k = (n + h / 30) % 12; return Math.round((l - a * Math.max(-1, Math.min(k - 3, 9 - k, 1))) * 255); };
  return `#${[f(0), f(8), f(4)].map(x => x.toString(16).padStart(2, "0")).join("")}`;
};

const ColorPalette = () => {
  const [palettes, setPalettes] = useState<string[][]>([generatePalette(), generatePalette(), generatePalette()]);

  const regenerate = () => setPalettes([generatePalette(), generatePalette(), generatePalette()]);

  const copy = (color: string) => {
    navigator.clipboard.writeText(hslToHex(color));
    toast.success(`Copied ${hslToHex(color)}`);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <Palette className="h-6 w-6 text-primary" /> Color Palette Generator
        </h1>
        <Button variant="neon" size="sm" onClick={regenerate}><RefreshCw className="h-4 w-4 mr-1" /> Generate</Button>
      </div>

      <div className="space-y-6">
        {palettes.map((palette, pi) => (
          <div key={pi} className="glass-card p-5">
            <div className="flex rounded-xl overflow-hidden h-32 mb-4">
              {palette.map((color, ci) => (
                <button key={ci} onClick={() => copy(color)} className="flex-1 hover:flex-[1.5] transition-all duration-500 relative group"
                  style={{ backgroundColor: color }}>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30">
                    <Copy className="h-4 w-4 text-white" />
                  </div>
                </button>
              ))}
            </div>
            <div className="flex gap-3">
              {palette.map((color, ci) => (
                <div key={ci} className="flex-1 text-center">
                  <div className="h-4 w-4 rounded-full mx-auto mb-1" style={{ backgroundColor: color }} />
                  <p className="text-xs font-mono text-muted-foreground">{hslToHex(color)}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default ColorPalette;
