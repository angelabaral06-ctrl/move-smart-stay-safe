import { motion, AnimatePresence } from "framer-motion";
import { Play, Square, RotateCcw } from "lucide-react";
import { useMotionSensor } from "@/hooks/useMotionSensor";
import MobilityScore from "@/components/MobilityScore";

const formatTime = (seconds: number) => {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
};

const WalkingTest = () => {
  const { isTracking, analysis, elapsed, startTracking, stopTracking } =
    useMotionSensor();

  const reset = () => {
    window.location.reload();
  };

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-foreground">Walking Test</h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Walk naturally for 30 seconds to assess your stability
        </p>
      </motion.div>

      <motion.div
        className="bg-card rounded-3xl border border-border p-8 flex flex-col items-center gap-6"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
      >
        <AnimatePresence mode="wait">
          {!isTracking && !analysis && (
            <motion.div
              key="start"
              className="flex flex-col items-center gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="w-28 h-28 rounded-full bg-primary/10 flex items-center justify-center relative">
                <div className="absolute inset-0 rounded-full bg-primary/5 animate-pulse-ring" />
                <Play className="w-10 h-10 text-primary ml-1" />
              </div>
              <div className="text-center">
                <p className="text-lg font-semibold text-foreground">
                  Ready to begin?
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Hold your phone and walk normally
                </p>
              </div>
              <button
                onClick={startTracking}
                className="bg-primary text-primary-foreground px-8 py-3.5 rounded-2xl text-base font-semibold shadow-lg shadow-primary/20 active:scale-95 transition-transform"
              >
                Start Test
              </button>
            </motion.div>
          )}

          {isTracking && (
            <motion.div
              key="tracking"
              className="flex flex-col items-center gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="relative">
                <div className="w-28 h-28 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-3xl font-bold text-primary">
                    {formatTime(elapsed)}
                  </span>
                </div>
                <motion.div
                  className="absolute -inset-2 rounded-full border-2 border-primary/30"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                />
              </div>
              <div className="text-center">
                <p className="text-lg font-semibold text-foreground">
                  Tracking movement...
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Keep walking naturally
                </p>
              </div>
              <button
                onClick={stopTracking}
                className="bg-destructive text-destructive-foreground px-8 py-3.5 rounded-2xl text-base font-semibold active:scale-95 transition-transform flex items-center gap-2"
              >
                <Square className="w-4 h-4" />
                Stop Test
              </button>
            </motion.div>
          )}

          {analysis && (
            <motion.div
              key="result"
              className="flex flex-col items-center gap-6 w-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <MobilityScore score={analysis.score} label="Test Result" />

              <div className="w-full space-y-3">
                <div className="flex justify-between items-center p-3 bg-secondary rounded-xl">
                  <span className="text-sm text-muted-foreground">
                    Movement Stability
                  </span>
                  <span className="text-sm font-semibold text-foreground">
                    {analysis.isUnstable ? "Unstable" : "Stable"}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-secondary rounded-xl">
                  <span className="text-sm text-muted-foreground">
                    Average Jerk
                  </span>
                  <span className="text-sm font-semibold text-foreground">
                    {analysis.avgJerk.toFixed(1)} m/s³
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-secondary rounded-xl">
                  <span className="text-sm text-muted-foreground">
                    Max Tilt
                  </span>
                  <span className="text-sm font-semibold text-foreground">
                    {analysis.maxTilt.toFixed(1)}°
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-secondary rounded-xl">
                  <span className="text-sm text-muted-foreground">
                    Test Duration
                  </span>
                  <span className="text-sm font-semibold text-foreground">
                    {formatTime(elapsed)}
                  </span>
                </div>

                {analysis.isUnstable && (
                  <motion.div
                    className="p-4 bg-warning/10 border border-warning/20 rounded-2xl"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <p className="text-sm font-semibold text-warning">
                      ⚠️ Unstable movement detected
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Consider consulting with your healthcare provider about
                      balance exercises.
                    </p>
                  </motion.div>
                )}
              </div>

              <button
                onClick={reset}
                className="bg-secondary text-secondary-foreground px-8 py-3.5 rounded-2xl text-base font-semibold active:scale-95 transition-transform flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                Test Again
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <div className="bg-card rounded-2xl border border-border p-4">
        <h3 className="text-sm font-semibold text-foreground mb-2">
          How it works
        </h3>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex items-start gap-2">
            <span className="text-primary font-bold">1.</span>
            Hold your phone in your hand or pocket
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary font-bold">2.</span>
            Walk naturally for at least 15 seconds
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary font-bold">3.</span>
            Your phone's sensors measure your stability
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary font-bold">4.</span>
            Get a percentage score with risk assessment
          </li>
        </ul>
      </div>
    </div>
  );
};

export default WalkingTest;
