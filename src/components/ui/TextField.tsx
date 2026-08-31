import { TextInput, View, type TextInputProps } from 'react-native';

import { AppText } from '@/components/ui/Text';
import { colors, fonts, radius, space } from '@/theme';

export function TextField({
  label,
  error,
  ...props
}: TextInputProps & { label: string; error?: string | null }) {
  return (
    <View style={{ gap: space.xs }}>
      <AppText tone="muted" style={{ fontFamily: fonts.heading, fontSize: 12, letterSpacing: 2 }}>
        {label}
      </AppText>
      <TextInput
        {...props}
        placeholderTextColor={colors.textDim}
        style={{
          minHeight: 50,
          borderRadius: radius.md,
          borderWidth: 1,
          borderColor: error ? colors.danger : colors.edge,
          backgroundColor: colors.carbon,
          color: colors.text,
          paddingHorizontal: space.lg,
          fontFamily: fonts.body,
          fontSize: 16,
        }}
      />
      {error ? (
        <AppText tone="accent" style={{ fontSize: 12 }}>
          {error}
        </AppText>
      ) : null}
    </View>
  );
}
