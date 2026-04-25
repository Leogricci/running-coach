import type { Plan } from "@/types/training";

export const plan10k: Plan = {
  id: "10k-12w",
  name: "10K — 12 Weeks",
  distance: "10k",
  durationWeeks: 12,
  weeks: [
    // ─── PHASE 1: BASE + SPEED ─── Weeks 1–6 ────────────────────────────────

    // Week 1
    {
      weekNumber: 1,
      phase: "base",
      sessions: [
        {
          id: "w1-mon",
          type: "easy_run",
          dayOfWeek: 0,
          distance_km: 8,
          target_pace: "5:30–6:00/km",
          notes: "Conversational pace — you should be able to speak full sentences.",
        },
        {
          id: "w1-tue",
          type: "speed",
          dayOfWeek: 1,
          distance_km: 8,
          warmup_notes: "10–15 min easy + drills (high knees, butt kicks, leg swings) + 3–4 accelerations over 80m",
          intervals: [
            {
              repetitions: 4,
              distance_m: 400,
              target_pace: "3:32/km",
              recovery_s: 120,
              notes: "≈ 1:25 per rep. Recovery = walk/very easy jog.",
            },
          ],
          notes: "Stop if pace slips — quality over quantity this week.",
        },
        { id: "w1-wed", type: "rest", dayOfWeek: 2, distance_km: 0 },
        {
          id: "w1-thu",
          type: "easy_run",
          dayOfWeek: 3,
          distance_km: 8,
          target_pace: "5:30–6:00/km",
        },
        { id: "w1-fri", type: "rest", dayOfWeek: 4, distance_km: 0 },
        {
          id: "w1-sat",
          type: "easy_run",
          dayOfWeek: 5,
          distance_km: 10,
          target_pace: "5:30–6:00/km",
        },
        { id: "w1-sun", type: "rest", dayOfWeek: 6, distance_km: 0 },
      ],
    },

    // Week 2
    {
      weekNumber: 2,
      phase: "base",
      sessions: [
        {
          id: "w2-mon",
          type: "easy_run",
          dayOfWeek: 0,
          distance_km: 8,
          target_pace: "5:30–6:00/km",
        },
        {
          id: "w2-tue",
          type: "speed",
          dayOfWeek: 1,
          distance_km: 9,
          warmup_notes: "10–15 min easy + drills + 3–4 accelerations",
          intervals: [
            {
              repetitions: 6,
              distance_m: 400,
              target_pace: "3:32/km",
              recovery_s: 120,
              notes: "≈ 1:25 per rep.",
            },
          ],
        },
        { id: "w2-wed", type: "rest", dayOfWeek: 2, distance_km: 0 },
        {
          id: "w2-thu",
          type: "easy_run",
          dayOfWeek: 3,
          distance_km: 8,
          target_pace: "5:30–6:00/km",
        },
        { id: "w2-fri", type: "rest", dayOfWeek: 4, distance_km: 0 },
        {
          id: "w2-sat",
          type: "easy_run",
          dayOfWeek: 5,
          distance_km: 10,
          target_pace: "5:30–6:00/km",
        },
        {
          id: "w2-sun",
          type: "easy_run",
          dayOfWeek: 6,
          distance_km: 8,
          target_pace: "5:30–6:00/km",
          notes: "Optional — skip if legs are heavy.",
        },
      ],
    },

    // Week 3
    {
      weekNumber: 3,
      phase: "base",
      sessions: [
        {
          id: "w3-mon",
          type: "easy_run",
          dayOfWeek: 0,
          distance_km: 8,
          target_pace: "5:30–6:00/km",
        },
        {
          id: "w3-tue",
          type: "speed",
          dayOfWeek: 1,
          distance_km: 10,
          warmup_notes: "10–15 min easy + drills + 3–4 accelerations",
          intervals: [
            {
              repetitions: 6,
              distance_m: 400,
              target_pace: "3:32/km",
              recovery_s: 120,
              notes: "≈ 1:25 per rep.",
            },
          ],
        },
        { id: "w3-wed", type: "rest", dayOfWeek: 2, distance_km: 0 },
        {
          id: "w3-thu",
          type: "easy_run",
          dayOfWeek: 3,
          distance_km: 8,
          target_pace: "5:30–6:00/km",
        },
        { id: "w3-fri", type: "rest", dayOfWeek: 4, distance_km: 0 },
        {
          id: "w3-sat",
          type: "easy_run",
          dayOfWeek: 5,
          distance_km: 10,
          target_pace: "5:30–6:00/km",
        },
        {
          id: "w3-sun",
          type: "easy_run",
          dayOfWeek: 6,
          distance_km: 8,
          target_pace: "5:30–6:00/km",
          notes: "Optional.",
        },
      ],
    },

    // Week 4
    {
      weekNumber: 4,
      phase: "base",
      sessions: [
        {
          id: "w4-mon",
          type: "easy_run",
          dayOfWeek: 0,
          distance_km: 8,
          target_pace: "5:30–6:00/km",
        },
        {
          id: "w4-tue",
          type: "speed",
          dayOfWeek: 1,
          distance_km: 11,
          warmup_notes: "10–15 min easy + drills + 3–4 accelerations",
          intervals: [
            {
              repetitions: 8,
              distance_m: 400,
              target_pace: "3:32/km",
              recovery_s: 120,
              notes: "≈ 1:25 per rep.",
            },
          ],
        },
        { id: "w4-wed", type: "rest", dayOfWeek: 2, distance_km: 0 },
        {
          id: "w4-thu",
          type: "easy_run",
          dayOfWeek: 3,
          distance_km: 8,
          target_pace: "5:30–6:00/km",
        },
        { id: "w4-fri", type: "rest", dayOfWeek: 4, distance_km: 0 },
        {
          id: "w4-sat",
          type: "easy_run",
          dayOfWeek: 5,
          distance_km: 10,
          target_pace: "5:30–6:00/km",
        },
        {
          id: "w4-sun",
          type: "easy_run",
          dayOfWeek: 6,
          distance_km: 8,
          target_pace: "5:30–6:00/km",
          notes: "Optional.",
        },
      ],
    },

    // Week 5
    {
      weekNumber: 5,
      phase: "base",
      sessions: [
        {
          id: "w5-mon",
          type: "easy_run",
          dayOfWeek: 0,
          distance_km: 9,
          target_pace: "5:30–6:00/km",
        },
        {
          id: "w5-tue",
          type: "speed",
          dayOfWeek: 1,
          distance_km: 11,
          warmup_notes: "10–15 min easy + drills + 3–4 accelerations",
          intervals: [
            {
              repetitions: 10,
              distance_m: 400,
              target_pace: "3:32/km",
              recovery_s: 120,
              notes: "≈ 1:25 per rep.",
            },
          ],
          notes: "Alternate option: 4–6 × 800m @ 2:55 (≈ 3:50/km).",
        },
        { id: "w5-wed", type: "rest", dayOfWeek: 2, distance_km: 0 },
        {
          id: "w5-thu",
          type: "easy_run",
          dayOfWeek: 3,
          distance_km: 9,
          target_pace: "5:30–6:00/km",
        },
        { id: "w5-fri", type: "rest", dayOfWeek: 4, distance_km: 0 },
        {
          id: "w5-sat",
          type: "easy_run",
          dayOfWeek: 5,
          distance_km: 10,
          target_pace: "5:30–6:00/km",
        },
        {
          id: "w5-sun",
          type: "easy_run",
          dayOfWeek: 6,
          distance_km: 8,
          target_pace: "5:30–6:00/km",
          notes: "Optional.",
        },
      ],
    },

    // Week 6
    {
      weekNumber: 6,
      phase: "base",
      sessions: [
        {
          id: "w6-mon",
          type: "easy_run",
          dayOfWeek: 0,
          distance_km: 9,
          target_pace: "5:30–6:00/km",
        },
        {
          id: "w6-tue",
          type: "speed",
          dayOfWeek: 1,
          distance_km: 12,
          warmup_notes: "10–15 min easy + drills + 3–4 accelerations",
          intervals: [
            {
              repetitions: 6,
              distance_m: 800,
              target_pace: "3:50/km",
              recovery_s: 120,
              notes: "≈ 2:55 per rep. Alternate: 8–10 × 400m @ 1:25.",
            },
          ],
        },
        { id: "w6-wed", type: "rest", dayOfWeek: 2, distance_km: 0 },
        {
          id: "w6-thu",
          type: "easy_run",
          dayOfWeek: 3,
          distance_km: 9,
          target_pace: "5:30–6:00/km",
        },
        { id: "w6-fri", type: "rest", dayOfWeek: 4, distance_km: 0 },
        {
          id: "w6-sat",
          type: "easy_run",
          dayOfWeek: 5,
          distance_km: 10,
          target_pace: "5:30–6:00/km",
        },
        {
          id: "w6-sun",
          type: "easy_run",
          dayOfWeek: 6,
          distance_km: 8,
          target_pace: "5:30–6:00/km",
          notes: "Optional.",
        },
      ],
    },

    // ─── PHASE 2: THRESHOLD ─── Weeks 7–8 ────────────────────────────────────

    // Week 7
    {
      weekNumber: 7,
      phase: "threshold",
      sessions: [
        {
          id: "w7-mon",
          type: "easy_run",
          dayOfWeek: 0,
          distance_km: 9,
          target_pace: "5:30–6:00/km",
        },
        {
          id: "w7-tue",
          type: "speed",
          dayOfWeek: 1,
          distance_km: 11,
          warmup_notes: "10–15 min easy + drills + 3–4 accelerations",
          intervals: [
            {
              repetitions: 6,
              distance_m: 400,
              target_pace: "3:32/km",
              recovery_s: 120,
              notes: "≈ 1:25 per rep. Alternate: 4–6 × 800m @ 2:55.",
            },
          ],
        },
        { id: "w7-wed", type: "rest", dayOfWeek: 2, distance_km: 0 },
        {
          id: "w7-thu",
          type: "threshold",
          dayOfWeek: 3,
          distance_km: 10,
          target_pace: "4:07–4:10/km",
          intervals: [
            {
              repetitions: 5,
              duration_s: 360,
              target_pace: "4:07–4:10/km",
              recovery_s: 90,
              notes: "Controlled effort — NOT all out. Alternate options: 3×8min, 4×7min, 2×10min.",
            },
          ],
          notes: "Threshold = comfortably hard. You can speak a few words but not full sentences.",
        },
        { id: "w7-fri", type: "rest", dayOfWeek: 4, distance_km: 0 },
        {
          id: "w7-sat",
          type: "easy_run",
          dayOfWeek: 5,
          distance_km: 10,
          target_pace: "5:30–6:00/km",
        },
        {
          id: "w7-sun",
          type: "easy_run",
          dayOfWeek: 6,
          distance_km: 8,
          target_pace: "5:30–6:00/km",
          notes: "Optional.",
        },
      ],
    },

    // Week 8
    {
      weekNumber: 8,
      phase: "threshold",
      sessions: [
        {
          id: "w8-mon",
          type: "easy_run",
          dayOfWeek: 0,
          distance_km: 9,
          target_pace: "5:30–6:00/km",
        },
        {
          id: "w8-tue",
          type: "speed",
          dayOfWeek: 1,
          distance_km: 12,
          warmup_notes: "10–15 min easy + drills + 3–4 accelerations",
          intervals: [
            {
              repetitions: 4,
              distance_m: 800,
              target_pace: "3:50/km",
              recovery_s: 120,
              notes: "≈ 2:55 per rep. Alternate: 6–8 × 400m @ 1:25.",
            },
          ],
        },
        { id: "w8-wed", type: "rest", dayOfWeek: 2, distance_km: 0 },
        {
          id: "w8-thu",
          type: "threshold",
          dayOfWeek: 3,
          distance_km: 11,
          target_pace: "4:07–4:10/km",
          intervals: [
            {
              repetitions: 3,
              duration_s: 600,
              target_pace: "4:07–4:10/km",
              recovery_s: 90,
              notes: "Alternate options this week: 3×10min, 4×7min, 2×10min.",
            },
          ],
        },
        { id: "w8-fri", type: "rest", dayOfWeek: 4, distance_km: 0 },
        {
          id: "w8-sat",
          type: "easy_run",
          dayOfWeek: 5,
          distance_km: 10,
          target_pace: "5:30–6:00/km",
        },
        {
          id: "w8-sun",
          type: "easy_run",
          dayOfWeek: 6,
          distance_km: 8,
          target_pace: "5:30–6:00/km",
          notes: "Optional.",
        },
      ],
    },

    // ─── PHASE 3: SPECIFIC 10K PACE ─── Weeks 9–12 ───────────────────────────

    // Week 9
    {
      weekNumber: 9,
      phase: "specific",
      sessions: [
        {
          id: "w9-mon",
          type: "easy_run",
          dayOfWeek: 0,
          distance_km: 8,
          target_pace: "5:30–6:00/km",
        },
        {
          id: "w9-tue",
          type: "speed",
          dayOfWeek: 1,
          distance_km: 9,
          warmup_notes: "10–15 min easy + drills + 3–4 accelerations",
          intervals: [
            {
              repetitions: 4,
              distance_m: 400,
              target_pace: "3:32/km",
              recovery_s: 120,
              notes: "Lighter week — 4–6 reps only. Alternate: 4 × 800m @ 2:55.",
            },
          ],
        },
        { id: "w9-wed", type: "rest", dayOfWeek: 2, distance_km: 0 },
        {
          id: "w9-thu",
          type: "specific",
          dayOfWeek: 3,
          distance_km: 12,
          target_pace: "3:55–4:00/km",
          intervals: [
            {
              repetitions: 6,
              distance_m: 1000,
              target_pace: "3:55–4:00/km",
              recovery_s: 120,
              notes: "This is your 10K race pace. Alternate: 4 × 1500m @ same pace.",
            },
          ],
          notes: "Race-pace work. Controlled and focused — not a time trial.",
        },
        { id: "w9-fri", type: "rest", dayOfWeek: 4, distance_km: 0 },
        {
          id: "w9-sat",
          type: "easy_run",
          dayOfWeek: 5,
          distance_km: 10,
          target_pace: "5:30–6:00/km",
        },
        { id: "w9-sun", type: "rest", dayOfWeek: 6, distance_km: 0 },
      ],
    },

    // Week 10
    {
      weekNumber: 10,
      phase: "specific",
      sessions: [
        {
          id: "w10-mon",
          type: "easy_run",
          dayOfWeek: 0,
          distance_km: 8,
          target_pace: "5:30–6:00/km",
        },
        {
          id: "w10-tue",
          type: "speed",
          dayOfWeek: 1,
          distance_km: 10,
          warmup_notes: "10–15 min easy + drills + 3–4 accelerations",
          intervals: [
            {
              repetitions: 4,
              distance_m: 800,
              target_pace: "3:50/km",
              recovery_s: 120,
              notes: "≈ 2:55 per rep. Lighter: 4–6 × 400m @ 1:25.",
            },
          ],
        },
        { id: "w10-wed", type: "rest", dayOfWeek: 2, distance_km: 0 },
        {
          id: "w10-thu",
          type: "specific",
          dayOfWeek: 3,
          distance_km: 13,
          target_pace: "3:55–4:00/km",
          intervals: [
            {
              repetitions: 4,
              distance_m: 1500,
              target_pace: "3:55–4:00/km",
              recovery_s: 120,
              notes: "≈ 5:53 per rep. Alternate: 6–8 × 1000m.",
            },
          ],
        },
        { id: "w10-fri", type: "rest", dayOfWeek: 4, distance_km: 0 },
        {
          id: "w10-sat",
          type: "easy_run",
          dayOfWeek: 5,
          distance_km: 10,
          target_pace: "5:30–6:00/km",
        },
        { id: "w10-sun", type: "rest", dayOfWeek: 6, distance_km: 0 },
      ],
    },

    // Week 11
    {
      weekNumber: 11,
      phase: "specific",
      sessions: [
        {
          id: "w11-mon",
          type: "easy_run",
          dayOfWeek: 0,
          distance_km: 8,
          target_pace: "5:30–6:00/km",
        },
        {
          id: "w11-tue",
          type: "speed",
          dayOfWeek: 1,
          distance_km: 9,
          warmup_notes: "10–15 min easy + drills + 3–4 accelerations",
          intervals: [
            {
              repetitions: 4,
              distance_m: 400,
              target_pace: "3:32/km",
              recovery_s: 120,
              notes: "Sharp, not exhausting — 4–5 reps max. Alternate: 3–4 × 800m.",
            },
          ],
          notes: "Pre-taper sharpening week.",
        },
        { id: "w11-wed", type: "rest", dayOfWeek: 2, distance_km: 0 },
        {
          id: "w11-thu",
          type: "specific",
          dayOfWeek: 3,
          distance_km: 11,
          target_pace: "3:55–4:00/km",
          intervals: [
            {
              repetitions: 6,
              distance_m: 1000,
              target_pace: "3:55–4:00/km",
              recovery_s: 120,
            },
          ],
        },
        { id: "w11-fri", type: "rest", dayOfWeek: 4, distance_km: 0 },
        {
          id: "w11-sat",
          type: "easy_run",
          dayOfWeek: 5,
          distance_km: 8,
          target_pace: "5:30–6:00/km",
        },
        { id: "w11-sun", type: "rest", dayOfWeek: 6, distance_km: 0 },
      ],
    },

    // Week 12 — Race week
    {
      weekNumber: 12,
      phase: "specific",
      sessions: [
        {
          id: "w12-mon",
          type: "easy_run",
          dayOfWeek: 0,
          distance_km: 6,
          target_pace: "5:30–6:00/km",
          notes: "Very easy shakeout. Stay fresh.",
        },
        {
          id: "w12-tue",
          type: "speed",
          dayOfWeek: 1,
          distance_km: 7,
          warmup_notes: "10 min easy + drills + 2–3 accelerations",
          intervals: [
            {
              repetitions: 3,
              distance_m: 400,
              target_pace: "3:32/km",
              recovery_s: 120,
              notes: "Just 3–4 reps to keep legs sharp. NOT a hard session.",
            },
          ],
        },
        { id: "w12-wed", type: "rest", dayOfWeek: 2, distance_km: 0 },
        {
          id: "w12-thu",
          type: "easy_run",
          dayOfWeek: 3,
          distance_km: 5,
          target_pace: "5:30–6:00/km",
          notes: "20–30 min easy + 3–4 strides at race pace.",
        },
        { id: "w12-fri", type: "rest", dayOfWeek: 4, distance_km: 0 },
        { id: "w12-sat", type: "rest", dayOfWeek: 5, distance_km: 0, notes: "Rest or very short 15-min jog. Stay off your feet." },
        {
          id: "w12-sun",
          type: "specific",
          dayOfWeek: 6,
          distance_km: 10,
          target_pace: "3:55–4:00/km",
          notes: "RACE DAY. Target: sub-40 (3:55–4:00/km). Start controlled — negative split if possible.",
        },
      ],
    },
  ],
};
