// Web Audio API Birthday Chime & Fanfare synthesizer
export function playBirthdayCelebrationSound() {
  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;

    const ctx = new AudioContextClass();

    // Notes for "Happy Birthday" opening fanfare (C4, C4, D4, C4, F4, E4, etc.)
    const notes = [
      { freq: 261.63, delay: 0, duration: 0.2 },      // C4
      { freq: 261.63, delay: 0.22, duration: 0.15 },   // C4
      { freq: 293.66, delay: 0.4, duration: 0.35 },    // D4
      { freq: 261.63, delay: 0.8, duration: 0.35 },    // C4
      { freq: 349.23, delay: 1.2, duration: 0.35 },    // F4
      { freq: 329.63, delay: 1.6, duration: 0.55 },    // E4
      { freq: 523.25, delay: 2.2, duration: 0.7 }      // High C5 finale
    ];

    notes.forEach(({ freq, delay, duration }) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, ctx.currentTime + delay);

      // Smooth chime envelope
      gain.gain.setValueAtTime(0, ctx.currentTime + delay);
      gain.gain.linearRampToValueAtTime(0.18, ctx.currentTime + delay + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + delay + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime + delay);
      osc.stop(ctx.currentTime + delay + duration);
    });
  } catch (err) {
    console.debug("Audio celebration not supported or blocked by user gesture:", err);
  }
}
