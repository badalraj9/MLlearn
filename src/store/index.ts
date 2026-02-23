import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ReadingMode, UserProgress } from "@/types";

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

interface LearningState {
  coins: number;
  currentRank:
    | "explorer"
    | "apprentice"
    | "practitioner"
    | "specialist"
    | "strategist"
    | "expert"
    | "visionary"
    | "luminary";
  unlockedChapters: string[];
  unlockedTopics: string[];
  completedTopics: string[];
  topicScores: Record<string, number>;
  earnCoins: (score: number) => void;
  unlockChapter: (
    chapterId: string,
    cost: number,
    firstTopicId?: string,
  ) => boolean;
  unlockTopic: (topicId: string, cost: number) => boolean;
  completeTopic: (
    topicId: string,
    nextTopicId?: string,
    score?: number,
  ) => void;
  isTopicUnlocked: (topicId: string) => boolean;
  isChapterUnlocked: (chapterId: string) => boolean;
  isTopicCompleted: (topicId: string) => boolean;
}

const initialUnlockedTopics = [
  "vector-basics",
  "bias",
  "linear-regression",
  "paper-anatomy",
];
const initialUnlockedChapters = [
  "vectors",
  "bias-variance",
  "regression",
  "reading",
];

export const useLearningStore = create<LearningState>()(
  persist(
    (set, get) => ({
      coins: 3,
      currentRank: "explorer",
      unlockedChapters: initialUnlockedChapters,
      unlockedTopics: initialUnlockedTopics,
      completedTopics: [],
      topicScores: {},
      earnCoins: (score) =>
        set((state) => {
          const base = score >= 60 ? 2 : 0;
          const bonus = score >= 90 ? 1 : 0;
          return { coins: state.coins + base + bonus };
        }),
      unlockChapter: (chapterId, cost, firstTopicId) => {
        const state = get();
        if (state.unlockedChapters.includes(chapterId)) return true;
        if (state.coins < cost) return false;
        set((prev) => ({
          coins: prev.coins - cost,
          unlockedChapters: [...prev.unlockedChapters, chapterId],
          unlockedTopics: firstTopicId
            ? Array.from(new Set([...prev.unlockedTopics, firstTopicId]))
            : prev.unlockedTopics,
        }));
        return true;
      },
      unlockTopic: (topicId, cost) => {
        const state = get();
        if (state.unlockedTopics.includes(topicId)) return true;
        if (state.coins < cost) return false;
        set((prev) => ({
          coins: prev.coins - cost,
          unlockedTopics: [...prev.unlockedTopics, topicId],
        }));
        return true;
      },
      completeTopic: (topicId, nextTopicId, score) => {
        set((state) => ({
          completedTopics: Array.from(
            new Set([...state.completedTopics, topicId]),
          ),
          unlockedTopics: nextTopicId
            ? Array.from(new Set([...state.unlockedTopics, nextTopicId]))
            : state.unlockedTopics,
          topicScores: score
            ? { ...state.topicScores, [topicId]: score }
            : state.topicScores,
        }));
        if (typeof score === "number") {
          get().earnCoins(score);
        }
      },
      isTopicUnlocked: (topicId) => get().unlockedTopics.includes(topicId),
      isChapterUnlocked: (chapterId) =>
        get().unlockedChapters.includes(chapterId),
      isTopicCompleted: (topicId) => get().completedTopics.includes(topicId),
    }),
    {
      name: "mlearn-learning",
    },
  ),
);
