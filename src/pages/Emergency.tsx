import { motion } from "framer-motion";
import { Phone, Heart, Shield, MessageCircle } from "lucide-react";

const contacts = [
  { name: "Emergency Services", number: "911", icon: Phone, urgent: true },
  { name: "Dr. Smith", number: "+1 555-0123", icon: Heart, urgent: false },
  { name: "Family Contact", number: "+1 555-0456", icon: MessageCircle, urgent: false },
];

const Emergency = () => {
  const handleCall = (number: string) => {
    window.open(`tel:${number}`);
  };

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-foreground">Emergency Help</h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Quick access to emergency contacts
        </p>
      </motion.div>

      {/* Emergency Call Button */}
      <motion.button
        className="w-full bg-destructive text-destructive-foreground rounded-3xl p-8 flex flex-col items-center gap-3 shadow-lg active:scale-95 transition-transform"
        onClick={() => handleCall("911")}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="relative">
          <Phone className="w-12 h-12" />
          <div className="absolute -inset-3 rounded-full bg-destructive-foreground/20 animate-pulse-ring" />
        </div>
        <span className="text-xl font-bold">Call Emergency</span>
        <span className="text-sm opacity-80">Tap to call 911</span>
      </motion.button>

      {/* Quick Contacts */}
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-3">
          Quick Contacts
        </h2>
        <div className="space-y-3">
          {contacts.map((contact, i) => (
            <motion.button
              key={contact.name}
              className="w-full flex items-center gap-4 p-4 bg-card rounded-2xl border border-border text-left active:scale-[0.98] transition-transform"
              onClick={() => handleCall(contact.number)}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${
                contact.urgent ? "bg-destructive/10" : "bg-primary/10"
              }`}>
                <contact.icon className={`w-5 h-5 ${
                  contact.urgent ? "text-destructive" : "text-primary"
                }`} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-foreground">{contact.name}</p>
                <p className="text-xs text-muted-foreground">{contact.number}</p>
              </div>
              <Phone className="w-4 h-4 text-muted-foreground" />
            </motion.button>
          ))}
        </div>
      </div>

      {/* Safety Tips */}
      <motion.div
        className="bg-card rounded-2xl border border-border p-5"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex items-center gap-2 mb-3">
          <Shield className="w-4 h-4 text-primary" />
          <h3 className="text-sm font-semibold text-foreground">If you feel unsteady</h3>
        </div>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>• Stop walking and hold onto something stable</li>
          <li>• Sit down slowly if possible</li>
          <li>• Take deep breaths and wait for dizziness to pass</li>
          <li>• Call someone if you need help</li>
          <li>• Wait until you feel balanced before moving again</li>
          <li>• If you fall, check for injuries before trying to get up</li>
        </ul>
      </motion.div>

      {/* Supportive message */}
      <motion.div
        className="bg-primary/10 border border-primary/20 rounded-2xl p-5 text-center"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Heart className="w-6 h-6 text-primary mx-auto mb-2" />
        <p className="text-sm font-semibold text-foreground">
          Remember, you are not alone in this journey ❤️
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          Your safety and well-being matter to us and to everyone who cares about you.
        </p>
      </motion.div>
    </div>
  );
};

export default Emergency;
