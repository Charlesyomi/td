# UI conventions (read before styling any component)

## Scope
- Edit only the files named in the task. Never touch backend/, package.json, or other components.
- No new dependencies, fonts, CDN links or CSS frameworks.
- If you need a file you were not given, say so instead of adding it.

## Logic
- Do not change state, effects, handlers, props or service calls.
- Allowed markup changes: className, data-* and aria-* attributes, and elements the task explicitly lists.

## Styling
- CSS Modules: one X.module.css per component, imported as styles and used as styles.name.
- All colors, spacing, font sizes, radii and borders come from the tokens in src/index.css.
- Use only token names that exist there. If a value has no token, say so instead of inventing one or hardcoding it.
- Layout constants (max widths, min heights) are local custom properties at the top of the module file.
- No gradients, shadows, animations or illustrations. Dense, low-noise, terminal / issue-tracker feel.
- Data-attribute selectors are allowed only if the component sets that attribute in the same task.

## Accessibility
- Every interactive control needs an accessible name, a visible :focus-visible state and keyboard activation.
- Never hide functionality behind hover only.