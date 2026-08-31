import { Link, Stack } from 'expo-router';

import { Screen, AppText } from '@/components/ui';
import { colors, space, type } from '@/theme';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <Screen scroll={false}>
        <AppText style={{ ...type.hero, color: colors.text, marginTop: space.xxl }}>OFF TRACK</AppText>
        <AppText tone="muted">This route does not exist.</AppText>
        <Link href="/">
          <AppText tone="accent">Back to garage</AppText>
        </Link>
      </Screen>
    </>
  );
}
