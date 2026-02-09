import { ReactNode } from "react";
import { motion } from "framer-motion";

interface RiskCardProps {
  icon: ReactNode;
  title: string;
  value: string;
  level: "safe" | "caution" | "warning" | "danger";
}

const levelStyles = {
  safe: "bg-safe/10 border-safe/20",
  caution: "bg-caution/10 border-caution/20",
  warning: "bg-warning/10 border-warning/20",
  danger: "bg-destructive/10 border-destructive/20",
};

const dotStyles = {
  safe: "bg-safe",
  caution: "bg-caution",
  warning: "bg-warning",
  danger: "bg-destructive",
};

const RiskCard = ({ icon, title, value, level }: RiskCardProps) => (
  <motion.div
    className={`rounded-2xl border p-4 ${levelStyles[level]}`}
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
  >
    <div className="flex items-start gap-3">
      <div className="text-muted-foreground mt-0.5">{icon}</div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-muted-foreground font-medium">{title}</p>
        <p className="text-lg font-semibold text-foreground mt-0.5">{value}</p>
      </div>
      <div className={`w-2.5 h-2.5 rounded-full mt-1.5 ${dotStyles[level]}`} />
    </div>
  </motion.div>
);

export default RiskCard;
