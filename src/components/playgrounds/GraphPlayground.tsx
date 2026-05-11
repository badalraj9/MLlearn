import { useRef, useEffect, useCallback } from "react";

interface GraphPlaygroundProps {
  fn: (x: number, params: Record<string, number>) => number;
  params: Record<string, number>;
  xRange?: [number, number];
  yRange?: [number, number];
  label?: string;
  height?: number;
}

export default function GraphPlayground({
  fn,
  params,
  xRange = [-5, 5],
  yRange = [-3, 3],
  label,
  height = 220,
}: GraphPlaygroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const W = canvas.offsetWidth;
    const H = height;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.scale(dpr, dpr);

    ctx.clearRect(0, 0, W, H);

    const [xMin, xMax] = xRange;
    const [yMin, yMax] = yRange;
    const padX = Math.round(W * 0.08);
    const padY = Math.round(H * 0.1);
    const plotW = W - padX * 2;
    const plotH = H - padY * 2;

    const toCanvasX = (x: number) => padX + ((x - xMin) / (xMax - xMin)) * plotW;
    const toCanvasY = (y: number) => padY + ((yMax - y) / (yMax - yMin)) * plotH;

    // Hairline grid - very faint
    ctx.strokeStyle = "rgba(60, 60, 60, 0.06)";
    ctx.lineWidth = 0.5;
    for (let x = Math.ceil(xMin); x <= xMax; x++) {
      ctx.beginPath();
      ctx.moveTo(toCanvasX(x), padY);
      ctx.lineTo(toCanvasX(x), H - padY);
      ctx.stroke();
    }
    for (let y = Math.ceil(yMin); y <= yMax; y++) {
      ctx.beginPath();
      ctx.moveTo(padX, toCanvasY(y));
      ctx.lineTo(W - padX, toCanvasY(y));
      ctx.stroke();
    }

    // Axes - hairline, slightly darker
    ctx.strokeStyle = "rgba(60, 60, 60, 0.25)";
    ctx.lineWidth = 0.75;
    if (yMin <= 0 && yMax >= 0) {
      ctx.beginPath();
      ctx.moveTo(padX, toCanvasY(0));
      ctx.lineTo(W - padX, toCanvasY(0));
      ctx.stroke();
    }
    if (xMin <= 0 && xMax >= 0) {
      ctx.beginPath();
      ctx.moveTo(toCanvasX(0), padY);
      ctx.lineTo(toCanvasX(0), H - padY);
      ctx.stroke();
    }

    // Axis tick labels - very small, faded
    ctx.fillStyle = "rgba(60, 60, 60, 0.35)";
    ctx.font = "9px 'JetBrains Mono', monospace";
    ctx.textAlign = "center";
    for (let x = Math.ceil(xMin); x <= xMax; x++) {
      if (x === 0) continue;
      ctx.fillText(String(x), toCanvasX(x), H - padY + 12);
    }
    ctx.textAlign = "right";
    for (let y = Math.ceil(yMin); y <= yMax; y++) {
      if (y === 0) continue;
      ctx.fillText(String(y), padX - 4, toCanvasY(y) + 3);
    }

    // Plot function - refined stroke
    ctx.beginPath();
    ctx.strokeStyle = "rgba(60, 60, 60, 0.6)";
    ctx.lineWidth = 1.25;
    ctx.lineJoin = "round";

    const steps = plotW * 1.5;
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

    // Equation label - bottom left, quiet
    if (label) {
      ctx.fillStyle = "rgba(60, 60, 60, 0.4)";
      ctx.font = "10px 'JetBrains Mono', monospace";
      ctx.textAlign = "left";
      ctx.fillText(label, padX, H - padY - 4);
    }
  }, [fn, params, xRange, yRange, label, height]);

  useEffect(() => {
    draw();
  }, [draw]);

  useEffect(() => {
    const observer = new ResizeObserver(() => draw());
    if (canvasRef.current) observer.observe(canvasRef.current);
    return () => observer.disconnect();
  }, [draw]);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: "100%", height, display: "block" }}
    />
  );
}