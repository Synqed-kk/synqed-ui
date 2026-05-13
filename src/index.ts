// Utils
export { cn } from './utils/cn.js'

// Theme
export { themes, themeLabels, themeAccents, type ThemeName } from './themes/index.js'
export { ThemeProvider, useTheme } from './provider/theme-provider.js'

// Components
export { ThemeSwitcher } from './components/theme-switcher.js'
export { Button } from './components/button.js'
export { Input } from './components/input.js'
export { Card, CardHeader, CardTitle, CardValue, CardDescription } from './components/card.js'
export { Dialog, DialogTrigger, DialogClose, DialogOverlay, DialogContent, DialogTitle, DialogDescription } from './components/dialog.js'
export { Skeleton } from './components/skeleton.js'
export { Spinner } from './components/spinner.js'
export { Avatar } from './components/avatar.js'
export { Badge } from './components/badge.js'
export { Separator } from './components/separator.js'
export { ScrollArea, ScrollBar } from './components/scroll-area.js'
export { Tabs, TabsList, TabsTrigger, TabsContent } from './components/tabs.js'
export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuPortal,
} from './components/dropdown-menu.js'
export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
} from './components/select.js'
export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetPortal,
  SheetOverlay,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
} from './components/sheet.js'

// Shared presentation primitives
export { PageHeader } from './components/page-header.js'
export { DialogField } from './components/dialog-field.js'
export { KaruteNumberBadge } from './components/karute-number-badge.js'
export { ConsentBadge } from './components/consent-badge.js'
export { ConsentCheckCard, type ConsentCheckCardLabels } from './components/consent-check-card.js'
export { ErrorState } from './components/error-state.js'
export { Pagination } from './components/pagination.js'

// Feature-agnostic card primitives
export { SignalChip, type SignalTone } from './components/signal-chip.js'
export { VisitHistoryChain } from './components/visit-history-chain.js'
export { AppointmentRow, type AppointmentRowData } from './components/appointment-row.js'
export { AIActionCard, type AIActionData, type AIActionPriority } from './components/ai-action-card.js'
export { AudioSourceIndicator, type AudioSource } from './components/audio-source-indicator.js'
export { BusinessProfileHint } from './components/business-profile-hint.js'
export { DisclosureModeIndicator, type DisclosureMode } from './components/disclosure-mode-indicator.js'
export {
  DiarizedTranscriptView,
  type DiarizedTranscript,
  type DiarizedSegment,
  type DiarizedSpeaker,
  type DiarizedTranscriptCopy,
  type SpeakerRole,
} from './components/diarized-transcript-view.js'
export {
  ViewModeSelector,
  type ViewMode,
  type ViewModeStaff,
  type ViewModeCopy,
} from './components/view-mode-selector.js'

// Wave 2 — customers, karute-list, karute domain components
export {
  AIBodyPredictionCard,
  type AIBodyPredictionCopy,
} from './components/ai-body-prediction-card.js'
export {
  AIOutreachCard,
  type AIOutreachCopy,
} from './components/ai-outreach-card.js'
export { AIStatusChip, type AIStatusTone } from './components/ai-status-chip.js'
export { AISummaryCard } from './components/ai-summary-card.js'
export {
  ConversionStatusChip,
  type ConversionStatus,
  type ConversionStatusCopy,
} from './components/conversion-status-chip.js'
export {
  CustomerDeleteDialog,
  CustomerExportDialog,
  type CustomerDeleteDialogCopy,
  type CustomerExportDialogCopy,
  type CustomerExportFormat,
} from './components/customer-data-action-dialogs.js'
export { CustomerDeletionBanner } from './components/customer-deletion-banner.js'
export {
  CustomerHeaderCard,
  type CustomerHeaderCardCopy,
} from './components/customer-header-card.js'
export {
  CustomerMemoryCard,
  type CustomerMemoryCopy,
  type CustomerMemoryData,
  type MemoryCategory,
  type MemoryIntake,
  type MemoryItem,
  type MemoryItemSource,
} from './components/customer-memory-card.js'
export {
  CustomerPrivacyPanel,
  PrivacyUndoIcon,
  type CustomerPrivacyAccessHistory,
  type CustomerPrivacyAction,
  type CustomerPrivacyTone,
} from './components/customer-privacy-panel.js'
export {
  CustomerProfileIdentity,
  type CustomerProfileIdentityCopy,
} from './components/customer-profile-identity.js'
export {
  CustomerRow,
  type CustomerRowCopy,
  type CustomerRowData,
} from './components/customer-row.js'
export {
  CustomerSessionHistory,
  type SessionHistoryAiTone,
  type SessionHistoryConversion,
  type SessionHistoryCopy,
  type SessionHistoryEntries,
  type SessionHistoryItem,
} from './components/customer-session-history.js'
export {
  CustomerSignalChip,
  type CustomerSignalTone,
} from './components/customer-signal-chip.js'
export {
  CustomersFilterBar,
  type CustomersFilter,
} from './components/customers-filter-bar.js'
export { CustomersListSkeleton } from './components/customers-list-skeleton.js'
export { CustomersPageHeader } from './components/customers-page-header.js'
export {
  EditCustomerDialog,
  type EditCustomerDialogCopy,
  type EditCustomerInitial,
  type EditCustomerPatch,
  type EditCustomerStaff,
} from './components/edit-customer-dialog.js'
export {
  EntryComposer,
  type EntryComposerCopy,
  type EntryComposerEntry,
  type EntryComposerInferred,
} from './components/entry-composer.js'
export {
  KaruteBreadcrumb,
  type KaruteBreadcrumbCopy,
} from './components/karute-breadcrumb.js'
export {
  KaruteListFilterBar,
  type KaruteListFilter,
} from './components/karute-list-filter-bar.js'
export { KaruteListPageHeader } from './components/karute-list-page-header.js'
export {
  KaruteListRow,
  type KaruteListRowCopy,
  type KaruteListRowData,
} from './components/karute-list-row.js'
export {
  MemoryItemDialog,
  type MemoryItemDialogCopy,
  type MemoryItemDraft,
} from './components/memory-item-dialog.js'
export {
  MobileKaruteSheets,
  type MobileKaruteSheetsCopy,
} from './components/mobile-karute-sheets.js'
export {
  NewCustomerDialog,
  type NewCustomerDialogCopy,
  type NewCustomerGender,
  type NewCustomerStaff,
  type NewCustomerSubmit,
} from './components/new-customer-dialog.js'
export {
  NewKaruteDialog,
  type NewKaruteDialogCopy,
  type NewKaruteStaff,
  type NewKaruteSubmit,
} from './components/new-karute-dialog.js'
export {
  PostSessionResolutionDialog,
  type PostSessionResolutionCopy,
  type PostSessionResolutionReason,
  type PostSessionStatus,
} from './components/post-session-resolution-dialog.js'
export {
  SessionEntryRow,
  type SessionEntryRowData,
  type SessionEntryTone,
} from './components/session-entry-row.js'
export { SessionEntryTimeline } from './components/session-entry-timeline.js'
export {
  TranscriptCollapse,
  type TranscriptCollapseCopy,
} from './components/transcript-collapse.js'

// Wave 3 — dashboard + reservation domain components
export { DashboardHeader } from './components/dashboard-header.js'
export {
  DashboardStatCard,
  type DashboardStatCardData,
} from './components/dashboard-stat-card.js'
export { DashboardStatStrip } from './components/dashboard-stat-strip.js'
export {
  OnboardingBanner,
  type OnboardingBannerCopy,
} from './components/onboarding-banner.js'
export {
  RecentKaruteList,
  type RecentKaruteItem,
  type RecentKaruteListCopy,
} from './components/recent-karute-list.js'
export {
  TodaysAppointments,
  type TodaysAppointmentsCopy,
} from './components/todays-appointments.js'
export {
  AppointmentCard,
  type AppointmentCardData,
  type AppointmentCardStatus,
} from './components/appointment-card.js'
export {
  BookingActionSheet,
  type BookingActionSheetCopy,
} from './components/booking-action-sheet.js'
export {
  DayWeekMonthToggle,
  type DayWeekMonthToggleCopy,
  type DayWeekMonthView,
} from './components/day-week-month-toggle.js'
export {
  MonthGrid,
  type MonthDensityBucket,
  type MonthGridCell,
  type MonthGridCopy,
} from './components/month-grid.js'
export {
  NewBookingDialog,
  type NewBookingDialogCopy,
  type NewBookingStaff,
  type NewBookingSubmit,
} from './components/new-booking-dialog.js'
export {
  ReservationLegend,
  type ReservationLegendItem,
  type ReservationLegendTone,
} from './components/reservation-legend.js'
export {
  ReservationPageHeader,
  type ReservationPageHeaderCopy,
} from './components/reservation-page-header.js'
export {
  StaffRowHeader,
  type StaffRowHeaderData,
} from './components/staff-row-header.js'
export { TimeAxis } from './components/time-axis.js'
export {
  WeekDayCard,
  type WeekDayBookingChip,
  type WeekDayCardCopy,
  type WeekDayCardData,
} from './components/week-day-card.js'

// Wave 4 — settings + layout chrome components
export { SettingRow, type SettingRowOrientation } from './components/setting-row.js'
export {
  SidebarNavItem,
  type SidebarNavItemProps,
} from './components/sidebar-nav-item.js'
export {
  AppSidebar,
  type AppSidebarCopy,
  type AppSidebarNavItem,
} from './components/app-sidebar.js'
export {
  BottomTabBar,
  type BottomTabBarItem,
} from './components/bottom-tab-bar.js'
export { MobileShell } from './components/mobile-shell.js'
export {
  MobileHeader,
  type MobileHeaderCopy,
} from './components/mobile-header.js'
export {
  MobileMenuPage,
  type MobileMenuPageCopy,
  type MobileMenuPageItem,
} from './components/mobile-menu-page.js'
export {
  RecordingFab,
  type RecordingFabCopy,
} from './components/recording-fab.js'
export {
  DiscreetRecordingIndicator,
  type DiscreetRecordingIndicatorCopy,
} from './components/discreet-recording-indicator.js'
export {
  LogoutConfirmDialog,
  type LogoutConfirmDialogCopy,
} from './components/logout-confirm-dialog.js'
export {
  SubscriptionSummaryCard,
  type SubscriptionStatus,
  type SubscriptionSummaryCardCopy,
  type SubscriptionTier,
} from './components/subscription-summary-card.js'
export {
  PlanComparisonGrid,
  type PlanCardData,
  type PlanComparisonGridCopy,
} from './components/plan-comparison-grid.js'

// Wave 5 (photos) — photo gallery + capture domain components
export {
  PhotoCategoryPicker,
  type PhotoCategory,
  type PhotoCategoryColor,
} from './components/photo-category-picker.js'
export {
  PhotoThumbnail,
  type PhotoThumbnailRecord,
} from './components/photo-thumbnail.js'
export {
  PhotoCompareView,
  type PhotoCompareRecord,
  type PhotoCompareViewCopy,
} from './components/photo-compare-view.js'
export {
  PhotoCaptureDialog,
  type PhotoCaptureDialogCopy,
  type PhotoCaptureSubmit,
} from './components/photo-capture-dialog.js'
export {
  PhotoGallerySheet,
  type GalleryPhoto,
  type PhotoGallerySheetCopy,
} from './components/photo-gallery-sheet.js'
export {
  PhotoRecordCard,
  type PhotoRecordCardCopy,
} from './components/photo-record-card.js'
