import { Platform, type ViewStyle } from 'react-native';

import { colors } from '@/theme/colors';

export function gradientFill(css: string): ViewStyle {
  if (Platform.OS === 'web') {
    return { backgroundImage: css } as ViewStyle;
  }
  return { experimental_backgroundImage: css } as ViewStyle;
}

export const cardFill = gradientFill('linear-gradient(180deg, #151927, #0E1118)');
export const pageFill = gradientFill(
  `radial-gradient(900px 400px at 70% 0%, ${colors.glowPurple}, transparent 60%), linear-gradient(180deg, ${colors.bgElevated}, ${colors.bg})`,
);
export const goldRedBorder = gradientFill(`linear-gradient(90deg, ${colors.gold}, ${colors.accent})`);

export const glowShadow = {
  shadowColor: '#000000',
  shadowOffset: { width: 0, height: 10 },
  shadowOpacity: 0.55,
  shadowRadius: 16,
  elevation: 8,
} as const;
