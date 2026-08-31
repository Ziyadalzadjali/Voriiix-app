import { View } from 'react-native';

import { AppText } from '@/components/ui/Text';
import { colors, fonts, radius, space } from '@/theme';

type Props = {
  value: string;
  label?: string;
};

export function QRCode({ value, label = 'SESSION TOKEN' }: Props) {
  return (
    <View style={{ alignItems: 'center', gap: space.md }}>
      <View
        style={{
          width: 196,
          height: 196,
          borderRadius: radius.md,
          borderWidth: 2,
          borderColor: colors.gold,
          backgroundColor: colors.bgElevated,
          padding: space.md,
          justifyContent: 'space-between',
        }}>
        {Array.from({ length: 7 }).map((_, row) => (
          <View key={row} style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            {Array.from({ length: 7 }).map((__, col) => (
              <View
                key={col}
                style={{
                  width: 16,
                  height: 16,
                  backgroundColor: (row + col + value.length) % 3 === 0 ? colors.text : 'transparent',
                }}
              />
            ))}
          </View>
        ))}
      </View>
      <AppText tone="muted" style={{ fontSize: 10, letterSpacing: 1.6 }}>
        {label}
      </AppText>
      <AppText style={{ fontFamily: fonts.mono, fontSize: 12 }}>{value}</AppText>
    </View>
  );
}
