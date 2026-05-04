import type { CustomerRowData } from '../../src/components/customer-row'
import type { CustomerSignalTone } from '../../src/components/customer-signal-chip'

// ----------------------------------------------------------------------------
// Customers mock data — adapted from
// synqed-karute-design-spike/src/mock/customers.ts (English entries) into the
// CustomerRowData shape consumed by synqed-ui's <CustomerRow />.
//
// Spike signal labels (新規 / 継続中 / 要フォロー / 休眠リスク) are mapped to
// CustomerSignalTone with English copy here.
// ----------------------------------------------------------------------------

export type SpikeSignal = '新規' | '継続中' | '要フォロー' | '休眠リスク'

export const signalToneMap: Record<SpikeSignal, CustomerSignalTone> = {
  新規: 'new',
  継続中: 'on_track',
  要フォロー: 'needs_followup',
  休眠リスク: 'dormant_risk',
}

export const signalLabelMap: Record<SpikeSignal, string> = {
  新規: 'New',
  継続中: 'On track',
  要フォロー: 'Follow-up',
  休眠リスク: 'Dormant risk',
}

const STAFF_COLORS: Record<string, string> = {
  'Akari Sato': 'var(--color-accent)',
  'Naomi Nakamura': '#a78bfa',
}

interface SpikeRow {
  id: string
  karuteNumber: string
  name: string
  initials: string
  age: number
  gender: string
  registeredDate: string
  visitCount: number
  lastVisitDate: string
  lastVisitDaysAgo: number
  nextPredictedVisit: string
  signal: SpikeSignal
  staffName: string
  visitChain: boolean[]
  phone?: string | null
  email?: string | null
}

const spikeCustomers: SpikeRow[] = [
  { id: 'c1', karuteNumber: '00120', name: 'Misaki Tanaka', initials: 'MT', age: 32, gender: 'Female', registeredDate: 'Feb 10, 2026', visitCount: 3, lastVisitDate: 'Mar 22, 2026', lastVisitDaysAgo: 28, nextPredictedVisit: 'mid-May', signal: '継続中', staffName: 'Akari Sato', visitChain: [true, true, true, false, false], phone: '090-2134-5678', email: 'misaki.tanaka@example.com' },
  { id: 'c2', karuteNumber: '00116', name: 'Yuko Suzuki', initials: 'YS', age: 41, gender: 'Female', registeredDate: 'Aug 3, 2025', visitCount: 8, lastVisitDate: 'Apr 18, 2026', lastVisitDaysAgo: 1, nextPredictedVisit: 'late May', signal: '継続中', staffName: 'Naomi Nakamura', visitChain: [true, true, true, true, true], phone: '080-3245-6789', email: 'yuko.suzuki@example.co.jp' },
  { id: 'c3', karuteNumber: '00112', name: 'Reiko Saito', initials: 'RS', age: 38, gender: 'Female', registeredDate: 'May 17, 2025', visitCount: 11, lastVisitDate: 'Apr 18, 2026', lastVisitDaysAgo: 1, nextPredictedVisit: 'mid-May', signal: '継続中', staffName: 'Akari Sato', visitChain: [true, true, true, true, true], phone: '090-4356-7890', email: 'reiko.s@example.com' },
  { id: 'c4', karuteNumber: '00123', name: 'Yumi Takahashi', initials: 'YT', age: 29, gender: 'Female', registeredDate: 'Apr 3, 2026', visitCount: 1, lastVisitDate: 'Apr 17, 2026', lastVisitDaysAgo: 2, nextPredictedVisit: 'mid-May', signal: '新規', staffName: 'Akari Sato', visitChain: [true, false, false, false, false], phone: '070-5467-8901', email: null },
  { id: 'c5', karuteNumber: '00110', name: 'Mitsuki Yamada', initials: 'MY', age: 44, gender: 'Female', registeredDate: 'Mar 12, 2025', visitCount: 14, lastVisitDate: 'Apr 15, 2026', lastVisitDaysAgo: 4, nextPredictedVisit: 'early May', signal: '継続中', staffName: 'Akari Sato', visitChain: [true, true, true, true, true], phone: '090-6578-9012', email: 'mitsuki.yamada@example.com' },
  { id: 'c6', karuteNumber: '00122', name: 'Aya Kobayashi', initials: 'AK', age: 26, gender: 'Female', registeredDate: 'Mar 28, 2026', visitCount: 1, lastVisitDate: 'Mar 28, 2026', lastVisitDaysAgo: 22, nextPredictedVisit: 'early May', signal: '新規', staffName: 'Naomi Nakamura', visitChain: [true, false, false, false, false], phone: '080-7689-0123', email: 'aya.k@example.jp' },
  { id: 'c7', karuteNumber: '00119', name: 'Tomomi Watanabe', initials: 'TW', age: 35, gender: 'Female', registeredDate: 'Nov 2, 2025', visitCount: 6, lastVisitDate: 'Mar 10, 2026', lastVisitDaysAgo: 40, nextPredictedVisit: 'TBD', signal: '要フォロー', staffName: 'Naomi Nakamura', visitChain: [true, true, true, false, false], phone: '090-8790-1234', email: 'tomomi.watanabe@example.com' },
  { id: 'c8', karuteNumber: '00105', name: 'Kana Kimura', initials: 'KK', age: 51, gender: 'Female', registeredDate: 'Sep 8, 2024', visitCount: 18, lastVisitDate: 'Apr 12, 2026', lastVisitDaysAgo: 7, nextPredictedVisit: 'mid-May', signal: '継続中', staffName: 'Akari Sato', visitChain: [true, true, true, true, true], phone: '03-3456-7890', email: 'kana.kimura@example.co.jp' },
  { id: 'c9', karuteNumber: '00115', name: 'Mizuho Kato', initials: 'MK', age: 33, gender: 'Female', registeredDate: 'Jul 21, 2025', visitCount: 7, lastVisitDate: 'Jan 8, 2026', lastVisitDaysAgo: 101, nextPredictedVisit: 'Reach out', signal: '休眠リスク', staffName: 'Akari Sato', visitChain: [true, true, false, false, false], phone: '080-2122-3344', email: null },
  { id: 'c10', karuteNumber: '00109', name: 'Ai Matsumoto', initials: 'AM', age: 39, gender: 'Female', registeredDate: 'Feb 18, 2025', visitCount: 15, lastVisitDate: 'Mar 14, 2026', lastVisitDaysAgo: 36, nextPredictedVisit: 'TBD', signal: '要フォロー', staffName: 'Akari Sato', visitChain: [true, true, true, false, false], phone: null, email: 'ai.matsumoto@example.jp' },
  { id: 'c11', karuteNumber: '00106', name: 'Rina Shimizu', initials: 'RS', age: 45, gender: 'Female', registeredDate: 'Nov 30, 2024', visitCount: 13, lastVisitDate: 'Dec 22, 2025', lastVisitDaysAgo: 118, nextPredictedVisit: 'Reach out', signal: '休眠リスク', staffName: 'Akari Sato', visitChain: [true, true, false, false, false], phone: '090-6566-7788', email: 'rina.shimizu@example.co.jp' },
  { id: 'c12', karuteNumber: '00108', name: 'Saya Mori', initials: 'SM', age: 37, gender: 'Female', registeredDate: 'Jan 20, 2025', visitCount: 12, lastVisitDate: 'Apr 7, 2026', lastVisitDaysAgo: 12, nextPredictedVisit: 'early May', signal: '継続中', staffName: 'Akari Sato', visitChain: [true, true, true, true, true], phone: '090-8788-9900', email: null },
]

export const customerRows: CustomerRowData[] = spikeCustomers.map((c) => ({
  id: c.id,
  name: c.name,
  initials: c.initials,
  age: c.age,
  gender: c.gender,
  registeredDate: c.registeredDate,
  staffName: c.staffName,
  karuteNumber: c.karuteNumber,
  phone: c.phone,
  email: c.email,
  signalTone: signalToneMap[c.signal],
  signalLabel: signalLabelMap[c.signal],
  visitCount: c.visitCount,
  visitChain: c.visitChain,
  lastVisitDate: c.lastVisitDate,
  lastVisitDaysAgo: c.lastVisitDaysAgo,
  nextPredictedVisit: c.nextPredictedVisit,
  staffStripeColor: STAFF_COLORS[c.staffName] ?? 'var(--color-accent)',
}))

export const customerCounts = {
  all: customerRows.length,
  new: customerRows.filter((c) => c.signalTone === 'new').length,
  on_track: customerRows.filter((c) => c.signalTone === 'on_track').length,
  needs_followup: customerRows.filter((c) => c.signalTone === 'needs_followup').length,
  dormant_risk: customerRows.filter((c) => c.signalTone === 'dormant_risk').length,
  pending_deletion: 0,
}
