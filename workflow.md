# MLearn - Workflow

## Getting Started

### Prerequisites

- Node.js 18+
- npm or pnpm

### Installation

```bash
npm install
npm run dev
```

### Building

```bash
npm run build
```

---

## Development Workflow

### 1. Create a Branch

```bash
git checkout -b feature/concept-name
# or
git checkout -b fix/bug-description
```

### 2. Make Changes

- Add components in `src/components/`
- Add content in `src/content/`
- Add types in `src/types/`

### 3. Test

```bash
npm run lint
npm run typecheck
```

### 4. Commit

```bash
git add .
git commit -m "description of changes"
```

---

## Content Creation

### Adding a New Concept

1. Create JSON file in `src/content/concepts/`
2. Add concept to relevant learning path
3. Create any required interactive widgets

### Adding a Paper

1. Create JSON in `src/content/papers/`
2. Add sections with annotations
3. Define reading modes

---

## Component Standards

- Use TypeScript for all components
- Use Tailwind for styling
- Use MathJax for equations
- Test interactive elements manually

---

## File Naming

| Type | Convention |
|------|------------|
| Components | PascalCase.tsx |
| Hooks | camelCase.ts |
| Types | PascalCase.ts |
| Content | kebab-case.json |
