# Why pattern tokens use a `--lw-` prefix

Component tokens in `src/components/**` are **Clay's own** custom properties. Setting
`--btn-primary-hover-background-color` restyles a button because Clay's stylesheet reads that exact
name — the value transfers to any Liferay theme unchanged.

Patterns are different. A "hero" or a "capability grid" is *our* composition, not a Clay component,
so Clay defines no properties for it. Those tokens are namespaced `--lw-<pattern>-*` to make the
distinction visible at a glance: anything `--lw-` is defined by this repo and consumed by this
repo's CSS; everything else is Clay's and portable.

Mixing the two silently would be the easy mistake — you would not be able to tell which half of an
exported theme actually works outside the workbench.
