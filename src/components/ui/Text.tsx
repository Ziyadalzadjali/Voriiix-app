import { Text as RNText, type TextProps } from 'react-native';

import { colors, fonts } from '@/theme';

type Tone = 'default' | 'muted' | 'dim' | 'accent' | 'gold' | 'cyan';

const tones: Record<Tone, string> = {
  default: colors.text,
  muted: colors.textMuted,
  dim: colors.textDim,
  accent: colors.accent,
  gold: colors.gold,
  cyan: colors.steel,
};

export function AppText({
  tone = 'default',
  style,
  ...props
}: TextProps & { tone?: Tone }) {
  return (
    <RNText
      {...props}
      style={[{ color: tones[tone], fontFamily: fonts.body }, style]}
    />
  );
}
