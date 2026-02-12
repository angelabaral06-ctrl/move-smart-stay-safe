import { useState, useCallback } from "react";

// Simple client-side premium state (mockup — no backend persistence)
let _isPremium = false;
const listeners = new Set<() => void>();

export const usePremium = () => {
  const [isPremium, setLocal] = useState(_isPremium);

  const setPremium = useCallback((val: boolean) => {
    _isPremium = val;
    listeners.forEach((fn) => fn());
  }, []);

  // Subscribe to global changes
  useState(() => {
    const sync = () => setLocal(_isPremium);
    listeners.add(sync);
    return () => { listeners.delete(sync); };
  });

  return { isPremium, setPremium };
};
