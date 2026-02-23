import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ReadingMode, UserProgress } from "@/types";

// --- UI Store ---

interface UIState {
  sidebarCollapsed: boolean;
  darkMode: boolean;
  activeReadingMode: ReadingMode;
  toggleSidebar: () => void;
  toggleDarkMode: () => void;
  setReadingMode: (mode: ReadingMode) => void;
}

export const useUIStore = create<UIState>((set) => ({
  sidebarCollapsed: false,
  darkMode: false,
  activeReadingMode: "overview",
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
