# Icon library

1,553 icons in 24 categories, forked from `solutions-design-system/assets/icons/regular`, which is
itself a Figma export from **"Solutions Library- 2026"** (file key `KihJKyGA20stc2SSjAlxYU`).

They live here so this repo does not depend on a sibling checkout.

## The pipeline

```
icons.manifest.json          ← the only file you edit
  └─ pnpm icons
       ├─ public/icons.svg   ← generated sprite (gitignored)
       └─ registry.ts        ← generated union type (committed)
```

`pnpm dev` and `pnpm build` both run `pnpm icons` first, so the sprite cannot go stale.

To add an icon, add one line to `icons.manifest.json` and rebuild. Nothing else needs touching —
not the registry, not a component, not the sprite.

Use it through the typed wrapper, never `ClayIcon` directly:

```tsx
import {Icon} from '../../icons/Icon';

<Icon name="lrdc-search" />
```

`ClayIcon` types `symbol` as `string`, so `symbol="serach"` renders an empty `<svg>` with no error
of any kind. Going through `Icon` makes the same typo a compile error with a suggested correction.

The build fails loudly rather than shipping a broken sprite — a source path that does not exist, a
Clay symbol that is not in the installed spritemap, or one of the known-bad exports below each stop
the build with an explanation.

Only what the manifest lists is emitted. The current sprite is 25 symbols at 11 KB; Clay's full
spritemap alone is 110 KB gzipped, which is more than this app's entire JS bundle.

## These files are a mirror — do not edit them

`library/` is a faithful copy of the export. Re-syncing is a straight overwrite:

```bash
rsync -a --include='*/' --include='*.svg' --exclude='*' \
  ~/code/solutions-design-system/assets/icons/regular/ src/icons/library/
```

Every transformation belongs in the sprite build step, never in these files. Hand-edit one and the
next export from Figma silently reverts it.

## What has to be normalised at build time

**The icons are stroke-based and every one hardcodes its colour:**

```svg
<path d="M15.87…" stroke="#10161F" stroke-width="2" stroke-linecap="round"/>
```

- effectively all of them carry a hardcoded hex
- **0 use `currentColor`**

As exported, none of them respond to the design tokens — they render near-black whatever
`--primary` is set to.

`scripts/build-icons.mjs` handles this: it rewrites any hardcoded hex in `stroke` **or** `fill` to
`currentColor`, so an icon takes the colour of whatever context it sits in. `fill="none"` is left
alone deliberately — on a stroke-based icon that is structural, and rewriting it would flood every
icon with solid fills.

Both attributes are covered because the set is not purely stroke-based: `files/photo_album` and
`business/shopping_cart_1`, among others, carry hardcoded fills too.

## Known-bad files

Three have raw Figma gradient JSON dumped into their attributes and are not valid SVG. Exclude them
until they are re-exported:

- `library/system/loading.svg`
- `library/system/loading_2.svg`
- `library/system/loading_4.svg`

## Naming

Source naming is `snake_case` (`anticlockwise_alt`, `layout_bottom_open`); Clay's is `kebab-case`.
There are direct collisions with Clay symbol names — `files/search.svg` against Clay's `search`, for
one — so these must be namespaced (`lrdc-search`) when emitted into a shared sprite.

## Sizing

`viewBox` is uniformly `0 0 24 24` across every file. Clay's icons are mostly `0 0 512 512`,
which does **not** need reconciling: `<symbol>` carries its own `viewBox`, so both scale
independently inside one sprite.

Total is 1,368 KB of SVG text. Do not ship it whole — the sprite build subsets to what is actually
referenced.

## Licensing

**No licence accompanied this set** — there is no licence file in `solutions-design-system`, none
alongside the icons, and no `license` field in its `package.json`. Provenance beyond the Figma file
is unrecorded.

**The `brands/` category is deliberately not committed.** Its 98 icons are third-party trademarks —
Apple, Airbnb, Alipay, Android, App Store, Behance and others — carrying usage restrictions
independent of whatever licence covers the rest of the set. This repository is public, so they are
excluded via `.gitignore`; the rsync above will still repopulate the directory locally, but it
cannot re-enter git without removing that rule.

The licence question still applies to the 1,553 icons that *are* committed. Confirm the terms with
whoever sourced the set before relying on them in a distributed build.
