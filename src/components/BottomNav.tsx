import { useLocation, useNavigate } from "react-router-dom";
import { Home, Activity, BookOpen, ClipboardList, Phone } from "lucide-react";
import { motion } from "framer-motion";

const navItems = [
  { path: "/", icon: Home, label: "Home" },
  { path: "/test", icon: Activity, label: "Test" },
  { path: "/activity", icon: ClipboardList, label: "Log" },
  { path: "/training", icon: BookOpen, label: "Learn" },
  { path: "/emergency", icon: Phone, label: "Help" },
];

const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-xl border-t border-border">
      <div className="flex items-center justify-around max-w-lg mx-auto px-4 py-2 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
        {navItems.map(({ path, icon: Icon, label }) => {
          const isActive = location.pathname === path;
          return (
            <button
              key={path}
              onClick={() => navigate(path)}
              className="relative flex flex-col items-center gap-0.5 px-4 py-2 rounded-xl transition-colors"
            >
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-accent rounded-xl"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <Icon
                className={`relative z-10 w-5 h-5 transition-colors ${
                  isActive ? "text-accent-foreground" : "text-muted-foreground"
                }`}
              />
              <span
                className={`relative z-10 text-xs font-medium transition-colors ${
                  isActive ? "text-accent-foreground" : "text-muted-foreground"
                }`}
              >
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
