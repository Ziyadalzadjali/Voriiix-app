import { View } from 'react-native';

import { AppText } from '@/components/ui/Text';
import { colors, space, type } from '@/theme';

export function EmptyState({ title, body }: { title: string; body: string }) {
  return (
    <View style={{ paddingVertical: space.xl, gap: space.sm }}>
      <AppText style={{ ...type.title, color: colors.text }}>{title}</AppText>
      <AppText tone="muted">{body}</AppText>
    </View>
  );
}
