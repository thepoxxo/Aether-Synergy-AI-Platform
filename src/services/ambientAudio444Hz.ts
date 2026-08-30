/**
 * Interstellar Celestial Soundscape Engine (Web Audio API)
 * Generates an evolving, warm, cinematic ambient soundscape inspired by Hans Zimmer's Interstellar.
 * Features lush warm chord pads (Dm, Bb, F, C), celestial arpeggiated bells, and soothing space warmth.
 */

class InterstellarAudioEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private isPlaying: boolean = false;
  private currentVolume: number = 0.22;
  private chordIntervalTimer: any = null;
  private chimeIntervalTimer: any = null;
  private activeVoices: { osc: OscillatorNode; gain: GainNode }[] = [];

  // Evolving Interstellar Cinematic Chord Progressions (Frequencies in Hz)
  // Dm (D3, F3, A3, D4) -> Bbmaj (Bb2, D3, F3, Bb3) -> Fmaj (F2, C3, F3, A3) -> Cmaj (C3, G3, C4, E4)
  private chords = [
    [146.83, 174.61, 220.00, 293.66, 440.00], // D minor celestial
    [116.54, 146.83, 174.61, 233.08, 349.23], // Bb Major ethereal
    [87.31, 130.81, 174.61, 220.00, 349.23],  // F Major warm deep
    [130.81, 196.00, 261.63, 329.63, 392.00]  // C Major starry resolve
  ];
  private currentChordIndex = 0;

  // Celestial Pentatonic Chime Frequencies (Hz) for subtle twinkling stars
  private chimeNotes = [440.00, 523.25, 587.33, 659.25, 783.99, 880.00, 1046.50];

  private initContext() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      this.ctx = new AudioContextClass();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public start(volume: number = 0.22) {
    if (this.isPlaying) return;
    this.initContext();
    if (!this.ctx) return;

    this.currentVolume = volume;

    // Master Output & Reverb Space Sim
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(0.0001, this.ctx.currentTime);
    this.masterGain.gain.exponentialRampToValueAtTime(this.currentVolume, this.ctx.currentTime + 3.0);
    this.masterGain.connect(this.ctx.destination);

    this.isPlaying = true;

    // Play first chord immediately
    this.playChord(this.chords[this.currentChordIndex]);

    // Transition chords every 9 seconds smoothly
    this.chordIntervalTimer = setInterval(() => {
      if (!this.isPlaying) return;
      this.currentChordIndex = (this.currentChordIndex + 1) % this.chords.length;
      this.playChord(this.chords[this.currentChordIndex]);
    }, 9000);

    // Schedule subtle, gentle interstellar celestial chimes every 2-4 seconds
    this.scheduleChimes();
  }

  private playChord(frequencies: number[]) {
    if (!this.ctx || !this.masterGain || !this.isPlaying) return;

    const now = this.ctx.currentTime;
    const fadeTime = 4.0;

    // Softly fade out previous voices
    this.activeVoices.forEach((voice) => {
      try {
        voice.gain.gain.setValueAtTime(voice.gain.gain.value, now);
        voice.gain.gain.exponentialRampToValueAtTime(0.0001, now + fadeTime);
        setTimeout(() => {
          try {
            voice.osc.stop();
            voice.osc.disconnect();
            voice.gain.disconnect();
          } catch (_) {}
        }, fadeTime * 1000 + 100);
      } catch (_) {}
    });
    this.activeVoices = [];

    // Warm Lowpass Filter for that analog cinematic movie tone
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(650, now);
    filter.Q.setValueAtTime(1.0, now);
    filter.connect(this.masterGain);

    // Slow Filter LFO for breathing swell
    const filterLfo = this.ctx.createOscillator();
    filterLfo.frequency.setValueAtTime(0.09, now);
    const filterLfoGain = this.ctx.createGain();
    filterLfoGain.gain.setValueAtTime(220, now);
    filterLfo.connect(filterLfoGain);
    filterLfoGain.connect(filter.frequency);
    filterLfo.start();

    // Create detuned warm synth pad voices for each chord note
    frequencies.forEach((freq, idx) => {
      if (!this.ctx) return;
      const isBass = idx === 0;

      // Primary warm triangle/saw oscillator
      const osc = this.ctx.createOscillator();
      osc.type = isBass ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, now);

      // Subtle detune for rich celestial chorus width
      osc.detune.setValueAtTime((idx % 2 === 0 ? 4 : -4), now);

      const voiceGain = this.ctx.createGain();
      const targetGain = isBass ? 0.35 : 0.18 / frequencies.length;

      voiceGain.gain.setValueAtTime(0.0001, now);
      voiceGain.gain.exponentialRampToValueAtTime(targetGain, now + 3.0);

      osc.connect(voiceGain);
      voiceGain.connect(filter);
      osc.start();

      this.activeVoices.push({ osc, gain: voiceGain });
    });
  }

  private scheduleChimes() {
    if (!this.isPlaying) return;

    const playRandomChime = () => {
      if (!this.isPlaying || !this.ctx || !this.masterGain) return;

      const now = this.ctx.currentTime;
      const freq = this.chimeNotes[Math.floor(Math.random() * this.chimeNotes.length)];

      const osc = this.ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      const chimeFilter = this.ctx.createBiquadFilter();
      chimeFilter.type = 'bandpass';
      chimeFilter.frequency.setValueAtTime(freq, now);
      chimeFilter.Q.setValueAtTime(4.0, now);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(0.06, now + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 3.5);

      osc.connect(chimeFilter);
      chimeFilter.connect(gain);
      gain.connect(this.masterGain);

      osc.start();
      osc.stop(now + 3.6);

      const nextTime = Math.random() * 2500 + 2000;
      this.chimeIntervalTimer = setTimeout(playRandomChime, nextTime);
    };

    this.chimeIntervalTimer = setTimeout(playRandomChime, 1500);
  }

  public stop() {
    if (!this.isPlaying || !this.ctx || !this.masterGain) return;

    clearInterval(this.chordIntervalTimer);
    clearTimeout(this.chimeIntervalTimer);

    try {
      const now = this.ctx.currentTime;
      this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
      this.masterGain.gain.exponentialRampToValueAtTime(0.0001, now + 2.0);

      setTimeout(() => {
        this.activeVoices.forEach((v) => {
          try {
            v.osc.stop();
            v.osc.disconnect();
          } catch (_) {}
        });
        this.activeVoices = [];
        this.isPlaying = false;
      }, 2100);
    } catch (_) {
      this.isPlaying = false;
    }
  }

  public setVolume(vol: number) {
    this.currentVolume = vol;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(vol, this.ctx.currentTime);
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }
}

export const ambientAudio = new InterstellarAudioEngine();
