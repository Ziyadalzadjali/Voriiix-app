import { View } from 'react-native';
import { router } from 'expo-router';

import {
  AchievementCard,
  BookingCard,
  BrandMark,
  Button,
  Card,
  EmptyState,
  ErrorState,
  EventCard,
  LoadingState,
  ProgressBar,
  Screen,
  AppText,
  WalletCard,
} from '@/components/ui';
import { isPreviewData } from '@/data/source';
import { useHomeDashboard } from '@/features/home/use-home-dashboard';
import { hrefs } from '@/navigation/hrefs';
import { colors, space, type } from '@/theme';

export function HomeScreen() {
  const { data, state, reload } = useHomeDashboard();

  if (state.kind === 'loading' && !data) {
    return <LoadingState />;
  }

  return (
    <Screen>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <BrandMark compact />
        <View style={{ flexDirection: 'row', gap: space.sm }}>
          <Button label="Alerts" variant="ghost" onPress={() => router.push(hrefs.notifications)} />
          <Button label="Profile" variant="ghost" onPress={() => router.push(hrefs.profile)} />
        </View>
      </View>

      <AppText tone="muted" style={type.section}>
        From simulator precision to real drift aggression
      </AppText>
      <AppText style={{ ...type.hero, color: colors.text }}>
        NO GRIP.{' '}
        <AppText style={{ ...type.hero, color: colors.gold }}>NO GLORY.</AppText>
      </AppText>
      <AppText tone="muted">
        Book a sim session, complete academy levels, earn XP, and unlock real track experiences.
      </AppText>

      {isPreviewData() ? (
        <AppText tone="gold" style={type.caption}>
          Development preview · balances and slots are not live
        </AppText>
      ) : null}

      {state.kind === 'error' ? <ErrorState message={state.message} onRetry={reload} /> : null}

      {data ? (
        <>
          <WalletCard balances={data.wallet} />

          {data.upcomingBooking ? (
            <BookingCard
              booking={data.upcomingBooking}
              onPress={() => router.push(hrefs.bookingConfirmation)}
            />
          ) : (
            <EmptyState title="No session locked" body="Book a rig when you are ready to run." />
          )}

          <Button label="Book a Sim Session" onPress={() => router.push(hrefs.booking)} />
          <Button label="Explore Academy" variant="ghost" onPress={() => router.push(hrefs.academy)} />

          <AppText tone="muted" style={type.section}>
            EVENTS
          </AppText>
          <View style={{ flexDirection: 'row', gap: space.md }}>
            {data.events.map((event) => (
              <EventCard key={event.id} event={event} onPress={() => router.push(hrefs.events)} />
            ))}
          </View>

          <Card>
            <AppText tone="muted" style={type.section}>
              DRIFT ACADEMY
            </AppText>
            <AppText style={{ ...type.title, color: colors.text, marginTop: space.sm }}>
              {data.academy?.programName ?? 'Drift Academy'}
            </AppText>
            <AppText tone="muted" style={{ marginBottom: space.md }}>
              {data.academy?.levelName ?? 'Not enrolled'}
            </AppText>
            <ProgressBar value={data.academy?.percent ?? 0} />
          </Card>

          <AppText tone="muted" style={type.section}>
            REWARDS
          </AppText>
          {data.rewards.map((reward) => (
            <Card key={reward.id}>
              <AppText>{reward.title}</AppText>
              <AppText tone="dim" style={{ marginTop: 4 }}>
                {reward.locked ? 'LOCKED' : 'READY'}
              </AppText>
            </Card>
          ))}

          <AppText tone="muted" style={type.section}>
            ACHIEVEMENTS
          </AppText>
          <View style={{ flexDirection: 'row', gap: space.md }}>
            {data.achievements.map((achievement) => (
              <AchievementCard key={achievement.id} achievement={achievement} />
            ))}
          </View>
        </>
      ) : null}
    </Screen>
  );
}
