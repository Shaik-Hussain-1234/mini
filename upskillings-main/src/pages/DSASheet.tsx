import { useState } from "react";
import { motion } from "framer-motion";
import { ListChecks, CheckCircle, Circle } from "lucide-react";

const topics: { name: string; problems: { title: string; difficulty: string; platform: string }[] }[] = [
  { name: "Arrays", problems: [
    { title: "Two Sum", difficulty: "Easy", platform: "LeetCode" },
    { title: "Best Time to Buy and Sell Stock", difficulty: "Easy", platform: "LeetCode" },
    { title: "Contains Duplicate", difficulty: "Easy", platform: "LeetCode" },
    { title: "Maximum Subarray", difficulty: "Medium", platform: "LeetCode" },
    { title: "Product of Array Except Self", difficulty: "Medium", platform: "LeetCode" },
    { title: "3Sum", difficulty: "Medium", platform: "LeetCode" },
  ]},
  { name: "Strings", problems: [
    { title: "Valid Anagram", difficulty: "Easy", platform: "LeetCode" },
    { title: "Valid Palindrome", difficulty: "Easy", platform: "LeetCode" },
    { title: "Longest Substring Without Repeating", difficulty: "Medium", platform: "LeetCode" },
    { title: "Group Anagrams", difficulty: "Medium", platform: "LeetCode" },
    { title: "Longest Palindromic Substring", difficulty: "Medium", platform: "LeetCode" },
  ]},
  { name: "Linked Lists", problems: [
    { title: "Reverse Linked List", difficulty: "Easy", platform: "LeetCode" },
    { title: "Merge Two Sorted Lists", difficulty: "Easy", platform: "LeetCode" },
    { title: "Linked List Cycle", difficulty: "Easy", platform: "LeetCode" },
    { title: "Remove Nth Node From End", difficulty: "Medium", platform: "LeetCode" },
    { title: "Add Two Numbers", difficulty: "Medium", platform: "LeetCode" },
  ]},
  { name: "Trees", problems: [
    { title: "Maximum Depth of Binary Tree", difficulty: "Easy", platform: "LeetCode" },
    { title: "Invert Binary Tree", difficulty: "Easy", platform: "LeetCode" },
    { title: "Validate BST", difficulty: "Medium", platform: "LeetCode" },
    { title: "Level Order Traversal", difficulty: "Medium", platform: "LeetCode" },
    { title: "Lowest Common Ancestor", difficulty: "Medium", platform: "LeetCode" },
  ]},
  { name: "Dynamic Programming", problems: [
    { title: "Climbing Stairs", difficulty: "Easy", platform: "LeetCode" },
    { title: "Coin Change", difficulty: "Medium", platform: "LeetCode" },
    { title: "Longest Increasing Subsequence", difficulty: "Medium", platform: "LeetCode" },
    { title: "House Robber", difficulty: "Medium", platform: "LeetCode" },
    { title: "Edit Distance", difficulty: "Hard", platform: "LeetCode" },
  ]},
  { name: "Graphs", problems: [
    { title: "Number of Islands", difficulty: "Medium", platform: "LeetCode" },
    { title: "Clone Graph", difficulty: "Medium", platform: "LeetCode" },
    { title: "Course Schedule", difficulty: "Medium", platform: "LeetCode" },
    { title: "Word Ladder", difficulty: "Hard", platform: "LeetCode" },
    { title: "Network Delay Time", difficulty: "Medium", platform: "LeetCode" },
  ]},
];

const DSASheet = () => {
  const [completed, setCompleted] = useState<Set<string>>(new Set());

  const toggle = (key: string) => {
    const next = new Set(completed);
    next.has(key) ? next.delete(key) : next.add(key);
    setCompleted(next);
  };

  const totalProblems = topics.reduce((s, t) => s + t.problems.length, 0);
  const diffColor: Record<string, string> = { Easy: "text-neon-emerald", Medium: "text-neon-amber", Hard: "text-destructive" };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <ListChecks className="h-6 w-6 text-primary" /> DSA Practice Sheet
        </h1>
        <span className="text-sm text-muted-foreground">{completed.size}/{totalProblems} completed</span>
      </div>

      <div className="glass-card p-4">
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <motion.div initial={{ width: 0 }} animate={{ width: `${(completed.size / totalProblems) * 100}%` }}
            className="h-full rounded-full bg-gradient-to-r from-primary to-accent" />
        </div>
      </div>

      <div className="space-y-4">
        {topics.map(topic => (
          <div key={topic.name} className="glass-card p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-foreground">{topic.name}</h3>
              <span className="text-xs text-muted-foreground">
                {topic.problems.filter(p => completed.has(`${topic.name}-${p.title}`)).length}/{topic.problems.length}
              </span>
            </div>
            <div className="space-y-2">
              {topic.problems.map(p => {
                const key = `${topic.name}-${p.title}`;
                const done = completed.has(key);
                return (
                  <button key={key} onClick={() => toggle(key)}
                    className={`w-full flex items-center justify-between p-3 rounded-xl transition-all ${done ? "bg-primary/5 border border-primary/20" : "bg-muted/10 border border-border/20 hover:border-primary/20"}`}>
                    <div className="flex items-center gap-3">
                      {done ? <CheckCircle className="h-4 w-4 text-primary shrink-0" /> : <Circle className="h-4 w-4 text-muted-foreground shrink-0" />}
                      <span className={`text-sm ${done ? "text-primary line-through" : "text-foreground"}`}>{p.title}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-muted-foreground">{p.platform}</span>
                      <span className={`text-xs font-medium ${diffColor[p.difficulty]}`}>{p.difficulty}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default DSASheet;
