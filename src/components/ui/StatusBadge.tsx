import { View } from 'react-native';

import { AppText } from '@/components/ui/Text';
import type { BookingStatus } from '@/data/types';
import { colors, radius, space } from '@/theme';

const LABELS: Record<BookingStatus, string> = {
  pending: 'PENDING',
  confirmed: 'CONFIRMED',
  cancelled: 'CANCELLED',
  completed: 'COMPLETED',
  expired: 'EXPIRED',
  no_show: 'NO SHOW',
};

const TONES: Record<BookingStatus, string> = {
  pending: colors.warning,
  confirmed: colors.success,
  cancelled: colors.textDim,
  completed: colors.cyan,
  expired: colors.textDim,
  no_show: colors.danger,
};

export function StatusBadge({ status }: { status: BookingStatus }) {
  const tone = TONES[status];
  return (
    <View
      style={{
        alignSelf: 'flex-start',
        borderRadius: radius.pill,
        borderWidth: 1,
        borderColor: tone,
        paddingHorizontal: space.md,
        paddingVertical: 4,
      }}>
      <AppText style={{ color: tone, fontSize: 10, letterSpacing: 1.4 }}>{LABELS[status]}</AppText>
    </View>
  );
}
