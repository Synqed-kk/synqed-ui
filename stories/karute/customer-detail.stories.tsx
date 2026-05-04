import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'

// Karute/CustomerDetail — recomposes karute's
// /[locale]/(app)/customers/[id]/page.tsx using lifted synqed-ui components.
//
// Mirrors:
//   - CustomerProfileHeader: large avatar, name, phone/mail rows, visit stats,
//     Edit button, registration date, optional churn-risk banner, optional
//     notes.
//   - CustomerDetailTabs: Advice card + Recommended Actions card always visible
//     above the tabs; tabs are AI History / Karute / Photos.
//
// Spike/CustomerDetail differs: spike uses CustomerHeaderCard +
// CustomerProfileIdentity + CustomerSessionHistory + CustomerMemoryCard +
// CustomerPrivacyPanel composed in a structured layout. Karute's current page
// has a thinner profile header and three content tabs whose AI/Karute/Photos
// content is bespoke.

import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../src/components/tabs'
import { Button } from '../../src/components/button'

const meta: Meta = {
  title: 'Karute/CustomerDetail',
  parameters: { layout: 'fullscreen', backgrounds: { default: 'white', values: [{ name: 'white', value: '#ffffff' }] } },
  decorators: [(Story) => <div className="bg-white min-h-screen"><Story /></div>],
}
export default meta
type Story = StoryObj

// ----------------------------------------------------------------------------
// Mock data — shaped after karute's Customer + KaruteRecordWithEntries
// ----------------------------------------------------------------------------

const customer = {
  id: 'c1',
  name: 'Misaki Tanaka',
  furigana: 'たなか みさき',
  phone: '090-2134-5678',
  email: 'misaki.tanaka@example.com',
  notes: 'Prefers quieter rooms. Sensitive to fragranced products.',
  created_at: '2026-02-10',
}

const totalVisitCount = 3
const lastVisit = '2026-04-19'

const karuteRecords = [
  {
    id: 'k1',
    created_at: '2026-04-19T13:00:00Z',
    session_date: '2026-04-19',
    summary:
      'Cheek dryness is the main concern. Worsening with pollen season — moisture boost course applied. Customer noted improvement after last visit.',
    transcript: '...',
    staff_profile_id: 's1',
    profiles: { full_name: 'Akari Sato' },
    entries: [
      { id: 'e1', category: 'symptom', content: 'Cheek dryness', source_quote: null, confidence_score: 0.9, is_manual: false, created_at: '2026-04-19' },
      { id: 'e2', category: 'treatment', content: 'Moisture boost facial', source_quote: null, confidence_score: 0.95, is_manual: false, created_at: '2026-04-19' },
      { id: 'e3', category: 'product', content: 'Hyaluronic serum recommended', source_quote: null, confidence_score: 0.8, is_manual: false, created_at: '2026-04-19' },
      { id: 'e4', category: 'preference', content: 'Prefers unscented products', source_quote: null, confidence_score: 0.85, is_manual: false, created_at: '2026-04-19' },
      { id: 'e5', category: 'next_visit', content: 'Schedule follow-up in 4 weeks for moisture re-eval', source_quote: null, confidence_score: 0.7, is_manual: false, created_at: '2026-04-19' },
    ],
  },
  {
    id: 'k2',
    created_at: '2026-03-22T13:00:00Z',
    session_date: '2026-03-22',
    summary: 'Initial assessment for pollen-season skin concerns. Mild dehydration noted across cheek area.',
    transcript: '...',
    staff_profile_id: 's1',
    profiles: { full_name: 'Akari Sato' },
    entries: [
      { id: 'e6', category: 'symptom', content: 'Mild dehydration in cheek area', source_quote: null, confidence_score: 0.88, is_manual: false, created_at: '2026-03-22' },
      { id: 'e7', category: 'treatment', content: 'Standard facial', source_quote: null, confidence_score: 0.95, is_manual: false, created_at: '2026-03-22' },
    ],
  },
]

// ----------------------------------------------------------------------------
// Inline icons
// ----------------------------------------------------------------------------
function Phone() { return (<svg className="size-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13 1.05.37 2.07.72 3.05a2 2 0 0 1-.45 2.11L8.09 10.91a16 16 0 0 0 6 6l2.03-2.29a2 2 0 0 1 2.11-.45c.98.35 2 .59 3.05.72A2 2 0 0 1 22 16.92z" /></svg>) }
function Mail() { return (<svg className="size-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-10 5L2 7" /></svg>) }
function Calendar() { return (<svg className="size-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>) }
function AlertTriangle() { return (<svg className="size-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3z" /><path d="M12 9v4M12 17h.01" /></svg>) }
function Gift() { return (<svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 12 20 22 4 22 4 12" /><rect width="20" height="5" x="2" y="7" /><path d="M12 22V7M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" /><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" /></svg>) }
function Lightbulb() { return (<svg className="h-4 w-4 text-amber-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18h6M10 22h4M15.09 14a5 5 0 1 0-6.18 0c.45.36.83.84 1.09 1.43V17h4v-1.57c.26-.59.64-1.07 1.09-1.43z" /></svg>) }
function Calendar2() { return (<svg className="h-4 w-4 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>) }
function Star() { return (<svg className="h-4 w-4 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>) }
function Check() { return (<svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>) }
function X() { return (<svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18M6 6l12 12" /></svg>) }
function FileText() { return (<svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>) }
function Camera() { return (<svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" /><circle cx="12" cy="13" r="3" /></svg>) }
function Sparkles() { return (<svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.9 5.8L4 12l6.1 1.5L12 21l1.9-7.5L20 12l-6.1-3.2z" /></svg>) }
function ChevronRight() { return (<svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>) }
function MessageSquare() { return (<svg className="size-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>) }

const PROFESSIONAL = new Set(['treatment', 'symptom', 'body_area', 'product'])
const PERSONAL = new Set(['preference', 'lifestyle', 'next_visit', 'other'])

function CategoryBadge({ category }: { category: string }) {
  return (
    <span className="inline-flex items-center rounded-full border border-border/40 bg-muted/40 px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
      {category}
    </span>
  )
}

// ----------------------------------------------------------------------------
// CustomerProfileHeader (mirrors components/customers/CustomerProfileHeader.tsx)
//
// NOTE: synqed-ui has CustomerHeaderCard (used by spike) and
// CustomerProfileIdentity, but neither matches karute's exact composition
// (avatar + name + phone/mail rows + edit on the right + Registration line +
// optional churn-risk banner). Inlined to honestly reflect karute's current UI.
// ----------------------------------------------------------------------------

function KaruteProfileHeader() {
  function daysSince(dateStr: string) {
    return Math.floor((Date.now() - new Date(dateStr).getTime()) / 86400000)
  }
  const churn = lastVisit && daysSince(lastVisit) > 90
  return (
    <div className="rounded-xl border bg-card p-6">
      <div className="flex items-start gap-4">
        <div className="size-16 shrink-0 rounded-full bg-primary/15 text-primary flex items-center justify-center text-xl font-semibold">
          MT
        </div>
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl font-semibold truncate">{customer.name}</h1>
          {customer.furigana && (
            <p className="text-sm text-muted-foreground mt-0.5">{customer.furigana}</p>
          )}
          <div className="mt-3 space-y-1.5">
            <div className="flex items-center gap-2 text-sm text-muted-foreground"><Phone /><span>{customer.phone ?? '-'}</span></div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground"><Mail /><span>{customer.email ?? '-'}</span></div>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2 shrink-0">
          <Button variant="outline" size="sm">Edit</Button>
          <div className="text-right mt-1">
            <p className="text-sm font-medium">{totalVisitCount} visits</p>
            <p className="text-xs text-muted-foreground mt-0.5">Last visit {lastVisit}</p>
          </div>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-border space-y-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar />
          <span>Registered {customer.created_at}</span>
        </div>
        {churn && (
          <div className="flex items-center gap-2 rounded-lg bg-red-500/10 border border-red-500/20 px-3 py-2 text-sm text-red-600 dark:text-red-400">
            <AlertTriangle />
            <span>Last visit was {daysSince(lastVisit)} days ago</span>
          </div>
        )}
        {customer.notes && (
          <div>
            <p className="text-xs font-medium text-muted-foreground mb-1">Notes</p>
            <p className="text-sm text-foreground whitespace-pre-wrap">{customer.notes}</p>
          </div>
        )}
      </div>
    </div>
  )
}

// ----------------------------------------------------------------------------
// Advice + Recommended Actions cards (always visible above the tabs)
// ----------------------------------------------------------------------------

function AdviceCard() {
  return (
    <div className="rounded-2xl border border-border/30 bg-gradient-to-r from-amber-500/5 to-transparent p-6">
      <div className="flex items-center gap-2 mb-3">
        <Gift />
        <h3 className="text-sm font-semibold">Advice for next visit</h3>
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed">
        Continue moisture-boost course; consider a light hyaluronic mask between
        sessions. Address pollen-season exposure with a daily SPF.
      </p>
    </div>
  )
}

function RecommendedActionsCard() {
  const [dismissed, setDismissed] = useState<Set<number>>(new Set())
  const actions = [
    { type: 'next_visit', title: 'Follow up', body: 'Schedule follow-up in 4 weeks for moisture re-eval' },
    { type: 'treatment', title: 'Treatment recommendation', body: 'Pair next visit with light hyaluronic mask' },
  ]
  const visible = actions.filter((_, i) => !dismissed.has(i))
  return (
    <div className="rounded-2xl border border-border/30 bg-card/50 p-6">
      <div className="flex items-center gap-2 mb-4"><Lightbulb /><h3 className="text-sm font-semibold">AI Recommended Actions</h3></div>
      {visible.length === 0 ? (
        <p className="text-sm text-muted-foreground text-center py-4">All actions handled.</p>
      ) : (
        <div className="space-y-3">
          {visible.map((a, i) => (
            <div key={i} className="flex items-start gap-3 py-3 border-b border-border/20 last:border-0">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-muted/50">
                {a.type === 'next_visit' ? <Calendar2 /> : <Star />}
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-sm font-medium">{a.title}</span>
                <p className="text-sm text-muted-foreground leading-relaxed mt-0.5">{a.body}</p>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <button type="button" onClick={() => setDismissed((s) => new Set(s).add(actions.indexOf(a)))} className="p-1.5 rounded-md text-green-500 hover:bg-green-500/10 transition-colors"><Check /></button>
                <button type="button" onClick={() => setDismissed((s) => new Set(s).add(actions.indexOf(a)))} className="p-1.5 rounded-md text-muted-foreground hover:bg-muted/50 transition-colors"><X /></button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ----------------------------------------------------------------------------
// Tab content
// ----------------------------------------------------------------------------

function KaruteTab() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Karute history</h2>
      <div className="space-y-4">
        {karuteRecords.map((r) => {
          const professional = r.entries.filter((e) => PROFESSIONAL.has(e.category))
          const personal = r.entries.filter((e) => PERSONAL.has(e.category) || (!PROFESSIONAL.has(e.category) && !PERSONAL.has(e.category)))
          return (
            <div key={r.id} className="rounded-2xl border border-border/30 bg-card/50 p-6">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{r.session_date}</span>
                  <span className="rounded-full border border-blue-500/30 bg-blue-500/10 px-2 py-0.5 text-[10px] font-medium text-blue-400">Salon</span>
                  <span className="rounded-full border border-green-500/30 bg-green-500/10 px-2 py-0.5 text-[10px] font-medium text-green-400">Approved</span>
                </div>
                {r.profiles?.full_name && <span className="text-xs text-muted-foreground">{r.profiles.full_name}</span>}
              </div>
              {r.summary && <p className="text-sm text-muted-foreground leading-relaxed mb-4">{r.summary}</p>}
              {professional.length > 0 && (
                <div className="mb-3">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Professional</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {professional.map((e) => (
                      <div key={e.id} className="flex items-center gap-1.5 rounded-lg border border-border/30 bg-muted/30 px-2.5 py-1.5">
                        <CategoryBadge category={e.category} />
                        <span className="text-xs text-foreground/80 line-clamp-1">{e.content}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {personal.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Personal</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {personal.map((e) => (
                      <div key={e.id} className="flex items-center gap-1.5 rounded-lg border border-border/30 bg-muted/30 px-2.5 py-1.5">
                        <CategoryBadge category={e.category} />
                        <span className="text-xs text-foreground/80 line-clamp-1">{e.content}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <a className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80 transition-colors">
                View details <ChevronRight />
              </a>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function PhotosTab() {
  return (
    <div className="rounded-2xl border border-border/30 bg-card/50 p-6">
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <Camera />
        <p className="text-sm font-medium text-muted-foreground mt-3 mb-1">No photos yet</p>
        <p className="text-xs text-muted-foreground mb-4">Upload before/after photos for this customer.</p>
        <Button variant="outline" size="sm">Upload first photo</Button>
      </div>
    </div>
  )
}

function AIHistoryTab() {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold">AI history</h2>
        <p className="text-xs text-muted-foreground mt-0.5">Past AI-generated summaries and advice for this customer.</p>
      </div>
      <div className="space-y-4">
        {karuteRecords.filter((r) => r.summary).map((r) => (
          <div key={r.id} className="rounded-2xl border border-border/30 bg-card/50 p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium">{r.session_date}</span>
              {r.profiles?.full_name && <span className="text-xs text-muted-foreground">{r.profiles.full_name}</span>}
            </div>
            <div className="mb-4">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-1.5"><MessageSquare />AI summary</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">{r.summary}</p>
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-1.5"><Gift />Advice for next visit</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Pair the next visit with a deeper hyaluronic mask. Maintain SPF
                throughout pollen season.
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ----------------------------------------------------------------------------
// Page composition
// ----------------------------------------------------------------------------

function KaruteCustomerDetailPage() {
  return (
    <main className="px-4 py-5 md:px-8 md:py-8 max-w-[1280px] mx-auto">
      <div className="space-y-6">
        <KaruteProfileHeader />

        {/* Tabs section */}
        <div className="space-y-4">
          {/* Always-visible above the tabs */}
          <AdviceCard />
          <RecommendedActionsCard />

          {/* Tabs: AI History (default) / Karute / Photos */}
          <Tabs defaultValue="ai-history">
            <TabsList>
              <TabsTrigger value="ai-history" className="flex items-center gap-1.5"><Sparkles /> AI history</TabsTrigger>
              <TabsTrigger value="karute" className="flex items-center gap-1.5"><FileText /> Karute</TabsTrigger>
              <TabsTrigger value="photos" className="flex items-center gap-1.5"><Camera /> Photos</TabsTrigger>
            </TabsList>
            <TabsContent value="ai-history" className="mt-4"><AIHistoryTab /></TabsContent>
            <TabsContent value="karute" className="mt-4"><KaruteTab /></TabsContent>
            <TabsContent value="photos" className="mt-4"><PhotosTab /></TabsContent>
          </Tabs>
        </div>
      </div>
    </main>
  )
}

export const Default: Story = {
  render: () => <KaruteCustomerDetailPage />,
}
