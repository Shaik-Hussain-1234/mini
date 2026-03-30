import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, ChevronLeft, ChevronRight, Shuffle, Layers, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const decks = {
  "Arrays & Strings": [
    { q: "Two Sum — Find two numbers that add up to target", a: "Use a HashMap to store complement (target - num). For each num, check if complement exists. O(n) time, O(n) space." },
    { q: "Best Time to Buy and Sell Stock", a: "Track min price so far. At each price, calculate profit = price - minPrice. Update maxProfit. O(n) time, O(1) space." },
    { q: "Container With Most Water", a: "Two pointers at start/end. Area = min(h[l], h[r]) × (r-l). Move the shorter pointer inward. O(n)." },
    { q: "3Sum — Find all triplets that sum to zero", a: "Sort array. Fix one element, use two pointers for the rest. Skip duplicates. O(n²) time." },
    { q: "Longest Substring Without Repeating Characters", a: "Sliding window with a HashSet. Expand right, shrink left when duplicate found. O(n)." },
    { q: "Product of Array Except Self", a: "Two passes: left products then right products. Multiply them together. O(n) time, O(1) extra space." },
    { q: "Trapping Rain Water", a: "Two pointers or stack. Water at i = min(maxLeft, maxRight) - height[i]. O(n) time." },
  ],
  "Linked Lists": [
    { q: "Reverse a Linked List", a: "Iterate with prev, curr, next pointers. Set curr.next = prev, advance all. O(n) time, O(1) space." },
    { q: "Detect Cycle in Linked List", a: "Floyd's Tortoise & Hare: slow moves 1 step, fast moves 2. If they meet, cycle exists. O(n)." },
    { q: "Merge Two Sorted Lists", a: "Compare heads, pick smaller, advance that pointer. Recursively or iteratively. O(n+m)." },
    { q: "Remove Nth Node From End", a: "Two pointers: advance fast N steps, then move both. When fast reaches end, slow is at target. O(n)." },
    { q: "Find Middle of Linked List", a: "Slow and fast pointers. When fast reaches end, slow is at middle. O(n) time, O(1) space." },
    { q: "LRU Cache Implementation", a: "HashMap + Doubly Linked List. HashMap for O(1) lookup, DLL for O(1) insert/remove. O(1) per operation." },
  ],
  "Trees & Graphs": [
    { q: "Inorder Traversal of Binary Tree", a: "Left → Root → Right. Recursive or use a stack iteratively. Gives sorted order for BST. O(n)." },
    { q: "Maximum Depth of Binary Tree", a: "Recursion: return 1 + max(depth(left), depth(right)). Base: null → 0. O(n)." },
    { q: "Validate Binary Search Tree", a: "Recursion with min/max bounds. Left < root < right at every node. O(n)." },
    { q: "Level Order Traversal (BFS)", a: "Use a queue. Process level by level, enqueue children. O(n) time, O(w) space where w = max width." },
    { q: "Lowest Common Ancestor", a: "If root matches p or q, return root. Recurse left & right. If both non-null, root is LCA. O(n)." },
    { q: "Number of Islands (Graph BFS/DFS)", a: "Iterate grid. On finding '1', BFS/DFS to mark all connected '1's as visited. Count components. O(m×n)." },
    { q: "Course Schedule (Topological Sort)", a: "Build adjacency list + indegree array. BFS with queue of 0-indegree nodes. If all processed, no cycle." },
  ],
  "Dynamic Programming": [
    { q: "Climbing Stairs — N ways to reach top", a: "dp[i] = dp[i-1] + dp[i-2]. Like Fibonacci. O(n) time, O(1) space with two variables." },
    { q: "Longest Common Subsequence", a: "2D DP: if chars match, dp[i][j] = dp[i-1][j-1]+1. Else max(dp[i-1][j], dp[i][j-1]). O(m×n)." },
    { q: "0/1 Knapsack Problem", a: "dp[i][w] = max(dp[i-1][w], val[i] + dp[i-1][w-wt[i]]). Can optimize to 1D. O(n×W)." },
    { q: "Coin Change — Minimum coins for amount", a: "dp[i] = min(dp[i], dp[i-coin]+1) for each coin. Init dp[0]=0, rest=Infinity. O(n×amount)." },
    { q: "Longest Increasing Subsequence", a: "O(n²): dp[i] = max(dp[j]+1) for j<i where nums[j]<nums[i]. O(n log n) with patience sorting." },
    { q: "Edit Distance (Levenshtein)", a: "dp[i][j] = min(insert, delete, replace). If chars match, dp[i-1][j-1]. O(m×n)." },
    { q: "House Robber", a: "dp[i] = max(dp[i-1], dp[i-2] + nums[i]). Can't rob adjacent houses. O(n) time, O(1) space." },
  ],
  "Sorting & Searching": [
    { q: "Binary Search — Find target in sorted array", a: "lo=0, hi=n-1. mid=(lo+hi)/2. If nums[mid]==target return. If less, lo=mid+1, else hi=mid-1. O(log n)." },
    { q: "Merge Sort Algorithm", a: "Divide array in half, recursively sort, merge two sorted halves. O(n log n) time, O(n) space. Stable." },
    { q: "Quick Sort Algorithm", a: "Pick pivot, partition around it (smaller left, larger right), recurse. O(n log n) avg, O(n²) worst." },
    { q: "Search in Rotated Sorted Array", a: "Binary search: determine which half is sorted, check if target is in that range. O(log n)." },
    { q: "Find Kth Largest Element", a: "QuickSelect: partition, recurse on correct half. O(n) average. Or use min-heap of size K → O(n log k)." },
    { q: "Median of Two Sorted Arrays", a: "Binary search on smaller array. Partition both so left halves ≤ right halves. O(log(min(m,n)))." },
  ],
  "Stacks & Queues": [
    { q: "Valid Parentheses", a: "Push opening brackets on stack. For closing, check if top matches. Stack empty at end → valid. O(n)." },
    { q: "Min Stack — Get minimum in O(1)", a: "Use two stacks: one for values, one for minimums. Push min(val, currentMin) on min stack. All ops O(1)." },
    { q: "Daily Temperatures — Days until warmer", a: "Monotonic decreasing stack. Pop when current temp > stack top. Distance = i - stack_top_index. O(n)." },
    { q: "Implement Queue Using Stacks", a: "Two stacks: push to stack1, pop from stack2. When stack2 empty, transfer all from stack1. Amortized O(1)." },
    { q: "Largest Rectangle in Histogram", a: "Monotonic increasing stack. Pop when bar is shorter, calculate area with popped as smallest. O(n)." },
    { q: "Next Greater Element", a: "Monotonic decreasing stack. Traverse right-to-left, pop smaller elements. Stack top is next greater. O(n)." },
  ],
};

type DeckKey = keyof typeof decks;

const FlashcardsPage = () => {
  const deckKeys = Object.keys(decks) as DeckKey[];
  const [deck, setDeck] = useState<DeckKey>(deckKeys[0]);
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [cards, setCards] = useState(decks[deckKeys[0]]);
  const [mastered, setMastered] = useState<Set<string>>(new Set());

  const selectDeck = (d: DeckKey) => {
    setDeck(d);
    setCards(decks[d]);
    setIndex(0);
    setFlipped(false);
  };

  const next = () => { setIndex((index + 1) % cards.length); setFlipped(false); };
  const prev = () => { setIndex((index - 1 + cards.length) % cards.length); setFlipped(false); };
  const shuffle = () => { setCards([...cards].sort(() => Math.random() - 0.5)); setIndex(0); setFlipped(false); };

  const toggleMastered = () => {
    const key = `${deck}-${cards[index].q}`;
    setMastered(prev => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });
  };

  const currentKey = `${deck}-${cards[index].q}`;
  const isMastered = mastered.has(currentKey);
  const masteredInDeck = cards.filter(c => mastered.has(`${deck}-${c.q}`)).length;

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2.5 font-display">
          <Brain className="h-6 w-6 text-primary" /> DSA Flashcards
        </h1>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Zap className="h-3.5 w-3.5 text-neon-amber" />
          <span><strong className="text-foreground">{mastered.size}</strong> mastered</span>
        </div>
      </div>

      {/* Deck selector */}
      <div className="flex gap-2 flex-wrap">
        {deckKeys.map(d => (
          <button
            key={d}
            onClick={() => selectDeck(d)}
            className={`tag-pill transition-all ${deck === d ? "border-primary/60 bg-primary/15 text-primary" : ""}`}
          >
            {d}
            <span className="ml-1.5 text-[10px] opacity-60">({decks[d].length})</span>
          </button>
        ))}
      </div>

      {/* Progress bar for current deck */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-[11px] text-muted-foreground">
          <span>{masteredInDeck}/{cards.length} mastered in {deck}</span>
          <span>{Math.round((masteredInDeck / cards.length) * 100)}%</span>
        </div>
        <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
            initial={{ width: 0 }}
            animate={{ width: `${(masteredInDeck / cards.length) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* Card */}
      <div className="flex flex-col items-center">
        <div className="w-full max-w-2xl cursor-pointer" onClick={() => setFlipped(!flipped)}>
          <AnimatePresence mode="wait">
            <motion.div
              key={`${index}-${flipped}`}
              initial={{ rotateY: 90, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              exit={{ rotateY: -90, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className={`glass-card p-8 md:p-10 min-h-[220px] flex flex-col justify-center text-center relative ${isMastered ? 'border-neon-emerald/30' : ''}`}
            >
              <p className={`text-[10px] uppercase tracking-widest mb-4 font-bold ${flipped ? 'text-primary' : 'text-accent'}`}>
                {flipped ? "💡 Solution & Approach" : "🧩 Problem"}
              </p>
              <p className={`text-base md:text-lg leading-relaxed ${flipped ? "text-foreground/90 font-mono text-sm" : "text-foreground font-semibold"}`}>
                {flipped ? cards[index].a : cards[index].q}
              </p>
              <p className="text-[10px] text-muted-foreground/50 mt-4">
                {flipped ? "Click to see problem" : "Click to reveal solution"}
              </p>
              {isMastered && (
                <div className="absolute top-3 right-3 text-[10px] text-neon-emerald font-bold bg-neon-emerald/10 px-2 py-0.5 rounded-full">
                  ✓ Mastered
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-3 mt-6">
          <Button variant="outline" size="icon" onClick={prev} className="border-border/30 hover:border-primary/30">
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <span className="text-sm text-muted-foreground font-mono min-w-[60px] text-center">
            {index + 1} / {cards.length}
          </span>
          <Button variant="outline" size="icon" onClick={next} className="border-border/30 hover:border-primary/30">
            <ChevronRight className="h-5 w-5" />
          </Button>
          <div className="w-px h-6 bg-border/30 mx-1" />
          <Button variant="outline" size="icon" onClick={shuffle} className="border-border/30 hover:border-primary/30" title="Shuffle">
            <Shuffle className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={toggleMastered}
            className={`text-xs ${isMastered ? 'border-neon-emerald/30 text-neon-emerald bg-neon-emerald/5' : 'border-border/30'}`}
          >
            {isMastered ? "✓ Mastered" : "Mark Mastered"}
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default FlashcardsPage;
