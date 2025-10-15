/**
 * Design System
 *
 * A comprehensive design system defining all visual styles, tokens, and component patterns
 * used throughout the UPI Scam Response App.
 */

// ============================================================================
// COLOR TOKENS
// ============================================================================

export const colors = {
  // Primary - Used for critical/urgent actions
  primary: {
    red: "#DC2626",
    darkRed: "#991B1B",
  },

  // Secondary - Used for informational elements
  secondary: {
    orange: "#EA580C",
    darkOrange: "#C2410C",
  },

  // Grayscale
  gray: {
    50: "#F9FAFB",
    100: "#F3F4F6",
    200: "#E5E7EB",
    300: "#D1D5DB",
    400: "#9CA3AF",
    500: "#6B7280",
    600: "#4B5563",
    700: "#374151",
    800: "#1F2937",
    900: "#111827",
  },

  // Status colors
  status: {
    success: {
      light: "#DEF7EC",
      main: "#10B981",
      dark: "#065F46",
    },
    warning: {
      light: "#FEF3C7",
      main: "#F59E0B",
      dark: "#92400E",
    },
    error: {
      light: "#FEE2E2",
      main: "#EF4444",
      dark: "#991B1B",
    },
    info: {
      light: "#DBEAFE",
      main: "#3B82F6",
      dark: "#1E40AF",
    },
  },

  // Urgency level colors (for gradients)
  urgency: {
    critical: "from-red-600 to-red-700",
    urgent: "from-orange-600 to-orange-700",
    high: "from-yellow-600 to-yellow-700",
    standard: "from-blue-600 to-blue-700",
  },

  // Urgency level solid colors (for badges)
  urgencySolid: {
    critical: "bg-red-600",
    urgent: "bg-orange-600",
    high: "bg-yellow-600",
    standard: "bg-blue-600",
  },
} as const;

// ============================================================================
// SPACING TOKENS
// ============================================================================

export const spacing = {
  // Card padding
  cardPadding: {
    small: "p-4",
    medium: "p-6",
    large: "p-8",
  },

  // Section spacing
  section: "space-y-8",

  // Item spacing
  items: {
    tight: "space-y-2",
    normal: "space-y-3",
    relaxed: "space-y-4",
    loose: "space-y-6",
  },

  // Button spacing
  buttonGap: "gap-3",
} as const;

// ============================================================================
// TYPOGRAPHY TOKENS
// ============================================================================

export const typography = {
  // Headings
  heading: {
    h1: "text-3xl font-bold text-gray-900",
    h2: "text-2xl font-bold text-gray-900",
    h3: "text-xl font-bold text-gray-900",
    h4: "text-lg font-bold text-gray-900",
  },

  // Body text
  body: {
    large: "text-lg text-gray-700",
    base: "text-base text-gray-700",
    small: "text-sm text-gray-600",
    tiny: "text-xs text-gray-500",
  },

  // Special text
  label: "text-sm font-medium text-gray-700",
  error: "text-sm text-red-600 font-semibold",
  link: "text-red-600 hover:text-red-700",
} as const;

// ============================================================================
// BORDER RADIUS TOKENS
// ============================================================================

export const borderRadius = {
  small: "rounded-lg",
  medium: "rounded-xl",
  large: "rounded-2xl",
  xlarge: "rounded-3xl",
  full: "rounded-full",
} as const;

// ============================================================================
// SHADOW TOKENS
// ============================================================================

export const shadows = {
  small: "shadow-sm",
  medium: "shadow-md",
  large: "shadow-lg",
  xlarge: "shadow-xl",
  xxlarge: "shadow-2xl",
  hover: "hover:shadow-2xl",
} as const;

// ============================================================================
// COMPONENT STYLES
// ============================================================================

/**
 * Card Components
 */
export const cards = {
  // Primary card for main content
  primary: `bg-white ${borderRadius.xlarge} ${spacing.cardPadding.large} ${shadows.xlarge} border border-gray-200`,

  // Secondary card for nested content
  secondary: `bg-white ${borderRadius.large} ${spacing.cardPadding.medium} ${shadows.medium} border border-gray-200`,

  // Info card for tips and information
  info: `bg-blue-50 ${borderRadius.large} ${spacing.cardPadding.medium} border border-blue-200`,

  // Hero card for landing pages
  hero: `bg-gradient-to-br from-red-50 to-white ${borderRadius.xlarge} ${spacing.cardPadding.large} border-2 border-red-100`,

  // List item card
  listItem: `bg-gray-50 ${borderRadius.medium} ${spacing.cardPadding.medium} hover:bg-gray-100 transition-colors cursor-pointer border border-gray-200`,
} as const;

/**
 * Button Components
 */
export const buttons = {
  // Primary button - for main actions (emergency, critical)
  primary: {
    base: `w-full bg-gradient-to-br from-[#DC2626] to-[#991B1B] text-white ${spacing.cardPadding.medium} ${borderRadius.large} font-bold text-lg ${shadows.xlarge} ${shadows.hover} transition-all`,
    large: `w-full bg-gradient-to-br from-[#DC2626] to-[#991B1B] text-white py-6 px-8 ${borderRadius.large} font-bold text-xl ${shadows.xlarge} ${shadows.hover} transition-all`,
    compact: `bg-gradient-to-br from-[#DC2626] to-[#991B1B] text-white py-3 px-6 ${borderRadius.large} font-bold ${shadows.large} ${shadows.hover} transition-all`,
  },

  // Secondary button - for alternative actions
  secondary: {
    base: `w-full bg-white text-gray-700 py-4 px-6 ${borderRadius.large} font-semibold border-2 border-gray-200 hover:border-red-300 hover:bg-gray-50 transition-all`,
    large: `w-full bg-white text-gray-700 py-5 px-8 ${borderRadius.large} font-semibold border-2 border-gray-200 hover:border-red-300 hover:bg-gray-50 transition-all`,
    compact: `bg-white text-gray-700 py-3 px-6 ${borderRadius.medium} font-semibold border-2 border-gray-200 hover:border-red-300 hover:bg-gray-50 transition-all`,
  },

  // Option button - for selection lists
  option: `w-full text-left p-4 ${borderRadius.medium} border-2 border-gray-200 hover:border-orange-500 hover:bg-orange-50 transition-all group`,

  // Quick action button - for quick selections (bank names, time)
  quickAction: `px-4 py-3 bg-white hover:bg-indigo-50 border-2 border-gray-300 hover:border-indigo-500 ${borderRadius.medium} font-semibold text-gray-800 hover:text-indigo-700 focus:ring-4 focus:ring-indigo-200 focus:outline-none transition-all ${shadows.small}`,

  // Back/Skip text button
  text: "text-gray-600 hover:text-gray-900 font-semibold",

  // Link button
  link: "text-red-600 hover:text-red-700 text-sm font-semibold",

  // Action card button - for dashboard actions
  action: {
    primary: `w-full bg-gradient-to-br from-[#DC2626] to-[#991B1B] text-white py-3 px-5 ${borderRadius.large} font-bold text-sm ${shadows.large} ${shadows.hover} transition-all`,
    secondary: `w-full bg-white text-gray-700 py-3 px-5 ${borderRadius.medium} font-semibold border-2 border-gray-200 hover:border-red-300 hover:bg-gray-50 transition-all text-sm`,
  },

  // Input collection buttons - subtle, doesn't compete with input field
  input: {
    primary: `w-full bg-blue-600 text-white py-3 px-6 ${borderRadius.medium} font-semibold hover:bg-blue-700 transition-all`,
    secondary: `w-full bg-white text-gray-700 py-3 px-6 ${borderRadius.medium} font-semibold border-2 border-gray-200 hover:border-gray-400 hover:bg-gray-50 transition-all`,
  },
} as const;

/**
 * Input Components
 */
export const inputs = {
  // Text input
  text: `w-full px-6 py-4 text-lg border-2 border-gray-300 ${borderRadius.medium} focus:ring-4 focus:ring-blue-200 focus:border-blue-500 focus:outline-none transition-all`,

  // Textarea
  textarea: `w-full px-6 py-4 text-lg border-2 border-gray-300 ${borderRadius.medium} focus:ring-4 focus:ring-amber-200 focus:border-amber-500 focus:outline-none transition-all resize-none`,

  // Number input with large text
  number: `flex-1 px-6 py-4 text-2xl font-bold border-2 border-gray-300 ${borderRadius.medium} focus:ring-4 focus:ring-red-200 focus:border-red-500 focus:outline-none transition-all`,
} as const;

/**
 * Icon Containers
 */
export const iconContainers = {
  // Large circular icon container
  large: (colorClass: string) => `inline-flex items-center justify-center w-20 h-20 ${colorClass} ${borderRadius.full}`,

  // Medium circular icon container
  medium: (colorClass: string) => `inline-flex items-center justify-center w-12 h-12 ${colorClass} ${borderRadius.full}`,

  // Small circular icon container
  small: (colorClass: string) => `inline-flex items-center justify-center w-10 h-10 ${colorClass} ${borderRadius.full}`,
} as const;

/**
 * Layout Components
 */
export const layouts = {
  // Screen container
  screen: "min-h-screen bg-gray-50",

  // Screen with gradient background
  screenGradient: "min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50",

  // Centered content container
  container: "max-w-2xl mx-auto",

  // Wide content container
  containerWide: "max-w-7xl mx-auto",

  // Screen padding
  padding: "px-6 py-8",
  paddingSmall: "px-4 py-6",

  // Flex layouts
  flexCenter: "flex items-center justify-center",
  flexBetween: "flex items-center justify-between",
  flexCol: "flex flex-col",
} as const;

/**
 * Animation Classes
 */
export const animations = {
  fadeIn: "animate-in fade-in duration-500",
  slideUp: "animate-in fade-in slide-in-from-bottom-4 duration-500",
  pulse: "animate-pulse",
  transition: "transition-all",
  transitionFast: "transition-all duration-300",
} as const;

/**
 * Header Components
 */
export const headers = {
  // App header (sticky top navigation)
  appHeader: `bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-10`,

  // Section header
  section: `mb-4`,
  sectionTitle: `text-lg font-bold mb-1`,
  sectionSubtitle: `text-sm text-gray-600`,
} as const;

/**
 * Progress Components
 */
export const progress = {
  container: "h-2 bg-gray-200 rounded-full overflow-hidden",
  bar: "h-full transition-all duration-500",
  barRed: "h-full bg-gradient-to-r from-red-600 to-red-500 transition-all duration-500",
  barOrange: "h-full bg-gradient-to-r from-red-600 to-orange-600 transition-all duration-500",
} as const;

/**
 * Badge/Status Components
 */
export const badges = {
  urgency: (level: string) => `inline-block px-4 py-2 ${borderRadius.full} text-sm font-bold text-white ${colors.urgencySolid[level as keyof typeof colors.urgencySolid]}`,
  status: `inline-flex items-center gap-2 px-3 py-1 ${borderRadius.full} text-xs font-semibold`,
  statusPending: `inline-flex items-center gap-2 px-3 py-1 ${borderRadius.full} text-xs font-semibold bg-gray-100 text-gray-700`,
  statusCompleted: `inline-flex items-center gap-2 px-3 py-1 ${borderRadius.full} text-xs font-semibold bg-green-100 text-green-700`,
} as const;

/**
 * Action Card Components (for dashboard)
 */
export const actionCard = {
  container: `bg-white ${borderRadius.xlarge} p-6 ${shadows.medium} border border-gray-200`,
  containerUrgent: `bg-white ${borderRadius.xlarge} p-6 ${shadows.medium} border-2 border-red-200`,
  number: `flex-shrink-0 w-8 h-8 bg-red-600 text-white ${borderRadius.full} flex items-center justify-center text-sm font-bold`,
  title: `font-bold text-gray-900 mb-2`,
  description: `text-sm text-gray-600 mb-4`,
  buttonGroup: `space-y-2`,
} as const;

// ============================================================================
// COMPOSITE PATTERNS
// ============================================================================

/**
 * Form Button Layout
 * Standard button layout for forms with back, skip, and continue buttons
 */
export const formButtonLayout = {
  container: `flex ${spacing.buttonGap} mt-6`,
  withBackOnly: `flex ${spacing.buttonGap} mt-6`,
  withBackAndSkip: `flex ${spacing.buttonGap} mt-6`,
} as const;

/**
 * Question Screen Pattern
 * Standard layout for conversational question screens
 */
export const questionScreen = {
  container: `${layouts.screen} p-6 ${layouts.flexCenter}`,
  content: `${layouts.container} w-full ${animations.slideUp}`,
  iconContainer: "text-center mb-8",
  heading: `${typography.heading.h1} mb-2`,
  subtitle: typography.body.small,
  card: cards.primary,
} as const;

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Generate urgency-based gradient classes
 */
export const getUrgencyGradient = (urgency: "critical" | "urgent" | "high" | "standard") => {
  return colors.urgency[urgency];
};

/**
 * Generate focus ring for color
 */
export const getFocusRing = (color: string) => {
  return `focus:ring-4 focus:ring-${color}-300`;
};

/**
 * Generate primary button with custom gradient
 */
export const getPrimaryButtonWithGradient = (fromColor: string, toColor: string) => {
  return `w-full bg-gradient-to-br from-${fromColor} to-${toColor} text-white py-4 px-6 ${borderRadius.large} font-bold text-lg ${shadows.xlarge} ${shadows.hover} transition-all`;
};
