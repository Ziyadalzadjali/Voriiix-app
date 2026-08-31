import { useState } from 'react';
import { Pressable, View } from 'react-native';
import { router } from 'expo-router';

import { Button, EmptyState, ErrorState, ListingCard, LoadingState, Screen, AppText } from '@/components/ui';
import type { MarketSection } from '@/data/market/filter';
import { pushAssetUrl } from '@/data/push/catalog';
import { useMarket } from '@/features/market/use-market';
import { hrefs } from '@/navigation/hrefs';
import { colors, fonts, radius, space, type } from '@/theme';

const SECTIONS: { id: MarketSection; label: string }[] = [
  { id: 'trade', label: 'Trade' },
  { id: 'exchange', label: 'Exchange' },
  { id: 'store', label: 'Store' },
];

const CHIPS = [
  { label: 'Racing', href: hrefs.racing },
  { label: 'Fun Den', href: hrefs.funDen },
  { label: 'Workshop', href: hrefs.workshop },
  { label: 'Events', href: hrefs.events },
];

export function MarketScreen() {
  const [section, setSection] = useState<MarketSection>('trade');
  const { listings, itemsListed, activeBids, state, reload } = useMarket(section);

  if (state.kind === 'loading' && !listings.length && itemsListed === 0) {
    return (
      <Screen mural="market">
        <LoadingState label="LOADING TRADE HUB…" />
      </Screen>
    );
  }

  return (
    <Screen mural="market">
      <AppText tone="muted" style={type.section}>
        Marketplace
      </AppText>
      <AppText style={{ ...type.hero, color: colors.text }}>TRADE HUB</AppText>
      <AppText tone="muted">
        Buy, sell, and bid on wheels, rigs, race parts, and real-car upgrades from verified branch owners.
      </AppText>
      <AppText tone="gold" style={type.caption}>
        Synced from akacademy.online/market · bids settle on the server
      </AppText>

      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: space.sm }}>
        {CHIPS.map((chip) => (
          <Pressable
            key={chip.label}
            onPress={() => router.push(chip.href)}
            style={{
              borderRadius: radius.pill,
              borderWidth: 1,
              borderColor: 'rgba(139, 92, 246, 0.42)',
              backgroundColor: 'rgba(17, 17, 22, 0.72)',
              paddingHorizontal: space.md,
              paddingVertical: 6,
            }}>
            <AppText style={{ fontFamily: fonts.headingSemi, fontSize: 12, letterSpacing: 1.2, color: colors.steel }}>
              {chip.label.toUpperCase()}
            </AppText>
          </Pressable>
        ))}
      </View>

      <View style={{ flexDirection: 'row', gap: space.sm }}>
        <View style={{ flex: 1 }}>
          <Button label="List an Item" onPress={() => router.push(hrefs.booking)} />
        </View>
        <View style={{ flex: 1 }}>
          <Button label="How Bidding Works" variant="ghost" onPress={() => router.push(hrefs.academy)} />
        </View>
      </View>

      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: space.sm }}>
        <Stat value={String(itemsListed)} label="Items Listed" gold />
        <Stat value={String(activeBids)} label="Active Bids" />
        <Stat value="OMR" label="Settlement CCY" gold />
        <Stat value="24/7" label="Live Market" />
      </View>

      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: space.sm }}>
        {SECTIONS.map((item) => {
          const active = section === item.id;
          return (
            <Pressable
              key={item.id}
              onPress={() => setSection(item.id)}
              style={{
                borderBottomWidth: 2,
                borderBottomColor: active ? colors.gold : 'transparent',
                paddingHorizontal: space.md,
                paddingVertical: 8,
              }}>
              <AppText style={{ fontFamily: fonts.headingSemi, letterSpacing: 1.4, color: active ? colors.gold : colors.textDim }}>
                {item.label.toUpperCase()}
              </AppText>
            </Pressable>
          );
        })}
      </View>

      <AppText tone="muted" style={type.section}>
        [ MARKETPLACE · FILTER ]
      </AppText>
      <AppText style={{ ...type.title, color: colors.text }}>Trade Search</AppText>
      <AppText tone="dim" style={type.caption}>
        {listings.length} live · listings confirm on the server
      </AppText>

      {state.kind === 'error' ? <ErrorState message={state.message} onRetry={reload} /> : null}

      {listings.length ? (
        listings.map((item) => (
          <ListingCard
            key={String(item.id ?? item.sku ?? item.name)}
            title={String(item.name || 'Untitled listing')}
            sku={item.sku ? String(item.sku) : undefined}
            imageUrl={pushAssetUrl(item.image_url)}
            onPress={() => router.push(hrefs.booking)}
          />
        ))
      ) : (
        <EmptyState title="0 live" body="Trade listings appear when the server publishes them." />
      )}
    </Screen>
  );
}

function Stat({ value, label, gold }: { value: string; label: string; gold?: boolean }) {
  return (
    <View
      style={{
        width: '47%',
        flexGrow: 1,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: 'rgba(139, 92, 246, 0.42)',
        backgroundColor: 'rgba(8, 8, 16, 0.72)',
        padding: space.lg,
      }}>
      <AppText style={{ fontFamily: fonts.display, fontSize: 28, color: gold ? colors.gold : colors.steel }}>{value}</AppText>
      <AppText tone="muted" style={{ ...type.caption, marginTop: 4 }}>
        {label.toUpperCase()}
      </AppText>
    </View>
  );
}
