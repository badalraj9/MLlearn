import { Link } from "react-router-dom";
import { 
  User, Mail, Calendar, Award, BookOpen, 
  Bookmark, Flame, TrendingUp, Play, Coins
} from "lucide-react";
import { useLearningStore, useProgressStore } from "@/store";

export default function ProfilePage() {
  const { coins, getCompletionStats, completedChapterTiers } = useLearningStore();
  const { progress } = useProgressStore();
  const stats = getCompletionStats();

  const visitedCount = Object.values(progress.concepts).filter(
    (c) => c.lastVisited
  ).length;

  const bookmarks = progress.bookmarks || [];

  const recentCompleted = Object.entries(completedChapterTiers)
    .flatMap(([chapterId, tiers]) => 
      tiers.map((tier) => ({ chapterId, tier }))
    )
    .slice(-5);

  const progressPercent = stats.totalTiers > 0 
    ? Math.round((stats.completedTiers / stats.totalTiers) * 100) 
    : 0;

  return (
    <div className="page-content stagger-in">
      {/* Page Header */}
      <div className="page-header">
        <div className="page-header-icon">
          <User size={16} />
        </div>
        <div>
          <h1 className="page-header-title">Your Profile</h1>
          <p className="page-header-sub">Track your learning journey.</p>
        </div>
      </div>

      {/* Table of Contents */}
      <div className="toc-block">
        <div className="toc-title">On This Page</div>
        <div className="toc-list">
          <span>Overview</span>
          <span>Progress</span>
          <span>Recent Activity</span>
          <span>Bookmarks</span>
        </div>
      </div>

      <div className="section-divider" aria-hidden="true" />

      {/* User Info */}
      <section className="section-block">
        <div className="card">
          <div className="flex items-center gap-4">
            <div 
              className="w-14 h-14 rounded-full flex items-center justify-center"
              style={{ 
                background: "var(--accent-primary)",
                color: "white"
              }}
            >
              <User size={24} />
            </div>
            <div>
              <h2 className="text-lg font-semibold" style={{ color: "var(--text-primary)" }}>
                Learner
              </h2>
              <div className="flex items-center gap-2 mt-1" style={{ color: "var(--text-tertiary)" }}>
                <Mail size={14} />
                <span className="text-sm">user@example.com</span>
              </div>
              <div className="flex items-center gap-2 mt-1" style={{ color: "var(--text-tertiary)" }}>
                <Calendar size={14} />
                <span className="text-sm">Member since {new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider" aria-hidden="true" />

      {/* Stats Grid */}
      <section className="section-block">
        <div className="section-title">Overview</div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="card p-4 text-center">
            <Coins className="mx-auto mb-2" size={20} style={{ color: "var(--accent-primary)" }} />
            <p className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>
              {coins.toLocaleString()}
            </p>
            <p className="text-xs" style={{ color: "var(--text-tertiary)" }}>Coins</p>
          </div>
          
          <div className="card p-4 text-center">
            <BookOpen className="mx-auto mb-2" size={20} style={{ color: "var(--success)" }} />
            <p className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>
              {stats.completedChapters}
            </p>
            <p className="text-xs" style={{ color: "var(--text-tertiary)" }}>Chapters</p>
          </div>
          
          <div className="card p-4 text-center">
            <TrendingUp className="mx-auto mb-2" size={20} style={{ color: "var(--stage-core-ml)" }} />
            <p className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>
              {visitedCount}
            </p>
            <p className="text-xs" style={{ color: "var(--text-tertiary)" }}>Topics</p>
          </div>
          
          <div className="card p-4 text-center">
            <Flame className="mx-auto mb-2" size={20} style={{ color: "var(--warning)" }} />
            <p className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>
              0
            </p>
            <p className="text-xs" style={{ color: "var(--text-tertiary)" }}>Day Streak</p>
          </div>
        </div>
      </section>

      <div className="section-divider" aria-hidden="true" />

      {/* Progress Section */}
      <section className="section-block">
        <div className="section-title">Progress</div>
        <div className="card">
          <div className="mb-4">
            <div className="flex justify-between mb-2">
              <span style={{ color: "var(--text-secondary)" }}>
                {stats.completedTiers} of {stats.totalTiers} tiers completed
              </span>
              <span className="font-semibold" style={{ color: "var(--accent-primary)" }}>
                {progressPercent}%
              </span>
            </div>
            <div 
              className="h-2 rounded-full overflow-hidden"
              style={{ background: "var(--bg-tertiary)" }}
            >
              <div 
                className="h-full rounded-full transition-all"
                style={{ 
                  width: `${progressPercent}%`,
                  background: "var(--accent-primary)"
                }}
              />
            </div>
          </div>

          {/* Stage Breakdown */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 pt-3 border-t" style={{ borderColor: "var(--border)" }}>
            <div className="text-center p-2 rounded" style={{ background: "var(--stage-foundations-bg)" }}>
              <p className="text-xs font-medium" style={{ color: "var(--stage-foundations)" }}>Foundations</p>
              <p className="text-sm font-bold" style={{ color: "var(--text-primary)" }}>0/3</p>
            </div>
            <div className="text-center p-2 rounded" style={{ background: "var(--stage-core-ml-bg)" }}>
              <p className="text-xs font-medium" style={{ color: "var(--stage-core-ml)" }}>Core ML</p>
              <p className="text-sm font-bold" style={{ color: "var(--text-primary)" }}>0/3</p>
            </div>
            <div className="text-center p-2 rounded" style={{ background: "var(--stage-deep-learning-bg)" }}>
              <p className="text-xs font-medium" style={{ color: "var(--stage-deep-learning)" }}>Deep Learning</p>
              <p className="text-sm font-bold" style={{ color: "var(--text-primary)" }}>0/3</p>
            </div>
            <div className="text-center p-2 rounded" style={{ background: "var(--stage-research-bg)" }}>
              <p className="text-xs font-medium" style={{ color: "var(--stage-research)" }}>Research</p>
              <p className="text-sm font-bold" style={{ color: "var(--text-primary)" }}>0/3</p>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider" aria-hidden="true" />

      {/* Two Column Layout */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* Recent Activity */}
        <section className="section-block">
          <div className="section-title">Recent Activity</div>
          {recentCompleted.length > 0 ? (
            <div className="card">
              <ul className="divide-y" style={{ borderColor: "var(--border)" }}>
                {recentCompleted.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3 py-2">
                    <Award size={14} style={{ color: "var(--success)" }} />
                    <span className="text-sm" style={{ color: "var(--text-primary)" }}>
                      Completed Tier {item.tier}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="card">
              <p className="text-sm" style={{ color: "var(--text-tertiary)" }}>
                No completed chapters yet. Start learning to see your progress here.
              </p>
            </div>
          )}
        </section>

        {/* Bookmarks */}
        <section className="section-block">
          <div className="section-title">Bookmarks</div>
          {bookmarks.length > 0 ? (
            <div className="card">
              <ul className="divide-y" style={{ borderColor: "var(--border)" }}>
                {bookmarks.slice(0, 5).map((bookmark, idx) => (
                  <li key={idx} className="flex items-center gap-3 py-2">
                    <Bookmark size={14} style={{ color: "var(--accent-primary)" }} />
                    <span className="text-sm" style={{ color: "var(--text-primary)" }}>
                      {bookmark}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="card">
              <p className="text-sm" style={{ color: "var(--text-tertiary)" }}>
                No bookmarks yet. Save topics to access them quickly later.
              </p>
            </div>
          )}
        </section>
      </div>

      <div className="section-divider" aria-hidden="true" />

      {/* Spaced Repetition Section */}
      <section className="section-block">
        <div className="section-title">Spaced Repetition</div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="card p-4">
            <p className="text-xs mb-1" style={{ color: "var(--text-tertiary)" }}>In Review Queue</p>
            <p className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>
              {Object.keys(useLearningStore.getState().reviewRecords).length}
            </p>
          </div>
          <div className="card p-4">
            <p className="text-xs mb-1" style={{ color: "var(--text-tertiary)" }}>Top Streaks</p>
            {Object.values(useLearningStore.getState().reviewRecords)
              .sort((a, b) => b.streak - a.streak)
              .slice(0, 1)
              .map((r) => (
                <p key={r.chapterId} className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>
                  {r.streak}
                </p>
              ))}
          </div>
          <div className="card p-4">
            <p className="text-xs mb-1" style={{ color: "var(--text-tertiary)" }}>Next Review</p>
            {(() => {
              const next = Object.values(useLearningStore.getState().reviewRecords)
                .sort((a, b) => new Date(a.nextReview).getTime() - new Date(b.nextReview).getTime())[0];
              return next ? (
                <p className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
                  {new Date(next.nextReview).toLocaleDateString()}
                </p>
              ) : (
                <p className="text-sm" style={{ color: "var(--text-tertiary)" }}>None scheduled</p>
              );
            })()}
          </div>
        </div>
      </section>

      <div className="section-divider" aria-hidden="true" />

      {/* Quick Actions */}
      <section className="section-block text-center">
        <div className="flex gap-3 justify-center">
          <Link to="/modules" className="btn-primary">
            <Play size={16} className="inline mr-1" />
            Continue Learning
          </Link>
          <Link to="/graph" className="btn-secondary">
            <TrendingUp size={16} className="inline mr-1" />
            View Progress
          </Link>
        </div>
      </section>
    </div>
  );
}
