import { useMemo } from "react";
import { motion } from "framer-motion";
import { Thermometer, MapPin, TrendingUp, User, Sparkles, ClipboardList } from "lucide-react";
import { useNavigate } from "react-router-dom";
import MobilityScore from "@/components/MobilityScore";
import SubscriptionBanner from "@/components/SubscriptionBanner";

const happyNotes = [
  "You're doing amazing — every step counts! 🌟",
  "Keep it up! Your commitment to staying safe is inspiring! 💪",
  "You've got this! Small steps lead to big confidence! 🎉",
  "Your health journey matters — we're cheering for you! ❤️",
  "Walking today? That's already a win! 🏆",
  "Remember: progress, not perfection! You're wonderful! ☀️",
  "Every walk makes you stronger — believe in yourself! 🌈",
  "You showed up today, and that's what matters most! 💛",
  "One step at a time — you're on the right path! 🚶",
  "Stay steady, stay confident — you're doing great! ✨",
];
import RiskCard from "@/components/RiskCard";
import AlertCard from "@/components/AlertCard";

const mockAlerts = [
  {
    message: "Unstable movement detected in hallway area",
    time: "2:30 PM",
    type: "unstable" as const,
  },
  {
    message: "Elevated temperature may affect balance",
    time: "1:15 PM",
    type: "heat" as const,
  },
  {
    message: "Uneven surface detected during walk",
    time: "11:45 AM",
    type: "terrain" as const,
  },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const dailyNote = useMemo(() => happyNotes[Math.floor(Math.random() * happyNotes.length)], []);

  return (
    <div className="space-y-6">
      {/* Subscription Banner */}
      <SubscriptionBanner />

      {/* Header */}
      <motion.div
        className="flex items-center justify-between"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div>
          <h1 className="text-2xl font-bold text-foreground">Good Morning</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Your mobility summary for today
          </p>
        </div>
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
          <User className="w-5 h-5 text-primary" />
        </div>
      </motion.div>

      {/* Happy Note */}
      <motion.div
        className="bg-primary/10 border border-primary/20 rounded-2xl p-4 flex items-center gap-3"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
      >
        <Sparkles className="w-5 h-5 text-primary shrink-0" />
        <p className="text-sm font-medium text-foreground leading-relaxed">{dailyNote}</p>
      </motion.div>

      {/* Survey CTA */}
      <motion.button
        className="w-full bg-card rounded-2xl border border-border p-4 flex items-center gap-3 text-left active:scale-[0.98] transition-transform"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.07 }}
        onClick={() => navigate("/survey")}
      >
        <div className="w-9 h-9 rounded-xl bg-accent flex items-center justify-center shrink-0">
          <ClipboardList className="w-4 h-4 text-accent-foreground" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold text-foreground">Quick Survey</p>
          <p className="text-xs text-muted-foreground">Help us personalize your experience</p>
        </div>
      </motion.button>

      {/* Mobility Score */}
      <motion.div
        className="bg-card rounded-3xl border border-border p-6 flex flex-col items-center"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
      >
        <MobilityScore score={72} label="Overall Mobility Score" />
      </motion.div>

      {/* Risk Factors */}
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-3">
          Risk Factors
        </h2>
        <div className="grid grid-cols-2 gap-3">
          <RiskCard
            icon={<Thermometer className="w-4 h-4" />}
            title="Temperature"
            value="28°C"
            level="caution"
          />
          <RiskCard
            icon={<MapPin className="w-4 h-4" />}
            title="Surface"
            value="Indoor"
            level="safe"
          />
          <RiskCard
            icon={<TrendingUp className="w-4 h-4" />}
            title="Gait Stability"
            value="Moderate"
            level="caution"
          />
          <RiskCard
            icon={<User className="w-4 h-4" />}
            title="Steps Today"
            value="1,240"
            level="safe"
          />
        </div>
      </div>

      {/* Recent Alerts */}
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-3">
          Recent Alerts
        </h2>
        <div className="space-y-3">
          {mockAlerts.map((alert, i) => (
            <AlertCard key={i} {...alert} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
