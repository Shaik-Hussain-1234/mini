import { useState } from "react";
import { motion } from "framer-motion";
import { Database, Plus, Trash2, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface Column { name: string; type: string; pk: boolean; nullable: boolean; }
interface Table { name: string; columns: Column[]; }

const typeOptions = ["INTEGER", "VARCHAR(255)", "TEXT", "BOOLEAN", "TIMESTAMP", "UUID", "DECIMAL", "JSONB"];

const DatabaseDesigner = () => {
  const [tables, setTables] = useState<Table[]>([
    { name: "users", columns: [
      { name: "id", type: "UUID", pk: true, nullable: false },
      { name: "email", type: "VARCHAR(255)", pk: false, nullable: false },
      { name: "name", type: "VARCHAR(255)", pk: false, nullable: true },
      { name: "created_at", type: "TIMESTAMP", pk: false, nullable: false },
    ]},
    { name: "posts", columns: [
      { name: "id", type: "UUID", pk: true, nullable: false },
      { name: "user_id", type: "UUID", pk: false, nullable: false },
      { name: "title", type: "VARCHAR(255)", pk: false, nullable: false },
      { name: "content", type: "TEXT", pk: false, nullable: true },
    ]},
  ]);

  const addTable = () => {
    setTables([...tables, { name: `table_${tables.length + 1}`, columns: [{ name: "id", type: "UUID", pk: true, nullable: false }] }]);
  };

  const updateTableName = (i: number, name: string) => {
    const t = [...tables]; t[i].name = name; setTables(t);
  };

  const addColumn = (ti: number) => {
    const t = [...tables];
    t[ti].columns.push({ name: "new_col", type: "VARCHAR(255)", pk: false, nullable: true });
    setTables(t);
  };

  const updateColumn = (ti: number, ci: number, field: keyof Column, value: any) => {
    const t = [...tables]; (t[ti].columns[ci] as any)[field] = value; setTables(t);
  };

  const removeColumn = (ti: number, ci: number) => {
    const t = [...tables]; t[ti].columns.splice(ci, 1); setTables(t);
  };

  const removeTable = (i: number) => setTables(tables.filter((_, j) => j !== i));

  const generateSQL = () => {
    return tables.map(t => {
      const cols = t.columns.map(c => {
        let def = `  ${c.name} ${c.type}`;
        if (c.pk) def += " PRIMARY KEY";
        if (!c.nullable && !c.pk) def += " NOT NULL";
        return def;
      }).join(",\n");
      return `CREATE TABLE ${t.name} (\n${cols}\n);`;
    }).join("\n\n");
  };

  const copySQL = () => { navigator.clipboard.writeText(generateSQL()); toast.success("SQL copied!"); };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <Database className="h-6 w-6 text-primary" /> Database Designer
        </h1>
        <div className="flex gap-2">
          <Button variant="neon-outline" size="sm" onClick={copySQL}><Copy className="h-4 w-4 mr-1" /> Copy SQL</Button>
          <Button variant="neon" size="sm" onClick={addTable}><Plus className="h-4 w-4 mr-1" /> Add Table</Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          {tables.map((table, ti) => (
            <div key={ti} className="glass-card p-5">
              <div className="flex items-center gap-2 mb-4">
                <Input value={table.name} onChange={e => updateTableName(ti, e.target.value)}
                  className="bg-muted/30 border-border/40 font-mono text-sm text-primary font-bold w-auto" />
                <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => removeTable(ti)}>
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>

              <div className="space-y-2">
                {table.columns.map((col, ci) => (
                  <div key={ci} className="flex items-center gap-2">
                    <Input value={col.name} onChange={e => updateColumn(ti, ci, "name", e.target.value)}
                      className="bg-muted/20 border-border/30 text-xs font-mono flex-1" />
                    <select value={col.type} onChange={e => updateColumn(ti, ci, "type", e.target.value)}
                      className="bg-muted/20 border border-border/30 rounded-lg text-xs px-2 py-1.5 text-foreground">
                      {typeOptions.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                    <label className="flex items-center gap-1 text-xs text-muted-foreground">
                      <input type="checkbox" checked={col.pk} onChange={e => updateColumn(ti, ci, "pk", e.target.checked)} className="accent-primary" /> PK
                    </label>
                    <button onClick={() => removeColumn(ti, ci)} className="text-muted-foreground hover:text-destructive">
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
              <Button variant="ghost" size="sm" className="mt-2 text-xs text-muted-foreground" onClick={() => addColumn(ti)}>
                <Plus className="h-3 w-3 mr-1" /> Add Column
              </Button>
            </div>
          ))}
        </div>

        <div className="glass-card p-5 sticky top-20">
          <h3 className="text-sm font-semibold text-foreground mb-3">Generated SQL</h3>
          <pre className="text-xs font-mono text-neon-emerald overflow-auto whitespace-pre max-h-[60vh]">{generateSQL()}</pre>
        </div>
      </div>
    </motion.div>
  );
};

export default DatabaseDesigner;
