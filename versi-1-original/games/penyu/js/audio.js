/* Efek suara sederhana dari Web Audio (tanpa file audio). */
(function () {
  'use strict';
  let ac = null;
  let master = null;
  let muted = false;

  function ensure() {
    if (ac) return ac;
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    try {
      ac = new AC();
      master = ac.createGain();
      master.gain.value = 0.5;
      master.connect(ac.destination);
    } catch (e) {
      ac = null;
    }
    return ac;
  }

  function tone(freq, dur, type, vol, slide, delay) {
    if (muted) return;
    const a = ensure();
    if (!a) return;
    if (a.state === 'suspended') a.resume();
    const t0 = a.currentTime + (delay || 0);
    const o = a.createOscillator();
    const g = a.createGain();
    o.type = type || 'sine';
    o.frequency.setValueAtTime(freq, t0);
    if (slide) o.frequency.exponentialRampToValueAtTime(Math.max(30, freq * slide), t0 + dur);
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(vol || 0.3, t0 + 0.012);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    o.connect(g);
    g.connect(master);
    o.start(t0);
    o.stop(t0 + dur + 0.02);
  }

  function noise(dur, vol, freq) {
    if (muted) return;
    const a = ensure();
    if (!a) return;
    const n = Math.floor(a.sampleRate * dur);
    const buf = a.createBuffer(1, n, a.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < n; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / n);
    const src = a.createBufferSource();
    src.buffer = buf;
    const f = a.createBiquadFilter();
    f.type = 'lowpass';
    f.frequency.value = freq || 900;
    const g = a.createGain();
    g.gain.value = vol || 0.3;
    src.connect(f);
    f.connect(g);
    g.connect(master);
    src.start();
  }

  window.PB_SFX = {
    unlock: function () { const a = ensure(); if (a && a.state === 'suspended') a.resume(); },
    setMuted: function (m) { muted = !!m; },
    isMuted: function () { return muted; },
    click: function () { tone(660, 0.07, 'triangle', 0.18); },
    eat: function () { tone(520 + Math.random() * 120, 0.09, 'sine', 0.22, 1.6); },
    bad: function () { tone(220, 0.25, 'sawtooth', 0.16, 0.5); },
    hurt: function () { tone(330, 0.35, 'square', 0.14, 0.35); noise(0.25, 0.2, 600); },
    level: function () { [523, 659, 784, 1047].forEach((f, i) => tone(f, 0.18, 'triangle', 0.2, 1, i * 0.09)); },
    breath: function () { noise(0.18, 0.12, 1800); },
    mash: function () { noise(0.06, 0.18, 1200); },
    egg: function () { tone(880 + Math.random() * 200, 0.06, 'sine', 0.15); },
    warn: function () { tone(880, 0.1, 'square', 0.08); tone(880, 0.1, 'square', 0.08, 1, 0.16); },
    win: function () { [392, 523, 659, 784, 1047, 1319].forEach((f, i) => tone(f, 0.25, 'triangle', 0.18, 1, i * 0.11)); }
  };
})();
