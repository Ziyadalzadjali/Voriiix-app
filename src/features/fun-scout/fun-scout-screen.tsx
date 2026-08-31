import { View } from 'react-native';
import { router } from 'expo-router';

import { Button, Card, Screen, AppText } from '@/components/ui';
import { FUN_DEN_ROOMS } from '@/data/fun-den/rooms';
import { hrefs } from '@/navigation/hrefs';
import { colors, space, type } from '@/theme';

const SCOUTS = [
  { title: 'On Fire', body: 'Hot sessions under the clock.', href: hrefs.funDen },
  { title: 'Heros', body: 'Scout the Champ Drifter legends.', href: hrefs.racing },
  { title: 'Car Simulator', body: 'Triple-screen rigs. No grip, no glory.', href: hrefs.funDen },
  { title: 'Trade Hub', body: 'Wheels, rigs, and parts from branch owners.', href: hrefs.market },
];

export function FunScoutScreen() {
  return (
    <Screen mural="fun-den">
      <AppText tone="muted" style={type.section}>
        Fun Scout
      </AppText>
      <AppText style={{ ...type.hero, color: colors.text }}>
        SCOUT THE{' '}
        <AppText style={{ ...type.hero, color: colors.gold }}>DEN</AppText>
      </AppText>
      <AppText tone="muted">
        Recon rooms, rigs, and trade rows before you book. Slots and bids stay on the server.
      </AppText>

      <View style={{ gap: space.md }}>
        {SCOUTS.map((item) => (
          <Card key={item.title}>
            <AppText style={{ ...type.title, color: colors.gold }}>{item.title}</AppText>
            <AppText tone="muted" style={{ marginVertical: space.sm }}>
              {item.body}
            </AppText>
            <Button label="Scout" variant="ghost" onPress={() => router.push(item.href)} />
          </Card>
        ))}
      </View>

      <AppText tone="muted" style={type.section}>
        FUN DEN ROOMS
      </AppText>
      {FUN_DEN_ROOMS.map((room) => (
        <Card key={room.id}>
          <AppText>{room.label}</AppText>
          <View style={{ marginTop: space.md }}>
            <Button label={`Open ${room.label}`} variant="ghost" onPress={() => router.push(hrefs.funDen)} />
          </View>
        </Card>
      ))}
    </Screen>
  );
}
