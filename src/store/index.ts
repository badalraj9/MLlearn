import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  ChapterTier,
  ReadingMode,
  UserProgress,
  ReviewRecord,
} from "@/types";
import { modules } from "@/content/modules";

// --- UI Store ---

interface UIState {
  sidebarCollapsed: boolean;
  darkMode: boolean;
  activeReadingMode: ReadingMode;
  bindingPosition: "top" | "side";
  pageFlipMode: "top" | "side";
  toggleSidebar: () => void;
  toggleDarkMode: () => void;
  setReadingMode: (mode: ReadingMode) => void;
  setBindingPosition: (position: "top" | "side") => void;
  setPageFlipMode: (mode: "top" | "side") => void;
}

export const useUIStore = create<UIState>((set) => ({
  sidebarCollapsed: false,
  darkMode: false,
  activeReadingMode: "overview",
  bindingPosition: "top",
  pageFlipMode: "top",
  toggleSidebar: () =>
    set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
  toggleDarkMode: () =>
    set((state) => {
      const newDarkMode = !state.darkMode;
      if (newDarkMode) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      return { darkMode: newDarkMode };
    }),
  setReadingMode: (mode) => set({ activeReadingMode: mode }),
  setBindingPosition: (position) => set({ bindingPosition: position }),
  setPageFlipMode: (mode) => set({ pageFlipMode: mode }),
}));

// --- Progress Store (localStorage-backed, Supabase-ready) ---

interface ProgressState {
  progress: UserProgress;
  markConceptVisited: (conceptId: string) => void;
  markConceptCompleted: (conceptId: string) => void;
  toggleBookmark: (conceptId: string) => void;
  isBookmarked: (conceptId: string) => boolean;
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      progress: {
        concepts: {},
        bookmarks: [],
      },
      markConceptVisited: (conceptId) =>
        set((state) => ({
          progress: {
            ...state.progress,
            concepts: {
              ...state.progress.concepts,
              [conceptId]: {
                ...state.progress.concepts[conceptId],
                conceptId,
                completed:
                  state.progress.concepts[conceptId]?.completed ?? false,
                lastVisited: new Date().toISOString(),
                problemsAttempted:
                  state.progress.concepts[conceptId]?.problemsAttempted ?? 0,
                problemsSolved:
                  state.progress.concepts[conceptId]?.problemsSolved ?? 0,
              },
            },
          },
        })),
      markConceptCompleted: (conceptId) =>
        set((state) => ({
          progress: {
            ...state.progress,
            concepts: {
              ...state.progress.concepts,
              [conceptId]: {
                ...state.progress.concepts[conceptId],
                conceptId,
                completed: true,
                lastVisited: new Date().toISOString(),
                problemsAttempted:
                  state.progress.concepts[conceptId]?.problemsAttempted ?? 0,
                problemsSolved:
                  state.progress.concepts[conceptId]?.problemsSolved ?? 0,
              },
            },
          },
        })),
      toggleBookmark: (conceptId) =>
        set((state) => {
          const bookmarks = state.progress.bookmarks.includes(conceptId)
            ? state.progress.bookmarks.filter((id) => id !== conceptId)
            : [...state.progress.bookmarks, conceptId];
          return { progress: { ...state.progress, bookmarks } };
        }),
      isBookmarked: (conceptId) => get().progress.bookmarks.includes(conceptId),
    }),
    {
      name: "mlearn-progress",
    },
  ),
);

// --- Learning Economy Store ---

type ChapterTierMap = Record<string, ChapterTier[]>;

// Spaced repetition intervals (days)
const SR_INTERVALS = [1, 3, 7, 14, 30, 60];

function computeNextReview(streak: number): string {
  const days = SR_INTERVALS[Math.min(streak, SR_INTERVALS.length - 1)];
  const next = new Date();
  next.setDate(next.getDate() + days);
  return next.toISOString();
}

interface LearningState {
  coins: number;
  unlockedChapterTiers: ChapterTierMap;
  completedChapterTiers: ChapterTierMap;
  reviewRecords: Record<string, ReviewRecord>;

  earnCoins: (amount: number) => void;
  unlockChapterTier: (
    chapterId: string,
    tier: ChapterTier,
    cost: number,
  ) => boolean;
  completeChapterTier: (chapterId: string, tier: ChapterTier) => void;
  isChapterTierUnlocked: (chapterId: string, tier: ChapterTier) => boolean;
  isChapterTierCompleted: (chapterId: string, tier: ChapterTier) => boolean;

  // Review tracking
  markReviewed: (chapterId: string, correct: boolean) => void;
  getChaptersDueForReview: () => ReviewRecord[];

  // Stats
  getCompletionStats: () => {
    totalChapters: number;
    completedChapters: number;
    totalTiers: number;
    completedTiers: number;
  };
}

export const useLearningStore = create<LearningState>()(
  persist(
    (set, get) => ({
      coins: 50000,
      unlockedChapterTiers: {},
      completedChapterTiers: {},
      reviewRecords: {},

      earnCoins: (amount) => set((state) => ({ coins: state.coins + amount })),

      unlockChapterTier: (chapterId, tier, cost) => {
        const state = get();
        const currentTiers = state.unlockedChapterTiers[chapterId] || [];

        if (tier === 1) {
          if (!currentTiers.includes(1)) {
            set((prev) => ({
              unlockedChapterTiers: {
                ...prev.unlockedChapterTiers,
                [chapterId]: [
                  ...(prev.unlockedChapterTiers[chapterId] || []),
                  1,
                ],
              },
            }));
          }
          return true;
        }

        if (currentTiers.includes(tier)) return true;
        if (state.coins < cost) return false;

        const completedTiers = state.completedChapterTiers[chapterId] || [];
        const prevTier = (tier - 1) as ChapterTier;
        if (!completedTiers.includes(prevTier)) return false;

        set((prev) => ({
          coins: prev.coins - cost,
          unlockedChapterTiers: {
            ...prev.unlockedChapterTiers,
            [chapterId]: [
              ...(prev.unlockedChapterTiers[chapterId] || []),
              tier,
            ],
          },
        }));
        return true;
      },

      completeChapterTier: (chapterId, tier) => {
        set((state) => {
          const currentCompleted = state.completedChapterTiers[chapterId] || [];
          if (currentCompleted.includes(tier)) return state;

          const reward = tier === 1 ? 10 : tier === 2 ? 25 : 50;

          const reviewRecords = { ...state.reviewRecords };
          if (!reviewRecords[chapterId]) {
            reviewRecords[chapterId] = {
              chapterId,
              lastReviewed: new Date().toISOString(),
              nextReview: computeNextReview(0),
              streak: 0,
            };
          }

          return {
            coins: state.coins + reward,
            completedChapterTiers: {
              ...state.completedChapterTiers,
              [chapterId]: [...currentCompleted, tier],
            },
            reviewRecords,
          };
        });
      },

      isChapterTierUnlocked: (chapterId, tier) => {
        const tiers = get().unlockedChapterTiers[chapterId] || [];
        if (tier === 1) return true;
        return tiers.includes(tier);
      },

      isChapterTierCompleted: (chapterId, tier) => {
        const tiers = get().completedChapterTiers[chapterId] || [];
        return tiers.includes(tier);
      },

      markReviewed: (chapterId, correct) => {
        set((state) => {
          const record = state.reviewRecords[chapterId];
          if (!record) return state;

          const newStreak = correct ? record.streak + 1 : 0;
          return {
            reviewRecords: {
              ...state.reviewRecords,
              [chapterId]: {
                ...record,
                lastReviewed: new Date().toISOString(),
                nextReview: computeNextReview(newStreak),
                streak: newStreak,
              },
            },
            coins: state.coins + (correct ? 5 : 0),
          };
        });
      },

      getChaptersDueForReview: () => {
        const now = new Date().toISOString();
        return Object.values(get().reviewRecords).filter(
          (r) => r.nextReview <= now,
        );
      },

      getCompletionStats: () => {
        const state = get();
        let totalChapters = 0;
        let completedChapters = 0;
        let totalTiers = 0;
        let completedTiers = 0;

        for (const mod of modules) {
          for (const topic of mod.topics) {
            for (const chapter of topic.chapters) {
              totalChapters++;
              totalTiers += 3;
              const completed = state.completedChapterTiers[chapter.id] || [];
              completedTiers += completed.length;
              if (completed.length === 3) completedChapters++;
            }
          }
        }

        return { totalChapters, completedChapters, totalTiers, completedTiers };
      },
    }),
    {
      name: "mlearn-learning",
    },
  ),
);
