import { motion } from "framer-motion";
import { Crown, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import natureBanner from "@/assets/nature-banner.jpg";

const SubscriptionBanner = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      className="relative rounded-2xl overflow-hidden cursor-pointer"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => navigate("/premium")}
    >
      <img
        src={natureBanner}
        alt="Nature background"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="relative bg-gradient-to-r from-background/80 to-background/40 p-4 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
          <Crown className="w-5 h-5 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-foreground">Upgrade to Premium</p>
          <p className="text-xs text-muted-foreground mt-0.5">
            Unlock heat alerts, training & emergency features
          </p>
        </div>
        <ArrowRight className="w-5 h-5 text-primary shrink-0" />
      </div>
    </motion.div>
  );
};

export default SubscriptionBanner;
