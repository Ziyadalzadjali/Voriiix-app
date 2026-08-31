import { Tabs } from 'expo-router';
import { Platform, Text } from 'react-native';

import { colors, fonts } from '@/theme';

function TabIcon({ glyph, color }: { glyph: string; color: string }) {
  return <Text style={{ color, fontSize: 15, fontWeight: '700' }}>{glyph}</Text>;
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.gold,
        tabBarInactiveTintColor: colors.textDim,
        tabBarStyle: {
          backgroundColor: colors.tabBar,
          borderTopColor: colors.edge,
          height: Platform.OS === 'web' ? 64 : undefined,
        },
        tabBarLabelStyle: {
          fontFamily: fonts.heading,
          fontSize: 10,
          letterSpacing: 1.2,
        },
        sceneStyle: { backgroundColor: colors.bg },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <TabIcon glyph="H" color={String(color)} />,
        }}
      />
      <Tabs.Screen
        name="racing"
        options={{
          title: 'Racing',
          tabBarIcon: ({ color }) => <TabIcon glyph="R" color={String(color)} />,
        }}
      />
      <Tabs.Screen
        name="wallet"
        options={{
          title: 'Wallet',
          tabBarIcon: ({ color }) => <TabIcon glyph="XP" color={String(color)} />,
        }}
      />
      <Tabs.Screen
        name="events"
        options={{
          title: 'Events',
          tabBarIcon: ({ color }) => <TabIcon glyph="E" color={String(color)} />,
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: 'Account',
          tabBarIcon: ({ color }) => <TabIcon glyph="A" color={String(color)} />,
        }}
      />
    </Tabs>
  );
}
