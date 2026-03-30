import { motion } from "framer-motion";
import { BookOpen, ChevronRight, ArrowLeft, CheckCircle, Code, Play } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface Lesson { title: string; content: string; code?: string; quiz?: { q: string; options: string[]; answer: number } }
interface Course { skill: string; description: string; icon: string; lessons: Lesson[] }

const courses: Course[] = [
  {
    skill: "Python", description: "Master Python from basics to advanced concepts", icon: "🐍",
    lessons: [
      { title: "Variables & Data Types", content: "Python supports multiple data types: int, float, str, bool, list, tuple, dict, set. Variables are dynamically typed - you don't need to declare the type.", code: "# Variables\nname = \"Alice\"    # str\nage = 25           # int\nheight = 5.6       # float\nis_student = True  # bool\n\n# Collections\nskills = [\"Python\", \"SQL\", \"React\"]  # list\ncoords = (10, 20)                     # tuple\nprofile = {\"name\": \"Alice\", \"age\": 25} # dict\n\nprint(f\"{name} is {age} years old\")", quiz: { q: "What is the type of [1, 2, 3]?", options: ["tuple", "list", "set", "dict"], answer: 1 } },
      { title: "Control Flow", content: "Python uses if/elif/else for conditionals and for/while for loops. Indentation defines code blocks.", code: "# Conditionals\nscore = 85\nif score >= 90:\n    grade = 'A'\nelif score >= 80:\n    grade = 'B'\nelse:\n    grade = 'C'\n\n# For loop\nfor i in range(5):\n    print(i)  # 0, 1, 2, 3, 4\n\n# List comprehension\nsquares = [x**2 for x in range(10)]", quiz: { q: "What does range(3) produce?", options: ["[1,2,3]", "[0,1,2]", "[0,1,2,3]", "[1,2]"], answer: 1 } },
      { title: "Functions & Modules", content: "Functions are defined with def keyword. Python supports default arguments, *args, and **kwargs.", code: "def greet(name, greeting=\"Hello\"):\n    return f\"{greeting}, {name}!\"\n\nprint(greet(\"Alice\"))         # Hello, Alice!\nprint(greet(\"Bob\", \"Hi\"))     # Hi, Bob!\n\n# Lambda functions\nsquare = lambda x: x ** 2\nprint(square(5))  # 25\n\n# Import modules\nimport math\nprint(math.sqrt(16))  # 4.0", quiz: { q: "What keyword defines a function?", options: ["func", "function", "def", "lambda"], answer: 2 } },
      { title: "Object-Oriented Programming", content: "Python supports OOP with classes, inheritance, encapsulation, and polymorphism.", code: "class Animal:\n    def __init__(self, name, sound):\n        self.name = name\n        self.sound = sound\n    \n    def speak(self):\n        return f\"{self.name} says {self.sound}\"\n\nclass Dog(Animal):\n    def __init__(self, name):\n        super().__init__(name, \"Woof\")\n    \n    def fetch(self, item):\n        return f\"{self.name} fetches {item}\"\n\ndog = Dog(\"Rex\")\nprint(dog.speak())      # Rex says Woof\nprint(dog.fetch(\"ball\")) # Rex fetches ball" },
      { title: "File I/O & Error Handling", content: "Python provides simple file operations and try/except for error handling.", code: "# File operations\nwith open('data.txt', 'w') as f:\n    f.write('Hello, World!')\n\nwith open('data.txt', 'r') as f:\n    content = f.read()\n\n# Error handling\ntry:\n    result = 10 / 0\nexcept ZeroDivisionError:\n    print(\"Cannot divide by zero!\")\nexcept Exception as e:\n    print(f\"Error: {e}\")\nfinally:\n    print(\"Done\")" },
    ],
  },
  {
    skill: "JavaScript", description: "Learn modern JavaScript ES6+ from scratch", icon: "⚡",
    lessons: [
      { title: "Variables & Types", content: "JavaScript has let, const, and var. Modern JS prefers const by default, let when reassignment is needed.", code: "const name = 'Alice';      // immutable binding\nlet age = 25;              // mutable\n\n// Template literals\nconsole.log(`${name} is ${age}`);\n\n// Types\ntypeof 42;          // 'number'\ntypeof 'hello';     // 'string'\ntypeof true;        // 'boolean'\ntypeof undefined;   // 'undefined'\ntypeof null;        // 'object' (quirk!)\ntypeof [];          // 'object'\ntypeof {};          // 'object'", quiz: { q: "typeof null returns?", options: ["'null'", "'undefined'", "'object'", "'boolean'"], answer: 2 } },
      { title: "Functions & Arrow Functions", content: "ES6 introduced arrow functions for concise syntax. Functions are first-class objects in JavaScript.", code: "// Regular function\nfunction add(a, b) {\n  return a + b;\n}\n\n// Arrow function\nconst multiply = (a, b) => a * b;\n\n// Higher-order functions\nconst nums = [1, 2, 3, 4, 5];\nconst doubled = nums.map(n => n * 2);\nconst evens = nums.filter(n => n % 2 === 0);\nconst sum = nums.reduce((acc, n) => acc + n, 0);\n\nconsole.log(doubled); // [2,4,6,8,10]\nconsole.log(sum);     // 15" },
      { title: "Async/Await & Promises", content: "JavaScript is asynchronous by nature. Promises and async/await handle asynchronous operations.", code: "// Promise\nconst fetchData = () => {\n  return new Promise((resolve, reject) => {\n    setTimeout(() => resolve('Data loaded'), 1000);\n  });\n};\n\n// Async/Await\nasync function getData() {\n  try {\n    const data = await fetchData();\n    console.log(data); // 'Data loaded'\n  } catch (err) {\n    console.error(err);\n  }\n}\n\n// Fetch API\nasync function getUsers() {\n  const res = await fetch('/api/users');\n  const users = await res.json();\n  return users;\n}", quiz: { q: "async functions always return?", options: ["undefined", "a string", "a Promise", "null"], answer: 2 } },
      { title: "DOM Manipulation", content: "The Document Object Model (DOM) represents HTML as a tree of objects that JavaScript can manipulate.", code: "// Select elements\nconst btn = document.querySelector('#myBtn');\nconst items = document.querySelectorAll('.item');\n\n// Create & append\nconst div = document.createElement('div');\ndiv.textContent = 'Hello!';\ndiv.classList.add('card');\ndocument.body.appendChild(div);\n\n// Event listeners\nbtn.addEventListener('click', (e) => {\n  e.preventDefault();\n  console.log('Clicked!');\n});\n\n// Modify styles\ndiv.style.backgroundColor = '#0891b2';" },
    ],
  },
  {
    skill: "React", description: "Build modern UIs with React and hooks", icon: "⚛️",
    lessons: [
      { title: "Components & JSX", content: "React uses components as building blocks. JSX is a syntax extension that allows HTML-like code in JavaScript.", code: "import React from 'react';\n\n// Functional component\nconst Greeting = ({ name }) => {\n  return (\n    <div className=\"card\">\n      <h1>Hello, {name}!</h1>\n      <p>Welcome to React</p>\n    </div>\n  );\n};\n\n// Using the component\nfunction App() {\n  return <Greeting name=\"Alice\" />;\n}", quiz: { q: "Components must return?", options: ["a string", "JSX/null", "an object", "undefined"], answer: 1 } },
      { title: "State & Effects", content: "useState manages component state. useEffect handles side effects like data fetching and subscriptions.", code: "import { useState, useEffect } from 'react';\n\nfunction Counter() {\n  const [count, setCount] = useState(0);\n  const [data, setData] = useState(null);\n\n  useEffect(() => {\n    // Runs after every render\n    document.title = `Count: ${count}`;\n  }, [count]); // Only when count changes\n\n  useEffect(() => {\n    // Fetch data on mount\n    fetch('/api/data')\n      .then(res => res.json())\n      .then(setData);\n  }, []); // Empty deps = on mount only\n\n  return (\n    <button onClick={() => setCount(c => c + 1)}>\n      Count: {count}\n    </button>\n  );\n}" },
      { title: "Props & Composition", content: "Props pass data down the component tree. React favors composition over inheritance.", code: "// Card component with children\nconst Card = ({ title, children }) => (\n  <div className=\"rounded-xl border p-4\">\n    <h2 className=\"font-bold\">{title}</h2>\n    {children}\n  </div>\n);\n\n// Composition\nfunction Dashboard() {\n  return (\n    <div className=\"grid grid-cols-2 gap-4\">\n      <Card title=\"Users\">\n        <p>1,234 active users</p>\n      </Card>\n      <Card title=\"Revenue\">\n        <p>$12,345 this month</p>\n      </Card>\n    </div>\n  );\n}" },
    ],
  },
  {
    skill: "Node.js", description: "Server-side JavaScript with Node.js and Express", icon: "🟢",
    lessons: [
      { title: "Getting Started", content: "Node.js lets you run JavaScript on the server. npm is the package manager for Node.js projects.", code: "// Initialize project\n// $ npm init -y\n\n// Simple HTTP server\nconst http = require('http');\n\nconst server = http.createServer((req, res) => {\n  res.writeHead(200, { 'Content-Type': 'application/json' });\n  res.end(JSON.stringify({ message: 'Hello from Node.js!' }));\n});\n\nserver.listen(3000, () => {\n  console.log('Server running on port 3000');\n});" },
      { title: "Express.js Basics", content: "Express is the most popular Node.js web framework for building REST APIs.", code: "const express = require('express');\nconst app = express();\n\napp.use(express.json());\n\nlet todos = [];\n\napp.get('/api/todos', (req, res) => {\n  res.json(todos);\n});\n\napp.post('/api/todos', (req, res) => {\n  const todo = { id: Date.now(), ...req.body };\n  todos.push(todo);\n  res.status(201).json(todo);\n});\n\napp.delete('/api/todos/:id', (req, res) => {\n  todos = todos.filter(t => t.id !== +req.params.id);\n  res.status(204).end();\n});\n\napp.listen(3000);" },
    ],
  },
  {
    skill: "Data Structures", description: "Essential data structures for coding interviews", icon: "🏗️",
    lessons: [
      { title: "Arrays & Strings", content: "Arrays are the most fundamental data structure. Master common patterns: two pointers, sliding window, prefix sums.", code: "# Two Pointers - Two Sum (sorted)\ndef two_sum_sorted(nums, target):\n    left, right = 0, len(nums) - 1\n    while left < right:\n        total = nums[left] + nums[right]\n        if total == target:\n            return [left, right]\n        elif total < target:\n            left += 1\n        else:\n            right -= 1\n\n# Sliding Window - Max subarray sum of size k\ndef max_subarray_sum(arr, k):\n    window_sum = sum(arr[:k])\n    max_sum = window_sum\n    for i in range(k, len(arr)):\n        window_sum += arr[i] - arr[i-k]\n        max_sum = max(max_sum, window_sum)\n    return max_sum", quiz: { q: "Time complexity of two pointers on sorted array?", options: ["O(n²)", "O(n)", "O(log n)", "O(n log n)"], answer: 1 } },
      { title: "Linked Lists", content: "Linked lists store elements in nodes with pointers. Key patterns: fast/slow pointers, reversal, merge.", code: "class ListNode:\n    def __init__(self, val=0, next=None):\n        self.val = val\n        self.next = next\n\n# Reverse a linked list\ndef reverse_list(head):\n    prev = None\n    current = head\n    while current:\n        next_node = current.next\n        current.next = prev\n        prev = current\n        current = next_node\n    return prev\n\n# Detect cycle (Floyd's algorithm)\ndef has_cycle(head):\n    slow = fast = head\n    while fast and fast.next:\n        slow = slow.next\n        fast = fast.next.next\n        if slow == fast:\n            return True\n    return False" },
      { title: "Trees & Graphs", content: "Trees are hierarchical structures. Binary trees, BSTs, and graph traversals are essential for interviews.", code: "from collections import deque\n\nclass TreeNode:\n    def __init__(self, val=0, left=None, right=None):\n        self.val = val\n        self.left = left\n        self.right = right\n\n# DFS - Inorder traversal\ndef inorder(root):\n    if not root: return []\n    return inorder(root.left) + [root.val] + inorder(root.right)\n\n# BFS - Level order traversal\ndef level_order(root):\n    if not root: return []\n    result, queue = [], deque([root])\n    while queue:\n        level = []\n        for _ in range(len(queue)):\n            node = queue.popleft()\n            level.append(node.val)\n            if node.left: queue.append(node.left)\n            if node.right: queue.append(node.right)\n        result.append(level)\n    return result" },
    ],
  },
  {
    skill: "Machine Learning", description: "Introduction to ML concepts and implementation", icon: "🤖",
    lessons: [
      { title: "ML Fundamentals", content: "Machine Learning is about learning patterns from data. Key types: Supervised (classification, regression), Unsupervised (clustering), Reinforcement Learning.", code: "import numpy as np\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.linear_model import LinearRegression\nfrom sklearn.metrics import mean_squared_error\n\n# Generate sample data\nX = np.random.rand(100, 1) * 10\ny = 2 * X + 1 + np.random.randn(100, 1) * 0.5\n\n# Split data\nX_train, X_test, y_train, y_test = train_test_split(\n    X, y, test_size=0.2, random_state=42\n)\n\n# Train model\nmodel = LinearRegression()\nmodel.fit(X_train, y_train)\n\n# Evaluate\npredictions = model.predict(X_test)\nmse = mean_squared_error(y_test, predictions)\nprint(f'MSE: {mse:.4f}')\nprint(f'Coefficient: {model.coef_[0][0]:.2f}')\nprint(f'Intercept: {model.intercept_[0]:.2f}')", quiz: { q: "Which is a supervised learning task?", options: ["Clustering", "Classification", "Dimensionality reduction", "Anomaly detection"], answer: 1 } },
      { title: "Neural Networks Basics", content: "Neural networks consist of layers of interconnected nodes (neurons) that learn to transform inputs to outputs.", code: "import tensorflow as tf\nfrom tensorflow.keras import layers, models\n\n# Build a simple neural network\nmodel = models.Sequential([\n    layers.Dense(64, activation='relu', input_shape=(10,)),\n    layers.Dropout(0.2),\n    layers.Dense(32, activation='relu'),\n    layers.Dense(1, activation='sigmoid')\n])\n\nmodel.compile(\n    optimizer='adam',\n    loss='binary_crossentropy',\n    metrics=['accuracy']\n)\n\n# model.fit(X_train, y_train, epochs=10, batch_size=32)\n# model.evaluate(X_test, y_test)" },
    ],
  },
];

const CoursesPage = () => {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [currentLesson, setCurrentLesson] = useState(0);
  const [completedLessons, setCompletedLessons] = useState<Record<string, number[]>>({});
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);

  const markComplete = (skill: string, idx: number) => {
    setCompletedLessons(prev => ({
      ...prev,
      [skill]: [...(prev[skill] || []), idx].filter((v, i, a) => a.indexOf(v) === i),
    }));
  };

  if (selectedCourse) {
    const lesson = selectedCourse.lessons[currentLesson];
    const completed = completedLessons[selectedCourse.skill] || [];
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
        <button onClick={() => { setSelectedCourse(null); setCurrentLesson(0); setQuizAnswer(null); }} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary">
          <ArrowLeft className="h-4 w-4" /> Back to Courses
        </button>

        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">{selectedCourse.icon} {selectedCourse.skill}</h1>
          <span className="text-xs text-muted-foreground">{completed.length}/{selectedCourse.lessons.length} completed</span>
        </div>

        {/* Progress */}
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${(completed.length / selectedCourse.lessons.length) * 100}%` }} />
        </div>

        {/* Lesson Navigation */}
        <div className="flex gap-2 flex-wrap">
          {selectedCourse.lessons.map((l, i) => (
            <button key={i} onClick={() => { setCurrentLesson(i); setQuizAnswer(null); }}
              className={`text-xs px-3 py-1.5 rounded-full border flex items-center gap-1.5 transition-all ${
                currentLesson === i ? "border-primary bg-primary/10 text-primary" :
                completed.includes(i) ? "border-neon-emerald/30 bg-neon-emerald/5 text-neon-emerald" :
                "border-border text-muted-foreground"
              }`}>
              {completed.includes(i) && <CheckCircle className="h-3 w-3" />}
              {l.title}
            </button>
          ))}
        </div>

        {/* Lesson Content */}
        <div className="glass-card p-6 space-y-4">
          <h2 className="text-lg font-semibold text-foreground">{lesson.title}</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">{lesson.content}</p>

          {lesson.code && (
            <div className="bg-background/80 rounded-lg border border-border/50 overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2 bg-secondary/30 border-b border-border/50">
                <span className="text-xs text-muted-foreground flex items-center gap-1"><Code className="h-3 w-3" /> Code Example</span>
              </div>
              <pre className="p-4 text-xs font-mono text-foreground overflow-x-auto whitespace-pre">{lesson.code}</pre>
            </div>
          )}

          {lesson.quiz && (
            <div className="border border-border/50 rounded-lg p-4 space-y-3">
              <h3 className="text-sm font-semibold text-foreground flex items-center gap-2"><Play className="h-4 w-4 text-primary" /> Quick Quiz</h3>
              <p className="text-sm text-foreground">{lesson.quiz.q}</p>
              <div className="space-y-2">
                {lesson.quiz.options.map((opt, i) => (
                  <button key={i} onClick={() => setQuizAnswer(i)}
                    className={`w-full text-left p-3 rounded-lg border text-sm transition-all ${
                      quizAnswer === null ? "border-border/50 hover:border-primary/30 text-muted-foreground" :
                      i === lesson.quiz!.answer ? "border-neon-emerald bg-neon-emerald/10 text-neon-emerald" :
                      i === quizAnswer ? "border-destructive bg-destructive/10 text-destructive" :
                      "border-border/50 text-muted-foreground opacity-50"
                    }`}
                    disabled={quizAnswer !== null}>
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center justify-between pt-4">
            <Button variant="outline" disabled={currentLesson === 0} onClick={() => { setCurrentLesson(c => c - 1); setQuizAnswer(null); }}>Previous</Button>
            <Button variant="neon" onClick={() => {
              markComplete(selectedCourse.skill, currentLesson);
              if (currentLesson < selectedCourse.lessons.length - 1) {
                setCurrentLesson(c => c + 1);
                setQuizAnswer(null);
              }
            }}>
              {currentLesson < selectedCourse.lessons.length - 1 ? "Complete & Next" : "Complete Course"} <CheckCircle className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-primary" /> Learning Platform
        </h1>
        <p className="text-muted-foreground text-sm mt-1">Interactive courses with tutorials, code examples, and quizzes.</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {courses.map((course) => {
          const completed = completedLessons[course.skill] || [];
          const progress = course.lessons.length > 0 ? Math.round((completed.length / course.lessons.length) * 100) : 0;
          return (
            <motion.div
              key={course.skill}
              whileHover={{ scale: 1.02 }}
              onClick={() => setSelectedCourse(course)}
              className="glass-card-hover p-6 cursor-pointer"
            >
              <div className="text-3xl mb-3">{course.icon}</div>
              <h3 className="text-lg font-semibold text-foreground">{course.skill}</h3>
              <p className="text-xs text-muted-foreground mt-1 mb-4">{course.description}</p>
              <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                <span>{course.lessons.length} lessons</span>
                <span className="text-primary">{progress}%</span>
              </div>
              <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${progress}%` }} />
              </div>
              <Button variant="ghost" size="sm" className="text-primary text-xs mt-3 w-full">
                {progress > 0 ? "Continue" : "Start"} Learning <ChevronRight className="ml-1 h-3 w-3" />
              </Button>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default CoursesPage;
