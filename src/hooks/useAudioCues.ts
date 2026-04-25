"use client";

import { useCallback, useRef } from "react";

export function useAudioCues() {
  const ctxRef = useRef<AudioContext | null>(null);

  function getCtx(): AudioContext {
    if (!ctxRef.current) {
      ctxRef.current = new AudioContext();
    }
    return ctxRef.current;
  }

  const playBeep = useCallback(
    (frequency: number, duration: number, volume = 0.5, delay = 0) => {
      const ctx = getCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.value = frequency;
      osc.type = "sine";
      gain.gain.setValueAtTime(0, ctx.currentTime + delay);
      gain.gain.linearRampToValueAtTime(volume, ctx.currentTime + delay + 0.01);
      gain.gain.linearRampToValueAtTime(0, ctx.currentTime + delay + duration - 0.01);
      osc.start(ctx.currentTime + delay);
      osc.stop(ctx.currentTime + delay + duration);
    },
    [],
  );

  /** 3-2-1 countdown: three short beeps */
  const playCountdown = useCallback(() => {
    playBeep(880, 0.15, 0.4, 0);
    playBeep(880, 0.15, 0.4, 1);
    playBeep(1320, 0.15, 0.6, 2);
  }, [playBeep]);

  /** Long beep to mark interval start */
  const playGo = useCallback(() => {
    playBeep(1320, 0.5, 0.7);
  }, [playBeep]);

  /** Long beep to mark interval end */
  const playStop = useCallback(() => {
    playBeep(660, 0.5, 0.7);
  }, [playBeep]);

  /** Three short beeps for last 3 seconds of recovery */
  const playRecoveryEnd = useCallback(() => {
    playBeep(880, 0.1, 0.4, 0);
    playBeep(880, 0.1, 0.4, 1);
    playBeep(1320, 0.1, 0.6, 2);
  }, [playBeep]);

  /** Resume AudioContext (required after user gesture on iOS) */
  const resume = useCallback(async () => {
    const ctx = getCtx();
    if (ctx.state === "suspended") await ctx.resume();
  }, []);

  return { playCountdown, playGo, playStop, playRecoveryEnd, resume };
}
