# Leapmotor Ordering Configurator

## Stack

- Next.js 16 (static export via `output: 'export'`)
- React 19, TypeScript, Tailwind CSS 4
- Zustand for state management
- Deployed to GitHub Pages via Actions

## Project structure

- `src/app/` — Next.js app router pages and global styles
- `src/components/wizard/` — Wizard step components (StepModel, StepColor, etc.)
- `src/components/ui/` — Reusable UI primitives (Button, Card, Input)
- `src/store/useOrderStore.ts` — Zustand store with wizard state and step definitions
- `src/lib/types.ts` — TypeScript types
- `src/lib/i18n.ts` — pl/en translations (inline, no external deps)
- `src/lib/data.ts` — Car models, colors, accessories data

## Wizard flow

model → color → accessories → buyer-type → details → financing → review → payment → summary

- Steps with single-select choices (model, color, buyer-type) auto-advance after selection
- Other steps require clicking "Next" (which pulses after 3s idle)
- Review step shows order confirmation before payment
- Summary is the final success screen (hidden from step indicator)

## Commands

- `npm run dev` — Start dev server
- `npm run build` — Production build (outputs to `out/`)
- `npm run lint` — ESLint

## Conventions

- All translations go through `src/lib/i18n.ts` — both `pl` and `en` must be updated together
- New wizard steps require changes in: `types.ts` (WizardStep union), `useOrderStore.ts` (WIZARD_STEPS array), `WizardShell.tsx` (canAdvance + renderStep), `i18n.ts` (step label + step translations)
