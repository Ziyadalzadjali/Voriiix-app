import { Pressable, type PressableProps, View } from 'react-native';

import { AppText } from '@/components/ui/Text';
import { colors, fonts, glowShadow, goldRedBorder, radius, space } from '@/theme';

type Variant = 'primary' | 'ghost' | 'social';

type Props = PressableProps & {
  label: string;
  variant?: Variant;
  loading?: boolean;
};

export function Button({ label, variant = 'primary', loading, disabled, style: _style, ...props }: Props) {
  const isPrimary = variant === 'primary';

  return (
    <Pressable
      {...props}
      disabled={disabled || loading}
      style={({ pressed }) => ({
        opacity: disabled || loading ? 0.5 : pressed ? 0.88 : 1,
        transform: [{ translateY: pressed ? -1 : 0 }],
      })}>
      <View
        style={
          isPrimary
            ? { borderRadius: radius.pill, padding: 1, ...goldRedBorder, ...glowShadow }
            : undefined
        }>
        <View
          style={{
            minHeight: 48,
            borderRadius: radius.pill,
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: space.xl,
            backgroundColor: isPrimary ? colors.buttonFill : 'rgba(17,19,26,0.6)',
            borderWidth: isPrimary ? 0 : 1,
            borderColor: colors.edge,
          }}>
          <AppText
            style={{
              color: colors.text,
              fontFamily: fonts.bodyBold,
              fontSize: 13,
              letterSpacing: 0.6,
            }}>
            {loading ? 'WORKING…' : label}
          </AppText>
        </View>
      </View>
    </Pressable>
  );
}
