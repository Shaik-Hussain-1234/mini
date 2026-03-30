import { useState } from "react";
import { motion } from "framer-motion";
import { Database, Play, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const sampleTables = {
  users: { columns: ["id", "name", "email", "age", "city"], rows: [
    [1, "Alice", "alice@example.com", 28, "NYC"],
    [2, "Bob", "bob@example.com", 34, "SF"],
    [3, "Charlie", "charlie@example.com", 22, "LA"],
    [4, "Diana", "diana@example.com", 30, "Chicago"],
    [5, "Eve", "eve@example.com", 26, "Boston"],
  ]},
  orders: { columns: ["id", "user_id", "product", "amount", "date"], rows: [
    [1, 1, "Laptop", 999, "2026-01-15"],
    [2, 2, "Phone", 699, "2026-02-01"],
    [3, 1, "Mouse", 29, "2026-02-10"],
    [4, 3, "Keyboard", 79, "2026-03-01"],
    [5, 5, "Monitor", 449, "2026-03-05"],
  ]},
};

const examples = [
  "SELECT * FROM users",
  "SELECT name, age FROM users WHERE age > 25",
  "SELECT * FROM orders WHERE amount > 100",
  "SELECT name, city FROM users ORDER BY age",
];

const SQLPlayground = () => {
  const [query, setQuery] = useState("SELECT * FROM users WHERE age > 25");
  const [result, setResult] = useState<{ columns: string[]; rows: any[][] } | null>(null);
  const [error, setError] = useState("");

  const executeQuery = () => {
    setError("");
    const q = query.trim().toLowerCase();
    const selectMatch = q.match(/^select\s+(.+?)\s+from\s+(\w+)(?:\s+where\s+(.+?))?(?:\s+order\s+by\s+(\w+))?(?:\s+limit\s+(\d+))?$/i);
    if (!selectMatch) { setError("Only SELECT queries supported in playground"); return; }

    const [, cols, table, where, orderBy, limit] = selectMatch;
    const tbl = sampleTables[table as keyof typeof sampleTables];
    if (!tbl) { setError(`Table "${table}" not found`); return; }

    let filteredRows = [...tbl.rows];
    if (where) {
      const condMatch = where.match(/(\w+)\s*(>|<|=|>=|<=|!=)\s*(.+)/);
      if (condMatch) {
        const [, col, op, val] = condMatch;
        const ci = tbl.columns.indexOf(col);
        if (ci >= 0) {
          const v = isNaN(Number(val)) ? val.replace(/['"]/g, "") : Number(val);
          filteredRows = filteredRows.filter(row => {
            if (op === ">") return row[ci] > v;
            if (op === "<") return row[ci] < v;
            if (op === "=") return row[ci] == v;
            if (op === ">=") return row[ci] >= v;
            if (op === "<=") return row[ci] <= v;
            if (op === "!=") return row[ci] != v;
            return true;
          });
        }
      }
    }

    if (orderBy) {
      const oi = tbl.columns.indexOf(orderBy);
      if (oi >= 0) filteredRows.sort((a, b) => (a[oi] > b[oi] ? 1 : -1));
    }

    if (limit) filteredRows = filteredRows.slice(0, Number(limit));

    let selectedCols = tbl.columns;
    let selectedRows = filteredRows;
    if (cols.trim() !== "*") {
      const colNames = cols.split(",").map(c => c.trim());
      const indices = colNames.map(c => tbl.columns.indexOf(c)).filter(i => i >= 0);
      selectedCols = indices.map(i => tbl.columns[i]);
      selectedRows = filteredRows.map(r => indices.map(i => r[i]));
    }

    setResult({ columns: selectedCols, rows: selectedRows });
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
        <Database className="h-6 w-6 text-primary" /> SQL Playground
      </h1>

      <div className="flex gap-2 flex-wrap">
        {examples.map((e, i) => (
          <button key={i} onClick={() => setQuery(e)} className="tag-pill text-xs">{e.slice(0, 35)}...</button>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 space-y-4">
          <div className="glass-card p-4">
            <textarea value={query} onChange={e => setQuery(e.target.value)} rows={4}
              className="w-full bg-transparent text-sm font-mono text-foreground resize-none focus:outline-none" placeholder="Write SQL here..." />
            <div className="flex gap-2 mt-3">
              <Button variant="neon" size="sm" onClick={executeQuery}><Play className="h-4 w-4 mr-1" /> Run</Button>
              <Button variant="neon-outline" size="sm" onClick={() => { setQuery(""); setResult(null); }}><Trash2 className="h-4 w-4 mr-1" /> Clear</Button>
            </div>
          </div>

          {error && <div className="glass-card p-4 border-destructive/30 text-destructive text-sm">{error}</div>}

          {result && (
            <div className="glass-card p-4 overflow-auto">
              <p className="text-xs text-muted-foreground mb-3">{result.rows.length} rows returned</p>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border/40">
                    {result.columns.map(c => <th key={c} className="px-3 py-2 text-left text-primary font-mono text-xs">{c}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {result.rows.map((row, i) => (
                    <tr key={i} className="border-b border-border/20 hover:bg-muted/20">
                      {row.map((cell, j) => <td key={j} className="px-3 py-2 text-foreground font-mono text-xs">{String(cell)}</td>)}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="glass-card p-4 space-y-4">
          <h3 className="text-sm font-semibold text-foreground">Tables</h3>
          {Object.entries(sampleTables).map(([name, tbl]) => (
            <div key={name} className="p-3 rounded-xl bg-muted/20 border border-border/30">
              <p className="text-sm font-mono text-primary mb-2">{name}</p>
              <div className="space-y-1">
                {tbl.columns.map(c => (
                  <p key={c} className="text-xs text-muted-foreground font-mono">• {c}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default SQLPlayground;
