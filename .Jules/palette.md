## 2025-02-18 - [Interaction] Interactive Expanders

**Learning:** When using `button` to toggle content, it's critical to provide semantic connection via `aria-expanded` and `aria-controls`. This is often missed in custom accordion/toggle implementations.
**Action:** Always pair state toggle buttons with `aria-expanded` and `aria-controls` pointing to the content ID. Add `animate-fade-in` for smoother transition.
