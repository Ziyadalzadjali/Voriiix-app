import { useState } from 'react';
import { router } from 'expo-router';

import { Button, ConfirmDialog, Screen, AppText } from '@/components/ui';
import { useAuth } from '@/features/auth/auth-context';
import { hrefs } from '@/navigation/hrefs';
import { colors, space, type } from '@/theme';

export function AccountScreen() {
  const { session, logout } = useAuth();
  const [confirm, setConfirm] = useState(false);

  return (
    <Screen>
      <AppText tone="accent" style={type.section}>
        ACCOUNT
      </AppText>
      <AppText style={{ ...type.hero, color: colors.text }}>
        {(session?.user.displayName ?? 'DRIVER').toUpperCase()}
      </AppText>
      <AppText tone="muted">{session?.user.email ?? session?.user.phone ?? 'Customer'}</AppText>
      <AppText tone="dim" style={{ ...type.caption, marginTop: space.sm }}>
        ROLE · {(session?.user.role ?? 'customer').replace('_', ' ').toUpperCase()}
      </AppText>

      <Button label="PROFILE" variant="ghost" onPress={() => router.push(hrefs.profile)} />
      <Button label="SETTINGS" variant="ghost" onPress={() => router.push(hrefs.settings)} />
      <Button label="NOTIFICATIONS" variant="ghost" onPress={() => router.push(hrefs.notifications)} />
      <Button label="WORKSHOP" variant="ghost" onPress={() => router.push(hrefs.workshop)} />
      <Button label="QR" variant="ghost" onPress={() => router.push(hrefs.qr)} />
      <Button label="LOG OUT" onPress={() => setConfirm(true)} />

      <ConfirmDialog
        visible={confirm}
        title="Leave the garage?"
        body="You will need to sign in again to book or view your wallet."
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
