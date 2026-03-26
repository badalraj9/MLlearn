import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Sun, Moon, BookOpen, FlipHorizontal, FlipVertical, 
  User, LogOut, Trash2, Settings as SettingsIcon
} from "lucide-react";
import { useUIStore, useLearningStore } from "@/store";

interface SettingsPageProps {
  supabase?: {
    auth: {
      signOut: () => Promise<{ error: { message: string } | null }>;
    };
  };
}

export default function SettingsPage({ supabase }: SettingsPageProps) {
  const navigate = useNavigate();
  const { darkMode, toggleDarkMode, bindingPosition, setBindingPosition, pageFlipMode, setPageFlipMode } = useUIStore();
  const { coins } = useLearningStore();
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const handleSignOut = async () => {
    if (supabase) {
      await supabase.auth.signOut();
    }
    navigate("/");
  };

  const handleResetProgress = () => {
    localStorage.removeItem("mlearn-progress");
    localStorage.removeItem("mlearn-learning");
    window.location.reload();
  };

  const handleClearAllData = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div className="page-content stagger-in">
      {/* Page Header */}
      <div className="page-header">
        <div className="page-header-icon">
          <SettingsIcon size={16} />
        </div>
        <div>
          <h1 className="page-header-title">Settings</h1>
          <p className="page-header-sub">Customize your learning experience.</p>
        </div>
      </div>

      {/* Table of Contents */}
      <div className="toc-block">
        <div className="toc-title">On This Page</div>
        <div className="toc-list">
          <span>Appearance</span>
          <span>Reading Preferences</span>
          <span>Account</span>
          <span>Data Management</span>
        </div>
      </div>

      <div className="section-divider" aria-hidden="true" />

      {/* Appearance Section */}
      <section className="section-block">
        <div className="section-title">Appearance</div>
        <div className="card">
          <div className="flex items-center justify-between py-3">
            <div>
              <p className="font-medium" style={{ color: "var(--text-primary)" }}>Dark Mode</p>
              <p className="text-sm" style={{ color: "var(--text-tertiary)" }}>Switch between light and dark theme</p>
            </div>
            <button
              onClick={toggleDarkMode}
              className="w-12 h-7 rounded-full flex items-center px-1 transition-colors"
              style={{ 
                background: darkMode ? "var(--accent-primary)" : "var(--bg-tertiary)",
              }}
            >
              <div 
                className="w-5 h-5 rounded-full shadow-sm transition-transform"
                style={{ 
                  background: "white",
                  transform: darkMode ? "translateX(20px)" : "translateX(0)"
                }}
              >
                {darkMode ? <Moon size={12} className="m-auto mt-1 text-gray-600" /> : <Sun size={12} className="m-auto mt-1 text-gray-600" />}
              </div>
            </button>
          </div>
        </div>
      </section>

      <div className="section-divider" aria-hidden="true" />

      {/* Reading Preferences Section */}
      <section className="section-block">
        <div className="section-title">Reading Preferences</div>
        <div className="card">
          <div className="flex items-center justify-between py-3 border-b" style={{ borderColor: "var(--border)" }}>
            <div>
              <p className="font-medium" style={{ color: "var(--text-primary)" }}>Binding Position</p>
              <p className="text-sm" style={{ color: "var(--text-tertiary)" }}>Where the page binding appears</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setBindingPosition("top")}
                className="px-3 py-1.5 rounded text-sm transition-colors"
                style={{ 
                  background: bindingPosition === "top" ? "var(--accent-primary)" : "var(--bg-tertiary)",
                  color: bindingPosition === "top" ? "white" : "var(--text-primary)"
                }}
              >
                <FlipVertical size={14} className="inline mr-1" />
                Top
              </button>
              <button
                onClick={() => setBindingPosition("side")}
                className="px-3 py-1.5 rounded text-sm transition-colors"
                style={{ 
                  background: bindingPosition === "side" ? "var(--accent-primary)" : "var(--bg-tertiary)",
                  color: bindingPosition === "side" ? "white" : "var(--text-primary)"
                }}
              >
                <FlipHorizontal size={14} className="inline mr-1" />
                Side
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between py-3">
            <div>
              <p className="font-medium" style={{ color: "var(--text-primary)" }}>Page Flip Mode</p>
              <p className="text-sm" style={{ color: "var(--text-tertiary)" }}>Animation direction when turning pages</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setPageFlipMode("top")}
                className="px-3 py-1.5 rounded text-sm transition-colors"
                style={{ 
                  background: pageFlipMode === "top" ? "var(--accent-primary)" : "var(--bg-tertiary)",
                  color: pageFlipMode === "top" ? "white" : "var(--text-primary)"
                }}
              >
                <FlipVertical size={14} className="inline mr-1" />
                Top
              </button>
              <button
                onClick={() => setPageFlipMode("side")}
                className="px-3 py-1.5 rounded text-sm transition-colors"
                style={{ 
                  background: pageFlipMode === "side" ? "var(--accent-primary)" : "var(--bg-tertiary)",
                  color: pageFlipMode === "side" ? "white" : "var(--text-primary)"
                }}
              >
                <FlipHorizontal size={14} className="inline mr-1" />
                Side
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider" aria-hidden="true" />

      {/* Account Section */}
      <section className="section-block">
        <div className="section-title">Account</div>
        <div className="card">
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center gap-3">
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ background: "var(--accent-primary)", color: "white" }}
              >
                <User size={18} />
              </div>
              <div>
                <p className="font-medium" style={{ color: "var(--text-primary)" }}>Signed in as</p>
                <p className="text-sm" style={{ color: "var(--text-tertiary)" }}>user@example.com</p>
              </div>
            </div>
            <button
              onClick={handleSignOut}
              className="btn-secondary text-sm"
            >
              <LogOut size={14} className="inline mr-1" />
              Sign Out
            </button>
          </div>
        </div>
      </section>

      <div className="section-divider" aria-hidden="true" />

      {/* Data Section */}
      <section className="section-block">
        <div className="section-title">Data Management</div>
        <div className="card">
          <div className="flex items-center justify-between py-3 border-b" style={{ borderColor: "var(--border)" }}>
            <div>
              <p className="font-medium" style={{ color: "var(--text-primary)" }}>Reset Progress</p>
              <p className="text-sm" style={{ color: "var(--text-tertiary)" }}>Clear learning progress but keep account</p>
            </div>
            <button
              onClick={() => setShowResetConfirm(true)}
              className="px-3 py-1.5 rounded text-sm"
              style={{ 
                background: "var(--warning-subtle)",
                color: "var(--warning)"
              }}
            >
              Reset
            </button>
          </div>

          <div className="flex items-center justify-between py-3">
            <div>
              <p className="font-medium" style={{ color: "var(--text-primary)" }}>Clear All Data</p>
              <p className="text-sm" style={{ color: "var(--text-tertiary)" }}>Remove all local data and sign out</p>
            </div>
            <button
              onClick={() => setShowClearConfirm(true)}
              className="px-3 py-1.5 rounded text-sm"
              style={{ 
                background: "var(--error-subtle)",
                color: "var(--error)"
              }}
            >
              <Trash2 size={14} className="inline mr-1" />
              Clear
            </button>
          </div>
        </div>
      </section>

      {/* Reset Confirmation Modal */}
      {showResetConfirm && (
        <div className="fixed inset-0 flex items-center justify-center z-50" style={{ background: "rgba(0,0,0,0.5)" }}>
          <div className="p-6 rounded-lg max-w-sm mx-4" style={{ background: "var(--bg-secondary)" }}>
            <h3 className="text-lg font-bold mb-2" style={{ color: "var(--text-primary)" }}>Reset Progress?</h3>
            <p className="mb-4 text-sm" style={{ color: "var(--text-secondary)" }}>
              This will clear all your learning progress, bookmarks, and coins. This cannot be undone.
            </p>
            <div className="flex gap-2 justify-end">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="px-3 py-1.5 rounded text-sm"
                style={{ background: "var(--bg-tertiary)", color: "var(--text-primary)" }}
              >
                Cancel
              </button>
              <button
                onClick={handleResetProgress}
                className="px-3 py-1.5 rounded text-sm"
                style={{ background: "var(--warning)", color: "white" }}
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Clear All Confirmation Modal */}
      {showClearConfirm && (
        <div className="fixed inset-0 flex items-center justify-center z-50" style={{ background: "rgba(0,0,0,0.5)" }}>
          <div className="p-6 rounded-lg max-w-sm mx-4" style={{ background: "var(--bg-secondary)" }}>
            <h3 className="text-lg font-bold mb-2" style={{ color: "var(--text-primary)" }}>Clear All Data?</h3>
            <p className="mb-4 text-sm" style={{ color: "var(--text-secondary)" }}>
              This will remove all your data including progress, settings, and sign you out. This cannot be undone.
            </p>
            <div className="flex gap-2 justify-end">
              <button
                onClick={() => setShowClearConfirm(false)}
                className="px-3 py-1.5 rounded text-sm"
                style={{ background: "var(--bg-tertiary)", color: "var(--text-primary)" }}
              >
                Cancel
              </button>
              <button
                onClick={handleClearAllData}
                className="px-3 py-1.5 rounded text-sm"
                style={{ background: "var(--error)", color: "white" }}
              >
                Clear All
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
