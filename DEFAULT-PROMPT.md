I want you to thoroughly reorganize the project's source code and establish a clean, consistent, and scalable folder structure. Focus on maintainability, separation of concerns, strict typing, and consistent naming conventions.

### 1. Component organization

Everything inside `src/` should be properly organized.

- All React components must live inside `src/components/`.
- Create a `src/components/ui/` directory for generic, reusable UI components such as buttons, inputs, separators, icons, and other primitive components.
- Components that have their own functionality or specific purpose should have their own dedicated folders.
- Do not nest a `components/` folder inside a component folder (e.g. `src/components/streaming-text/components/`). It creates a deep, awkward folder stack. Smaller internal components live as flat files next to the main component instead.

For example:

```text
src/
├── components/
│   ├── ui/
│   │   ├── button/
│   │   ├── input/
│   │   └── separator/
│   │
│   └── streaming-text/
│       ├── streaming-text.tsx
│       ├── block-view.tsx
│       ├── code-block.tsx
│       ├── interface.ts
│       ├── hooks/
│       ├── utils/
│       └── index.ts
│
├── constants/
│   ├── components/
│   │   ├── streaming-text.const.ts
│   │   └── button.const.ts
│   ├── palette.const.ts
│   └── interface.ts
│
├── hooks/
│   ├── use-simulated-stream.ts
│   └── interface.ts
│
└── utils/
    └── register-component.util.ts
```

Use this structure as a guideline, not a limitation. Organize each component according to its actual complexity and requirements.

### 2. Component-level structure

Each feature-specific component should have its own directory.

Keep everything related to that component inside its respective folder, including:

- `component-name.tsx` – Main component implementation.
- `sub-component.tsx` – Smaller internal components, as flat sibling files (never inside a nested `components/` folder).
- `interface.ts` – All interfaces and types specifically related to that component, including the props of its internal components and the return types of its hooks.
- `utils/` – Component-specific utility functions.
- `hooks/` – Component-specific hooks, if needed.
- `index.ts` – Public exports.

Avoid creating unnecessary files or folders. Only introduce them when they serve a clear purpose.

Keep shared utilities, hooks, interfaces, and other reusable logic in their appropriate shared directories rather than duplicating them across components. Shared directories get their own `interface.ts` for their types (e.g. `src/hooks/interface.ts`, `src/constants/interface.ts`).

### 3. Constants

All constants live in `src/constants/`, never inside component, hook, or utility files.

- Component-specific constants go in `src/constants/components/<component-name>.const.ts` (e.g. `src/constants/components/streaming-text.const.ts`). This includes every constant a component, its internal components, hooks, and utils use: config values, timings, regexes, lookup maps, palettes, animation keyframes, and demo/static content.
- App-wide constants go directly in `src/constants/<name>.const.ts` (e.g. `src/constants/palette.const.ts`).
- Name constants in `SCREAMING_SNAKE_CASE`, prefixed with the domain they belong to, so related constants group together and read clearly without comments (e.g. `REVEAL_MAX_LAG_MS`, `REVEAL_SLACK`, `HIGHLIGHT_LANGUAGES`, `MARKDOWN_FENCE`, `THINKING_DOT_DELAY_MS`).
- Give every constant an explicit type annotation (`const REVEAL_SLACK: number = 1.25;`, `const PLAYBACK_SPEEDS: readonly number[] = [...]`, `const THEME_PALETTES: Record<TScheme, TPalette> = {...}`).
- Keep each file flat: declare the constants grouped by prefix, then export them all in one alphabetized `export { ... }` at the bottom.
- Exceptions: `StyleSheet.create` styles stay in the file that uses them, and mutable module state (caches, listeners, singletons) stays in the utility that owns it.

### 4. Naming conventions

Follow these naming conventions consistently throughout the entire project.

**Interfaces and types:**

- Every interface must start with the `I` prefix.
- Every type must start with the `T` prefix.
- Do not include the word `Props` in interface or type names.

Examples:

```ts
interface IData {
  value: string;
}

type TData = {
  value: string;
};

interface IStreamingText {
  content: string;
}

type TStreamingText = {
  content: string;
};
```

Never do:

```ts
interface IDataProps {}
type TDataProps = {};
```

Instead, use:

```ts
interface IData {}
type TData = {};
```

Keep names short, descriptive, and consistent.

**File naming:**

- All files should use `kebab-case`.
- React component files should use `.tsx`.
- TypeScript utility and interface files should use `.ts`.
- Utility files use the `.util.ts` suffix; constant files use the `.const.ts` suffix.

Examples:

```text
streaming-text.tsx
interface.ts
register-component.util.ts
create-compound-component.util.ts
streaming-text.const.ts
index.ts
```

### 5. Strict typing

The code must be strictly typed everywhere. Never rely on inference where an explicit type can be written, and never use `any`.

- **Variables:** annotate local variables (`const shown: number = ...`, `const lines: TWord[] = ...`, `let cancelled: boolean = false`).
- **Functions:** every function, arrow function, and callback declares its parameter types and return type, including `void` (`(item: TStreamItem): string => ...`, `(): void => setRun(...)`).
- **Hooks:** always pass the generic to React and Reanimated hooks:
  - `useState<number>(0)` and `useState<TScheduleState>(INITIAL)`
  - `useMemo<string | null>(...)` and `useSyncExternalStore<boolean>(...)`
  - `useSharedValue<number>(0)` and `useSharedValue<boolean>(false)`
  - `useAnimatedRef<FlashListRef<T>>()`
- **Shared values and refs:** annotate them too (`const offset: SharedValue<number> = ...`, `const ref: AnimatedRef<FlashListRef<T>> = ...`).
- **Collections:** type them explicitly (`new Map<string, TTheme>()`, `new Set<string>()`).
- **Custom hooks:** declare a return type in `interface.ts` (e.g. `TStreamingMarkdown`, `TRevealSchedule`, `TFollowBottom<T>`) and annotate the hook with it.
- **Render callbacks:** list render callbacks return `React.JSX.Element` (`items.map((item: TStreamItem): React.JSX.Element => ...)`).

### 6. Components

Every component is a typed `FC` arrow function whose props parameter and return type are both annotated, exactly in this form:

```tsx
import type { FC } from "react";

const CodeBlockBase: FC<ICodeBlock> = ({
  block,
  shown,
  timing,
  delay,
  theme,
  style,
}: ICodeBlock & React.ComponentProps<typeof CodeBlockBase>): React.ReactNode &
  React.JSX.Element => {
  return <View>{/* ... */}</View>;
};
```

Components without props (such as route screens) still annotate the return type:

```tsx
const Index: FC = (): React.ReactNode & React.JSX.Element => <View />;
```

- Do not declare helper functions inside a component body (no `const handleX = () => {}`, no `function renderX() {}`, no `const text = (seg) => <Text />`). Move pure helpers into the component's `utils/`, and move render helpers into their own small component file.
- Inline callbacks passed directly to JSX props or hooks are fine, as long as they are fully typed (`onPress={(): void => onSelect(id)}`, `.map((item: TItem): React.JSX.Element => ...)`, `useState<T>((): T => ...)`).
- Do not keep module-level helper functions in component files either. A component file contains only imports, the component, its `styles`, its registration, and its export.
- Memo comparators also go in `utils/` (e.g. `memo-compare.util.ts`).

### 7. No comments

Do not leave any comments in the source code: no line comments, no block comments, no JSDoc, no section dividers, and no `eslint-disable` directives.

- Code should explain itself through clear names, small functions, prefixed constants, and explicit types.
- If a lint rule would need a disable comment, restructure the code so the rule is satisfied instead.

### 8. Exports

All components, utilities, hooks, and other exported declarations should be exported at the bottom of their respective implementation files.

Do not use inline exports such as:

```ts
export const Button = () => {};
export interface IData {}
```

Instead, declare everything first and export it at the bottom:

```tsx
const ButtonBase: FC<IButton> = ({
  label,
}: IButton & React.ComponentProps<typeof ButtonBase>): React.ReactNode & React.JSX.Element => (
  <Text>{label}</Text>
);

const Button = registerComponent("Button", ButtonBase);

export { Button };
```

For types and interfaces:

```ts
interface IData {
  value: string;
}

type TData = {
  name: string;
};

export { type IData, type TData };
```

For multiple exports, keep them together:

```ts
export { Button, type IData, type TData };
```

Route files in `src/app/` are the one exception to named exports: Expo Router requires a default export, so declare the screen first and put `export default Screen;` at the bottom.

Apply this convention consistently across the project.

### 9. Component display names

Do not manually assign `displayName` to components.

Never do:

```ts
Component.displayName = "Component";
```

Instead, create a reusable, fully typed utility named `register-component.util.ts` (no `any`):

```ts
import type { ComponentType, NamedExoticComponent } from "react";

const registerComponent = <TComponent extends ComponentType<never> | NamedExoticComponent<never>>(
  name: string,
  component: TComponent,
): TComponent => {
  component.displayName = name;
  return component;
};

export { registerComponent };
```

Every component in `src/components/` is registered, and the registration sits at the bottom of the file, directly above the export:

```tsx
const styles = StyleSheet.create({
  container: { flex: 1 },
});

const Button = registerComponent("Button", ButtonBase);

export { Button };
```

For memoized components, wrap the `memo` call:

```tsx
const BlockView = registerComponent("BlockView", memo(BlockViewBase, isSameBlockView));

export { BlockView };
```

### 10. Compound components

For compound components, use a reusable `create-compound-component.util.ts` utility with the following implementation:

```ts
import type { ComponentType, NamedExoticComponent } from "react";

import { registerComponent } from "./register-component.util";

const createCompoundComponent = <
  TComponent extends ComponentType<never> | NamedExoticComponent<never>,
  TCompound extends Record<string, unknown> = Record<never, never>,
>(
  name: string,
  component: TComponent,
  compound: TCompound = {} as TCompound,
): TComponent & TCompound =>
  Object.assign<TComponent, TCompound>(registerComponent(name, component), compound);

export { createCompoundComponent };
```

Use this utility to compose compound components instead of manually assigning static properties or display names. Like `registerComponent`, call it at the bottom of the file, directly above the export.

### 11. Code quality and organization

While reorganizing the project:

- Keep every file in its appropriate directory.
- Avoid unnecessary nesting and duplicated logic.
- Separate component-specific logic from shared logic.
- Keep interfaces and types close to the components that use them.
- Move genuinely reusable utilities into shared utility directories.
- Use consistent import paths and avoid circular dependencies.
- Remove unused imports, dead code, comments, and redundant files where safe.
- Update all affected imports and exports after moving files.
- Preserve existing functionality, component APIs, animations, and styling.
- Do not introduce unnecessary abstractions or dependencies.
- Maintain strict TypeScript compatibility.

### 12. Final verification

Do not simply move files around. Inspect the entire existing source code and understand its dependencies before making changes.

After reorganizing:

1. Verify that all import paths resolve correctly.
2. Check that all public exports and entry points still work.
3. Run the TypeScript type checker.
4. Run the existing linting and formatting checks (including the React Compiler rules).
5. Confirm no comments remain anywhere in `src/`.
6. Fix any issues introduced by the reorganization.
7. Ensure no existing functionality has been broken.

**Important:** Apply these conventions consistently throughout the entire `src/` directory, not just to newly created files. The goal is to establish a clean, predictable, strictly typed, scalable codebase where every component, type, constant, utility, and hook has a clearly defined place.

Do not change the actual functionality or redesign any existing components. This task is strictly about code architecture, organization, naming conventions, typing, and maintainability.
