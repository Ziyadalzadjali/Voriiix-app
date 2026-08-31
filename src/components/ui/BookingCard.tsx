import { Pressable, View } from 'react-native';

import { Card } from '@/components/ui/Card';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { AppText } from '@/components/ui/Text';
import type { UpcomingBooking } from '@/data/types';
import { formatWhen } from '@/lib/format';
import { colors, space, type } from '@/theme';

type Props = {
  booking: UpcomingBooking;
  onPress?: () => void;
};

export function BookingCard({ booking, onPress }: Props) {
  return (
    <Pressable onPress={onPress} disabled={!onPress}>
      <Card accent>
        <AppText tone="muted" style={{ ...type.section, marginBottom: space.sm }}>
          UPCOMING SESSION
        </AppText>
        <AppText style={{ ...type.title, color: colors.text }}>{booking.gameName}</AppText>
        <AppText tone="muted" style={{ marginTop: 4 }}>
          {booking.modeName} · {booking.rigName} · {booking.durationMinutes} min
        </AppText>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: space.md }}>
          <AppText tone="gold">{formatWhen(booking.startsAt)}</AppText>
          <StatusBadge status={booking.status} />
        </View>
      </Card>
    </Pressable>
  );
}
