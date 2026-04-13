import { useMemo } from "react";
import { motion } from "framer-motion";
import {
  Thermometer, MapPin, TrendingUp, User, Sparkles, ClipboardList,
  Footprints, Timer, ShieldAlert, Activity, Heart, HeartHandshake, Crown, Lock,
  ChevronRight, Armchair, Scale
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import MobilityScore from "@/components/MobilityScore";
import SubscriptionBanner from "@/components/SubscriptionBanner";
import RiskCard from "@/components/RiskCard";
import naturePath from "@/assets/nature-path.jpg";
import { usePremium } from "@/hooks/usePremium";
import { useSteadi } from "@/contexts/SteadiContext";

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

const Dashboard = () => {
  const navigate = useNavigate();
  const { isPremium } = usePremium();
  const { tug, chairStand, balance, overallRiskPercent, overallRiskLevel } = useSteadi();
  const dailyNote = useMemo(() => happyNotes[Math.floor(Math.random() * happyNotes.length)], []);

  const riskColorMap = {
    none: "text-muted-foreground",
    low: "text-safe",
    moderate: "text-warning",
    high: "text-destructive",
  };

  return (
    <div className="space-y-6">
      <SubscriptionBanner />

      {/* Header */}
      <motion.div className="relative rounded-2xl overflow-hidden" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <img src={naturePath} alt="Nature path" className="absolute inset-0 w-full h-full object-cover opacity-20" />
        <div className="relative p-5 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Good Morning</h1>
            <p className="text-sm text-muted-foreground mt-0.5">Your mobility summary for today</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <User className="w-5 h-5 text-primary" />
          </div>
        </div>
      </motion.div>

      {/* Happy Note */}
      <motion.div className="bg-primary/10 border border-primary/20 rounded-2xl p-4 flex items-center gap-3" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
        <Sparkles className="w-5 h-5 text-primary shrink-0" />
        <p className="text-sm font-medium text-foreground leading-relaxed">{dailyNote}</p>
      </motion.div>

      {/* Survey CTA */}
      <motion.button
        className="w-full bg-card rounded-2xl border border-border p-4 flex items-center gap-3 text-left active:scale-[0.98] transition-transform"
        initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.07 }}
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

      {/* Overall Fall Risk Score */}
      <motion.div className="bg-card rounded-3xl border border-border p-6 flex flex-col items-center" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }}>
        <MobilityScore score={overallRiskLevel === "none" ? 0 : 100 - overallRiskPercent} label="Overall Fall Risk Score" />
        <p className={`text-sm font-semibold mt-2 ${riskColorMap[overallRiskLevel]}`}>
          {overallRiskLevel === "none" ? "No tests completed yet" :
           overallRiskLevel === "low" ? "Low Fall Risk" :
           overallRiskLevel === "moderate" ? "Moderate Fall Risk" : "High Fall Risk"}
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          {overallRiskLevel === "none" ? "Complete the CDC STEADI tests below" : `Based on ${[tug, chairStand, balance].filter(Boolean).length}/3 CDC tests`}
        </p>
      </motion.div>

      {/* CDC STEADI Test Cards */}
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-1">CDC STEADI Tests</h2>
        <p className="text-xs text-muted-foreground mb-3">Tap to start each assessment</p>
        <div className="space-y-3">
          <TestCard
            icon={<Timer className="w-4 h-4" />}
            title="Timed Up & Go (TUG)"
            description="Walk 10 feet, turn around, sit down"
            result={tug ? `${tug.timeSeconds.toFixed(1)}s` : undefined}
            riskLevel={tug?.riskLevel}
            onClick={() => navigate("/tug")}
          />
          <TestCard
            icon={<Armchair className="w-4 h-4" />}
            title="30-Second Chair Stand"
            description="Stand and sit as many times as possible"
            result={chairStand ? `${chairStand.count} stands` : undefined}
            riskLevel={chairStand?.riskLevel}
            onClick={() => navigate("/chair-stand")}
          />
          <TestCard
            icon={<Scale className="w-4 h-4" />}
            title="4-Stage Balance Test"
            description="Hold 4 stances for 10 seconds each"
            result={balance ? `${balance.stages.filter(s => s.passed).length}/4 passed` : undefined}
            riskLevel={balance?.riskLevel}
            onClick={() => navigate("/balance")}
          />
        </div>
      </div>

      {/* Risk Factors */}
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-3">Risk Factors</h2>
        <div className="grid grid-cols-2 gap-3">
          {isPremium ? (
            <RiskCard icon={<Thermometer className="w-4 h-4" />} title="Temperature" value="--" level="safe" />
          ) : (
            <motion.div className="rounded-2xl border p-4 bg-muted/30 border-border cursor-pointer" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} onClick={() => navigate("/premium")}>
              <div className="flex items-start gap-3">
                <Thermometer className="w-4 h-4 text-muted-foreground mt-0.5" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-muted-foreground font-medium">Temperature</p>
                  <div className="flex items-center gap-1 mt-1"><Lock className="w-3 h-3 text-muted-foreground" /><span className="text-xs text-muted-foreground">Premium</span></div>
                </div>
                <Crown className="w-4 h-4 text-primary mt-0.5" />
              </div>
            </motion.div>
          )}
          <RiskCard icon={<MapPin className="w-4 h-4" />} title="Surface" value="--" level="safe" />
          <RiskCard icon={<TrendingUp className="w-4 h-4" />} title="Gait Stability" value={tug ? tug.riskLevel : "No data"} level="safe" />
          <RiskCard icon={<User className="w-4 h-4" />} title="Steps Today" value="0" level="safe" />
        </div>
      </div>

      {/* Gait & Balance Detail */}
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-3">Gait & Balance Details</h2>
        <motion.div className="bg-card rounded-2xl border border-border p-4 space-y-3" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-muted flex items-center justify-center">
              <Footprints className="w-4 h-4 text-muted-foreground" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">Walking Test Metrics</p>
              <p className="text-xs text-muted-foreground">From IMU sensor analysis</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <MetricBox label="Speed" value="-- m/s" sub="No data" />
            <MetricBox label="Symmetry" value="0%" sub="No data" />
            <MetricBox label="Sway" value="0.0°" sub="No data" />
          </div>
        </motion.div>
      </div>

      {/* Fall History */}
      <motion.div className="bg-card rounded-2xl border border-border p-4 space-y-3" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-muted flex items-center justify-center">
            <ShieldAlert className="w-4 h-4 text-muted-foreground" />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">Fall History & Confidence</p>
            <p className="text-xs text-muted-foreground">Self-reported assessment</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <MetricBox label="Falls (6 months)" value="0" sub="No data" large />
          <MetricBox label="Fear of Falling" value="0%" sub="No data" large />
        </div>
        <div className="flex items-center gap-2 p-2.5 bg-muted/30 border border-border rounded-xl">
          <Activity className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
          <p className="text-xs text-muted-foreground">
            FES-I Score: <span className="font-semibold text-foreground">0/64</span> — Complete tests to update
          </p>
        </div>
      </motion.div>

      {/* Recent Alerts */}
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-3">Recent Alerts</h2>
        <div className="flex flex-col items-center py-6 text-center">
          <Activity className="w-8 h-8 text-muted-foreground mb-2" />
          <p className="text-sm text-muted-foreground">No alerts yet</p>
          <p className="text-xs text-muted-foreground mt-1">Start a walking test to begin monitoring</p>
        </div>
      </div>

      {/* Support */}
      <motion.div className="bg-card rounded-2xl border border-border p-5 space-y-4" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <div className="flex items-center gap-2.5">
          <HeartHandshake className="w-5 h-5 text-primary" />
          <h2 className="text-base font-semibold text-foreground">You're Supported</h2>
        </div>
        <ul className="space-y-2.5 text-sm text-muted-foreground">
          <li className="flex items-start gap-2"><Heart className="w-3.5 h-3.5 text-destructive shrink-0 mt-0.5" />Talk to your doctor about your fall risk score.</li>
          <li className="flex items-start gap-2"><Heart className="w-3.5 h-3.5 text-destructive shrink-0 mt-0.5" />Use the CDC tests regularly to track progress.</li>
          <li className="flex items-start gap-2"><Heart className="w-3.5 h-3.5 text-destructive shrink-0 mt-0.5" />Share results with your care team.</li>
        </ul>
        <div className="pt-2 border-t border-border">
          <p className="text-sm font-semibold text-foreground text-center">Remember, you are not alone in this journey ❤️</p>
        </div>
      </motion.div>
    </div>
  );
};

/* Sub-components */

const TestCard = ({ icon, title, description, result, riskLevel, onClick }: {
  icon: React.ReactNode; title: string; description: string;
  result?: string; riskLevel?: "low" | "moderate" | "high"; onClick: () => void;
}) => {
  const color = !riskLevel ? "text-muted-foreground" : riskLevel === "high" ? "text-destructive" : riskLevel === "moderate" ? "text-warning" : "text-safe";
  return (
    <motion.button
      className="w-full bg-card rounded-2xl border border-border p-4 flex items-center gap-3 text-left active:scale-[0.98] transition-transform"
      onClick={onClick}
      initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
    >
      <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 text-primary">{icon}</div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-foreground">{title}</p>
        <p className="text-xs text-muted-foreground">{result ? result : description}</p>
        {riskLevel && <p className={`text-xs font-semibold mt-0.5 ${color}`}>{riskLevel === "high" ? "⚠️ High Risk" : riskLevel === "moderate" ? "⚡ Moderate" : "✅ Low Risk"}</p>}
      </div>
      <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
    </motion.button>
  );
};

const MetricBox = ({ label, value, sub, large }: { label: string; value: string; sub: string; large?: boolean }) => (
  <div className="bg-secondary/20 rounded-xl p-2.5 text-center">
    <p className="text-xs text-muted-foreground">{label}</p>
    <p className={`${large ? "text-xl" : "text-sm"} font-bold text-foreground`}>{value}</p>
    <span className="text-[10px] font-medium text-muted-foreground">{sub}</span>
  </div>
);

export default Dashboard;
