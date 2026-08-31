import { View } from 'react-native';

import { AppText } from '@/components/ui/Text';
import type { XpKind } from '@/data/types';
import { formatXp } from '@/lib/format';
import { colors, fonts, space, type } from '@/theme';

const TONE: Record<XpKind, string> = {
  BXP: colors.bxp,
  SXP: colors.sxp,
  GXP: colors.gxp,
};

export function XPBalance({ kind, value }: { kind: XpKind; value: number }) {
  return (
    <View style={{ flex: 1, gap: space.xs }}>
      <AppText style={{ color: TONE[kind], fontSize: 11, letterSpacing: 1.6 }}>{kind}</AppText>
      <AppText style={{ ...type.xp, color: colors.text, fontFamily: fonts.mono }}>{formatXp(value)}</AppText>
    </View>
  );
}
