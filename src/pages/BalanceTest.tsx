import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, RotateCcw, AlertTriangle, CheckCircle, Timer } from "lucide-react";
import { useSteadi } from "@/contexts/SteadiContext";

const STAGES = [
  { name: "Feet Together", description: "Stand with feet side by side", target: 10 },
  { name: "Semi-Tandem", description: "Place the side of the heel of one foot touching the big toe of the other", target: 10 },
  { name: "Tandem", description: "Place one foot directly in front of the other, heel to toe", target: 10 },
  { name: "One Leg Stand", description: "Stand on one leg", target: 10 },
];

const BalanceTest = () => {
  const [state, setState] = useState<"idle" | "testing" | "done">("idle");
  const [stageIndex, setStageIndex] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [results, setResults] = useState<{ name: string; seconds: number; passed: boolean }[]>([]);
  const [isHolding, setIsHolding] = useState(false);
  const timerRef = useRef<number | null>(null);
  const startRef = useRef(0);
  const { saveBalance } = useSteadi();

  const startStage = () => {
    setElapsed(0);
    setIsHolding(true);
    startRef.current = Date.now();
    timerRef.current = window.setInterval(() => {
      const e = (Date.now() - startRef.current) / 1000;
      setElapsed(e);
      if (e >= STAGES[stageIndex].target) {
        completeStage(STAGES[stageIndex].target);
      }
    }, 100);
  };

  const completeStage = (time?: number) => {
    if (timerRef.current) clearInterval(timerRef.current);
    setIsHolding(false);
    const finalTime = time ?? parseFloat(((Date.now() - startRef.current) / 1000).toFixed(1));
    const stage = STAGES[stageIndex];
    const newResults = [...results, { name: stage.name, seconds: finalTime, passed: finalTime >= stage.target }];
    setResults(newResults);

    if (stageIndex < STAGES.length - 1) {
      setStageIndex((i) => i + 1);
      setElapsed(0);
    } else {
      saveBalance(newResults);
      setState("done");
    }
  };

  const stopEarly = () => {
    completeStage();
  };

  const startTest = () => {
    setResults([]);
    setStageIndex(0);
    setElapsed(0);
    setState("testing");
  };

  const reset = () => {
    setState("idle");
    setResults([]);
    setStageIndex(0);
    setElapsed(0);
  };

  useEffect(() => () => { if (timerRef.current) clearInterval(timerRef.current); }, []);

  const failedAny = results.some((r) => !r.passed);

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-foreground">4-Stage Balance Test</h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Hold each stance for 10 seconds
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
                <Timer className="w-10 h-10 text-primary" />
              </div>
              <div className="text-center">
                <p className="text-lg font-semibold text-foreground">4 Stances</p>
                <p className="text-sm text-muted-foreground mt-1">Hold each for 10 seconds</p>
              </div>
              <button onClick={startTest} className="bg-primary text-primary-foreground px-8 py-3.5 rounded-2xl text-base font-semibold shadow-lg shadow-primary/20 active:scale-95 transition-transform">
                Start Test
              </button>
            </motion.div>
          )}

          {state === "testing" && (
            <motion.div key="testing" className="flex flex-col items-center gap-6 w-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <p className="text-xs text-muted-foreground">Stage {stageIndex + 1} of {STAGES.length}</p>
              <div className="w-28 h-28 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-3xl font-bold text-primary">{elapsed.toFixed(1)}s</span>
              </div>
              <div className="text-center">
                <p className="text-lg font-semibold text-foreground">{STAGES[stageIndex].name}</p>
                <p className="text-sm text-muted-foreground mt-1">{STAGES[stageIndex].description}</p>
              </div>

              {/* Progress dots */}
              <div className="flex gap-2">
                {STAGES.map((_, i) => (
                  <div key={i} className={`w-3 h-3 rounded-full ${i < stageIndex ? (results[i]?.passed ? "bg-safe" : "bg-destructive") : i === stageIndex ? "bg-primary" : "bg-muted"}`} />
                ))}
              </div>

              {!isHolding ? (
                <button onClick={startStage} className="bg-primary text-primary-foreground px-8 py-3.5 rounded-2xl text-base font-semibold active:scale-95 transition-transform">
                  Start Holding
                </button>
              ) : (
                <button onClick={stopEarly} className="bg-destructive text-destructive-foreground px-8 py-3.5 rounded-2xl text-base font-semibold active:scale-95 transition-transform">
                  I Lost Balance
                </button>
              )}

              {/* Completed stages */}
              {results.length > 0 && (
                <div className="w-full space-y-2">
                  {results.map((r, i) => (
                    <div key={i} className="flex justify-between items-center p-2 bg-secondary/20 rounded-xl text-sm">
                      <span className="text-foreground">{r.name}</span>
                      <span className={r.passed ? "text-safe font-semibold" : "text-destructive font-semibold"}>
                        {r.seconds.toFixed(1)}s {r.passed ? "✓" : "✗"}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {state === "done" && (
            <motion.div key="done" className="flex flex-col items-center gap-6 w-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div className="w-28 h-28 rounded-full bg-primary/10 flex items-center justify-center">
                {failedAny ? <AlertTriangle className="w-10 h-10 text-destructive" /> : <CheckCircle className="w-10 h-10 text-safe" />}
              </div>

              <p className="text-lg font-semibold text-foreground">{failedAny ? "High Fall Risk" : "Low Fall Risk"}</p>

              <div className="w-full space-y-2">
                {results.map((r, i) => (
                  <div key={i} className="flex justify-between items-center p-3 bg-primary/5 border border-primary/10 rounded-xl">
                    <span className="text-sm text-foreground font-medium">{r.name}</span>
                    <span className={`text-sm font-semibold ${r.passed ? "text-safe" : "text-destructive"}`}>
                      {r.seconds.toFixed(1)}s {r.passed ? "✓ Pass" : "✗ Fail"}
                    </span>
                  </div>
                ))}
              </div>

              {failedAny && (
                <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-2xl w-full">
                  <p className="text-sm font-semibold text-destructive">⚠️ Balance impairment detected</p>
                  <p className="text-xs text-muted-foreground mt-1">Any stance under 10 seconds indicates fall risk. Discuss with your care provider.</p>
                </div>
              )}

              <button onClick={reset} className="bg-secondary text-secondary-foreground px-8 py-3.5 rounded-2xl text-base font-semibold active:scale-95 transition-transform flex items-center gap-2">
                <RotateCcw className="w-4 h-4" /> Test Again
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default BalanceTest;
