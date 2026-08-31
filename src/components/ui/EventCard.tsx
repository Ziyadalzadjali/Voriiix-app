import { Pressable } from 'react-native';

import { Card } from '@/components/ui/Card';
import { AppText } from '@/components/ui/Text';
import type { HomeEvent } from '@/data/types';
import { formatWhen } from '@/lib/format';
import { colors, space, type } from '@/theme';

export function EventCard({ event, onPress }: { event: HomeEvent; onPress?: () => void }) {
  return (
    <Pressable onPress={onPress} disabled={!onPress} style={{ minWidth: 220, flex: 1 }}>
      <Card style={{ minHeight: 120 }}>
        <AppText tone="cyan" style={{ ...type.caption, letterSpacing: 1.4 }}>
          {event.kind.toUpperCase()}
        </AppText>
        <AppText style={{ ...type.title, color: colors.text, marginTop: space.sm }}>{event.title}</AppText>
        <AppText tone="muted" style={{ marginTop: space.sm }}>
          {formatWhen(event.startsAt)}
        </AppText>
      </Card>
    </Pressable>
  );
}
