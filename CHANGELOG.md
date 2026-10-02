# Changelog

## 0.3.3 — CORE-24

- MonthGrid prints each day number and 土/日 colour from the cell `id`
  (`'YYYY-MM-DD'`), not from `cell.date`. A UTC server and a Tokyo browser now
  paint the same grid. The `id` must be the calendar day in the business's zone.
- New optional `selectedDate` prop (a cell id) outlines that day in the accent.
- Publishing runs `scripts/check-month-grid-tz.mjs`, which renders one month
  under `TZ=UTC` and `TZ=Asia/Tokyo` and fails if they differ.

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
