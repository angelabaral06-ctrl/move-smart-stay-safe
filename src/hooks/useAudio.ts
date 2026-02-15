import { useRef, useCallback } from "react";

// Generate a smooth jazz-like melody using Web Audio API
export const useJazzAudio = () => {
  const contextRef = useRef<AudioContext | null>(null);
  const isPlayingRef = useRef(false);
  const nodesRef = useRef<AudioNode[]>([]);
  const timeoutsRef = useRef<number[]>([]);

  const stop = useCallback(() => {
    isPlayingRef.current = false;
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
    nodesRef.current.forEach((n) => {
      try { (n as OscillatorNode).stop?.(); } catch {}
      try { n.disconnect(); } catch {}
    });
    nodesRef.current = [];
    if (contextRef.current) {
      contextRef.current.close().catch(() => {});
      contextRef.current = null;
    }
  }, []);

  const play = useCallback(() => {
    stop();
    const ctx = new AudioContext();
    contextRef.current = ctx;
    isPlayingRef.current = true;

    // Jazz chord progression (ii-V-I-vi in C major, smooth voicings)
    const chords = [
      [293.66, 349.23, 440.00], // Dm7
      [392.00, 493.88, 587.33], // G7
      [261.63, 329.63, 392.00], // Cmaj7
      [220.00, 261.63, 329.63], // Am7
      [293.66, 369.99, 440.00], // Dm9
      [392.00, 493.88, 622.25], // G13
      [261.63, 329.63, 415.30], // Cmaj9
      [220.00, 277.18, 349.23], // Am9
    ];

    // Walking bass notes
    const bassNotes = [146.83, 196.00, 130.81, 110.00, 146.83, 196.00, 130.81, 110.00];

    const masterGain = ctx.createGain();
    masterGain.gain.value = 0.15;
    masterGain.connect(ctx.destination);
    nodesRef.current.push(masterGain);

    const playLoop = (startTime: number) => {
      if (!isPlayingRef.current) return;

      chords.forEach((chord, i) => {
        const chordTime = startTime + i * 2;

        // Pad chords (warm sine + triangle blend)
        chord.forEach((freq) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = "sine";
          osc.frequency.value = freq;
          gain.gain.setValueAtTime(0, chordTime);
          gain.gain.linearRampToValueAtTime(0.08, chordTime + 0.3);
          gain.gain.linearRampToValueAtTime(0.05, chordTime + 1.5);
          gain.gain.linearRampToValueAtTime(0, chordTime + 2.0);
          osc.connect(gain);
          gain.connect(masterGain);
          osc.start(chordTime);
          osc.stop(chordTime + 2.1);
          nodesRef.current.push(osc, gain);
        });

        // Walking bass
        const bassOsc = ctx.createOscillator();
        const bassGain = ctx.createGain();
        bassOsc.type = "triangle";
        bassOsc.frequency.value = bassNotes[i];
        bassGain.gain.setValueAtTime(0, chordTime);
        bassGain.gain.linearRampToValueAtTime(0.12, chordTime + 0.1);
        bassGain.gain.linearRampToValueAtTime(0.06, chordTime + 1.0);
        bassGain.gain.linearRampToValueAtTime(0, chordTime + 1.9);
        bassOsc.connect(bassGain);
        bassGain.connect(masterGain);
        bassOsc.start(chordTime);
        bassOsc.stop(chordTime + 2.0);
        nodesRef.current.push(bassOsc, bassGain);

        // Soft melodic "brush" hits (hi-hat simulation)
        for (let b = 0; b < 4; b++) {
          const beatTime = chordTime + b * 0.5;
          const noiseLen = 0.06;
          const bufferSize = ctx.sampleRate * noiseLen;
          const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
          const data = buffer.getChannelData(0);
          for (let s = 0; s < bufferSize; s++) {
            data[s] = (Math.random() * 2 - 1) * (1 - s / bufferSize);
          }
          const src = ctx.createBufferSource();
          src.buffer = buffer;
          const hiGain = ctx.createGain();
          hiGain.gain.setValueAtTime(b % 2 === 0 ? 0.03 : 0.015, beatTime);
          const hiFilter = ctx.createBiquadFilter();
          hiFilter.type = "highpass";
          hiFilter.frequency.value = 8000;
          src.connect(hiFilter);
          hiFilter.connect(hiGain);
          hiGain.connect(masterGain);
          src.start(beatTime);
          nodesRef.current.push(src, hiGain, hiFilter);
        }
      });

      // Schedule next loop
      const loopDuration = chords.length * 2;
      const id = window.setTimeout(() => playLoop(startTime + loopDuration), (loopDuration - 0.5) * 1000);
      timeoutsRef.current.push(id);
    };

    playLoop(ctx.currentTime + 0.1);
  }, [stop]);

  return { play, stop };
};

// Alert sound for unsteady detection
export const playAlertSound = () => {
  try {
    const ctx = new AudioContext();
    const masterGain = ctx.createGain();
    masterGain.gain.value = 0.3;
    masterGain.connect(ctx.destination);

    // Two-tone alert (descending)
    [880, 660].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.value = freq;
      const t = ctx.currentTime + i * 0.25;
      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(0.4, t + 0.05);
      gain.gain.linearRampToValueAtTime(0, t + 0.2);
      osc.connect(gain);
      gain.connect(masterGain);
      osc.start(t);
      osc.stop(t + 0.25);
    });

    setTimeout(() => ctx.close(), 1000);
  } catch {}
};
