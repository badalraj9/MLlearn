import { useState, useEffect, useRef, useCallback, useMemo } from "react";

function lossFunction(x: number, y: number): number {
  return (1 - x) ** 2 + 10 * (y - x * x) ** 2;
}

function gradient(x: number, y: number): [number, number] {
  const dfdx = -2 * (1 - x) + 10 * 2 * (y - x * x) * (-2 * x);
  const dfdy = 10 * 2 * (y - x * x);
  return [dfdx, dfdy];
}

export default function GradientDescentViz() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [learningRate, setLearningRate] = useState(0.005);
  const [isRunning, setIsRunning] = useState(false);
  const [path, setPath] = useState<[number, number][]>([[-0.5, 2.0]]);
  const animRef = useRef<number | null>(null);
  const stepRef = useRef(0);

  const W = 480;
  const H = 360;
  const xMin = -2, xMax = 2;
  const yMin = -1, yMax = 3;

  const toCanvas = useCallback(
    (x: number, y: number): [number, number] => [
      ((x - xMin) / (xMax - xMin)) * W,
      H - ((y - yMin) / (yMax - yMin)) * H,
    ],
    [],
  );

  const contourImage = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext("2d")!;
    const imageData = ctx.createImageData(W, H);

    let maxVal = 0;
    for (let py = 0; py < H; py++) {
      for (let px = 0; px < W; px++) {
        const x = xMin + (px / W) * (xMax - xMin);
        const y = yMax - (py / H) * (yMax - yMin);
        const val = Math.log1p(lossFunction(x, y));
        if (val > maxVal) maxVal = val;
      }
    }

    for (let py = 0; py < H; py++) {
      for (let px = 0; px < W; px++) {
        const x = xMin + (px / W) * (xMax - xMin);
        const y = yMax - (py / H) * (yMax - yMin);
        const val = Math.log1p(lossFunction(x, y));
        const t = val / maxVal;

        const r = Math.floor(30 + t * 160);
        const g = Math.floor(50 + (1 - t) * 120);
        const b = Math.floor(100 - t * 80);

        const idx = (py * W + px) * 4;
        imageData.data[idx] = r;
        imageData.data[idx + 1] = g;
        imageData.data[idx + 2] = b;
        imageData.data[idx + 3] = 200;
      }
    }

    ctx.putImageData(imageData, 0, 0);
    return canvas;
  }, []);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    ctx.drawImage(contourImage, 0, 0);

    const levels = [0.5, 1, 2, 5, 10, 25, 50, 100];
    ctx.strokeStyle = "rgba(255,255,255,0.12)";
    ctx.lineWidth = 0.5;
    for (const level of levels) {
      ctx.beginPath();
      for (let px = 0; px < W; px += 2) {
        for (let py = 0; py < H; py += 2) {
          const x = xMin + (px / W) * (xMax - xMin);
          const y = yMax - (py / H) * (yMax - yMin);
          const val = lossFunction(x, y);
          if (Math.abs(val - level) < 1.5) {
            ctx.rect(px, py, 1, 1);
          }
        }
      }
      ctx.stroke();
    }

    const [mx, my] = toCanvas(1, 1);
    ctx.beginPath();
    ctx.arc(mx, my, 4, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(60,60,60,0.5)";
    ctx.fill();
    ctx.strokeStyle = "rgba(60,60,60,0.3)";
    ctx.lineWidth = 1;
    ctx.stroke();

    if (path.length > 1) {
      ctx.beginPath();
      const [sx, sy] = toCanvas(path[0][0], path[0][1]);
      ctx.moveTo(sx, sy);
      for (let i = 1; i < path.length; i++) {
        const [px, py] = toCanvas(path[i][0], path[i][1]);
        ctx.lineTo(px, py);
      }
      ctx.strokeStyle = "rgba(60,60,60,0.7)";
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    path.forEach((pt, i) => {
      const [px, py] = toCanvas(pt[0], pt[1]);
      const isLast = i === path.length - 1;
      ctx.beginPath();
      ctx.arc(px, py, isLast ? 3.5 : 1.5, 0, Math.PI * 2);
      ctx.fillStyle = isLast ? "rgba(60,60,60,0.8)" : "rgba(60,60,60,0.4)";
      ctx.fill();
    });
  }, [path, contourImage, toCanvas]);

  useEffect(() => { draw(); }, [draw]);

  const step = useCallback(() => {
    setPath((prev) => {
      const last = prev[prev.length - 1];
      const [gx, gy] = gradient(last[0], last[1]);
      const nx = last[0] - learningRate * gx;
      const ny = last[1] - learningRate * gy;
      const cx = Math.max(xMin, Math.min(xMax, nx));
      const cy = Math.max(yMin, Math.min(yMax, ny));
      if (Math.abs(nx) > 10 || Math.abs(ny) > 10) {
        setIsRunning(false);
        return prev;
      }
      return [...prev, [cx, cy]];
    });
  }, [learningRate]);

  useEffect(() => {
    if (!isRunning) {
      if (animRef.current) cancelAnimationFrame(animRef.current);
      return;
    }
    let lastTime = 0;
    const animate = (time: number) => {
      if (time - lastTime > 50) {
        step();
        stepRef.current++;
        lastTime = time;
        if (stepRef.current > 500) { setIsRunning(false); return; }
      }
      animRef.current = requestAnimationFrame(animate);
    };
    animRef.current = requestAnimationFrame(animate);
    return () => { if (animRef.current) cancelAnimationFrame(animRef.current); };
  }, [isRunning, step]);

  const reset = () => {
    setIsRunning(false);
    stepRef.current = 0;
    setPath([[-0.5, 2.0]]);
  };

  const currentPos = path[path.length - 1];
  const currentLoss = lossFunction(currentPos[0], currentPos[1]);

  return (
    <div>
      <div style={{ marginBottom: "0.75rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <label style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--text-secondary)" }}>
            {`\u03B1 = ${learningRate.toFixed(4)}`}
          </label>
          <input
            type="range"
            min={0.0001} max={0.03} step={0.0001}
            value={learningRate}
            onChange={(e) => setLearningRate(Number(e.target.value))}
            style={{ accentColor: "var(--accent-primary)", width: "140px" }}
          />
          <div style={{ display: "flex", gap: "8px" }}>
            <button
              onClick={() => setIsRunning(!isRunning)}
              style={{
                background: "none",
                border: "1px solid var(--border)",
                padding: "2px 12px",
                fontFamily: "var(--font-mono)",
                fontSize: "0.7rem",
                color: "var(--text-secondary)",
                cursor: "pointer",
              }}
            >
              {isRunning ? "pause" : "run"}
            </button>
            <button
              onClick={step}
              disabled={isRunning}
              style={{
                background: "none",
                border: "1px solid var(--border)",
                padding: "2px 10px",
                fontFamily: "var(--font-mono)",
                fontSize: "0.7rem",
                color: "var(--text-tertiary)",
                cursor: isRunning ? "default" : "pointer",
                opacity: isRunning ? 0.4 : 1,
              }}
            >
              step
            </button>
            <button
              onClick={reset}
              style={{
                background: "none",
                border: "1px solid var(--border)",
                padding: "2px 10px",
                fontFamily: "var(--font-mono)",
                fontSize: "0.7rem",
                color: "var(--text-tertiary)",
                cursor: "pointer",
              }}
            >
              reset
            </button>
          </div>
        </div>
      </div>

      <canvas
        ref={canvasRef}
        width={W}
        height={H}
        style={{ width: "100%", maxWidth: W, display: "block" }}
      />

      <div style={{
        marginTop: "0.5rem",
        display: "flex",
        gap: "24px",
        fontFamily: "var(--font-mono)",
        fontSize: "0.7rem",
        color: "var(--text-tertiary)",
      }}>
        <span>steps: {path.length - 1}</span>
        <span>J({currentPos[0].toFixed(2)}, {currentPos[1].toFixed(2)}) = {currentLoss.toFixed(4)}</span>
      </div>

      <div style={{
        marginTop: "0.75rem",
        paddingLeft: "0.75rem",
        borderLeft: "1px solid var(--border)",
        fontFamily: "var(--font-mono)",
        fontSize: "0.7rem",
        color: "var(--text-tertiary)",
        fontStyle: "italic",
      }}>
        {learningRate > 0.02
          ? "High alpha: optimizer overshooting, divergence likely."
          : learningRate < 0.001
            ? "Low alpha: slow convergence, stable descent."
            : currentLoss < 0.01
              ? "Near minimum at (1, 1)."
              : "f(x,y) = (1-x)^2 + 10(y-x^2)^2"}
      </div>
    </div>
  );
}