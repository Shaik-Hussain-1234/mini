import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Terminal } from "lucide-react";

const fileSystem: Record<string, string[]> = {
  "/": ["home", "var", "etc", "usr", "tmp"],
  "/home": ["user"],
  "/home/user": ["projects", "documents", "notes.txt"],
  "/home/user/projects": ["react-app", "python-api", "portfolio"],
  "/var": ["log", "tmp"],
  "/etc": ["nginx", "hosts"],
  "/usr": ["bin", "local"],
  "/tmp": [],
};

const fileContents: Record<string, string> = {
  "/home/user/notes.txt": "Remember to study Data Structures!\nAlso review System Design concepts.",
  "/etc/hosts": "127.0.0.1 localhost\n::1 localhost",
};

const LinuxTerminal = () => {
  const [history, setHistory] = useState<{ cmd: string; output: string }[]>([
    { cmd: "", output: "Welcome to SkillNav Linux Terminal Simulator v1.0\nType 'help' for available commands.\n" },
  ]);
  const [input, setInput] = useState("");
  const [cwd, setCwd] = useState("/home/user");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [history]);

  const processCmd = (cmd: string) => {
    const parts = cmd.trim().split(/\s+/);
    const command = parts[0];
    const arg = parts.slice(1).join(" ");

    switch (command) {
      case "help":
        return "Available commands:\n  ls      - list directory\n  cd      - change directory\n  pwd     - print working directory\n  cat     - view file\n  echo    - print text\n  whoami  - show user\n  date    - show date\n  clear   - clear screen\n  mkdir   - create directory (simulated)\n  touch   - create file (simulated)\n  history - show command history";
      case "ls":
        return (fileSystem[cwd] || []).join("  ") || "(empty)";
      case "pwd":
        return cwd;
      case "cd":
        if (!arg || arg === "~") { setCwd("/home/user"); return ""; }
        if (arg === "..") { const parent = cwd.split("/").slice(0, -1).join("/") || "/"; setCwd(parent); return ""; }
        const newPath = arg.startsWith("/") ? arg : `${cwd}/${arg}`.replace("//", "/");
        if (fileSystem[newPath]) { setCwd(newPath); return ""; }
        return `cd: ${arg}: No such directory`;
      case "cat":
        const filePath = arg.startsWith("/") ? arg : `${cwd}/${arg}`;
        return fileContents[filePath] || `cat: ${arg}: No such file`;
      case "echo":
        return arg;
      case "whoami":
        return "developer";
      case "date":
        return new Date().toString();
      case "clear":
        setHistory([]); return "";
      case "mkdir":
        return `mkdir: created directory '${arg}'`;
      case "touch":
        return `touch: created file '${arg}'`;
      case "history":
        return history.map((h, i) => `  ${i}  ${h.cmd}`).filter(l => l.trim().length > 4).join("\n");
      default:
        return command ? `${command}: command not found` : "";
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const output = processCmd(input);
    if (input.trim() !== "clear") setHistory(prev => [...prev, { cmd: input, output }]);
    setInput("");
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
      <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
        <Terminal className="h-6 w-6 text-primary" /> Linux Terminal
      </h1>

      <div className="glass-card overflow-hidden" style={{ height: "calc(100vh - 200px)" }}>
        <div className="flex items-center gap-2 px-4 py-2 border-b border-border/30 bg-muted/20">
          <div className="h-3 w-3 rounded-full bg-destructive/60" />
          <div className="h-3 w-3 rounded-full bg-neon-amber/60" />
          <div className="h-3 w-3 rounded-full bg-neon-emerald/60" />
          <span className="text-xs text-muted-foreground ml-2 font-mono">terminal — {cwd}</span>
        </div>
        <div className="p-4 overflow-auto h-full font-mono text-sm pb-20">
          {history.map((h, i) => (
            <div key={i} className="mb-1">
              {h.cmd && <p><span className="text-neon-emerald">dev@skillnav</span>:<span className="text-neon-blue">{cwd}</span>$ {h.cmd}</p>}
              {h.output && <pre className="text-muted-foreground whitespace-pre-wrap">{h.output}</pre>}
            </div>
          ))}
          <form onSubmit={handleSubmit} className="flex items-center">
            <span className="text-neon-emerald">dev@skillnav</span>:<span className="text-neon-blue">{cwd}</span>$&nbsp;
            <input value={input} onChange={e => setInput(e.target.value)} autoFocus
              className="flex-1 bg-transparent outline-none text-foreground caret-primary" />
          </form>
          <div ref={bottomRef} />
        </div>
      </div>
    </motion.div>
  );
};

export default LinuxTerminal;
