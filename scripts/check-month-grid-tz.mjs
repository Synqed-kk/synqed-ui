// CORE-24: MonthGrid must paint the same day numbers and weekend colours in
// every runtime zone. Renders one JST month under TZ=UTC and TZ=Asia/Tokyo and
// fails if the markup differs or a day number or weekend colour is wrong.
// prepublishOnly runs it after the build.
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
if (utc !== tokyo) throw new Error('MonthGrid markup differs between TZ=UTC and TZ=Asia/Tokyo')
// Every day: its number, and accent on Saturday / destructive on Sunday.
// 2026-09-01 is a Tuesday, so day d falls on weekday (d + 1) % 7.
for (let d = 1; d <= 30; d++) {
  const id = String(d).padStart(2, '0')
  const cell = new RegExp(`aria-label="2026-09-${id}[^>]*>\\s*<span class="([^"]*)">(\\d+)<`).exec(utc)
  const tint = cell && (/destructive/.test(cell[1]) ? 'destructive' : /accent/.test(cell[1]) ? 'accent' : null)
  const weekday = (d + 1) % 7
  const colour = weekday === 6 ? 'accent' : weekday === 0 ? 'destructive' : null
  if (!cell || cell[2] !== String(d) || tint !== colour) {
    throw new Error(`2026-09-${id} must render "${d}" with ${colour ?? 'weekday'} colour, got ${cell?.[2]} (${tint})`)
  }
}
const pressed = [...utc.matchAll(/aria-label="(\d{4}-\d{2}-\d{2})[^"]*" aria-pressed="true"/g)].map(m => m[1])
if (pressed.join() !== '2026-09-05') throw new Error(`selectedDate must press only 2026-09-05, got [${pressed}]`)
console.log('MonthGrid renders the same under UTC and Asia/Tokyo.')
