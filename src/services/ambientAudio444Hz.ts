/**
 * Procedural 444Hz Warm Harmonic Ambient Soundscape Engine (Web Audio API)
 * Generates an ethereal, relaxing, warm ambient drone tuned to 444 Hz.
 */

class AmbientAudioEngine {
  private ctx: AudioContext | null = null;
  private oscRoot: OscillatorNode | null = null;
  private oscSub: OscillatorNode | null = null;
  private oscHarmonic: OscillatorNode | null = null;
  private lfo: OscillatorNode | null = null;
  private masterGain: GainNode | null = null;
  private isPlaying: boolean = false;
  private currentVolume: number = 0.15;

  private initContext() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      this.ctx = new AudioContextClass();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public start(volume: number = 0.15) {
    if (this.isPlaying) return;
    this.initContext();
    if (!this.ctx) return;

    this.currentVolume = volume;

    // Master Gain
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(0.0001, this.ctx.currentTime);
    this.masterGain.gain.exponentialRampToValueAtTime(this.currentVolume, this.ctx.currentTime + 2.5);

    // Warm Lowpass Filter (silky, non-fatiguing tone)
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(888, this.ctx.currentTime);
    filter.Q.setValueAtTime(1.2, this.ctx.currentTime);

    // 1. Root Oscillator (444.0 Hz Sine)
    this.oscRoot = this.ctx.createOscillator();
    this.oscRoot.type = 'sine';
    this.oscRoot.frequency.setValueAtTime(444.0, this.ctx.currentTime);

    // 2. Sub-Harmonic (222.0 Hz Warm Foundation)
    this.oscSub = this.ctx.createOscillator();
    this.oscSub.type = 'sine';
    this.oscSub.frequency.setValueAtTime(222.0, this.ctx.currentTime);
    const subGain = this.ctx.createGain();
    subGain.gain.setValueAtTime(0.4, this.ctx.currentTime);

    // 3. Ethereal Shimmer (888.0 Hz Triangle)
    this.oscHarmonic = this.ctx.createOscillator();
    this.oscHarmonic.type = 'triangle';
    this.oscHarmonic.frequency.setValueAtTime(888.0, this.ctx.currentTime);
    const harmonicGain = this.ctx.createGain();
    harmonicGain.gain.setValueAtTime(0.12, this.ctx.currentTime);

    // 4. Ultra-slow LFO (0.08 Hz gentle breathing pulse)
    this.lfo = this.ctx.createOscillator();
    this.lfo.frequency.setValueAtTime(0.08, this.ctx.currentTime);
    const lfoGain = this.ctx.createGain();
    lfoGain.gain.setValueAtTime(0.05, this.ctx.currentTime);
    this.lfo.connect(lfoGain);
    lfoGain.connect(this.masterGain.gain);

    // Connect chain
    this.oscRoot.connect(filter);
    this.oscSub.connect(subGain);
    subGain.connect(filter);
    this.oscHarmonic.connect(harmonicGain);
    harmonicGain.connect(filter);

    filter.connect(this.masterGain);
    this.masterGain.connect(this.ctx.destination);

    // Start all oscillators
    this.oscRoot.start();
    this.oscSub.start();
    this.oscHarmonic.start();
    this.lfo.start();

    this.isPlaying = true;
  }

  public stop() {
    if (!this.isPlaying || !this.ctx || !this.masterGain) return;

    try {
      this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, this.ctx.currentTime);
      this.masterGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 1.2);

      setTimeout(() => {
        this.oscRoot?.stop();
        this.oscSub?.stop();
        this.oscHarmonic?.stop();
        this.lfo?.stop();
        this.oscRoot?.disconnect();
        this.oscSub?.disconnect();
        this.oscHarmonic?.disconnect();
        this.lfo?.disconnect();
        this.isPlaying = false;
      }, 1300);
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

export const ambientAudio = new AmbientAudioEngine();
