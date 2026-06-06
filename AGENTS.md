# port-v2

Personal portfolio site (React 19 + Vite 8 + TypeScript 6 + Tailwind 3).

## Commands

| Action | Command |
|--------|---------|
| dev | `bun run dev` |
| build | `bun run build` (runs `tsc -b` then `vite build`) |
| lint | `bun run lint` |
| format | `bun run format` |
| preview | `bun run preview` |

No test framework installed.

## Toolchain quirks

- **Package manager**: Bun. Lockfile is `bun.lock`. Use `bun add` / `bun remove`.
- **React Compiler**: Enabled via `@rolldown/plugin-babel` + `babel-plugin-react-compiler` in `vite.config.ts`. No manual `use memo()`/`use callback()` needed.
- **TypeScript strict**: `verbatimModuleSyntax: true` → always `import type` for type-only imports. `erasableSyntaxOnly: true` → no enums, no namespaces, no parameter properties.
- **Prettier**: no semis, double quotes, no trailing commas, `avoid` arrow parens. Tailwind classes auto-sorted. Imports sorted: `@core` → 3rd party → `@server` → `@ui` → relative. **These are sort groups only — there are no TS path aliases in `tsconfig.json`. Do not import from `@core/...` etc.**
- **ESLint**: flat config (`eslint.config.js`), ignores `dist/`, covers `**/*.{ts,tsx}` only.
- **Build**: `tsc -b` typechecks before `vite build`. Both must pass.
- **CSS**: Tailwind directives in `src/index.css`. Theming via CSS custom properties (`--text-h`, `--border`, `--accent`, etc.) accessed through Tailwind arbitrary values: `text-[var(--text-h)]`, `border-[var(--border)]`. Dark mode via `prefers-color-scheme`.

## Structure

```
src/
  main.tsx              — entrypoint
  App.tsx               — root component, composes sections
  components/           — section components (HeroSection, AboutSection, SkillsSection, ExperienceSection, Footer, ProjectsSection*)
  data/profile.ts       — type definitions + `data` object (all content lives here)
  assets/               — empty, place for imported images
  index.css             — Tailwind + theme variables
public/
  favicon.svg
  icons.svg             — SVG sprite: github-icon, linkedin-icon, mail-icon, download-icon
```

\* `ProjectsSection` exists but is commented out in `App.tsx` (line 15).

## Component conventions

- Plain functions with `interface Props` — no React.FC.
- No `React` import needed (JSX transform is automatic).
- Theming via CSS custom properties, never hardcoded colors.
- Section components follow the same pattern: `<section id="..." className="scroll-mt-16 border-b border-[var(--border)]...">` with an `<h2>` containing a self-linking `<a href="#...">`.

## Remote

`origin` → `hanumanman/resume.git` (GitHub). Repo name is `resume`, not `port-v2`.
