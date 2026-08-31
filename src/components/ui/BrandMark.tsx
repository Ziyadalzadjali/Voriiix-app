import { Image, View } from 'react-native';

import { AppText } from '@/components/ui/Text';
import { colors, fonts, space } from '@/theme';

export function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: space.md }}>
      <Image
        source={require('../../../assets/images/voriix-logo.png')}
        style={{ height: compact ? 36 : 48, width: compact ? 36 : 48 }}
        resizeMode="contain"
      />
      <AppText
        style={{
          fontFamily: fonts.heading,
          fontSize: compact ? 16 : 20,
          letterSpacing: 3,
          color: colors.text,
        }}>
        VORIIX
      </AppText>
    </View>
  );
}
