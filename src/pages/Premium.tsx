import { motion } from "framer-motion";
import { Crown, Check, Leaf, Shield, Thermometer, BookOpen, Phone, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
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

  return (
    <div className="space-y-6">
      {/* Hero with nature image */}
      <motion.div
        className="relative rounded-2xl overflow-hidden -mx-5 -mt-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <img
          src={premiumNature}
          alt="Premium nature scene"
          className="w-full h-48 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 w-9 h-9 rounded-xl bg-background/60 backdrop-blur-sm border border-border/50 flex items-center justify-center"
        >
          <ArrowLeft className="w-4 h-4 text-foreground" />
        </button>
        <div className="absolute bottom-4 left-5">
          <h1 className="text-2xl font-bold text-foreground">Premium</h1>
          <p className="text-sm text-muted-foreground">Choose your plan</p>
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

        <button className="w-full py-3 rounded-xl bg-primary text-primary-foreground text-sm font-bold shadow-lg shadow-primary/20 active:scale-[0.98] transition-transform">
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
