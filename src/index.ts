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
export { ErrorState } from './components/error-state.js'
export { Pagination } from './components/pagination.js'

// Feature-agnostic card primitives
export { SignalChip, type SignalTone } from './components/signal-chip.js'
export { VisitHistoryChain } from './components/visit-history-chain.js'
export { AppointmentRow, type AppointmentRowData } from './components/appointment-row.js'
export { AIActionCard, type AIActionData, type AIActionPriority } from './components/ai-action-card.js'
