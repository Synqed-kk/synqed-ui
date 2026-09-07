# Changelog

## Unreleased — KAR-5

- Karute uses the app's blue accent in light and dark mode, including matching
  hover and subtle backgrounds. After installing this release, Karute can remove
  the R13 accent override in `src/app/globals.css`.
- `Button` defaults to `type="button"`. Form submission requires an explicit
  `type="submit"`; `type="reset"` remains supported.
- MonthGrid's medium-density dots and legend use
  `--color-month-density-medium`, independent of the action/selection accent.
  Karute defaults to blue in both modes; other themes fall back to their accent.
  Set the token on a calendar container to customize it locally.
