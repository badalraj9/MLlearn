import { useState, useEffect, useRef, useCallback, useMemo } from "react";

/**
 * 2D contour plot of a loss surface with animated gradient descent.
 * User can adjust learning rate and watch convergence/divergence.
 */

// Rosenbrock-like function: f(x,y) = (1-x)^2 + 10*(y-x^2)^2  (scaled down for viz)
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

  // Canvas dimensions
  const W = 500;
  const H = 400;

  // Coordinate bounds
  const xMin = -2,
    xMax = 2;
  const yMin = -1,
    yMax = 3;

  const toCanvas = useCallback(
    (x: number, y: number): [number, number] => [
      ((x - xMin) / (xMax - xMin)) * W,
      H - ((y - yMin) / (yMax - yMin)) * H,
    ],
    [],
  );

  // Precompute contour data
  const contourImage = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext("2d")!;
    const imageData = ctx.createImageData(W, H);

    // Find max for normalization
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

        // Cool blue → warm red colormap
        const r = Math.floor(30 + t * 200);
        const g = Math.floor(60 + (1 - t) * 140);
        const b = Math.floor(180 - t * 150);

        const idx = (py * W + px) * 4;
        imageData.data[idx] = r;
        imageData.data[idx + 1] = g;
        imageData.data[idx + 2] = b;
        imageData.data[idx + 3] = 255;
      }
    }

    ctx.putImageData(imageData, 0, 0);
    return canvas;
  }, []);

  // Draw
  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    // Background contour
    ctx.drawImage(contourImage, 0, 0);

    // Draw contour lines
    const levels = [0.5, 1, 2, 5, 10, 25, 50, 100];
    ctx.strokeStyle = "rgba(255,255,255,0.15)";
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

    // Minimum marker
    const [mx, my] = toCanvas(1, 1);
    ctx.beginPath();
    ctx.arc(mx, my, 6, 0, Math.PI * 2);
    ctx.fillStyle = "#16A34A";
    ctx.fill();
    ctx.strokeStyle = "white";
    ctx.lineWidth = 2;
    ctx.stroke();

    // Path
    if (path.length > 1) {
      ctx.beginPath();
      const [sx, sy] = toCanvas(path[0][0], path[0][1]);
      ctx.moveTo(sx, sy);
      for (let i = 1; i < path.length; i++) {
        const [px, py] = toCanvas(path[i][0], path[i][1]);
        ctx.lineTo(px, py);
      }
      ctx.strokeStyle = "rgba(255, 255, 255, 0.8)";
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }

    // Draw points
    path.forEach((pt, i) => {
      const [px, py] = toCanvas(pt[0], pt[1]);
      const isLast = i === path.length - 1;
      ctx.beginPath();
      ctx.arc(px, py, isLast ? 5 : 2.5, 0, Math.PI * 2);
      ctx.fillStyle = isLast ? "#FBBF24" : "rgba(255,255,255,0.5)";
      ctx.fill();
      if (isLast) {
        ctx.strokeStyle = "white";
        ctx.lineWidth = 2;
        ctx.stroke();
      }
    });
  }, [path, contourImage, toCanvas]);

  useEffect(() => {
    draw();
  }, [draw]);

  // Step
  const step = useCallback(() => {
    setPath((prev) => {
      const last = prev[prev.length - 1];
      const [gx, gy] = gradient(last[0], last[1]);
      const nx = last[0] - learningRate * gx;
      const ny = last[1] - learningRate * gy;

      // Clamp to bounds
      const cx = Math.max(xMin, Math.min(xMax, nx));
      const cy = Math.max(yMin, Math.min(yMax, ny));

      // Stop if diverging
      if (Math.abs(nx) > 10 || Math.abs(ny) > 10) {
        setIsRunning(false);
        return prev;
      }

      return [...prev, [cx, cy]];
    });
  }, [learningRate]);

  // Animation loop
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

        if (stepRef.current > 500) {
          setIsRunning(false);
          return;
        }
      }
      animRef.current = requestAnimationFrame(animate);
    };
    animRef.current = requestAnimationFrame(animate);

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
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
      {/* Controls */}
      <div className="flex items-center gap-4 mb-4 flex-wrap">
        <div className="flex items-center gap-2">
          <label
            className="text-xs font-medium"
            style={{
              color: "var(--text-primary)",
              fontFamily: "var(--font-mono)",
            }}
          >
            α = {learningRate.toFixed(4)}
          </label>
          <input
            type="range"
            min={0.0001}
            max={0.03}
            step={0.0001}
            value={learningRate}
            onChange={(e) => setLearningRate(Number(e.target.value))}
            style={{ accentColor: "var(--accent-primary)", width: "120px" }}
          />
        </div>

        <button
          onClick={() => setIsRunning(!isRunning)}
          className="px-3 py-1.5 text-xs font-medium rounded-md cursor-pointer"
          style={{
            backgroundColor: isRunning
              ? "var(--error)"
              : "var(--accent-primary)",
            color: "white",
            border: "none",
          }}
        >
          {isRunning ? "Pause" : "Run"}
        </button>

        <button
          onClick={step}
          disabled={isRunning}
          className="px-3 py-1.5 text-xs font-medium rounded-md cursor-pointer"
          style={{
            backgroundColor: "var(--bg-tertiary)",
            color: "var(--text-primary)",
            border: "none",
            opacity: isRunning ? 0.5 : 1,
          }}
        >
          Step
        </button>

        <button
          onClick={reset}
          className="px-3 py-1.5 text-xs font-medium rounded-md cursor-pointer"
          style={{
            backgroundColor: "var(--bg-tertiary)",
            color: "var(--text-primary)",
            border: "none",
          }}
        >
          Reset
        </button>
      </div>

      {/* Canvas */}
      <canvas
        ref={canvasRef}
        width={W}
        height={H}
        className="w-full rounded-md"
        style={{ maxWidth: W, imageRendering: "auto" }}
      />

      {/* Stats */}
      <div
        className="grid grid-cols-3 gap-4 mt-4 text-xs"
        style={{
          fontFamily: "var(--font-mono)",
          color: "var(--text-secondary)",
        }}
      >
        <div>
          <span style={{ color: "var(--text-tertiary)" }}>Steps:</span>{" "}
          {path.length - 1}
        </div>
        <div>
          <span style={{ color: "var(--text-tertiary)" }}>Loss:</span>{" "}
          {currentLoss.toFixed(4)}
        </div>
        <div>
          <span style={{ color: "var(--text-tertiary)" }}>Position:</span> (
          {currentPos[0].toFixed(2)}, {currentPos[1].toFixed(2)})
        </div>
      </div>

      {/* Insight */}
      <div
        className="mt-4 px-4 py-3 rounded-md text-xs"
        style={{
          backgroundColor: "var(--math-bg)",
          borderLeft: "3px solid var(--warning)",
          color: "var(--text-secondary)",
        }}
      >
        {learningRate > 0.02
          ? "⚠️ Learning rate too high — the optimizer is overshooting and may diverge!"
          : learningRate < 0.001
            ? "🐢 Very small learning rate — convergence will be slow but stable."
            : currentLoss < 0.01
              ? "✅ Converged near the minimum at (1, 1)!"
              : "🎯 Adjust the learning rate to see the tradeoff between speed and stability."}
      </div>
    </div>
  );
}
