import { View } from 'react-native';

import { colors, goldRedBorder, radius } from '@/theme';

export function ProgressBar({ value }: { value: number }) {
  const width = Math.max(0, Math.min(100, value));
  return (
    <View
      style={{
        height: 8,
        borderRadius: radius.pill,
        backgroundColor: colors.carbon,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: colors.edge,
      }}>
      <View style={{ width: `${width}%`, height: '100%', borderRadius: radius.pill, ...goldRedBorder }} />
    </View>
  );
}
