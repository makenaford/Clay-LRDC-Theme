# Adding a component

## 1. Find the properties Clay already exposes

Do not invent names. Compile the stylesheet and grep it:

```bash
pnpm exec sass --load-path=node_modules/@clayui/css/src/scss src/styles/clay.scss /tmp/clay.css
grep -oE '\-\-modal-[a-z-]+' /tmp/clay.css | sort -u
```

If Clay has no property for what you want to change, that is worth knowing before you design the
token — it means the change needs a real CSS rule, not a token.

## 2. Write the token file

`src/components/Modal/Modal.tokens.ts`. Tag anything that belongs to a state family with `variant`,
`prop` and `state` — that is what drives the state matrix:

```ts
color('--modal-header-background-color', 'Header · background', palette.white, {
    prop: 'background-color',
    state: 'default',
    variant: 'header',
}),
```

Tokens without those three fields still appear in the editor, grouped under "Other". Use that for
radii, padding and shadows — anything that is not a state.

Only tag a state Clay actually styles. Adding a `hover` token for something Clay never paints on
hover produces a matrix cell that lies.

## 3. Write the component

`src/components/Modal/Modal.tsx`, exporting a `ComponentSpec`:

- `gallery()` — what it looks like in realistic use.
- `variants` — one row per matrix row. **Each `id` must match the `variant` value used on that
  component's tokens**; the matrix pairs them by that string.

Prefer Clay's own React components and props over hand-written classes — reach for `outline` rather
than `className="btn btn-outline-primary"`, so you inherit Clay's markup decisions.

## 4. Register it

Add the spec to `componentSpecs` in `src/tokens/registry.ts`. Nothing else needs changing.

## 5. Check

```bash
pnpm build
```

Then open the component in the workbench and confirm the matrix columns match what Clay actually
styles — no invented states, no missing ones.
