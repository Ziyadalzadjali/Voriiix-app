import { Button, Card, Screen, StatusBadge, AppText } from '@/components/ui';
import { hrefs } from '@/navigation/hrefs';
import { colors, space, type } from '@/theme';
import { router } from 'expo-router';

export default function BookingConfirmationRoute() {
  return (
    <Screen>
      <AppText tone="accent" style={type.section}>
        CONFIRMATION
      </AppText>
      <AppText style={{ ...type.hero, color: colors.text }}>SESSION LOCKED</AppText>
      <Card accent>
        <AppText tone="muted" style={type.caption}>
          BOOKING ID
        </AppText>
        <AppText style={{ ...type.title, color: colors.text, marginTop: space.sm }}>Assigned by the server</AppText>
        <AppText tone="muted" style={{ marginVertical: space.md }}>
          A confirmed booking receives a QR token. The token never includes XP, payment or personal secrets.
        </AppText>
        <StatusBadge status="confirmed" />
      </Card>
      <Button label="SHOW QR" onPress={() => router.push(hrefs.qr)} />
    </Screen>
  );
}
