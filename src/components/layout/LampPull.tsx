import { useState } from "react";
import { useUIStore } from "@/store";

export default function LampPull() {
  const toggleDarkMode = useUIStore((state) => state.toggleDarkMode);
  const [isPulling, setIsPulling] = useState(false);

  const handlePull = () => {
    if (isPulling) return;
    setIsPulling(true);
    toggleDarkMode();
    window.setTimeout(() => {
      setIsPulling(false);
    }, 700);
  };

  return (
    <button
      type="button"
      className={`lamp-pull ${isPulling ? "lamp-pull--active" : ""}`}
      onClick={handlePull}
      aria-label="Toggle lamp theme"
    >
      <span className="lamp-pull__cap" aria-hidden="true" />
      <span className="lamp-pull__cord" aria-hidden="true" />
      <span className="lamp-pull__knob" aria-hidden="true" />
      <span className="lamp-pull__label">Lamp</span>
    </button>
  );
}
