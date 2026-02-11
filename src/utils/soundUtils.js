class SoundManager {
    constructor() {
        this.audioCtx = null;
        this.enabled = false;
    }

    init() {
        if (!this.audioCtx) {
            this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
    }

    toggle(value) {
        this.enabled = value;
        if (this.enabled) this.init();
    }

    playTone(value, duration = 0.1) {
        if (!this.enabled || !this.audioCtx) return;

        const oscillator = this.audioCtx.createOscillator();
        const gainNode = this.audioCtx.createGain();

        // Map array value (5-500) to frequency (200-1000Hz)
        const frequency = 200 + (value / 500) * 800;

        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(frequency, this.audioCtx.currentTime);

        gainNode.gain.setValueAtTime(0.1, this.audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, this.audioCtx.currentTime + duration);

        oscillator.connect(gainNode);
        gainNode.connect(this.audioCtx.destination);

        oscillator.start();
        oscillator.stop(this.audioCtx.currentTime + duration);
    }
}

export const soundManager = new SoundManager();
