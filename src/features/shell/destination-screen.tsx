import { router } from 'expo-router';

import { Button, Screen, AppText } from '@/components/ui';
import { colors, space, type } from '@/theme';

export function DestinationScreen({
  kicker,
  title,
  body,
  actionLabel,
  onAction,
}: {
  kicker: string;
  title: string;
  body: string;
  actionLabel?: string;
  onAction?: () => void;
}) {
  return (
    <Screen>
      <AppText tone="accent" style={{ ...type.section, marginTop: space.lg }}>
        {kicker}
      </AppText>
      <AppText style={{ ...type.hero, color: colors.text, marginTop: space.sm }}>{title}</AppText>
      <AppText tone="muted">{body}</AppText>
      {actionLabel && onAction ? <Button label={actionLabel} onPress={onAction} /> : null}
      <Button label="BACK TO GARAGE" variant="ghost" onPress={() => router.back()} />
    </Screen>
  );
}
