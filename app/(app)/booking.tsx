import { View } from 'react-native';

import { Button, Card, EmptyState, Screen, AppText } from '@/components/ui';
import { hrefs } from '@/navigation/hrefs';
import { colors, space, type } from '@/theme';
import { router } from 'expo-router';

const STEPS = ['Game', 'Mode', 'Duration', 'Rig', 'Date', 'Time', 'Payment'];

export default function BookingRoute() {
  return (
    <Screen>
      <AppText tone="accent" style={type.section}>
        BOOKING
      </AppText>
      <AppText style={{ ...type.hero, color: colors.text }}>LOCK A RIG</AppText>
      <AppText tone="muted">
        Availability, prices and payment status come from the backend. This flow is assembled in Phase 3.
      </AppText>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: space.sm }}>
        {STEPS.map((step, index) => (
          <Card key={step} accent={index === 0} style={{ paddingVertical: space.sm, paddingHorizontal: space.md }}>
            <AppText tone={index === 0 ? 'accent' : 'muted'} style={type.caption}>
              {String(index + 1).padStart(2, '0')} {step.toUpperCase()}
            </AppText>
          </Card>
        ))}
      </View>
      <EmptyState
        title="Waiting on the grid"
        body="Select a game in Racing, then the server will return modes, durations and open slots."
      />
      <Button label="VIEW CONFIRMATION PREVIEW" variant="ghost" onPress={() => router.push(hrefs.bookingConfirmation)} />
    </Screen>
  );
}
