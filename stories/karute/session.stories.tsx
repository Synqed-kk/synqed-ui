import type { Meta, StoryObj } from '@storybook/react'

// Karute/Session — recomposes karute's /[locale]/(app)/sessions/page.tsx
// (which is the recording flow, despite the route name; karute calls each
// recording session a "session"). The route at /[locale]/(app)/karute/page.tsx
// is the karute LIST, not a session — see Karute/KaruteList.
//
// Mirrors components/recording/RecordingFlow.tsx in karute:
//   - Centered vertical layout, ~60vh
//   - Waveform + timer area (only in recording/recorded phases — idle is empty)
//   - Big circular red record button (or Stop / Discard+Use Recording pair)
//   - Title "Record session" + subtitle below
//   - "Recording for" appointment card with customer + date/time/duration
//
// Spike has no direct equivalent of this idle-recording-recorded flow; the
// closest synqed-ui components are RecordingFab (small floating button) and
// AudioSourceIndicator. Karute's page uses none of these — it's a full-screen
// centered recorder with a big circle button. Inlining to mirror karute.

import { AudioSourceIndicator } from '../../src/components/audio-source-indicator'

const meta: Meta = {
  title: 'Karute/Session',
  parameters: { layout: 'fullscreen', backgrounds: { default: 'white', values: [{ name: 'white', value: '#ffffff' }] } },
  decorators: [(Story) => <div className="bg-white min-h-screen"><Story /></div>],
}
export default meta
type Story = StoryObj

const nextAppointment = {
  id: 'a1',
  customerName: 'Misaki Tanaka',
  startTime: '2026-05-01T14:00:00',
  durationMinutes: 60,
  title: 'Facial · Moisture Boost',
  notes: 'Pollen-season concerns. Confirm SPF habits.',
}

const dateLabel = new Date(nextAppointment.startTime).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })
const timeLabel = new Date(nextAppointment.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

function MicIcon() {
  return (
    <svg className="h-7 w-7 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <line x1="12" y1="19" x2="12" y2="22" />
    </svg>
  )
}
function StopIcon() {
  return (
    <svg className="h-7 w-7 text-white" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="6" width="12" height="12" rx="2" /></svg>
  )
}

// ----------------------------------------------------------------------------
// Idle phase composition
// ----------------------------------------------------------------------------

function KaruteSessionIdle() {
  return (
    <main className="min-h-[80vh] flex flex-col items-center justify-center gap-6 p-6">
      {/* Waveform area is empty in idle phase */}
      <div className="h-[160px] w-full max-w-xs" />

      {/* Big red circular record button */}
      <div className="relative flex items-center justify-center h-16">
        <button
          type="button"
          className="flex items-center justify-center w-16 h-16 rounded-full bg-red-500 hover:bg-red-400 transition-colors shadow-lg shadow-red-500/25"
          aria-label="Start recording"
        >
          <MicIcon />
        </button>
      </div>

      {/* Title + subtitle */}
      <div className="text-center space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">Record session</h1>
        <p className="text-sm text-muted-foreground">Tap the microphone to start recording.</p>
      </div>

      {/* Appointment card */}
      <div className="w-full max-w-sm rounded-xl border border-border bg-card p-4">
        <p className="text-xs font-medium text-muted-foreground mb-2">Recording for</p>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-foreground">{nextAppointment.customerName}</p>
            <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          </div>
          <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground">
            <span>{dateLabel}</span>
            <span>{timeLabel}</span>
            <span>{nextAppointment.durationMinutes}min</span>
          </div>
          {nextAppointment.title && (
            <p className="text-sm text-foreground/80">{nextAppointment.title}</p>
          )}
          {nextAppointment.notes && (
            <p className="text-xs text-muted-foreground italic">{nextAppointment.notes}</p>
          )}
        </div>
      </div>

      {/* synqed-ui primitives present elsewhere but NOT used by karute today.
          Showing AudioSourceIndicator as a hint of what could be added — but
          karute has no equivalent piece on this page. */}
      <div className="opacity-60 mt-4 max-w-sm w-full text-center">
        <p className="text-[11px] uppercase tracking-wider text-muted-foreground mb-2">
          synqed-ui has this — karute does not use it yet
        </p>
        <AudioSourceIndicator
          source="phone_mic"
          size="compact"
          label="Phone mic"
          subtitle="Default capture source"
        />
      </div>
    </main>
  )
}

// ----------------------------------------------------------------------------
// Recording phase composition
// ----------------------------------------------------------------------------

const fakeBars = [22, 38, 14, 64, 48, 32, 78, 50, 28, 42, 70, 58, 36, 24, 52]

function KaruteSessionRecording() {
  return (
    <main className="min-h-[80vh] flex flex-col items-center justify-center gap-6 p-6">
      {/* Waveform + live timer */}
      <div className="flex flex-col items-center justify-center h-[160px] w-full max-w-xs">
        <div className="flex items-end justify-center gap-[3px] h-[100px] w-full">
          {fakeBars.map((h, i) => (
            <div
              key={i}
              className="w-[6px] rounded-full bg-red-500/70"
              style={{ height: `${h}px` }}
            />
          ))}
        </div>
        <p className="mt-2 text-lg font-mono text-foreground tabular-nums">03:42</p>
      </div>

      {/* Stop button (replaces record in same position) */}
      <div className="relative flex items-center justify-center h-16">
        <button
          type="button"
          className="flex items-center justify-center w-16 h-16 rounded-full bg-red-500 hover:bg-red-400 transition-colors shadow-lg shadow-red-500/25"
          aria-label="Stop recording"
        >
          <StopIcon />
        </button>
        {/* Pause button to the right */}
        <div className="absolute left-[calc(50%+48px)]">
          <button
            type="button"
            className="flex items-center justify-center w-10 h-10 rounded-full bg-muted hover:bg-muted/80 transition-colors"
            aria-label="Pause"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="5" width="4" height="14" rx="1" /><rect x="14" y="5" width="4" height="14" rx="1" /></svg>
          </button>
        </div>
      </div>

      <div className="text-center space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">Record session</h1>
        <p className="text-sm text-muted-foreground">Tap stop when done.</p>
      </div>

      <div className="w-full max-w-sm rounded-xl border border-border bg-card p-4">
        <p className="text-xs font-medium text-muted-foreground mb-2">Recording for</p>
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-foreground">{nextAppointment.customerName}</p>
          <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
        </div>
        <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground mt-1">
          <span>{dateLabel}</span>
          <span>{timeLabel}</span>
          <span>{nextAppointment.durationMinutes}min</span>
        </div>
      </div>
    </main>
  )
}

export const Default: Story = { render: () => <KaruteSessionIdle /> }
export const Recording: Story = { render: () => <KaruteSessionRecording /> }
