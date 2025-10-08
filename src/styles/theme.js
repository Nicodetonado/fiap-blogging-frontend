export const theme = {
  colors: {
    primary: {
      lightest: '#fef2f2',
      lighter: '#fee2e2',
      light: '#fecaca',
      medium: '#fca5a5',
      base: '#f87171',
      main: '#C8102E',
      dark: '#b91c1c',
      darker: '#991b1b',
      darkest: '#7f1d1d',
      deep: '#5f1a1a',
    },
    secondary: {
      lightest: '#f8fafc',
      lighter: '#f1f5f9',
      light: '#e2e8f0',
      medium: '#cbd5e1',
      base: '#94a3b8',
      main: '#475569',
      dark: '#334155',
      darker: '#1e293b',
      darkest: '#0f172a',
      deep: '#000000',
    },
    success: {
      lightest: '#f0fdf4',
      lighter: '#dcfce7',
      light: '#bbf7d0',
      medium: '#86efac',
      base: '#4ade80',
      main: '#22c55e',
      dark: '#16a34a',
      darker: '#15803d',
      darkest: '#166534',
      deep: '#14532d',
    },
    error: {
      lightest: '#fef2f2',
      lighter: '#fee2e2',
      light: '#fecaca',
      medium: '#fca5a5',
      base: '#f87171',
      main: '#ef4444',
      dark: '#dc2626',
      darker: '#b91c1c',
      darkest: '#991b1b',
      deep: '#7f1d1d',
    },
    warning: {
      lightest: '#fffbeb',
      lighter: '#fef3c7',
      light: '#fde68a',
      medium: '#fcd34d',
      base: '#fbbf24',
      main: '#f59e0b',
      dark: '#d97706',
      darker: '#b45309',
      darkest: '#92400e',
      deep: '#78350f',
    },
    gray: {
      lightest: '#f9fafb',
      lighter: '#f3f4f6',
      light: '#e5e7eb',
      medium: '#d1d5db',
      base: '#9ca3af',
      main: '#6b7280',
      dark: '#4b5563',
      darker: '#374151',
      darkest: '#1f2937',
      deep: '#111827',
    },
    white: '#ffffff',
    black: '#000000',
  },
  spacing: {
    xs: '0.5rem',
    sm: '0.75rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '2.5rem',
    '3xl': '3rem',
    '4xl': '4rem',
  },
  borderRadius: {
    none: '0',
    sm: '0.375rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
    '2xl': '1.5rem',
    full: '9999px',
  },
  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
  },
  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
  lineHeight: {
    none: '1',
    tight: '1.25',
    snug: '1.375',
    normal: '1.5',
    relaxed: '1.625',
    loose: '2',
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  },
  breakpoints: {
    mobile: '640px',
    tablet: '768px',
    desktop: '1024px',
    wide: '1280px',
  },
  transitions: {
    fast: '0.15s ease-out',
    normal: '0.2s ease-out',
    slow: '0.3s ease-out',
  },
  zIndex: {
    hide: -1,
    auto: 'auto',
    base: 0,
    docked: 10,
    dropdown: 1000,
    sticky: 1100,
    banner: 1200,
    overlay: 1300,
    modal: 1400,
    popover: 1500,
    skipLink: 1600,
    toast: 1700,
    tooltip: 1800,
  },
};

export const gradients = {
  primary: 'linear-gradient(135deg, #C8102E 0%, #b91c1c 100%)',
  secondary: 'linear-gradient(135deg, #475569 0%, #334155 100%)',
  success: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
  warning: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
  error: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
  subtle: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
};

export const mixins = {
  flexCenter: `
    display: flex;
    align-items: center;
    justify-content: center;
  `,
  flexBetween: `
    display: flex;
    align-items: center;
    justify-content: space-between;
  `,
  buttonReset: `
    border: none;
    background: none;
    cursor: pointer;
    font-family: inherit;
    outline: none;
  `,
  inputReset: `
    border: none;
    background: none;
    outline: none;
    font-family: inherit;
  `,
  card: `
    background: ${theme.colors.white};
    border-radius: ${theme.borderRadius.lg};
    box-shadow: ${theme.shadows.md};
    padding: ${theme.spacing.lg};
    border: 1px solid ${theme.colors.gray.light};
  `,
  focusRing: `
    &:focus-visible {
      outline: 2px solid ${theme.colors.primary.main};
      outline-offset: 2px;
    }
  `,
  hoverLift: `
    transition: transform ${theme.transitions.normal}, box-shadow ${theme.transitions.normal};
    &:hover {
      transform: translateY(-2px);
      box-shadow: ${theme.shadows.lg};
    }
  `,
};
