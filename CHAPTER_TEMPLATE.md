# MLearn Chapter Content Template

Use this template to populate any chapter file in `src/content/modules/{moduleId}/chapters/{chapterId}.ts`.

---

## File Structure

Every chapter file exports a `Chapter` object with exactly **3 tiers** (Foundation, Applied, Advanced).
Each tier can optionally include: `ahaInsights`, `equationSteps`, `quiz`, `codeContent`, and a `playground` widget.

```typescript
import type { Chapter } from "@/types";

const chapter: Chapter = {
  id: "chapter-id-here",
  title: "Chapter Title",
  description: "One-line description.",
  prerequisites: ["other-chapter-id"], // optional: chapter IDs that should be done first
  levels: [
    {
      tier: 1,
      title: "Foundation",
      cost: 0,
      content: {
        intro: [
          "Paragraph 1: What is this concept and WHY does it matter?",
          "Paragraph 2: The core idea explained with an analogy.",
          "Paragraph 3: A simple worked example.",
        ],
        keyIdeas: ["Key idea 1", "Key idea 2", "Key idea 3"],
        equations: ["\\[ y = mx + b \\]"],
        references: ["3Blue1Brown - Topic Name", "StatQuest - Topic Name"],
        ahaInsights: [
          "The real insight is that gradient descent is just walking downhill!",
        ],
        equationSteps: [
          { latex: "f(x) = x^2", explanation: "Start with a simple function" },
          { latex: "f'(x) = 2x", explanation: "Apply the power rule" },
          { latex: "f'(3) = 6", explanation: "Evaluate at x=3" },
        ],
        quiz: [
          {
            id: "q1",
            question: "What does the gradient point toward?",
            options: [
              "Steepest ascent",
              "Steepest descent",
              "Random direction",
              "Origin",
            ],
            correctIndex: 0,
            explanation:
              "The gradient always points in the direction of steepest increase.",
          },
        ],
      },
      // 🌱 Foundation gets SLIDER playgrounds
      playground: {
        type: "slider",
        graphFn: "a * x^2 + b",
        sliders: [
          {
            id: "a",
            label: "Coefficient a",
            min: -3,
            max: 3,
            step: 0.1,
            default: 1,
          },
          {
            id: "b",
            label: "Offset b",
            min: -5,
            max: 5,
            step: 0.5,
            default: 0,
          },
        ],
        xRange: [-5, 5],
        yRange: [-5, 10],
      },
      // 💻 Optional code implementation
      codeContent: {
        language: "python",
        code: "import numpy as np\n\ndef gradient(f, x, h=1e-7):\n    return (f(x + h) - f(x - h)) / (2 * h)",
        description: "Numerical gradient computation using central differences",
      },
    },
    {
      tier: 2,
      title: "Applied",
      cost: 50,
      content: {
        intro: ["..."],
        keyIdeas: ["..."],
        equations: ["..."],
        references: ["..."],
        quiz: [
          {
            id: "q1",
            question: "Applied-level question here",
            options: ["A", "B", "C", "D"],
            correctIndex: 1,
            explanation: "Explanation of the correct answer.",
          },
        ],
      },
      codeContent: {
        language: "python",
        code: "# Full implementation here",
        description: "Complete implementation with optimization",
      },
    },
    {
      tier: 3,
      title: "Advanced",
      cost: 100,
      content: {
        intro: ["..."],
        keyIdeas: ["..."],
        equations: ["..."],
        references: ["..."],
      },
      // 🔬 Advanced gets EQUATION playground
      playground: {
        type: "equation",
        equation: "sin(x) * exp(-x^2 / 10)",
        xRange: [-5, 5],
        yRange: [-2, 2],
      },
    },
  ],
};

export default chapter;
```

---

## Content Guidelines

| Tier          | Audience      | Tone                    | Math            | Intro | KeyIdeas  | Goal                        |
| ------------- | ------------- | ----------------------- | --------------- | ----- | --------- | --------------------------- |
| 🌱 Foundation | Beginners     | Friendly, analogy-heavy | 1-2 equations   | 2-3 ¶ | 3-5 items | "I understand WHAT and WHY" |
| ⚙️ Applied    | Practitioners | Technical, step-by-step | Full derivation | 2-4 ¶ | 4-6 items | "I can IMPLEMENT this"      |
| 🔬 Advanced   | Researchers   | Research-grade, precise | Advanced proofs | 3-5 ¶ | 4-6 items | "I understand the FRONTIER" |

---

## Playground Guidelines (Per Module)

| Module            | Foundation Playground                 | Advanced Playground                         |
| ----------------- | ------------------------------------- | ------------------------------------------- |
| **math**          | Slider: drag coefficients, see curves | Equation editor: type equations, see graphs |
| **ml-theory**     | Slider: bias-variance tradeoff        | Equation: loss surfaces, boundaries         |
| **deep-learning** | Slider: learning rate, batch size     | Equation: activations, loss curves          |
| **generative**    | Slider: latent dims, noise            | Equation: distribution transforms           |
| **applied-ml**    | Slider: hyperparameters               | Code snippets (future)                      |

---

## Quiz Guidelines

- **Foundation**: 2-3 conceptual questions (test intuition)
- **Applied**: 3-4 implementation questions (test understanding of math + code)
- **Advanced**: 2-3 research-grade questions (test deep comprehension)
- Each question needs 4 options, 1 correct, plus an explanation
- Use unique IDs like `"q1"`, `"q2"`, etc. within each tier

---

## Code Content Guidelines

- **Foundation**: Simple, clean example (10-15 lines, NumPy only)
- **Applied**: Full implementation with comments (20-40 lines)
- **Advanced**: Optimized/production code or framework usage (PyTorch/JAX)
- Always include a `description` explaining what the code does

---

## Optional Fields Summary

| Field           | Where        | When to use                           |
| --------------- | ------------ | ------------------------------------- |
| `prerequisites` | Chapter      | When chapter requires prior knowledge |
| `ahaInsights`   | content      | 1-2 "lightbulb moment" insights       |
| `equationSteps` | content      | Step-by-step derivation viewer        |
| `quiz`          | content      | Tier-specific assessment questions    |
| `playground`    | ChapterLevel | Interactive visualization widget      |
| `codeContent`   | ChapterLevel | Code implementation of the concept    |

---

## How to Use

1. Open any chapter file in `src/content/modules/{moduleId}/chapters/`
2. The file already has the correct `id`, `title`, and `description`
3. Fill in `content` fields for all 3 tiers following the guidelines
4. Add playgrounds where appropriate (Foundation → slider, Advanced → equation)
5. Add quiz questions for knowledge checks
6. Add codeContent for implementation examples
7. Keep `cost` as 0/50/100 unless specified otherwise
8. Save — the app hot-reloads with new content
