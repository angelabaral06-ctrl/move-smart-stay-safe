import { useState, useCallback, useRef, useEffect } from "react";

export interface MotionReading {
  x: number;
  y: number;
  z: number;
  timestamp: number;
}

export interface MotionAnalysis {
  score: number;
  readings: MotionReading[];
  isUnstable: boolean;
  avgJerk: number;
  maxTilt: number;
}

const calculateScore = (readings: MotionReading[]): MotionAnalysis => {
  if (readings.length < 10) {
    return { score: 100, readings, isUnstable: false, avgJerk: 0, maxTilt: 0 };
  }

  // Calculate jerk (rate of change of acceleration)
  let totalJerk = 0;
  let maxTilt = 0;

  for (let i = 1; i < readings.length; i++) {
    const dt = (readings[i].timestamp - readings[i - 1].timestamp) / 1000;
    if (dt === 0) continue;

    const jx = Math.abs(readings[i].x - readings[i - 1].x) / dt;
    const jy = Math.abs(readings[i].y - readings[i - 1].y) / dt;
    const jz = Math.abs(readings[i].z - readings[i - 1].z) / dt;
    const jerk = Math.sqrt(jx * jx + jy * jy + jz * jz);
    totalJerk += jerk;

    const tilt = Math.abs(readings[i].x) + Math.abs(readings[i].y);
    maxTilt = Math.max(maxTilt, tilt);
  }

  const avgJerk = totalJerk / (readings.length - 1);
  const isUnstable = avgJerk > 15 || maxTilt > 12;

  // Score: lower jerk = higher score
  const jerkPenalty = Math.min(avgJerk * 2, 60);
  const tiltPenalty = Math.min(maxTilt * 1.5, 30);
  const score = Math.max(0, Math.min(100, Math.round(100 - jerkPenalty - tiltPenalty)));

  return { score, readings, isUnstable, avgJerk, maxTilt };
};

export const useMotionSensor = () => {
  const [isTracking, setIsTracking] = useState(false);
  const [analysis, setAnalysis] = useState<MotionAnalysis | null>(null);
  const [isSupported, setIsSupported] = useState(true);
  const [elapsed, setElapsed] = useState(0);
  const readingsRef = useRef<MotionReading[]>([]);
  const startTimeRef = useRef<number>(0);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && !window.DeviceMotionEvent) {
      setIsSupported(false);
    }
  }, []);

  const handleMotion = useCallback((event: DeviceMotionEvent) => {
    const acc = event.accelerationIncludingGravity;
    if (!acc) return;
    readingsRef.current.push({
      x: acc.x ?? 0,
      y: acc.y ?? 0,
      z: acc.z ?? 0,
      timestamp: Date.now(),
    });
  }, []);

  const startTracking = useCallback(async () => {
    readingsRef.current = [];
    setAnalysis(null);
    setElapsed(0);
    startTimeRef.current = Date.now();

    // Request permission on iOS
    if (
      typeof (DeviceMotionEvent as any).requestPermission === "function"
    ) {
      try {
        const permission = await (DeviceMotionEvent as any).requestPermission();
        if (permission !== "granted") {
          setIsSupported(false);
          return;
        }
      } catch {
        setIsSupported(false);
        return;
      }
    }

    window.addEventListener("devicemotion", handleMotion);
    setIsTracking(true);

    // Simulate sensor data for desktop testing
    if (!window.DeviceMotionEvent || navigator.userAgent.includes("Win") || navigator.userAgent.includes("Mac")) {
      const simInterval = setInterval(() => {
        const t = (Date.now() - startTimeRef.current) / 1000;
        const wobble = Math.sin(t * 3) * (2 + Math.random() * 3);
        readingsRef.current.push({
          x: wobble + (Math.random() - 0.5) * 4,
          y: Math.cos(t * 2) * 1.5 + (Math.random() - 0.5) * 2,
          z: 9.8 + (Math.random() - 0.5) * 1,
          timestamp: Date.now(),
        });
      }, 50);

      setTimeout(() => clearInterval(simInterval), 30000);
    }

    timerRef.current = window.setInterval(() => {
      setElapsed(Math.floor((Date.now() - startTimeRef.current) / 1000));
    }, 1000);
  }, [handleMotion]);

  const stopTracking = useCallback(() => {
    window.removeEventListener("devicemotion", handleMotion);
    setIsTracking(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    const result = calculateScore(readingsRef.current);
    setAnalysis(result);
  }, [handleMotion]);

  return {
    isTracking,
    isSupported,
    analysis,
    elapsed,
    startTracking,
    stopTracking,
  };
};
