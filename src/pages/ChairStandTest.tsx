import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, RotateCcw, AlertTriangle, CheckCircle, Plus } from "lucide-react";
import { useSteadi } from "@/contexts/SteadiContext";

const DURATION = 30;

const ChairStandTest = () => {
  const [state, setState] = useState<"idle" | "running" | "done">("idle");
  const [count, setCount] = useState(0);
  const [remaining, setRemaining] = useState(DURATION);
  const timerRef = useRef<number | null>(null);
  const { saveChairStand } = useSteadi();

  const start = () => {
    setCount(0);
    setRemaining(DURATION);
    setState("running");

    const startTime = Date.now();
    timerRef.current = window.setInterval(() => {
      const left = DURATION - Math.floor((Date.now() - startTime) / 1000);
      if (left <= 0) {
        clearInterval(timerRef.current!);
        setRemaining(0);
        setState("done");
      } else {
        setRemaining(left);
      }
    }, 200);
  };

  useEffect(() => {
    if (state === "done") {
      saveChairStand(count);
    }
  }, [state]);

  useEffect(() => () => { if (timerRef.current) clearInterval(timerRef.current); }, []);

  const tap = () => {
    if (state === "running") setCount((c) => c + 1);
  };

  const reset = () => {
    setState("idle");
    setCount(0);
    setRemaining(DURATION);
  };

  const riskLevel = count < 8 ? "high" : count < 12 ? "moderate" : "low";
  const riskColor = riskLevel === "high" ? "text-destructive" : riskLevel === "moderate" ? "text-warning" : "text-safe";

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-foreground">Chair Stand Test</h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Stand up and sit down as many times as you can in 30 seconds
        </p>
      </motion.div>

      <motion.div
        className="bg-card rounded-3xl border border-border p-8 flex flex-col items-center gap-6"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <AnimatePresence mode="wait">
          {state === "idle" && (
            <motion.div key="idle" className="flex flex-col items-center gap-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div className="w-28 h-28 rounded-full bg-primary/10 flex items-center justify-center">
                <Play className="w-10 h-10 text-primary ml-1" />
              </div>
              <div className="text-center">
                <p className="text-lg font-semibold text-foreground">Ready?</p>
                <p className="text-sm text-muted-foreground mt-1">Tap each time you stand up</p>
              </div>
              <button onClick={start} className="bg-primary text-primary-foreground px-8 py-3.5 rounded-2xl text-base font-semibold shadow-lg shadow-primary/20 active:scale-95 transition-transform">
                Start Test
              </button>
            </motion.div>
          )}

          {state === "running" && (
            <motion.div key="running" className="flex flex-col items-center gap-6 w-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div className="w-28 h-28 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-3xl font-bold text-primary">{remaining}s</span>
              </div>
              <p className="text-4xl font-bold text-foreground">{count} stands</p>
              <button
                onClick={tap}
                className="w-full py-16 rounded-3xl bg-primary/10 border-2 border-primary/30 text-primary text-xl font-bold active:scale-95 active:bg-primary/20 transition-all flex flex-col items-center gap-2"
              >
                <Plus className="w-10 h-10" />
                Tap when you stand
              </button>
            </motion.div>
          )}

          {state === "done" && (
            <motion.div key="done" className="flex flex-col items-center gap-6 w-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div className="w-28 h-28 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-3xl font-bold text-primary">{count}</span>
              </div>
              <p className="text-sm text-muted-foreground">stands in 30 seconds</p>

              <div className="w-full space-y-3">
                <div className="flex justify-between items-center p-3 bg-primary/5 border border-primary/10 rounded-xl">
                  <span className="text-sm text-foreground font-medium">Risk Level</span>
                  <span className={`text-sm font-semibold ${riskColor} flex items-center gap-1`}>
                    {riskLevel === "high" ? <><AlertTriangle className="w-4 h-4" /> High Risk</> :
                     riskLevel === "moderate" ? <><AlertTriangle className="w-4 h-4" /> Moderate</> :
                     <><CheckCircle className="w-4 h-4" /> Low Risk</>}
                  </span>
                </div>
                <div className="p-3 bg-secondary/20 rounded-xl text-xs text-muted-foreground">
                  {"<8 stands = High Risk · 8-11 = Moderate · 12+ = Low Risk"}
                </div>
                {riskLevel === "high" && (
                  <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-2xl">
                    <p className="text-sm font-semibold text-destructive">⚠️ High fall risk detected</p>
                    <p className="text-xs text-muted-foreground mt-1">Lower extremity strength may need improvement. Talk to your care provider.</p>
                  </div>
                )}
              </div>

              <button onClick={reset} className="bg-secondary text-secondary-foreground px-8 py-3.5 rounded-2xl text-base font-semibold active:scale-95 transition-transform flex items-center gap-2">
                <RotateCcw className="w-4 h-4" /> Test Again
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <div className="bg-card rounded-2xl border border-border p-4">
        <h3 className="text-sm font-semibold text-foreground mb-2">Instructions</h3>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex items-start gap-2"><span className="text-primary font-bold">1.</span>Sit in a straight-back chair, arms crossed</li>
          <li className="flex items-start gap-2"><span className="text-primary font-bold">2.</span>Press start, then stand fully and sit back</li>
          <li className="flex items-start gap-2"><span className="text-primary font-bold">3.</span>Tap the button each time you stand</li>
          <li className="flex items-start gap-2"><span className="text-primary font-bold">4.</span>Repeat as many times as possible in 30 sec</li>
        </ul>
      </div>
    </div>
  );
};

export default ChairStandTest;
