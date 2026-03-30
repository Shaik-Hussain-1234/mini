import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Zap, Mail, Lock, User, Eye, EyeOff, GraduationCap, Briefcase, Users, BookOpen, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { toast } from "sonner";
import type { Database } from "@/integrations/supabase/types";

type AppRole = Database["public"]["Enums"]["app_role"];

const roles: { value: AppRole; label: string; icon: typeof GraduationCap; desc: string; gradient: string }[] = [
  { value: "student", label: "Student", icon: GraduationCap, desc: "Learn & build", gradient: "from-primary to-neon-blue" },
  { value: "job_seeker", label: "Job Seeker", icon: Briefcase, desc: "Find jobs", gradient: "from-accent to-neon-pink" },
  { value: "hr_recruiter", label: "Recruiter", icon: Users, desc: "Find talent", gradient: "from-neon-amber to-neon-pink" },
  { value: "mentor", label: "Mentor", icon: BookOpen, desc: "Guide others", gradient: "from-neon-emerald to-primary" },
];

const RegisterPage = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState<AppRole | null>(null);
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRole) { toast.error("Please select a role"); return; }
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email, password,
      options: { data: { full_name: fullName, role: selectedRole }, emailRedirectTo: window.location.origin + "/dashboard" },
    });
    if (error) { toast.error(error.message); setLoading(false); return; }
    setLoading(false);
    toast.success("Account created! You can now sign in.");
    navigate("/dashboard");
  };

  const handleGoogleSignup = async () => {
    if (!selectedRole) { toast.error("Please select a role first"); return; }
    setLoading(true);
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin + "/dashboard",
      extraParams: { role: selectedRole },
    });
    if (result.error) {
      toast.error(result.error instanceof Error ? result.error.message : "Google signup failed");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden cyber-grid">
      <div className="orb w-[600px] h-[600px] bg-accent/6 -top-40 -right-40" />
      <div className="orb w-[500px] h-[500px] bg-primary/6 -bottom-40 -left-40" style={{ animationDelay: "4s" }} />

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="holo-card neon-border p-8 md:p-10 w-full max-w-lg relative z-10"
      >
        <div className="text-center mb-6">
          <Link to="/" className="inline-flex items-center gap-2.5 mb-5">
            <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center relative">
              <Zap className="h-6 w-6 text-primary-foreground" />
              <div className="absolute inset-0 rounded-xl bg-primary/30 animate-pulse-glow" />
            </div>
            <span className="text-xl font-black" style={{ fontFamily: "'Orbitron', sans-serif" }}>
              <span className="text-foreground">SKILL</span><span className="gradient-text">NAV</span>
            </span>
          </Link>
          <h1 className="text-2xl font-black text-foreground" style={{ fontFamily: "'Orbitron', sans-serif" }}>JOIN THE FUTURE</h1>
          <p className="text-muted-foreground text-sm mt-2">Create your account and start building</p>
        </div>

        {/* Role Selection */}
        <div className="mb-6">
          <Label className="cyber-label mb-3 block">Select Your Role</Label>
          <div className="grid grid-cols-2 gap-3">
            {roles.map((r) => (
              <motion.button
                key={r.value}
                type="button"
                onClick={() => setSelectedRole(r.value)}
                whileTap={{ scale: 0.97 }}
                className={`p-4 rounded-xl border text-left transition-all duration-300 ${
                  selectedRole === r.value
                    ? "border-primary/40 bg-primary/8 shadow-[0_0_20px_hsl(165_100%_46%/0.1)]"
                    : "border-border/20 bg-secondary/20 hover:border-primary/20 hover:bg-secondary/30"
                }`}
              >
                <div className={`h-9 w-9 rounded-lg bg-gradient-to-br ${r.gradient} flex items-center justify-center mb-2 ${selectedRole === r.value ? 'scale-110' : ''} transition-transform`}>
                  <r.icon className="h-4 w-4 text-primary-foreground" />
                </div>
                <div className="text-sm font-bold text-foreground">{r.label}</div>
                <div className="text-[10px] text-muted-foreground mt-0.5">{r.desc}</div>
              </motion.button>
            ))}
          </div>
        </div>

        <Button variant="outline" className="w-full mb-4 border-border/30 hover:bg-secondary/50 h-12 transition-all" onClick={handleGoogleSignup} disabled={loading}>
          <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Sign Up with Google
        </Button>

        <div className="relative mb-4">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border/30" /></div>
          <div className="relative flex justify-center text-xs"><span className="bg-card px-4 text-muted-foreground">or register with email</span></div>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <Label htmlFor="name" className="text-xs text-muted-foreground uppercase tracking-wider">Full Name</Label>
            <div className="relative mt-2">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input id="name" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="John Doe" className="pl-11 h-12 bg-secondary/30 border-border/30 rounded-xl" required />
            </div>
          </div>
          <div>
            <Label htmlFor="email" className="text-xs text-muted-foreground uppercase tracking-wider">Email</Label>
            <div className="relative mt-2">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="pl-11 h-12 bg-secondary/30 border-border/30 rounded-xl" required />
            </div>
          </div>
          <div>
            <Label htmlFor="password" className="text-xs text-muted-foreground uppercase tracking-wider">Password</Label>
            <div className="relative mt-2">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input id="password" type={showPass ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="pl-11 pr-11 h-12 bg-secondary/30 border-border/30 rounded-xl" required minLength={6} />
              <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>
          <Button type="submit" variant="neon" className="w-full h-12 btn-glow text-base font-bold" disabled={loading}>
            {loading ? "Creating..." : "Create Account"} {!loading && <ArrowRight className="ml-2 h-4 w-4" />}
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground mt-6">
          Already have an account? <Link to="/login" className="text-primary hover:underline font-semibold">Sign In</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default RegisterPage;
