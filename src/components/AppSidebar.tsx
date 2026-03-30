import {
  Brain, Code, TrendingUp, Trophy, BookOpen, Target,
  FileText, Users, Briefcase, GraduationCap, BarChart3, Zap,
  Map, Lightbulb, MessageSquare, Swords, Globe, GitBranch, Layers, Calendar,
  Keyboard, Bookmark, Timer, Quote, BarChart, Search, Braces, FileCode,
  Database, Palette, Shapes, Terminal, Mic, DollarSign, Bug, Star,
  StickyNote, ListChecks, Network, Newspaper, Paintbrush, ChevronRight
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel,
  SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarHeader, SidebarFooter, useSidebar,
} from "@/components/ui/sidebar";
import { useState } from "react";

const mainItems = [
  { title: "Dashboard", url: "/dashboard", icon: BarChart3 },
  { title: "Analytics", url: "/dashboard/analytics", icon: BarChart },
  { title: "Achievements", url: "/dashboard/achievements", icon: Star },
  { title: "Skill Tree", url: "/dashboard/skill-tree", icon: GitBranch },
  { title: "Career Explorer", url: "/dashboard/career-explorer", icon: Briefcase },
  { title: "Salary Calculator", url: "/dashboard/salary", icon: DollarSign },
];

const learnItems = [
  { title: "Coding Practice", url: "/dashboard/coding", icon: Code },
  { title: "DSA Sheet", url: "/dashboard/dsa", icon: ListChecks },
  { title: "Courses", url: "/dashboard/courses", icon: BookOpen },
  { title: "Certifications", url: "/dashboard/certifications", icon: GraduationCap },
  { title: "Flashcards", url: "/dashboard/flashcards", icon: Brain },
  { title: "Design Patterns", url: "/dashboard/patterns", icon: Shapes },
  { title: "Roadmaps", url: "/dashboard/roadmaps", icon: Map },
  { title: "Cheat Sheets", url: "/dashboard/cheatsheets", icon: FileCode },
];

const competeItems = [
  { title: "Contest Arena", url: "/dashboard/contests", icon: Swords },
  { title: "Weekly Challenge", url: "/dashboard/weekly-challenge", icon: Calendar },
  { title: "Debug Challenge", url: "/dashboard/debug", icon: Bug },
  { title: "Hackathons", url: "/dashboard/hackathons", icon: Trophy },
  { title: "Typing Speed", url: "/dashboard/typing-test", icon: Keyboard },
  { title: "Mock Interview", url: "/dashboard/mock-interview", icon: Mic },
];

const toolsItems = [
  { title: "Algorithm Visualizer", url: "/dashboard/algorithm-viz", icon: BarChart3 },
  { title: "SQL Playground", url: "/dashboard/sql", icon: Database },
  { title: "API Playground", url: "/dashboard/api", icon: Globe },
  { title: "Git Simulator", url: "/dashboard/git", icon: GitBranch },
  { title: "Linux Terminal", url: "/dashboard/terminal", icon: Terminal },
  { title: "Regex Tester", url: "/dashboard/regex", icon: Search },
  { title: "JSON Formatter", url: "/dashboard/json", icon: Braces },
  { title: "Markdown Editor", url: "/dashboard/markdown", icon: FileText },
  { title: "CSS Playground", url: "/dashboard/css", icon: Paintbrush },
  { title: "Color Palette", url: "/dashboard/colors", icon: Palette },
  { title: "DB Designer", url: "/dashboard/db-designer", icon: Database },
];

const buildItems = [
  { title: "Projects", url: "/dashboard/projects", icon: Lightbulb },
  { title: "Portfolio Builder", url: "/dashboard/portfolio", icon: Globe },
  { title: "Tech Stack", url: "/dashboard/tech-stack", icon: Layers },
  { title: "Resume Builder", url: "/dashboard/resume", icon: FileText },
  { title: "Code Snippets", url: "/dashboard/snippets", icon: Bookmark },
  { title: "System Design", url: "/dashboard/system-design", icon: Network },
];

const moreItems = [
  { title: "Interview Prep", url: "/dashboard/interview", icon: MessageSquare },
  { title: "Open Source", url: "/dashboard/opensource", icon: GitBranch },
  { title: "Tech News", url: "/dashboard/news", icon: Newspaper },
  { title: "Skill Gap", url: "/dashboard/skill-gap", icon: Target },
  { title: "Bookmarks", url: "/dashboard/bookmarks", icon: Bookmark },
  { title: "Notes", url: "/dashboard/notes", icon: StickyNote },
  { title: "Focus Timer", url: "/dashboard/focus-timer", icon: Timer },
  { title: "Dev Quotes", url: "/dashboard/dev-quotes", icon: Quote },
  { title: "Community", url: "/dashboard/community", icon: Users },
];

const groups = [
  { label: "Main", items: mainItems },
  { label: "Learn", items: learnItems },
  { label: "Compete", items: competeItems },
  { label: "Dev Tools", items: toolsItems },
  { label: "Build", items: buildItems },
  { label: "More", items: moreItems },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({ Main: true, Learn: true });

  const toggleGroup = (label: string) => {
    setExpandedGroups(prev => ({ ...prev, [label]: !prev[label] }));
  };

  return (
    <Sidebar collapsible="icon" className="border-r border-border/15 bg-sidebar">
      <SidebarHeader className="p-4 pb-2">
        <a href="/" className="flex items-center gap-2.5">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shrink-0 relative">
            <Zap className="h-5 w-5 text-primary-foreground" />
            <div className="absolute inset-0 rounded-xl bg-primary/30 animate-pulse-glow opacity-50" />
          </div>
          {!collapsed && (
            <span className="text-base font-black tracking-tight" style={{ fontFamily: "'Orbitron', sans-serif" }}>
              <span className="text-foreground">SKILL</span>
              <span className="gradient-text">NAV</span>
            </span>
          )}
        </a>
      </SidebarHeader>

      <SidebarContent className="px-2 mt-2">
        {groups.map(({ label, items }) => {
          const isExpanded = expandedGroups[label] ?? false;
          return (
            <SidebarGroup key={label}>
              {!collapsed && (
                <button
                  onClick={() => toggleGroup(label)}
                  className="flex items-center justify-between w-full px-3 py-1.5 group"
                >
                  <span className="cyber-label">{label}</span>
                  <ChevronRight className={`h-3 w-3 text-muted-foreground/40 transition-transform duration-300 ${isExpanded ? 'rotate-90' : ''}`} />
                </button>
              )}
              {(collapsed || isExpanded) && (
                <SidebarGroupContent>
                  <SidebarMenu>
                    {items.map((item) => (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton asChild>
                          <NavLink to={item.url} end={item.url === "/dashboard"}
                            className="flex items-center gap-3 px-3 py-2 rounded-xl text-[13px] text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-all duration-300 group/link"
                            activeClassName="text-primary bg-primary/8 hover:text-primary hover:bg-primary/10 border-l-2 border-primary shadow-[inset_0_0_20px_hsl(165_100%_46%/0.05)]">
                            <item.icon className="h-4 w-4 shrink-0 group-hover/link:scale-110 transition-transform duration-300" />
                            {!collapsed && <span className="truncate">{item.title}</span>}
                          </NavLink>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              )}
            </SidebarGroup>
          );
        })}
      </SidebarContent>

      <SidebarFooter className="p-4">
        {!collapsed && (
          <div className="holo-card neon-border p-4 text-center relative overflow-hidden">
            <span className="cyber-label block mb-2">GROWTH SCORE</span>
            <p className="text-3xl font-black neon-text" style={{ fontFamily: "'Orbitron', sans-serif" }}>742</p>
            <div className="h-2 bg-secondary/60 rounded-full mt-3 overflow-hidden">
              <div className="h-full w-[74%] rounded-full bg-gradient-to-r from-primary to-accent" style={{ boxShadow: "0 0 12px hsl(165 100% 46% / 0.4)" }} />
            </div>
            <p className="text-[10px] text-muted-foreground mt-2">74% to next level</p>
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
