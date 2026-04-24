export type ThemeName = "akshaya-tritiya" | "vrindavan-fresh";

export type CoreThemeColors = {
  primary: string;
  secondary: string;
  background: string;
  surface: string;
  text: string;
  accent: string;
};

export type AppTheme = {
  name: ThemeName;
  label: string;
  colors: CoreThemeColors;
};

type Rgb = {
  r: number;
  g: number;
  b: number;
};

const clamp = (value: number, min = 0, max = 255) => Math.min(max, Math.max(min, value));

const hexToRgb = (hex: string): Rgb => {
  const normalized = hex.replace("#", "");
  const expanded =
    normalized.length === 3
      ? normalized
          .split("")
          .map((char) => `${char}${char}`)
          .join("")
      : normalized;

  const value = Number.parseInt(expanded, 16);

  return {
    r: (value >> 16) & 255,
    g: (value >> 8) & 255,
    b: value & 255,
  };
};

const rgbToHex = ({ r, g, b }: Rgb) =>
  `#${[r, g, b]
    .map((channel) => clamp(Math.round(channel)).toString(16).padStart(2, "0"))
    .join("")}`;

const mix = (color: string, target: string, amount: number) => {
  const from = hexToRgb(color);
  const to = hexToRgb(target);

  return rgbToHex({
    r: from.r + (to.r - from.r) * amount,
    g: from.g + (to.g - from.g) * amount,
    b: from.b + (to.b - from.b) * amount,
  });
};

export const lighten = (color: string, amount: number) => mix(color, "#ffffff", amount);

export const darken = (color: string, amount: number) => mix(color, "#000000", amount);

export const opacity = (color: string, alpha: number) => {
  const { r, g, b } = hexToRgb(color);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export const themes = {
  "akshaya-tritiya": {
    name: "akshaya-tritiya",
    label: "Akshaya Tritiya",
    colors: {
      primary: "#8b3a1f",
      secondary: "#f3d482",
      background: "#fffaf2",
      surface: "#ffffff",
      text: "#5a1a0f",
      accent: "#c96b1e",
    },
  },
  "vrindavan-fresh": {
    name: "vrindavan-fresh",
    label: "Vrindavan Fresh",
    colors: {
      primary: "#315d32",
      secondary: "#e5c86f",
      background: "#fbfff4",
      surface: "#ffffff",
      text: "#22351f",
      accent: "#9a7b22",
    },
  },
} satisfies Record<ThemeName, AppTheme>;

export const defaultThemeName: ThemeName = "akshaya-tritiya";

export const themeOptions = Object.values(themes);

export const createSemanticTokens = ({ colors }: AppTheme) => ({
  "--color-primary": colors.primary,
  "--color-secondary": colors.secondary,
  "--color-background": colors.background,
  "--color-surface": colors.surface,
  "--color-text": colors.text,
  "--color-accent": colors.accent,
  "--appBackground": colors.background,
  "--appBackgroundGradient":
    `linear-gradient(180deg, ${colors.background} 0%, ${lighten(colors.secondary, 0.68)} 42%, ${lighten(colors.background, 0.36)} 100%)`,
  "--sectionBackground": colors.background,
  "--sectionAltBackground": lighten(colors.secondary, 0.72),
  "--heroBackground": darken(colors.primary, 0.45),
  "--heroOverlay": darken(colors.primary, 0.68),
  "--cardBackground": colors.surface,
  "--cardRaisedBackground": lighten(colors.secondary, 0.76),
  "--cardTintBackground": lighten(colors.primary, 0.9),
  "--buttonPrimary": colors.primary,
  "--buttonHover": darken(colors.primary, 0.18),
  "--buttonText": lighten(colors.background, 0.2),
  "--buttonSecondary": colors.accent,
  "--textHeading": colors.text,
  "--textBody": lighten(colors.text, 0.12),
  "--textMuted": lighten(colors.text, 0.32),
  "--textOnAccent": lighten(colors.background, 0.2),
  "--borderSubtle": lighten(colors.primary, 0.78),
  "--focusRing": colors.secondary,
  "--decorativeAccent": colors.secondary,
  "--decorativeSoft": lighten(colors.secondary, 0.48),
  "--impactGradientStart": darken(colors.primary, 0.22),
  "--impactGradientMid": colors.accent,
  "--impactGradientEnd": lighten(colors.accent, 0.28),
  "--shadowColor": opacity(colors.primary, 0.24),
  "--selectionBackground": colors.accent,
});

export const getTheme = (themeName: string | null | undefined) =>
  themes[(themeName as ThemeName) || defaultThemeName] ?? themes[defaultThemeName];
