import { useState } from 'react';
import { Pressable, View } from 'react-native';
import { router } from 'expo-router';

import { Button, Card, EmptyState, ErrorState, ListingCard, LoadingState, Screen, AppText } from '@/components/ui';
import { FUN_DEN_ROOMS, type FunDenRoom } from '@/data/fun-den/rooms';
import { pushAssetUrl } from '@/data/push/catalog';
import { useFunDen } from '@/features/fun-den/use-fun-den';
import { hrefs } from '@/navigation/hrefs';
import { colors, fonts, radius, space, type } from '@/theme';

const STATS = [
  { value: '4', label: 'Sim Rigs' },
  { value: '3', label: 'Screens' },
  { value: '1080Hz', label: 'Wheel FFB' },
  { value: '24/7', label: 'Live Podium' },
];

const TRACK = [
  { title: 'Earn XP', body: 'Complete sessions' },
  { title: 'Level Up', body: 'Unlock rewards' },
  { title: 'Join Events', body: 'Win prizes' },
  { title: 'Live the Reality', body: 'Sim to Drift' },
];

export function FunDenScreen() {
  const [room, setRoom] = useState<FunDenRoom>('on-fire');
  const { listings, state, reload } = useFunDen(room);

  if (state.kind === 'loading' && !listings.length) {
    return (
      <Screen mural="fun-den">
        <LoadingState label="LOADING FUN DEN…" />
      </Screen>
    );
  }

  return (
    <Screen mural="fun-den">
      <AppText tone="muted" style={type.section}>
        Simulator
      </AppText>
      <AppText style={{ ...type.hero, color: colors.text }}>
        NO GRIP.{' '}
        <AppText style={{ ...type.hero, color: colors.gold }}>NO GLORY.</AppText>
      </AppText>
      <AppText tone="muted">
        Full force-feedback wheel, three-axis pedals, triple-screen wraparound. Drift any track, any car, any tire.
      </AppText>
      <AppText tone="gold" style={type.caption}>
        Synced from akacademy.online/fun-den · slots confirm on the server
      </AppText>

      <View style={{ flexDirection: 'row', gap: space.sm }}>
        <View style={{ flex: 1 }}>
          <Button label="Book a Rig" onPress={() => router.push(hrefs.booking)} />
        </View>
        <View style={{ flex: 1 }}>
          <Button label="How Bidding Works" variant="ghost" onPress={() => router.push(hrefs.academy)} />
        </View>
      </View>

      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: space.sm }}>
        {STATS.map((stat) => (
          <View
            key={stat.label}
            style={{
              width: '47%',
              flexGrow: 1,
              borderRadius: radius.md,
              borderWidth: 1,
              borderColor: colors.edge,
              backgroundColor: '#0F121B',
              padding: space.md,
              alignItems: 'center',
            }}>
            <AppText style={{ fontFamily: fonts.display, fontSize: 26, color: colors.gold }}>{stat.value}</AppText>
            <AppText tone="muted" style={{ ...type.caption, marginTop: 4 }}>
              {stat.label.toUpperCase()}
            </AppText>
          </View>
        ))}
      </View>

      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: space.sm }}>
        {FUN_DEN_ROOMS.map((item) => {
          const active = room === item.id;
          return (
            <Pressable
              key={item.id}
              onPress={() => setRoom(item.id)}
              style={{
                borderRadius: radius.pill,
                borderWidth: 1,
                borderColor: active ? '#A855F7' : colors.edge,
                backgroundColor: active ? 'rgba(139, 92, 246, 0.18)' : 'rgba(17, 17, 22, 0.7)',
                paddingHorizontal: space.md,
                paddingVertical: 8,
              }}>
              <AppText
                style={{
                  fontFamily: fonts.headingSemi,
                  fontSize: 12,
                  letterSpacing: 1.2,
                  color: active ? '#C4B5FD' : colors.steel,
                }}>
                {item.label.toUpperCase()}
              </AppText>
            </Pressable>
          );
        })}
      </View>

      <AppText style={{ fontFamily: fonts.mono, fontSize: 11, letterSpacing: 2.2, color: '#A78BFA' }}>
        BOOK A RIG
      </AppText>
      <AppText style={{ ...type.title, color: colors.text }}>{listings.length} live</AppText>

      {state.kind === 'error' ? <ErrorState message={state.message} onRetry={reload} /> : null}

      {listings.length ? (
        listings.map((item) => (
          <ListingCard
            key={String(item.id ?? item.sku ?? item.name)}
            title={String(item.name || 'Untitled session')}
            sku={item.sku ? String(item.sku) : undefined}
            imageUrl={pushAssetUrl(item.image_url)}
            onPress={() => router.push(hrefs.booking)}
          />
        ))
      ) : (
        <EmptyState title="0 live" body="Podium sessions appear when the server publishes them." />
      )}

      <View style={{ gap: space.sm }}>
        {TRACK.map((step) => (
          <Card key={step.title}>
            <AppText style={{ fontFamily: fonts.bodyBold }}>{step.title}</AppText>
            <AppText tone="muted">{step.body}</AppText>
          </Card>
        ))}
      </View>

      <Card accent>
        <AppText style={{ ...type.title, color: colors.text }}>Not on podium yet?</AppText>
        <AppText tone="muted" style={{ marginVertical: space.md }}>
          Buy XP, convert tiers, or grab an academy slot to enter the next auction. Availability is confirmed by the
          server.
        </AppText>
        <View style={{ gap: space.sm }}>
          <Button label="Open Market" onPress={() => router.push(hrefs.market)} />
          <Button label="Book Academy" variant="ghost" onPress={() => router.push(hrefs.academy)} />
        </View>
      </Card>
    </Screen>
  );
}
