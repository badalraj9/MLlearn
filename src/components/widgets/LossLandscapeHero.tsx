import { useEffect, useRef } from "react";

const GRID = 34;
const X_MIN = -3, X_MAX = 3;
const Y_MIN = -3, Y_MAX = 3;
const AZIMUTH = 38;
const ELEVATION = 32;

const landscapeFormulas = [
  (x: number, y: number) => 0.4 * x * x + 0.6 * y * y,
  (x: number, y: number) =>
    Math.sin(2.5 * x) * Math.cos(2.5 * y) * 1.5 +
    0.5 * Math.sin(4 * x + 1) * Math.cos(3 * y) +
    0.2 * (x * x + y * y),
  (x: number, y: number) =>
    Math.sin(1.8 * x) * Math.cos(1.8 * y) * 0.8 +
    0.3 * Math.sin(3 * x) * Math.cos(2.5 * y) * 0.4 +
    0.15 * (x * x + y * y),
  (x: number, y: number) => 0.15 * (x * x + y * y) + 0.1 * Math.sin(x) * Math.cos(y),
  (x: number, y: number) =>
    0.05 * (x * x + y * y) + 0.02 * Math.sin(3 * x) * Math.cos(3 * y) + 1.0,
  (x: number, y: number) => 2.5 * x * x + 0.1 * y * y,
  (x: number, y: number) =>
    Math.sin(x + 0.5) * Math.sin(y + 0.5) * 1.2 +
    0.3 * Math.cos(2 * x) * Math.cos(2 * y) +
    0.2 * (x * x + y * y) * 0.3,
];

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function lerp(a: number, b: number, t: number): number {
  return a * (1 - t) + b * t;
}

function snapHalf(px: number): number {
  return Math.floor(px) + 0.5;
}

interface GDSegment {
  x: number;
  y: number;
  z: number;
}

function computeGradientPath(formula: (x: number, y: number) => number, seed: number): GDSegment[] {
  let s = seed;
  s = (s * 1664525 + 1013904223) & 0x7fffffff;
  let gx = -2 + (s / 0x7fffffff) * 0.5;
  s = (s * 1664525 + 1013904223) & 0x7fffffff;
  let gy = -2 + (s / 0x7fffffff) * 0.5;
  const path: GDSegment[] = [];
  for (let step = 0; step < 80; step++) {
    const eps = 0.01;
    const dzdx = (formula(gx + eps, gy) - formula(gx - eps, gy)) / (2 * eps);
    const dzdy = (formula(gx, gy + eps) - formula(gx, gy - eps)) / (2 * eps);
    gx -= 0.05 * dzdx;
    gy -= 0.05 * dzdy;
    path.push({ x: gx, y: gy, z: formula(gx, gy) + 0.15 });
  }
  return path;
}

const gdPaths = landscapeFormulas.map((_, i) =>
  computeGradientPath(landscapeFormulas[i], 42 + i * 17)
);

function project3D(
  x: number,
  y: number,
  z: number,
  azimuth: number,
  elevation: number,
  cx: number,
  cy: number,
  scale: number
): [number, number] {
  const azR = (azimuth * Math.PI) / 180;
  const elR = (elevation * Math.PI) / 180;
  const cosA = Math.cos(azR);
  const sinA = Math.sin(azR);
  const cosE = Math.cos(elR);
  const sinE = Math.sin(elR);
  const rx = x * cosA - y * sinA;
  const ry = x * sinA + y * cosA;
  return [cx + (rx * cosE - z * sinE) * scale, cy - (rx * sinE + z * cosE) * scale];
}

function buildZGrid(formula: (x: number, y: number) => number): number[][] {
  const grid: number[][] = [];
  for (let i = 0; i <= GRID; i++) {
    const row: number[] = [];
    const gy = Y_MIN + (i / GRID) * (Y_MAX - Y_MIN);
    for (let j = 0; j <= GRID; j++) {
      const gx = X_MIN + (j / GRID) * (X_MAX - X_MIN);
      row.push(formula(gx, gy));
    }
    grid.push(row);
  }
  return grid;
}

const mathEquations = [
  { text: "\u2207f(x)", x: 0.68, y: 0.06 },
  { text: "\u2112(\u03B8)", x: 0.12, y: 0.1 },
  { text: "KL(p\u2016q)", x: 0.9, y: 0.2 },
  { text: "\u03C3(x)", x: 0.18, y: 0.78 },
  { text: "argmin \u2112(\u03B8)", x: 0.85, y: 0.8 },
  { text: "\uD83D\uDD2Ep[\u00B7]", x: 0.55, y: 0.92 },
  { text: "f: \u211D\u207F \u2192 \u211D", x: 0.02, y: 0.38 },
];

function seededPoints(count: number, seed: number): [number, number][] {
  const pts: [number, number][] = [];
  let s = seed;
  for (let i = 0; i < count; i++) {
    s = (s * 1664525 + 1013904223) & 0x7fffffff;
    const x = (s / 0x7fffffff) * 0.45 + 0.38;
    s = (s * 1664525 + 1013904223) & 0x7fffffff;
    const y = (s / 0x7fffffff) * 0.55 + 0.15;
    pts.push([x, y]);
  }
  return pts;
}

const constPoints = seededPoints(14, 42);

function buildConstellationEdges(pts: [number, number][], threshold: number): number[][] {
  const edges: number[][] = [];
  for (let i = 0; i < pts.length; i++) {
    for (let j = i + 1; j < pts.length; j++) {
      const dx = pts[i][0] - pts[j][0];
      const dy = pts[i][1] - pts[j][1];
      if (Math.sqrt(dx * dx + dy * dy) < threshold) {
        edges.push([i, j]);
      }
    }
  }
  return edges;
}

const constEdges = buildConstellationEdges(constPoints, 0.22);

function computeZRange(zGrid: number[][]): { min: number; max: number } {
  let min = Infinity;
  let max = -Infinity;
  for (let i = 0; i <= GRID; i++) {
    const row = zGrid[i];
    for (let j = 0; j <= GRID; j++) {
      const v = row[j];
      if (v < min) min = v;
      if (v > max) max = v;
    }
  }
  return { min, max };
}

export default function LossLandscapeHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let dpr = 1;
    let animId = 0;

    const state = {
      startTime: 0,
      currentZ: buildZGrid(landscapeFormulas[0]),
      nextZ: buildZGrid(landscapeFormulas[1]),
      currentIdx: 0,
      morphT: 0,
      phase: "first" as "first" | "rest" | "morph",
      restTimer: 0,
    };

    const resize = () => {
      const rect = container.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      if (w < 1 || h < 1) return;
      dpr = window.devicePixelRatio || 1;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(container);

    const cx = w * 0.68;
    const cy = h * 0.52;
    const scale = Math.min(w, h) * 0.14;

    function getColor(z: number, minZ: number, maxZ: number, edgeFade: number): string {
      const t = (z - minZ) / (maxZ - minZ || 1);
      const r = Math.round(lerp(218, 244, t));
      const g = Math.round(lerp(210, 240, t));
      const b = Math.round(lerp(196, 233, t));
      const alpha = lerp(0.55, 0.25, t) * edgeFade * edgeFade;
      return `rgba(${r},${g},${b},${alpha.toFixed(3)})`;
    }

    const render = (timestamp: number) => {
      if (!state.startTime) state.startTime = timestamp;
      const elapsed = timestamp - state.startTime;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      const reveal = Math.min(elapsed / 800, 1);
      const axisReveal = Math.max(0, Math.min((elapsed - 600) / 500, 1));
      const eqReveals = mathEquations.map((_, i) =>
        Math.max(0, Math.min((elapsed - (900 + i * 140)) / 600, 1))
      );
      const constReveal = Math.max(0, Math.min((elapsed - 2200) / 1000, 1));

      if (state.phase === "first") {
        if (elapsed > 3500) {
          state.phase = "rest";
          state.restTimer = 0;
          state.morphT = 0;
        }
        state.currentZ = buildZGrid(landscapeFormulas[0]);
      }

      if (state.phase === "rest") {
        state.restTimer += 16;
        if (state.restTimer >= 2500) {
          state.phase = "morph";
          state.morphT = 0;
          const next = (state.currentIdx + 1) % landscapeFormulas.length;
          state.nextZ = buildZGrid(landscapeFormulas[next]);
          state.currentIdx = next;
        }
      }

      if (state.phase === "morph") {
        state.morphT += 16 / 4000;
        if (state.morphT >= 1) {
          state.morphT = 1;
          state.currentZ = state.nextZ;
          state.phase = "rest";
          state.restTimer = 0;
        } else {
          const t = easeInOutCubic(state.morphT);
          const fCurrent = landscapeFormulas[state.currentIdx === 0 ? landscapeFormulas.length - 1 : state.currentIdx - 1];
          const tempZ = buildZGrid(fCurrent);
          for (let i = 0; i <= GRID; i++) {
            const row = tempZ[i];
            const nRow = state.nextZ[i];
            const cRow = state.currentZ[i];
            for (let j = 0; j <= GRID; j++) {
              cRow[j] = lerp(row[j], nRow[j], t);
            }
          }
        }
      }

      const { min: minZ, max: maxZ } = computeZRange(state.currentZ);

      const quads: { p0: [number, number]; p1: [number, number]; p2: [number, number]; p3: [number, number]; avgZ: number; edgeFade: number }[] = [];

      for (let i = 0; i < GRID; i++) {
        for (let j = 0; j < GRID; j++) {
          const gx1 = X_MIN + (j / GRID) * (X_MAX - X_MIN);
          const gy1 = Y_MIN + (i / GRID) * (Y_MAX - Y_MIN);
          const gx2 = X_MIN + ((j + 1) / GRID) * (X_MAX - X_MIN);
          const gy2 = Y_MIN + ((i + 1) / GRID) * (Y_MAX - Y_MIN);

          const z0 = state.currentZ[i][j];
          const z1 = state.currentZ[i][j + 1];
          const z2 = state.currentZ[i + 1][j + 1];
          const z3 = state.currentZ[i + 1][j];

          const dx = Math.min(j, GRID - 1 - j) / (GRID / 2);
          const dy = Math.min(i, GRID - 1 - i) / (GRID / 2);
          const fade = Math.min(dx, dy);

          const p0 = project3D(gx1, gy1, z0, AZIMUTH, ELEVATION, cx, cy, scale);
          const p1 = project3D(gx2, gy1, z1, AZIMUTH, ELEVATION, cx, cy, scale);
          const p2 = project3D(gx2, gy2, z2, AZIMUTH, ELEVATION, cx, cy, scale);
          const p3 = project3D(gx1, gy2, z3, AZIMUTH, ELEVATION, cx, cy, scale);
          const avgZ = (z0 + z1 + z2 + z3) / 4;

          quads.push({ p0, p1, p2, p3, avgZ, edgeFade: fade });
        }
      }

      quads.sort((a, b) => a.avgZ - b.avgZ);

      for (const q of quads) {
        ctx.beginPath();
        ctx.moveTo(q.p0[0], q.p0[1]);
        ctx.lineTo(q.p1[0], q.p1[1]);
        ctx.lineTo(q.p2[0], q.p2[1]);
        ctx.lineTo(q.p3[0], q.p3[1]);
        ctx.closePath();
        ctx.fillStyle = getColor(q.avgZ, minZ, maxZ, q.edgeFade * reveal);
        ctx.fill();
        ctx.strokeStyle = `rgba(40,35,25,${(0.07 * q.edgeFade * reveal).toFixed(3)})`;
        ctx.lineWidth = 0.4;
        ctx.stroke();
      }

      // axes
      if (axisReveal > 0.01) {
        const axisOrigin = project3D(0, 0, minZ, AZIMUTH, ELEVATION, cx, cy, scale);
        const axisX = project3D(1.5, 0, minZ, AZIMUTH, ELEVATION, cx, cy, scale);
        const axisZ = project3D(0, 0, minZ + 1.5, AZIMUTH, ELEVATION, cx, cy, scale);

        ctx.strokeStyle = `rgba(40,35,25,${(0.12 * axisReveal).toFixed(3)})`;
        ctx.lineWidth = 0.6;
        ctx.beginPath();
        ctx.moveTo(axisOrigin[0], axisOrigin[1]);
        ctx.lineTo(axisX[0], axisX[1]);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(axisOrigin[0], axisOrigin[1]);
        ctx.lineTo(axisZ[0], axisZ[1]);
        ctx.stroke();

        ctx.fillStyle = `rgba(40,35,25,${(0.12 * axisReveal).toFixed(3)})`;
        ctx.font = "11px Georgia, serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "bottom";
        ctx.fillText("x", axisX[0], axisX[1] - 3);
        ctx.textBaseline = "top";
        ctx.fillText("z", axisZ[0], axisZ[1] + 3);
      }

      // gradient descent path
      if (reveal > 0.5) {
        const gdOpacity = Math.min(1, (reveal - 0.5) * 2);
        const prevIdx = state.currentIdx === 0 ? landscapeFormulas.length - 1 : state.currentIdx - 1;
        const fromPath = gdPaths[prevIdx];
        const toPath = gdPaths[state.currentIdx];

        let path2d: [number, number][];
        const isMorphing = state.phase === "morph" && state.morphT > 0 && state.morphT < 1;

        if (isMorphing) {
          const mt = easeInOutCubic(state.morphT);
          path2d = [];
          for (let s = 0; s < fromPath.length; s++) {
            const sx = lerp(fromPath[s].x, toPath[s].x, mt);
            const sy = lerp(fromPath[s].y, toPath[s].y, mt);
            const sz = lerp(fromPath[s].z, toPath[s].z, mt);
            const proj = project3D(sx, sy, sz, AZIMUTH, ELEVATION, cx, cy, scale);
            path2d.push([proj[0], proj[1]]);
          }
        } else {
          path2d = toPath.map((p) => {
            const proj = project3D(p.x, p.y, p.z, AZIMUTH, ELEVATION, cx, cy, scale);
            return [proj[0], proj[1]];
          });
        }

        ctx.beginPath();
        ctx.strokeStyle = `rgba(40,35,25,${(0.19 * gdOpacity).toFixed(3)})`;
        ctx.lineWidth = 1;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.moveTo(path2d[0][0], path2d[0][1]);
        for (let s = 1; s < path2d.length; s++) {
          ctx.lineTo(path2d[s][0], path2d[s][1]);
        }
        ctx.stroke();
        ctx.lineCap = "butt";
        ctx.lineJoin = "miter";

        const start = path2d[0];
        ctx.beginPath();
        ctx.arc(start[0], start[1], 4, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(40,35,25,${(0.4 * gdOpacity).toFixed(3)})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        const end = path2d[path2d.length - 1];
        ctx.beginPath();
        ctx.arc(end[0], end[1], 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(40,35,25,${(0.4 * gdOpacity).toFixed(3)})`;
        ctx.fill();
      }

      // equations
      for (let ei = 0; ei < mathEquations.length; ei++) {
        const eq = mathEquations[ei];
        const o = eqReveals[ei];
        if (o < 0.01) continue;
        ctx.fillStyle = `rgba(40,35,25,${(0.18 * o).toFixed(3)})`;
        ctx.font = "italic 13px Georgia, serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(eq.text, eq.x * w, eq.y * h);
      }

      // constellation
      if (constReveal > 0.01) {
        const scaled = constPoints.map(([px, py]) => [px * w, py * h] as [number, number]);
        for (const [i, j] of constEdges) {
          ctx.beginPath();
          ctx.moveTo(scaled[i][0], scaled[i][1]);
          ctx.lineTo(scaled[j][0], scaled[j][1]);
          ctx.strokeStyle = `rgba(40,35,25,${(0.06 * constReveal).toFixed(3)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
        for (const [px, py] of scaled) {
          ctx.beginPath();
          ctx.arc(px, py, 1.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(40,35,25,${(0.12 * constReveal).toFixed(3)})`;
          ctx.fill();
        }
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0,
        pointerEvents: "none",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          display: "block",
          width: "100%",
          height: "100%",
          background: "transparent",
        }}
      />
    </div>
  );
}