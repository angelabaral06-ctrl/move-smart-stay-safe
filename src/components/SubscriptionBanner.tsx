import { motion } from "framer-motion";
import { Crown, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import natureBanner from "@/assets/nature-banner.jpg";

const SubscriptionBanner = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      className="relative rounded-2xl overflow-hidden cursor-pointer shadow-lg"
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
      <div className="relative bg-gradient-to-r from-foreground/70 via-foreground/40 to-transparent p-5 flex items-center gap-3">
        <div className="w-11 h-11 rounded-full bg-primary/30 backdrop-blur-sm flex items-center justify-center shrink-0 border border-primary/20">
          <Crown className="w-5 h-5 text-primary-foreground" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-primary-foreground drop-shadow-sm">Upgrade to Premium</p>
          <p className="text-xs text-primary-foreground/80 mt-0.5 drop-shadow-sm">
            Unlock heat alerts, training & emergency features
          </p>
        </div>
        <ArrowRight className="w-5 h-5 text-primary-foreground shrink-0 drop-shadow-sm" />
      </div>
    </motion.div>
  );
};

export default SubscriptionBanner;
