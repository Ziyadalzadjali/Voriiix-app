import { View, type ViewProps } from 'react-native';

import { cardFill, colors, glowShadow, goldRedBorder, radius, space } from '@/theme';

type Props = ViewProps & {
  accent?: boolean;
};

export function Card({ accent, style, children, ...props }: Props) {
  const inner = (
    <View
      {...props}
      style={[
        {
          borderColor: colors.edge,
          borderWidth: accent ? 0 : 1,
          borderRadius: radius.lg,
          padding: space.lg,
          overflow: 'hidden',
          ...cardFill,
          ...(!accent ? glowShadow : {}),
        },
        style,
      ]}>
      {children}
    </View>
  );

  if (!accent) {
    return inner;
  }

  return (
    <View style={{ borderRadius: radius.lg + 1, padding: 1, ...goldRedBorder, ...glowShadow }}>
      {inner}
    </View>
  );
}
