import { QRCode, Screen, AppText } from '@/components/ui';
import { colors, type } from '@/theme';

export default function QrRoute() {
  return (
    <Screen>
      <AppText tone="accent" style={type.section}>
        QR
      </AppText>
      <AppText style={{ ...type.hero, color: colors.text }}>SCAN IN</AppText>
      <AppText tone="muted">
        This preview shows layout only. Phase 4 issues a short-lived booking token. Validation always happens server-side.
      </AppText>
      <QRCode value="preview-token" />
    </Screen>
  );
}
