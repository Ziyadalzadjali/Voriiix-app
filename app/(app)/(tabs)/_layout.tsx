import { Tabs } from 'expo-router';
import { Platform, Text } from 'react-native';

import { colors, fonts } from '@/theme';

function TabIcon({ glyph, color }: { glyph: string; color: string }) {
  return <Text style={{ color, fontSize: 13, fontWeight: '700' }}>{glyph}</Text>;
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
          height: Platform.OS === 'web' ? 68 : undefined,
        },
        tabBarLabelStyle: {
          fontFamily: fonts.heading,
          fontSize: 9,
          letterSpacing: 0.8,
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
        name="market"
        options={{
          title: 'Market',
          tabBarIcon: ({ color }) => <TabIcon glyph="M" color={String(color)} />,
        }}
      />
      <Tabs.Screen
        name="fun-den"
        options={{
          title: 'Fun Den',
          tabBarIcon: ({ color }) => <TabIcon glyph="FD" color={String(color)} />,
        }}
      />
      <Tabs.Screen
        name="fun-scout"
        options={{
          title: 'Fun Scout',
          tabBarIcon: ({ color }) => <TabIcon glyph="FS" color={String(color)} />,
        }}
      />
    </Tabs>
  );
}
