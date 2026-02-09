import { motion } from "framer-motion";
import { BookOpen, Target, Shield, Heart, Eye, Users, ChevronRight } from "lucide-react";
import { useState } from "react";

const goals = [
  {
    icon: Target,
    title: "Understand Your Stability",
    description:
      "Your everyday movements tell a story. This app translates your walking patterns into a simple percentage score so you can see how stable you are — before a fall ever happens.",
  },
  {
    icon: Eye,
    title: "Recognize Risky Patterns",
    description:
      "Small changes in how you walk can signal bigger risks. The app watches for uneven steps, sudden jerks, and balance shifts so you can catch problems early.",
  },
  {
    icon: Shield,
    title: "Prevent Falls, Not Just Detect Them",
    description:
      "Unlike emergency alarms that react after a fall, this app helps you avoid falls altogether by giving you awareness and actionable guidance.",
  },
  {
    icon: Heart,
    title: "Build Safer Habits",
    description:
      "With regular walking tests and gentle alerts, you'll naturally develop awareness of how you move and learn to adapt for safer daily routines.",
  },
  {
    icon: Users,
    title: "Support Caregivers Too",
    description:
      "Whether you're a senior, a family caregiver, or a healthcare provider — this app gives everyone a shared, clear picture of mobility health.",
  },
];

const happyNotes = [
  "You're doing amazing — every step counts! 🌟",
  "Keep it up! Your commitment to staying safe is inspiring! 💪",
  "You've got this! Small steps lead to big confidence! 🎉",
  "Your health journey matters — we're cheering for you! ❤️",
  "Walking today? That's already a win! 🏆",
  "Remember: progress, not perfection! You're wonderful! ☀️",
];

const tips = [
  {
    title: "How to Take a Walking Test",
    steps: [
      "Go to the Test tab at the bottom of the screen",
      "Tap 'Start Test' and hold your phone in your hand or pocket",
      "Walk naturally for at least 15 seconds — don't rush",
      "Tap 'Stop Test' when you're done",
      "View your stability score and what it means",
    ],
  },
  {
    title: "Understanding Your Score",
    steps: [
      "75–100%: Stable — your movement looks great, keep it up!",
      "50–74%: Moderate — some unsteadiness, stay aware of your surroundings",
      "25–49%: Caution — consider slower movements and holding railings",
      "Below 25%: High Risk — talk to your doctor about balance exercises",
    ],
  },
  {
    title: "What Affects Your Score",
    steps: [
      "Walking surface — uneven ground or slopes increase risk",
      "Temperature — heat can cause dizziness and affect balance",
      "Footwear — loose or slippery shoes change your stability",
      "Time of day — we're often less steady when tired",
    ],
  },
  {
    title: "Tips for Safer Walking",
    steps: [
      "Wear supportive, non-slip shoes",
      "Take your time — rushing increases fall risk",
      "Use handrails on stairs and slopes",
      "Keep walkways clear of clutter",
      "Stay hydrated, especially in warm weather",
      "Do gentle balance exercises regularly",
    ],
  },
];

const Training = () => {
  const [openTip, setOpenTip] = useState<number | null>(0);

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-foreground">Learn & Stay Safe</h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Understand how this app helps you move with confidence
        </p>
      </motion.div>

      {/* Mission Statement */}
      <motion.div
        className="bg-primary/10 border border-primary/20 rounded-3xl p-5"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
      >
        <div className="flex items-center gap-2 mb-2">
          <BookOpen className="w-5 h-5 text-primary" />
          <h2 className="text-base font-semibold text-foreground">Our Mission</h2>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          We help seniors understand their movement stability{" "}
          <span className="font-semibold text-foreground">before</span> a fall happens —
          by turning everyday motion into a clear, easy-to-understand stability score.
          No complicated medical jargon, just simple guidance to keep you safe.
        </p>
      </motion.div>

      {/* Happy Notes */}
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-3">
          Words of Encouragement 💛
        </h2>
        <div className="grid grid-cols-2 gap-2">
          {happyNotes.map((note, i) => (
            <motion.div
              key={i}
              className="bg-primary/10 border border-primary/20 rounded-2xl p-3 text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 + i * 0.05 }}
            >
              <p className="text-xs font-medium text-foreground leading-relaxed">
                {note}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Goals */}
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-3">
          What This App Does For You
        </h2>
        <div className="space-y-3">
          {goals.map((goal, i) => (
            <motion.div
              key={goal.title}
              className="bg-card rounded-2xl border border-border p-4 flex gap-3"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 + i * 0.06 }}
            >
              <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                <goal.icon className="w-4 h-4 text-primary" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground">{goal.title}</h3>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                  {goal.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Training Tips — Accordion */}
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-3">
          Quick Guides
        </h2>
        <div className="space-y-2">
          {tips.map((tip, i) => {
            const isOpen = openTip === i;
            return (
              <motion.div
                key={tip.title}
                className="bg-card rounded-2xl border border-border overflow-hidden"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.05 }}
              >
                <button
                  onClick={() => setOpenTip(isOpen ? null : i)}
                  className="w-full flex items-center justify-between p-4 text-left"
                >
                  <span className="text-sm font-semibold text-foreground">
                    {tip.title}
                  </span>
                  <ChevronRight
                    className={`w-4 h-4 text-muted-foreground transition-transform ${
                      isOpen ? "rotate-90" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <motion.div
                    className="px-4 pb-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <ol className="space-y-2">
                      {tip.steps.map((step, j) => (
                        <li
                          key={j}
                          className="flex items-start gap-2 text-xs text-muted-foreground leading-relaxed"
                        >
                          <span className="text-primary font-bold shrink-0">
                            {j + 1}.
                          </span>
                          {step}
                        </li>
                      ))}
                    </ol>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Training;
