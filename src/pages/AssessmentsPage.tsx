import { motion } from "framer-motion";
import { Brain, CheckCircle, XCircle, ArrowRight } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const quizzes = [
  {
    name: "Python Fundamentals",
    questions: [
      { q: "What is the output of print(type([]))?", options: ["<class 'list'>", "<class 'tuple'>", "<class 'dict'>", "<class 'set'>"], answer: 0 },
      { q: "Which keyword is used to define a function?", options: ["func", "define", "def", "function"], answer: 2 },
      { q: "What does 'len()' return for the string 'hello'?", options: ["4", "5", "6", "Error"], answer: 1 },
      { q: "Which is not a Python data type?", options: ["int", "float", "char", "str"], answer: 2 },
      { q: "How do you start a comment in Python?", options: ["//", "/*", "#", "--"], answer: 2 },
    ],
  },
  {
    name: "JavaScript Basics",
    questions: [
      { q: "Which company developed JavaScript?", options: ["Microsoft", "Netscape", "Google", "Apple"], answer: 1 },
      { q: "What is '===' in JavaScript?", options: ["Assignment", "Loose equality", "Strict equality", "Not equal"], answer: 2 },
      { q: "Which method adds an element to end of array?", options: ["pop()", "push()", "shift()", "unshift()"], answer: 1 },
      { q: "What does 'typeof null' return?", options: ["'null'", "'undefined'", "'object'", "'boolean'"], answer: 2 },
      { q: "How to declare a constant?", options: ["var", "let", "const", "constant"], answer: 2 },
    ],
  },
  {
    name: "SQL Essentials",
    questions: [
      { q: "Which SQL statement is used to extract data?", options: ["GET", "OPEN", "SELECT", "EXTRACT"], answer: 2 },
      { q: "Which clause filters rows?", options: ["ORDER BY", "GROUP BY", "WHERE", "HAVING"], answer: 2 },
      { q: "Which JOIN returns all rows from both tables?", options: ["INNER", "LEFT", "RIGHT", "FULL OUTER"], answer: 3 },
      { q: "What does COUNT(*) return?", options: ["Column count", "Row count", "Table count", "Error"], answer: 1 },
      { q: "Which keyword removes duplicates?", options: ["UNIQUE", "DISTINCT", "DIFFERENT", "SINGLE"], answer: 1 },
    ],
  },
];

const AssessmentsPage = () => {
  const [activeQuiz, setActiveQuiz] = useState<string | null>(null);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);

  const quiz = quizzes.find((q) => q.name === activeQuiz);

  const handleAnswer = (idx: number) => {
    const newAnswers = [...answers, idx];
    setAnswers(newAnswers);
    if (quiz && currentQ < quiz.questions.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      setShowResults(true);
    }
  };

  const resetQuiz = () => {
    setActiveQuiz(null);
    setCurrentQ(0);
    setAnswers([]);
    setShowResults(false);
  };

  const score = quiz ? answers.filter((a, i) => a === quiz.questions[i].answer).length : 0;

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <Brain className="h-6 w-6 text-primary" /> Skill Assessments
        </h1>
        <p className="text-muted-foreground text-sm mt-1">Test your knowledge and measure your skill level.</p>
      </div>

      {!activeQuiz && (
        <div className="grid md:grid-cols-3 gap-4">
          {quizzes.map((q) => (
            <div key={q.name} className="glass-card-hover p-6 cursor-pointer" onClick={() => setActiveQuiz(q.name)}>
              <Brain className="h-8 w-8 text-primary mb-3" />
              <h3 className="text-base font-semibold text-foreground">{q.name}</h3>
              <p className="text-xs text-muted-foreground mt-1">{q.questions.length} questions</p>
              <Button variant="ghost" size="sm" className="text-primary text-xs mt-3">
                Start Quiz <ArrowRight className="ml-1 h-3 w-3" />
              </Button>
            </div>
          ))}
        </div>
      )}

      {activeQuiz && quiz && !showResults && (
        <div className="glass-card neon-border p-8 max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-foreground">{quiz.name}</h2>
            <span className="text-xs text-muted-foreground">{currentQ + 1} / {quiz.questions.length}</span>
          </div>
          <div className="h-1.5 bg-muted rounded-full overflow-hidden mb-6">
            <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${((currentQ + 1) / quiz.questions.length) * 100}%` }} />
          </div>
          <p className="text-base text-foreground mb-6">{quiz.questions[currentQ].q}</p>
          <div className="space-y-3">
            {quiz.questions[currentQ].options.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleAnswer(i)}
                className="w-full text-left p-4 rounded-lg border border-border/50 bg-secondary/30 hover:bg-secondary/50 hover:border-primary/30 transition-all text-sm text-foreground"
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      )}

      {showResults && quiz && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="glass-card neon-border p-8 max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-foreground mb-2">Quiz Complete!</h2>
          <p className="text-4xl font-bold gradient-text mb-4">{score} / {quiz.questions.length}</p>
          <p className="text-muted-foreground mb-6">
            {score === quiz.questions.length ? "Perfect score! 🎉" : score >= quiz.questions.length * 0.6 ? "Good job! Keep learning! 💪" : "Keep practicing, you'll get there! 📚"}
          </p>
          <div className="space-y-2 text-left mb-6">
            {quiz.questions.map((q, i) => (
              <div key={i} className="flex items-center gap-2 text-sm">
                {answers[i] === q.answer ? <CheckCircle className="h-4 w-4 text-neon-emerald shrink-0" /> : <XCircle className="h-4 w-4 text-destructive shrink-0" />}
                <span className="text-muted-foreground">{q.q}</span>
              </div>
            ))}
          </div>
          <Button variant="neon" onClick={resetQuiz}>Try Another Quiz</Button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default AssessmentsPage;
