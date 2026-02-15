import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, CheckCircle2, ClipboardList, Crown, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { usePremium } from "@/hooks/usePremium";

const questions = [
  {
    id: 1,
    question: "How old are you?",
    options: ["Under 50", "50–64", "65–74", "75+"],
  },
  {
    id: 2,
    question: "Have you experienced a fall in the past 6 months?",
    options: ["No falls", "Once", "2–3 times", "More than 3"],
  },
  {
    id: 3,
    question: "How would you rate your current balance?",
    options: ["Excellent", "Good", "Fair", "Poor"],
  },
  {
    id: 4,
    question: "Do you use any walking aids?",
    options: ["None", "Cane", "Walker", "Wheelchair"],
  },
  {
    id: 5,
    question: "How often do you exercise per week?",
    options: ["Never", "1–2 times", "3–4 times", "5+ times"],
  },
  {
    id: 6,
    question: "Which feature matters most to you?",
    options: ["Fall detection", "Balance training", "Emergency alerts", "Health tracking"],
  },
  {
    id: 7,
    question: "Are you sensitive to heat or high temperatures?",
    options: ["Not at all", "Slightly", "Moderately", "Very sensitive"],
  },
  {
    id: 8,
    question: "Do hot conditions affect your balance or mobility?",
    options: ["Never", "Rarely", "Sometimes", "Often"],
  },
  {
    id: 9,
    question: "Would you like heat & weather risk alerts?",
    options: ["Yes, always notify me", "Only when extreme", "Only during walks", "Not needed"],
  },
  {
    id: 10,
    question: "What environment do you walk in most?",
    options: ["Indoor (home/mall)", "Outdoor sidewalks", "Parks/trails", "Mixed"],
  },
];

const Survey = () => {
  const navigate = useNavigate();
  const { isPremium } = usePremium();
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [completed, setCompleted] = useState(false);

  if (!isPremium) {
    return (
      <div className="space-y-6">
        <motion.div
          className="bg-card rounded-3xl border border-border p-8 flex flex-col items-center gap-4 text-center"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
            <Lock className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-xl font-bold text-foreground">Premium Feature</h2>
          <p className="text-sm text-muted-foreground">
            The personalized survey includes heat sensitivity, weather alerts, and tailored safety recommendations. Upgrade to unlock it.
          </p>
          <button
            onClick={() => navigate("/premium")}
            className="bg-primary text-primary-foreground px-6 py-3 rounded-2xl text-sm font-semibold active:scale-95 transition-transform mt-2 flex items-center gap-2"
          >
            <Crown className="w-4 h-4" />
            Upgrade to Premium
          </button>
          <button
            onClick={() => navigate(-1)}
            className="text-sm text-muted-foreground underline"
          >
            Go back
          </button>
        </motion.div>
      </div>
    );
  }

  const q = questions[current];
  const progress = ((current + 1) / questions.length) * 100;

  const selectAnswer = (option: string) => {
    setAnswers((prev) => ({ ...prev, [q.id]: option }));
  };

  const next = () => {
    if (current < questions.length - 1) {
      setCurrent((p) => p + 1);
    } else {
      setCompleted(true);
    }
  };

  const prev = () => {
    if (current > 0) setCurrent((p) => p - 1);
  };

  if (completed) {
    return (
      <div className="space-y-6">
        <motion.div
          className="bg-card rounded-3xl border border-border p-8 flex flex-col items-center gap-4 text-center"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className="w-16 h-16 rounded-full bg-safe/10 flex items-center justify-center">
            <CheckCircle2 className="w-8 h-8 text-safe" />
          </div>
          <h2 className="text-xl font-bold text-foreground">Thank You!</h2>
          <p className="text-sm text-muted-foreground">
            Your responses help us personalize your safety experience, including heat warnings and environmental risk alerts.
          </p>
          <button
            onClick={() => navigate("/")}
            className="bg-primary text-primary-foreground px-6 py-3 rounded-2xl text-sm font-semibold active:scale-95 transition-transform mt-2"
          >
            Back to Home
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <motion.div
        className="flex items-center gap-3"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <button
          onClick={() => navigate(-1)}
          className="w-9 h-9 rounded-xl bg-card border border-border flex items-center justify-center"
        >
          <ArrowLeft className="w-4 h-4 text-foreground" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Quick Survey</h1>
          <p className="text-sm text-muted-foreground">Help us understand you better</p>
        </div>
      </motion.div>

      {/* Progress */}
      <div className="space-y-1.5">
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Question {current + 1} of {questions.length}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="h-2 bg-secondary/30 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-primary rounded-full"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.div
          key={q.id}
          className="bg-card rounded-2xl border border-border p-5 space-y-4"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex items-center gap-2.5">
            <ClipboardList className="w-5 h-5 text-primary" />
            <h2 className="text-base font-semibold text-foreground">{q.question}</h2>
          </div>
          <div className="space-y-2">
            {q.options.map((option) => (
              <button
                key={option}
                onClick={() => selectAnswer(option)}
                className={`w-full text-left p-3.5 rounded-xl border text-sm font-medium transition-all active:scale-[0.98] ${
                  answers[q.id] === option
                    ? "bg-primary/10 border-primary/30 text-foreground"
                    : "bg-card border-border text-muted-foreground hover:border-primary/20"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex gap-3">
        {current > 0 && (
          <button
            onClick={prev}
            className="flex-1 py-3 rounded-xl bg-secondary text-secondary-foreground text-sm font-semibold flex items-center justify-center gap-1.5"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
        )}
        <button
          onClick={next}
          disabled={!answers[q.id]}
          className="flex-1 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center gap-1.5 disabled:opacity-40 active:scale-[0.98] transition-transform"
        >
          {current < questions.length - 1 ? "Next" : "Submit"}
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default Survey;
