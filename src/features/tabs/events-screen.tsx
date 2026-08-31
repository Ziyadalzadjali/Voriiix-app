import { View } from 'react-native';
import { router } from 'expo-router';

import { EmptyState, ErrorState, EventCard, LoadingState, Screen, AppText } from '@/components/ui';
import { useHomeDashboard } from '@/features/home/use-home-dashboard';
import { hrefs } from '@/navigation/hrefs';
import { colors, space, type } from '@/theme';

export function EventsScreen() {
  const { data, state, reload } = useHomeDashboard();

  if (state.kind === 'loading' && !data) {
    return <LoadingState />;
  }

  return (
    <Screen>
      <AppText tone="accent" style={type.section}>
        EVENTS
      </AppText>
      <AppText style={{ ...type.hero, color: colors.text }}>COMPETE</AppText>
      <AppText tone="muted">Registration and results come from the backend in Phase 6.</AppText>
      {state.kind === 'error' ? <ErrorState message={state.message} onRetry={reload} /> : null}
      {data?.events.length ? (
        <View style={{ gap: space.md }}>
          {data.events.map((event) => (
            <EventCard key={event.id} event={event} onPress={() => router.push(hrefs.booking)} />
          ))}
        </View>
      ) : (
        <EmptyState title="No events loaded" body="When the API is connected, upcoming races appear here." />
      )}
    </Screen>
  );
}
