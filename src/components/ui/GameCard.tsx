import { Pressable } from 'react-native';

import { Card } from '@/components/ui/Card';
import { AppText } from '@/components/ui/Text';
import { colors, space, type } from '@/theme';

export function GameCard({
  name,
  selected,
  onPress,
}: {
  name: string;
  selected?: boolean;
  onPress?: () => void;
}) {
  return (
    <Pressable onPress={onPress} disabled={!onPress}>
      <Card accent={selected} style={{ minWidth: 140 }}>
        <AppText tone="muted" style={type.caption}>
          GAME
        </AppText>
        <AppText style={{ ...type.title, color: colors.text, marginTop: space.sm }}>{name}</AppText>
      </Card>
    </Pressable>
  );
}
