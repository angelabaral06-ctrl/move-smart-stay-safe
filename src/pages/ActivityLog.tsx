import { motion } from "framer-motion";
import { AlertTriangle, CheckCircle, ThermometerSun, Footprints } from "lucide-react";

interface LogEntry {
  id: number;
  type: "unstable" | "stable" | "heat" | "terrain";
  message: string;
  time: string;
  date: string;
}

const mockLog: LogEntry[] = [
  { id: 1, type: "unstable", message: "Unstable movement detected in this area", time: "2:30 PM", date: "Today" },
  { id: 2, type: "heat", message: "High temperature may increase fall risk", time: "1:15 PM", date: "Today" },
  { id: 3, type: "stable", message: "Walking test completed — 82% stable", time: "10:00 AM", date: "Today" },
  { id: 4, type: "terrain", message: "Uneven surface detected during walk", time: "11:45 AM", date: "Today" },
  { id: 5, type: "unstable", message: "Sloppy movement detected near stairs", time: "3:20 PM", date: "Yesterday" },
  { id: 6, type: "stable", message: "Morning walk completed — 78% stable", time: "9:30 AM", date: "Yesterday" },
  { id: 7, type: "heat", message: "Elevated body temperature noted", time: "2:00 PM", date: "Yesterday" },
];

const iconMap = {
  unstable: <AlertTriangle className="w-4 h-4 text-warning" />,
  stable: <CheckCircle className="w-4 h-4 text-safe" />,
  heat: <ThermometerSun className="w-4 h-4 text-destructive" />,
  terrain: <Footprints className="w-4 h-4 text-caution" />,
};

const bgMap = {
  unstable: "bg-warning/10",
  stable: "bg-safe/10",
  heat: "bg-destructive/10",
  terrain: "bg-caution/10",
};

const ActivityLog = () => {
  const grouped = mockLog.reduce<Record<string, LogEntry[]>>((acc, entry) => {
    (acc[entry.date] ??= []).push(entry);
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-foreground">Activity Log</h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Movement history and detected alerts
        </p>
      </motion.div>

      {Object.entries(grouped).map(([date, entries]) => (
        <div key={date}>
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
            {date}
          </h2>
          <div className="space-y-2">
            {entries.map((entry, i) => (
              <motion.div
                key={entry.id}
                className="flex items-start gap-3 p-4 bg-card rounded-2xl border border-border"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <div className={`w-9 h-9 rounded-xl ${bgMap[entry.type]} flex items-center justify-center shrink-0`}>
                  {iconMap[entry.type]}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground leading-relaxed">
                    {entry.message}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">{entry.time}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ActivityLog;
