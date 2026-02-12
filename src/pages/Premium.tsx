import { motion } from "framer-motion";
import { Crown, Check, Leaf, Shield, Thermometer, BookOpen, Phone, ArrowLeft, Sparkles, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { usePremium } from "@/hooks/usePremium";
import premiumNature from "@/assets/premium-nature.jpg";

const freePlan = [
  "Basic stability tracking",
  "Surface detection",
  "Walking test (basic)",
  "Activity log",
];

const premiumFeatures = [
  { icon: Thermometer, label: "Heat & weather risk alerts" },
  { icon: BookOpen, label: "Personalized training modules" },
  { icon: Phone, label: "Caregiver notifications" },
  { icon: Shield, label: "Priority emergency response" },
];

const Premium = () => {
  const navigate = useNavigate();
  const { isPremium, setPremium } = usePremium();

  if (isPremium) {
    return (
      <div className="space-y-6">
        {/* Premium Active Hero */}
        <motion.div
          className="relative rounded-2xl overflow-hidden -mx-5 -mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <img src={premiumNature} alt="Premium nature scene" className="w-full h-48 object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
          <button
            onClick={() => navigate(-1)}
            className="absolute top-4 left-4 w-9 h-9 rounded-xl bg-background/60 backdrop-blur-sm border border-border/50 flex items-center justify-center"
          >
            <ArrowLeft className="w-4 h-4 text-foreground" />
          </button>
          <div className="absolute bottom-4 left-5 flex items-center gap-2">
            <Crown className="w-6 h-6 text-primary" />
            <div>
              <h1 className="text-2xl font-bold text-foreground">Premium Active</h1>
              <p className="text-sm text-muted-foreground">Full safety suite enabled</p>
            </div>
          </div>
        </motion.div>

        {/* Status Card */}
        <motion.div
          className="bg-primary/10 border border-primary/20 rounded-2xl p-5 flex items-center gap-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
        >
          <Sparkles className="w-5 h-5 text-primary shrink-0" />
          <div>
            <p className="text-sm font-semibold text-foreground">You're a Premium member!</p>
            <p className="text-xs text-muted-foreground">All features are unlocked for you.</p>
          </div>
        </motion.div>

        {/* Active Features */}
        <motion.div
          className="bg-card rounded-2xl border border-border p-5 space-y-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h2 className="text-base font-semibold text-foreground">Your Active Features</h2>
          <div className="space-y-3">
            {[...freePlan, ...premiumFeatures.map((f) => f.label)].map((f) => (
              <div key={f} className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-safe/10 flex items-center justify-center">
                  <Check className="w-3 h-3 text-safe" />
                </div>
                <span className="text-sm text-foreground">{f}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Subscription Info */}
        <motion.div
          className="bg-card rounded-2xl border border-border p-4 space-y-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
        >
          <h3 className="text-sm font-semibold text-foreground">Subscription</h3>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Plan</span>
            <span className="font-semibold text-foreground">Premium — $4.99/mo</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Status</span>
            <span className="font-semibold text-safe">Active</span>
          </div>
          <button
            onClick={() => setPremium(false)}
            className="w-full mt-2 py-2.5 rounded-xl bg-destructive/10 text-destructive text-sm font-semibold active:scale-[0.98] transition-transform"
          >
            Cancel Subscription
          </button>
        </motion.div>
      </div>
    );
  }

  // Non-premium layout
  return (
    <div className="space-y-6">
      {/* Hero with nature image */}
      <motion.div
        className="relative rounded-2xl overflow-hidden -mx-5 -mt-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <img src={premiumNature} alt="Premium nature scene" className="w-full h-48 object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 w-9 h-9 rounded-xl bg-background/60 backdrop-blur-sm border border-border/50 flex items-center justify-center"
        >
          <ArrowLeft className="w-4 h-4 text-foreground" />
        </button>
        <div className="absolute bottom-4 left-5">
          <h1 className="text-2xl font-bold text-foreground">Go Premium</h1>
          <p className="text-sm text-muted-foreground">Unlock your full safety suite</p>
        </div>
      </motion.div>

      {/* Free Plan */}
      <motion.div
        className="bg-card rounded-2xl border border-border p-5 space-y-4"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
      >
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Leaf className="w-5 h-5 text-safe" />
              <h2 className="text-lg font-bold text-foreground">Free</h2>
            </div>
            <p className="text-sm text-muted-foreground mt-0.5">Basic safety features</p>
          </div>
          <span className="text-2xl font-bold text-foreground">$0</span>
        </div>
        <div className="space-y-2.5">
          {freePlan.map((f) => (
            <div key={f} className="flex items-center gap-2.5">
              <Check className="w-4 h-4 text-safe shrink-0" />
              <span className="text-sm text-foreground">{f}</span>
            </div>
          ))}
        </div>
        <button className="w-full py-3 rounded-xl bg-secondary text-secondary-foreground text-sm font-semibold">
          Current Plan
        </button>
      </motion.div>

      {/* Premium Plan */}
      <motion.div
        className="bg-card rounded-2xl border-2 border-primary/30 p-5 space-y-4 relative overflow-hidden"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-bl-xl">
          RECOMMENDED
        </div>
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Crown className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-bold text-foreground">Premium</h2>
            </div>
            <p className="text-sm text-muted-foreground mt-0.5">Full safety suite</p>
          </div>
          <div className="text-right">
            <span className="text-2xl font-bold text-foreground">$4.99</span>
            <span className="text-sm text-muted-foreground">/mo</span>
          </div>
        </div>

        <div className="space-y-2.5">
          {freePlan.map((f) => (
            <div key={f} className="flex items-center gap-2.5">
              <Check className="w-4 h-4 text-safe shrink-0" />
              <span className="text-sm text-foreground">{f}</span>
            </div>
          ))}
          <div className="border-t border-border my-2" />
          {premiumFeatures.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-2.5">
              <Icon className="w-4 h-4 text-primary shrink-0" />
              <span className="text-sm font-medium text-foreground">{label}</span>
            </div>
          ))}
        </div>

        <button
          onClick={() => setPremium(true)}
          className="w-full py-3 rounded-xl bg-primary text-primary-foreground text-sm font-bold shadow-lg shadow-primary/20 active:scale-[0.98] transition-transform"
        >
          Upgrade Now — $4.99/mo
        </button>
      </motion.div>

      {/* FAQ */}
      <motion.div
        className="bg-card rounded-2xl border border-border p-4 space-y-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15 }}
      >
        <h3 className="text-sm font-semibold text-foreground">Frequently Asked</h3>
        <div className="space-y-2 text-sm text-muted-foreground">
          <p><span className="font-medium text-foreground">Can I cancel?</span> — Yes, anytime with no fees.</p>
          <p><span className="font-medium text-foreground">Free trial?</span> — 7-day free trial included.</p>
          <p><span className="font-medium text-foreground">Refunds?</span> — Full refund within 30 days.</p>
        </div>
      </motion.div>
    </div>
  );
};

export default Premium;
