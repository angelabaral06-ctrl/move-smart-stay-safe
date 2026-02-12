import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, CheckCircle2, ClipboardList } from "lucide-react";
import { useNavigate } from "react-router-dom";

const questions = [
  {
    id: 1,
    question: "How old are you?",
    options: ["Under 50", "50–64", "65–74", "75+"],
  },
  {
    id: 2,
    question: "Have you fallen in the past 12 months? (CDC STEADI screening)",
    options: ["No falls", "1 fall without injury", "1 fall with injury", "2 or more falls"],
  },
  {
    id: 3,
    question: "Do you feel unsteady when standing or walking?",
    options: ["Never", "Rarely", "Sometimes", "Often"],
  },
  {
    id: 4,
    question: "Are you worried about falling? (Fear of Falling assessment)",
    options: ["Not at all", "A little", "Somewhat", "Very worried"],
  },
  {
    id: 5,
    question: "Do you use any walking aids?",
    options: ["None", "Cane", "Walker / Rollator", "Wheelchair"],
  },
  {
    id: 6,
    question: "How many prescription medications do you currently take?",
    options: ["0–3", "4–6", "7–9", "10 or more"],
  },
  {
    id: 7,
    question: "Have you experienced dizziness when standing up? (Orthostatic hypotension)",
    options: ["Never", "Rarely", "Sometimes", "Frequently"],
  },
  {
    id: 8,
    question: "Do you have any vision impairment?",
    options: ["No issues", "Mild (corrected with glasses)", "Moderate", "Severe"],
  },
  {
    id: 9,
    question: "Do you have numbness or tingling in your feet? (Peripheral neuropathy)",
    options: ["None", "Mild", "Moderate", "Severe"],
  },
  {
    id: 10,
    question: "How often do you exercise per week?",
    options: ["Never", "1–2 times", "3–4 times", "5+ times"],
  },
  {
    id: 11,
    question: "Can you stand up from a chair without using your hands? (30-Second Chair Stand)",
    options: ["Easily", "With some effort", "With difficulty", "Unable to"],
  },
  {
    id: 12,
    question: "Which feature matters most to you?",
    options: ["Fall detection", "Balance training", "Emergency alerts", "Health tracking"],
  },
];

const Survey = () => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [completed, setCompleted] = useState(false);

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
            Your responses help us personalize your safety experience and provide better recommendations.
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
