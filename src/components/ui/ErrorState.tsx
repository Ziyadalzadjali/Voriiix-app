import { View } from 'react-native';

import { Button } from '@/components/ui/Button';
import { AppText } from '@/components/ui/Text';
import { colors, space, type } from '@/theme';

export function ErrorState({
  message,
  onRetry,
}: {
  message: string;
  onRetry?: () => void;
}) {
  return (
    <View style={{ gap: space.md, paddingVertical: space.lg }}>
      <AppText style={{ ...type.title, color: colors.text }}>GRID FAULT</AppText>
      <AppText tone="muted">{message}</AppText>
      {onRetry ? <Button label="Retry" onPress={onRetry} /> : null}
    </View>
  );
}
