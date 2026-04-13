import { createContext, useContext, useState, useCallback } from "react";

export interface TUGResult {
  timeSeconds: number;
  riskLevel: "low" | "moderate" | "high";
  date: string;
}

export interface ChairStandResult {
  count: number;
  riskLevel: "low" | "moderate" | "high";
  date: string;
}

export interface BalanceResult {
  stages: { name: string; seconds: number; passed: boolean }[];
  riskLevel: "low" | "moderate" | "high";
  date: string;
}

export interface SteadiResults {
  tug: TUGResult | null;
  chairStand: ChairStandResult | null;
  balance: BalanceResult | null;
  overallRiskPercent: number;
  overallRiskLevel: "low" | "moderate" | "high" | "none";
}

const calculateOverallRisk = (
  tug: TUGResult | null,
  chair: ChairStandResult | null,
  balance: BalanceResult | null
): { percent: number; level: "low" | "moderate" | "high" | "none" } => {
  const results = [tug, chair, balance].filter(Boolean);
  if (results.length === 0) return { percent: 0, level: "none" };

  let riskPoints = 0;
  let total = 0;

  if (tug) {
    total += 100;
    if (tug.riskLevel === "high") riskPoints += 100;
    else if (tug.riskLevel === "moderate") riskPoints += 50;
    else riskPoints += 10;
  }
  if (chair) {
    total += 100;
    if (chair.riskLevel === "high") riskPoints += 100;
    else if (chair.riskLevel === "moderate") riskPoints += 50;
    else riskPoints += 10;
  }
  if (balance) {
    total += 100;
    if (balance.riskLevel === "high") riskPoints += 100;
    else if (balance.riskLevel === "moderate") riskPoints += 50;
    else riskPoints += 10;
  }

  const percent = Math.round((riskPoints / total) * 100);
  const level = percent >= 70 ? "high" : percent >= 40 ? "moderate" : "low";
  return { percent, level };
};

export const useSteadiScore = () => {
  const [tug, setTug] = useState<TUGResult | null>(null);
  const [chairStand, setChairStand] = useState<ChairStandResult | null>(null);
  const [balance, setBalance] = useState<BalanceResult | null>(null);

  const saveTUG = useCallback((timeSeconds: number) => {
    const riskLevel = timeSeconds > 20 ? "high" : timeSeconds > 12 ? "moderate" : "low";
    setTug({ timeSeconds, riskLevel, date: new Date().toISOString() });
  }, []);

  const saveChairStand = useCallback((count: number) => {
    const riskLevel = count < 8 ? "high" : count < 12 ? "moderate" : "low";
    setChairStand({ count, riskLevel, date: new Date().toISOString() });
  }, []);

  const saveBalance = useCallback((stages: { name: string; seconds: number; passed: boolean }[]) => {
    const failedAny = stages.some((s) => !s.passed);
    const riskLevel = failedAny ? "high" : "low";
    setBalance({ stages, riskLevel, date: new Date().toISOString() });
  }, []);

  const { percent, level } = calculateOverallRisk(tug, chairStand, balance);

  return {
    tug,
    chairStand,
    balance,
    overallRiskPercent: percent,
    overallRiskLevel: level,
    saveTUG,
    saveChairStand,
    saveBalance,
  };
};
