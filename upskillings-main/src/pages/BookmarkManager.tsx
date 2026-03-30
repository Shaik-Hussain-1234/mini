import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bookmark, Plus, Trash2, ExternalLink, Search, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface BookmarkItem { id: string; title: string; url: string; tags: string[]; createdAt: string; }

const defaultBookmarks: BookmarkItem[] = [
  { id: "1", title: "React Documentation", url: "https://react.dev", tags: ["react", "docs"], createdAt: "2026-03-01" },
  { id: "2", title: "TypeScript Handbook", url: "https://typescriptlang.org/docs", tags: ["typescript", "docs"], createdAt: "2026-03-02" },
  { id: "3", title: "MDN Web Docs", url: "https://developer.mozilla.org", tags: ["web", "reference"], createdAt: "2026-03-03" },
  { id: "4", title: "Tailwind CSS", url: "https://tailwindcss.com", tags: ["css", "styling"], createdAt: "2026-03-04" },
  { id: "5", title: "GitHub", url: "https://github.com", tags: ["git", "tools"], createdAt: "2026-03-05" },
];

const BookmarkManager = () => {
  const [bookmarks, setBookmarks] = useState<BookmarkItem[]>(defaultBookmarks);
  const [search, setSearch] = useState("");
  const [tagFilter, setTagFilter] = useState<string | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [newTags, setNewTags] = useState("");

  const allTags = [...new Set(bookmarks.flatMap(b => b.tags))];

  const filtered = bookmarks.filter(b => {
    if (search && !b.title.toLowerCase().includes(search.toLowerCase())) return false;
    if (tagFilter && !b.tags.includes(tagFilter)) return false;
    return true;
  });

  const addBookmark = () => {
    if (!newTitle || !newUrl) return;
    setBookmarks([...bookmarks, {
      id: Date.now().toString(), title: newTitle, url: newUrl,
      tags: newTags.split(",").map(t => t.trim()).filter(Boolean),
      createdAt: new Date().toISOString().split("T")[0],
    }]);
    setNewTitle(""); setNewUrl(""); setNewTags(""); setShowAdd(false);
  };

  const removeBookmark = (id: string) => setBookmarks(bookmarks.filter(b => b.id !== id));

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <Bookmark className="h-6 w-6 text-primary" /> Bookmarks
        </h1>
        <Button variant="neon" size="sm" onClick={() => setShowAdd(!showAdd)}>
          <Plus className="h-4 w-4 mr-1" /> Add
        </Button>
      </div>

      <AnimatePresence>
        {showAdd && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            className="glass-card p-5 space-y-3 overflow-hidden">
            <Input value={newTitle} onChange={e => setNewTitle(e.target.value)} placeholder="Title" className="bg-muted/30 border-border/40" />
            <Input value={newUrl} onChange={e => setNewUrl(e.target.value)} placeholder="URL" className="bg-muted/30 border-border/40" />
            <Input value={newTags} onChange={e => setNewTags(e.target.value)} placeholder="Tags (comma separated)" className="bg-muted/30 border-border/40" />
            <Button variant="neon" size="sm" onClick={addBookmark}>Save</Button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex gap-3 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search bookmarks..."
            className="pl-10 bg-muted/30 border-border/40" />
        </div>
      </div>

      <div className="flex gap-1 flex-wrap">
        <button onClick={() => setTagFilter(null)} className={`tag-pill text-xs ${!tagFilter ? "border-primary/60 bg-primary/20" : ""}`}>All</button>
        {allTags.map(t => (
          <button key={t} onClick={() => setTagFilter(tagFilter === t ? null : t)}
            className={`tag-pill text-xs ${tagFilter === t ? "border-primary/60 bg-primary/20" : ""}`}>
            <Tag className="h-2.5 w-2.5 mr-1" />{t}
          </button>
        ))}
      </div>

      <div className="space-y-2">
        {filtered.map(b => (
          <motion.div key={b.id} layout className="glass-card p-4 flex items-center justify-between group hover:border-primary/20 transition-all">
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-medium text-foreground truncate">{b.title}</h3>
              <p className="text-xs text-muted-foreground truncate">{b.url}</p>
              <div className="flex gap-1 mt-1">
                {b.tags.map(t => <span key={t} className="text-[10px] px-1.5 py-0.5 rounded bg-muted/30 text-muted-foreground">{t}</span>)}
              </div>
            </div>
            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <a href={b.url} target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="icon" className="h-7 w-7"><ExternalLink className="h-3 w-3" /></Button>
              </a>
              <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => removeBookmark(b.id)}>
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default BookmarkManager;
