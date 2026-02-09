import { motion } from "framer-motion";
import { Thermometer, MapPin, TrendingUp, User } from "lucide-react";
import MobilityScore from "@/components/MobilityScore";
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
  return (
    <div className="space-y-6">
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
