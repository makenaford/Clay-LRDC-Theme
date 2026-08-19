# Architecture

## The chain

```
Clay Sass source
  └─ compiled with atlas-custom-properties/variables imported FIRST
       └─ CSS where every value is var(--name, fallback)      ~2,450 properties
            └─ token files declare which of those we expose   ~200 tokens
                 └─ token store writes them to :root
                      └─ Clay repaints
```

No step in that chain regenerates CSS or re-renders a component. A token edit is one
`style.setProperty` call, and the browser handles the rest on the next paint.

## Why the import order in `src/styles/clay.scss` is load-bearing

Clay declares its Sass variables with `!default` — "assign only if not already assigned". So the
first file to define `$btn-primary-bg` wins.

```scss
@import 'functions/global-functions';
@import 'atlas-custom-properties/variables';   // sets $btn-primary-bg: var(--btn-primary-background-color, …)
@import 'atlas/variables';                     // its !default assignments now no-op
@import 'variables';
@import 'mixins';
@import 'components';                          // compiled against the var()-wrapped values
```

Swap lines 2 and 3 and the build silently reverts to hardcoded values. Everything still compiles;
the tokens just stop working. If token edits ever appear to do nothing, check this first.

## Previewing a state without a pointer

You cannot force `:hover` from script, and re-declaring Clay's rules behind an `.is-hover` class
would mean maintaining a copy of Clay — the exact duplication the token layer removes.

Instead the state matrix uses the token metadata. Every state token carries `variant`, `prop` and
`state`:

```ts
{cssVar: '--btn-primary-hover-background-color', variant: 'primary', prop: 'background-color', state: 'hover'}
```

Its resting sibling is the token with the same `variant` + `prop` and `state: 'default'` —
`--btn-primary-background-color`. `stateOverlay()` builds a map from resting property → hover value
and applies it inline to a wrapper:

```jsx
<div style={{'--btn-primary-background-color': '#0053f0'}}>
	<ClayButton displayType="primary">Book a Demo</ClayButton>
</div>
```

The button now paints its hover colours while resting, using Clay's untouched stylesheet. Because
both the preview and the real hover read the same token, they cannot disagree.

The same metadata tells the matrix which cells to leave blank: no tokens tagged
`state: 'hover'` means the component has no hover state, and the column renders `—` instead of
repeating the default.

## Layering

Three stylesheets load in `src/main.tsx`, in this order:

1. **`clay.scss`** — Clay. Never edited.
2. **`patterns.css`** — the liferay.com sections. Reads `--lw-*` only, and never styles a Clay
   component. Two exceptions are marked in the file: the hero and case-study ghost buttons re-point
   Clay's outline tokens *scoped to that section*, because the outline variant's own colours are
   unreadable on a dark background.
3. **`workbench.css`** — the tool's own chrome. Deliberately uses hardcoded greys, not tokens: if the
   editing panel consumed the tokens being edited, setting `--body-color` to white would make it
   unreadable with no way back.

## State ownership

`TokenStoreProvider` holds one flat `{'--var': value}` map for every token in the registry.

- **Defaults** come from the token files.
- **Edits** are the diff against those defaults — this is what exports and what persists to
  `localStorage`.
- Stored values are **merged** over defaults on load, so a theme saved before a token existed does
  not leave the new token undefined.
- `resetSet` and `resetAll` also call `removeProperty`, so a reset value falls back to Clay's own
  default rather than lingering as an inline override that happens to match.

## Registry

`src/tokens/registry.ts` is the single index. The sidebar, editor, matrix and export all read from
it, so adding a component means touching one file beyond the component's own folder.
