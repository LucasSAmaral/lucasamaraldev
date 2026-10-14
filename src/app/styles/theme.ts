// Tokens de design. Referência visual: docs/layout-refactor-plan.md
// Constantes (em vez de ThemeProvider) para funcionar também nos component tests do Cypress,
// que montam os componentes sem os providers.

export const colors = {
  background: '#0f1218',
  surface: '#181c24',
  surfaceHover: '#1c212b',
  surfaceRaised: '#232935',
  text: '#e8eaed',
  textSecondary: '#c3c9d4',
  textBody: '#b4bbc7',
  textMuted: '#9aa3b2',
  textSubtle: '#8a93a3',
  border: 'rgba(255, 255, 255, 0.07)',
  borderStrong: 'rgba(255, 255, 255, 0.16)',
  accent: '#f5b94a',
  accentSoft: 'rgba(245, 185, 74, 0.12)',
  accentLine: 'rgba(245, 185, 74, 0.35)',
  onAccent: '#1a1405',
  error: '#e0796b',
  errorText: '#f0a197',
  overlay: 'rgba(5, 7, 10, 0.72)',
} as const;

export const fonts = {
  body: 'var(--font-inter), system-ui, sans-serif',
  heading: 'var(--font-space-grotesk), var(--font-inter), system-ui, sans-serif',
} as const;

export const radii = {
  sm: '8px',
  md: '12px',
  lg: '18px',
  xl: '22px',
  pill: '999px',
} as const;

export const space = (multiplier: number) => `${multiplier * 4}px`;

export const transitions = {
  fast: '200ms',
  base: '300ms',
  easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
} as const;
