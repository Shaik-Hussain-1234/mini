import { motion } from "framer-motion";
import { Construction } from "lucide-react";

interface PlaceholderPageProps {
  title: string;
  description: string;
}

const PlaceholderPage = ({ title, description }: PlaceholderPageProps) => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center justify-center min-h-[60vh] text-center">
    <div className="glass-card p-10">
      <Construction className="h-12 w-12 text-primary mx-auto mb-4" />
      <h1 className="text-2xl font-bold text-foreground mb-2">{title}</h1>
      <p className="text-muted-foreground text-sm max-w-md">{description}</p>
      <div className="mt-4 text-xs text-primary">Coming Soon</div>
    </div>
  </motion.div>
);

export default PlaceholderPage;
