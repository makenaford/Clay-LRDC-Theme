# Liferay Clay Workbench

A component and pattern library built on [Clay](https://clayui.com) — Liferay's design system — and
laid out to mirror the section structure of [liferay.com](https://www.liferay.com). Every colour,
every interaction state and every pattern is editable from one file per component, with a live
workbench to see the change in isolation and in context at the same time.

```bash
pnpm install && pnpm dev
```

Then open <http://localhost:5180>.

---

## The idea

Clay's stylesheet is already fully tokenised — it just does not ship that way.

`@clayui/css` publishes three prebuilt stylesheets, and all of them have their values hardcoded.
But Clay's **Sass source** includes an `atlas-custom-properties` build in which every declaration is
rewritten as a CSS custom property:

```css
.btn-primary:hover {
	background-color: var(--btn-primary-hover-background-color, #0053f0);
}
```

This repo compiles that build (see [`src/styles/clay.scss`](src/styles/clay.scss)), which yields
**~2,450 live CSS custom properties**. Restyling a component is then a matter of setting a variable —
no overriding selectors, no `!important`, no forked CSS.

This is not a workaround. It is the same build liferay.com serves at
`/o/classic-theme/css/clay.css`, which is why the tokens you edit here transfer to a real Liferay
theme unchanged.

## Editing things

**Colours and interaction states** live in `<Component>.tokens.ts` next to each component:

```
src/components/Button/
├── Button.tokens.ts   ← every colour + state, one entry each
└── Button.tsx         ← the Clay component + its variants
```

Each token names the real Clay property it drives, so the file doubles as documentation:

```ts
color('--btn-primary-hover-background-color', 'Primary · background', palette.blue600, {
    prop: 'background-color',
    state: 'hover',
    variant: 'primary',
}),
```

Edit the value and it is the shipped default. Edit it *in the workbench* and it applies live, with a
diff you can export as CSS or JSON.

**Patterns** — the liferay.com page sections — live in `src/patterns/` with the same token file
convention. They are composed from the components, so restyling Button restyles every CTA on the
page too.

**Global tokens** (`src/tokens/global.tokens.ts`) feed everything. Change `--primary` and the whole
system moves. Reach for a component token only when one component should diverge.

### The state matrix

Each component page renders every variant against every state it defines:

| | default | hover | active | disabled |
|---|---|---|---|---|
| Primary | ● | ● | ● | ● |
| Outline | ● | ● | ● | ● |

The cells are not screenshots or simulations. A hover cell paints itself by applying that state's
token values onto the resting properties, so it is driven by the same tokens a real pointer hover
uses and cannot drift from them.

States a component genuinely does not have are left blank rather than filled in. Clay defines no
hover state for text inputs and no active state for links, so those cells show `—`.

## Layout

```
src/
├── tokens/         palette (real liferay.com hexes) · global tokens · registry
├── theme/          token store, live DOM application, state overlay, export
├── components/     8 Clay components, each with its own token file
├── patterns/       8 liferay.com sections, each with its own token file
├── pages/          the sections composed into the homepage
├── workbench/      the editing tool (sidebar, token editor, state matrix, export)
└── styles/         Clay custom-properties build · pattern CSS · workbench chrome
```

Components sourced from Figma record their origin node and their Figma variable names in the token
descriptions, so a value can always be traced back to the design — see
[`Label.tokens.ts`](src/components/Label/Label.tokens.ts), built from
"Solutions Library- 2026" node `15121:237267`.

The palette in [`src/tokens/palette.ts`](src/tokens/palette.ts) was read off liferay.com's own
stylesheets rather than eyeballed — `#0b5fff` primary, `#0053f0` hover, `#00318f` active, and the
Lexicon neutral ramp.

## Icons

1,553 icons live in `src/icons/library/`, forked from the Figma export. You do not reference them
directly — `src/icons/icons.manifest.json` lists what ships, and `pnpm icons` builds a sprite plus a
union type from it.

```tsx
import {Icon} from '../icons/Icon';

<Icon name="lrdc-search" />
```

Three things that pipeline buys you:

- **Only what you use is shipped.** 25 symbols, 11 KB. Clay's full spritemap alone is 110 KB gzipped.
- **Icons follow your tokens.** The export hardcodes `stroke="#10161F"` on every icon; the build
  rewrites it to `currentColor`, so an icon inherits whatever colour its context sets.
- **Typos are compile errors.** `ClayIcon` types `symbol` as `string`, so a misspelling silently
  renders nothing. The generated union catches it.

Clay's 15 internal symbols (`caret-bottom`, `times`, `check`, …) are merged in automatically — Clay's
own components hardcode those names, and without them dropdown carets and modal close buttons
render as nothing.

See [src/icons/README.md](src/icons/README.md).

## Two kinds of token

| | Example | Where it works |
|---|---|---|
| **Component** | `--btn-primary-hover-background-color` | Clay's own property. Works in any Liferay theme. |
| **Pattern** | `--lw-hero-bg` | Defined by this repo. Works here only. |

The `--lw-` prefix marks the second kind. Exported CSS contains both, clearly separable — see
[`src/patterns/tokens-note.md`](src/patterns/tokens-note.md).

## Exporting

The Export view emits only the tokens you changed:

```css
:root {
	--btn-primary-background-color: #7414ff;
}
```

Drop the component-token half into a Liferay theme's `_custom.scss` or a Style Book's CSS field and
it applies to a real site. Only a diff is emitted — dumping all defaults would freeze every value
against future Clay updates.

## Dependency policy

`pnpm-workspace.yaml` carries the supply-chain settings: a one-week minimum release age, blocked
exotic sub-dependencies, strict engine checks, and `trustPolicy: no-downgrade`.

One deliberate exemption is recorded there. **Clay 3.164.0 and later were published without the
trusted-publisher attestation earlier Clay releases carried**, which pnpm reads as a possible
package takeover. The exemption is pinned to the exact reviewed versions
(`@clayui/css@3.166.0`, …) rather than a blanket `@clayui/*` glob, so a future untrusted Clay
release is still rejected until someone looks at it. Release age is untouched and still enforced.

## Scripts

| | |
|---|---|
| `pnpm dev` | build icons, then the workbench on :5180 |
| `pnpm build` | build icons, typecheck, production build |
| `pnpm icons` | regenerate the sprite + registry only |
| `pnpm typecheck` | types only |

## Further reading

- [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) — how the token layer works end to end
- [docs/ADDING-A-COMPONENT.md](docs/ADDING-A-COMPONENT.md) — the checklist
