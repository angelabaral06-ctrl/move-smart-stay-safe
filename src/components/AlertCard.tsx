import { AlertTriangle, Clock } from "lucide-react";
import { motion } from "framer-motion";

interface AlertCardProps {
  message: string;
  time: string;
  type: "unstable" | "heat" | "terrain";
}

const typeLabels = {
  unstable: "Unstable Movement",
  heat: "Heat Risk",
  terrain: "Terrain Alert",
};

const AlertCard = ({ message, time, type }: AlertCardProps) => (
  <motion.div
    className="flex items-start gap-3 p-4 bg-card rounded-2xl border border-border"
    initial={{ opacity: 0, x: -12 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.3 }}
  >
    <div className="w-9 h-9 rounded-xl bg-warning/10 flex items-center justify-center shrink-0">
      <AlertTriangle className="w-4 h-4 text-warning" />
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-xs font-semibold text-warning uppercase tracking-wide">
        {typeLabels[type]}
      </p>
      <p className="text-sm text-foreground mt-0.5 leading-relaxed">{message}</p>
      <div className="flex items-center gap-1 mt-1.5">
        <Clock className="w-3 h-3 text-muted-foreground" />
        <span className="text-xs text-muted-foreground">{time}</span>
      </div>
    </div>
  </motion.div>
);

export default AlertCard;
