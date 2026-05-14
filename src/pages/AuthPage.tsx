import { useState, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";

type AuthMode = "signin" | "signup";

interface AuthPageProps {
  supabase?: {
    auth: {
      signInWithPassword: (credentials: { email: string; password: string }) => Promise<{
        data: { user: unknown };
        error: { message: string } | null;
      }>;
      signUp: (options: { email: string; password: string }) => Promise<{
        data: { user: unknown };
        error: { message: string } | null;
      }>;
    };
  };
}

export default function AuthPage({ supabase }: AuthPageProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const initialMode: AuthMode = location.pathname === "/signup" ? "signup" : "signin";

  const [mode, setMode] = useState<AuthMode>(initialMode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const switchMode = useCallback(
    (m: AuthMode) => {
      setMode(m);
      setError("");
      navigate(m === "signup" ? "/signup" : "/signin", { replace: true });
    },
    [navigate]
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    if (mode === "signup") {
      if (password !== confirmPassword) {
        setError("Passwords do not match");
        return;
      }
      if (password.length < 8) {
        setError("Password must be at least 8 characters");
        return;
      }
    }

    setLoading(true);

    try {
      if (supabase) {
        const action =
          mode === "signin"
            ? supabase.auth.signInWithPassword({ email, password })
            : supabase.auth.signUp({ email, password });
        const { error: authError } = await action;
        if (authError) {
          setError(authError.message);
        } else if (mode === "signup") {
          setSuccess(true);
        } else {
          navigate("/");
        }
      } else {
        if (mode === "signup") {
          setSuccess(true);
        } else {
          navigate("/");
        }
      }
    } catch {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ position: "relative", zIndex: 1, padding: "0 12%" }}>
        <div style={{ textAlign: "center", maxWidth: "380px" }}>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.15em", color: "var(--text-tertiary)", textTransform: "uppercase", marginBottom: "1.5rem" }}>
            Registration Complete
          </p>
          <p style={{ fontFamily: "var(--font-heading)", fontSize: "1.8rem", color: "var(--text-primary)", marginBottom: "1rem", lineHeight: 1.3 }}>
            Account created
          </p>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", color: "var(--text-secondary)", marginBottom: "2.5rem", lineHeight: 1.7 }}>
            Check your email to verify your account, then sign in to begin.
          </p>
          <button
            onClick={() => switchMode("signin")}
            style={{
              background: "none",
              border: "none",
              borderBottom: "1px solid var(--text-primary)",
              padding: "0 0 2px",
              fontFamily: "var(--font-body)",
              fontSize: "0.85rem",
              color: "var(--text-primary)",
              cursor: "pointer",
            }}
          >
            Sign in →
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen"
      style={{
        position: "relative",
        zIndex: 1,
        display: "flex",
        alignItems: "stretch",
      }}
    >
      {/* Vertical archive label — far left edge */}
      <div
        style={{
          position: "fixed",
          left: "24px",
          top: "50%",
          transform: "translateY(-50%) rotate(-90deg)",
          transformOrigin: "center center",
          fontFamily: "var(--font-mono)",
          fontSize: "0.55rem",
          letterSpacing: "0.35em",
          color: "var(--text-tertiary)",
          textTransform: "uppercase",
          whiteSpace: "nowrap",
          opacity: 0.5,
          userSelect: "none",
          pointerEvents: "none",
        }}
      >
        A R C H I V E &nbsp; A C C E S S
      </div>

      {/* Giant watermark equation — left side atmosphere */}
      <div
        style={{
          position: "fixed",
          left: "8%",
          top: "12%",
          fontFamily: "var(--font-heading)",
          fontSize: "clamp(4rem, 10vw, 8rem)",
          color: "var(--text-primary)",
          opacity: 0.035,
          lineHeight: 1,
          letterSpacing: "-0.04em",
          pointerEvents: "none",
          userSelect: "none",
          zIndex: 0,
        }}
        aria-hidden="true"
      >
        argmin ℒ(θ)
      </div>

      {/* Fainter secondary equation */}
      <div
        style={{
          position: "fixed",
          left: "12%",
          bottom: "15%",
          fontFamily: "var(--font-heading)",
          fontSize: "clamp(2.5rem, 6vw, 5rem)",
          color: "var(--text-primary)",
          opacity: 0.025,
          lineHeight: 1,
          fontStyle: "italic",
          pointerEvents: "none",
          userSelect: "none",
          zIndex: 0,
        }}
        aria-hidden="true"
      >
        ∇ℒ(θ) = 0
      </div>

      {/* ─── LEFT — Publication Cover ─── */}
      <div
        style={{
          flex: "0 0 63%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "2rem 6% 2rem 10%",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div style={{ maxWidth: "520px" }}>
          {/* Volume label */}
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.55rem",
              letterSpacing: "0.25em",
              color: "var(--text-tertiary)",
              marginBottom: "2.5rem",
              textTransform: "uppercase",
            }}
          >
            MLearn · Vol. I
          </p>

          {/* Monumental heading */}
          <h1
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(2.8rem, 5.5vw, 4.8rem)",
              fontWeight: 350,
              lineHeight: 0.98,
              letterSpacing: "-0.025em",
              color: "var(--text-primary)",
              marginBottom: "2.5rem",
            }}
          >
            Machine<br />
            Learning<br />
            Mathematics
          </h1>

          {/* Thin divider */}
          <div
            style={{
              height: "1px",
              width: "80px",
              background: "var(--border)",
              marginBottom: "2rem",
            }}
          />

          {/* Description */}
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.92rem",
              lineHeight: 1.9,
              color: "var(--text-secondary)",
              marginBottom: "2.5rem",
            }}
          >
            An environment for understanding the mathematical foundations that
            underpin modern machine learning — through rigorous proofs, geometric
            intuition, and research paper deconstruction.
          </p>

          {/* Manuscript colophon */}
          <div
            style={{
              display: "flex",
              gap: "2rem",
              alignItems: "center",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.6rem",
                color: "var(--text-tertiary)",
                letterSpacing: "0.08em",
              }}
            >
              ISBN 978-0-ML-2024
            </span>
            <span
              style={{
                width: "1px",
                height: "10px",
                background: "var(--border)",
                display: "block",
              }}
            />
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.6rem",
                color: "var(--text-tertiary)",
                letterSpacing: "0.08em",
              }}
            >
              6 Modules · 68 Topics
            </span>
          </div>
        </div>
      </div>

      {/* Bridge equation — sits across the composition boundary */}
      <div
        style={{
          position: "fixed",
          left: "58%",
          top: "38%",
          fontFamily: "var(--font-heading)",
          fontSize: "clamp(1.2rem, 2vw, 1.8rem)",
          color: "var(--text-primary)",
          opacity: 0.03,
          fontStyle: "italic",
          pointerEvents: "none",
          userSelect: "none",
          zIndex: 0,
          transform: "translateX(-50%)",
        }}
        aria-hidden="true"
      >
        ∂ℒ/∂θ = 0
      </div>

      {/* ─── RIGHT — Manuscript Access Portal ─── */}
      <div
        style={{
          flex: "0 0 37%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "2rem 6% 2rem 5%",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Partial vertical trace — not a full barrier */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: "18%",
            height: "55%",
            width: "1px",
            background: "var(--border)",
            opacity: 0.25,
          }}
          aria-hidden="true"
        />

        <div style={{ maxWidth: "380px", position: "relative", zIndex: 1 }}>
          {/* Section header */}
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.6rem",
              letterSpacing: "0.25em",
              color: "var(--text-tertiary)",
              marginBottom: "2.5rem",
              textTransform: "uppercase",
            }}
          >
            § Authentication
          </p>

          {/* Accession number — marginal annotation */}
          <p
            style={{
              position: "absolute",
              right: 0,
              top: "2px",
              fontFamily: "var(--font-mono)",
              fontSize: "0.5rem",
              letterSpacing: "0.12em",
              color: "var(--text-tertiary)",
              opacity: 0.35,
            }}
            aria-hidden="true"
          >
            MS-004
          </p>

          {/* Tabs — quiet, no sharp underline */}
          <div
            style={{
              display: "flex",
              gap: "1.5rem",
              marginBottom: "2.5rem",
            }}
          >
            <button
              onClick={() => switchMode("signin")}
              style={{
                background: "none",
                border: "none",
                padding: 0,
                cursor: "pointer",
                fontFamily: "var(--font-heading)",
                fontSize: "1.05rem",
                fontWeight: 400,
                color: mode === "signin" ? "var(--text-primary)" : "var(--text-tertiary)",
                letterSpacing: "0.01em",
                position: "relative",
                transition: "color 300ms ease",
              }}
            >
              Sign in
              {mode === "signin" && (
                <span
                  style={{
                    position: "absolute",
                    bottom: "-4px",
                    left: "10%",
                    right: "10%",
                    height: "0.5px",
                    background: "var(--text-secondary)",
                    opacity: 0.4,
                  }}
                />
              )}
            </button>
            <button
              onClick={() => switchMode("signup")}
              style={{
                background: "none",
                border: "none",
                padding: 0,
                cursor: "pointer",
                fontFamily: "var(--font-heading)",
                fontSize: "1.05rem",
                fontWeight: 400,
                color: mode === "signup" ? "var(--text-primary)" : "var(--text-tertiary)",
                letterSpacing: "0.01em",
                position: "relative",
                transition: "color 300ms ease",
              }}
            >
              Register
              {mode === "signup" && (
                <span
                  style={{
                    position: "absolute",
                    bottom: "-4px",
                    left: "10%",
                    right: "10%",
                    height: "0.5px",
                    background: "var(--text-secondary)",
                    opacity: 0.4,
                  }}
                />
              )}
            </button>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            {error && (
              <p
                style={{
                  fontSize: "0.8rem",
                  color: "#a03030",
                  fontFamily: "var(--font-mono)",
                  margin: "0 0 1.25rem",
                }}
              >
                {error}
              </p>
            )}

            {/* Email / Identity */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem", marginBottom: "1.5rem" }}>
              <label
                htmlFor="auth-email"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.65rem",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "var(--text-tertiary)",
                }}
              >
                Identity / Email
              </label>
              <input
                id="auth-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder=""
                style={{
                  width: "100%",
                  background: "none",
                  border: "none",
                  borderBottom: "0.5px solid var(--border)",
                  padding: "8px 0",
                  fontFamily: "var(--font-body)",
                  fontSize: "0.95rem",
                  color: "var(--text-primary)",
                  outline: "none",
                  transition: "border-color 300ms ease",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "var(--text-secondary)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "var(--border)";
                }}
              />
            </div>

            {/* Faint mathematical annotation — breaks the rhythm */}
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.55rem",
                color: "var(--text-tertiary)",
                letterSpacing: "0.08em",
                margin: "-0.5rem 0 1.25rem",
                opacity: 0.4,
              }}
              aria-hidden="true"
            >
              · verified by institutional credentials
            </p>

            {/* Archive Key */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem", marginBottom: mode === "signup" ? "1.5rem" : "2rem" }}>
              <label
                htmlFor="auth-password"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.65rem",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "var(--text-tertiary)",
                }}
              >
                Archive Key
              </label>
              <input
                id="auth-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder=""
                style={{
                  width: "100%",
                  background: "none",
                  border: "none",
                  borderBottom: "0.5px solid var(--border)",
                  padding: "8px 0",
                  fontFamily: "var(--font-body)",
                  fontSize: "0.95rem",
                  color: "var(--text-primary)",
                  outline: "none",
                  transition: "border-color 300ms ease",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "var(--text-secondary)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "var(--border)";
                }}
              />
            </div>

            {mode === "signup" && (
              <>
                {/* Key Confirmation */}
                <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem", marginBottom: "1.5rem" }}>
                  <label
                    htmlFor="auth-confirm"
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.65rem",
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      color: "var(--text-tertiary)",
                    }}
                  >
                    Key Confirmation
                  </label>
                  <input
                    id="auth-confirm"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder=""
                    style={{
                      width: "100%",
                      background: "none",
                      border: "none",
                      borderBottom: "0.5px solid var(--border)",
                      padding: "8px 0",
                      fontFamily: "var(--font-body)",
                      fontSize: "0.95rem",
                      color: "var(--text-primary)",
                      outline: "none",
                      transition: "border-color 300ms ease",
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "var(--text-secondary)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "var(--border)";
                    }}
                  />
                </div>

                {/* Registry hint */}
                <p
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.55rem",
                    color: "var(--text-tertiary)",
                    letterSpacing: "0.08em",
                    margin: "-0.5rem 0 1.5rem",
                    opacity: 0.4,
                  }}
                  aria-hidden="true"
                >
                  · minimum 8 characters
                </p>
              </>
            )}

            <div>
              <button
                type="submit"
                disabled={loading}
                style={{
                  background: "none",
                  border: "none",
                  borderBottom: "0.5px solid var(--text-primary)",
                  padding: "0 0 2px",
                  fontFamily: "var(--font-body)",
                  fontSize: "0.9rem",
                  color: "var(--text-primary)",
                  cursor: loading ? "default" : "pointer",
                  opacity: loading ? 0.3 : 0.75,
                  transition: "opacity 300ms ease",
                }}
                onMouseEnter={(e) => {
                  if (!loading) (e.target as HTMLElement).style.opacity = "1";
                }}
                onMouseLeave={(e) => {
                  if (!loading) (e.target as HTMLElement).style.opacity = "0.75";
                }}
              >
                {loading ? "..." : mode === "signin" ? "Access Archive →" : "Register →"}
              </button>
            </div>
          </form>

          {/* Quiet footer */}
          <div
            style={{
              marginTop: "2.5rem",
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              opacity: 0.25,
            }}
          >
            <div style={{ height: "0.5px", flex: 1, background: "var(--border)" }} />
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.5rem",
                letterSpacing: "0.15em",
                color: "var(--text-tertiary)",
                whiteSpace: "nowrap",
              }}
            >
              MS ARCHIVE · AUTH
            </span>
            <div style={{ height: "0.5px", flex: 1, background: "var(--border)" }} />
          </div>
        </div>

        {/* Faint right-side equation residue */}
        <div
          style={{
            position: "absolute",
            right: "4%",
            bottom: "8%",
            fontFamily: "var(--font-heading)",
            fontSize: "clamp(2rem, 4vw, 3rem)",
            color: "var(--text-primary)",
            opacity: 0.018,
            fontStyle: "italic",
            pointerEvents: "none",
            userSelect: "none",
            zIndex: 0,
          }}
          aria-hidden="true"
        >
          ∑ p(x)log p(x)
        </div>
      </div>
    </div>
  );
}