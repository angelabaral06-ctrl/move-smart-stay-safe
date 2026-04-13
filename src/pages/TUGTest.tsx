import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Square, RotateCcw, AlertTriangle, CheckCircle } from "lucide-react";
import { useSteadi } from "@/contexts/SteadiContext";
import { useJazzAudio } from "@/hooks/useAudio";

const TUGTest = () => {
  const [state, setState] = useState<"idle" | "running" | "done">("idle");
  const [elapsed, setElapsed] = useState(0);
  const startRef = useRef(0);
  const timerRef = useRef<number | null>(null);
  const { tug, saveTUG } = useSteadi();
  const jazz = useJazzAudio();

  const start = () => {
    startRef.current = Date.now();
    setElapsed(0);
    setState("running");
    jazz.play();
    timerRef.current = window.setInterval(() => {
      setElapsed(((Date.now() - startRef.current) / 1000));
    }, 100);
  };

  const stop = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    jazz.stop();
    const finalTime = parseFloat(((Date.now() - startRef.current) / 1000).toFixed(1));
    setElapsed(finalTime);
    saveTUG(finalTime);
    setState("done");
  };

  const reset = () => {
    setState("idle");
    setElapsed(0);
  };

  useEffect(() => () => { if (timerRef.current) clearInterval(timerRef.current); }, []);

  const riskLevel = elapsed > 20 ? "high" : elapsed > 12 ? "moderate" : "low";
  const riskColor = riskLevel === "high" ? "text-destructive" : riskLevel === "moderate" ? "text-warning" : "text-safe";

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-foreground">Timed Up & Go</h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Stand up, walk 10 feet, turn around, walk back, sit down
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
                <p className="text-sm text-muted-foreground mt-1">Press start when you stand up</p>
              </div>
              <button onClick={start} className="bg-primary text-primary-foreground px-8 py-3.5 rounded-2xl text-base font-semibold shadow-lg shadow-primary/20 active:scale-95 transition-transform">
                Start TUG
              </button>
            </motion.div>
          )}

          {state === "running" && (
            <motion.div key="running" className="flex flex-col items-center gap-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div className="w-28 h-28 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-3xl font-bold text-primary">{elapsed.toFixed(1)}s</span>
              </div>
              <p className="text-lg font-semibold text-foreground">Walking...</p>
              <button onClick={stop} className="bg-destructive text-destructive-foreground px-8 py-3.5 rounded-2xl text-base font-semibold active:scale-95 transition-transform flex items-center gap-2">
                <Square className="w-4 h-4" /> Stop
              </button>
            </motion.div>
          )}

          {state === "done" && (
            <motion.div key="done" className="flex flex-col items-center gap-6 w-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div className="w-28 h-28 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-3xl font-bold text-primary">{elapsed.toFixed(1)}s</span>
              </div>

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
                  {"<12s = Normal · 12-20s = Moderate · >20s = High Risk"}
                </div>
                {riskLevel === "high" && (
                  <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-2xl">
                    <p className="text-sm font-semibold text-destructive">⚠️ High fall risk detected</p>
                    <p className="text-xs text-muted-foreground mt-1">Please consult your healthcare provider about balance and mobility exercises.</p>
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
          <li className="flex items-start gap-2"><span className="text-primary font-bold">1.</span>Sit in a chair with armrests</li>
          <li className="flex items-start gap-2"><span className="text-primary font-bold">2.</span>Press start, stand up</li>
          <li className="flex items-start gap-2"><span className="text-primary font-bold">3.</span>Walk 10 feet (3 meters) at normal pace</li>
          <li className="flex items-start gap-2"><span className="text-primary font-bold">4.</span>Turn around, walk back, sit down</li>
          <li className="flex items-start gap-2"><span className="text-primary font-bold">5.</span>Press stop when seated</li>
        </ul>
      </div>
    </div>
  );
};

export default TUGTest;
