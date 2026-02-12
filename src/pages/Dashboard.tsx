import { useMemo } from "react";
import { motion } from "framer-motion";
import {
  Thermometer, MapPin, TrendingUp, User, Sparkles, ClipboardList,
  Footprints, Timer, ShieldAlert, Activity, Heart, HeartHandshake
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import MobilityScore from "@/components/MobilityScore";
import SubscriptionBanner from "@/components/SubscriptionBanner";
import RiskCard from "@/components/RiskCard";
import AlertCard from "@/components/AlertCard";
import naturePath from "@/assets/nature-path.jpg";

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

      {/* Header with nature background */}
      <motion.div
        className="relative rounded-2xl overflow-hidden"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <img
          src={naturePath}
          alt="Nature path"
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
        <div className="relative p-5 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Good Morning</h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Your mobility summary for today
            </p>
          </div>
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <User className="w-5 h-5 text-primary" />
          </div>
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

      {/* CDC Fall Risk Assessment */}
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-1">
          CDC Fall Risk Assessment
        </h2>
        <p className="text-xs text-muted-foreground mb-3">
          Based on the CDC STEADI (Stopping Elderly Accidents, Deaths & Injuries) initiative
        </p>
        <div className="space-y-3">
          {/* Gait & Balance */}
          <motion.div
            className="bg-card rounded-2xl border border-border p-4 space-y-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-caution/10 flex items-center justify-center">
                <Footprints className="w-4 h-4 text-caution" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">Gait & Balance</p>
                <p className="text-xs text-muted-foreground">Speed, symmetry & stability</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-secondary/20 rounded-xl p-2.5 text-center">
                <p className="text-xs text-muted-foreground">Speed</p>
                <p className="text-sm font-bold text-foreground">0.9 m/s</p>
                <span className="text-[10px] font-medium text-caution">Moderate</span>
              </div>
              <div className="bg-secondary/20 rounded-xl p-2.5 text-center">
                <p className="text-xs text-muted-foreground">Symmetry</p>
                <p className="text-sm font-bold text-foreground">82%</p>
                <span className="text-[10px] font-medium text-safe">Good</span>
              </div>
              <div className="bg-secondary/20 rounded-xl p-2.5 text-center">
                <p className="text-xs text-muted-foreground">Sway</p>
                <p className="text-sm font-bold text-foreground">4.2°</p>
                <span className="text-[10px] font-medium text-caution">Mild</span>
              </div>
            </div>
          </motion.div>

          {/* Functional Mobility — TUG Test */}
          <motion.div
            className="bg-card rounded-2xl border border-border p-4 space-y-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center">
                <Timer className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">Functional Mobility (TUG)</p>
                <p className="text-xs text-muted-foreground">Timed Up & Go test</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex-1 bg-secondary/20 rounded-xl p-3">
                <p className="text-xs text-muted-foreground">Last TUG Time</p>
                <p className="text-2xl font-bold text-foreground">14.2<span className="text-sm font-medium text-muted-foreground ml-1">sec</span></p>
              </div>
              <div className="flex-1 space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Risk Level</span>
                  <span className="font-semibold text-caution">Moderate</span>
                </div>
                <div className="h-2 bg-secondary/30 rounded-full overflow-hidden">
                  <div className="h-full w-[60%] bg-caution rounded-full" />
                </div>
                <p className="text-[10px] text-muted-foreground">{"<12s Normal · 12-20s Moderate · >20s High Risk"}</p>
              </div>
            </div>
          </motion.div>

          {/* Fall History & Confidence */}
          <motion.div
            className="bg-card rounded-2xl border border-border p-4 space-y-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-destructive/10 flex items-center justify-center">
                <ShieldAlert className="w-4 h-4 text-destructive" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">Fall History & Confidence</p>
                <p className="text-xs text-muted-foreground">Self-reported assessment</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-secondary/20 rounded-xl p-3">
                <p className="text-xs text-muted-foreground">Falls (6 months)</p>
                <p className="text-xl font-bold text-foreground">1</p>
                <span className="text-[10px] font-medium text-caution">Low frequency</span>
              </div>
              <div className="bg-secondary/20 rounded-xl p-3">
                <p className="text-xs text-muted-foreground">Fear of Falling</p>
                <p className="text-xl font-bold text-foreground">Low</p>
                <span className="text-[10px] font-medium text-safe">Confident</span>
              </div>
            </div>
            <div className="flex items-center gap-2 p-2.5 bg-safe/5 border border-safe/15 rounded-xl">
              <Activity className="w-3.5 h-3.5 text-safe shrink-0" />
              <p className="text-xs text-muted-foreground">
                FES-I Score: <span className="font-semibold text-foreground">22/64</span> — Low concern about falling
              </p>
            </div>
          </motion.div>
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

      {/* Supportive Help Section */}
      <motion.div
        className="bg-card rounded-2xl border border-border p-5 space-y-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex items-center gap-2.5">
          <HeartHandshake className="w-5 h-5 text-primary" />
          <h2 className="text-base font-semibold text-foreground">You're Supported</h2>
        </div>
        <ul className="space-y-2.5 text-sm text-muted-foreground">
          <li className="flex items-start gap-2">
            <Heart className="w-3.5 h-3.5 text-destructive shrink-0 mt-0.5" />
            Talk to your doctor about your fall risk score and what exercises can help.
          </li>
          <li className="flex items-start gap-2">
            <Heart className="w-3.5 h-3.5 text-destructive shrink-0 mt-0.5" />
            Use our walking test regularly to track your progress over time.
          </li>
          <li className="flex items-start gap-2">
            <Heart className="w-3.5 h-3.5 text-destructive shrink-0 mt-0.5" />
            Share your results with your care team for personalized guidance.
          </li>
        </ul>
        <div className="pt-2 border-t border-border">
          <p className="text-sm font-semibold text-foreground text-center">
            Remember, you are not alone in this journey ❤️
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
