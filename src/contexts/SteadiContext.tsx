import React, { createContext, useContext } from "react";
import { useSteadiScore } from "@/hooks/useSteadiScore";

type SteadiContextType = ReturnType<typeof useSteadiScore>;

const SteadiContext = createContext<SteadiContextType | null>(null);

export const SteadiProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const steadi = useSteadiScore();
  return <SteadiContext.Provider value={steadi}>{children}</SteadiContext.Provider>;
};

export const useSteadi = () => {
  const ctx = useContext(SteadiContext);
  if (!ctx) throw new Error("useSteadi must be used within SteadiProvider");
  return ctx;
};
