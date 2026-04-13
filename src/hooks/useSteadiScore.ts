import { useState, useCallback } from "react";

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

export interface WalkingResult {
  score: number;
  avgJerk: number;
  maxTilt: number;
  totalAccMagnitude: number;
  isUnstable: boolean;
  durationSeconds: number;
  date: string;
}

export interface SteadiResults {
  tug: TUGResult | null;
  chairStand: ChairStandResult | null;
  balance: BalanceResult | null;
  walking: WalkingResult | null;
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

/** Derive gait speed estimate from acceleration magnitude and duration */
const estimateGaitSpeed = (walking: WalkingResult | null): number | null => {
  if (!walking) return null;
  // Rough estimate: subtract gravity (~9.8), scale remainder to approximate m/s
  const netAcc = Math.max(0, walking.totalAccMagnitude - 9.8);
  return Math.round((netAcc * 0.8 + 0.3) * 100) / 100;
};

/** Derive symmetry % from avgJerk (lower jerk = more symmetric gait) */
const estimateSymmetry = (walking: WalkingResult | null): number | null => {
  if (!walking) return null;
  // Map avgJerk 0-30 → symmetry 100%-0%
  return Math.max(0, Math.min(100, Math.round(100 - (walking.avgJerk / 30) * 100)));
};

/** Calculate a FES-I inspired confidence score from all tests (0-64 scale) */
const calculateFESI = (
  tug: TUGResult | null,
  chair: ChairStandResult | null,
  balance: BalanceResult | null,
  walking: WalkingResult | null
): number => {
  const tests = [tug, chair, balance, walking].filter(Boolean);
  if (tests.length === 0) return 0;

  let score = 0;
  // Each test contributes up to 16 points (total 64 for all 4)
  if (tug) {
    score += tug.riskLevel === "low" ? 16 : tug.riskLevel === "moderate" ? 10 : 4;
  }
  if (chair) {
    score += chair.riskLevel === "low" ? 16 : chair.riskLevel === "moderate" ? 10 : 4;
  }
  if (balance) {
    score += balance.riskLevel === "low" ? 16 : balance.riskLevel === "moderate" ? 10 : 4;
  }
  if (walking) {
    score += walking.isUnstable ? 4 : walking.score >= 70 ? 16 : 10;
  }
  return score;
};

export const useSteadiScore = () => {
  const [tug, setTug] = useState<TUGResult | null>(null);
  const [chairStand, setChairStand] = useState<ChairStandResult | null>(null);
  const [balance, setBalance] = useState<BalanceResult | null>(null);
  const [walking, setWalking] = useState<WalkingResult | null>(null);

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

  const saveWalking = useCallback((analysis: {
    score: number; avgJerk: number; maxTilt: number;
    totalAccMagnitude: number; isUnstable: boolean;
  }, durationSeconds: number) => {
    setWalking({
      ...analysis,
      durationSeconds,
      date: new Date().toISOString(),
    });
  }, []);

  const { percent, level } = calculateOverallRisk(tug, chairStand, balance);
  const gaitSpeed = estimateGaitSpeed(walking);
  const symmetry = estimateSymmetry(walking);
  const fesiScore = calculateFESI(tug, chairStand, balance, walking);
  const fearOfFalling = Math.max(0, Math.min(100, Math.round(100 - (fesiScore / 64) * 100)));

  return {
    tug,
    chairStand,
    balance,
    walking,
    overallRiskPercent: percent,
    overallRiskLevel: level,
    gaitSpeed,
    symmetry,
    fesiScore,
    fearOfFalling,
    saveTUG,
    saveChairStand,
    saveBalance,
    saveWalking,
  };
};
