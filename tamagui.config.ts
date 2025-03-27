import { createTamagui, createTokens } from 'tamagui';
import { createInterFont } from '@tamagui/font-inter';
import { shorthands } from '@tamagui/shorthands';
import { themes } from '@tamagui/themes';
import { theme } from './theme';

// Create tokens based on your existing theme
const tokens = createTokens({
  size: {
    0: 0,
    1: 4,
    2: 8,
    3: 16,
    4: 24,
    5: 32,
    6: 40,
    7: 48,
    8: 56,
    9: 64,
    10: 72,
    true: 1,
  },
  space: {
    0: 0,
    1: 4,
    2: 8,
    3: 16,
    4: 24,
    5: 32,
    6: 40,
    7: 48,
    8: 56,
    9: 64,
    10: 72,
    true: 1,
  },
  radius: {
    0: 0,
    1: 2,
    2: 5,
    3: 8,
    4: 14,
    5: 24,
    6: 32,
    pill: 999,
  },
  zIndex: {
    0: 0,
    1: 100,
    2: 200,
    3: 300,
    4: 400,
    5: 500,
  },
  color: {
    // Core colors
    background: theme.colors.background,
    foreground: theme.colors.foreground,
    text: theme.colors.text,
    
    // Primary colors
    primary: theme.colors.primary,
    secondary: theme.colors.secondary,
    success: theme.colors.success,
    error: theme.colors.error,
    warning: theme.colors.warning,
    
    // Accents
    accent1: theme.colors.accents_1,
    accent2: theme.colors.accents_2,
    accent3: theme.colors.accents_3,
    accent4: theme.colors.accents_4,
    accent5: theme.colors.accents_5,
    accent6: theme.colors.accents_6,
    accent7: theme.colors.accents_7,
    accent8: theme.colors.accents_8,
  },
});

// Create a custom theme based on your Geist theme
const geistDarkTheme = {
  background: tokens.color.background,
  backgroundHover: tokens.color.accent1,
  backgroundPress: tokens.color.accent2,
  backgroundFocus: tokens.color.accent1,
  borderColor: tokens.color.accent2,
  borderColorHover: tokens.color.accent3,
  borderColorFocus: tokens.color.accent3,
  borderColorPress: tokens.color.accent4,
  color: tokens.color.text,
  colorHover: tokens.color.text,
  colorFocus: tokens.color.text,
  colorPress: tokens.color.accent7,
  shadowColor: tokens.color.accent1,
  shadowColorHover: tokens.color.accent2,
  shadowColorFocus: tokens.color.accent2,
  shadowColorPress: tokens.color.accent3,
};

const tamaguiConfig = createTamagui({
  tokens,
  themes: {
    dark: geistDarkTheme,
    light: themes.light,
  },
  defaultTheme: 'dark',
  shorthands,
  fonts: {
    heading: createInterFont(),
    body: createInterFont(),
  },
});

type Conf = typeof tamaguiConfig;
declare module 'tamagui' {
  interface TamaguiCustomConfig extends Conf {}
}

export default tamaguiConfig;
