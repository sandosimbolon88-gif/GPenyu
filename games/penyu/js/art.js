/* Semua gambar digambar langsung dengan kode (tanpa file gambar) supaya
 * game ringan, tajam di semua layar, dan bisa jalan tanpa internet. */
(function () {
  'use strict';
  const TAU = Math.PI * 2;
  const A = {};

  function rng(seed) {
    let s = (seed >>> 0) || 1;
    return function () {
      s ^= s << 13; s >>>= 0; s ^= s >> 17; s ^= s << 5; s >>>= 0;
      return s / 4294967296;
    };
  }
  A.rng = rng;

  function ell(ctx, x, y, rx, ry, rot) {
    ctx.beginPath();
    ctx.ellipse(x, y, Math.max(0.1, rx), Math.max(0.1, ry), rot || 0, 0, TAU);
  }
  A.ell = ell;

  function paddle(ctx, L, w) {
    ctx.beginPath();
    ctx.moveTo(0, -w * 0.35);
    ctx.quadraticCurveTo(L * 0.45, -w * 1.0, L, -w * 0.12);
    ctx.quadraticCurveTo(L * 0.55, w * 0.75, 0, w * 0.35);
    ctx.closePath();
  }

  function shellPath(ctx, r) {
    ctx.beginPath();
    ctx.moveTo(-r * 1.0, r * 0.18);
    ctx.bezierCurveTo(-r * 0.95, -r * 0.8, r * 0.72, -r * 0.88, r * 0.98, r * 0.08);
    ctx.quadraticCurveTo(r * 0.1, r * 0.52, -r * 1.0, r * 0.18);
    ctx.closePath();
  }

  /* ---------------- Penyu tampak samping (di laut) ---------------- */
  A.turtleSide = function (ctx, x, y, r, sp, o) {
    o = o || {};
    const t = o.t || 0, f = o.facing || 1, c = sp.warna, id = sp.id;
    const swim = o.swim == null ? 1 : o.swim;
    const ph = t * (4 + 4 * swim);
    const flipL = id === 'belimbing' ? 1.6 : 1.15;
    const lw = Math.max(1, r * 0.04);
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(f, 1);
    ctx.rotate(o.tilt || 0);
    if (o.alpha != null) ctx.globalAlpha *= o.alpha;

    // sirip depan sisi jauh
    ctx.save();
    ctx.translate(r * 0.28, r * 0.1);
    ctx.rotate(0.95 + Math.sin(ph + 1.1) * 0.55 * swim);
    ctx.fillStyle = c.skinDark;
    paddle(ctx, r * flipL, r * 0.34);
    ctx.fill();
    ctx.restore();

    // sirip belakang
    ctx.save();
    ctx.translate(-r * 0.82, r * 0.2);
    ctx.rotate(0.6 + Math.sin(ph) * 0.25 * swim);
    ctx.fillStyle = c.skinDark;
    paddle(ctx, r * 0.48, r * 0.26);
    ctx.fill();
    ctx.restore();

    // leher & kepala
    const hs = o.baby ? 1.25 : 1;
    ctx.fillStyle = c.skin;
    ell(ctx, r * 0.9, r * 0.06, r * 0.32, r * 0.2 * hs, 0);
    ctx.fill();
    ctx.save();
    ctx.translate(r * 1.18, r * 0.0);
    ctx.scale(hs, hs);
    ctx.fillStyle = c.skin;
    ell(ctx, 0, 0, r * 0.34, r * 0.25, 0.08);
    ctx.fill();
    if (id === 'sisik') {
      ctx.beginPath();
      ctx.moveTo(r * 0.18, -r * 0.13);
      ctx.quadraticCurveTo(r * 0.52, -r * 0.04, r * 0.46, r * 0.13);
      ctx.lineTo(r * 0.16, r * 0.11);
      ctx.closePath();
      ctx.fill();
    }
    // pola kepala
    if (id === 'belimbing') {
      ctx.fillStyle = c.accent;
      const rr = rng(7);
      for (let i = 0; i < 6; i++) { ell(ctx, (rr() - 0.6) * r * 0.45, (rr() - 0.5) * r * 0.3, r * 0.03, r * 0.03); ctx.fill(); }
    } else {
      ctx.strokeStyle = c.skinDark;
      ctx.lineWidth = Math.max(0.8, r * 0.022);
      ctx.beginPath();
      ctx.moveTo(-r * 0.2, -r * 0.18); ctx.lineTo(-r * 0.05, -r * 0.05); ctx.lineTo(-r * 0.22, r * 0.08);
      ctx.moveTo(-r * 0.05, -r * 0.05); ctx.lineTo(r * 0.05, -r * 0.2);
      ctx.stroke();
    }
    // mata
    ctx.fillStyle = '#141414';
    ell(ctx, r * 0.13, -r * 0.07, r * 0.07, r * 0.075);
    ctx.fill();
    ctx.fillStyle = '#fff';
    ell(ctx, r * 0.15, -r * 0.095, r * 0.024, r * 0.024);
    ctx.fill();
    ctx.strokeStyle = c.skinDark;
    ctx.lineWidth = Math.max(1, r * 0.03);
    ctx.beginPath();
    ctx.moveTo(r * 0.05, r * 0.11);
    ctx.quadraticCurveTo(r * 0.2, r * 0.14, r * 0.33, r * 0.06);
    ctx.stroke();
    ctx.restore();

    // cangkang
    const g = ctx.createLinearGradient(0, -r * 0.8, 0, r * 0.4);
    g.addColorStop(0, c.accent);
    g.addColorStop(0.35, c.shell);
    g.addColorStop(1, c.shellDark);
    shellPath(ctx, r);
    ctx.fillStyle = g;
    ctx.fill();

    ctx.save();
    shellPath(ctx, r);
    ctx.clip();
    if (id === 'belimbing') {
      ctx.strokeStyle = 'rgba(0,0,0,0.45)';
      ctx.lineWidth = Math.max(1, r * 0.05);
      for (let k = 0; k < 3; k++) {
        const off = k * 0.22;
        ctx.beginPath();
        ctx.moveTo(-r * 0.98, r * (0.12 + off * 0.2));
        ctx.bezierCurveTo(-r * 0.85, -r * (0.7 - off), r * 0.6, -r * (0.78 - off), r * 0.95, r * 0.05);
        ctx.stroke();
      }
      ctx.strokeStyle = 'rgba(255,255,255,0.18)';
      ctx.lineWidth = Math.max(1, r * 0.025);
      ctx.beginPath();
      ctx.moveTo(-r * 0.95, r * 0.08);
      ctx.bezierCurveTo(-r * 0.85, -r * 0.62, r * 0.6, -r * 0.7, r * 0.95, r * 0.02);
      ctx.stroke();
      ctx.fillStyle = 'rgba(232,237,242,0.75)';
      const rr = rng(11);
      for (let i = 0; i < 14; i++) {
        ell(ctx, (rr() * 1.8 - 0.95) * r, (rr() * 0.8 - 0.65) * r, r * 0.028, r * 0.028);
        ctx.fill();
      }
    } else {
      // sisik/scute
      ctx.strokeStyle = 'rgba(0,0,0,0.38)';
      ctx.lineWidth = Math.max(1, r * 0.035);
      ctx.beginPath();
      ctx.moveTo(-r * 0.86, r * 0.06);
      ctx.bezierCurveTo(-r * 0.74, -r * 0.48, r * 0.52, -r * 0.55, r * 0.8, r * 0.03);
      ctx.stroke();
      ctx.beginPath();
      const xs = [-0.5, -0.12, 0.28];
      for (const xx of xs) {
        ctx.moveTo(r * xx, -r * 0.42);
        ctx.lineTo(r * (xx + 0.06), -r * 0.95);
      }
      for (let xx = -0.78; xx < 0.8; xx += 0.24) {
        ctx.moveTo(r * xx, r * 0.3);
        ctx.lineTo(r * (xx + 0.04), -r * 0.05 - Math.cos(xx * 1.6) * r * 0.22);
      }
      ctx.stroke();
      if (id === 'sisik') {
        ctx.strokeStyle = 'rgba(60,25,5,0.5)';
        ctx.lineWidth = Math.max(1, r * 0.05);
        const rr = rng(5);
        for (let i = 0; i < 9; i++) {
          const sx = (rr() * 1.6 - 0.85) * r, sy = (rr() * 0.6 - 0.65) * r;
          ctx.beginPath();
          ctx.moveTo(sx, sy);
          ctx.lineTo(sx + (rr() - 0.5) * r * 0.25, sy + r * 0.2);
          ctx.stroke();
        }
      } else if (id === 'hijau') {
        ctx.strokeStyle = 'rgba(255,240,190,0.18)';
        ctx.lineWidth = Math.max(1, r * 0.03);
        for (let i = 0; i < 4; i++) {
          const sx = (-0.6 + i * 0.4) * r;
          ctx.beginPath();
          ctx.moveTo(sx, -r * 0.6);
          ctx.lineTo(sx - r * 0.1, -r * 0.25);
          ctx.moveTo(sx, -r * 0.6);
          ctx.lineTo(sx + r * 0.12, -r * 0.28);
          ctx.stroke();
        }
      }
    }
    // kilau
    ctx.fillStyle = 'rgba(255,255,255,0.16)';
    ell(ctx, -r * 0.15, -r * 0.55, r * 0.5, r * 0.12, -0.08);
    ctx.fill();
    ctx.restore();

    shellPath(ctx, r);
    ctx.strokeStyle = c.shellDark;
    ctx.lineWidth = lw;
    ctx.stroke();
    // plastron
    ctx.strokeStyle = c.belly;
    ctx.lineWidth = Math.max(1.5, r * 0.11);
    ctx.beginPath();
    ctx.moveTo(r * 0.9, r * 0.13);
    ctx.quadraticCurveTo(r * 0.1, r * 0.5, -r * 0.92, r * 0.2);
    ctx.stroke();

    // sirip depan sisi dekat
    ctx.save();
    ctx.translate(r * 0.42, r * 0.22);
    ctx.rotate(0.7 + Math.sin(ph) * 0.62 * swim);
    paddle(ctx, r * flipL, r * 0.37);
    ctx.fillStyle = c.skin;
    ctx.fill();
    ctx.strokeStyle = c.skinDark;
    ctx.lineWidth = lw;
    ctx.stroke();
    ctx.fillStyle = id === 'belimbing' ? 'rgba(232,237,242,0.7)' : 'rgba(0,0,0,0.18)';
    for (let i = 1; i < 5; i++) {
      ell(ctx, r * flipL * i * 0.18, -r * 0.03, r * 0.05, r * 0.035);
      ctx.fill();
    }
    ctx.restore();

    ctx.restore();
  };

  /* ---------------- Penyu tampak atas (di pantai) ---------------- */
  A.turtleTop = function (ctx, x, y, r, sp, o) {
    o = o || {};
    const t = o.t || 0, c = sp.warna, id = sp.id;
    const crawl = o.crawl == null ? 1 : o.crawl;
    const sw = Math.sin(t * 7) * 0.45 * crawl;
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(o.angle || 0);
    if (o.alpha != null) ctx.globalAlpha *= o.alpha;
    const flipL = id === 'belimbing' ? 1.3 : 0.95;
    ctx.fillStyle = c.skinDark;
    for (const s of [-1, 1]) {
      ctx.save();
      ctx.translate(r * 0.3, s * r * 0.5);
      ctx.rotate(s * (1.95 + (s > 0 ? sw : -sw)));
      paddle(ctx, r * flipL, r * 0.34);
      ctx.fill();
      ctx.restore();
      ctx.save();
      ctx.translate(-r * 0.62, s * r * 0.34);
      ctx.rotate(s * (2.5 - (s > 0 ? sw : -sw) * 0.5));
      paddle(ctx, r * 0.42, r * 0.24);
      ctx.fill();
      ctx.restore();
    }
    ctx.fillStyle = c.skin;
    ell(ctx, r * 0.92, 0, r * 0.3, r * 0.25);
    ctx.fill();
    ctx.fillStyle = '#151515';
    ell(ctx, r * 1.02, -r * 0.13, r * 0.05, r * 0.05); ctx.fill();
    ell(ctx, r * 1.02, r * 0.13, r * 0.05, r * 0.05); ctx.fill();

    const g = ctx.createRadialGradient(-r * 0.1, -r * 0.1, r * 0.1, 0, 0, r * 0.9);
    g.addColorStop(0, c.accent);
    g.addColorStop(0.5, c.shell);
    g.addColorStop(1, c.shellDark);
    ctx.beginPath();
    if (id === 'belimbing') {
      ctx.moveTo(r * 0.75, 0);
      ctx.bezierCurveTo(r * 0.75, -r * 0.7, -r * 0.5, -r * 0.7, -r * 1.05, 0);
      ctx.bezierCurveTo(-r * 0.5, r * 0.7, r * 0.75, r * 0.7, r * 0.75, 0);
    } else {
      ctx.ellipse(0, 0, r * 0.82, r * 0.66, 0, 0, TAU);
    }
    ctx.fillStyle = g;
    ctx.fill();
    ctx.strokeStyle = c.shellDark;
    ctx.lineWidth = Math.max(1, r * 0.05);
    ctx.stroke();
    ctx.save();
    ctx.clip();
    ctx.strokeStyle = 'rgba(0,0,0,0.35)';
    ctx.lineWidth = Math.max(1, r * 0.045);
    if (id === 'belimbing') {
      for (let k = -2; k <= 2; k++) {
        ctx.beginPath();
        ctx.moveTo(r * 0.7, k * r * 0.12);
        ctx.quadraticCurveTo(0, k * r * 0.26, -r * 1.0, 0);
        ctx.stroke();
      }
    } else {
      // deretan scute tengah
      ctx.beginPath();
      for (let i = 0; i < 4; i++) {
        const cx = r * (0.45 - i * 0.32);
        ctx.moveTo(cx + r * 0.16, 0);
        ctx.lineTo(cx + r * 0.08, -r * 0.16);
        ctx.lineTo(cx - r * 0.08, -r * 0.16);
        ctx.lineTo(cx - r * 0.16, 0);
        ctx.lineTo(cx - r * 0.08, r * 0.16);
        ctx.lineTo(cx + r * 0.08, r * 0.16);
        ctx.closePath();
      }
      for (let i = 0; i < 4; i++) {
        const cx = r * (0.45 - i * 0.32);
        ctx.moveTo(cx + r * 0.08, -r * 0.16); ctx.lineTo(cx + r * 0.12, -r * 0.6);
        ctx.moveTo(cx + r * 0.08, r * 0.16); ctx.lineTo(cx + r * 0.12, r * 0.6);
      }
      ctx.stroke();
      ctx.beginPath();
      ctx.ellipse(0, 0, r * 0.64, r * 0.48, 0, 0, TAU);
      ctx.stroke();
    }
    ctx.restore();
    ctx.restore();
  };

  /* ---------------- Ikan ---------------- */
  A.fish = function (ctx, x, y, r, o) {
    o = o || {};
    const t = o.t || 0, f = o.facing || 1;
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(f, 1);
    ctx.rotate(o.tilt || 0);
    const wag = Math.sin(t * 9) * 0.25;
    ctx.save();
    ctx.translate(-r * 0.95, 0);
    ctx.rotate(wag);
    ctx.fillStyle = o.fin || o.body;
    ctx.beginPath();
    ctx.moveTo(r * 0.1, 0);
    ctx.lineTo(-r * 0.55, -r * 0.5);
    ctx.quadraticCurveTo(-r * 0.35, 0, -r * 0.55, r * 0.5);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
    const ry = r * (o.kind === 'kerapu' ? 0.62 : 0.52);
    const g = ctx.createLinearGradient(0, -ry, 0, ry);
    g.addColorStop(0, o.body);
    g.addColorStop(1, o.belly || o.body);
    ctx.fillStyle = o.fin || o.body;
    ctx.beginPath();
    ctx.moveTo(-r * 0.5, -ry * 0.8);
    ctx.quadraticCurveTo(-r * 0.05, -ry * 1.6, r * 0.35, -ry * 0.85);
    ctx.closePath();
    ctx.fill();
    ell(ctx, 0, 0, r * 1.05, ry);
    ctx.fillStyle = g;
    ctx.fill();
    if (o.kind === 'kerapu') {
      ctx.fillStyle = 'rgba(40,20,10,0.35)';
      const rr = rng(3);
      for (let i = 0; i < 12; i++) { ell(ctx, (rr() * 1.6 - 0.8) * r, (rr() - 0.5) * ry * 1.4, r * 0.07, r * 0.07); ctx.fill(); }
    }
    ctx.fillStyle = 'rgba(0,0,0,0.18)';
    ctx.beginPath();
    ctx.moveTo(r * 0.45, -ry * 0.6);
    ctx.quadraticCurveTo(r * 0.3, 0, r * 0.45, ry * 0.6);
    ctx.lineTo(r * 0.4, ry * 0.6);
    ctx.quadraticCurveTo(r * 0.25, 0, r * 0.4, -ry * 0.6);
    ctx.fill();
    ctx.fillStyle = '#fff';
    ell(ctx, r * 0.65, -ry * 0.25, r * 0.13, r * 0.13);
    ctx.fill();
    ctx.fillStyle = '#111';
    ell(ctx, r * 0.68, -ry * 0.25, r * 0.07, r * 0.07);
    ctx.fill();
    ctx.strokeStyle = 'rgba(0,0,0,0.4)';
    ctx.lineWidth = Math.max(1, r * 0.04);
    ctx.beginPath();
    ctx.moveTo(r * 1.02, ry * 0.15);
    ctx.lineTo(r * 0.82, ry * 0.25);
    ctx.stroke();
    ctx.restore();
  };

  /* ---------------- Hiu ---------------- */
  A.shark = function (ctx, x, y, r, o) {
    o = o || {};
    const t = o.t || 0, f = o.facing || 1;
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(f, 1);
    ctx.rotate(o.tilt || 0);
    const wag = Math.sin(t * 6) * 0.18;
    const top = o.tiger ? '#6f7a72' : '#6b7f92';
    const dark = o.tiger ? '#3b443e' : '#3d4d5d';
    // ekor
    ctx.save();
    ctx.translate(-r * 1.25, -r * 0.02);
    ctx.rotate(wag);
    ctx.fillStyle = dark;
    ctx.beginPath();
    ctx.moveTo(r * 0.15, 0);
    ctx.lineTo(-r * 0.45, -r * 0.62);
    ctx.lineTo(-r * 0.25, 0);
    ctx.lineTo(-r * 0.38, r * 0.38);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
    // sirip punggung
    ctx.fillStyle = dark;
    ctx.beginPath();
    ctx.moveTo(r * 0.15, -r * 0.3);
    ctx.quadraticCurveTo(-r * 0.05, -r * 0.65, -r * 0.3, -r * 0.82);
    ctx.lineTo(-r * 0.32, -r * 0.28);
    ctx.closePath();
    ctx.fill();
    // badan
    const g = ctx.createLinearGradient(0, -r * 0.4, 0, r * 0.4);
    g.addColorStop(0, top);
    g.addColorStop(0.55, top);
    g.addColorStop(0.62, '#dfe6ea');
    g.addColorStop(1, '#f2f5f6');
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.moveTo(r * 1.35, r * 0.02);
    ctx.quadraticCurveTo(r * 1.2, -r * 0.38, r * 0.4, -r * 0.4);
    ctx.quadraticCurveTo(-r * 0.6, -r * 0.42, -r * 1.3, -r * 0.05);
    ctx.quadraticCurveTo(-r * 0.6, r * 0.28, r * 0.4, r * 0.32);
    ctx.quadraticCurveTo(r * 1.15, r * 0.3, r * 1.35, r * 0.02);
    ctx.closePath();
    ctx.fill();
    if (o.tiger) {
      ctx.strokeStyle = 'rgba(30,35,30,0.45)';
      ctx.lineWidth = Math.max(1.5, r * 0.06);
      for (let i = 0; i < 7; i++) {
        const sx = r * (0.7 - i * 0.26);
        ctx.beginPath();
        ctx.moveTo(sx, -r * 0.36);
        ctx.lineTo(sx - r * 0.08, -r * 0.08);
        ctx.stroke();
      }
    }
    // sirip dada
    ctx.fillStyle = dark;
    ctx.beginPath();
    ctx.moveTo(r * 0.45, r * 0.2);
    ctx.lineTo(r * 0.05, r * 0.7);
    ctx.lineTo(r * 0.12, r * 0.25);
    ctx.closePath();
    ctx.fill();
    // insang
    ctx.strokeStyle = 'rgba(0,0,0,0.3)';
    ctx.lineWidth = Math.max(1, r * 0.03);
    for (let i = 0; i < 4; i++) {
      ctx.beginPath();
      ctx.moveTo(r * (0.62 - i * 0.07), -r * 0.12);
      ctx.lineTo(r * (0.58 - i * 0.07), r * 0.12);
      ctx.stroke();
    }
    ctx.fillStyle = '#0c0c0c';
    ell(ctx, r * 0.95, -r * 0.1, r * 0.06, r * 0.06);
    ctx.fill();
    ctx.strokeStyle = 'rgba(0,0,0,0.45)';
    ctx.beginPath();
    ctx.moveTo(r * 1.2, r * 0.14);
    ctx.quadraticCurveTo(r * 1.0, r * 0.2, r * 0.82, r * 0.14);
    ctx.stroke();
    ctx.restore();
  };

  /* ---------------- Ubur-ubur ---------------- */
  A.jelly = function (ctx, x, y, r, t, col) {
    col = col || [255, 150, 200];
    const pulse = 1 + Math.sin(t * 3) * 0.08;
    ctx.save();
    ctx.translate(x, y);
    ctx.strokeStyle = `rgba(${col[0]},${col[1]},${col[2]},0.6)`;
    ctx.lineWidth = Math.max(1, r * 0.09);
    for (let i = 0; i < 5; i++) {
      const sx = (-0.6 + i * 0.3) * r;
      ctx.beginPath();
      ctx.moveTo(sx, r * 0.25);
      for (let k = 1; k <= 6; k++) {
        ctx.lineTo(sx + Math.sin(t * 3 + k * 0.9 + i) * r * 0.14, r * 0.25 + k * r * 0.26);
      }
      ctx.stroke();
    }
    const g = ctx.createRadialGradient(0, -r * 0.25, r * 0.1, 0, 0, r * 1.1);
    g.addColorStop(0, `rgba(255,255,255,0.9)`);
    g.addColorStop(0.4, `rgba(${col[0]},${col[1]},${col[2]},0.75)`);
    g.addColorStop(1, `rgba(${col[0]},${col[1]},${col[2]},0.3)`);
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.moveTo(-r * pulse, r * 0.25);
    ctx.bezierCurveTo(-r * pulse, -r * 1.05, r * pulse, -r * 1.05, r * pulse, r * 0.25);
    for (let i = 4; i >= 0; i--) {
      const xx = (-1 + i * 0.5) * r * pulse;
      ctx.quadraticCurveTo(xx + r * 0.25 * pulse, r * 0.45, xx, r * 0.25);
    }
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  };

  /* ---------------- Sampah ---------------- */
  A.bag = function (ctx, x, y, r, t) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(Math.sin(t * 1.7) * 0.25);
    const sq = 1 + Math.sin(t * 2.4) * 0.06;
    ctx.scale(sq, 2 - sq);
    ctx.strokeStyle = 'rgba(235,240,245,0.85)';
    ctx.lineWidth = Math.max(1.5, r * 0.12);
    ctx.beginPath();
    ctx.arc(-r * 0.42, -r * 0.75, r * 0.22, Math.PI, 0);
    ctx.moveTo(r * 0.2, -r * 0.75);
    ctx.arc(r * 0.42, -r * 0.75, r * 0.22, Math.PI, 0);
    ctx.stroke();
    ctx.fillStyle = 'rgba(230,236,242,0.62)';
    ctx.beginPath();
    ctx.moveTo(-r * 0.7, -r * 0.75);
    ctx.lineTo(r * 0.7, -r * 0.75);
    ctx.quadraticCurveTo(r * 1.0, 0, r * 0.75, r * 0.6);
    for (let i = 0; i < 6; i++) {
      const xx = r * (0.75 - (i + 1) * 0.25);
      ctx.lineTo(xx + r * 0.12, r * (0.85 + Math.sin(t * 4 + i) * 0.12));
      ctx.lineTo(xx, r * 0.62);
    }
    ctx.quadraticCurveTo(-r * 1.0, 0, -r * 0.7, -r * 0.75);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = 'rgba(160,170,185,0.7)';
    ctx.lineWidth = Math.max(1, r * 0.05);
    ctx.beginPath();
    ctx.moveTo(-r * 0.3, -r * 0.55); ctx.lineTo(-r * 0.15, r * 0.3);
    ctx.moveTo(r * 0.25, -r * 0.5); ctx.lineTo(r * 0.1, r * 0.4);
    ctx.stroke();
    ctx.restore();
  };

  A.bottle = function (ctx, x, y, r, t, rot) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rot || 0);
    ctx.fillStyle = 'rgba(170,220,240,0.6)';
    ctx.strokeStyle = 'rgba(220,245,255,0.9)';
    ctx.lineWidth = Math.max(1, r * 0.08);
    ctx.beginPath();
    ctx.moveTo(-r * 1.1, -r * 0.42);
    ctx.lineTo(r * 0.5, -r * 0.42);
    ctx.quadraticCurveTo(r * 0.7, -r * 0.42, r * 0.85, -r * 0.18);
    ctx.lineTo(r * 1.05, -r * 0.18);
    ctx.lineTo(r * 1.05, r * 0.18);
    ctx.lineTo(r * 0.85, r * 0.18);
    ctx.quadraticCurveTo(r * 0.7, r * 0.42, r * 0.5, r * 0.42);
    ctx.lineTo(-r * 1.1, r * 0.42);
    ctx.quadraticCurveTo(-r * 1.25, 0, -r * 1.1, -r * 0.42);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = '#2f7de0';
    ctx.fillRect(r * 1.02, -r * 0.24, r * 0.22, r * 0.48);
    ctx.fillStyle = 'rgba(255,255,255,0.55)';
    ctx.fillRect(-r * 0.6, -r * 0.42, r * 0.55, r * 0.84);
    ctx.restore();
  };

  A.straw = function (ctx, x, y, r, rot) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rot || 0);
    const w = r * 2.2, h = Math.max(3, r * 0.28);
    ctx.fillStyle = '#fff';
    ctx.fillRect(-w / 2, -h / 2, w, h);
    ctx.fillStyle = '#ef4b5f';
    for (let i = 0; i < 6; i++) ctx.fillRect(-w / 2 + i * w / 6, -h / 2, w / 12, h);
    ctx.restore();
  };

  A.cap = function (ctx, x, y, r, col) {
    ctx.fillStyle = col || '#ff8a3d';
    ell(ctx, x, y, r, r * 0.85);
    ctx.fill();
    ctx.strokeStyle = 'rgba(0,0,0,0.25)';
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.fillStyle = 'rgba(255,255,255,0.35)';
    ell(ctx, x - r * 0.25, y - r * 0.25, r * 0.35, r * 0.25);
    ctx.fill();
  };

  A.net = function (ctx, x, y, w, h, t) {
    ctx.save();
    ctx.translate(x, y);
    const cols = Math.max(3, Math.round(w / 22)), rows = Math.max(3, Math.round(h / 22));
    const P = (i, j) => [
      -w / 2 + (i / cols) * w + Math.sin(t * 1.4 + j * 0.7) * 5,
      -h / 2 + (j / rows) * h + Math.sin(t * 1.1 + i * 0.6) * 4 + (j / rows) * Math.sin(i / cols * Math.PI) * 10
    ];
    ctx.strokeStyle = 'rgba(190,205,170,0.8)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (let j = 0; j <= rows; j++) {
      for (let i = 0; i <= cols; i++) {
        const p = P(i, j);
        if (i === 0) ctx.moveTo(p[0], p[1]); else ctx.lineTo(p[0], p[1]);
      }
    }
    for (let i = 0; i <= cols; i++) {
      for (let j = 0; j <= rows; j++) {
        const p = P(i, j);
        if (j === 0) ctx.moveTo(p[0], p[1]); else ctx.lineTo(p[0], p[1]);
      }
    }
    ctx.stroke();
    ctx.strokeStyle = 'rgba(120,135,105,0.9)';
    ctx.lineWidth = 3.5;
    ctx.beginPath();
    for (let i = 0; i <= cols; i++) {
      const p = P(i, 0);
      if (i === 0) ctx.moveTo(p[0], p[1]); else ctx.lineTo(p[0], p[1]);
    }
    ctx.stroke();
    for (let i = 0; i <= cols; i += 2) {
      const p = P(i, 0);
      ctx.fillStyle = '#ff7a2f';
      ell(ctx, p[0], p[1] - 4, 7, 6);
      ctx.fill();
    }
    ctx.restore();
  };

  /* ---------------- Kapal nelayan ---------------- */
  A.boat = function (ctx, x, sy, L, t, facing) {
    ctx.save();
    ctx.translate(x, sy);
    ctx.scale(facing || 1, 1);
    const bob = Math.sin(t * 2) * 2;
    ctx.translate(0, bob);
    // baling-baling (bawah air, di buritan)
    ctx.save();
    ctx.translate(-L * 0.42, 26);
    const sp = Math.abs(Math.sin(t * 25));
    ctx.fillStyle = '#c9a542';
    ell(ctx, 0, -9 * sp, 4, 9 * sp + 1); ctx.fill();
    ell(ctx, 0, 9 * sp, 4, 9 * sp + 1); ctx.fill();
    ctx.fillStyle = '#7a6420';
    ell(ctx, 0, 0, 4, 4); ctx.fill();
    ctx.strokeStyle = '#555';
    ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(L * 0.1, -16); ctx.stroke();
    ctx.restore();
    // lambung
    ctx.fillStyle = '#1f6fb5';
    ctx.beginPath();
    ctx.moveTo(-L * 0.5, -22);
    ctx.lineTo(L * 0.55, -26);
    ctx.quadraticCurveTo(L * 0.42, 10, L * 0.25, 14);
    ctx.lineTo(-L * 0.4, 14);
    ctx.quadraticCurveTo(-L * 0.5, 4, -L * 0.5, -22);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = '#f2c230';
    ctx.fillRect(-L * 0.48, -16, L * 0.98, 6);
    ctx.fillStyle = '#d93a3a';
    ctx.fillRect(-L * 0.46, -8, L * 0.9, 5);
    // kabin
    ctx.fillStyle = '#f4efe2';
    ctx.fillRect(-L * 0.25, -52, L * 0.3, 30);
    ctx.fillStyle = '#2c3e50';
    ctx.fillRect(-L * 0.2, -46, L * 0.08, 10);
    ctx.fillRect(-L * 0.08, -46, L * 0.08, 10);
    ctx.fillStyle = '#c0392b';
    ctx.fillRect(-L * 0.27, -56, L * 0.34, 6);
    // tiang
    ctx.strokeStyle = '#6d4c2f';
    ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(L * 0.25, -24); ctx.lineTo(L * 0.25, -78); ctx.stroke();
    ctx.fillStyle = '#e74c3c';
    ctx.beginPath(); ctx.moveTo(L * 0.25, -78); ctx.lineTo(L * 0.4, -72); ctx.lineTo(L * 0.25, -66); ctx.fill();
    ctx.restore();
  };

  /* ---------------- Burung laut ---------------- */
  A.bird = function (ctx, x, y, r, t, dive, facing) {
    ctx.save();
    ctx.translate(x, y);
    if (dive) {
      ctx.rotate(Math.PI / 2);
    } else {
      ctx.scale(facing || 1, 1);
    }
    const fl = dive ? 0.15 : Math.sin(t * 10) * 0.8;
    ctx.fillStyle = '#5b6470';
    for (const s of [-1, 1]) {
      ctx.save();
      ctx.scale(1, s);
      ctx.beginPath();
      ctx.moveTo(-r * 0.1, 0);
      ctx.quadraticCurveTo(-r * 0.2, -r * (0.6 + fl * 0.5), -r * (dive ? 0.6 : 0.3), -r * (dive ? 0.25 : 1.3 * (0.4 + fl * 0.6 + 0.6)));
      ctx.quadraticCurveTo(r * 0.2, -r * 0.4, r * 0.25, 0);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }
    ctx.fillStyle = '#f5f5f5';
    ell(ctx, 0, 0, r * 0.7, r * 0.26);
    ctx.fill();
    ctx.fillStyle = '#f39c12';
    ctx.beginPath();
    ctx.moveTo(r * 0.65, -r * 0.06); ctx.lineTo(r * 1.0, 0); ctx.lineTo(r * 0.65, r * 0.06);
    ctx.fill();
    ctx.fillStyle = '#222';
    ell(ctx, r * 0.5, -r * 0.08, r * 0.05, r * 0.05);
    ctx.fill();
    ctx.restore();
  };

  /* ---------------- Makanan ---------------- */
  A.plankton = function (ctx, x, y, r, t) {
    for (let i = 0; i < 3; i++) {
      const a = t * 1.5 + i * 2.1;
      const px = x + Math.cos(a) * r * 0.7, py = y + Math.sin(a) * r * 0.7;
      const g = ctx.createRadialGradient(px, py, 0, px, py, r * 0.8);
      g.addColorStop(0, 'rgba(200,255,230,0.95)');
      g.addColorStop(1, 'rgba(120,255,200,0)');
      ctx.fillStyle = g;
      ell(ctx, px, py, r * 0.8, r * 0.8);
      ctx.fill();
    }
  };

  A.fishEggs = function (ctx, x, y, r) {
    const rr = rng(17);
    for (let i = 0; i < 7; i++) {
      const px = x + (rr() - 0.5) * r * 1.4, py = y + (rr() - 0.5) * r * 1.4;
      ctx.fillStyle = 'rgba(255,170,80,0.9)';
      ell(ctx, px, py, r * 0.32, r * 0.32);
      ctx.fill();
      ctx.fillStyle = 'rgba(255,255,255,0.7)';
      ell(ctx, px - r * 0.1, py - r * 0.1, r * 0.1, r * 0.1);
      ctx.fill();
    }
  };

  A.shrimp = function (ctx, x, y, r, t, facing) {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(facing || 1, 1);
    ctx.strokeStyle = '#ff9a8a';
    ctx.lineWidth = Math.max(1, r * 0.08);
    ctx.beginPath();
    ctx.moveTo(r * 0.8, -r * 0.1);
    ctx.quadraticCurveTo(r * 1.5, -r * 0.8, r * 2.0, -r * 0.4 + Math.sin(t * 5) * r * 0.2);
    ctx.stroke();
    ctx.fillStyle = '#ff7f6e';
    ctx.beginPath();
    ctx.moveTo(r * 0.9, 0);
    ctx.quadraticCurveTo(r * 0.3, -r * 0.8, -r * 0.6, -r * 0.3);
    ctx.quadraticCurveTo(-r * 1.0, r * 0.1, -r * 0.7, r * 0.5);
    ctx.quadraticCurveTo(r * 0.2, r * 0.45, r * 0.9, 0);
    ctx.fill();
    ctx.strokeStyle = 'rgba(160,40,30,0.5)';
    ctx.lineWidth = 1;
    for (let i = 0; i < 4; i++) {
      ctx.beginPath();
      ctx.moveTo(r * (0.5 - i * 0.3), -r * 0.45);
      ctx.lineTo(r * (0.45 - i * 0.3), r * 0.35);
      ctx.stroke();
    }
    ctx.fillStyle = '#222';
    ell(ctx, r * 0.6, -r * 0.2, r * 0.08, r * 0.08);
    ctx.fill();
    ctx.restore();
  };

  A.crabSide = function (ctx, x, y, r, t) {
    ctx.save();
    ctx.translate(x, y);
    ctx.strokeStyle = '#d35400';
    ctx.lineWidth = Math.max(1.5, r * 0.12);
    for (const s of [-1, 1]) {
      for (let i = 0; i < 3; i++) {
        const a = Math.sin(t * 10 + i) * 0.2;
        ctx.beginPath();
        ctx.moveTo(s * r * 0.4, r * 0.1);
        ctx.lineTo(s * r * (0.9 + i * 0.15), r * (0.2 + a));
        ctx.lineTo(s * r * (1.0 + i * 0.15), r * 0.7);
        ctx.stroke();
      }
    }
    ctx.fillStyle = '#e8732a';
    ell(ctx, 0, 0, r * 0.75, r * 0.5);
    ctx.fill();
    for (const s of [-1, 1]) {
      ell(ctx, s * r * 0.95, -r * 0.45, r * 0.28, r * 0.22);
      ctx.fill();
    }
    ctx.fillStyle = '#222';
    ell(ctx, -r * 0.2, -r * 0.5, r * 0.08, r * 0.08); ctx.fill();
    ell(ctx, r * 0.2, -r * 0.5, r * 0.08, r * 0.08); ctx.fill();
    ctx.restore();
  };

  A.seagrass = function (ctx, x, y, r, t) {
    ctx.save();
    ctx.translate(x, y);
    for (let i = 0; i < 6; i++) {
      const bx = (i - 2.5) * r * 0.28;
      const h = r * (1.6 + (i % 3) * 0.35);
      const sw = Math.sin(t * 1.8 + i) * r * 0.35;
      ctx.strokeStyle = i % 2 ? '#3fa34d' : '#5cc160';
      ctx.lineWidth = Math.max(2, r * 0.18);
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(bx, r * 0.8);
      ctx.quadraticCurveTo(bx + sw * 0.4, r * 0.8 - h * 0.5, bx + sw, r * 0.8 - h);
      ctx.stroke();
    }
    ctx.restore();
  };

  A.algae = function (ctx, x, y, r, t) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(Math.sin(t) * 0.3);
    ctx.fillStyle = '#6fbf4a';
    for (let i = 0; i < 5; i++) {
      const a = i / 5 * TAU;
      ell(ctx, Math.cos(a) * r * 0.45, Math.sin(a) * r * 0.45, r * 0.5, r * 0.28, a);
      ctx.fill();
    }
    ctx.fillStyle = '#8fd65e';
    ell(ctx, 0, 0, r * 0.38, r * 0.38);
    ctx.fill();
    ctx.restore();
  };

  A.sponge = function (ctx, x, y, r, t, hue) {
    ctx.save();
    ctx.translate(x, y);
    const cols = hue === 1 ? ['#9b59b6', '#7d3c98'] : ['#ff9f43', '#e67e22'];
    const tubes = [[-0.45, 1.2], [0, 1.6], [0.45, 1.0]];
    for (const [bx, h] of tubes) {
      ctx.fillStyle = cols[0];
      ctx.beginPath();
      ctx.moveTo(r * (bx - 0.2), r * 0.8);
      ctx.lineTo(r * (bx - 0.24), r * (0.8 - h));
      ctx.lineTo(r * (bx + 0.24), r * (0.8 - h));
      ctx.lineTo(r * (bx + 0.2), r * 0.8);
      ctx.fill();
      ctx.fillStyle = cols[1];
      ell(ctx, r * bx, r * (0.8 - h), r * 0.24, r * 0.09);
      ctx.fill();
      ctx.fillStyle = 'rgba(0,0,0,0.25)';
      ell(ctx, r * bx, r * (0.8 - h), r * 0.14, r * 0.05);
      ctx.fill();
    }
    ctx.restore();
  };

  A.sargassum = function (ctx, x, y, w, t) {
    ctx.save();
    ctx.translate(x, y);
    const rr = rng(Math.floor(w * 13));
    ctx.strokeStyle = '#a9782c';
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    for (let i = 0; i < 9; i++) {
      const bx = (rr() - 0.5) * w;
      const len = 25 + rr() * 35;
      const sw = Math.sin(t * 1.5 + i) * 6;
      ctx.beginPath();
      ctx.moveTo(bx, 0);
      ctx.quadraticCurveTo(bx + sw, len * 0.5, bx + sw * 1.5 + (rr() - 0.5) * 20, len);
      ctx.stroke();
    }
    for (let i = 0; i < 26; i++) {
      const bx = (rr() - 0.5) * w, by = rr() * 45;
      ctx.fillStyle = i % 3 ? '#c8973c' : '#d9b04f';
      ell(ctx, bx + Math.sin(t + i) * 2, by, 9 + rr() * 6, 4 + rr() * 3, rr() * 3);
      ctx.fill();
      if (i % 2 === 0) {
        ctx.fillStyle = '#8f6421';
        ell(ctx, bx + 6, by + 4, 3, 3);
        ctx.fill();
      }
    }
    ctx.restore();
  };

  /* ---------------- Elemen pantai (tampak atas) ---------------- */
  A.ghostCrab = function (ctx, x, y, r, t, angle) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle || 0);
    ctx.strokeStyle = '#e8dcc0';
    ctx.lineWidth = Math.max(1.5, r * 0.12);
    for (const s of [-1, 1]) {
      for (let i = 0; i < 4; i++) {
        const a = Math.sin(t * 16 + i * 1.3) * 0.25;
        ctx.beginPath();
        ctx.moveTo((i - 1.5) * r * 0.25, s * r * 0.35);
        ctx.lineTo((i - 1.5) * r * 0.32 + a * r, s * r * 1.0);
        ctx.stroke();
      }
    }
    ctx.fillStyle = '#f2e7cc';
    ell(ctx, 0, 0, r * 0.62, r * 0.55);
    ctx.fill();
    ctx.fillStyle = '#d8c79f';
    ell(ctx, r * 0.55, -r * 0.35, r * 0.25, r * 0.18); ctx.fill();
    ell(ctx, r * 0.55, r * 0.35, r * 0.25, r * 0.18); ctx.fill();
    ctx.fillStyle = '#111';
    ell(ctx, r * 0.45, -r * 0.18, r * 0.09, r * 0.09); ctx.fill();
    ell(ctx, r * 0.45, r * 0.18, r * 0.09, r * 0.09); ctx.fill();
    ctx.restore();
  };

  A.lampGlow = function (ctx, x, y, R, t, alpha) {
    const fl = 1 + Math.sin(t * 13) * 0.02;
    const g = ctx.createRadialGradient(x, y, 0, x, y, R * fl);
    g.addColorStop(0, `rgba(255,236,170,${0.75 * alpha})`);
    g.addColorStop(0.35, `rgba(255,214,120,${0.32 * alpha})`);
    g.addColorStop(1, 'rgba(255,200,90,0)');
    ctx.fillStyle = g;
    ell(ctx, x, y, R * fl, R * fl);
    ctx.fill();
  };

  A.lampPost = function (ctx, x, y) {
    ctx.fillStyle = '#3b3b3b';
    ell(ctx, x, y, 10, 10);
    ctx.fill();
    ctx.fillStyle = '#fff6cf';
    ell(ctx, x, y, 6, 6);
    ctx.fill();
  };

  A.person = function (ctx, x, y, r, angle, t, vest) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);
    const step = Math.sin(t * 8) * r * 0.25;
    ctx.fillStyle = '#2d2d2d';
    ell(ctx, step, -r * 0.3, r * 0.3, r * 0.18); ctx.fill();
    ell(ctx, -step, r * 0.3, r * 0.3, r * 0.18); ctx.fill();
    ctx.fillStyle = vest || '#3d6fa8';
    ell(ctx, 0, 0, r * 0.45, r * 0.8);
    ctx.fill();
    ctx.fillStyle = '#d9a77c';
    ell(ctx, r * 0.1, 0, r * 0.38, r * 0.38);
    ctx.fill();
    ctx.fillStyle = '#2b1d14';
    ell(ctx, -r * 0.02, 0, r * 0.33, r * 0.34);
    ctx.fill();
    ctx.restore();
  };

  A.cone = function (ctx, x, y, angle, len, spread, col, alpha) {
    const g = ctx.createRadialGradient(x, y, 0, x, y, len);
    g.addColorStop(0, `rgba(${col},${0.55 * alpha})`);
    g.addColorStop(1, `rgba(${col},0)`);
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.arc(x, y, len, angle - spread, angle + spread);
    ctx.closePath();
    ctx.fill();
  };

  A.log = function (ctx, x, y, r, rot) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rot);
    ctx.fillStyle = '#6e4b2a';
    ctx.beginPath();
    ctx.ellipse(0, 0, r * 1.5, r * 0.5, 0, 0, TAU);
    ctx.fill();
    ctx.strokeStyle = '#4a3019';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(-r * 1.1, -r * 0.1); ctx.lineTo(r * 0.8, -r * 0.18);
    ctx.moveTo(-r * 0.6, r * 0.2); ctx.lineTo(r * 1.0, r * 0.12);
    ctx.stroke();
    ctx.fillStyle = '#a07a4f';
    ell(ctx, r * 1.45, 0, r * 0.18, r * 0.45);
    ctx.fill();
    ctx.restore();
  };

  A.trashPile = function (ctx, x, y, r, seed) {
    const rr = rng(seed || 3);
    ctx.fillStyle = 'rgba(0,0,0,0.25)';
    ell(ctx, x + 3, y + 4, r * 1.1, r * 0.8);
    ctx.fill();
    for (let i = 0; i < 6; i++) {
      const px = x + (rr() - 0.5) * r * 1.2, py = y + (rr() - 0.5) * r * 0.9;
      const k = rr();
      if (k < 0.35) A.bottle(ctx, px, py, r * 0.35, 0, rr() * 6);
      else if (k < 0.6) A.cap(ctx, px, py, r * 0.15, ['#e74c3c', '#3498db', '#f1c40f'][i % 3]);
      else {
        ctx.fillStyle = ['rgba(240,240,240,0.85)', 'rgba(52,152,219,0.7)', 'rgba(231,76,60,0.7)'][i % 3];
        ell(ctx, px, py, r * 0.35, r * 0.22, rr() * 3);
        ctx.fill();
      }
    }
  };

  A.pandan = function (ctx, x, y, r, t) {
    ctx.save();
    ctx.translate(x, y);
    for (let i = 0; i < 11; i++) {
      const a = -Math.PI / 2 + (i - 5) * 0.28 + Math.sin(t * 0.8 + i) * 0.03;
      const L = r * (1.0 + (i % 3) * 0.25);
      ctx.strokeStyle = i % 2 ? '#2f7d3a' : '#3f9a4a';
      ctx.lineWidth = Math.max(2, r * 0.12);
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.quadraticCurveTo(Math.cos(a) * L * 0.5, Math.sin(a) * L * 0.5 - r * 0.1, Math.cos(a) * L, Math.sin(a) * L);
      ctx.stroke();
    }
    ctx.restore();
  };

  A.incubator = function (ctx, x, y, t) {
    ctx.save();
    ctx.translate(x, y);
    ctx.fillStyle = 'rgba(0,0,0,0.3)';
    ctx.fillRect(-36, -26, 80, 60);
    ctx.fillStyle = '#e9f1f7';
    ctx.fillRect(-40, -30, 80, 60);
    ctx.strokeStyle = '#7f9db4';
    ctx.lineWidth = 3;
    ctx.strokeRect(-40, -30, 80, 60);
    ctx.fillStyle = '#183b5c';
    ctx.fillRect(-28, -20, 56, 18);
    ctx.fillStyle = '#5ef2a3';
    ctx.font = 'bold 12px system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('28,5°C', 0, -11);
    ctx.fillStyle = '#f7f1df';
    for (let i = 0; i < 5; i++) { ell(ctx, -24 + i * 12, 14, 5, 6); ctx.fill(); }
    ctx.restore();
  };

  A.fence = function (ctx, x, y, w, h) {
    ctx.save();
    ctx.translate(x, y);
    ctx.strokeStyle = '#a57c45';
    ctx.lineWidth = 4;
    ctx.setLineDash([10, 6]);
    ctx.beginPath();
    ctx.moveTo(w / 2, -h / 2);
    ctx.lineTo(-w / 2, -h / 2);
    ctx.lineTo(-w / 2, h / 2);
    ctx.lineTo(w / 2, h / 2);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = '#7a5a2e';
    for (let i = 0; i <= 6; i++) {
      ell(ctx, -w / 2 + (i / 6) * w, -h / 2, 4, 4); ctx.fill();
      ell(ctx, -w / 2 + (i / 6) * w, h / 2, 4, 4); ctx.fill();
    }
    ctx.restore();
  };

  A.nestPit = function (ctx, x, y, r) {
    const g = ctx.createRadialGradient(x, y, 0, x, y, r);
    g.addColorStop(0, 'rgba(70,50,30,0.8)');
    g.addColorStop(1, 'rgba(70,50,30,0)');
    ctx.fillStyle = g;
    ell(ctx, x, y, r, r * 0.8);
    ctx.fill();
    ctx.fillStyle = '#f3ecd8';
    const rr = rng(21);
    for (let i = 0; i < 6; i++) {
      ctx.save();
      ctx.translate(x + (rr() - 0.5) * r, y + (rr() - 0.5) * r * 0.7);
      ctx.rotate(rr() * 6);
      ctx.beginPath();
      ctx.arc(0, 0, 4, 0, Math.PI);
      ctx.fill();
      ctx.restore();
    }
  };

  A.egg = function (ctx, x, y, s) {
    ctx.fillStyle = '#f8f3e3';
    ell(ctx, x, y, s, s * 1.05);
    ctx.fill();
    ctx.fillStyle = 'rgba(255,255,255,0.8)';
    ell(ctx, x - s * 0.3, y - s * 0.3, s * 0.3, s * 0.25);
    ctx.fill();
  };

  /* ---------------- Ikon HUD ---------------- */
  A.heart = function (ctx, x, y, s, col) {
    ctx.save();
    ctx.translate(x, y);
    ctx.fillStyle = col || '#ff5d73';
    ctx.beginPath();
    ctx.moveTo(0, s * 0.35);
    ctx.bezierCurveTo(-s * 1.1, -s * 0.35, -s * 0.45, -s * 1.0, 0, -s * 0.45);
    ctx.bezierCurveTo(s * 0.45, -s * 1.0, s * 1.1, -s * 0.35, 0, s * 0.35);
    ctx.fill();
    ctx.restore();
  };

  A.bubbleIcon = function (ctx, x, y, s) {
    ctx.strokeStyle = '#bfe9ff';
    ctx.lineWidth = 2;
    ell(ctx, x, y, s * 0.55, s * 0.55);
    ctx.stroke();
    ell(ctx, x + s * 0.55, y - s * 0.45, s * 0.25, s * 0.25);
    ctx.stroke();
    ctx.fillStyle = 'rgba(255,255,255,0.8)';
    ell(ctx, x - s * 0.18, y - s * 0.18, s * 0.12, s * 0.12);
    ctx.fill();
  };

  A.leafIcon = function (ctx, x, y, s) {
    ctx.fillStyle = '#7ee08a';
    ctx.beginPath();
    ctx.moveTo(x - s * 0.7, y + s * 0.5);
    ctx.quadraticCurveTo(x - s * 0.6, y - s * 0.7, x + s * 0.7, y - s * 0.6);
    ctx.quadraticCurveTo(x + s * 0.5, y + s * 0.6, x - s * 0.7, y + s * 0.5);
    ctx.fill();
  };

  /* Gambar kecil penyu untuk kartu pilihan (canvas terpisah) */
  A.renderPortrait = function (canvas, sp, t) {
    const ctx = canvas.getContext('2d');
    const w = canvas.width, h = canvas.height;
    ctx.clearRect(0, 0, w, h);
    const g = ctx.createLinearGradient(0, 0, 0, h);
    g.addColorStop(0, '#0f7fae');
    g.addColorStop(1, '#0a3f6b');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = 'rgba(255,255,255,0.08)';
    for (let i = 0; i < 4; i++) {
      ctx.beginPath();
      ctx.moveTo(w * (0.1 + i * 0.25), 0);
      ctx.lineTo(w * (0.2 + i * 0.25), 0);
      ctx.lineTo(w * (0.05 + i * 0.25), h);
      ctx.lineTo(w * (-0.05 + i * 0.25), h);
      ctx.fill();
    }
    const r = h * 0.3 * (sp.id === 'belimbing' ? 1.08 : sp.id === 'lekang' ? 0.92 : 1);
    A.turtleSide(ctx, w * 0.44, h * 0.5 + Math.sin(t * 1.5) * 3, r, sp, { t: t, facing: 1, swim: 0.6 });
  };

  window.PB_ART = A;
})();
