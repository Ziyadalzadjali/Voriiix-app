import type { ReactNode } from 'react';
import { Image, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors, pageFill, space } from '@/theme';
import { FUN_DEN_MURAL, MARKET_MURAL, funDenOverlay, marketOverlay } from '@/theme/murals';

export type ScreenMural = 'default' | 'market' | 'fun-den';

export function Screen({
  children,
  scroll = true,
  mural = 'default',
}: {
  children: ReactNode;
  scroll?: boolean;
  mural?: ScreenMural;
}) {
  const body = (
    <View style={{ flex: 1, paddingHorizontal: space.lg, paddingBottom: space.xxl, gap: space.lg }}>
      {children}
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg, ...(mural === 'default' ? pageFill : null) }}>
      {mural === 'market' ? <Mural uri={MARKET_MURAL} overlay={marketOverlay} /> : null}
      {mural === 'fun-den' ? <Mural uri={FUN_DEN_MURAL} overlay={funDenOverlay} /> : null}
      <SafeAreaView style={{ flex: 1, backgroundColor: 'transparent' }} edges={['top', 'left', 'right']}>
        {scroll ? (
          <ScrollView
            style={{ flex: 1, backgroundColor: 'transparent' }}
            contentContainerStyle={{ paddingBottom: space.xxl }}
            showsVerticalScrollIndicator={false}>
            {body}
          </ScrollView>
        ) : (
          body
        )}
      </SafeAreaView>
    </View>
  );
}

function Mural({ uri, overlay }: { uri: string; overlay: object }) {
  return (
    <View pointerEvents="none" style={StyleSheet.absoluteFill}>
      <Image source={{ uri }} style={StyleSheet.absoluteFill} resizeMode="cover" />
      <View style={[StyleSheet.absoluteFill, overlay]} />
    </View>
  );
}
