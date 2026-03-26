import { useRef, useEffect, useCallback } from "react";

interface GraphPlaygroundProps {
  fn: (x: number, params: Record<string, number>) => number;
  params: Record<string, number>;
  xRange?: [number, number];
  yRange?: [number, number];
  label?: string;
}

const W = 480;
const H = 280;
const PAD = 40;

export default function GraphPlayground({
  fn,
  params,
  xRange = [-5, 5],
  yRange = [-3, 3],
  label,
}: GraphPlaygroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.scale(dpr, dpr);

    // Clear
    ctx.clearRect(0, 0, W, H);

    const [xMin, xMax] = xRange;
    const [yMin, yMax] = yRange;
    const plotW = W - PAD * 2;
    const plotH = H - PAD * 2;

    const toCanvasX = (x: number) => PAD + ((x - xMin) / (xMax - xMin)) * plotW;
    const toCanvasY = (y: number) => PAD + ((yMax - y) / (yMax - yMin)) * plotH;

    // Grid lines
    ctx.strokeStyle = "rgba(120, 88, 58, 0.08)";
    ctx.lineWidth = 1;
    for (let x = Math.ceil(xMin); x <= xMax; x++) {
      ctx.beginPath();
      ctx.moveTo(toCanvasX(x), PAD);
      ctx.lineTo(toCanvasX(x), H - PAD);
      ctx.stroke();
    }
    for (let y = Math.ceil(yMin); y <= yMax; y++) {
      ctx.beginPath();
      ctx.moveTo(PAD, toCanvasY(y));
      ctx.lineTo(W - PAD, toCanvasY(y));
      ctx.stroke();
    }

    // Axes
    ctx.strokeStyle = "rgba(94, 68, 45, 0.35)";
    ctx.lineWidth = 1.5;
    // X axis
    if (yMin <= 0 && yMax >= 0) {
      ctx.beginPath();
      ctx.moveTo(PAD, toCanvasY(0));
      ctx.lineTo(W - PAD, toCanvasY(0));
      ctx.stroke();
    }
    // Y axis
    if (xMin <= 0 && xMax >= 0) {
      ctx.beginPath();
      ctx.moveTo(toCanvasX(0), PAD);
      ctx.lineTo(toCanvasX(0), H - PAD);
      ctx.stroke();
    }

    // Axis labels
    ctx.fillStyle = "rgba(94, 68, 45, 0.5)";
    ctx.font = "11px 'Source Sans 3', sans-serif";
    ctx.textAlign = "center";
    for (let x = Math.ceil(xMin); x <= xMax; x++) {
      if (x === 0) continue;
      ctx.fillText(String(x), toCanvasX(x), H - PAD + 16);
    }
    ctx.textAlign = "right";
    for (let y = Math.ceil(yMin); y <= yMax; y++) {
      if (y === 0) continue;
      ctx.fillText(String(y), PAD - 8, toCanvasY(y) + 4);
    }

    // Plot function
    ctx.beginPath();
    ctx.strokeStyle = "#A0522D";
    ctx.lineWidth = 2.5;
    ctx.lineJoin = "round";

    const steps = plotW * 2;
    let started = false;
    for (let i = 0; i <= steps; i++) {
      const x = xMin + (i / steps) * (xMax - xMin);
      try {
        const y = fn(x, params);
        if (!isFinite(y) || Math.abs(y) > 1e6) {
          started = false;
          continue;
        }
        const cx = toCanvasX(x);
        const cy = toCanvasY(y);
        if (!started) {
          ctx.moveTo(cx, cy);
          started = true;
        } else {
          ctx.lineTo(cx, cy);
        }
      } catch {
        started = false;
      }
    }
    ctx.stroke();

    // Label
    if (label) {
      ctx.fillStyle = "rgba(94, 68, 45, 0.7)";
      ctx.font = "600 12px 'Source Sans 3', sans-serif";
      ctx.textAlign = "left";
      ctx.fillText(label, PAD + 8, PAD + 16);
    }
  }, [fn, params, xRange, yRange, label]);

  useEffect(() => {
    draw();
  }, [draw]);

  return (
    <canvas
      ref={canvasRef}
      className="playground-graph-canvas"
      style={{ width: W, height: H }}
    />
  );
}
