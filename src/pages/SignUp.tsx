import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, User, Eye, EyeOff, BookOpen } from "lucide-react";

interface SignUpPageProps {
  supabase?: {
    auth: {
      signUp: (options: { email: string; password: string }) => Promise<{
        data: { user: unknown };
        error: { message: string } | null;
      }>;
    };
  };
}

export default function SignUpPage({ supabase }: SignUpPageProps) {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    setLoading(true);

    try {
      if (supabase) {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) {
          setError(error.message);
        } else {
          setSuccess(true);
        }
      } else {
        setSuccess(true);
      }
    } catch {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6" style={{ background: "var(--bg-primary)" }}>
        <div className="w-full max-w-md text-center">
          <div className="card p-8">
            <div 
              className="w-14 h-14 mx-auto mb-4 rounded-full flex items-center justify-center"
              style={{ background: "var(--success-subtle)" }}
            >
              <svg className="w-7 h-7" fill="none" stroke="var(--success)" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-xl font-bold mb-2" style={{ color: "var(--text-primary)", fontFamily: "var(--font-heading)" }}>
              Account Created!
            </h2>
            <p className="mb-6" style={{ color: "var(--text-secondary)" }}>
              Check your email to verify your account, then sign in to start learning.
            </p>
            <Link
              to="/signin"
              className="btn-primary inline-block px-6 py-2.5"
              style={{ 
                background: "var(--accent-primary)",
                color: "white",
                borderRadius: "var(--radius-md)"
              }}
            >
              Go to Sign In
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6" style={{ background: "var(--bg-primary)" }}>
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div 
            className="w-14 h-14 mx-auto rounded-xl flex items-center justify-center mb-4"
            style={{ background: "var(--accent-primary)" }}
          >
            <BookOpen size={24} style={{ color: "white" }} />
          </div>
          <h1 className="text-2xl font-bold mb-1" style={{ fontFamily: "var(--font-heading)", color: "var(--text-primary)" }}>
            MLearn
          </h1>
          <p style={{ color: "var(--text-secondary)" }}>Create your account</p>
        </div>

        {/* Form Card */}
        <div className="card p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div 
                className="p-3 rounded text-sm"
                style={{ 
                  background: "var(--error-subtle)", 
                  color: "var(--error)"
                }}
              >
                {error}
              </div>
            )}

            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2" style={{ color: "var(--text-primary)" }}>
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2" size={16} style={{ color: "var(--text-tertiary)" }} />
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="input-field w-full pl-9"
                  placeholder="John Doe"
                  style={{ 
                    background: "var(--bg-tertiary)",
                    border: "1px solid var(--border)",
                    color: "var(--text-primary)"
                  }}
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2" style={{ color: "var(--text-primary)" }}>
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2" size={16} style={{ color: "var(--text-tertiary)" }} />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field w-full pl-9"
                  placeholder="you@example.com"
                  style={{ 
                    background: "var(--bg-tertiary)",
                    border: "1px solid var(--border)",
                    color: "var(--text-primary)"
                  }}
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2" style={{ color: "var(--text-primary)" }}>
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2" size={16} style={{ color: "var(--text-tertiary)" }} />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field w-full pl-9 pr-9"
                  placeholder="Min 8 characters"
                  style={{ 
                    background: "var(--bg-tertiary)",
                    border: "1px solid var(--border)",
                    color: "var(--text-primary)"
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                  style={{ color: "var(--text-tertiary)" }}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2" style={{ color: "var(--text-primary)" }}>
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2" size={16} style={{ color: "var(--text-tertiary)" }} />
                <input
                  id="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="input-field w-full pl-9"
                  placeholder="Confirm your password"
                  style={{ 
                    background: "var(--bg-tertiary)",
                    border: "1px solid var(--border)",
                    color: "var(--text-primary)"
                  }}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-2.5"
              style={{ 
                background: "var(--accent-primary)",
                color: "white",
                borderRadius: "var(--radius-md)"
              }}
            >
              {loading ? "Creating account..." : "Create Account"}
            </button>
          </form>

          <div className="mt-4 pt-4 text-center text-sm border-t" style={{ borderColor: "var(--border)", color: "var(--text-secondary)" }}>
            Already have an account?{" "}
            <Link to="/signin" style={{ color: "var(--accent-primary)", fontWeight: 500 }}>
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
