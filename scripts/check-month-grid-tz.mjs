// CORE-24: MonthGrid must paint the same day numbers and weekend colours in
// every runtime zone. Renders one JST month under TZ=UTC and TZ=Asia/Tokyo and
// fails if the markup differs or 2026-09-01 is not a Tuesday "1".
// Run after `npm run build`: node scripts/check-month-grid-tz.mjs
import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'

if (process.argv[2] === 'render') {
  const { createElement } = await import('react')
  const { renderToStaticMarkup } = await import('react-dom/server')
  const { MonthGrid } = await import('../dist/index.js')
  const cells = Array.from({ length: 30 }, (_, i) => {
    const id = `2026-09-${String(i + 1).padStart(2, '0')}`
    return { id, date: new Date(`${id}T00:00:00+09:00`), inMonth: true, isToday: false, count: 0, density: 'empty' }
  })
  process.stdout.write(renderToStaticMarkup(createElement(MonthGrid, { cells, selectedDate: '2026-09-05' })))
  process.exit(0)
}

const self = fileURLToPath(import.meta.url)
const render = (TZ) => execFileSync(process.execPath, [self, 'render'], { env: { ...process.env, TZ }, encoding: 'utf8' })
const utc = render('UTC')
const tokyo = render('Asia/Tokyo')
const first = /aria-label="2026-09-01[^>]*>\s*<span class="([^"]*)">(\d+)</.exec(utc)
if (utc !== tokyo) throw new Error('MonthGrid markup differs between TZ=UTC and TZ=Asia/Tokyo')
if (!first || first[2] !== '1' || /destructive|accent/.test(first[1])) {
  throw new Error(`2026-09-01 must render "1" in weekday colour, got ${first?.[2]} (${first?.[1]})`)
}
console.log('MonthGrid renders the same under UTC and Asia/Tokyo.')
