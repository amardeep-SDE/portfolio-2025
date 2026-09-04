/**
 * Studio-Grade Web Audio Synthesizer for Portfolio Celebrations
 * Features:
 * - FM Bell & Physical Harmonics modeling
 * - Stereo ambient space & room reflection
 * - Zero external assets, 0ms latency, zero bandwidth
 */

const getAudioContext = () => {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return null;
    const ctx = new AudioCtx();
    if (ctx.state === "suspended") {
      ctx.resume();
    }
    return ctx;
  } catch (e) {
    return null;
  }
};

/**
 * 🌟 1. Magical Celestial Sparkle (Harp + Crystal Wind Chime)
 * Gorgeous ascending pentatonic shimmer with stereo room reflection & bell overtones.
 */
export const playCelestialChime = () => {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;

  // Master output
  const master = ctx.createGain();
  master.gain.setValueAtTime(0.32, now);
  master.connect(ctx.destination);

  // Warm low-pass filter to remove any harsh digital edges
  const filter = ctx.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.setValueAtTime(3800, now);
  filter.Q.setValueAtTime(1.1, now);
  filter.connect(master);

  // Stereo Ambient Reflection (Left/Right delay lines)
  const delayL = ctx.createDelay();
  delayL.delayTime.setValueAtTime(0.065, now);
  const delayR = ctx.createDelay();
  delayR.delayTime.setValueAtTime(0.095, now);

  const fbL = ctx.createGain();
  fbL.gain.setValueAtTime(0.22, now);
  const fbR = ctx.createGain();
  fbR.gain.setValueAtTime(0.22, now);

  delayL.connect(fbL);
  fbL.connect(delayL);
  delayR.connect(fbR);
  fbR.connect(delayR);

  delayL.connect(filter);
  delayR.connect(filter);

  // Notes: Sparkling Eb Major Pentatonic (Eb5, G5, Bb5, Eb6, F6, G6, Bb6)
  const notes = [
    { f: 622.25, time: 0.0, dur: 1.2, pan: -0.3 },   // Eb5
    { f: 783.99, time: 0.05, dur: 1.2, pan: 0.2 },   // G5
    { f: 932.33, time: 0.10, dur: 1.3, pan: -0.2 },  // Bb5
    { f: 1244.51, time: 0.15, dur: 1.4, pan: 0.3 },  // Eb6
    { f: 1396.91, time: 0.20, dur: 1.4, pan: -0.1 }, // F6
    { f: 1567.98, time: 0.25, dur: 1.6, pan: 0.2 },  // G6
    { f: 1864.66, time: 0.30, dur: 1.8, pan: 0.0 },  // Bb6
  ];

  notes.forEach((note) => {
    const noteStart = now + note.time;

    // Note Gain with soft attack
    const noteGain = ctx.createGain();
    noteGain.gain.setValueAtTime(0.0001, noteStart);
    noteGain.gain.exponentialRampToValueAtTime(0.13, noteStart + 0.006);
    noteGain.gain.exponentialRampToValueAtTime(0.0001, noteStart + note.dur);

    // Fundamental Tone (Warm Sine)
    const osc1 = ctx.createOscillator();
    osc1.type = "sine";
    osc1.frequency.setValueAtTime(note.f, noteStart);

    // Sparkle Harmonic (Octave Triangle for warmth)
    const osc2 = ctx.createOscillator();
    osc2.type = "triangle";
    osc2.frequency.setValueAtTime(note.f * 2, noteStart);
    const osc2Gain = ctx.createGain();
    osc2Gain.gain.setValueAtTime(0.035, noteStart);
    osc2Gain.gain.exponentialRampToValueAtTime(0.0001, noteStart + note.dur * 0.4);

    // Chime Metallic Inharmonic (Bell factor 2.756)
    const oscBell = ctx.createOscillator();
    oscBell.type = "sine";
    oscBell.frequency.setValueAtTime(note.f * 2.756, noteStart);
    const bellGain = ctx.createGain();
    bellGain.gain.setValueAtTime(0.02, noteStart);
    bellGain.gain.exponentialRampToValueAtTime(0.0001, noteStart + 0.28);

    // Spatial Panning
    if (ctx.createStereoPanner) {
      const panner = ctx.createStereoPanner();
      panner.pan.setValueAtTime(note.pan, noteStart);
      noteGain.connect(panner);
      panner.connect(filter);
      panner.connect(delayL);
      panner.connect(delayR);
    } else {
      noteGain.connect(filter);
      noteGain.connect(delayL);
      noteGain.connect(delayR);
    }

    osc1.connect(noteGain);
    osc2.connect(osc2Gain);
    osc2Gain.connect(noteGain);
    oscBell.connect(bellGain);
    bellGain.connect(noteGain);

    osc1.start(noteStart);
    osc1.stop(noteStart + note.dur);
    osc2.start(noteStart);
    osc2.stop(noteStart + note.dur * 0.4);
    oscBell.start(noteStart);
    oscBell.stop(noteStart + 0.3);
  });

  // Warm Sub-Bass Foundation on peak (Eb4)
  const bassStart = now + 0.22;
  const bassOsc = ctx.createOscillator();
  const bassGain = ctx.createGain();
  bassOsc.type = "sine";
  bassOsc.frequency.setValueAtTime(311.13, bassStart);
  bassGain.gain.setValueAtTime(0.0001, bassStart);
  bassGain.gain.exponentialRampToValueAtTime(0.1, bassStart + 0.02);
  bassGain.gain.exponentialRampToValueAtTime(0.0001, bassStart + 1.2);
  bassOsc.connect(bassGain);
  bassGain.connect(master);
  bassOsc.start(bassStart);
  bassOsc.stop(bassStart + 1.2);
};

/**
 * 🔔 2. Apple-Style Luxury Glass Chime
 * Modern, ultra-crisp double glass ping with long acoustic resonance.
 */
export const playLuxuryGlassChime = () => {
  const ctx = getAudioContext();
  if (!ctx) return;
  const now = ctx.currentTime;

  const master = ctx.createGain();
  master.gain.setValueAtTime(0.35, now);
  master.connect(ctx.destination);

  // Ping 1 (A5) -> Ping 2 (E6 + A6 Chord) 85ms later
  const pings = [
    { freq: 880.0, time: 0, gain: 0.14, dur: 1.0 },
    { freq: 1318.51, time: 0.085, gain: 0.16, dur: 1.5 },
    { freq: 1760.0, time: 0.085, gain: 0.12, dur: 1.6 },
  ];

  pings.forEach((p) => {
    const pStart = now + p.time;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(p.freq, pStart);

    gain.gain.setValueAtTime(0.0001, pStart);
    gain.gain.exponentialRampToValueAtTime(p.gain, pStart + 0.005);
    gain.gain.exponentialRampToValueAtTime(0.0001, pStart + p.dur);

    // Inharmonic ring overtone
    const overtone = ctx.createOscillator();
    const overGain = ctx.createGain();
    overtone.type = "sine";
    overtone.frequency.setValueAtTime(p.freq * 2.76, pStart);
    overGain.gain.setValueAtTime(p.gain * 0.25, pStart);
    overGain.gain.exponentialRampToValueAtTime(0.0001, pStart + 0.35);

    overtone.connect(overGain);
    overGain.connect(master);
    osc.connect(gain);
    gain.connect(master);

    osc.start(pStart);
    osc.stop(pStart + p.dur);
    overtone.start(pStart);
    overtone.stop(pStart + 0.4);
  });
};

/**
 * 🎮 3. Level-Up Victory Jingle (Upbeat Arcade Triumph)
 */
export const playLevelUpSound = () => {
  const ctx = getAudioContext();
  if (!ctx) return;
  const now = ctx.currentTime;

  const master = ctx.createGain();
  master.gain.setValueAtTime(0.25, now);
  master.connect(ctx.destination);

  const notes = [
    { f: 440.0, t: 0.0, d: 0.08 },    // A4
    { f: 554.37, t: 0.08, d: 0.08 },  // C#5
    { f: 659.25, t: 0.16, d: 0.08 },  // E5
    { f: 880.0, t: 0.24, d: 0.4 },    // A5
  ];

  notes.forEach((n) => {
    const start = now + n.t;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(n.f, start);

    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(0.18, start + 0.005);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + n.d);

    osc.connect(gain);
    gain.connect(master);
    osc.start(start);
    osc.stop(start + n.d);
  });
};
