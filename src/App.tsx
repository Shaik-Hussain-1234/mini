import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { ThemeProvider } from "@/hooks/useTheme";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardLayout from "./components/DashboardLayout";
import DashboardIndex from "./pages/DashboardIndex";
import SkillGapAnalyzer from "./pages/SkillGapAnalyzer";
import CareerExplorer from "./pages/CareerExplorer";
import CodingPractice from "./pages/CodingPractice";
import HackathonsPage from "./pages/HackathonsPage";
import LearningRoadmaps from "./pages/LearningRoadmaps";
import CoursesPage from "./pages/CoursesPage";
import CertificationsPage from "./pages/CertificationsPage";
import AssessmentsPage from "./pages/AssessmentsPage";
import ProjectsPage from "./pages/ProjectsPage";
import TechTrendsPage from "./pages/TechTrendsPage";
import ResumeBuilder from "./pages/ResumeBuilder";
import InterviewPrepPage from "./pages/InterviewPrepPage";
import CommunityPage from "./pages/CommunityPage";
import ContestArena from "./pages/ContestArena";
import PortfolioBuilder from "./pages/PortfolioBuilder";
import SkillTree from "./pages/SkillTree";
import TechStackBuilder from "./pages/TechStackBuilder";
import WeeklyChallenge from "./pages/WeeklyChallenge";
import TypingSpeedTest from "./pages/TypingSpeedTest";
import CodeSnippets from "./pages/CodeSnippets";
import FocusTimer from "./pages/FocusTimer";
import DevQuotes from "./pages/DevQuotes";
import AlgorithmVisualizer from "./pages/AlgorithmVisualizer";
import RegexTester from "./pages/RegexTester";
import JsonFormatter from "./pages/JsonFormatter";
import MarkdownEditor from "./pages/MarkdownEditor";
import SQLPlayground from "./pages/SQLPlayground";
import ApiPlayground from "./pages/ApiPlayground";
import ColorPalette from "./pages/ColorPalette";
import FlashcardsPage from "./pages/FlashcardsPage";
import DesignPatterns from "./pages/DesignPatterns";
import LinuxTerminal from "./pages/LinuxTerminal";
import MockInterview from "./pages/MockInterview";
import SalaryCalculator from "./pages/SalaryCalculator";
import DebugChallenge from "./pages/DebugChallenge";
import OpenSourceExplorer from "./pages/OpenSourceExplorer";
import AchievementsPage from "./pages/AchievementsPage";
import BookmarkManager from "./pages/BookmarkManager";
import NotesPage from "./pages/NotesPage";
import DSASheet from "./pages/DSASheet";
import GitSimulator from "./pages/GitSimulator";
import DatabaseDesigner from "./pages/DatabaseDesigner";
import CSSPlayground from "./pages/CSSPlayground";
import SystemDesignBoard from "./pages/SystemDesignBoard";
import TechNewsPage from "./pages/TechNewsPage";
import CheatSheets from "./pages/CheatSheets";
import PomodoroStats from "./pages/PomodoroStats";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
              <Route index element={<DashboardIndex />} />
              <Route path="skill-gap" element={<SkillGapAnalyzer />} />
              <Route path="career-explorer" element={<CareerExplorer />} />
              <Route path="coding" element={<CodingPractice />} />
              <Route path="hackathons" element={<HackathonsPage />} />
              <Route path="roadmaps" element={<LearningRoadmaps />} />
              <Route path="courses" element={<CoursesPage />} />
              <Route path="certifications" element={<CertificationsPage />} />
              <Route path="assessments" element={<AssessmentsPage />} />
              <Route path="projects" element={<ProjectsPage />} />
              <Route path="trends" element={<TechTrendsPage />} />
              <Route path="resume" element={<ResumeBuilder />} />
              <Route path="interview" element={<InterviewPrepPage />} />
              <Route path="community" element={<CommunityPage />} />
              <Route path="contests" element={<ContestArena />} />
              <Route path="portfolio" element={<PortfolioBuilder />} />
              <Route path="skill-tree" element={<SkillTree />} />
              <Route path="tech-stack" element={<TechStackBuilder />} />
              <Route path="weekly-challenge" element={<WeeklyChallenge />} />
              <Route path="typing-test" element={<TypingSpeedTest />} />
              <Route path="snippets" element={<CodeSnippets />} />
              <Route path="focus-timer" element={<FocusTimer />} />
              <Route path="dev-quotes" element={<DevQuotes />} />
              <Route path="algorithm-viz" element={<AlgorithmVisualizer />} />
              <Route path="regex" element={<RegexTester />} />
              <Route path="json" element={<JsonFormatter />} />
              <Route path="markdown" element={<MarkdownEditor />} />
              <Route path="sql" element={<SQLPlayground />} />
              <Route path="api" element={<ApiPlayground />} />
              <Route path="colors" element={<ColorPalette />} />
              <Route path="flashcards" element={<FlashcardsPage />} />
              <Route path="patterns" element={<DesignPatterns />} />
              <Route path="terminal" element={<LinuxTerminal />} />
              <Route path="mock-interview" element={<MockInterview />} />
              <Route path="salary" element={<SalaryCalculator />} />
              <Route path="debug" element={<DebugChallenge />} />
              <Route path="opensource" element={<OpenSourceExplorer />} />
              <Route path="achievements" element={<AchievementsPage />} />
              <Route path="bookmarks" element={<BookmarkManager />} />
              <Route path="notes" element={<NotesPage />} />
              <Route path="dsa" element={<DSASheet />} />
              <Route path="git" element={<GitSimulator />} />
              <Route path="db-designer" element={<DatabaseDesigner />} />
              <Route path="css" element={<CSSPlayground />} />
              <Route path="system-design" element={<SystemDesignBoard />} />
              <Route path="news" element={<TechNewsPage />} />
              <Route path="cheatsheets" element={<CheatSheets />} />
              <Route path="analytics" element={<PomodoroStats />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
