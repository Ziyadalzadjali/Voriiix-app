import { Redirect, Stack } from 'expo-router';

import { LoadingState } from '@/components/ui';
import { useAuth } from '@/features/auth/use-auth';
import { hrefs } from '@/navigation/hrefs';
import { colors } from '@/theme';

export default function AppLayout() {
  const { ready, session } = useAuth();

  if (!ready) {
    return <LoadingState />;
  }

  if (!session) {
    return <Redirect href={hrefs.login} />;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.bg },
      }}>
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}
