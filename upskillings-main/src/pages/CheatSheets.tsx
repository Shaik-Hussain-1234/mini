import { useState } from "react";
import { motion } from "framer-motion";
import { FileCode, Copy } from "lucide-react";
import { toast } from "sonner";

const sheets: Record<string, { title: string; items: { cmd: string; desc: string }[] }[]> = {
  "Git": [
    { title: "Basics", items: [
      { cmd: "git init", desc: "Initialize repository" },
      { cmd: "git clone <url>", desc: "Clone repository" },
      { cmd: "git add .", desc: "Stage all changes" },
      { cmd: "git commit -m 'msg'", desc: "Commit with message" },
      { cmd: "git push origin main", desc: "Push to remote" },
      { cmd: "git pull", desc: "Pull latest changes" },
    ]},
    { title: "Branching", items: [
      { cmd: "git branch <name>", desc: "Create branch" },
      { cmd: "git checkout -b <name>", desc: "Create & switch" },
      { cmd: "git merge <branch>", desc: "Merge branch" },
      { cmd: "git rebase main", desc: "Rebase on main" },
      { cmd: "git branch -d <name>", desc: "Delete branch" },
    ]},
  ],
  "Docker": [
    { title: "Containers", items: [
      { cmd: "docker run -it <img>", desc: "Run interactive" },
      { cmd: "docker ps", desc: "List running containers" },
      { cmd: "docker stop <id>", desc: "Stop container" },
      { cmd: "docker rm <id>", desc: "Remove container" },
      { cmd: "docker logs <id>", desc: "View logs" },
    ]},
    { title: "Images", items: [
      { cmd: "docker build -t <name> .", desc: "Build image" },
      { cmd: "docker images", desc: "List images" },
      { cmd: "docker push <name>", desc: "Push to registry" },
      { cmd: "docker pull <name>", desc: "Pull from registry" },
    ]},
  ],
  "Linux": [
    { title: "Files", items: [
      { cmd: "ls -la", desc: "List all files" },
      { cmd: "cd /path", desc: "Change directory" },
      { cmd: "cp -r src dest", desc: "Copy recursively" },
      { cmd: "rm -rf dir", desc: "Remove directory" },
      { cmd: "chmod 755 file", desc: "Change permissions" },
      { cmd: "find . -name '*.js'", desc: "Find files" },
    ]},
    { title: "Process", items: [
      { cmd: "ps aux", desc: "List processes" },
      { cmd: "kill -9 <pid>", desc: "Force kill" },
      { cmd: "top", desc: "Monitor processes" },
      { cmd: "nohup cmd &", desc: "Run in background" },
    ]},
  ],
  "SQL": [
    { title: "Queries", items: [
      { cmd: "SELECT * FROM t WHERE c=v", desc: "Select with filter" },
      { cmd: "INSERT INTO t (c) VALUES (v)", desc: "Insert row" },
      { cmd: "UPDATE t SET c=v WHERE id=1", desc: "Update row" },
      { cmd: "DELETE FROM t WHERE id=1", desc: "Delete row" },
      { cmd: "JOIN t2 ON t.id = t2.fk", desc: "Join tables" },
      { cmd: "GROUP BY c HAVING COUNT(*)>1", desc: "Group & filter" },
    ]},
  ],
};

const CheatSheets = () => {
  const [active, setActive] = useState<keyof typeof sheets>("Git");

  const copy = (cmd: string) => { navigator.clipboard.writeText(cmd); toast.success("Copied!"); };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
        <FileCode className="h-6 w-6 text-primary" /> Cheat Sheets
      </h1>

      <div className="flex gap-2">
        {(Object.keys(sheets) as (keyof typeof sheets)[]).map(s => (
          <button key={s} onClick={() => setActive(s)} className={`tag-pill ${active === s ? "border-primary/60 bg-primary/20" : ""}`}>{s}</button>
        ))}
      </div>

      <div className="space-y-6">
        {sheets[active].map(section => (
          <div key={section.title} className="glass-card p-5">
            <h3 className="text-sm font-semibold text-foreground mb-4">{section.title}</h3>
            <div className="space-y-2">
              {section.items.map(item => (
                <div key={item.cmd} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/20 group transition-colors">
                  <code className="text-xs font-mono text-primary bg-primary/5 px-2 py-1 rounded flex-1">{item.cmd}</code>
                  <span className="text-xs text-muted-foreground hidden md:block">{item.desc}</span>
                  <button onClick={() => copy(item.cmd)} className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-primary">
                    <Copy className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default CheatSheets;
