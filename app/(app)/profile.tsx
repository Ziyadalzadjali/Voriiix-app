import { Card, Screen, AppText } from '@/components/ui';
import { useAuth } from '@/features/auth/use-auth';
import { colors, space, type } from '@/theme';

export default function ProfileRoute() {
  const { session } = useAuth();
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
    </Screen>
  );
}
