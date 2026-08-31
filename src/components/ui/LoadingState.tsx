import { ActivityIndicator, View } from 'react-native';

import { AppText } from '@/components/ui/Text';
import { colors, space, type } from '@/theme';

export function LoadingState({ label = 'LOADING GRID…' }: { label?: string }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: space.md, backgroundColor: colors.bg }}>
      <ActivityIndicator color={colors.accent} />
      <AppText tone="muted" style={type.section}>
        {label}
      </AppText>
    </View>
  );
}
