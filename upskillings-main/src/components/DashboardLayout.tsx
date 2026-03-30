import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Outlet, useNavigate } from "react-router-dom";
import AIChatbot from "@/components/AIChatbot";
import { Bell, Search, LogOut, Command, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useTheme } from "@/hooks/useTheme";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const DashboardLayout = () => {
  const { user, profile, role, signOut } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const initials = profile?.full_name
    ? profile.full_name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : user?.email?.[0]?.toUpperCase() ?? "U";

  const roleLabel: Record<string, string> = {
    student: "Student",
    job_seeker: "Job Seeker",
    hr_recruiter: "Recruiter",
    mentor: "Mentor",
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <header className="h-14 flex items-center justify-between border-b border-border/20 px-5 bg-background/60 backdrop-blur-2xl sticky top-0 z-30">
            <div className="flex items-center gap-3">
              <SidebarTrigger className="text-muted-foreground hover:text-primary transition-colors" />
              <div className="hidden md:flex items-center gap-2 bg-secondary/40 border border-border/20 rounded-xl px-4 py-2 group focus-within:border-primary/30 transition-all duration-300">
                <Search className="h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <input
                  type="text"
                  placeholder="Search anything..."
                  className="bg-transparent border-none outline-none text-sm text-foreground placeholder:text-muted-foreground w-64"
                />
                <kbd className="hidden lg:inline-flex h-5 items-center gap-1 rounded border border-border/30 bg-secondary/50 px-1.5 text-[10px] text-muted-foreground">
                  <Command className="h-3 w-3" />K
                </kbd>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {role && (
                <span className="tag-pill font-bold text-[10px] uppercase tracking-wider">
                  {roleLabel[role] ?? role}
                </span>
              )}
              <Button variant="ghost" size="icon" onClick={toggleTheme} className="text-muted-foreground hover:text-primary">
                {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary relative">
                <Bell className="h-4 w-4" />
                <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-neon-pink" style={{ boxShadow: "0 0 8px hsl(330 90% 60% / 0.6)" }} />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="h-9 w-9 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/20 flex items-center justify-center text-sm font-bold text-primary hover:border-primary/40 transition-all duration-300">
                    {initials}
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-52 glass-card border-border/30">
                  <DropdownMenuItem className="text-xs text-muted-foreground cursor-default">
                    {user?.email}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleSignOut} className="text-destructive">
                    <LogOut className="h-4 w-4 mr-2" /> Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>
          <main className="flex-1 p-6 overflow-auto">
            <Outlet />
          </main>
        </div>
        <AIChatbot />
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
