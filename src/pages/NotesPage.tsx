import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { StickyNote, Plus, Trash2, Search, Edit3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ReactMarkdown from "react-markdown";

interface Note { id: string; title: string; content: string; color: string; updatedAt: string; }

const colors = ["border-primary/30", "border-neon-purple/30", "border-neon-pink/30", "border-neon-amber/30", "border-neon-emerald/30"];

const defaultNotes: Note[] = [
  { id: "1", title: "React Hooks", content: "- useState for state\n- useEffect for side effects\n- useCallback for memoized callbacks\n- useMemo for memoized values", color: colors[0], updatedAt: "2026-03-08" },
  { id: "2", title: "Git Commands", content: "```\ngit rebase -i HEAD~3\ngit stash pop\ngit cherry-pick <hash>\n```", color: colors[1], updatedAt: "2026-03-07" },
  { id: "3", title: "System Design Tips", content: "1. Start with requirements\n2. Define API\n3. Design data model\n4. High-level architecture\n5. Deep dive into components", color: colors[2], updatedAt: "2026-03-06" },
];

const NotesPage = () => {
  const [notes, setNotes] = useState<Note[]>(defaultNotes);
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");

  const filtered = notes.filter(n => n.title.toLowerCase().includes(search.toLowerCase()) || n.content.toLowerCase().includes(search.toLowerCase()));

  const addNote = () => {
    const note: Note = { id: Date.now().toString(), title: "New Note", content: "Start writing...", color: colors[Math.floor(Math.random() * colors.length)], updatedAt: new Date().toISOString().split("T")[0] };
    setNotes([note, ...notes]);
    setEditing(note.id); setEditTitle(note.title); setEditContent(note.content);
  };

  const saveNote = () => {
    setNotes(notes.map(n => n.id === editing ? { ...n, title: editTitle, content: editContent, updatedAt: new Date().toISOString().split("T")[0] } : n));
    setEditing(null);
  };

  const deleteNote = (id: string) => { setNotes(notes.filter(n => n.id !== id)); if (editing === id) setEditing(null); };

  const startEdit = (n: Note) => { setEditing(n.id); setEditTitle(n.title); setEditContent(n.content); };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <StickyNote className="h-6 w-6 text-primary" /> Notes
        </h1>
        <Button variant="neon" size="sm" onClick={addNote}><Plus className="h-4 w-4 mr-1" /> New</Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search notes..." className="pl-10 bg-muted/30 border-border/40" />
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(n => (
          <motion.div key={n.id} layout className={`glass-card p-5 ${n.color} group`}>
            {editing === n.id ? (
              <div className="space-y-3">
                <Input value={editTitle} onChange={e => setEditTitle(e.target.value)} className="bg-muted/30 border-border/40 text-sm font-semibold" />
                <textarea value={editContent} onChange={e => setEditContent(e.target.value)} rows={6}
                  className="w-full bg-muted/20 border border-border/40 rounded-xl p-3 text-sm text-foreground font-mono resize-none focus:outline-none" />
                <div className="flex gap-2">
                  <Button variant="neon" size="sm" onClick={saveNote}>Save</Button>
                  <Button variant="neon-outline" size="sm" onClick={() => setEditing(null)}>Cancel</Button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-sm font-semibold text-foreground">{n.title}</h3>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => startEdit(n)} className="text-muted-foreground hover:text-primary"><Edit3 className="h-3 w-3" /></button>
                    <button onClick={() => deleteNote(n.id)} className="text-muted-foreground hover:text-destructive"><Trash2 className="h-3 w-3" /></button>
                  </div>
                </div>
                <div className="text-xs text-muted-foreground prose prose-invert prose-xs max-w-none line-clamp-6">
                  <ReactMarkdown>{n.content}</ReactMarkdown>
                </div>
                <p className="text-[10px] text-muted-foreground/50 mt-3">{n.updatedAt}</p>
              </>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default NotesPage;
