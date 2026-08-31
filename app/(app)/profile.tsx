import { useState } from 'react';
import { router } from 'expo-router';

import { Button, Card, ConfirmDialog, Screen, AppText } from '@/components/ui';
import { useAuth } from '@/features/auth/use-auth';
import { hrefs } from '@/navigation/hrefs';
import { colors, space, type } from '@/theme';

export default function ProfileRoute() {
  const { session, logout } = useAuth();
  const [confirm, setConfirm] = useState(false);

  return (
    <Screen>
      <AppText style={{ ...type.hero, color: colors.text }}>PROFILE</AppText>
      <Card>
        <AppText tone="muted" style={type.caption}>
          NAME
        </AppText>
        <AppText style={{ marginBottom: space.md }}>{session?.user.displayName ?? '—'}</AppText>
        <AppText tone="muted" style={type.caption}>
          EMAIL
        </AppText>
        <AppText>{session?.user.email ?? '—'}</AppText>
      </Card>
      <Button label="SETTINGS" variant="ghost" onPress={() => router.push(hrefs.settings)} />
      <Button label="LOG OUT" onPress={() => setConfirm(true)} />
      <ConfirmDialog
        visible={confirm}
        title="Leave the garage?"
        body="You will need to sign in again to book or scout sessions."
        confirmLabel="LOG OUT"
        onClose={() => setConfirm(false)}
        onConfirm={() => {
          setConfirm(false);
          void logout().then(() => router.replace(hrefs.login));
        }}
      />
    </Screen>
  );
}
