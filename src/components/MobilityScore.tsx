import { motion } from "framer-motion";

interface MobilityScoreProps {
  score: number; // 0-100
  label?: string;
}

const getScoreColor = (score: number) => {
  if (score >= 75) return "text-safe";
  if (score >= 50) return "text-caution";
  if (score >= 25) return "text-warning";
  return "text-destructive";
};

const getScoreLabel = (score: number) => {
  if (score >= 75) return "Stable";
  if (score >= 50) return "Moderate";
  if (score >= 25) return "Caution";
  return "High Risk";
};

const getStrokeColor = (score: number) => {
  if (score >= 75) return "hsl(150, 50%, 42%)";
  if (score >= 50) return "hsl(45, 90%, 55%)";
  if (score >= 25) return "hsl(25, 90%, 55%)";
  return "hsl(0, 65%, 55%)";
};

const MobilityScore = ({ score, label }: MobilityScoreProps) => {
  const circumference = 2 * Math.PI * 54;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative w-44 h-44">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
          <circle
            cx="60"
            cy="60"
            r="54"
            fill="none"
            stroke="hsl(var(--muted))"
            strokeWidth="8"
            strokeLinecap="round"
          />
          <motion.circle
            cx="60"
            cy="60"
            r="54"
            fill="none"
            stroke={getStrokeColor(score)}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span
            className={`text-4xl font-bold ${getScoreColor(score)}`}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.4 }}
          >
            {score}%
          </motion.span>
          <span className="text-sm text-muted-foreground font-medium">
            {getScoreLabel(score)}
          </span>
        </div>
      </div>
      {label && (
        <p className="text-base text-muted-foreground font-medium">{label}</p>
      )}
    </div>
  );
};

export default MobilityScore;
