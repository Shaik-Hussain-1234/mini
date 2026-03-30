import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { GitBranch, GitCommit } from "lucide-react";

const GitSimulator = () => {
  const [history, setHistory] = useState<{ cmd: string; output: string }[]>([
    { cmd: "", output: "Git Simulator v1.0 — Practice git commands safely!\nInitialized repository: ~/my-project\nType 'help' for commands.\n" },
  ]);
  const [input, setInput] = useState("");
  const [branch, setBranch] = useState("main");
  const [commits, setCommits] = useState<{ hash: string; msg: string; branch: string }[]>([
    { hash: "a1b2c3d", msg: "Initial commit", branch: "main" },
  ]);
  const [staged, setStaged] = useState<string[]>([]);
  const [modified, setModified] = useState<string[]>(["index.html", "style.css", "app.js"]);
  const [branches, setBranches] = useState(["main"]);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [history]);

  const randomHash = () => Math.random().toString(16).substr(2, 7);

  const process = (cmd: string) => {
    const parts = cmd.trim().split(/\s+/);
    if (parts[0] !== "git") return `${parts[0]}: not a git command. Try 'git help'`;
    const sub = parts[1];
    switch (sub) {
      case "help": return "Commands: git status, git add <file>, git commit -m 'msg', git log, git branch, git branch <name>, git checkout <branch>, git merge <branch>, git diff, git stash";
      case "status": return `On branch ${branch}\n${staged.length ? `Changes to be committed:\n${staged.map(f => `  new file: ${f}`).join("\n")}` : ""}${modified.length ? `\nChanges not staged:\n${modified.map(f => `  modified: ${f}`).join("\n")}` : ""}\n${!staged.length && !modified.length ? "nothing to commit, working tree clean" : ""}`;
      case "add":
        if (parts[2] === ".") { setStaged([...staged, ...modified]); setModified([]); return `Added ${modified.length} files to staging`; }
        if (modified.includes(parts[2])) { setStaged([...staged, parts[2]]); setModified(modified.filter(f => f !== parts[2])); return `Added ${parts[2]}`; }
        return `fatal: pathspec '${parts[2]}' did not match any files`;
      case "commit": {
        if (!staged.length) return "nothing to commit";
        const msg = cmd.match(/-m\s+['"](.*?)['"]/)?.[1] || "no message";
        const hash = randomHash();
        setCommits([...commits, { hash, msg, branch }]); setStaged([]);
        return `[${branch} ${hash}] ${msg}\n ${staged.length} files changed`;
      }
      case "log": return commits.filter(c => c.branch === branch).map(c => `commit ${c.hash}\n  ${c.msg}`).reverse().join("\n\n");
      case "branch":
        if (!parts[2]) return branches.map(b => `${b === branch ? "* " : "  "}${b}`).join("\n");
        if (branches.includes(parts[2])) return `fatal: branch '${parts[2]}' already exists`;
        setBranches([...branches, parts[2]]); return `Created branch '${parts[2]}'`;
      case "checkout":
        if (!branches.includes(parts[2])) return `error: pathspec '${parts[2]}' did not match`;
        setBranch(parts[2]); return `Switched to branch '${parts[2]}'`;
      case "merge":
        if (!branches.includes(parts[2])) return `merge: ${parts[2]} - not something we can merge`;
        return `Merge made by the 'ort' strategy.\n Already up to date.`;
      case "diff": return modified.length ? modified.map(f => `diff --git a/${f} b/${f}\n--- a/${f}\n+++ b/${f}\n@@ -1 +1 @@`).join("\n\n") : "No changes";
      case "stash": setModified([]); return "Saved working directory state";
      default: return `git: '${sub}' is not a git command`;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const output = process(input);
    setHistory([...history, { cmd: input, output }]);
    setInput("");
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
      <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
        <GitBranch className="h-6 w-6 text-primary" /> Git Simulator
      </h1>

      <div className="grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 glass-card overflow-hidden" style={{ height: "calc(100vh - 200px)" }}>
          <div className="flex items-center gap-2 px-4 py-2 border-b border-border/30 bg-muted/20">
            <div className="h-3 w-3 rounded-full bg-destructive/60" />
            <div className="h-3 w-3 rounded-full bg-neon-amber/60" />
            <div className="h-3 w-3 rounded-full bg-neon-emerald/60" />
            <span className="text-xs text-muted-foreground ml-2 font-mono">git — branch:{branch}</span>
          </div>
          <div className="p-4 overflow-auto h-full font-mono text-sm pb-20">
            {history.map((h, i) => (
              <div key={i} className="mb-1">
                {h.cmd && <p><span className="text-neon-emerald">~/project</span> <span className="text-neon-blue">({branch})</span>$ {h.cmd}</p>}
                {h.output && <pre className="text-muted-foreground whitespace-pre-wrap">{h.output}</pre>}
              </div>
            ))}
            <form onSubmit={handleSubmit} className="flex">
              <span className="text-neon-emerald">~/project</span>&nbsp;<span className="text-neon-blue">({branch})</span>$&nbsp;
              <input value={input} onChange={e => setInput(e.target.value)} autoFocus className="flex-1 bg-transparent outline-none text-foreground caret-primary" />
            </form>
            <div ref={bottomRef} />
          </div>
        </div>

        <div className="space-y-4">
          <div className="glass-card p-4">
            <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2"><GitCommit className="h-4 w-4 text-primary" /> Commit Graph</h3>
            <div className="space-y-2">
              {commits.slice(-8).reverse().map(c => (
                <div key={c.hash} className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-primary shrink-0" />
                  <div className="h-px flex-1 bg-border/30" />
                  <div className="text-xs">
                    <span className="text-primary font-mono">{c.hash}</span>
                    <span className="text-muted-foreground ml-2">{c.msg}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="glass-card p-4">
            <h3 className="text-sm font-semibold text-foreground mb-2">Branches</h3>
            {branches.map(b => (
              <p key={b} className={`text-xs font-mono py-1 ${b === branch ? "text-primary" : "text-muted-foreground"}`}>
                {b === branch ? "* " : "  "}{b}
              </p>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default GitSimulator;
