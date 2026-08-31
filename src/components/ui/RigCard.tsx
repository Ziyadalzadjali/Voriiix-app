import { Pressable, View } from 'react-native';

import { Card } from '@/components/ui/Card';
import { AppText } from '@/components/ui/Text';
import { colors, space, type } from '@/theme';

export function RigCard({
  name,
  state,
  onPress,
}: {
  name: string;
  state: string;
  onPress?: () => void;
}) {
  return (
    <Pressable onPress={onPress} disabled={!onPress}>
      <Card>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <AppText style={{ ...type.title, color: colors.text }}>{name}</AppText>
          <AppText tone="cyan" style={type.caption}>
            {state.toUpperCase()}
          </AppText>
        </View>
        <AppText tone="muted" style={{ marginTop: space.sm }}>
          Availability comes from the backend.
        </AppText>
      </Card>
    </Pressable>
  );
}
