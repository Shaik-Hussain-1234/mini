import { useRef, useEffect, useState } from "react";
import { EditorView, basicSetup } from "codemirror";
import { EditorState } from "@codemirror/state";
import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import { java } from "@codemirror/lang-java";
import { cpp } from "@codemirror/lang-cpp";
import { oneDark } from "@codemirror/theme-one-dark";
import { Play, RotateCcw, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LangOption { id: string; label: string; ext: () => any; template: string }

const LANGUAGES: LangOption[] = [
  { id: "python", label: "Python", ext: python, template: "# Write your solution here\n\ndef solution():\n    pass\n" },
  { id: "javascript", label: "JavaScript", ext: () => javascript({ jsx: false }), template: "// Write your solution here\n\nfunction solution() {\n  \n}\n" },
  { id: "java", label: "Java", ext: java, template: "// Write your solution here\n\nclass Solution {\n    public void solve() {\n        \n    }\n}\n" },
  { id: "cpp", label: "C++", ext: cpp, template: "// Write your solution here\n\n#include <iostream>\nusing namespace std;\n\nint main() {\n    \n    return 0;\n}\n" },
];

interface CodeEditorProps {
  onRun?: (code: string, lang: string) => void;
  output?: string;
  isRunning?: boolean;
  defaultCode?: string;
}

const CodeEditor = ({ onRun, output = "", isRunning = false, defaultCode }: CodeEditorProps) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<EditorView | null>(null);
  const [lang, setLang] = useState(LANGUAGES[0]);
  const [showLangMenu, setShowLangMenu] = useState(false);

  useEffect(() => {
    if (!editorRef.current) return;
    const langObj = LANGUAGES.find(l => l.id === lang.id) || LANGUAGES[0];

    const state = EditorState.create({
      doc: defaultCode || langObj.template,
      extensions: [
        basicSetup,
        langObj.ext(),
        oneDark,
        EditorView.theme({
          "&": { height: "280px", fontSize: "13px" },
          ".cm-scroller": { overflow: "auto", fontFamily: "'JetBrains Mono', monospace" },
          ".cm-gutters": { background: "hsl(222 47% 6%)", borderRight: "1px solid hsl(222 30% 16%)" },
        }),
      ],
    });

    const view = new EditorView({ state, parent: editorRef.current });
    viewRef.current = view;

    return () => view.destroy();
  }, [lang.id]);

  const getCode = () => viewRef.current?.state.doc.toString() || "";

  const handleReset = () => {
    if (!viewRef.current) return;
    const langObj = LANGUAGES.find(l => l.id === lang.id) || LANGUAGES[0];
    viewRef.current.dispatch({
      changes: { from: 0, to: viewRef.current.state.doc.length, insert: langObj.template },
    });
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="relative">
          <button
            onClick={() => setShowLangMenu(!showLangMenu)}
            className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border border-border bg-secondary/30 text-foreground hover:border-primary/30 transition-colors"
          >
            {lang.label} <ChevronDown className="h-3 w-3" />
          </button>
          {showLangMenu && (
            <div className="absolute top-full left-0 mt-1 z-10 bg-card border border-border rounded-lg shadow-lg py-1 min-w-[120px]">
              {LANGUAGES.map(l => (
                <button
                  key={l.id}
                  onClick={() => { setLang(l); setShowLangMenu(false); }}
                  className={`w-full text-left px-3 py-1.5 text-xs hover:bg-secondary/50 transition-colors ${l.id === lang.id ? "text-primary" : "text-foreground"}`}
                >
                  {l.label}
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" onClick={handleReset} className="text-xs">
            <RotateCcw className="h-3 w-3 mr-1" /> Reset
          </Button>
          <Button
            variant="neon"
            size="sm"
            onClick={() => onRun?.(getCode(), lang.id)}
            disabled={isRunning}
            className="text-xs"
          >
            <Play className="h-3 w-3 mr-1" /> {isRunning ? "Running..." : "Run Code"}
          </Button>
        </div>
      </div>

      <div ref={editorRef} className="rounded-lg overflow-hidden border border-border/50" />

      {/* Output Console */}
      <div className="bg-background/80 rounded-lg border border-border/50 overflow-hidden">
        <div className="px-3 py-1.5 bg-secondary/30 border-b border-border/50 text-xs text-muted-foreground">
          Output Console
        </div>
        <pre className="p-3 text-xs font-mono text-foreground min-h-[60px] max-h-[120px] overflow-auto whitespace-pre-wrap">
          {output || "Run your code to see output..."}
        </pre>
      </div>
    </div>
  );
};

export default CodeEditor;
